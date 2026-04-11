'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { apiFetch } from '@/lib/api';

export default function RequestAccreditationPage() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: '',
    institutionId: '',
  });

  useEffect(() => {
    apiFetch('/institutions')
      .then((res) => {
        setInstitutions(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/accreditations', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      router.push('/admin/accreditations');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to request accreditation');
    }
  };

  if (loading) return <p>Loading institutions...</p>;

  return (
    <div>
      <h1>Request Accreditation 📜</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 500, marginTop: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Accreditation Title *</label>
          <input 
            name="title" 
            required 
            placeholder="e.g. Green Campus Platinum"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Select Institution *</label>
          <select 
            name="institutionId" 
            required
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }}
            onChange={(e) => setForm({ ...form, institutionId: e.target.value })}
            value={form.institutionId}
          >
            <option value="">Select an institution</option>
            {institutions.map((inst: any) => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>

        <div>
          <button 
            type="submit" 
            style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}
