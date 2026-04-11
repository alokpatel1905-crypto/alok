'use client';

import React, { useEffect, useState, use } from 'react';
import { apiFetch, updatePageContent, getPageHistory } from '@/lib/api';
import { ArrowLeft, Save, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function PageEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [page, setPage] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [contentStr, setContentStr] = useState('{}');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const pageData = await apiFetch(`/pages/id/${id}`);
      setPage(pageData);
      
      // If content exists, format it beautifully. If not, seed empty object.
      setContentStr(JSON.stringify(pageData.content || {}, null, 2));

      const historyData = await getPageHistory(id);
      setHistory(historyData || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load page data.");
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError('');
      
      // Validate JSON
      const parsedContent = JSON.parse(contentStr);
      
      await updatePageContent(id, {
        content: parsedContent
      });

      // Refresh to get new history log
      await fetchData();
      alert("Page Updated Successfully! The public page will now reflect these changes.");
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setError("Invalid JSON format. Please check your syntax.");
      } else {
        setError("Failed to save changes. Please try again.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!page) return <div className="p-8 text-slate-500 font-medium">Loading editor...</div>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* LEFT: Editor Area */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-4 mb-8">
           <Link href="/admin/pages" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
              <ArrowLeft size={18} />
           </Link>
           <div>
               <h1 className="text-2xl font-black text-slate-900 tracking-tight">Editing: {page.title}</h1>
               <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Route: /{page.slug}</p>
           </div>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 font-medium text-sm">
                <AlertCircle className="shrink-0" size={18} /> {error}
            </div>
        )}

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
           <div className="mb-6">
               <h3 className="font-bold text-slate-900 mb-2">Structured Content Editor</h3>
               <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">
                  Warning: The architecture of this page relies on specific JSON keys. Modification of formatting or keys may break the frontend layout. Only modify text values inside the quotes.
               </p>
               
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[1.5rem] opacity-0 group-focus-within:opacity-20 transition-opacity blur" />
                  <textarea 
                    value={contentStr}
                    onChange={(e) => setContentStr(e.target.value)}
                    className="relative w-full h-[600px] bg-slate-900 text-emerald-300 font-mono text-sm p-6 rounded-2xl border border-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
                    spellCheck={false}
                  />
               </div>
           </div>

           <div className="flex justify-end pt-6 border-t border-slate-100">
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-500 transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isSaving ? 'Saving...' : <>Save Changes <Save size={18} /></>}
               </button>
           </div>
        </div>
      </div>

      {/* RIGHT: History Log */}
      <div className="lg:col-span-1">
         <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-full">
            <h3 className="font-black text-slate-900 text-lg mb-6 flex items-center gap-2">
               <Clock className="text-slate-400" size={20} /> Revision History
            </h3>
            
            {history.length === 0 ? (
                <p className="text-sm text-slate-500 font-medium">No edits have been made to this page yet.</p>
            ) : (
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                   {history.map((h, i) => (
                       <div key={h.id} className="relative flex items-start gap-4">
                           <div className="w-4 h-4 rounded-full bg-emerald-100 border-2 border-emerald-500 shrink-0 mt-1 z-10" />
                           <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex-grow shadow-sm">
                               <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">
                                   {new Date(h.createdAt).toLocaleString()}
                               </p>
                               <p className="font-bold text-slate-700 text-sm">
                                   Edited by: {h.editedBy || 'System/Admin'}
                               </p>
                               {i === 0 && (
                                   <span className="inline-block mt-2 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                                       Current Version
                                   </span>
                               )}
                           </div>
                       </div>
                   ))}
                </div>
            )}
         </div>
      </div>

    </div>
  );
}
