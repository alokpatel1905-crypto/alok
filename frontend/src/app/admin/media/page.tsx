'use client';

import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  UploadCloud, 
  File, 
  Link as LinkIcon, 
  Trash2, 
  Image as ImageIcon, 
  Loader2,
  Copy,
  Plus,
  ExternalLink,
  Search,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MediaPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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
      setTimeout(() => setMessage(''), 3000);
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
      setMessage('🗑️ File deleted successfully.');
      fetchMedia();
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      if (error.message && error.message.includes('404')) {
        setMessage('🗑️ File already deleted.');
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

  const filteredMedia = data?.data?.filter((item: any) => 
    item.originalname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !data) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-sm font-black uppercase tracking-widest text-foreground/40 animate-pulse">Syncing Media Repository...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 bg-white/40 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-10 shadow-premium">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-primary" />
             </div>
             <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">Media Gallery</h1>
          </div>
          <p className="text-foreground/40 font-medium italic pl-1">Global asset management and digital repository.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-primary/5 border border-primary/5 rounded-2xl py-3.5 pl-12 pr-6 w-64 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all font-medium"
            />
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
                "flex items-center gap-3 px-8 py-3.5 font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl active:scale-95",
                uploading 
                  ? "bg-primary/20 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 hover:shadow-primary/20 cursor-pointer"
              )}
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {uploading ? 'Processing...' : 'Add New Asset'}
            </label>
          </div>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-3 text-primary animate-in slide-in-from-top-4 duration-500 font-bold text-xs uppercase tracking-widest">
          <CheckCircle2 size={16} />
          {message}
        </div>
      )}

      {/* Media Grid */}
      {filteredMedia?.length === 0 ? (
        <div className="text-center py-32 bg-white/40 backdrop-blur-xl border border-dashed border-primary/10 rounded-[4rem]">
          <UploadCloud className="w-20 h-20 text-primary/10 mx-auto mb-6" />
          <h3 className="text-2xl font-display font-black text-foreground uppercase tracking-tighter">Repository Empty</h3>
          <p className="text-foreground/40 font-medium italic">Begin by uploading institutional assets to the global network.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredMedia?.map((item: any) => (
            <div key={item.id} className="group bg-white/60 backdrop-blur-xl border border-primary/5 rounded-[2.5rem] overflow-hidden shadow-premium hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col h-full">
              
              {/* Asset Preview */}
              <div className="aspect-[4/3] bg-primary/5 flex items-center justify-center relative overflow-hidden group-hover:bg-primary/[0.02] transition-colors">
                {item.mimetype.startsWith('image/') ? (
                  <img 
                    src={item.url} 
                    alt={item.originalname} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" 
                  />
                ) : (
                  <FileText className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform duration-[2s]" strokeWidth={1} />
                )}

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-primary border border-primary/10 z-20">
                  {item.mimetype.split('/')[1]}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-3 z-30">
                  <button 
                    onClick={() => copyToClipboard(item.url)}
                    className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-500 delay-[50ms]"
                    title="Copy URL"
                  >
                    <Copy size={20} />
                  </button>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-500 delay-[100ms]"
                    title="View Original"
                  >
                    <ExternalLink size={20} />
                  </a>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-xl transform translate-y-4 group-hover:translate-y-0 duration-500 delay-[150ms]"
                    title="Delete Permanently"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              
              {/* Asset Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                   <p className="text-[11px] font-black text-foreground tracking-tight truncate leading-none uppercase" title={item.originalname}>
                     {item.originalname}
                   </p>
                   <p className="text-[9px] font-medium text-foreground/40 italic">
                     Stored {new Date(item.created_at || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                   </p>
                </div>
                
                <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7CB87A]" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-foreground/40">Verified</span>
                   </div>
                   <div className="text-[8px] font-black uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded-md">
                      Protocol 2.0
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
