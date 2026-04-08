'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AccreditationsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const res = await fetch('http://127.0.0.1:4000/accreditations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          router.push('/login');
          return;
        }

        if (!res.ok) {
          throw new Error('Failed to fetch accreditations');
        }

        const result = await res.json();
        setData(result);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return '#00ff00';
      case 'REJECTED': return '#ff0000';
      case 'IN_REVIEW': return '#ffa500';
      default: return '#888';
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Loading accreditations...</p>;

  if (error) {
    return (
      <div style={{ padding: 20, color: '#ff4444', background: '#221111', borderRadius: 8, margin: 20 }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ background: '#ff4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', marginTop: 10 }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Accreditations 📜</h1>
        <p>No accreditations found.</p>
        <Link 
          href="/accreditations/request"
          style={{ background: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: 5, textDecoration: 'none', display: 'inline-block', marginTop: 10 }}
        >
          Request Accreditation
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Accreditations 📜</h1>
        <Link 
          href="/accreditations/request"
          style={{ background: '#0070f3', color: 'white', padding: '10px 20px', borderRadius: 5, textDecoration: 'none' }}
        >
          Request Accreditation
        </Link>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 20 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #333' }}>
            <th style={{ padding: 10 }}>Title</th>
            <th style={{ padding: 10 }}>Institution</th>
            <th style={{ padding: 10 }}>Status</th>
            <th style={{ padding: 10 }}>Expiry</th>
            <th style={{ padding: 10 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: 10 }}>{item.title}</td>
              <td style={{ padding: 10 }}>{item.institution?.name}</td>
              <td style={{ padding: 10 }}>
                <span style={{ color: getStatusColor(item.status) }}>
                  {item.status}
                </span>
              </td>
              <td style={{ padding: 10 }}>{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</td>
              <td style={{ padding: 10 }}>
                <Link href={`/accreditations/${item.id}`} style={{ color: '#0070f3' }}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
