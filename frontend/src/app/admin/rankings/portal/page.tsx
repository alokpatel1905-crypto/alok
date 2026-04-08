'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RankingPortalPage() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'submit'>('submissions');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSubmissions = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const res = await fetch('http://127.0.0.1:4000/rankings/submissions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401) { router.push('/login'); return; }
    const data = await res.json();
    setSubmissions(data);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'submissions') fetchSubmissions();
  }, [activeTab]);

  const handleEvaluate = async (id: string) => {
    const token = localStorage.getItem('token');
    const note = prompt('Enter evaluation notes:');
    if (!note) return;

    const res = await fetch(`http://127.0.0.1:4000/rankings/submissions/${id}/evaluate`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ note, reviewerId: 'current-user-id' }), // Simplified
    });
    if (res.ok) fetchSubmissions();
  };

  if (loading && activeTab === 'submissions') return <div style={{ padding: 40 }}>Opening the Global Ranking Vault...</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <h1 style={{ marginBottom: 30, fontSize: '1.8rem' }}>Global Ranking Portal 🌍</h1>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'submissions'} onClick={() => setActiveTab('submissions')}>Reviewer Evaluation Interface</TabButton>
        <TabButton active={activeTab === 'submit'} onClick={() => setActiveTab('submit')}>Institutional Submission Portal</TabButton>
      </div>

      {activeTab === 'submissions' ? (
        <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#222' }}>
              <tr style={{ textAlign: 'left' }}>
                <Th>Institution</Th>
                <Th>Category / Year</Th>
                <Th>Auto-Score</Th>
                <Th>Status</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub.id} style={{ borderTop: '1px solid #333' }}>
                  <Td style={{ fontWeight: '600' }}>{sub.institution.name}</Td>
                  <Td>{sub.category} ({sub.year})</Td>
                  <Td>
                    <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>{sub.score || 'PENDING'}</span>
                  </Td>
                  <Td><Badge status={sub.status}>{sub.status}</Badge></Td>
                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleEvaluate(sub.id)}
                      style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#0070f3', color: '#fff', borderRadius: 4, border: 'none', cursor: 'pointer' }}
                    >
                      Evaluate & Verify
                    </button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: '#666' }}>No active submissions for review</td></tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: '#1a1a1a', padding: 40, borderRadius: 12, border: '1px solid #333', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🏛️</div>
          <h2 style={{ marginBottom: 15 }}>Ready to join the Global Rankings?</h2>
          <p style={{ color: '#888', maxWidth: 600, margin: '0 auto 30px auto', lineHeight: '1.6' }}>
            This portal allows institutions to submit their sustainability data directly. 
            Our <strong>Automated Ranking Score Calculation</strong> engine will instantly analyze your data against global standards.
          </p>
          <button style={{ padding: '12px 30px', background: '#0070f3', color: 'white', borderRadius: 8, border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            Start New Data Submission
          </button>
        </div>
      )}
    </div>
  );
}

function TabButton({ children, active, onClick }: any) {
  return (
    <button onClick={onClick} style={{
      padding: '12px 20px',
      background: 'transparent',
      border: 'none',
      color: active ? '#0070f3' : '#666',
      borderBottom: active ? '2px solid #0070f3' : '2px solid transparent',
      cursor: 'pointer',
      fontWeight: '600'
    }}>{children}</button>
  );
}

function Th({ children }: any) {
  return <th style={{ padding: '16px 20px', color: '#888', fontSize: '0.8rem', fontWeight: '500' }}>{children}</th>;
}

function Td({ children, style }: any) {
  return <td style={{ padding: '16px 20px', fontSize: '0.9rem', ...style }}>{children}</td>;
}

function Badge({ children, status }: any) {
  const colors = status === 'SUBMITTED' ? { bg: '#2196F322', text: '#2196F3' } : { bg: '#FFC10722', text: '#FFC107' };
  return <span style={{ padding: '4px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 'bold', background: colors.bg, color: colors.text }}>{children}</span>;
}