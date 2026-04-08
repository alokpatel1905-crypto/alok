'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'newsletter'>('announcements');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const endpoint = activeTab === 'announcements' ? 'communications/announcements' : 'communications/newsletter/subscribers';

      const res = await fetch(`http://127.0.0.1:4000/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        router.push('/login');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to fetch communications data');
      }

      const result = await res.json();
      setData(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      if (!confirm('Delete this announcement?')) return;
      const token = localStorage.getItem('token');
      const res = await fetch(`http://127.0.0.1:4000/communications/announcements/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        router.push('/login');
        return;
      }
      if (res.ok) fetchData();
    } catch (err) {
      console.error('Failed to delete announcement:', err);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Connecting to communication nodes...</div>;

  if (error) {
    return (
      <div style={{ padding: 40, color: '#ff4444' }}>
        <h2>Error loading communications</h2>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Communications 📣</h1>
        <div style={{ display: 'flex', gap: 15 }}>
          <button style={{ background: '#333', color: 'white', padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: '600' }}>
            + New Announcement
          </button>
          <button style={{ background: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: '600' }}>
            🚀 Broadcast Newsletter
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')}>Announcements & Alerts</TabButton>
        <TabButton active={activeTab === 'newsletter'} onClick={() => setActiveTab('newsletter')}>Newsletter Subscribers</TabButton>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#222' }}>
            {activeTab === 'announcements' ? (
              <tr style={{ textAlign: 'left' }}>
                <Th>Title / Message</Th>
                <Th>Priority</Th>
                <Th>Date</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            ) : (
              <tr style={{ textAlign: 'left' }}>
                <Th>Subscriber</Th>
                <Th>Status</Th>
                <Th>Joined</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            )}
          </thead>
          <tbody>
            {activeTab === 'announcements' ? (
              data?.data?.map((item: any) => (
                <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                  <Td style={{ maxWidth: 500 }}>
                    <div style={{ fontWeight: '600', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: '1.4' }}>{item.message}</div>
                  </Td>
                  <Td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: 4, 
                      fontSize: '0.7rem', 
                      fontWeight: 'bold',
                      background: item.priority === 'URGENT' ? '#F4433622' : '#333',
                      color: item.priority === 'URGENT' ? '#F44336' : '#aaa'
                    }}>
                      {item.priority}
                    </span>
                  </Td>
                  <Td style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(item.createdAt).toLocaleDateString()}</Td>
                  <Td style={{ textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDeleteAnnouncement(item.id)}
                      style={{ background: 'transparent', color: '#F44336', border: '1px solid #F4433644', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Delete
                    </button>
                  </Td>
                </tr>
              ))
            ) : (
              data?.data?.map((sub: any) => (
                <tr key={sub.id} style={{ borderTop: '1px solid #333' }}>
                  <Td>
                    <div style={{ fontWeight: '600' }}>{sub.name || 'Anonymous'}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666' }}>{sub.email}</div>
                  </Td>
                  <Td>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: 4, 
                      fontSize: '0.7rem', 
                      fontWeight: 'bold',
                      background: sub.isActive ? '#4CAF5022' : '#333',
                      color: sub.isActive ? '#4CAF50' : '#666'
                    }}>
                      {sub.isActive ? 'ACTIVE' : 'UNSUBSCRIBED'}
                    </span>
                  </Td>
                  <Td style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(sub.createdAt).toLocaleDateString()}</Td>
                  <Td style={{ textAlign: 'right' }}>
                    <button style={{ background: 'transparent', color: '#aaa', border: '1px solid #333', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
                      Details
                    </button>
                  </Td>
                </tr>
              ))
            )}
            {(!data || !data.data || data.data.length === 0) && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#666' }}>No data found in this category</td></tr>
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

function Th({ children, style }: any) {
  return <th style={{ padding: '16px 20px', color: '#888', fontSize: '0.8rem', fontWeight: '500', ...style }}>{children}</th>;
}

function Td({ children, style }: any) {
  return <td style={{ padding: '16px 20px', fontSize: '0.85rem', ...style }}>{children}</td>;
}