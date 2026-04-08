'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'UPCOMING',
    institutionId: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/institutions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setInstitutions(res.data || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const res = await fetch('http://localhost:4000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        institutionId: form.institutionId || undefined,
        endDate: form.endDate || undefined,
      }),
    });

    if (res.ok) {
      router.push('/events');
    } else {
      const err = await res.json();
      alert(err.message || 'Failed to create event');
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Add New Event 📅</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20, maxWidth: 800 }}>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Title *</label>
          <input 
            name="title" 
            required 
            placeholder="Event Name"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>
        
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Description</label>
          <textarea 
            name="description" 
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5, height: 100 }} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Start Date *</label>
          <input 
            name="startDate" 
            type="datetime-local"
            required 
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>End Date</label>
          <input 
            name="endDate" 
            type="datetime-local"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Location</label>
          <input 
            name="location" 
            placeholder="Physical address or Online link"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Status</label>
          <select 
            name="status" 
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }}
            onChange={handleChange}
            value={form.status}
          >
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Institution (Optional)</label>
          <select 
            name="institutionId" 
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }}
            onChange={handleChange}
            value={form.institutionId}
          >
            <option value="">Global / No Institution</option>
            {institutions.map((inst: any) => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <button 
            type="submit" 
            style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
