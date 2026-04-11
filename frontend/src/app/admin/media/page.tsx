'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';

export default function MediaPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchMedia = async () => {
    try {
      const res = await apiFetch('/upload');
      setData(res);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching media:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      await apiFetch('/upload', {
        method: 'POST',
        body: formData,
      });
      fetchMedia();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await apiFetch(`/upload/${id}`, {
        method: 'DELETE',
      });
      fetchMedia();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Delete failed');
    }
  };

  if (loading) return <p>Loading media...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1>Media Gallery 🖼️</h1>
        <div>
          <input 
            type="file" 
            id="file-upload" 
            hidden 
            onChange={handleUpload} 
            disabled={uploading}
          />
          <label 
            htmlFor="file-upload" 
            style={{ 
              background: '#0070f3', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: 5, 
              cursor: uploading ? 'not-allowed' : 'pointer' 
            }}
          >
            {uploading ? 'Uploading...' : 'Upload New'}
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
        {data?.data?.map((item: any) => (
          <div key={item.id} style={{ background: '#111', border: '1px solid #333', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ height: 150, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {item.mimetype.startsWith('image/') ? (
                <img src={item.url} alt={item.originalname} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              ) : (
                <span style={{ fontSize: 40 }}>📄</span>
              )}
            </div>
            <div style={{ padding: 10 }}>
              <p style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.originalname}>
                {item.originalname}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(item.url);
                    alert('URL copied to clipboard');
                  }}
                  style={{ fontSize: 11, background: '#333', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: 3, cursor: 'pointer' }}
                >
                  Copy URL
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  style={{ fontSize: 11, background: '#ff0000', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: 3, cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
