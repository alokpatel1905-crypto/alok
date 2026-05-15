'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  HeartHandshake, 
  Save, 
  ExternalLink, 
  Eye, 
  Plus, 
  Trash2, 
  Users, 
  Target, 
  ArrowRight, 
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Layout,
  Star,
  Zap,
  Quote,
  TrendingUp,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ManageSupportPage() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/support-page');
      if (data) setFormData(data);
    } catch (e: any) {
      console.error(e);
      setMessage("Note: Could not load configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/support-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Support protocols synchronized successfully!');
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

  const SupportBlock = ({ prefix, title, icon: Icon }: { prefix: string, title: string, icon: any }) => (
    <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
        <Icon className="text-primary" size={24} />
        <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">{title}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Field label="Support Identity" field={`${prefix}_title`} />
        <Field label="Subtitle Narrative" field={`${prefix}_subtitle`} />
      </div>
      <Field label="Support Methodology" field={`${prefix}_description`} type="textarea" />
      
      <div className="grid md:grid-cols-2 gap-8 p-10 bg-primary/5 border border-primary/10 rounded-[2.5rem]">
        <div className="space-y-6">
          <Field label="Action 01 Text" field={`${prefix}_button_1_text`} />
          <Field label="Action 01 Link" field={`${prefix}_button_1_link`} />
        </div>
        <div className="space-y-6">
          <Field label="Action 02 Text" field={`${prefix}_button_2_text`} />
          <Field label="Action 02 Link" field={`${prefix}_button_2_link`} />
        </div>
      </div>
      
      <Field label="Institutional Asset URL" field={`${prefix}_image`} placeholder="https://" />
    </div>
  );

  const sections = [
    { id: 'intro', label: 'Genesis Intro', icon: Layout },
    { id: 'partners', label: 'Partnerships', icon: HeartHandshake },
    { id: 'sponsors', label: 'Sponsorship', icon: Zap },
    { id: 'philanthropy', label: 'Philanthropy', icon: Globe },
    { id: 'advisory', label: 'Advisory Hub', icon: Users },
    { id: 'why', label: 'Manifesto', icon: Star },
    { id: 'impact', label: 'Support Impact', icon: TrendingUp },
    { id: 'process', label: 'Collaboration Flow', icon: ArrowRight },
    { id: 'quote', label: 'Testimonial', icon: Quote },
    { id: 'cta', label: 'Action Gateway', icon: Target },
    { id: 'seo', label: 'Global SEO', icon: Search },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-black uppercase tracking-widest text-foreground/40 animate-pulse">Syncing Support Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/40 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-10 shadow-premium">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-primary" />
             </div>
             <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">Support CMS Master</h1>
          </div>
          <p className="text-foreground/40 font-medium italic pl-1">Configuring the global support pathways and institutional collaboration protocols.</p>
        </div>
        <Link 
          href="/support" 
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
        <form onSubmit={handleSave} className="lg:col-span-3 space-y-10">
          
          {/* INTRO SECTION */}
          {activeSection === 'intro' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Layout className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Genesis Intro</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Protocol Title" field="page_title" />
                <Field label="Subtitle Narrative" field="subtitle" />
              </div>
              <Field label="Intro Methodology" field="intro_description" type="textarea" />
            </div>
          )}

          {/* SUPPORT BLOCKS */}
          {activeSection === 'partners' && <SupportBlock prefix="partnership" title="Institutional Partnerships" icon={HeartHandshake} />}
          {activeSection === 'sponsors' && <SupportBlock prefix="sponsorship" title="Sponsorship Opportunities" icon={Zap} />}
          {activeSection === 'philanthropy' && <SupportBlock prefix="philanthropy" title="Philanthropic Support" icon={Globe} />}
          {activeSection === 'advisory' && <SupportBlock prefix="advisory" title="Volunteer & Advisory Hub" icon={Users} />}

          {/* WHY SUPPORT */}
          {activeSection === 'why' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Star className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Manifesto</h2>
              </div>
              <Field label="Manifesto Header" field="why_title" />
              <Field label="Rationale Narrative" field="why_description" type="textarea" placeholder="Use hyphens for bullets..." />
            </div>
          )}

          {/* IMPACT */}
          {activeSection === 'impact' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <TrendingUp className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Impact Narrative</h2>
              </div>
              <Field label="Impact Header" field="impact_title" />
              <Field label="Impact Parameters" field="impact_description" type="textarea" placeholder="Use hyphens for bullets..." />
            </div>
          )}

          {/* PROCESS FLOW */}
          {activeSection === 'process' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <ArrowRight className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Collaboration Flow</h2>
              </div>
              <Field label="Process Protocol Title" field="process_title" />
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-8 bg-primary/5 border border-primary/10 rounded-[2rem] space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Phase 0{num}</span>
                    <Field label={`Step ${num} Parameter`} field={`step${num}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUOTE SECTION */}
          {activeSection === 'quote' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Quote className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Institutional Quote</h2>
              </div>
              <Field label="Quote Header" field="quote_title" />
              <Field label="Narrative Quote" field="quote_description" type="textarea" />
              <Field label="Attribution Identity" field="quote_author" />
            </div>
          )}

          {/* CTA SECTION */}
          {activeSection === 'cta' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Target className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Action Gateway</h2>
              </div>
              <Field label="Gateway Header" field="cta_title" />
              <Field label="Gateway Narrative" field="cta_description" type="textarea" />
              <div className="grid md:grid-cols-2 gap-8 p-10 bg-primary/5 border border-primary/10 rounded-[2.5rem]">
                <div className="space-y-6">
                  <Field label="Primary Action Text" field="button_text" />
                  <Field label="Primary Action Link" field="button_link" />
                </div>
                <div className="space-y-6">
                  <Field label="Secondary Action Text" field="secondary_button_text" />
                  <Field label="Secondary Action Link" field="secondary_button_link" />
                </div>
              </div>
            </div>
          )}

          {/* SEO SECTION */}
          {activeSection === 'seo' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
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
            </div>
          )}

          {/* Sticky Action Footer */}
          <div className="sticky bottom-8 z-10">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-4 py-7 bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-3xl shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale group"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} className="group-hover:rotate-12 transition-transform" />
                  Synchronize Support Protocol
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
