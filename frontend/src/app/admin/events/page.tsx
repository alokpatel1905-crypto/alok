'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

type Event = {
  id: string;
  title: string;
  startDate: string;
  location?: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  institution?: { name: string };
  createdAt: string;
};

export default function EventsPage() {
  const [data, setData] = useState<{ data: Event[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFetch('/events');
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
    fetchEvents();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await apiFetch(`/events/${id}`, {
        method: 'DELETE',
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert('Error deleting event');
    }
  }

  async function toggleCancel(event: Event) {
    const newStatus = event.status === 'CANCELLED' ? 'UPCOMING' : 'CANCELLED';
    try {
      await apiFetch(`/events/${event.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return { bg: '#2196F322', text: '#2196F3' };
      case 'ONGOING': return { bg: '#4CAF5022', text: '#4CAF50' };
      case 'COMPLETED': return { bg: '#8882', text: '#888' };
      case 'CANCELLED': return { bg: '#F4433622', text: '#F44336' };
      default: return { bg: '#333', text: '#888' };
    }
  };

  if (loading) return <div style={{ padding: 40 }}>Loading events...</div>;
  if (error) return <div style={{ padding: 40, color: '#ff4444' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Events 📅</h1>
        <Link 
          href="/events/create"
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
          + Add Event
        </Link>
      </div>

      <div style={{
        background: '#1a1a1a',
        borderRadius: 12,
        border: '1px solid #333',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #333', background: '#222' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>All Events</h2>
        </div>
        
        <div style={{ padding: 20, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Institution</th>
                <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data && Array.isArray(data.data) && data.data.map((item) => {
                const colors = getStatusColor(item.status);
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: '600' }}>{item.title}</div>
                    </td>
                    <td style={tdStyle}>{new Date(item.startDate).toLocaleDateString()}</td>
                    <td style={tdStyle}>{item.location || 'N/A'}</td>
                    <td style={tdStyle}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        background: colors.bg,
                        color: colors.text,
                        textTransform: 'uppercase'
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={tdStyle}>{item.institution?.name || 'Global'}</td>
                    <td style={{ ...tdStyle, textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => toggleCancel(item)}
                          style={{ 
                            background: 'transparent', 
                            border: '1px solid #444', 
                            color: '#aaa',
                            padding: '4px 8px',
                            borderRadius: 4,
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          {item.status === 'CANCELLED' ? 'Restore' : 'Cancel'}
                        </button>
                        <Link 
                          href={`/events/${item.id}`} 
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
                );
              })}
              {(!data || !data.data || data.data.length === 0) && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#666' }}>
                    No events found
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