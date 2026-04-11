'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function InstitutionsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFetch('/institutions');
      setData(result);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm('Are you sure you want to delete this institution?')) return;
      await apiFetch(`/institutions/${id}`, {
        method: 'DELETE',
      });
      fetchInstitutions();
    } catch (err: any) {
      console.error('Failed to delete institution:', err);
      if (err.message === 'Unauthorized') {
        window.location.href = '/login';
      }
    }
  };

  const toggleActive = async (inst: any) => {
    try {
      await apiFetch(`/institutions/${inst.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !inst.isActive }),
      });
      fetchInstitutions();
    } catch (err: any) {
      console.error('Failed to toggle institution status:', err);
      if (err.message === 'Unauthorized') {
        window.location.href = '/login';
      }
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading institutions...</div>;

  if (error) {
    return (
      <div style={{ padding: 40, color: '#ff4444' }}>
        <h2>Error loading institutions</h2>
        <p>{error}</p>
        <button 
          onClick={() => fetchInstitutions()}
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
        <h1 style={{ fontSize: '1.8rem' }}>Institutions 🏛️</h1>
        <Link 
          href="/institutions/create"
          style={{ background: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: '600' }}
        >
          + Add Institution
        </Link>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#222' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: '16px 20px', color: '#888', fontWeight: '500' }}>Name</th>
              <th style={{ padding: '16px 20px', color: '#888', fontWeight: '500' }}>Type</th>
              <th style={{ padding: '16px 20px', color: '#888', fontWeight: '500' }}>Location</th>
              <th style={{ padding: '16px 20px', color: '#888', fontWeight: '500' }}>Status</th>
              <th style={{ padding: '16px 20px', color: '#888', fontWeight: '500', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((inst: any) => (
              <tr key={inst.id} style={{ borderTop: '1px solid #333' }}>
                <td style={{ padding: '16px 20px', fontWeight: '500' }}>
                  <Link href={`/institutions/${inst.id}`} style={{ color: '#fff', textDecoration: 'none' }}>
                    {inst.name}
                  </Link>
                </td>
                <td style={{ padding: '16px 20px' }}><span style={{ color: '#aaa', fontSize: '0.9rem' }}>{inst.type}</span></td>
                <td style={{ padding: '16px 20px' }}><span style={{ color: '#aaa', fontSize: '0.9rem' }}>{inst.city}, {inst.country}</span></td>
                <td style={{ padding: '16px 20px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: 4, 
                    fontSize: '0.75rem', 
                    fontWeight: 'bold',
                    background: inst.isActive ? '#4CAF5022' : '#F4433622',
                    color: inst.isActive ? '#4CAF50' : '#F44336'
                  }}>
                    {inst.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <button onClick={() => toggleActive(inst)} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                      {inst.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <Link href={`/institutions/${inst.id}`} style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#333', color: '#fff', borderRadius: 4, textDecoration: 'none' }}>Edit</Link>
                    <button onClick={() => handleDelete(inst.id)} style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#F44336' }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {(!data || data.data.length === 0) && (
              <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: '#666' }}>No institutions found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}