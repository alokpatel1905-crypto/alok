'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'speakers' | 'registrations'>('details');

  const fetchEvent = () => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:4000/events/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          router.push('/login');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch event');
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const updateRegStatus = async (regId: string, status: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:4000/events/registrations/${regId}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchEvent();
  };

  const removeSpeaker = async (speakerId: string) => {
    if (!confirm('Remove this speaker?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:4000/events/speakers/${speakerId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) fetchEvent();
  };

  if (loading) return <div style={{ padding: 40 }}>Loading event...</div>;
  if (error) return <div style={{ padding: 40, color: '#f44336' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <div>
          <Link href="/events" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Events</Link>
          <h1 style={{ fontSize: '2.2rem', margin: '10px 0 0 0' }}>{data.title}</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
           <button style={{ background: '#333', color: 'white', padding: '10px 20px', borderRadius: 8 }}>Edit Event</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'details'} onClick={() => setActiveTab('details')}>Overview</TabButton>
        <TabButton active={activeTab === 'speakers'} onClick={() => setActiveTab('speakers')}>Speakers ({data.speakers?.length || 0})</TabButton>
        <TabButton active={activeTab === 'registrations'} onClick={() => setActiveTab('registrations')}>Registrations ({data.registrations?.length || 0})</TabButton>
      </div>

      {activeTab === 'details' && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <Section title="Event Description">
              <p style={{ color: '#aaa', lineHeight: '1.6' }}>{data.description || 'No description provided.'}</p>
            </Section>
            <Section title="Event Agenda">
              <pre style={{ color: '#aaa', background: '#000', padding: 20, borderRadius: 8, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                {data.agenda || 'Agenda not yet uploaded.'}
              </pre>
            </Section>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Section title="Logistics">
              <InfoItem label="Start Date" value={new Date(data.startDate).toLocaleString()} />
              <InfoItem label="End Date" value={data.endDate ? new Date(data.endDate).toLocaleString() : 'N/A'} />
              <InfoItem label="Location" value={data.location || 'Online'} />
              <InfoItem label="Institution" value={data.institution?.name || 'Global Event'} />
              <InfoItem label="Status" value={data.status} isStatus status={data.status} />
            </Section>
          </div>
        </div>
      )}

      {activeTab === 'speakers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
          {data.speakers?.map((s: any) => (
            <div key={s.id} style={{ background: '#1a1a1a', padding: 20, borderRadius: 12, border: '1px solid #333', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, background: '#333', borderRadius: '50%', margin: '0 auto 15px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👤</div>
              <h3 style={{ margin: '0 0 5px 0' }}>{s.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#888', margin: '0 0 15px 0' }}>{s.role || 'Guest Speaker'}</p>
              <button 
                onClick={() => removeSpeaker(s.id)}
                style={{ background: 'transparent', color: '#f44336', border: '1px solid #f4433644', padding: '5px 15px', borderRadius: 6, fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
          ))}
          <div style={{ background: '#1a1a1a', padding: 20, borderRadius: 12, border: '1px dashed #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ color: '#666' }}>+ Add New Speaker</span>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#222' }}>
              <tr>
                <Th>Attendee</Th>
                <Th>Contact</Th>
                <Th>Status</Th>
                <Th>Registered On</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {data.registrations?.map((r: any) => (
                <tr key={r.id} style={{ borderTop: '1px solid #333' }}>
                  <Td style={{ fontWeight: '600' }}>{r.name}</Td>
                  <Td>
                    <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{r.email}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>{r.phone || 'No phone'}</div>
                  </Td>
                  <Td><StatusBadge status={r.status}>{r.status}</StatusBadge></Td>
                  <Td style={{ color: '#666', fontSize: '0.85rem' }}>{new Date(r.createdAt).toLocaleDateString()}</Td>
                  <Td style={{ textAlign: 'right' }}>
                    <select 
                      value={r.status} 
                      onChange={(e) => updateRegStatus(r.id, e.target.value)}
                      style={{ background: '#333', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: 4, fontSize: '0.8rem' }}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirm</option>
                      <option value="ATTENDED">Attended</option>
                      <option value="CANCELLED">Cancel</option>
                    </select>
                  </Td>
                </tr>
              ))}
              {data.registrations?.length === 0 && (
                <tr><Td colSpan={5} style={{ textAlign: 'center', padding: 40, color: '#666' }}>No registrations yet</Td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: any) {
  return (
    <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
      <div style={{ padding: '16px 20px', background: '#222', borderBottom: '1px solid #333' }}>
        <h2 style={{ fontSize: '1.05rem', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function InfoItem({ label, value, isStatus, status }: any) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</label>
      {isStatus ? (
        <StatusBadge status={status}>{value}</StatusBadge>
      ) : (
        <div style={{ color: '#eee', fontWeight: '500' }}>{value || 'N/A'}</div>
      )}
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

function StatusBadge({ children, status }: any) {
  const getColors = () => {
    switch(status) {
      case 'UPCOMING':
      case 'CONFIRMED': return { bg: '#2196F322', text: '#2196F3' };
      case 'ONGOING':
      case 'ATTENDED': return { bg: '#4CAF5022', text: '#4CAF50' };
      case 'CANCELLED': return { bg: '#f4433622', text: '#f44336' };
      default: return { bg: '#333', text: '#888' };
    }
  };
  const colors = getColors();
  return <span style={{ padding: '4px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 'bold', background: colors.bg, color: colors.text, textTransform: 'uppercase' }}>{children}</span>;
}