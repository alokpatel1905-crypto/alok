'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

export default function CreateRankingPage() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: '',
    rank: '',
    year: new Date().getFullYear(),
    score: '',
    institutionId: '',
  });

  useEffect(() => {
    apiFetch('/institutions')
      .then((res) => {
        setInstitutions(res.data || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/rankings', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          rank: +form.rank,
          year: +form.year,
          score: form.score ? +form.score : undefined,
        }),
      });
      router.push('/rankings');
    } catch (err: any) {
      alert(err.message || 'Failed to create ranking');
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return <p>Loading institutions...</p>;

  return (
    <div>
      <h1>Add New Ranking 🏆</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20, maxWidth: 800 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Category *</label>
          <input 
            name="category" 
            required 
            placeholder="e.g. Greenest Campus"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Select Institution *</label>
          <select 
            name="institutionId" 
            required
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }}
            onChange={handleChange}
            value={form.institutionId}
          >
            <option value="">Select an institution</option>
            {institutions.map((inst: any) => (
              <option key={inst.id} value={inst.id}>{inst.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Rank *</label>
          <input 
            name="rank" 
            type="number"
            required 
            min="1"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Year *</label>
          <input 
            name="year" 
            type="number"
            required 
            min="2000"
            max="2100"
            value={form.year}
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 5 }}>Score (Optional)</label>
          <input 
            name="score" 
            type="number"
            step="0.01"
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }} 
            onChange={handleChange}
          />
        </div>

        <div style={{ gridColumn: 'span 2' }}>
          <button 
            type="submit" 
            style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer' }}
          >
            Create Ranking
          </button>
        </div>
      </form>
    </div>
  );
}
