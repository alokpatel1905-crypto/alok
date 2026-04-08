'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CreatePagePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('PUBLISHED');
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      return;
    }

    const res = await fetch('http://localhost:4000/pages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        slug,
        content,
        status,
      }),
    });

    const data = await res.json();

    if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
    }

    setResult(data);

    if (data.id) {
        window.location.href = '/programs';
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Page</h1>

      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/programs">Programs</Link>
        <Link href="/pages">Pages</Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10, maxWidth: 400 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="DRAFT">DRAFT</option>
        </select>

        <button type="submit">Create Page</button>
      </form>

      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}