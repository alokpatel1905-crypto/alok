"use client";
import React, { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { Save, Loader2, Plus, Edit2, Trash2 } from 'lucide-react';

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
    if(!confirm("Are you sure you want to delete this media post?")) return;
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

  if (isLoading) return <div className="p-8 font-medium text-slate-500">Loading Media CMS...</div>;

  return (
    <div className="max-w-[1400px] mx-auto pb-24">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Media & Publications CMS</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage the public /media page content and articles.</p>
        </div>
        <button 
          onClick={handleSaveConfig}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-200"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Page Text
        </button>
      </div>

      {message && (
        <div className="mb-6 px-6 py-4 bg-white border border-slate-200 shadow-sm rounded-xl font-bold text-sm text-slate-700 animate-in fade-in slide-in-from-top-2">
          {message}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Page Config */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 mb-6">Page Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Page Title</label>
                <input value={config?.page_title || ''} onChange={e => setConfig({...config, page_title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Subtitle</label>
                <input value={config?.subtitle || ''} onChange={e => setConfig({...config, subtitle: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Intro Description</label>
                <textarea rows={3} value={config?.intro_description || ''} onChange={e => setConfig({...config, intro_description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" />
              </div>
            </div>

            <h2 className="text-lg font-black text-slate-900 mt-8 mb-6">Call To Action (Footer)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">CTA Title</label>
                <input value={config?.cta_title || ''} onChange={e => setConfig({...config, cta_title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">CTA Description</label>
                <textarea rows={2} value={config?.cta_description || ''} onChange={e => setConfig({...config, cta_description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Button Text</label>
                  <input value={config?.cta_button_text || ''} onChange={e => setConfig({...config, cta_button_text: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Button Link</label>
                  <input value={config?.cta_button_link || ''} onChange={e => setConfig({...config, cta_button_link: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
              </div>
            </div>

            <h2 className="text-lg font-black text-slate-900 mt-8 mb-6">SEO Metadata</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Meta Title</label>
                <input value={config?.meta_title || ''} onChange={e => setConfig({...config, meta_title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Meta Description</label>
                <textarea rows={2} value={config?.meta_description || ''} onChange={e => setConfig({...config, meta_description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Posts Manager */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-slate-900">Media Cards & Articles</h2>
              <button 
                onClick={() => { setEditingPost({ category: 'News', isActive: true }); setIsModalOpen(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-sm transition-all"
              >
                <Plus className="w-4 h-4" /> Add New Card
              </button>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 font-medium">No media cards created yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-emerald-200 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-4">
                      {post.image ? (
                        <img src={post.image} alt="" className="w-16 h-16 rounded-lg object-cover bg-slate-100" />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-bold">No Img</div>
                      )}
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-100 mb-1 inline-block">{post.category}</span>
                        <h4 className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{post.title}</h4>
                        <p className="text-xs text-slate-500 font-medium">{post.date || 'No date'} • {post.isActive ? 'Active' : 'Hidden'}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => { setEditingPost(post); setIsModalOpen(true); }} className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDeletePost(post.id)} className="w-8 h-8 flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200 p-8">
            <h2 className="text-2xl font-black text-slate-900 mb-6">{editingPost?.id ? 'Edit Media Card' : 'Add New Media Card'}</h2>
            <form onSubmit={handleSavePost} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Title</label>
                  <input required value={editingPost?.title || ''} onChange={e => setEditingPost({...editingPost, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                  <input required placeholder="News, Press, Gallery..." value={editingPost?.category || ''} onChange={e => setEditingPost({...editingPost, category: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Date Label</label>
                  <input placeholder="e.g. Oct 2025" value={editingPost?.date || ''} onChange={e => setEditingPost({...editingPost, date: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                  <textarea rows={3} value={editingPost?.description || ''} onChange={e => setEditingPost({...editingPost, description: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex justify-between">
                    Image URL
                    <span className="text-[10px] font-normal lowercase bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded cursor-pointer" onClick={() => window.open('/admin/media', '_blank')}>Copy from Media Gallery</span>
                  </label>
                  <input value={editingPost?.image || ''} onChange={e => setEditingPost({...editingPost, image: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Link Target URL (Read More)</label>
                  <input value={editingPost?.link || ''} onChange={e => setEditingPost({...editingPost, link: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                </div>
                <div className="col-span-2 flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-700">Display Publicly</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={editingPost?.isActive ?? true} onChange={e => setEditingPost({...editingPost, isActive: e.target.checked})} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 pt-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors">Save Card</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
