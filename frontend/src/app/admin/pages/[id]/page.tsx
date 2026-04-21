'use client';

import React, { useEffect, useState, use } from 'react';
import { apiFetch } from '@/lib/api';
import { ArrowLeft, Save, Globe, Settings, Eye } from 'lucide-react';
import Link from 'next/link';
import { SectionsList } from '../components/SectionsList';

export default function PageEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      let pageData;
      const isId = id.length > 20;
      
      if (isId) {
        pageData = await apiFetch(`/pages/id/${id}`);
      } else {
        pageData = await apiFetch(`/pages/${id}`);
      }
      setPage(pageData);
    } catch (e: any) {
      console.error(e);
      const isId = id.length > 20;

      // Auto-initialize if it was a slug and not found
      if (!isId && (e.message?.includes('404') || e.message?.toLowerCase().includes('not found'))) {
        try {
          const newPage = await apiFetch('/pages', {
            method: 'POST',
            body: JSON.stringify({
              title: id.charAt(0).toUpperCase() + id.slice(1),
              slug: id,
              status: 'DRAFT',
            })
          });
          setPage(newPage);
          return;
        } catch (createError) {
          console.error('Auto-initialize failed:', createError);
        }
      }

      setError("Failed to load page data. It may not exist.");
    }
  };

  const handleUpdatePage = async (data: any) => {
    try {
      setIsSaving(true);
      await apiFetch(`/pages/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      setPage({ ...page, ...data });
    } catch (err) {
      setError("Failed to update page settings.");
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto space-y-8 p-8">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100">
          <h2 className="font-bold text-lg mb-2">Error</h2>
          <p className="font-medium text-sm mb-4">{error}</p>
          <Link href="/admin/pages" className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm font-bold transition-colors">
            <ArrowLeft size={16} /> Back to Pages
          </Link>
        </div>
      </div>
    );
  }

  if (!page) return <div className="p-8 text-slate-500 font-medium">Loading editor...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
           <Link href="/admin/pages" className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
              <ArrowLeft size={20} />
           </Link>
           <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight">CMS Page Builder</h1>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Editing: <span className="text-emerald-600">{page.title}</span></p>
           </div>
        </div>

        <div className="flex items-center gap-3">
          <a href={page.slug === 'home' ? '/' : `/${page.slug}`} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg">
            <Eye size={18} /> Preview Page
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: Sections List */}
        <div className="lg:col-span-2 space-y-6">
          <SectionsList pageId={page.id} initialSections={page.sections} />
        </div>

        {/* RIGHT: Page Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
            <h3 className="font-black text-slate-900 text-lg mb-6 flex items-center gap-2">
               <Settings className="text-slate-400" size={20} /> Page Settings
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Page Title</label>
                <input 
                  type="text" 
                  value={page.title}
                  onChange={(e) => setPage({...page, title: e.target.value})}
                  onBlur={(e) => handleUpdatePage({ title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">URL Slug</label>
                <input 
                  type="text" 
                  value={page.slug}
                  onChange={(e) => setPage({...page, slug: e.target.value})}
                  onBlur={(e) => handleUpdatePage({ slug: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">SEO Title</label>
                <input 
                  type="text" 
                  value={page.metaTitle || ''}
                  onChange={(e) => setPage({...page, metaTitle: e.target.value})}
                  onBlur={(e) => handleUpdatePage({ metaTitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">SEO Description</label>
                <textarea 
                  value={page.metaDescription || ''}
                  onChange={(e) => setPage({...page, metaDescription: e.target.value})}
                  onBlur={(e) => handleUpdatePage({ metaDescription: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all h-24 resize-none"
                />
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-600">Status</span>
                <select 
                  value={page.status}
                  onChange={(e) => handleUpdatePage({ status: e.target.value })}
                  className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-100 outline-none"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8">
            <h3 className="font-bold text-slate-900 text-sm mb-4">Quick Help</h3>
            <ul className="space-y-3 text-xs text-slate-500 font-medium leading-relaxed">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Add sections using the buttons on the left.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Reorder sections using up/down arrows.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Changes to settings are saved automatically on blur.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" /> Edit JSON content directly for precise control.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
