'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  History, 
  Save, 
  ExternalLink, 
  Eye, 
  Plus, 
  Trash2, 
  Edit2, 
  Flag, 
  Target, 
  ArrowRight, 
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Layout,
  Star,
  Zap,
  Clock,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ManageMilestonesPage() {
  const [formData, setFormData] = useState<any>({});
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('intro');

  const [editingMilestoneId, setEditingMilestoneId] = useState<string | null>(null);
  const [newMilestone, setNewMilestone] = useState({ year: '', title: '', description: '', order: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pageData, listData] = await Promise.all([
        apiFetch('/milestones/page'),
        apiFetch('/milestones'),
      ]);
      setFormData(pageData || {});
      setMilestones(listData || []);
    } catch (e: any) {
      console.error(e);
      setMessage("Note: Could not load configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/milestones/page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Milestone protocols synchronized successfully!');
      setTimeout(() => setMessage(''), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAddMilestone = async () => {
    if (!newMilestone.year || !newMilestone.description) return alert("Year and description required.");
    try {
      const added = await apiFetch('/milestones/add', {
        method: 'POST',
        body: JSON.stringify(newMilestone),
      });
      setMilestones([...milestones, added]);
      setNewMilestone({ year: '', title: '', description: '', order: 0 });
    } catch (e: any) {
      alert("Error adding milestone: " + e.message);
    }
  };

  const handleUpdateMilestone = async (id: string, updatedData: any) => {
    try {
      const res = await apiFetch(`/milestones/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
      });
      setMilestones(milestones.map(m => m.id === id ? res : m));
      setEditingMilestoneId(null);
    } catch (e: any) {
      alert("Error updating milestone: " + e.message);
    }
  };

  const handleDeleteMilestone = async (id: string) => {
    if (!confirm("Delete this milestone?")) return;
    try {
      await apiFetch(`/milestones/delete/${id}`, { method: 'DELETE' });
      setMilestones(milestones.filter(m => m.id !== id));
    } catch (e: any) {
      alert("Error deleting milestone: " + e.message);
    }
  };

  const Field = ({ label, field, type = 'text', placeholder = '' }: any) => (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-sm font-medium min-h-[140px] italic placeholder:text-foreground/20"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-sm font-bold placeholder:text-foreground/20"
        />
      )}
    </div>
  );

  const sections = [
    { id: 'intro', label: 'Genesis Intro', icon: Layout },
    { id: 'timeline', label: 'Timeline Matrix', icon: Clock },
    { id: 'design', label: 'Design Protocols', icon: Settings },
    { id: 'cta', label: 'Action Gateway', icon: Target },
    { id: 'seo', label: 'Global SEO', icon: Search },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-black uppercase tracking-widest text-foreground/40 animate-pulse">Syncing Milestone Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/40 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-10 shadow-premium">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <History className="w-6 h-6 text-primary" />
             </div>
             <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">Milestones Master</h1>
          </div>
          <p className="text-foreground/40 font-medium italic pl-1">Configuring the global institutional timeline and historical milestones.</p>
        </div>
        <Link 
          href="/milestones" 
          target="_blank" 
          className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group"
        >
          <Eye size={16} className="group-hover:scale-110 transition-transform" />
          Live Preview
        </Link>
      </div>

      {message && (
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-center gap-3 text-primary animate-in zoom-in-95 duration-300 font-bold text-xs uppercase tracking-widest">
          <CheckCircle2 size={16} />
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sticky Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-2 bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-6 shadow-premium">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group",
                  activeSection === section.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20" 
                    : "hover:bg-primary/5 text-foreground/40 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-4">
                  <section.icon size={18} className={cn("transition-colors", activeSection === section.id ? "text-white" : "text-primary/60")} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{section.label}</span>
                </div>
                <ChevronRight size={14} className={cn("transition-transform", activeSection === section.id ? "translate-x-1" : "opacity-0")} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Form */}
        <div className="lg:col-span-3 space-y-10">
          
          {/* INTRO SECTION */}
          {activeSection === 'intro' && (
            <form onSubmit={handleSavePage} className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Layout className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Genesis Intro</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Protocol Title" field="page_title" />
                <Field label="Subtitle Narrative" field="subtitle" />
              </div>
              <Field label="Intro Methodology" field="intro_description" type="textarea" />
              <button type="submit" disabled={saving} className="w-full py-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">
                 {saving ? 'Syncing...' : 'Save Intro Protocol'}
              </button>
            </form>
          )}

          {/* TIMELINE MATRIX */}
          {activeSection === 'timeline' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Clock className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Timeline Matrix</h2>
              </div>
              
              <div className="space-y-6">
                {milestones.map((m) => (
                  <div key={m.id} className="bg-primary/5 border border-primary/10 rounded-[2.5rem] p-10 relative group/ms">
                    {editingMilestoneId === m.id ? (
                      <div className="space-y-6 animate-in zoom-in-95 duration-300">
                         <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-primary uppercase">Order</label>
                               <input type="number" defaultValue={m.order} id={`order_${m.id}`} className="w-full px-5 py-3.5 bg-white border border-primary/10 rounded-xl text-sm font-bold" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-primary uppercase">Chronology Year</label>
                               <input type="text" defaultValue={m.year} id={`year_${m.id}`} className="w-full px-5 py-3.5 bg-white border border-primary/10 rounded-xl text-sm font-bold" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black text-primary uppercase">Identity Title</label>
                               <input type="text" defaultValue={m.title} id={`title_${m.id}`} className="w-full px-5 py-3.5 bg-white border border-primary/10 rounded-xl text-sm font-bold" />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-primary uppercase">Narrative Description</label>
                            <textarea defaultValue={m.description} id={`desc_${m.id}`} className="w-full px-5 py-3.5 bg-white border border-primary/10 rounded-xl text-sm font-medium italic h-24" />
                         </div>
                         <div className="flex items-center gap-4">
                            <button type="button" onClick={() => {
                              handleUpdateMilestone(m.id, {
                                order: (document.getElementById(`order_${m.id}`) as HTMLInputElement).value,
                                year: (document.getElementById(`year_${m.id}`) as HTMLInputElement).value,
                                title: (document.getElementById(`title_${m.id}`) as HTMLInputElement).value,
                                description: (document.getElementById(`desc_${m.id}`) as HTMLTextAreaElement).value,
                              });
                            }} className="px-8 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">Save Changes</button>
                            <button type="button" onClick={() => setEditingMilestoneId(null)} className="px-8 py-3 bg-white text-foreground/40 text-[10px] font-black uppercase tracking-widest rounded-xl border border-primary/10">Cancel</button>
                         </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-10">
                         <div className="flex items-start gap-10">
                            <div className="flex flex-col items-center">
                               <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center text-xl font-black shadow-xl shadow-primary/20">
                                  {m.year}
                               </div>
                               <div className="text-[10px] font-black text-foreground/20 mt-4 uppercase">Protocol 0{m.order}</div>
                            </div>
                            <div className="space-y-3 pt-2">
                               <h3 className="text-xl font-black text-foreground tracking-tight uppercase">{m.title || 'Untitled Epoch'}</h3>
                               <p className="text-sm text-foreground/60 italic font-medium max-w-xl">{m.description}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 opacity-0 group-hover/ms:opacity-100 transition-opacity">
                            <button onClick={() => setEditingMilestoneId(m.id)} className="p-4 bg-white border border-primary/10 rounded-2xl text-primary hover:bg-primary hover:text-white transition-all">
                               <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteMilestone(m.id)} className="p-4 bg-white border border-primary/10 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all">
                               <Trash2 size={18} />
                            </button>
                         </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add New Milestone */}
              <div className="mt-12 p-10 bg-white border border-dashed border-primary/20 rounded-[2.5rem] space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                 <div className="flex items-center gap-3 text-primary">
                    <Plus size={24} />
                    <h3 className="text-lg font-black uppercase tracking-widest">Append New Epoch</h3>
                 </div>
                 <div className="grid md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-foreground/40 uppercase">Order Protocol</label>
                       <input type="number" placeholder="0" className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5" value={newMilestone.order} onChange={e => setNewMilestone({...newMilestone, order: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-foreground/40 uppercase">Chronology Year</label>
                       <input type="text" placeholder="e.g. 2026" className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5" value={newMilestone.year} onChange={e => setNewMilestone({...newMilestone, year: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-foreground/40 uppercase">Identity Title</label>
                       <input type="text" placeholder="Title (Optional)" className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/5" value={newMilestone.title} onChange={e => setNewMilestone({...newMilestone, title: e.target.value})} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-foreground/40 uppercase">Narrative Parameter</label>
                    <textarea placeholder="Describe the milestone..." className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl text-sm font-medium italic h-32 focus:outline-none focus:ring-4 focus:ring-primary/5" value={newMilestone.description} onChange={e => setNewMilestone({...newMilestone, description: e.target.value})} />
                 </div>
                 <button type="button" onClick={handleAddMilestone} className="w-full py-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:bg-black transition-all active:scale-95">
                    Synchronize New Epoch
                 </button>
              </div>
            </div>
          )}

          {/* DESIGN PROTOCOLS */}
          {activeSection === 'design' && (
            <form onSubmit={handleSavePage} className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Settings className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Design Protocols</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-10 bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10">
                 <div className="flex items-center justify-between p-6 bg-white border border-primary/10 rounded-3xl">
                    <span className="text-[11px] font-black uppercase tracking-widest text-foreground/60">Timeline Visual Protocol</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.show_timeline_style === true || formData.show_timeline_style === 'true'}
                        onChange={(e) => handleChange('show_timeline_style', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-primary/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                 </div>
                 <div className="flex items-center justify-between p-6 bg-white border border-primary/10 rounded-3xl">
                    <span className="text-[11px] font-black uppercase tracking-widest text-foreground/60">Year Highlight Protocol</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.show_year_highlight === true || formData.show_year_highlight === 'true'}
                        onChange={(e) => handleChange('show_year_highlight', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-primary/10 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                 </div>
              </div>
              <button type="submit" disabled={saving} className="w-full py-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">
                 {saving ? 'Syncing...' : 'Save Design Protocols'}
              </button>
            </form>
          )}

          {/* CTA SECTION */}
          {activeSection === 'cta' && (
            <form onSubmit={handleSavePage} className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Target className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Action Gateway</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Gateway Header" field="cta_title" />
                <Field label="Gateway Narrative" field="cta_description" type="textarea" />
              </div>
              <div className="grid md:grid-cols-2 gap-8 p-10 bg-primary/5 rounded-[2.5rem] border border-primary/10">
                 <Field label="Action Button Text" field="button_text" />
                 <Field label="Action Button Link" field="button_link" />
              </div>
              <button type="submit" disabled={saving} className="w-full py-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">
                 {saving ? 'Syncing...' : 'Save Gateway Protocol'}
              </button>
            </form>
          )}

          {/* SEO SECTION */}
          {activeSection === 'seo' && (
            <form onSubmit={handleSavePage} className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Search className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Global SEO</h2>
              </div>
              <div className="space-y-8">
                <Field label="Search Title Meta" field="meta_title" />
                <Field label="Crawler Keywords" field="meta_keywords" placeholder="keyword1, keyword2" />
                <Field label="Search Snippet Narrative" field="meta_description" type="textarea" />
              </div>
              
              <div className="pt-10 border-t border-primary/5">
                 <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 mb-4">Institutional Visibility Status</label>
                 <div className="flex items-center gap-4">
                    {['Active', 'Inactive'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleChange('status', status)}
                        className={cn(
                          "px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                          formData.status === status 
                            ? "bg-primary text-white border-primary shadow-xl shadow-primary/20" 
                            : "bg-white/40 text-foreground/40 border-primary/10 hover:border-primary/40"
                        )}
                      >
                        {status} Protocol
                      </button>
                    ))}
                 </div>
              </div>
              <button type="submit" disabled={saving} className="w-full py-6 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all mt-10">
                 {saving ? 'Syncing...' : 'Save SEO Protocol'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
