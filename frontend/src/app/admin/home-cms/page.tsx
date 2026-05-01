'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  ExternalLink, 
  Image as ImageIcon, 
  Save, 
  Layout, 
  Info, 
  BarChart3, 
  Briefcase, 
  HelpCircle, 
  Wind, 
  Calendar, 
  MessageSquare, 
  Rocket, 
  Search, 
  Eye, 
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ManageHomeCMSPage() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/home-page');
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
      await apiFetch('/home-page', {
        method: 'PATCH',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Home page configuration saved successfully!');
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
          className="w-full px-5 py-4 bg-primary/5 border border-primary/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-sm font-medium min-h-[120px] italic placeholder:text-foreground/20"
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
    { id: 'hero', label: 'Hero Narrative', icon: Layout, color: 'text-primary' },
    { id: 'about', label: 'Genesis Story', icon: Info, color: 'text-emerald-500' },
    { id: 'stats', label: 'Impact Pulse', icon: BarChart3, color: 'text-sun' },
    { id: 'programs', label: 'Strategic Programs', icon: Briefcase, color: 'text-purple-500' },
    { id: 'framework', label: 'Five Elements', icon: Wind, color: 'text-water' },
    { id: 'events', label: 'Active Events', icon: Calendar, color: 'text-cyan-500' },
    { id: 'seo', label: 'Global SEO', icon: Search, color: 'text-indigo-500' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Accessing CMS Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <Sparkles className="w-10 h-10 text-sun" />
            Home CMS Master
          </h1>
          <p className="text-foreground/60 font-medium italic">Orchestrating the first impression of the global sustainability movement.</p>
        </div>
        <Link 
          href="/" 
          target="_blank" 
          className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group"
        >
          <Eye size={16} className="group-hover:scale-110 transition-transform" />
          Live Preview
        </Link>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-600 animate-in zoom-in-95 duration-300">
          <CheckCircle2 size={20} />
          <p className="text-sm font-bold">{message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sticky Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-2 bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-4 shadow-premium">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group",
                  activeSection === section.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "hover:bg-primary/5 text-foreground/40 hover:text-primary"
                )}
              >
                <div className="flex items-center gap-3">
                  <section.icon size={18} className={cn("transition-colors", activeSection === section.id ? "text-white" : section.color)} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{section.label}</span>
                </div>
                <ChevronRight size={14} className={cn("transition-transform", activeSection === section.id ? "translate-x-1" : "opacity-0")} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="lg:col-span-3 space-y-8">
          
          {/* HERO SECTION */}
          {activeSection === 'hero' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <Layout className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Hero Narrative</h2>
              </div>
              <div className="space-y-8">
                <Field label="Main Title" field="hero_title" placeholder="Transforming Education for a Sustainable Future" />
                <Field label="Sub-Header" field="hero_subtitle" placeholder="Empowering Schools..." />
                <Field label="Executive Summary" field="hero_description" type="textarea" />
                <div className="grid md:grid-cols-2 gap-8 p-8 bg-primary/5 border border-primary/5 rounded-[2rem]">
                  <Field label="Primary Action Text" field="hero_button_1_text" />
                  <Field label="Primary Action Link" field="hero_button_1_link" />
                  <Field label="Secondary Action Text" field="hero_button_2_text" />
                  <Field label="Secondary Action Link" field="hero_button_2_link" />
                </div>
                <Field label="Atmospheric Media URL (Img/Vid)" field="hero_image_url" placeholder="https://" />
              </div>
            </div>
          )}

          {/* ABOUT SECTION */}
          {activeSection === 'about' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <Info className="text-emerald-500" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Genesis Story</h2>
              </div>
              <div className="space-y-8">
                <Field label="Story Title" field="about_title" placeholder="About Green Mentors" />
                <Field label="Story Narrative" field="about_description" type="textarea" />
                <div className="grid md:grid-cols-2 gap-8 p-8 bg-emerald-500/5 border border-emerald-500/5 rounded-[2rem]">
                  <Field label="Discovery Link Text" field="about_button_text" />
                  <Field label="Discovery Link URL" field="about_button_link" />
                </div>
              </div>
            </div>
          )}

          {/* STATS SECTION */}
          {activeSection === 'stats' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <BarChart3 className="text-sun" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Impact Pulse</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-8 bg-sun/5 border border-sun/10 rounded-[2rem] space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-sun font-black text-xs shadow-sm">
                        {num}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-sun/60">Metric {num}</span>
                    </div>
                    <Field label="Metric Title" field={`stat_${num}_title`} />
                    <Field label="Metric Value" field={`stat_${num}_value`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROGRAMS SECTION */}
          {activeSection === 'programs' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <Briefcase className="text-purple-500" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Strategic Programs</h2>
              </div>
              <Field label="Master Header" field="programs_title" />
              <div className="space-y-8 mt-10">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-8 bg-purple-500/5 border border-purple-500/10 rounded-[2rem] space-y-6 group">
                    <h3 className="text-sm font-black text-purple-500 uppercase tracking-widest">Program Protocol {num}</h3>
                    <Field label="Title" field={`program_${num}_title`} />
                    <Field label="Mission Parameters" field={`program_${num}_desc`} type="textarea" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FRAMEWORK SECTION */}
          {activeSection === 'framework' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <Wind className="text-water" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Five Elements</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {['Soil', 'Water', 'Air', 'Energy', 'Spaces'].map((elem) => (
                  <div key={elem} className="p-8 bg-water/5 border border-water/10 rounded-[2rem] space-y-6">
                    <h3 className="text-sm font-black text-water uppercase tracking-widest">{elem}</h3>
                    <Field label="Element Label" field={`element_${elem.toLowerCase()}_title`} />
                    <Field label="Element Insight" field={`element_${elem.toLowerCase()}_desc`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS SECTION */}
          {activeSection === 'events' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <Calendar className="text-cyan-500" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Active Events</h2>
              </div>
              <Field label="Banner Title" field="events_title" />
              <Field label="Banner Insight" field="events_description" type="textarea" />
              <div className="grid md:grid-cols-2 gap-8 p-8 bg-cyan-500/5 border border-cyan-500/10 rounded-[2rem]">
                <Field label="Call-to-Action Text" field="events_button_text" />
                <Field label="Call-to-Action Link" field="events_button_link" />
              </div>
            </div>
          )}

          {/* SEO SECTION */}
          {activeSection === 'seo' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
                <Search className="text-indigo-500" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Global SEO</h2>
              </div>
              <div className="space-y-8">
                <Field label="Search Title Meta" field="meta_title" />
                <Field label="Crawler Keywords" field="meta_keywords" placeholder="keyword1, keyword2" />
                <Field label="Search Snippet" field="meta_description" type="textarea" />
              </div>
            </div>
          )}

          {/* Sticky Action Footer */}
          <div className="sticky bottom-8 z-10">
            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-3 py-6 bg-primary text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale group"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} className="group-hover:rotate-12 transition-transform" />
                  Synchronize Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
