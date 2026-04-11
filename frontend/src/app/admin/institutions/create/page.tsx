'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

export default function CreateInstitutionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    type: 'SCHOOL',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    website: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiFetch('/institutions', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      router.push('/institutions');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Failed to create institution');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ marginBottom: 30 }}>
        <Link href="/institutions" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Institutions</Link>
        <h1 style={{ fontSize: '2rem', margin: '10px 0 0 0' }}>Register New Institution 🏛️</h1>
      </div>

      <div style={{ background: '#1a1a1a', padding: 30, borderRadius: 12, border: '1px solid #333' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <FormGroup label="Institution Name *" name="name" required onChange={handleChange} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: '0.85rem', color: '#888' }}>Institution Type *</label>
            <select 
              name="type" 
              required
              style={inputStyle}
              onChange={handleChange}
            >
              <option value="SCHOOL">School</option>
              <option value="COLLEGE">College</option>
              <option value="UNIVERSITY">University</option>
              <option value="ORGANIZATION">Organization</option>
            </select>
          </div>

          <FormGroup label="Email Address" name="email" type="email" onChange={handleChange} />
          <FormGroup label="Phone Number" name="phone" onChange={handleChange} />
          <FormGroup label="City" name="city" onChange={handleChange} />
          <FormGroup label="Country" name="country" onChange={handleChange} />
          <FormGroup label="Website URL" name="website" placeholder="https://..." onChange={handleChange} />
          <FormGroup label="State / Province" name="state" onChange={handleChange} />

          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label style={{ fontSize: '0.85rem', color: '#888' }}>Description / About</label>
            <textarea 
              name="description" 
              style={{ ...inputStyle, height: 120, resize: 'vertical' }} 
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <button 
              type="submit" 
              style={{ 
                padding: '12px 30px', 
                background: '#0070f3', 
                color: 'white', 
                border: 'none', 
                borderRadius: 8, 
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              Register Institution
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormGroup({ label, name, type = 'text', required = false, onChange, placeholder }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <label style={{ fontSize: '0.85rem', color: '#888' }}>{label}</label>
      <input 
        name={name} 
        type={type}
        required={required}
        placeholder={placeholder}
        style={inputStyle}
        onChange={onChange}
      />
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  background: '#222',
  border: '1px solid #333',
  color: '#fff',
  borderRadius: 8,
  fontSize: '0.95rem',
  outline: 'none',
};