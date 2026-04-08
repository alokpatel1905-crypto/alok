'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type PageItem = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  image?: string | null;
  status: string;
  isActive: boolean;
};

export default function PagesPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://127.0.0.1:4000/pages', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((res) => {
        setPages(res || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate this page?')) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://127.0.0.1:4000/pages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) fetchPages();
  };

  const toggleStatus = async (page: PageItem) => {
    const token = localStorage.getItem('token');
    const newStatus = page.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT';
    const res = await fetch(`http://127.0.0.1:4000/pages/${page.id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) fetchPages();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ marginBottom: 20 }}>Pages</h1>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/programs">Programs</Link>
        <Link href="/pages">Pages</Link>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Link href="/pages/create">+ Create Page</Link>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
        style={{ marginBottom: 20 }}
      >
        Logout
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : pages.length === 0 ? (
        <p>No pages found.</p>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {pages.map((page) => (
            <div
              key={page.id}
              style={{
                border: '1px solid #444',
                padding: 16,
                borderRadius: 10,
                background: '#111',
              }}
            >
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                {page.image ? (
                  <img
                    src={page.image}
                    alt={page.title}
                    style={{
                      width: 140,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 140,
                      height: 100,
                      background: '#222',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      fontSize: 12,
                    }}
                  >
                    No Image
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: '0 0 10px 0' }}>{page.title}</h2>
                  <p><strong>Slug:</strong> {page.slug}</p>
                  <p><strong>Status:</strong> <span style={{ color: page.status === 'PUBLISHED' ? '#4CAF50' : '#FFC107' }}>{page.status}</span></p>
                  <p><strong>Active:</strong> {page.isActive ? 'Yes' : 'No'}</p>
                  
                  <div style={{ marginTop: 15, display: 'flex', gap: 10 }}>
                    <button onClick={() => toggleStatus(page)}>
                      {page.status === 'DRAFT' ? '🚀 Publish' : '📁 Move to Draft'}
                    </button>
                    <button 
                      onClick={() => handleDelete(page.id)}
                      style={{ background: '#F44336' }}
                    >
                      🗑️ Deactivate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}