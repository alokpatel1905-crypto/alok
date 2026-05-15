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
    setDetailLoading(true);
    setSelected(null);
    try {
      const res = await apiFetch(`/admin/audit-submissions/${id}`);
      setSelected(res);
      setStatusUpdate(res.status);
      setReviewNote(res.reviewNote || '');
    } catch (e) { console.error(e); }
    finally { setDetailLoading(false); }
  };

  const saveStatus = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await apiFetch(`/admin/audit-submissions/${selected.id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: statusUpdate, reviewNote }),
      });
      setSelected((prev: any) => ({ ...prev, status: statusUpdate, reviewNote }));
      fetchList();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this audit submission? This cannot be undone.')) return;
    try {
      await apiFetch(`/admin/audit-submissions/${id}`, { method: 'DELETE' });
      setSelected(null);
      fetchList();
    } catch (e) { console.error(e); }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>🌿 Audit Submissions</h1>
          <p style={{ color: '#6b8a69', marginTop: 4, fontSize: '0.9rem' }}>
            Green School Audit Framework — submitted forms
          </p>
        </div>
        <div style={{ background: '#1C2B1A', color: '#7CB87A', padding: '8px 16px', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600 }}>
          {data?.total ?? 0} Total Submissions
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button onClick={() => { setFilterStatus(''); setPage(1); }}
          style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #333', background: !filterStatus ? '#1C2B1A' : '#111', color: !filterStatus ? '#7CB87A' : '#666', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
          All
        </button>
        {ALL_STATUSES.map(s => {
          const sc = STATUS_COLORS[s];
          return (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              style={{ padding: '8px 14px', borderRadius: 8, border: `1px solid ${s === filterStatus ? sc.color : '#333'}`, background: s === filterStatus ? sc.bg : '#111', color: s === filterStatus ? sc.color : '#666', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
              {s.replace(/_/g, ' ')}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Table */}
        <div style={{ flex: selected ? '0 0 55%' : '1', minWidth: 0 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #2a2a2a', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>Loading…</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#111' }}>
                  <tr>
                    <Th>School</Th>
                    <Th>District</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                    <Th></Th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item: any) => {
                    const sc = STATUS_COLORS[item.status] || STATUS_COLORS.PENDING;
                    return (
                      <tr key={item.id}
                        style={{ borderTop: '1px solid #222', cursor: 'pointer', background: selected?.id === item.id ? '#1C2B1A22' : 'transparent' }}
                        onClick={() => openDetail(item.id)}>
                        <Td>
                          <div style={{ fontWeight: 600, color: '#e8f5e8', fontSize: '0.88rem' }}>{item.schoolName}</div>
                          {item.udise && <div style={{ color: '#555', fontSize: '0.75rem' }}>{item.udise}</div>}
                        </Td>
                        <Td style={{ color: '#888', fontSize: '0.82rem' }}>{item.district || '—'}</Td>
                        <Td style={{ color: '#666', fontSize: '0.78rem' }}>
                          {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString('en-IN') : '—'}
                        </Td>
                        <Td>
                          <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, background: sc.bg, color: sc.color }}>
                            {item.status.replace(/_/g, ' ')}
                          </span>
                        </Td>
                        <Td>
                          <span style={{ color: '#7CB87A', fontSize: '0.8rem' }}>View →</span>
                        </Td>
                      </tr>
                    );
                  })}
                  {(!data?.data || data.data.length === 0) && (
                    <tr><td colSpan={5} style={{ padding: 60, textAlign: 'center', color: '#444' }}>No audit submissions found</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'center' }}>
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                style={{ padding: '8px 16px', background: '#222', border: '1px solid #333', color: page === 1 ? '#444' : '#aaa', borderRadius: 6, cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
                ← Prev
              </button>
              <span style={{ padding: '8px 12px', color: '#666', fontSize: '0.85rem' }}>Page {page} of {data.totalPages}</span>
              <button disabled={page >= data.totalPages} onClick={() => setPage(p => p + 1)}
                style={{ padding: '8px 16px', background: '#222', border: '1px solid #333', color: page >= data.totalPages ? '#444' : '#aaa', borderRadius: 6, cursor: page >= data.totalPages ? 'not-allowed' : 'pointer' }}>
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {(selected || detailLoading) && (
          <div style={{ flex: '0 0 43%', background: '#111', border: '1px solid #2a2a2a', borderRadius: 12, overflow: 'hidden', maxHeight: '80vh', overflowY: 'auto' }}>
            {detailLoading ? (
              <div style={{ padding: 60, textAlign: 'center', color: '#555' }}>Loading details…</div>
            ) : selected && (
              <>
                {/* Panel header */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'sticky', top: 0, background: '#111', zIndex: 2 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#e8f5e8', fontSize: '1rem' }}>{selected.schoolName}</div>
                    <div style={{ color: '#6b8a69', fontSize: '0.78rem', marginTop: 3 }}>
                      {selected.udise && `UDISE: ${selected.udise} • `}{selected.schoolCategory}
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
                </div>

                <div style={{ padding: '20px 24px' }}>
                  {/* School info */}
                  <InfoGrid items={[
                    ['Principal', selected.principalName],
                    ['Mobile', selected.mobile],
                    ['Email', selected.email],
                    ['District', selected.district],
                    ['Taluka', selected.taluka],
                    ['Village', selected.village],
                    ['PIN', selected.pinCode],
                    ['Board', selected.board],
                    ['Medium', selected.medium],
                    ['Grade Levels', selected.gradeLevels?.join(', ')],
                    ['Students', selected.totalStudents],
                    ['Teaching Staff', selected.totalTeachingStaff],
                    ['Non-Teaching', selected.nonTeachingStaff],
                    ['Year Est.', selected.yearEstablished],
                  ]} />

                  {/* Consent info */}
                  <div style={{ margin: '20px 0 12px', color: '#7CB87A', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>Submitted by</div>
                  <InfoGrid items={[
                    ['Name', selected.submitterName],
                    ['Designation', selected.designation],
                    ['Submission Date', selected.submissionDate],
                  ]} />

                  {/* Sections summary */}
                  {selected.sections && (
                    <>
                      <div style={{ margin: '20px 0 12px', color: '#7CB87A', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>Audit Sections Filled</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {Object.entries(selected.sections).map(([sid]: any) => (
                          <span key={sid} style={{ background: '#1C2B1A', color: '#7CB87A', padding: '4px 10px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 600 }}>
                            {sid}
                          </span>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Status update */}
                  <div style={{ marginTop: 24, padding: 16, background: '#1a1a1a', borderRadius: 10, border: '1px solid #2a2a2a' }}>
                    <div style={{ color: '#aaa', fontSize: '0.8rem', fontWeight: 600, marginBottom: 10 }}>Update Status</div>
                    <select value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)}
                      style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#e8f5e8', padding: '8px 12px', borderRadius: 6, fontSize: '0.85rem', marginBottom: 10 }}>
                      {ALL_STATUSES.map(s => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
                    </select>
                    <textarea value={reviewNote} onChange={e => setReviewNote(e.target.value)}
                      placeholder="Review note (optional)…"
                      rows={3}
                      style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#ccc', padding: '8px 12px', borderRadius: 6, fontSize: '0.82rem', resize: 'vertical', boxSizing: 'border-box' }} />
                    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                      <button onClick={saveStatus} disabled={saving}
                        style={{ flex: 1, padding: '9px 0', background: '#1C2B1A', color: '#7CB87A', border: '1px solid #3a5a38', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                        {saving ? 'Saving…' : '✓ Save Status'}
                      </button>
                      <button onClick={() => handleDelete(selected.id)}
                        style={{ padding: '9px 16px', background: '#2d1a1a', color: '#f87171', border: '1px solid #4a2828', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Th({ children }: any) {
  return <th style={{ padding: '14px 16px', color: '#555', fontSize: '0.75rem', fontWeight: 600, textAlign: 'left', textTransform: 'uppercase', letterSpacing: 0.5 }}>{children}</th>;
}

function Td({ children, style }: any) {
  return <td style={{ padding: '13px 16px', ...style }}>{children}</td>;
}

function InfoGrid({ items }: { items: [string, string | undefined][] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', marginBottom: 8 }}>
      {items.filter(([, v]) => v).map(([label, value]) => (
        <div key={label} style={{ background: '#1a1a1a', borderRadius: 6, padding: '8px 10px' }}>
          <div style={{ color: '#555', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>{label}</div>
          <div style={{ color: '#ccc', fontSize: '0.82rem', wordBreak: 'break-word' }}>{value}</div>
        </div>
      ))}
    </div>
  );
}
