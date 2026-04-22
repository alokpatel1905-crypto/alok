'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { UploadCloud, File, Link as LinkIcon, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MediaPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/upload');
      setData(res);
    } catch (error) {
      console.error('Error fetching media:', error);
      setMessage('Failed to load media files.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      // NOTE: Using native fetch to fix issues where apiFetch might drop body FormData properly
      const token = localStorage.getItem('token');
      const res = await fetch('http://127.0.0.1:4000/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      setMessage('✅ File uploaded successfully!');
      fetchMedia();
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('❌ Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) return;
    
    try {
      await apiFetch(`/upload/${id}`, { method: 'DELETE' });
      setMessage('🗑️ File deleted.');
      fetchMedia();
    } catch (error: any) {
      if (error.message && error.message.includes('404')) {
        // If it returns 404, the file is already deleted on the server.
        setMessage('🗑️ File deleted.');
        fetchMedia();
      } else {
        console.error('Delete failed:', error);
        alert('Delete failed: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setMessage('🔗 URL copied to clipboard!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-slate-500 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <p className="font-medium animate-pulse">Loading media gallery...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <ImageIcon className="w-8 h-8 text-emerald-600" />
            Media Gallery
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">Manage uploaded images, documents, and other assets for your site.</p>
        </div>
        
        <div className="relative">
          <input 
            type="file" 
            id="file-upload" 
            className="hidden"
            onChange={handleUpload} 
            disabled={uploading}
          />
          <label 
            htmlFor="file-upload" 
            className={cn(
              "flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-sm group",
              uploading 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 hover:shadow-lg cursor-pointer"
            )}
          >
            {uploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <UploadCloud className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            )}
            {uploading ? 'Uploading...' : 'Upload New File'}
          </label>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-white border border-slate-200 shadow-sm rounded-xl font-bold text-sm text-slate-700 animate-in fade-in slide-in-from-top-2">
          {message}
        </div>
      )}

      {/* Grid */}
      {data?.data?.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
          <UploadCloud className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-700">No files uploaded</h3>
          <p className="text-slate-500">Upload an image or document to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data?.data?.map((item: any) => (
            <div key={item.id} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col">
              
              {/* Media Preview */}
              <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                
                {item.mimetype.startsWith('image/') ? (
                  <img src={item.url} alt={item.originalname} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <File className="w-16 h-16 text-slate-400 group-hover:scale-110 transition-transform duration-500" />
                )}

                {/* Actions Overlay */}
                <div className="absolute bottom-3 left-0 w-full px-3 flex justify-between gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                  <button 
                    onClick={() => copyToClipboard(item.url)}
                    className="flex-1 flex items-center justify-center gap-1 bg-white/90 hover:bg-white backdrop-blur text-slate-700 font-bold text-xs py-1.5 rounded-lg transition-colors cursor-pointer"
                    title="Copy URL"
                  >
                    <LinkIcon className="w-3.5 h-3.5" /> Copy
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-500/90 hover:bg-red-600 backdrop-blur text-white font-bold text-xs py-1.5 rounded-lg transition-colors cursor-pointer"
                    title="Delete File"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
              
              {/* Details */}
              <div className="p-4 border-t border-slate-100 bg-white group-hover:bg-emerald-50/30 transition-colors flex-1 flex flex-col justify-end">
                <p className="text-xs font-bold text-slate-700 truncate mb-1" title={item.originalname}>
                  {item.originalname}
                </p>
                <div className="flex items-center justify-between">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.mimetype.split('/')[1] || 'File'}</p>
                   <p className="text-[10px] font-medium text-slate-400">{new Date(item.created_at || Date.now()).toLocaleDateString()}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
