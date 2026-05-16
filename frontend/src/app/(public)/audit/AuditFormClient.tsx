'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AUDIT_SECTIONS } from './audit-schema';
import ReviewPage from './audit-review';
import SuccessScreen from './audit-success';

// ── Types ─────────────────────────────────────────────────────────────────────
export type FileItem = { name: string; url: string; uploading?: boolean; error?: boolean };
export type SubData = { response: string; files: FileItem[] };
export type SectionsData = Record<string, Record<string, SubData>>;

export interface SchoolProfile {
  schoolName: string; udise: string; schoolCategory: string; gradeLevels: string[];
  medium: string; board: string; address: string; village: string; district: string;
  taluka: string; pinCode: string; principalName: string; mobile: string; email: string;
  yearEstablished: string; totalStudents: string; totalTeachingStaff: string; nonTeachingStaff: string;
}
export interface ConsentData { submitterName: string; designation: string; submissionDate: string; agreed: boolean }

const REVIEW_STEP = AUDIT_SECTIONS.length + 1; // step 11
const TOTAL_STEPS = REVIEW_STEP + 1; // 12
const DRAFT_KEY = 'gsaf-draft-v2';
const STEP_LABELS = ['School Profile', ...AUDIT_SECTIONS.map(s => s.title), 'Review & Submit'];

const defaultProfile: SchoolProfile = {
  schoolName: '', udise: '', schoolCategory: '', gradeLevels: [], medium: '', board: '',
  address: '', village: '', district: '', taluka: '', pinCode: '',
  principalName: '', mobile: '', email: '', yearEstablished: '',
  totalStudents: '', totalTeachingStaff: '', nonTeachingStaff: '',
};

function genId() {
  const y = new Date().getFullYear();
  const n = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `GSAF-${y}-${n}`;
}

// ── Draft ─────────────────────────────────────────────────────────────────────
function saveDraft(p: SchoolProfile, s: SectionsData, c: ConsentData) {
  try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ p, s, c, at: Date.now() })); } catch { }
}
function loadDraft() {
  try { const r = localStorage.getItem(DRAFT_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ step, maxStep, onJump, savedAt }: {
  step: number; maxStep: number; onJump: (n: number) => void; savedAt: number | null;
}) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-[68px] h-[calc(100vh-68px)] w-64 z-20"
        style={{ background: 'linear-gradient(180deg,#0a1f09 0%,#0d2610 100%)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

        {/* Header */}
        <div className="px-5 py-4 border-b border-white/8">
          <p className="text-[9px] font-bold text-green-500/70 uppercase tracking-[0.18em] mb-0.5">Green School Audit</p>
          <p className="text-white/80 text-xs font-medium">Framework 2024–25</p>
        </div>

        {/* Steps */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {STEP_LABELS.map((label, i) => {
            const isActive = i === step;
            const isDone = i < step;
            const canGo = i <= maxStep;
            const icon = i === 0 ? '🏫' : i === REVIEW_STEP ? '📋' : AUDIT_SECTIONS[i - 1]?.icon;
            return (
              <button
                key={i}
                onClick={() => canGo && onJump(i)}
                disabled={!canGo}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all mb-0.5 ${
                  isActive
                    ? 'bg-green-600/25 border border-green-500/25'
                    : isDone ? 'hover:bg-white/6'
                    : canGo ? 'hover:bg-white/4'
                    : ''
                }`}
              >
                {/* Step number / icon */}
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                  isActive ? 'bg-green-500 border-green-400 text-white'
                  : isDone ? 'bg-green-700/50 border-green-600/40 text-green-300'
                  : 'bg-white/5 border-white/10 text-white/25'
                }`}>
                  {isDone ? '✓' : i === 0 ? '0' : i === REVIEW_STEP ? '★' : String(i)}
                </span>
                <span className={`text-[11px] font-medium leading-tight truncate flex-1 ${
                  isActive ? 'text-green-300'
                  : isDone ? 'text-green-500/80'
                  : canGo ? 'text-white/35'
                  : 'text-white/15'
                }`}>{label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse" />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/8">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${savedAt ? 'bg-green-400' : 'bg-white/15'}`} />
            <p className={`text-[10px] font-medium ${savedAt ? 'text-green-400/80' : 'text-white/20'}`}>
              {savedAt ? 'Draft saved automatically' : 'No draft saved'}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile bottom step bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a1f09]/95 backdrop-blur-md border-t border-white/10 px-4 py-2">
        <div className="flex items-center justify-between">
          <span className="text-green-400 text-xs font-semibold">{STEP_LABELS[step]}</span>
          <span className="text-white/40 text-[10px]">{step + 1} / {TOTAL_STEPS}</span>
        </div>
        <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${Math.round((step / (TOTAL_STEPS - 1)) * 100)}%` }} />
        </div>
      </div>
    </>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step, savedAt }: { step: number; savedAt: number | null }) {
  const pct = Math.round((step / (TOTAL_STEPS - 1)) * 100);
  return (
    <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 border border-green-100 flex items-center justify-center text-sm font-bold text-green-700">{step + 1}</div>
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Step {step + 1} of {TOTAL_STEPS}</p>
              <p className="text-sm font-bold text-gray-800 leading-none mt-0.5">{STEP_LABELS[step]}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {savedAt && (
              <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Saved
              </span>
            )}
            <span className="text-base font-bold text-green-700 tabular-nums">{pct}%</span>
          </div>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#14532d,#22c55e)' }} />
        </div>
      </div>
    </div>
  );
}

// ── File Upload Zone ──────────────────────────────────────────────────────────
function FileUploadZone({ files, onAdd, onRemove }: {
  files: FileItem[]; onAdd: (f: FileItem[]) => void; onRemove: (i: number) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const uploadOne = async (file: File): Promise<FileItem> => {
    const fd = new FormData(); fd.append('file', file);
    try {
      const r = await fetch(`${API_URL}/upload/audit-attachment`, { method: 'POST', body: fd });
      if (!r.ok) throw new Error();
      const d = await r.json();
      return { name: file.name, url: d.url };
    } catch { return { name: file.name, url: '', error: true }; }
  };

  const processFiles = async (raw: FileList | null) => {
    if (!raw) return;
    const pending: FileItem[] = Array.from(raw).map(f => ({ name: f.name, url: '', uploading: true }));
    onAdd(pending);
    const results = await Promise.all(Array.from(raw).map(uploadOne));
    onAdd(results);
  };

  return (
    <div className="mt-3">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${dragging ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50/50 hover:border-green-300 hover:bg-green-50/30'}`}
      >
        <input ref={inputRef} type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden" onChange={e => processFiles(e.target.files)} />
        <p className="text-2xl mb-1">📎</p>
        <p className="text-xs text-gray-500">Drag &amp; drop or <span className="text-green-700 font-semibold underline">browse</span></p>
        <p className="text-[10px] text-gray-400 mt-0.5">Images · PDFs · Documents</p>
      </div>
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {files.map((fp, i) => (
            <div key={i} className="relative group">
              {fp.uploading ? (
                <div className="w-16 h-16 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center">
                  <span className="w-5 h-5 border-2 border-green-400/30 border-t-green-500 rounded-full animate-spin" />
                </div>
              ) : fp.error ? (
                <div className="w-16 h-16 bg-red-50 rounded-xl border border-red-200 flex items-center justify-center text-lg">⚠️</div>
              ) : (fp.url.match(/\.(jpg|jpeg|png|gif|webp)/i) || fp.url.includes('image')) ? (
                <img src={fp.url} alt={fp.name} className="w-16 h-16 object-cover rounded-xl border border-gray-200" />
              ) : (
                <div className="w-16 h-16 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center text-2xl">📄</div>
              )}
              {!fp.uploading && (
                <button onClick={e => { e.stopPropagation(); onRemove(i); }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center">×</button>
              )}
              <p className="text-[9px] text-gray-400 truncate w-16 mt-1 text-center">{fp.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Sub Criterion Card ────────────────────────────────────────────────────────
function SubCriterionCard({ number, title, hint, data, onChange }: {
  number: number; title: string; hint?: string; data: SubData; onChange: (d: SubData) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-900 to-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">{number}</span>
        <div>
          <h4 className="font-semibold text-gray-800 text-sm leading-snug">{title}</h4>
          {hint && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{hint}</p>}
        </div>
      </div>
      <textarea
        rows={4}
        placeholder="Describe your school's current practice, evidence, or actions taken…"
        value={data.response}
        onChange={e => onChange({ ...data, response: e.target.value })}
        className="w-full text-sm border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 resize-none transition-all"
      />
      <FileUploadZone
        files={data.files}
        onAdd={nf => onChange({ ...data, files: [...data.files.filter(f => !f.uploading), ...nf] })}
        onRemove={i => onChange({ ...data, files: data.files.filter((_, idx) => idx !== i) })}
      />
    </div>
  );
}

// ── Profile form helpers (MUST be outside ProfileStep to avoid remount on every keystroke) ──
function ProfileField({ label, fieldKey, value, placeholder = '', onChange }: {
  label: string; fieldKey: string; value: string; placeholder?: string;
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(fieldKey, e.target.value)}
        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
      />
    </div>
  );
}

function ProfileRadio({ label, fieldKey, value, opts, onChange }: {
  label: string; fieldKey: string; value: string; opts: string[];
  onChange: (k: string, v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {opts.map(opt => (
          <label
            key={opt}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer text-xs font-medium transition-all ${
              value === opt ? 'bg-green-800 text-white border-green-800' : 'bg-white border-gray-200 text-gray-600 hover:border-green-400'
            }`}
          >
            <input type="radio" className="hidden" checked={value === opt} onChange={() => onChange(fieldKey, opt)} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

// ── Profile Step ──────────────────────────────────────────────────────────────
function ProfileStep({ data, onChange }: { data: SchoolProfile; onChange: (d: SchoolProfile) => void }) {
  const set = (k: string, v: string) => onChange({ ...data, [k as keyof SchoolProfile]: v } as SchoolProfile);
  const toggleGrade = (g: string) => {
    const arr = data.gradeLevels.includes(g) ? data.gradeLevels.filter(x => x !== g) : [...data.gradeLevels, g];
    onChange({ ...data, gradeLevels: arr });
  };

  const card = 'bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm';
  const h3 = 'font-bold text-gray-800 text-xs uppercase tracking-wider border-b border-gray-100 pb-2';

  return (
    <div>
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="flex items-center gap-3 mb-2"><span className="text-3xl">🏫</span><h2 className="text-xl font-bold">School Profile</h2></div>
        <p className="text-green-200 text-sm">Basic information about your institution to begin the Green School Audit.</p>
      </div>
      <div className="space-y-4">
        <div className={card}>
          <h3 className={h3}>School Identification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProfileField label="School Name *" fieldKey="schoolName" value={data.schoolName} placeholder="Full school name" onChange={set} />
            <ProfileField label="UDISE Code" fieldKey="udise" value={data.udise} placeholder="e.g. 24051234567" onChange={set} />
          </div>
          <ProfileRadio label="School Category" fieldKey="schoolCategory" value={data.schoolCategory} opts={['Government Rural', 'Government Urban', 'Private Rural', 'Private Urban']} onChange={set} />
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Grade Levels Offered</label>
            <div className="flex flex-wrap gap-2">
              {['Primary', 'Upper Primary', 'Secondary', 'Higher Secondary'].map(g => (
                <label key={g} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer text-xs font-medium transition-all ${data.gradeLevels.includes(g) ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-200 text-gray-600 hover:border-green-400'}`}>
                  <input type="checkbox" className="hidden" checked={data.gradeLevels.includes(g)} onChange={() => toggleGrade(g)} />{g}
                </label>
              ))}
            </div>
          </div>
          <ProfileRadio label="Medium of Instruction" fieldKey="medium" value={data.medium} opts={['Gujarati', 'English', 'Hindi']} onChange={set} />
          <ProfileRadio label="Board / Affiliation" fieldKey="board" value={data.board} opts={['Gujarat State Board', 'CBSE', 'ICSE']} onChange={set} />
        </div>
        <div className={card}>
          <h3 className={h3}>Location &amp; Contact</h3>
          <ProfileField label="Full School Address" fieldKey="address" value={data.address} placeholder="Street address, area" onChange={set} />
          <div className="grid grid-cols-2 gap-4">
            <ProfileField label="Village / Ward" fieldKey="village" value={data.village} onChange={set} />
            <ProfileField label="District" fieldKey="district" value={data.district} onChange={set} />
            <ProfileField label="Taluka" fieldKey="taluka" value={data.taluka} onChange={set} />
            <ProfileField label="PIN Code" fieldKey="pinCode" value={data.pinCode} placeholder="3XXXXX" onChange={set} />
          </div>
        </div>
        <div className={card}>
          <h3 className={h3}>Leadership</h3>
          <ProfileField label="Principal Name" fieldKey="principalName" value={data.principalName} onChange={set} />
          <div className="grid grid-cols-2 gap-4">
            <ProfileField label="Mobile No." fieldKey="mobile" value={data.mobile} placeholder="+91 XXXXX XXXXX" onChange={set} />
            <ProfileField label="Email" fieldKey="email" value={data.email} placeholder="principal@school.edu" onChange={set} />
          </div>
        </div>
        <div className={card}>
          <h3 className={h3}>School Snapshot</h3>
          <div className="grid grid-cols-2 gap-4">
            <ProfileField label="Year of Establishment" fieldKey="yearEstablished" value={data.yearEstablished} placeholder="e.g. 1995" onChange={set} />
            <ProfileField label="Total Students" fieldKey="totalStudents" value={data.totalStudents} placeholder="e.g. 450" onChange={set} />
            <ProfileField label="Teaching Staff" fieldKey="totalTeachingStaff" value={data.totalTeachingStaff} placeholder="e.g. 18" onChange={set} />
            <ProfileField label="Non-Teaching Staff" fieldKey="nonTeachingStaff" value={data.nonTeachingStaff} placeholder="e.g. 5" onChange={set} />
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Section Step ──────────────────────────────────────────────────────────────
function SectionStep({ sectionIndex, sectionsData, onChange }: {
  sectionIndex: number; sectionsData: SectionsData; onChange: (sId: string, subId: string, d: SubData) => void;
}) {
  const section = AUDIT_SECTIONS[sectionIndex];
  const sData = sectionsData[section.id] || {};
  return (
    <div>
      <div className="mb-6 rounded-2xl p-5 border-l-4" style={{ background: `${section.color}0a`, borderLeftColor: section.color }}>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{section.icon}</span>
          <div>
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Section {sectionIndex + 1} of {AUDIT_SECTIONS.length}</p>
            <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{section.purpose}</p>
      </div>
      {section.subCriteria.map((sub, idx) => {
        const current = sData[sub.id] || { response: '', files: [] };
        return <SubCriterionCard key={sub.id} number={idx + 1} title={sub.title} hint={sub.hint} data={current} onChange={d => onChange(section.id, sub.id, d)} />;
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AuditFormClient() {
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [profile, setProfile] = useState<SchoolProfile>(defaultProfile);
  const [sectionsData, setSectionsData] = useState<SectionsData>({});
  const [consent, setConsent] = useState<ConsentData>({ submitterName: '', designation: '', submissionDate: '', agreed: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');
  const [error, setError] = useState('');
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Load draft on mount
  useEffect(() => {
    const d = loadDraft();
    if (d) {
      if (d.p) setProfile(d.p);
      if (d.s) setSectionsData(d.s);
      if (d.c) setConsent(d.c);
      if (d.at) setSavedAt(d.at);
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    const t = setTimeout(() => {
      saveDraft(profile, sectionsData, consent);
      setSavedAt(Date.now());
    }, 1500);
    return () => clearTimeout(t);
  }, [profile, sectionsData, consent]);

  const handleSubChange = useCallback((sId: string, subId: string, d: SubData) => {
    setSectionsData(prev => ({ ...prev, [sId]: { ...(prev[sId] || {}), [subId]: d } }));
  }, []);

  const goTo = (n: number) => { setStep(n); setMaxStep(m => Math.max(m, n)); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const next = () => goTo(Math.min(step + 1, TOTAL_STEPS - 1));
  const prev = () => goTo(Math.max(step - 1, 0));

  const handleSubmit = async () => {
    if (!consent.agreed) { setError('Please check the consent declaration to proceed.'); return; }
    if (!consent.submitterName || !consent.designation || !consent.submissionDate) { setError('Please fill all consent fields.'); return; }
    setError(''); setSubmitting(true);
    const id = genId();
    const payload = {
      profile,
      sections: Object.fromEntries(Object.entries(sectionsData).map(([sid, subs]) => [sid, Object.fromEntries(
        Object.entries(subs).map(([subId, d]) => [subId, { response: d.response, files: d.files.filter(f => f.url && !f.uploading && !f.error).map(f => ({ name: f.name, url: f.url })) }])
      )])),
      consent: { submitterName: consent.submitterName, designation: consent.designation, submissionDate: consent.submissionDate },
      submittedAt: new Date().toISOString(),
    };
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${API_URL}/audit-submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      localStorage.removeItem(DRAFT_KEY);
    } catch { /* show success regardless */ }
    finally {
      setSubmitting(false);
      setSubmissionId(id);
      setSubmitted(true);
    }
  };

  if (submitted) return <SuccessScreen schoolName={profile.schoolName} submissionId={submissionId} />;

  const isSectionStep = step >= 1 && step <= AUDIT_SECTIONS.length;
  const isReviewStep = step === REVIEW_STEP;

  return (
    <div className="min-h-screen bg-[#f4f6f4]">
      <Sidebar step={step} maxStep={maxStep} onJump={goTo} savedAt={savedAt} />

      {/* Main content — pushed right of sidebar and below navbar */}
      <div className="lg:ml-64 pt-[68px] pb-20 lg:pb-0">
        <ProgressBar step={step} savedAt={savedAt} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          {step === 0 && <ProfileStep data={profile} onChange={setProfile} />}
          {isSectionStep && <SectionStep sectionIndex={step - 1} sectionsData={sectionsData} onChange={handleSubChange} />}
          {isReviewStep && (
            <ReviewPage
              profile={profile}
              sectionsData={sectionsData}
              consent={consent}
              onEdit={goTo}
              onConsentChange={setConsent}
              onSubmit={handleSubmit}
              submitting={submitting}
              error={error}
            />
          )}

          {/* Navigation */}
          {!isReviewStep && (
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
              <button
                onClick={prev}
                disabled={step === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-bold hover:border-gray-300 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>

              <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold text-gray-400">{step + 1} / {TOTAL_STEPS}</span>
              </div>

              <button
                onClick={next}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg ${
                  step === REVIEW_STEP - 1
                    ? 'bg-gradient-to-r from-green-700 to-green-500 text-white shadow-green-800/25 hover:from-green-600 hover:to-green-400'
                    : 'bg-gray-900 text-white shadow-gray-900/20 hover:bg-gray-800'
                }`}
              >
                {step === REVIEW_STEP - 1 ? '📋 Review & Submit' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
