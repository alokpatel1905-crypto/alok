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
  CheckCircle2,
  Globe,
  Layers,
  Zap,
  Target
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
      setMessage('✅ Home page configuration synchronized successfully!');
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

  const sections = [
    { id: 'hero', label: 'Hero Narrative', icon: Layout, color: 'text-primary' },
    { id: 'about', label: 'Genesis Story', icon: Info, color: 'text-[#7CB87A]' },
    { id: 'stats', label: 'Impact Pulse', icon: BarChart3, color: 'text-primary' },
    { id: 'programs', label: 'Strategic Programs', icon: Briefcase, color: 'text-primary' },
    { id: 'framework', label: 'Five Elements', icon: Wind, color: 'text-primary' },
    { id: 'events', label: 'Active Events', icon: Calendar, color: 'text-primary' },
    { id: 'seo', label: 'Global SEO', icon: Search, color: 'text-primary' },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-black uppercase tracking-widest text-foreground/40 animate-pulse">Accessing Home CMS Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/40 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-10 shadow-premium">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
             </div>
             <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">Home CMS Master</h1>
          </div>
          <p className="text-foreground/40 font-medium italic pl-1">Orchestrating the global entry point for the Green Mentors platform.</p>
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
          
          {/* HERO SECTION */}
          {activeSection === 'hero' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Layout className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Hero Narrative</h2>
              </div>
              <div className="space-y-8">
                <Field label="Manifesto Title" field="hero_title" placeholder="Transforming Education for a Sustainable Future" />
                <Field label="Subtitle Protocol" field="hero_subtitle" placeholder="Empowering Schools..." />
                <Field label="Executive Description" field="hero_description" type="textarea" />
                <div className="grid md:grid-cols-2 gap-8 p-10 bg-primary/5 border border-primary/10 rounded-[2.5rem]">
                  <div className="space-y-6">
                    <Field label="Primary Action Text" field="hero_button_1_text" />
                    <Field label="Primary Action Link" field="hero_button_1_link" />
                  </div>
                  <div className="space-y-6">
                    <Field label="Secondary Action Text" field="hero_button_2_text" />
                    <Field label="Secondary Action Link" field="hero_button_2_link" />
                  </div>
                </div>
                <Field label="Atmospheric Media URL" field="hero_image_url" placeholder="https://" />
              </div>
            </div>
          )}

          {/* ABOUT SECTION */}
          {activeSection === 'about' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Info className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Genesis Story</h2>
              </div>
              <div className="space-y-8">
                <Field label="Story Identity" field="about_title" placeholder="About Green Mentors" />
                <Field label="Story Narrative" field="about_description" type="textarea" />
                <div className="grid md:grid-cols-2 gap-8 p-10 bg-primary/5 border border-primary/10 rounded-[2.5rem]">
                  <Field label="Discovery Action Text" field="about_button_text" />
                  <Field label="Discovery Action Link" field="about_button_link" />
                </div>
              </div>
            </div>
          )}

          {/* STATS SECTION */}
          {activeSection === 'stats' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <BarChart3 className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Impact Pulse</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Metric 0{num}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7CB87A]" />
                    </div>
                    <Field label="Metric Title" field={`stat_${num}_title`} />
                    <Field label="Metric Magnitude" field={`stat_${num}_value`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROGRAMS SECTION */}
          {activeSection === 'programs' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Briefcase className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Strategic Programs</h2>
              </div>
              <Field label="Global Programs Header" field="programs_title" />
              <div className="space-y-8 mt-10">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-10 bg-primary/5 border border-primary/10 rounded-[2.5rem] space-y-6">
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">Protocol 0{num}</h3>
                    <Field label="Program Title" field={`program_${num}_title`} />
                    <Field label="Mission Parameters" field={`program_${num}_desc`} type="textarea" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FRAMEWORK SECTION */}
          {activeSection === 'framework' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Wind className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Five Elements</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {['Soil', 'Water', 'Air', 'Energy', 'Spaces'].map((elem) => (
                  <div key={elem} className="p-8 bg-primary/5 border border-primary/10 rounded-[2.5rem] space-y-6">
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-widest">{elem} Protocol</h3>
                    <Field label="Element Header" field={`element_${elem.toLowerCase()}_title`} />
                    <Field label="Element Methodology" field={`element_${elem.toLowerCase()}_desc`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVENTS SECTION */}
          {activeSection === 'events' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Calendar className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Active Events</h2>
              </div>
              <div className="space-y-8">
                <Field label="Events Header" field="events_title" />
                <Field label="Events Narrative" field="events_description" type="textarea" />
                <div className="grid md:grid-cols-2 gap-8 p-10 bg-primary/5 border border-primary/10 rounded-[2.5rem]">
                  <Field label="Action Gateway Text" field="events_button_text" />
                  <Field label="Action Gateway Link" field="events_button_link" />
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
                  Synchronize Home Protocol
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
