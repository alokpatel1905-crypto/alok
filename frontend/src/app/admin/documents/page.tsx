'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function DocumentsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFetch('/documents');
      setData(result);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm('Are you sure you want to delete this document?')) return;
      await apiFetch(`/documents/${id}`, {
        method: 'DELETE',
      });
      fetchDocuments();
    } catch (err: any) {
      console.error('Failed to delete document:', err);
      if (err.message === 'Unauthorized') {
        router.push('/login');
      }
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Accessing secure vaults...</div>;

  if (error) {
    return (
      <div style={{ padding: 40, color: '#ff4444' }}>
        <h2>Error loading documents</h2>
        <p>{error}</p>
        <button 
          onClick={() => fetchDocuments()}
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
        <h1 style={{ fontSize: '1.8rem' }}>Document Management 📄</h1>
        <Link 
          href="/documents/upload"
          style={{ background: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: '600' }}
        >
          + Upload Document
        </Link>
      </div>

      <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#222' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={thStyle}>Title / Type</th>
              <th style={thStyle}>Linked Entity</th>
              <th style={thStyle}>Institution</th>
              <th style={thStyle}>Created At</th>
              <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => (
              <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                <td style={tdStyle}>
                  <div style={{ fontWeight: '600' }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#FFC107' }}>{item.category}</div>
                </td>
                <td style={tdStyle}>
                  {item.accreditation ? (
                    <span style={linkBadgeStyle}>🏆 {item.accreditation.title}</span>
                  ) : item.ranking ? (
                    <span style={linkBadgeStyle}>📊 {item.ranking.category} ({item.ranking.year})</span>
                  ) : (
                    <span style={{ color: '#555' }}>General</span>
                  )}
                </td>
                <td style={tdStyle}><span style={{ color: '#aaa' }}>{item.institution?.name}</span></td>
                <td style={tdStyle}>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td style={{ ...tdStyle, textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                    <a 
                      href={item.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.8rem', 
                        background: '#333', 
                        color: '#fff', 
                        borderRadius: 4, 
                        textDecoration: 'none' 
                      }}
                    >
                      Download
                    </a>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#F44336', border: 'none', color: 'white', borderRadius: 4, cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!data || !data.data || data.data.length === 0) && (
              <tr><td colSpan={5} style={{ padding: 40, textAlign: 'center', color: '#666' }}>No documents found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: '16px 20px',
  color: '#888',
  fontWeight: '500',
  fontSize: '0.85rem',
};

const tdStyle: React.CSSProperties = {
  padding: '16px 20px',
  fontSize: '0.9rem',
};

const linkBadgeStyle = {
  fontSize: '0.75rem',
  background: '#222',
  padding: '4px 8px',
  borderRadius: 4,
  border: '1px solid #333',
  color: '#2196F3'
};