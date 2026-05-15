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
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-60 bg-[#0b1a0a] z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-sm">🌿</div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Green Mentors</p>
            <p className="text-green-500 text-[9px] mt-0.5 uppercase tracking-wider">School Audit</p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
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
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all ${isActive
                ? 'bg-green-700/40 text-green-300 border border-green-600/30'
                : isDone ? 'text-green-500 hover:bg-white/5 cursor-pointer'
                : canGo ? 'text-white/40 hover:bg-white/5 cursor-pointer'
                : 'text-white/15 cursor-not-allowed'
                }`}
            >
              <span className="text-sm w-5 text-center flex-shrink-0">{isDone && !isActive ? '✓' : icon}</span>
              <span className="text-[11px] font-medium leading-tight truncate flex-1">{label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Save status */}
      <div className="px-4 py-3 border-t border-white/10">
        {savedAt ? (
          <p className="text-[10px] text-green-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            Draft auto-saved
          </p>
        ) : (
          <p className="text-[10px] text-white/20">No draft saved</p>
        )}
      </div>
    </aside>
  );
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step, savedAt }: { step: number; savedAt: number | null }) {
  const pct = Math.round((step / (TOTAL_STEPS - 1)) * 100);
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="px-5 py-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Step {step + 1} / {TOTAL_STEPS}</p>
            <p className="text-sm font-bold text-gray-800">{STEP_LABELS[step]}</p>
          </div>
          <div className="flex items-center gap-3">
            {savedAt && <p className="text-[10px] text-green-600 font-medium">● Saved</p>}
            <span className="text-lg font-bold text-green-700">{pct}%</span>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-800 to-green-400 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        {/* Mini step dots */}
        <div className="flex gap-1 mt-2 justify-center">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`rounded-full transition-all duration-300 ${i < step ? 'bg-green-500 w-3 h-1.5' : i === step ? 'bg-green-800 w-5 h-1.5' : 'bg-gray-200 w-3 h-1.5'}`} />
          ))}
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

// ── Profile Step ──────────────────────────────────────────────────────────────
function ProfileStep({ data, onChange }: { data: SchoolProfile; onChange: (d: SchoolProfile) => void }) {
  const set = (k: keyof SchoolProfile, v: string) => onChange({ ...data, [k]: v });
  const toggleGrade = (g: string) => {
    const arr = data.gradeLevels.includes(g) ? data.gradeLevels.filter(x => x !== g) : [...data.gradeLevels, g];
    onChange({ ...data, gradeLevels: arr });
  };

  const Field = ({ label, k, placeholder = '' }: { label: string; k: keyof SchoolProfile; placeholder?: string }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input type="text" placeholder={placeholder} value={data[k] as string} onChange={e => set(k, e.target.value)}
        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all" />
    </div>
  );

  const Radio = ({ label, k, opts }: { label: string; k: keyof SchoolProfile; opts: string[] }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {opts.map(opt => (
          <label key={opt} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border cursor-pointer text-xs font-medium transition-all ${data[k] === opt ? 'bg-green-800 text-white border-green-800' : 'bg-white border-gray-200 text-gray-600 hover:border-green-400'}`}>
            <input type="radio" className="hidden" checked={data[k] === opt} onChange={() => set(k, opt)} />{opt}
          </label>
        ))}
      </div>
    </div>
  );

  const cardCls = 'bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-sm';
  const h3cls = 'font-bold text-gray-800 text-xs uppercase tracking-wider border-b border-gray-100 pb-2';

  return (
    <div>
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="flex items-center gap-3 mb-2"><span className="text-3xl">🏫</span><h2 className="text-xl font-bold">School Profile</h2></div>
        <p className="text-green-200 text-sm">Basic information about your institution to begin the Green School Audit.</p>
      </div>
      <div className="space-y-4">
        <div className={cardCls}>
          <h3 className={h3cls}>School Identification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="School Name *" k="schoolName" placeholder="Full school name" />
            <Field label="UDISE Code" k="udise" placeholder="e.g. 24051234567" />
          </div>
          <Radio label="School Category" k="schoolCategory" opts={['Government Rural', 'Government Urban', 'Private Rural', 'Private Urban']} />
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
          <Radio label="Medium of Instruction" k="medium" opts={['Gujarati', 'English', 'Hindi']} />
          <Radio label="Board / Affiliation" k="board" opts={['Gujarat State Board', 'CBSE', 'ICSE']} />
        </div>
        <div className={cardCls}>
          <h3 className={h3cls}>Location & Contact</h3>
          <Field label="Full School Address" k="address" placeholder="Street address, area" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Village / Ward" k="village" /><Field label="District" k="district" />
            <Field label="Taluka" k="taluka" /><Field label="PIN Code" k="pinCode" placeholder="3XXXXX" />
          </div>
        </div>
        <div className={cardCls}>
          <h3 className={h3cls}>Leadership</h3>
          <Field label="Principal Name" k="principalName" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Mobile No." k="mobile" placeholder="+91 XXXXX XXXXX" />
            <Field label="Email" k="email" placeholder="principal@school.edu" />
          </div>
        </div>
        <div className={cardCls}>
          <h3 className={h3cls}>School Snapshot</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Year of Establishment" k="yearEstablished" placeholder="e.g. 1995" />
            <Field label="Total Students" k="totalStudents" placeholder="e.g. 450" />
            <Field label="Teaching Staff" k="totalTeachingStaff" placeholder="e.g. 18" />
            <Field label="Non-Teaching Staff" k="nonTeachingStaff" placeholder="e.g. 5" />
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
    <div className="min-h-screen bg-gray-50">
      <Sidebar step={step} maxStep={maxStep} onJump={goTo} savedAt={savedAt} />

      {/* Main content offset for sidebar */}
      <div className="lg:ml-60">
        <ProgressBar step={step} savedAt={savedAt} />

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Step content */}
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
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={prev} disabled={step === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >← Previous</button>

              <div className="text-xs text-gray-400 font-medium">{step + 1} / {TOTAL_STEPS}</div>

              <button
                onClick={next}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-800 text-white text-sm font-semibold hover:bg-green-700 transition-all shadow-md shadow-green-900/20 active:scale-95"
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
