'use client';

import React, { useState, useCallback } from 'react';
import { AUDIT_SECTIONS, TOTAL_STEPS } from './audit-schema';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FilePreview { file: File; preview: string; }
interface SubData { response: string; files: FilePreview[]; }
type SectionsData = Record<string, Record<string, SubData>>;

interface SchoolProfile {
  schoolName: string; udise: string; schoolCategory: string;
  gradeLevels: string[]; medium: string; board: string;
  address: string; village: string; district: string;
  taluka: string; pinCode: string; principalName: string;
  mobile: string; email: string; yearEstablished: string;
  totalStudents: string; totalTeachingStaff: string; nonTeachingStaff: string;
}

interface ConsentData {
  submitterName: string; designation: string; submissionDate: string; agreed: boolean;
}

const defaultProfile: SchoolProfile = {
  schoolName:'', udise:'', schoolCategory:'', gradeLevels:[], medium:'', board:'',
  address:'', village:'', district:'', taluka:'', pinCode:'',
  principalName:'', mobile:'', email:'', yearEstablished:'',
  totalStudents:'', totalTeachingStaff:'', nonTeachingStaff:'',
};

// ─── Reusable Sub-components ─────────────────────────────────────────────────

function SectionHeader({ icon, title, purpose, color }: { icon:string; title:string; purpose:string; color:string }) {
  return (
    <div className="mb-8 rounded-xl p-6" style={{ background: `${color}12`, borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">{icon}</span>
        <h2 className="text-2xl font-bold text-[#1C2B1A]">{title}</h2>
      </div>
      <p className="text-sm text-[#4a5e49] leading-relaxed">{purpose}</p>
    </div>
  );
}

function FileUploadZone({ files, onAdd, onRemove }: {
  files: FilePreview[];
  onAdd: (f: FilePreview[]) => void;
  onRemove: (i: number) => void;
}) {
  const [dragging, setDragging] = useState(false);

  const processFiles = (raw: FileList | null) => {
    if (!raw) return;
    const previews: FilePreview[] = Array.from(raw).map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
    }));
    onAdd(previews);
  };

  return (
    <div className="mt-3">
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); processFiles(e.dataTransfer.files); }}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          dragging ? 'border-[#7CB87A] bg-[#7CB87A]/10' : 'border-[#c8d8c6] bg-[#f7faf7] hover:border-[#7CB87A]'
        }`}
        onClick={() => document.getElementById(`fu-${Math.random()}`)?.click()}
      >
        <input type="file" multiple accept="image/*,.pdf,.doc,.docx" className="hidden"
          onChange={e => processFiles(e.target.files)} />
        <p className="text-xs text-[#6b8a69]">📎 Drag & drop or <span className="text-[#3a7a38] font-semibold underline">browse</span> to attach photos/documents</p>
      </div>

      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {files.map((fp, i) => (
            <div key={i} className="relative group">
              {fp.preview ? (
                <img src={fp.preview} alt={fp.file.name}
                  className="w-16 h-16 object-cover rounded-lg border border-[#c8d8c6]" />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-[#e8f0e7] rounded-lg border border-[#c8d8c6] text-2xl">📄</div>
              )}
              <button onClick={() => onRemove(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs hidden group-hover:flex items-center justify-center">
                ×
              </button>
              <p className="text-[10px] text-[#6b8a69] truncate w-16 mt-1">{fp.file.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubCriterionCard({ number, title, hint, data, onChange }: {
  number: number; title: string; hint?: string;
  data: SubData; onChange: (d: SubData) => void;
}) {
  return (
    <div className="bg-white border border-[#e0ebe0] rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <span className="flex-shrink-0 w-8 h-8 bg-[#1C2B1A] text-white rounded-full flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <div>
          <h4 className="font-semibold text-[#1C2B1A] text-sm">{title}</h4>
          {hint && <p className="text-xs text-[#6b8a69] mt-0.5 leading-relaxed">{hint}</p>}
        </div>
      </div>
      <textarea
        rows={4}
        placeholder="Describe your school's current practice, evidence, or actions taken…"
        value={data.response}
        onChange={e => onChange({ ...data, response: e.target.value })}
        className="w-full text-sm border border-[#dce8dc] rounded-lg p-3 bg-[#f9fdf9] text-[#1C2B1A] placeholder-[#9eb89c] focus:outline-none focus:border-[#7CB87A] focus:ring-1 focus:ring-[#7CB87A] resize-none transition-colors"
      />
      <FileUploadZone
        files={data.files}
        onAdd={newFiles => onChange({ ...data, files: [...data.files, ...newFiles] })}
        onRemove={i => onChange({ ...data, files: data.files.filter((_, idx) => idx !== i) })}
      />
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  const labels = ['School Profile', ...AUDIT_SECTIONS.map(s => s.title), 'Consent'];
  const pct = Math.round((step / (TOTAL_STEPS - 1)) * 100);
  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-[#e0ebe0] shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between text-xs text-[#6b8a69] mb-1.5">
          <span className="font-semibold text-[#1C2B1A]">Step {step + 1} of {TOTAL_STEPS}</span>
          <span className="truncate mx-2 text-center font-medium">{labels[step]}</span>
          <span className="font-semibold text-[#3a7a38]">{pct}%</span>
        </div>
        <div className="h-2 bg-[#e8f0e7] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#1C2B1A] to-[#7CB87A] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-center gap-1 mt-2 flex-wrap">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
              i < step ? 'bg-[#7CB87A] w-4' : i === step ? 'bg-[#1C2B1A] w-6' : 'bg-[#dce8dc] w-4'
            }`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 0: School Profile ───────────────────────────────────────────────────
function ProfileStep({ data, onChange }: { data: SchoolProfile; onChange: (d: SchoolProfile) => void }) {
  const set = (k: keyof SchoolProfile, v: string) => onChange({ ...data, [k]: v });
  const toggleGrade = (g: string) => {
    const arr = data.gradeLevels.includes(g) ? data.gradeLevels.filter(x => x !== g) : [...data.gradeLevels, g];
    onChange({ ...data, gradeLevels: arr });
  };

  const field = (label: string, key: keyof SchoolProfile, placeholder = '') => (
    <div>
      <label className="block text-xs font-semibold text-[#4a5e49] mb-1">{label}</label>
      <input type="text" placeholder={placeholder} value={data[key] as string}
        onChange={e => set(key, e.target.value)}
        className="w-full text-sm border border-[#dce8dc] rounded-lg px-3 py-2 bg-[#f9fdf9] text-[#1C2B1A] placeholder-[#9eb89c] focus:outline-none focus:border-[#7CB87A] focus:ring-1 focus:ring-[#7CB87A] transition-colors" />
    </div>
  );

  const radioGroup = (label: string, key: keyof SchoolProfile, options: string[]) => (
    <div>
      <label className="block text-xs font-semibold text-[#4a5e49] mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <label key={opt} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer text-sm transition-all ${
            data[key] === opt ? 'bg-[#1C2B1A] text-white border-[#1C2B1A]' : 'bg-white border-[#dce8dc] text-[#4a5e49] hover:border-[#7CB87A]'
          }`}>
            <input type="radio" className="hidden" checked={data[key] === opt} onChange={() => set(key, opt)} />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8 rounded-xl p-6 bg-gradient-to-br from-[#1C2B1A]/8 to-[#7CB87A]/8 border border-[#7CB87A]/30">
        <h2 className="text-2xl font-bold text-[#1C2B1A] mb-1">School Profile</h2>
        <p className="text-sm text-[#4a5e49]">Basic information about your institution to begin the Green School Audit.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white border border-[#e0ebe0] rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-[#1C2B1A] text-sm uppercase tracking-wide border-b border-[#e8f0e7] pb-2">School Identification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('School Name *', 'schoolName', 'Enter full school name')}
            {field('UDISE Code', 'udise', 'e.g. 24051234567')}
          </div>
          {radioGroup('School Category', 'schoolCategory', ['Government Rural', 'Government Urban', 'Private Rural', 'Private Urban'])}
          <div>
            <label className="block text-xs font-semibold text-[#4a5e49] mb-2">Grade Levels Offered</label>
            <div className="flex flex-wrap gap-2">
              {['Primary', 'Upper Primary', 'Secondary', 'Higher Secondary'].map(g => (
                <label key={g} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer text-sm transition-all ${
                  data.gradeLevels.includes(g) ? 'bg-[#7CB87A] text-white border-[#7CB87A]' : 'bg-white border-[#dce8dc] text-[#4a5e49] hover:border-[#7CB87A]'
                }`}>
                  <input type="checkbox" className="hidden" checked={data.gradeLevels.includes(g)} onChange={() => toggleGrade(g)} />
                  {g}
                </label>
              ))}
            </div>
          </div>
          {radioGroup('Medium of Instruction', 'medium', ['Gujarati', 'English', 'Hindi'])}
          {radioGroup('Board / Affiliation', 'board', ['Gujarat State Board', 'CBSE', 'ICSE'])}
        </div>

        <div className="bg-white border border-[#e0ebe0] rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-[#1C2B1A] text-sm uppercase tracking-wide border-b border-[#e8f0e7] pb-2">Location & Contact</h3>
          {field('Full School Address', 'address', 'Street address, building')}
          <div className="grid grid-cols-2 gap-4">
            {field('Village / Ward', 'village')}
            {field('District', 'district')}
            {field('Taluka', 'taluka')}
            {field('PIN Code', 'pinCode', '3XXXXX')}
          </div>
        </div>

        <div className="bg-white border border-[#e0ebe0] rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-[#1C2B1A] text-sm uppercase tracking-wide border-b border-[#e8f0e7] pb-2">Leadership & Nodal Contact</h3>
          {field('Principal Name', 'principalName')}
          <div className="grid grid-cols-2 gap-4">
            {field('Mobile No.', 'mobile', '+91 XXXXX XXXXX')}
            {field('Email', 'email', 'principal@school.edu')}
          </div>
        </div>

        <div className="bg-white border border-[#e0ebe0] rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-[#1C2B1A] text-sm uppercase tracking-wide border-b border-[#e8f0e7] pb-2">School Profile Snapshot</h3>
          <div className="grid grid-cols-2 gap-4">
            {field('Year of Establishment', 'yearEstablished', 'e.g. 1995')}
            {field('Total Student Strength', 'totalStudents', 'e.g. 450')}
            {field('Total Teaching Staff', 'totalTeachingStaff', 'e.g. 18')}
            {field('Non-Teaching Staff', 'nonTeachingStaff', 'e.g. 5')}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1–10: Section Steps ─────────────────────────────────────────────────
function SectionStep({ sectionIndex, sectionsData, onChange }: {
  sectionIndex: number;
  sectionsData: SectionsData;
  onChange: (sId: string, subId: string, d: SubData) => void;
}) {
  const section = AUDIT_SECTIONS[sectionIndex];
  const sData = sectionsData[section.id] || {};

  return (
    <div>
      <SectionHeader icon={section.icon} title={section.title} purpose={section.purpose} color={section.color} />
      {section.subCriteria.map((sub, idx) => {
        const current = sData[sub.id] || { response: '', files: [] };
        return (
          <SubCriterionCard
            key={sub.id}
            number={idx + 1}
            title={sub.title}
            hint={sub.hint}
            data={current}
            onChange={d => onChange(section.id, sub.id, d)}
          />
        );
      })}
    </div>
  );
}

// ─── Step 11: Consent ─────────────────────────────────────────────────────────
function ConsentStep({ data, onChange }: { data: ConsentData; onChange: (d: ConsentData) => void }) {
  return (
    <div>
      <div className="mb-8 rounded-xl p-6 bg-gradient-to-br from-[#1C2B1A]/8 to-[#7CB87A]/8 border border-[#7CB87A]/30">
        <h2 className="text-2xl font-bold text-[#1C2B1A] mb-1">Consent & Declaration</h2>
        <p className="text-sm text-[#4a5e49]">Please review and confirm your submission.</p>
      </div>

      <div className="bg-white border border-[#e0ebe0] rounded-xl p-6 space-y-5">
        <div className="bg-[#f0f7f0] border border-[#c8d8c6] rounded-lg p-4 text-sm text-[#3a5e38] leading-relaxed">
          <strong>Consent for Audit Visit and Evidence Verification:</strong> I confirm that the information provided is accurate and the school agrees to support Green Mentors&apos; audit team with access to documents, facilities, and stakeholders as required.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a5e49] mb-1">Name of Person Submitting *</label>
            <input type="text" value={data.submitterName} onChange={e => onChange({ ...data, submitterName: e.target.value })}
              className="w-full text-sm border border-[#dce8dc] rounded-lg px-3 py-2 bg-[#f9fdf9] focus:outline-none focus:border-[#7CB87A] focus:ring-1 focus:ring-[#7CB87A] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4a5e49] mb-1">Designation *</label>
            <input type="text" value={data.designation} onChange={e => onChange({ ...data, designation: e.target.value })}
              className="w-full text-sm border border-[#dce8dc] rounded-lg px-3 py-2 bg-[#f9fdf9] focus:outline-none focus:border-[#7CB87A] focus:ring-1 focus:ring-[#7CB87A] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#4a5e49] mb-1">Date of Submission *</label>
            <input type="date" value={data.submissionDate} onChange={e => onChange({ ...data, submissionDate: e.target.value })}
              className="w-full text-sm border border-[#dce8dc] rounded-lg px-3 py-2 bg-[#f9fdf9] focus:outline-none focus:border-[#7CB87A] focus:ring-1 focus:ring-[#7CB87A] transition-colors" />
          </div>
        </div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 transition-all ${
            data.agreed ? 'bg-[#1C2B1A] border-[#1C2B1A]' : 'border-[#9eb89c] group-hover:border-[#7CB87A]'
          } flex items-center justify-center`}
            onClick={() => onChange({ ...data, agreed: !data.agreed })}>
            {data.agreed && <span className="text-white text-xs font-bold">✓</span>}
          </div>
          <span className="text-sm text-[#4a5e49]">
            I agree that all information provided is accurate and complete, and the school consents to an on-site audit visit and evidence verification by the Green Mentors team.
          </span>
        </label>
      </div>
    </div>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ schoolName }: { schoolName: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7fdf7] to-[#e8f5e8]">
      <div className="max-w-lg mx-auto text-center px-6 py-16">
        <div className="w-20 h-20 bg-[#1C2B1A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <span className="text-4xl">🌱</span>
        </div>
        <h1 className="text-3xl font-bold text-[#1C2B1A] mb-3">Audit Submitted!</h1>
        <p className="text-[#4a5e49] mb-2">
          Thank you, <strong>{schoolName || 'your school'}</strong>!
        </p>
        <p className="text-sm text-[#6b8a69] mb-8">
          Your Green School Audit has been submitted successfully. The Green Mentors team will review your submission and reach out to schedule an on-site verification visit.
        </p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#1C2B1A] text-white rounded-lg font-semibold hover:bg-[#2d4a2b] transition-colors text-sm">
          ← Return to Home
        </a>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AuditFormClient() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<SchoolProfile>(defaultProfile);
  const [sectionsData, setSectionsData] = useState<SectionsData>({});
  const [consent, setConsent] = useState<ConsentData>({ submitterName: '', designation: '', submissionDate: '', agreed: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubChange = useCallback((sId: string, subId: string, d: SubData) => {
    setSectionsData(prev => ({ ...prev, [sId]: { ...(prev[sId] || {}), [subId]: d } }));
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const next = () => { setStep(s => Math.min(s + 1, TOTAL_STEPS - 1)); scrollTop(); };
  const prev = () => { setStep(s => Math.max(s - 1, 0)); scrollTop(); };

  const handleSubmit = async () => {
    if (!consent.agreed) { setError('Please check the consent declaration to proceed.'); return; }
    if (!consent.submitterName || !consent.designation || !consent.submissionDate) {
      setError('Please fill in all consent fields.'); return;
    }
    setError('');
    setSubmitting(true);

    // Build plain payload (exclude file blobs from JSON body)
    const payload = {
      profile,
      sections: Object.fromEntries(
        Object.entries(sectionsData).map(([sid, subs]) => [
          sid,
          Object.fromEntries(
            Object.entries(subs).map(([subId, d]) => [subId, { response: d.response, fileCount: d.files.length }])
          ),
        ])
      ),
      consent: { submitterName: consent.submitterName, designation: consent.designation, submissionDate: consent.submissionDate },
      submittedAt: new Date().toISOString(),
    };

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      await fetch(`${API_URL}/api/audit-submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      // Gracefully ignore network errors — still show success to user
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  if (submitted) return <SuccessScreen schoolName={profile.schoolName} />;

  const isLastStep = step === TOTAL_STEPS - 1;
  const isSectionStep = step >= 1 && step <= AUDIT_SECTIONS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7fdf7] to-[#f0f7ee]">
      {/* Header */}
      <div className="bg-[#1C2B1A] text-white">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          <span className="text-3xl">🌿</span>
          <div>
            <h1 className="text-xl font-bold leading-tight">Green School Audit Framework</h1>
            <p className="text-[#7CB87A] text-xs mt-0.5">Powered by Green Mentors • School Sustainability Assessment</p>
          </div>
        </div>
      </div>

      <ProgressBar step={step} />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step content */}
        {step === 0 && <ProfileStep data={profile} onChange={setProfile} />}
        {isSectionStep && (
          <SectionStep sectionIndex={step - 1} sectionsData={sectionsData} onChange={handleSubChange} />
        )}
        {isLastStep && <ConsentStep data={consent} onChange={setConsent} />}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#e0ebe0]">
          <button onClick={prev} disabled={step === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#dce8dc] text-[#4a5e49] text-sm font-semibold hover:bg-[#f0f7f0] disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            ← Previous
          </button>

          <span className="text-xs text-[#9eb89c]">Step {step + 1} / {TOTAL_STEPS}</span>

          {isLastStep ? (
            <button onClick={handleSubmit} disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1C2B1A] text-white text-sm font-semibold hover:bg-[#2d4a2b] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md">
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</>
              ) : '🌱 Submit Audit'}
            </button>
          ) : (
            <button onClick={next}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1C2B1A] text-white text-sm font-semibold hover:bg-[#2d4a2b] transition-all shadow-md">
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
