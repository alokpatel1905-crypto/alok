'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  PENDING:         { bg: '#2d2416', color: '#f59e0b' },
  UNDER_REVIEW:    { bg: '#1a2440', color: '#60a5fa' },
  VISIT_SCHEDULED: { bg: '#1a2d1a', color: '#4ade80' },
  COMPLETED:       { bg: '#1c2b1a', color: '#86efac' },
  REJECTED:        { bg: '#2d1a1a', color: '#f87171' },
};
const ALL_STATUSES = ['PENDING', 'UNDER_REVIEW', 'VISIT_SCHEDULED', 'COMPLETED', 'REJECTED'];

const SECTION_NAMES = [
  'Governance & Leadership',
  'Sustainable Design',
  'Water Management Practices',
  'Energy Management Practices',
  'Air Quality Level',
  'Health & Hygiene',
  'Waste Management Practices',
  'Greening Education Practices',
  'Greening Innovation',
  'Localization of Education',
];

const SECTION_ICONS = ['🏛️','🏗️','💧','⚡','🌬️','🧼','♻️','📚','💡','🌍'];

function isImage(url: string) {
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url);
}

function FileGrid({ files }: { files: any[] }) {
  if (!files || files.length === 0) return <p style={{ color: '#555', fontSize: '0.78rem' }}>No files uploaded</p>;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
      {files.map((f: any, i: number) => {
        const url = f.url || f;
        const name = f.name || `File ${i + 1}`;
        if (isImage(url)) {
          return (
            <a key={i} href={url} target="_blank" rel="noreferrer" style={{ display: 'block', borderRadius: 8, overflow: 'hidden', border: '1px solid #2a2a2a' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={name} style={{ width: 80, height: 80, objectFit: 'cover', display: 'block' }} />
            </a>
          );
        }
        return (
          <a key={i} href={url} target="_blank" rel="noreferrer"
            style={{ padding: '6px 12px', background: '#1a1a1a', border: '1px solid #333', borderRadius: 8, color: '#7CB87A', fontSize: '0.75rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
            📄 {name}
          </a>
        );
      })}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', gap: 8, padding: '5px 0', borderBottom: '1px solid #1a1a1a' }}>
      <span style={{ color: '#555', fontSize: '0.75rem', minWidth: 140, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#ccc', fontSize: '0.82rem', wordBreak: 'break-word' }}>{value}</span>
    </div>
  );
}

export default function AuditSubmissionsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [reviewNote, setReviewNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile'|'sections'|'files'|'status'>('profile');

  const fetchList = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15' });
      if (filterStatus) params.set('status', filterStatus);
      const res = await apiFetch(`/admin/audit-submissions?${params}`);
      setData(res);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchList(); }, [page, filterStatus]);

  const openDetail = async (id: string) => {
    setDetailLoading(true); setSelected(null); setActiveTab('profile');
    try {
      const res = await apiFetch(`/admin/audit-submissions/${id}`);
      setSelected(res); setStatusUpdate(res.status); setReviewNote(res.reviewNote || '');
    } catch (e) { console.error(e); }
    finally { setDetailLoading(false); }
  };

  const saveStatus = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await apiFetch(`/admin/audit-submissions/${selected.id}/status`, {
        method: 'PATCH', body: JSON.stringify({ status: statusUpdate, reviewNote }),
      });
      setSelected((p: any) => ({ ...p, status: statusUpdate, reviewNote }));
      fetchList();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    try {
      await apiFetch(`/admin/audit-submissions/${id}`, { method: 'DELETE' });
      setSelected(null); fetchList();
    } catch (e) { console.error(e); }
  };

  // Collect all uploaded files across sections
  const allFiles = selected ? Object.values(selected.sections || {}).flatMap((sec: any) => sec?.files || []) : [];
  const filledSections = selected ? Object.keys(selected.sections || {}).length : 0;

  return (
    <div style={{ padding: '20px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>🌿 Audit Submissions</h1>
          <p style={{ color: '#6b8a69', marginTop: 4, fontSize: '0.85rem' }}>Green School Audit Framework — submitted forms</p>
        </div>
        <div style={{ background: '#1C2B1A', color: '#7CB87A', padding: '8px 16px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600 }}>
          {data?.total ?? 0} Total Submissions
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['', ...ALL_STATUSES].map(s => {
          const sc = STATUS_COLORS[s] || { bg: '#1C2B1A', color: '#7CB87A' };
          const active = filterStatus === s;
          return (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              style={{ padding: '7px 14px', borderRadius: 8, border: `1px solid ${active ? sc.color : '#333'}`, background: active ? sc.bg : '#111', color: active ? sc.color : '#555', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              {s ? s.replace(/_/g, ' ') : 'All'}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Table */}
        <div style={{ flex: selected ? '0 0 42%' : '1', minWidth: 0 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>Loading…</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#111' }}>
                  <tr>
                    <th style={thStyle}>School</th>
                    <th style={thStyle}>District</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item: any) => {
                    const sc = STATUS_COLORS[item.status] || STATUS_COLORS.PENDING;
                    return (
                      <tr key={item.id} onClick={() => openDetail(item.id)}
                        style={{ borderTop: '1px solid #222', cursor: 'pointer', background: selected?.id === item.id ? '#1C2B1A22' : 'transparent' }}>
                        <td style={tdStyle}>
                          <div style={{ fontWeight: 600, color: '#e8f5e8', fontSize: '0.88rem' }}>{item.schoolName}</div>
                          {item.udise && <div style={{ color: '#555', fontSize: '0.72rem' }}>{item.udise}</div>}
                        </td>
                        <td style={{ ...tdStyle, color: '#888', fontSize: '0.82rem' }}>{item.district || '—'}</td>
                        <td style={{ ...tdStyle, color: '#666', fontSize: '0.75rem' }}>
                          {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td style={tdStyle}>
                          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, background: sc.bg, color: sc.color }}>
                            {item.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {(!data?.data || data.data.length === 0) && (
                    <tr><td colSpan={4} style={{ padding: 60, textAlign: 'center', color: '#444' }}>No audit submissions found</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {data && data.totalPages > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                style={{ padding: '7px 14px', background: '#222', border: '1px solid #333', color: page === 1 ? '#444' : '#aaa', borderRadius: 6, cursor: page === 1 ? 'not-allowed' : 'pointer' }}>← Prev</button>
              <span style={{ padding: '7px 12px', color: '#666', fontSize: '0.82rem' }}>Page {page} of {data.totalPages}</span>
              <button disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)}
                style={{ padding: '7px 14px', background: '#222', border: '1px solid #333', color: page >= data.totalPages ? '#444' : '#aaa', borderRadius: 6, cursor: page >= data.totalPages ? 'not-allowed' : 'pointer' }}>Next →</button>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {(selected || detailLoading) && (
          <div style={{ flex: '1', background: '#111', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            {detailLoading ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>Loading details…</div>
            ) : selected && (
              <>
                {/* Panel Header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid #222', background: '#0d1f0c', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexShrink: 0 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#e8f5e8', fontSize: '1rem' }}>{selected.schoolName}</div>
                    <div style={{ color: '#6b8a69', fontSize: '0.75rem', marginTop: 2 }}>
                      {selected.udise && `UDISE: ${selected.udise} · `}{selected.schoolCategory} · {selected.board}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <span style={{ background: '#1C2B1A', color: '#7CB87A', padding: '2px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600 }}>{filledSections}/10 sections</span>
                      <span style={{ background: '#1a2440', color: '#60a5fa', padding: '2px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600 }}>{allFiles.length} files</span>
                      <span style={{ ...STATUS_COLORS[selected.status], padding: '2px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 600 }}>{selected.status?.replace(/_/g, ' ')}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', borderBottom: '1px solid #222', flexShrink: 0 }}>
                  {(['profile', 'sections', 'files', 'status'] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      style={{ flex: 1, padding: '10px 0', background: 'none', border: 'none', color: activeTab === tab ? '#7CB87A' : '#444', borderBottom: activeTab === tab ? '2px solid #7CB87A' : '2px solid transparent', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {tab === 'profile' ? '🏫 Profile' : tab === 'sections' ? '📋 Sections' : tab === 'files' ? '📎 Files' : '⚙️ Status'}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div style={{ overflowY: 'auto', flex: 1, padding: '16px 20px' }}>

                  {/* PROFILE TAB */}
                  {activeTab === 'profile' && (
                    <div>
                      <Section title="School Identification">
                        <InfoRow label="School Name" value={selected.schoolName} />
                        <InfoRow label="UDISE Code" value={selected.udise} />
                        <InfoRow label="Category" value={selected.schoolCategory} />
                        <InfoRow label="Grade Levels" value={selected.gradeLevels?.join(', ')} />
                        <InfoRow label="Medium" value={selected.medium} />
                        <InfoRow label="Board" value={selected.board} />
                      </Section>
                      <Section title="Location & Contact">
                        <InfoRow label="Full Address" value={selected.address} />
                        <InfoRow label="Village / Ward" value={selected.village} />
                        <InfoRow label="District" value={selected.district} />
                        <InfoRow label="Taluka" value={selected.taluka} />
                        <InfoRow label="PIN Code" value={selected.pinCode} />
                      </Section>
                      <Section title="Leadership">
                        <InfoRow label="Principal Name" value={selected.principalName} />
                        <InfoRow label="Mobile No." value={selected.mobile} />
                        <InfoRow label="Email" value={selected.email} />
                      </Section>
                      <Section title="School Snapshot">
                        <InfoRow label="Year Established" value={selected.yearEstablished} />
                        <InfoRow label="Total Students" value={selected.totalStudents} />
                        <InfoRow label="Teaching Staff" value={selected.totalTeachingStaff} />
                        <InfoRow label="Non-Teaching Staff" value={selected.nonTeachingStaff} />
                      </Section>
                      <Section title="Submitted By">
                        <InfoRow label="Submitter Name" value={selected.submitterName} />
                        <InfoRow label="Designation" value={selected.designation} />
                        <InfoRow label="Submission Date" value={selected.submissionDate} />
                        <InfoRow label="Submitted At" value={selected.submittedAt ? new Date(selected.submittedAt).toLocaleString('en-IN') : undefined} />
                      </Section>
                    </div>
                  )}

                  {/* SECTIONS TAB */}
                  {activeTab === 'sections' && (
                    <div>
                      {SECTION_NAMES.map((name, i) => {
                        const key = `section_${i}`;
                        const sec = selected.sections?.[key];
                        return (
                          <div key={key} style={{ marginBottom: 16, background: '#1a1a1a', borderRadius: 10, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                            <div style={{ padding: '10px 14px', background: sec ? '#0d1f0c' : '#111', borderBottom: '1px solid #222', display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ fontSize: '1rem' }}>{SECTION_ICONS[i]}</span>
                              <span style={{ fontWeight: 600, color: sec ? '#7CB87A' : '#555', fontSize: '0.85rem' }}>{name}</span>
                              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: sec ? '#4ade80' : '#555' }}>{sec ? '✓ Filled' : '— Empty'}</span>
                            </div>
                            {sec ? (
                              <div style={{ padding: '12px 14px' }}>
                                {sec.response && (
                                  <div style={{ marginBottom: 10 }}>
                                    <div style={{ color: '#7CB87A', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>Response</div>
                                    <p style={{ color: '#ccc', fontSize: '0.83rem', lineHeight: 1.6, margin: 0, background: '#111', padding: '10px 12px', borderRadius: 8, border: '1px solid #2a2a2a', whiteSpace: 'pre-wrap' }}>{sec.response}</p>
                                  </div>
                                )}
                                {sec.files?.length > 0 && (
                                  <div>
                                    <div style={{ color: '#60a5fa', fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>📎 Attached Files ({sec.files.length})</div>
                                    <FileGrid files={sec.files} />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div style={{ padding: '12px 14px', color: '#444', fontSize: '0.8rem' }}>No response provided for this section.</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* FILES TAB */}
                  {activeTab === 'files' && (
                    <div>
                      <div style={{ color: '#7CB87A', fontSize: '0.8rem', fontWeight: 600, marginBottom: 12 }}>All uploaded files ({allFiles.length})</div>
                      {allFiles.length === 0 ? (
                        <p style={{ color: '#555' }}>No files uploaded across any section.</p>
                      ) : (
                        SECTION_NAMES.map((name, i) => {
                          const sec = selected.sections?.[`section_${i}`];
                          const files = sec?.files || [];
                          if (!files.length) return null;
                          return (
                            <div key={i} style={{ marginBottom: 16 }}>
                              <div style={{ color: '#aaa', fontSize: '0.75rem', fontWeight: 600, marginBottom: 8 }}>{SECTION_ICONS[i]} {name}</div>
                              <FileGrid files={files} />
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                  {/* STATUS TAB */}
                  {activeTab === 'status' && (
                    <div>
                      <div style={{ marginBottom: 12 }}>
                        <label style={{ color: '#aaa', fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Current Status</label>
                        <select value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)}
                          style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#e8f5e8', padding: '10px 12px', borderRadius: 8, fontSize: '0.85rem' }}>
                          {ALL_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                        </select>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <label style={{ color: '#aaa', fontSize: '0.78rem', fontWeight: 600, display: 'block', marginBottom: 6 }}>Review Note</label>
                        <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)}
                          placeholder="Add review notes, feedback, or instructions…" rows={5}
                          style={{ width: '100%', background: '#1a1a1a', border: '1px solid #333', color: '#ccc', padding: '10px 12px', borderRadius: 8, fontSize: '0.82rem', resize: 'vertical', boxSizing: 'border-box' }} />
                      </div>
                      {selected.reviewNote && (
                        <div style={{ marginBottom: 12, padding: 12, background: '#1a2d1a', border: '1px solid #2a3a2a', borderRadius: 8 }}>
                          <div style={{ color: '#7CB87A', fontSize: '0.7rem', fontWeight: 600, marginBottom: 4 }}>EXISTING NOTE</div>
                          <p style={{ color: '#aaa', fontSize: '0.82rem', margin: 0 }}>{selected.reviewNote}</p>
                        </div>
                      )}
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button onClick={saveStatus} disabled={saving}
                          style={{ flex: 1, padding: '10px', background: '#1C2B1A', color: '#7CB87A', border: '1px solid #3a5a38', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                          {saving ? 'Saving…' : '✓ Save Status'}
                        </button>
                        <button onClick={() => handleDelete(selected.id)}
                          style={{ padding: '10px 16px', background: '#2d1a1a', color: '#f87171', border: '1px solid #4a2828', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ color: '#7CB87A', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid #1C2B1A' }}>{title}</div>
      {children}
    </div>
  );
}

const thStyle: React.CSSProperties = { padding: '12px 14px', color: '#555', fontSize: '0.72rem', fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: 0.5 };
const tdStyle: React.CSSProperties = { padding: '12px 14px' };
