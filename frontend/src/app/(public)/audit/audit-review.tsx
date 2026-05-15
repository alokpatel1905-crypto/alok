'use client';
import React, { useState } from 'react';
import { AUDIT_SECTIONS } from './audit-schema';

type FileItem = { name: string; url: string; uploading?: boolean; error?: boolean };
type SubData = { response: string; files: FileItem[] };
type SectionsData = Record<string, Record<string, SubData>>;
interface SchoolProfile {
  schoolName: string; udise: string; schoolCategory: string; gradeLevels: string[];
  medium: string; board: string; address: string; village: string; district: string;
  taluka: string; pinCode: string; principalName: string; mobile: string; email: string;
  yearEstablished: string; totalStudents: string; totalTeachingStaff: string; nonTeachingStaff: string;
}
interface ConsentData { submitterName: string; designation: string; submissionDate: string; agreed: boolean }

interface ReviewPageProps {
  profile: SchoolProfile;
  sectionsData: SectionsData;
  consent: ConsentData;
  onEdit: (step: number) => void;
  onConsentChange: (d: ConsentData) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
}

function ReviewSection({ title, icon, color, stepIndex, onEdit, children }: {
  title: string; icon: string; color: string; stepIndex: number;
  onEdit: (s: number) => void; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3">
      <button
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-gray-800 text-sm">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={e => { e.stopPropagation(); onEdit(stepIndex); }}
            className="px-3 py-1 rounded-lg text-xs font-semibold border border-green-300 text-green-700 hover:bg-green-50 transition-colors"
          >✏️ Edit</button>
          <span className="text-gray-400 text-sm">{open ? '▲' : '▼'}</span>
        </div>
      </button>
      {open && <div className="px-5 pb-4 border-t border-gray-50">{children}</div>}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-500 w-36 flex-shrink-0 font-medium">{label}</span>
      <span className="text-xs text-gray-800 flex-1">{value}</span>
    </div>
  );
}

function FileGrid({ files }: { files: FileItem[] }) {
  const valid = files.filter(f => f.url && !f.uploading && !f.error);
  if (!valid.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {valid.map((f, i) => (
        <a key={i} href={f.url} target="_blank" rel="noreferrer" className="group relative">
          {(f.url.match(/\.(jpg|jpeg|png|gif|webp)/i) || f.url.includes('image')) ? (
            <img src={f.url} alt={f.name} className="w-14 h-14 object-cover rounded-lg border border-gray-200 group-hover:opacity-80 transition-opacity" />
          ) : (
            <div className="w-14 h-14 flex flex-col items-center justify-center bg-blue-50 rounded-lg border border-blue-200 text-blue-600 text-lg group-hover:bg-blue-100 transition-colors">
              📄<span className="text-[8px] text-blue-500 mt-0.5 truncate w-12 text-center">{f.name.split('.').pop()?.toUpperCase()}</span>
            </div>
          )}
        </a>
      ))}
    </div>
  );
}

export default function ReviewPage({ profile, sectionsData, consent, onEdit, onConsentChange, onSubmit, submitting, error }: ReviewPageProps) {
  const profileFields: [string, string][] = [
    ['School Name', profile.schoolName], ['UDISE Code', profile.udise],
    ['Category', profile.schoolCategory], ['Grade Levels', profile.gradeLevels.join(', ')],
    ['Medium', profile.medium], ['Board', profile.board], ['Address', profile.address],
    ['Village / Ward', profile.village], ['District', profile.district],
    ['Taluka', profile.taluka], ['PIN Code', profile.pinCode],
    ['Principal', profile.principalName], ['Mobile', profile.mobile],
    ['Email', profile.email], ['Established', profile.yearEstablished],
    ['Students', profile.totalStudents], ['Teaching Staff', profile.totalTeachingStaff],
    ['Non-Teaching', profile.nonTeachingStaff],
  ];

  const filledSections = AUDIT_SECTIONS.filter(s => {
    const sd = sectionsData[s.id];
    return sd && Object.values(sd).some(v => v.response.trim() || v.files.some(f => f.url));
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-green-900 to-green-700 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">📋</span>
          <h2 className="text-xl font-bold">Review & Confirm</h2>
        </div>
        <p className="text-green-200 text-sm">Please review all your entries carefully. Click Edit to go back to any section.</p>
      </div>

      {/* School Profile */}
      <ReviewSection title="School Profile" icon="🏫" color="#1C2B1A" stepIndex={0} onEdit={onEdit}>
        <div className="mt-3">{profileFields.map(([l, v]) => <InfoRow key={l} label={l} value={v} />)}</div>
      </ReviewSection>

      {/* Audit Sections */}
      {AUDIT_SECTIONS.map((section, si) => {
        const sData = sectionsData[section.id] || {};
        const hasData = Object.values(sData).some(v => v.response.trim() || v.files.some(f => f.url));
        return (
          <ReviewSection key={section.id} title={section.title} icon={section.icon} color={section.color} stepIndex={si + 1} onEdit={onEdit}>
            {!hasData ? (
              <p className="text-xs text-gray-400 mt-3 italic">No responses entered for this section.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {section.subCriteria.map((sub, idx) => {
                  const d = sData[sub.id] || { response: '', files: [] };
                  if (!d.response.trim() && !d.files.some(f => f.url)) return null;
                  return (
                    <div key={sub.id} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-gray-700 mb-1">{idx + 1}. {sub.title}</p>
                      {d.response && <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap">{d.response}</p>}
                      <FileGrid files={d.files} />
                    </div>
                  );
                })}
              </div>
            )}
          </ReviewSection>
        );
      })}

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3 my-5">
        {[
          ['Sections Filled', `${filledSections.length} / ${AUDIT_SECTIONS.length}`],
          ['Total Files', String(Object.values(sectionsData).flatMap(s => Object.values(s).flatMap(d => d.files.filter(f => f.url))).length)],
          ['Responses', String(Object.values(sectionsData).flatMap(s => Object.values(s).filter(d => d.response.trim())).length)],
        ].map(([label, val]) => (
          <div key={label} className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
            <p className="text-lg font-bold text-green-700">{val}</p>
            <p className="text-[10px] text-green-600 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Consent */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
        <h3 className="font-bold text-gray-800 mb-4 text-sm">Consent & Declaration</h3>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-green-800 leading-relaxed mb-4">
          <strong>Consent for Audit Visit:</strong> I confirm that the information provided is accurate and the school agrees to support Green Mentors&apos; audit team with access to documents, facilities, and stakeholders as required.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {[
            ['Name of Submitter *', 'submitterName', 'text'],
            ['Designation *', 'designation', 'text'],
            ['Date of Submission *', 'submissionDate', 'date'],
          ].map(([label, key, type]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
              <input
                type={type}
                value={(consent as any)[key]}
                onChange={e => onConsentChange({ ...consent, [key]: e.target.value })}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
              />
            </div>
          ))}
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <div
            className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 transition-all flex items-center justify-center ${consent.agreed ? 'bg-green-700 border-green-700' : 'border-gray-300 hover:border-green-400'}`}
            onClick={() => onConsentChange({ ...consent, agreed: !consent.agreed })}
          >
            {consent.agreed && <span className="text-white text-xs font-bold">✓</span>}
          </div>
          <span className="text-sm text-gray-600">I confirm all information is accurate and complete. The school consents to an on-site audit visit by the Green Mentors team.</span>
        </label>
      </div>

      {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

      <button
        onClick={onSubmit}
        disabled={submitting || !consent.agreed}
        className="w-full py-4 bg-gradient-to-r from-green-800 to-green-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-green-900/30 hover:from-green-700 hover:to-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.99]"
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting…</span>
        ) : '🌱 Submit Green School Audit'}
      </button>
    </div>
  );
}
