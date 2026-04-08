'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AccreditationDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:4000/accreditations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const updateStatus = async (status: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:4000/accreditations/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const updated = await res.json();
      setData(updated);
    } else {
      alert('Failed to update status');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Accreditation not found</p>;

  return (
    <div>
      <h1>Accreditation Details 📜</h1>
      <div style={{ background: '#111', padding: 20, borderRadius: 10, border: '1px solid #333', marginTop: 20, maxWidth: 600 }}>
        <h2 style={{ marginBottom: 10 }}>{data.title}</h2>
        <p><strong>Institution:</strong> {data.institution?.name}</p>
        <p><strong>Status:</strong> <span style={{ color: data.status === 'APPROVED' ? '#00ff00' : '#ffa500' }}>{data.status}</span></p>
        <p><strong>Requested On:</strong> {new Date(data.createdAt).toLocaleString()}</p>
        
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          {data.status !== 'APPROVED' && (
            <button 
              onClick={() => updateStatus('APPROVED')}
              style={{ padding: '10px 20px', background: '#00ff00', color: 'black', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 'bold' }}
            >
              Approve
            </button>
          )}
          {data.status !== 'REJECTED' && (
            <button 
              onClick={() => updateStatus('REJECTED')}
              style={{ padding: '10px 20px', background: '#ff0000', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 'bold' }}
            >
              Reject
            </button>
          )}
          {data.status !== 'IN_REVIEW' && data.status !== 'APPROVED' && (
            <button 
              onClick={() => updateStatus('IN_REVIEW')}
              style={{ padding: '10px 20px', background: '#ffa500', color: 'black', border: 'none', borderRadius: 5, cursor: 'pointer', fontWeight: 'bold' }}
            >
              Mark In Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
