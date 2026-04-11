'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

type Ranking = {
  id: string;
  category: string;
  rank: number;
  year: number;
  score?: number;
  institution: { name: string };
  createdAt: string;
};

export default function RankingsPage() {
  const [data, setData] = useState<{ data: Ranking[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = async () => {
    try {
      const res = await apiFetch('/rankings');
      setData(res);
      setLoading(false);
    } catch (err: any) {
      console.error('Fetch error:', err);
      if (err.message === 'Unauthorized') {
        window.location.href = '/login';
        return;
      }
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this ranking?')) return;
    try {
      await apiFetch(`/rankings/${id}`, {
        method: 'DELETE',
      });
      fetchRankings();
    } catch (err) {
      console.error(err);
      alert('Error deleting ranking');
    }
  }

  if (loading) return <div style={{ padding: 40 }}>Loading rankings...</div>;
  if (error) return <div style={{ padding: 40, color: '#ff4444' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Rankings 🏆</h1>
        <Link 
          href="/rankings/create"
          style={{ 
            background: '#0070f3', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: 8, 
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#0060df')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#0070f3')}
        >
          + Add Ranking
        </Link>
      </div>

      <div style={{
        background: '#1a1a1a',
        borderRadius: 12,
        border: '1px solid #333',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #333', background: '#222' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Global Rankings</h2>
        </div>
        
        <div style={{ padding: 20, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={thStyle}>Rank</th>
                <th style={thStyle}>Institution</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Year</th>
                <th style={thStyle}>Score</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={tdStyle}>
                    <div style={{ 
                      fontWeight: '700', 
                      color: item.rank <= 3 ? '#FFC107' : '#fff',
                      fontSize: '1.1rem'
                    }}>
                      #{item.rank}
                    </div>
                  </td>
                  <td style={tdStyle}>{item.institution?.name}</td>
                  <td style={tdStyle}>{item.category}</td>
                  <td style={tdStyle}>{item.year}</td>
                  <td style={tdStyle}>
                    <span style={{ color: '#4CAF50', fontWeight: '600' }}>
                      {item.score || 'N/A'}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                      <Link 
                        href={`/rankings/${item.id}`} 
                        style={{ 
                          color: '#2196F3', 
                          textDecoration: 'none', 
                          fontSize: '0.8rem',
                          border: '1px solid #2196F344',
                          padding: '4px 8px',
                          borderRadius: 4
                        }}
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        style={{ 
                          background: 'transparent', 
                          border: '1px solid #F4433644', 
                          color: '#F44336',
                          padding: '4px 8px',
                          borderRadius: 4,
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!data || data.data.length === 0) && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                    No rankings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '12px 8px',
  borderBottom: '1px solid #333',
  color: '#888',
  fontSize: '0.85rem',
  fontWeight: '500',
};

const tdStyle: React.CSSProperties = {
  padding: '16px 8px',
  fontSize: '0.9rem',
};