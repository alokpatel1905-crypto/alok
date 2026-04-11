'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'audit' | 'login'>('audit');
  const [data, setData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const endpoint = activeTab === 'audit' ? 'security/audit-logs' : 'security/login-history';

    try {
      const [logs, alertsData] = await Promise.all([
        apiFetch(`/${endpoint}`),
        apiFetch(`/security/alerts`)
      ]);

      setData(logs);
      setAlerts(alertsData);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  if (loading && !data) return <div style={{ padding: 40 }}>Securing environment...</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Security & Audit Logs 🛡️</h1>
        {alerts?.isHighRisk && (
          <div style={{ background: '#f44336', color: 'white', padding: '10px 20px', borderRadius: 8, fontWeight: 'bold', animation: 'pulse 2s infinite' }}>
            ⚠️ HIGH RISK DETECTED: {alerts.recentFailedLogins} Failed Logins
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'audit'} onClick={() => setActiveTab('audit')}>Admin Activity</TabButton>
        <TabButton active={activeTab === 'login'} onClick={() => setActiveTab('login')}>Login History</TabButton>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#222' }}>
            {activeTab === 'audit' ? (
              <tr style={{ textAlign: 'left' }}>
                <Th>Admin User</Th>
                <Th>Action / Module</Th>
                <Th>Details</Th>
                <Th>Timestamp</Th>
              </tr>
            ) : (
              <tr style={{ textAlign: 'left' }}>
                <Th>Email / User</Th>
                <Th>Status</Th>
                <Th>IP Address</Th>
                <Th>Timestamp</Th>
              </tr>
            )}
          </thead>
          <tbody>
            {data?.data?.map((item: any) => (
              <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                {activeTab === 'audit' ? (
                  <>
                    <Td>
                      <div style={{ fontWeight: '600' }}>{item.user?.name || 'System'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>{item.user?.email}</div>
                    </Td>
                    <Td>
                      <span style={{ color: '#2196F3', fontWeight: 'bold', fontSize: '0.8rem' }}>{item.action}</span>
                      <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{item.module}</div>
                    </Td>
                    <Td style={{ maxWidth: 300, fontSize: '0.8rem', color: '#888' }}>{item.details || '—'}</Td>
                    <Td style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(item.createdAt).toLocaleString()}</Td>
                  </>
                ) : (
                  <>
                    <Td>
                      <div style={{ fontWeight: '600' }}>{item.email}</div>
                      {item.user && <div style={{ fontSize: '0.75rem', color: '#666' }}>ID: {item.user.name}</div>}
                    </Td>
                    <Td>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: 4, 
                        fontSize: '0.7rem', 
                        fontWeight: 'bold',
                        background: item.status === 'SUCCESS' ? '#4CAF5022' : '#f4433622',
                        color: item.status === 'SUCCESS' ? '#4CAF50' : '#f44336'
                      }}>
                        {item.status}
                      </span>
                    </Td>
                    <Td style={{ fontSize: '0.85rem', color: '#aaa' }}>{item.ipAddress || 'Unknown'}</Td>
                    <Td style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(item.createdAt).toLocaleString()}</Td>
                  </>
                )}
              </tr>
            ))}
            {(!data || !data.data || data.data.length === 0) && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#666' }}>No security logs found</td></tr>
            )}
          </tbody>
        </table>
      </div>
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