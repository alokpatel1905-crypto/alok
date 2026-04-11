'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { apiFetch } from '@/lib/api';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'website' | 'rankings' | 'participation'>('website');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const endpoint = `/analytics/${activeTab}`;

    try {
      const result = await apiFetch(endpoint);
      setData(result);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'API Error' || err.message === 'Unauthorized') {
        router.push('/login');
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  if (loading) return <div style={{ padding: 40 }}>Gathering intelligence...</div>;

  if (error) {
    return (
      <div style={{ padding: 40, color: '#ff4444' }}>
        <h2>Error loading analytics</h2>
        <p>{error}</p>
        <button 
          onClick={() => fetchData()}
          style={{ background: '#333', color: '#fff', border: '1px solid #444', padding: '8px 16px', borderRadius: 4, cursor: 'pointer' }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 0' }}>
      <h1 style={{ marginBottom: 30, fontSize: '1.8rem' }}>Analytics & Reporting 📊</h1>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'website'} onClick={() => setActiveTab('website')}>Website Traffic</TabButton>
        <TabButton active={activeTab === 'rankings'} onClick={() => setActiveTab('rankings')}>Ranking Stats</TabButton>
        <TabButton active={activeTab === 'participation'} onClick={() => setActiveTab('participation')}>Program Participation</TabButton>
      </div>

      {activeTab === 'website' && data && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            <StatCard title="Total Views" value={data.totalViews || 0} color="#2196F3" />
            <StatCard title="Page Views" value={data.breakdown?.pages || 0} color="#4CAF50" />
            <StatCard title="Program Views" value={data.breakdown?.programs || 0} color="#FFC107" />
            <StatCard title="Event Views" value={data.breakdown?.events || 0} color="#E91E63" />
          </div>

          <Section title="Top Viewed Content">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', background: '#222' }}>
                  <Th>Title</Th>
                  <Th>Slug</Th>
                  <Th style={{ textAlign: 'right' }}>Total Views</Th>
                </tr>
              </thead>
              <tbody>
                {data.topPages?.map((p: any) => (
                  <tr key={p.slug} style={{ borderTop: '1px solid #333' }}>
                    <Td>{p.title}</Td>
                    <Td><code style={{ color: '#aaa' }}>/{p.slug}</code></Td>
                    <Td style={{ textAlign: 'right', fontWeight: 'bold' }}>{(p.views || 0).toLocaleString()}</Td>
                  </tr>
                ))}
                {(!data.topPages || data.topPages.length === 0) && (
                  <tr><Td colSpan={3} style={{ textAlign: 'center', color: '#666', padding: 20 }}>No content data available</Td></tr>
                )}
              </tbody>
            </table>
          </Section>
        </div>
      )}

      {/* ... rankings section (already updated) ... */}

      {activeTab === 'participation' && data && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginBottom: 40 }}>
            <StatCard title="Total Registrations" value={data.totalRegistrations || 0} color="#2196F3" />
            <StatCard 
              title="Confirmed" 
              value={data.statusStats?.find((s: any) => s.status === 'CONFIRMED')?._count?._all || 0} 
              color="#4CAF50" 
            />
          </div>

          <Section title="Popular Events">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', background: '#222' }}>
                  <Th>Event Title</Th>
                  <Th style={{ textAlign: 'right' }}>Registrations</Th>
                </tr>
              </thead>
              <tbody>
                {data.popularEvents?.map((e: any) => (
                  <tr key={e.id} style={{ borderTop: '1px solid #333' }}>
                    <Td>{e.title}</Td>
                    <Td style={{ textAlign: 'right', fontWeight: 'bold' }}>{e._count?.registrations || 0}</Td>
                  </tr>
                ))}
                {(!data.popularEvents || data.popularEvents.length === 0) && (
                  <tr><Td colSpan={2} style={{ textAlign: 'center', color: '#666', padding: 20 }}>No event participation data</Td></tr>
                )}
              </tbody>
            </table>
          </Section>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div style={{ background: '#1a1a1a', padding: 24, borderRadius: 12, border: '1px solid #333', borderLeft: `4px solid ${color}` }}>
      <h3 style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', margin: '0 0 10px 0' }}>{title}</h3>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>{value}</p>
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', background: '#222', borderBottom: '1px solid #333' }}>
        <h2 style={{ fontSize: '1rem', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
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

function Th({ children, style }: any) {
  return <th style={{ padding: '12px 20px', color: '#888', fontSize: '0.8rem', fontWeight: '500', ...style }}>{children}</th>;
}

function Td({ children, style }: any) {
  return <td style={{ padding: '16px 20px', fontSize: '0.9rem', ...style }}>{children}</td>;
}