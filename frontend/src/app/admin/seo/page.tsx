'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SeoPage() {
  const [activeTab, setActiveTab] = useState<'pages' | 'programs' | 'sitemap'>('pages');
  const [stats, setStats] = useState<any>(null);
  const [list, setList] = useState<any[]>([]);
  const [sitemap, setSitemap] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:4000/seo/stats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { router.push('/login'); return; }
      if (!res.ok) throw new Error('Failed to load SEO stats');
      const data = await res.json();
      setStats(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    const endpoint = activeTab === 'pages' ? 'pages' : 'programs';
    
    try {
      const res = await fetch(`http://127.0.0.1:4000/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { router.push('/login'); return; }
      if (!res.ok) throw new Error(`Failed to load ${activeTab}`);
      const data = await res.json();
      setList(activeTab === 'pages' ? data : data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSitemap = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:4000/seo/sitemap');
      if (!res.ok) throw new Error('Failed to load sitemap');
      const data = await res.json();
      setSitemap(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'sitemap') fetchSitemap();
    else fetchContent();
  }, [activeTab]);

  if (loading && !stats) return <div style={{ padding: 40 }}>Optimizing for search engines...</div>;

  return (
    <div style={{ padding: '20px 0' }}>
      <h1 style={{ marginBottom: 30, fontSize: '1.8rem' }}>SEO Management 🔍</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        <StatCard title="Optimized Pages" value={`${stats?.pages.optimized} / ${stats?.pages.total}`} color="#4CAF50" />
        <StatCard title="Optimized Programs" value={`${stats?.programs.optimized} / ${stats?.programs.total}`} color="#2196F3" />
      </div>

      <div style={{ display: 'flex', gap: 20, borderBottom: '1px solid #333', marginBottom: 30 }}>
        <TabButton active={activeTab === 'pages'} onClick={() => setActiveTab('pages')}>Page SEO</TabButton>
        <TabButton active={activeTab === 'programs'} onClick={() => setActiveTab('programs')}>Program SEO</TabButton>
        <TabButton active={activeTab === 'sitemap'} onClick={() => setActiveTab('sitemap')}>Sitemap</TabButton>
      </div>

      {activeTab !== 'sitemap' ? (
        <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#222' }}>
              <tr style={{ textAlign: 'left' }}>
                <Th>Title / Slug</Th>
                <Th>Meta Description</Th>
                <Th>Status</Th>
                <Th style={{ textAlign: 'right' }}>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item: any) => (
                <tr key={item.id} style={{ borderTop: '1px solid #333' }}>
                  <Td>
                    <div style={{ fontWeight: '600' }}>{item.metaTitle || item.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>/{item.slug}</div>
                  </Td>
                  <Td style={{ maxWidth: 300 }}>
                    <div style={{ fontSize: '0.85rem', color: item.metaDescription ? '#aaa' : '#555', fontStyle: item.metaDescription ? 'normal' : 'italic' }}>
                      {item.metaDescription || 'No description set'}
                    </div>
                  </Td>
                  <Td>
                    {item.metaTitle && item.metaDescription ? (
                      <span style={{ color: '#4CAF50', fontSize: '0.75rem', fontWeight: 'bold' }}>● OPTIMIZED</span>
                    ) : (
                      <span style={{ color: '#FFC107', fontSize: '0.75rem', fontWeight: 'bold' }}>○ INCOMPLETE</span>
                    )}
                  </Td>
                  <Td style={{ textAlign: 'right' }}>
                    <button style={{ padding: '6px 12px', fontSize: '0.8rem', background: '#333', color: '#fff', borderRadius: 4, border: '1px solid #444', cursor: 'pointer' }}>
                      Edit SEO
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: '#1a1a1a', padding: 30, borderRadius: 12, border: '1px solid #333' }}>
          <h3 style={{ marginTop: 0, marginBottom: 20 }}>Live Sitemap XML</h3>
          <div style={{ background: '#000', padding: 20, borderRadius: 8, overflowX: 'auto' }}>
            <pre style={{ margin: 0, color: '#4CAF50', fontSize: '0.85rem' }}>
              {`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`}
              {sitemap?.pages.map((p: any) => `  <url>\n    <loc>https://greenmentors.in${p.url}</loc>\n    <lastmod>${p.lastMod}</lastmod>\n  </url>\n`).join('')}
              {sitemap?.programs.map((p: any) => `  <url>\n    <loc>https://greenmentors.in${p.url}</loc>\n    <lastmod>${p.lastMod}</lastmod>\n  </url>\n`).join('')}
              {`</urlset>`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div style={{ background: '#1a1a1a', padding: 24, borderRadius: 12, border: '1px solid #333', borderLeft: `4px solid ${color}` }}>
      <h3 style={{ color: '#888', fontSize: '0.85rem', textTransform: 'uppercase', margin: '0 0 10px 0' }}>{title}</h3>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>{value}</p>
    </div>
  );
}

function TabButton({ children, active, onClick }: any) {
  return (
    <button onClick={onClick} style={{
      padding: '12px 20px',
      background: 'transparent',
      border: 'none',
      color: active ? '#0070f3' : '#666',
      borderBottom: active ? '2px solid #0070f3' : '2px solid transparent',
      cursor: 'pointer',
      fontWeight: '600'
    }}>{children}</button>
  );
}

function Th({ children, style }: any) {
  return <th style={{ padding: '16px 20px', color: '#888', fontSize: '0.8rem', fontWeight: '500', ...style }}>{children}</th>;
}

function Td({ children, style }: any) {
  return <td style={{ padding: '16px 20px', fontSize: '0.9rem', ...style }}>{children}</td>;
}