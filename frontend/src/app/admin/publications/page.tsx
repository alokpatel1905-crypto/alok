'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function PublicationsPage() {
  const [activeTab, setActiveTab] = useState<'press' | 'research'>('press');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const endpoint = activeTab === 'press' ? 'publications/press-releases' : 'publications';
    
    try {
      const res = await apiFetch(`/${endpoint}`);
      setData(res);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    const endpoint = activeTab === 'press' ? `publications/press-releases/${id}` : `publications/${id}`;
    
    try {
      await apiFetch(`/${endpoint}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading media & publications...</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '1.8rem' }}>Media & Publications 📚</h1>
        <div style={{ display: 'flex', gap: 15 }}>
          <Link 
            href="/publications/create-press"
            style={{ background: '#333', color: 'white', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: '600' }}
          >
            + New Press Release
          </Link>
          <Link 
            href="/publications/create-research"
            style={{ background: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: '600' }}
          >
            + New Publication
          </Link>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'press'} onClick={() => setActiveTab('press')}>Press Releases</TabButton>
        <TabButton active={activeTab === 'research'} onClick={() => setActiveTab('research')}>Research Publications</TabButton>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#222' }}>
            <tr style={{ textAlign: 'left' }}>
              <Th>Title</Th>
              <Th>{activeTab === 'press' ? 'Date' : 'Author'}</Th>
              <Th>{activeTab === 'press' ? 'Status' : 'Type'}</Th>
              <Th style={{ textAlign: 'right' }}>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => (
              <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                <Td style={{ fontWeight: '600', maxWidth: 400 }}>{item.title}</Td>
                <Td>
                  {activeTab === 'press' 
                    ? new Date(item.date).toLocaleDateString() 
                    : item.author || 'Anonymous'}
                </Td>
                <Td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: 4, 
                    fontSize: '0.7rem', 
                    fontWeight: 'bold',
                    background: '#333',
                    color: '#aaa',
                    textTransform: 'uppercase'
                  }}>
                    {activeTab === 'press' ? item.status : item.type}
                  </span>
                </Td>
                <Td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <Link 
                      href={`/publications/edit/${item.id}?type=${activeTab}`} 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#333', color: '#fff', borderRadius: 4, textDecoration: 'none' }}
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#F44336' }}
                    >
                      Delete
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
            {(!data || data.data.length === 0) && (
              <tr><td colSpan={4} style={{ padding: 40, textAlign: 'center', color: '#666' }}>No records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '12px 20px',
        background: 'transparent',
        border: 'none',
        color: active ? '#0070f3' : '#666',
        borderBottom: active ? '2px solid #0070f3' : '2px solid transparent',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'all 0.2s'
      }}
    >
      {children}
    </button>
  );
}

function Th({ children, style }: any) {
  return <th style={{ padding: '16px 20px', color: '#888', fontSize: '0.8rem', fontWeight: '500', ...style }}>{children}</th>;
}

function Td({ children, style }: any) {
  return <td style={{ padding: '16px 20px', fontSize: '0.85rem', ...style }}>{children}</td>;
}