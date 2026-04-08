'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadDocumentPage() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: 'OTHER',
    institutionId: '',
    fileUrl: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:4000/institutions', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        setInstitutions(res.data || []);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    const res = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setForm({ ...form, fileUrl: data.url });
      alert('File uploaded successfully!');
    } else {
      alert('Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fileUrl) return alert('Please upload a file first');

    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:4000/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/documents');
    } else {
      const err = await res.json();
      alert(err.message || 'Failed to save document');
    }
  };

  if (loading) return <p>Loading institutions...</p>;

  return (
    <div>
      <h1>Add New Document 📄</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, marginTop: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Title *</label>
          <input 
            required
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Category *</label>
          <select 
            style={{ width: '100%', padding: 10, background: '#111', border: '1px solid #333', color: 'white', borderRadius: 5 }}
            onChange={(e) => setForm({ ...form, category: e.target.value as any })}
          >
            <option value="OTHER">Other</option>
            <option value="LEGAL">Legal</option>
            <option value="FINANCIAL">Financial</option>
            <option value="ACADEMIC">Academic</option>
            <option value="ACCREDITATION">Accreditation</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>Institution *</label>
          <select 
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

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 5 }}>File Upload *</label>
          <input 
            type="file"
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ marginBottom: 10 }}
          />
          {uploading && <p>Uploading...</p>}
          {form.fileUrl && <p style={{ color: '#00ff00', fontSize: 12 }}>File ready: {form.fileUrl}</p>}
        </div>

        <button 
          type="submit" 
          disabled={uploading || !form.fileUrl}
          style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', opacity: (uploading || !form.fileUrl) ? 0.5 : 1 }}
        >
          Save Document
        </button>
      </form>
    </div>
  );
}
