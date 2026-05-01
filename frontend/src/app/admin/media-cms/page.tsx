'use client';

import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  Save, 
  Plus, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  FileText, 
  ExternalLink, 
  Layout, 
  Type, 
  AlignLeft, 
  Link as LinkIcon, 
  Search, 
  Globe, 
  ShieldCheck, 
  X, 
  Calendar,
  CheckCircle2,
  Activity,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MediaCMSPage() {
  const [config, setConfig] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Editor Modal
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const configRes = await apiFetch('/api/media-page/config');
      const postsRes = await apiFetch('/api/media-page/posts');
      setConfig(configRes);
      setPosts(postsRes || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      await apiFetch('/api/media-page/config', {
        method: 'PATCH',
        body: JSON.stringify(config),
      });
      setMessage('✅ Page configuration updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to save configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if(!confirm("Are you sure you want to delete this media artifact?")) return;
    try {
      await apiFetch(`/api/media-page/posts/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete post");
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost.id) {
        await apiFetch(`/api/media-page/posts/${editingPost.id}`, {
          method: 'PATCH',
          body: JSON.stringify(editingPost),
        });
      } else {
        await apiFetch('/api/media-page/posts', {
          method: 'POST',
          body: JSON.stringify(editingPost),
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to save post");
    }
  };

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Syncing Media Assets...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <ImageIcon className="w-10 h-10 text-primary" />
            Media & Asset CMS
          </h1>
          <p className="text-foreground/60 font-medium italic">Orchestrating global publications and visual artifacts for the GM ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 group"
          >
            {isSaving ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Save size={18} className="group-hover:rotate-12 transition-transform" />}
            Save Global Config
          </button>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 animate-in zoom-in-95 duration-300 shadow-sm">
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">{message}</p>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Page Identity & SEO */}
        <div className="lg:col-span-5 space-y-8 sticky top-8">
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-10 space-y-8 shadow-premium">
            <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
              <Layout className="text-primary" size={20} />
              <h2 className="text-xl font-black text-foreground tracking-tight">Identity & Vision</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                  <Type size={12} />
                  Hero Title
                </label>
                <input value={config?.page_title || ''} onChange={e => setConfig({...config, page_title: e.target.value})} className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-sm font-bold placeholder:text-foreground/20" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                  <Sparkles size={12} />
                  Subtitle Pulse
                </label>
                <input value={config?.subtitle || ''} onChange={e => setConfig({...config, subtitle: e.target.value})} className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-sm font-bold placeholder:text-foreground/20" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                  <AlignLeft size={12} />
                  Intro Narrative
                </label>
                <textarea rows={3} value={config?.intro_description || ''} onChange={e => setConfig({...config, intro_description: e.target.value})} className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-sm font-medium min-h-[100px] italic resize-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 border-b border-primary/5 pb-6 pt-4">
              <Globe className="text-water" size={20} />
              <h2 className="text-xl font-black text-foreground tracking-tight">SEO Intelligence</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-water transition-colors">
                  <Search size={12} />
                  Meta Protocol Title
                </label>
                <input value={config?.meta_title || ''} onChange={e => setConfig({...config, meta_title: e.target.value})} className="w-full px-5 py-4 bg-water/5 border border-water/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-water/5 focus:border-water/30 transition-all text-sm font-bold" />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-water transition-colors">
                  <FileText size={12} />
                  Search Snippet
                </label>
                <textarea rows={2} value={config?.meta_description || ''} onChange={e => setConfig({...config, meta_description: e.target.value})} className="w-full px-5 py-4 bg-water/5 border border-water/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-water/5 focus:border-water/30 transition-all text-sm font-medium italic resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Artifacts Manager */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-10 space-y-10 shadow-premium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Activity size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tighter">Digital Artifacts</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Registry of global publications & news cards</p>
                </div>
              </div>
              <button 
                onClick={() => { setEditingPost({ category: 'News', isActive: true }); setIsModalOpen(true); }}
                className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 group"
              >
                <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                Engrave Artifact
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {posts.length === 0 ? (
                <div className="p-32 text-center border border-dashed border-primary/10 rounded-[2rem] bg-primary/5">
                  <ImageIcon size={48} className="mx-auto mb-4 text-primary/20" />
                  <p className="text-foreground/40 font-black uppercase tracking-widest text-[10px]">No Artifacts Recorded</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="group p-5 bg-white border border-primary/5 rounded-[2rem] hover:border-primary/20 hover:shadow-premium transition-all duration-300 flex items-center justify-between gap-6 relative overflow-hidden">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary/5 border border-primary/5 group-hover:scale-105 transition-transform flex items-center justify-center relative shrink-0">
                        {post.image ? (
                          <img src={post.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={24} className="text-primary/20" />
                        )}
                        {!post.isActive && <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center text-[8px] font-black text-white uppercase tracking-widest">Hidden</div>}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.2em] rounded-md border border-primary/10">{post.category}</span>
                          <span className="text-[10px] text-foreground/20 font-bold tracking-tight flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                        </div>
                        <h4 className="text-lg font-black text-foreground tracking-tighter truncate group-hover:text-primary transition-colors">{post.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <div className={cn("w-1.5 h-1.5 rounded-full", post.isActive ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-400")} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-foreground/30">{post.isActive ? 'Active Pulse' : 'Offline'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <button onClick={() => { setEditingPost(post); setIsModalOpen(true); }} className="p-3 bg-primary/5 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-sm border border-primary/5">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeletePost(post.id)} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm border border-red-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
          
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden border border-primary/10 animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
            {/* Modal Header */}
            <div className="bg-primary/5 px-10 py-8 border-b border-primary/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-foreground tracking-tighter flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  {editingPost?.id ? 'Modify Artifact' : 'Engrave New Artifact'}
                </h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mt-1 italic italic">Integrating asset into global media network.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-primary/5 rounded-2xl text-foreground/20 hover:text-primary transition-all">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSavePost} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-8">
                <div className="col-span-2 space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"><Type size={12} /> Artifact Heading</label>
                  <input required value={editingPost?.title || ''} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold" />
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"><Layout size={12} /> Classification</label>
                  <input required placeholder="News, Press, Gallery..." value={editingPost?.category || ''} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-black uppercase tracking-widest" />
                </div>
                
                <div className="space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"><Calendar size={12} /> Publication Date</label>
                  <input placeholder="e.g. Oct 2025" value={editingPost?.date || ''} onChange={e => setEditingPost({...editingPost, date: e.target.value})} className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold" />
                </div>
                
                <div className="col-span-2 space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"><AlignLeft size={12} /> Excerpt Narrative</label>
                  <textarea rows={3} value={editingPost?.description || ''} onChange={e => setEditingPost({...editingPost, description: e.target.value})} className="w-full bg-primary/5 border border-primary/10 rounded-[2rem] px-6 py-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-medium italic resize-none" />
                </div>
                
                <div className="col-span-2 space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"><ImageIcon size={12} /> Visual Asset URL</label>
                  <input value={editingPost?.image || ''} onChange={e => setEditingPost({...editingPost, image: e.target.value})} className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold" />
                </div>
                
                <div className="col-span-2 space-y-2 group">
                  <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors"><LinkIcon size={12} /> Discovery Destination Link</label>
                  <input value={editingPost?.link || ''} onChange={e => setEditingPost({...editingPost, link: e.target.value})} className="w-full bg-primary/5 border border-primary/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold" />
                </div>
                
                <div className="col-span-2 flex items-center justify-between p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/60 block">Publish Pulse</span>
                    <span className="text-[9px] font-bold text-foreground/30 italic">Determine if this artifact is visible to the public matrix.</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={editingPost?.isActive ?? true} onChange={e => setEditingPost({...editingPost, isActive: e.target.checked})} className="sr-only peer" />
                    <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-primary/5">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-foreground/60 transition-all active:scale-95">Abort Mission</button>
                <button type="submit" className="flex-[2] py-5 bg-primary text-white rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 group">
                  <span className="flex items-center justify-center gap-2">
                    Confirm Engravement
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
