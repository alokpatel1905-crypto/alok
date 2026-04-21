'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPages, apiFetch } from '@/lib/api';
import { FileText, Edit, Activity, Globe, Save } from 'lucide-react';

// Hardcoded standard routing map
const STANDARD_PAGES = [
  { slug: 'about', name: 'About Us' },
  { slug: 'contact', name: 'Contact' },
  { slug: 'awards', name: 'Awards' },
  { slug: 'networks', name: 'Networks' },
  { slug: 'support', name: 'Support Us' },
  { slug: 'media', name: 'Media' },
  { slug: 'rankings', name: 'Rankings' },
  { slug: 'events', name: 'Events' },
  { slug: 'accreditation', name: 'Accreditation' },
  { slug: 'impact', name: 'Impact' },
  { slug: 'home', name: 'Homepage' }
];

export default function AdminPagesList() {
  const [dbPages, setDbPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPages = async () => {
    try {
      const res = await getAllPages();
      if (res && Array.isArray(res)) {
        setDbPages(res);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleInitPage = async (slug: string, title: string) => {
    try {
      await apiFetch('/pages', {
        method: 'POST',
        body: JSON.stringify({
          title,
          slug,
          status: 'PUBLISHED',
        })
      });
      fetchPages();
    } catch (err) {
      alert("Failed to initialize database page.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <FileText className="text-emerald-500" /> CMS Pages
         </h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
         <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                 <tr>
                    <th className="px-6 py-4">Page Title</th>
                    <th className="px-6 py-4">Route / Slug</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                 </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                 {STANDARD_PAGES.map((stdPage) => {
                     const dbRecord = dbPages.find(p => p.slug === stdPage.slug);
                     
                     return (
                         <tr key={stdPage.slug} className="hover:bg-slate-50 transition-colors">
                             <td className="px-6 py-5 font-bold text-slate-800">
                                {stdPage.name}
                             </td>
                             <td className="px-6 py-5 font-mono text-xs text-slate-500">
                                /{stdPage.slug === 'home' ? '' : stdPage.slug}
                             </td>
                             <td className="px-6 py-5">
                                {dbRecord ? (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold whitespace-nowrap">
                                        <Activity size={12}/> Published
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold whitespace-nowrap">
                                        <Globe size={12}/> Not Initialized
                                    </span>
                                )}
                             </td>
                             <td className="px-6 py-5 text-right">
                                 {dbRecord ? (
                                     <Link 
                                       href={stdPage.slug === 'about' ? '/admin/about' : `/admin/pages/${dbRecord.id}`}
                                       className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-emerald-600 transition-all shadow-sm"
                                     >
                                         <Edit size={14} /> Edit Content
                                     </Link>
                                 ) : (
                                     <button 
                                        onClick={() => handleInitPage(stdPage.slug, stdPage.name)}
                                        className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-lg font-bold text-xs hover:bg-emerald-200 transition-all shadow-sm"
                                     >
                                        <Save size={14} /> Initialize DB Record
                                     </button>
                                 )}
                             </td>
                         </tr>
                     );
                 })}
             </tbody>
         </table>
      </div>
    </div>
  );
}
