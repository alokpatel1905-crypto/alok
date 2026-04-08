'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InstitutionProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch(`http://127.0.0.1:4000/institutions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch institution profile');
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id, router]);

  if (loading) return <div style={{ padding: 40 }}>Loading profile...</div>;
  if (error) return <div style={{ padding: 40, color: '#f44336' }}>Error: {error}</div>;
  if (!data) return <div style={{ padding: 40 }}>Institution not found.</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <div>
          <Link href="/institutions" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Institutions</Link>
          <h1 style={{ fontSize: '2.2rem', margin: '10px 0 0 0' }}>{data.name}</h1>
        </div>
        <Link 
          href={`/institutions/edit/${id}`} 
          style={{ background: '#333', color: 'white', padding: '10px 20px', borderRadius: 8, textDecoration: 'none' }}
        >
          Edit Profile
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 30 }}>
        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Section title="Basic Information">
            <InfoItem label="Type" value={data.type} />
            <InfoItem label="Email" value={data.email || 'N/A'} />
            <InfoItem label="Phone" value={data.phone || 'N/A'} />
            <InfoItem label="Website" value={data.website} isLink />
            <InfoItem label="Location" value={`${data.city || ''}, ${data.country || ''}`} />
            <InfoItem label="Status" value={data.isActive ? 'ACTIVE' : 'INACTIVE'} isStatus status={data.isActive} />
          </Section>

          <Section title="Management">
            <InfoItem label="Managed By" value={data.managedBy?.name} />
            <InfoItem label="Manager Email" value={data.managedBy?.email} />
          </Section>
        </div>

        {/* Main Content Areas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {/* Accreditation Tracking */}
          <Section title="Accreditation Tracking">
            <Table>
              <thead>
                <tr>
                  <Th>Title</Th>
                  <Th>Status</Th>
                  <Th>Expiry</Th>
                </tr>
              </thead>
              <tbody>
                {data.accreditations?.map((acc: any) => (
                  <tr key={acc.id}>
                    <Td>{acc.title}</Td>
                    <Td><StatusBadge status={acc.status}>{acc.status}</StatusBadge></Td>
                    <Td>{acc.expiryDate ? new Date(acc.expiryDate).toLocaleDateString() : 'N/A'}</Td>
                  </tr>
                ))}
                {data.accreditations?.length === 0 && (
                  <tr><Td colSpan={3} style={{ textAlign: 'center', color: '#666' }}>No accreditations found</Td></tr>
                )}
              </tbody>
            </Table>
          </Section>

          {/* Ranking Participation */}
          <Section title="Ranking Participation">
            <Table>
              <thead>
                <tr>
                  <Th>Category</Th>
                  <Th>Rank</Th>
                  <Th>Year</Th>
                  <Th>Score</Th>
                </tr>
              </thead>
              <tbody>
                {data.rankings?.map((rank: any) => (
                  <tr key={rank.id}>
                    <Td>{rank.category}</Td>
                    <Td style={{ fontWeight: 'bold', color: '#FFC107' }}>#{rank.rank}</Td>
                    <Td>{rank.year}</Td>
                    <Td>{rank.score || 'N/A'}</Td>
                  </tr>
                ))}
                {data.rankings?.length === 0 && (
                  <tr><Td colSpan={4} style={{ textAlign: 'center', color: '#666' }}>No rankings found</Td></tr>
                )}
              </tbody>
            </Table>
          </Section>

          {/* Document Uploads */}
          <Section title="Related Documents">
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 15 }}>
                {data.documents?.map((doc: any) => (
                  <div key={doc.id} style={{ background: '#222', padding: 15, borderRadius: 8, border: '1px solid #333' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 10 }}>📄</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: 5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#777', marginBottom: 10 }}>{doc.category}</div>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0070f3', textDecoration: 'none' }}>Download</a>
                  </div>
                ))}
                {data.documents?.length === 0 && (
                  <p style={{ gridColumn: 'span 3', textAlign: 'center', color: '#666', padding: 20 }}>No documents uploaded.</p>
                )}
             </div>
          </Section>
        </div>
      </div>
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

function InfoItem({ label, value, isLink, isStatus, status }: any) {
  return (
    <div style={{ marginBottom: 15 }}>
      <label style={{ display: 'block', fontSize: '0.75rem', color: '#666', textTransform: 'uppercase', marginBottom: 4 }}>{label}</label>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'none' }}>{value || 'N/A'}</a>
      ) : isStatus ? (
        <span style={{ color: status ? '#4CAF50' : '#f44336', fontWeight: 'bold' }}>{value}</span>
      ) : (
        <div style={{ color: '#eee', fontWeight: '500' }}>{value || 'N/A'}</div>
      )}
    </div>
  );
}

function Table({ children }: any) {
  return <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>{children}</table>;
}

function Th({ children }: any) {
  return <th style={{ padding: '10px 8px', borderBottom: '1px solid #333', color: '#888', fontSize: '0.8rem', fontWeight: '500' }}>{children}</th>;
}

function Td({ children, colSpan, style }: any) {
  return <td colSpan={colSpan} style={{ padding: '12px 8px', borderBottom: '1px solid #222', fontSize: '0.85rem', ...style }}>{children}</td>;
}

function StatusBadge({ children, status }: any) {
  const getColors = () => {
    switch(status) {
      case 'APPROVED': return { bg: '#4CAF5022', text: '#4CAF50' };
      case 'PENDING': return { bg: '#FFC10722', text: '#FFC107' };
      case 'REJECTED': return { bg: '#f4433622', text: '#f44336' };
      default: return { bg: '#333', text: '#888' };
    }
  };
  const colors = getColors();
  return <span style={{ padding: '3px 8px', borderRadius: 4, fontSize: '0.7rem', fontWeight: 'bold', background: colors.bg, color: colors.text }}>{children}</span>;
}