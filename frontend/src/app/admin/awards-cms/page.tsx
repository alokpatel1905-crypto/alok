'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  Trophy, 
  ExternalLink, 
  Save, 
  Info, 
  GraduationCap, 
  School, 
  Users, 
  Sparkles, 
  Zap, 
  RotateCcw, 
  CheckCircle2, 
  ChevronRight,
  Search,
  Layout,
  MousePointer2,
  ListChecks,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ManageAwardsPage() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/awards-page');
      if (data) setFormData(data);
    } catch (e: any) {
      console.error(e);
      setMessage('Note: Could not load configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/awards-page/update', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setMessage('✅ Awards page configuration saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert('Failed to save: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const Field = ({ label, field, type = 'text', placeholder = '' }: any) => (
    <div className="space-y-2 group">
      <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-sun transition-colors">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-4 bg-sun/5 border border-sun/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sun/5 focus:border-sun/30 transition-all text-sm font-medium min-h-[140px] italic placeholder:text-foreground/20"
        />
      ) : (
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-5 py-4 bg-sun/5 border border-sun/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sun/5 focus:border-sun/30 transition-all text-sm font-bold placeholder:text-foreground/20"
        />
      )}
    </div>
  );

  const AwardBlock = ({ prefix, title, icon: Icon }: { prefix: string; title: string; icon: any }) => (
    <div className="bg-white/60 backdrop-blur-xl border border-sun/10 rounded-[2.5rem] p-10 space-y-8 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-3 border-b border-sun/5 pb-6">
        <Icon className="text-sun" size={24} />
        <h2 className="text-2xl font-black text-foreground tracking-tighter">{title}</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Field label="Protocol Title" field={`${prefix}_title`} />
        <Field label="Sub-Header" field={`${prefix}_subtitle`} />
      </div>
      <Field label="Mission Parameters" field={`${prefix}_description`} type="textarea" />
      
      <div className="grid md:grid-cols-2 gap-8 p-8 bg-sun/5 border border-sun/10 rounded-[2rem]">
        <div className="space-y-6">
          <Field label="Primary Action Text" field={`${prefix}_button_1_text`} />
          <Field label="Primary Action Link" field={`${prefix}_button_1_link`} />
        </div>
        <div className="space-y-6">
          <Field label="Secondary Action Text" field={`${prefix}_button_2_text`} />
          <Field label="Secondary Action Link" field={`${prefix}_button_2_link`} />
        </div>
      </div>
      
      <Field label="Visual Asset URL (Logo/Img)" field={`${prefix}_image`} placeholder="https://" />
    </div>
  );

  const sections = [
    { id: 'intro', label: 'Genesis Intro', icon: Info },
    { id: 'school', label: 'Green School', icon: School },
    { id: 'university', label: 'Green University', icon: Trophy },
    { id: 'teacher', label: 'Green Teacher', icon: Users },
    { id: 'graduate', label: 'Green Graduate', icon: GraduationCap },
    { id: 'innovator', label: 'Green Innovator', icon: Zap },
    { id: 'process', label: 'Awards Process', icon: ListChecks },
    { id: 'seo', label: 'Global SEO', icon: Search },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-sun/10 border-t-sun rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Harvesting Recognition Data...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <Trophy className="w-10 h-10 text-sun" />
            Awards CMS Master
          </h1>
          <p className="text-foreground/60 font-medium italic">Orchestrating the global recognition protocols for sustainable excellence.</p>
        </div>
        <Link 
          href="/awards" 
          target="_blank" 
          className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-sun/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-sun transition-all shadow-sm group"
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
          <div className="sticky top-8 space-y-2 bg-white/60 backdrop-blur-xl border border-sun/10 rounded-[2.5rem] p-4 shadow-premium">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group",
                  activeSection === section.id 
                    ? "bg-sun text-white shadow-lg shadow-sun/20" 
                    : "hover:bg-sun/5 text-foreground/40 hover:text-sun"
                )}
              >
                <div className="flex items-center gap-3">
                  <section.icon size={18} className={cn("transition-colors", activeSection === section.id ? "text-white" : "text-sun/60")} />
                  <span className="text-[11px] font-black uppercase tracking-widest">{section.label}</span>
                </div>
                <ChevronRight size={14} className={cn("transition-transform", activeSection === section.id ? "translate-x-1" : "opacity-0")} />
              </button>
            ))}
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSave} className="lg:col-span-3 space-y-8">
          
          {/* INTRO SECTION */}
          {activeSection === 'intro' && (
            <div className="bg-white/60 backdrop-blur-xl border border-sun/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-sun/5 pb-6">
                <Layout className="text-sun" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Genesis Intro</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Manifesto Title" field="page_title" />
                <Field label="Manifesto Subtitle" field="subtitle" />
              </div>
              <Field label="Intro Narrative" field="intro_description" type="textarea" />
            </div>
          )}

          {/* AWARD PROGRAMS */}
          {activeSection === 'school' && <AwardBlock prefix="school" title="Green School Award" icon={School} />}
          {activeSection === 'university' && <AwardBlock prefix="university" title="Green University Award" icon={Trophy} />}
          {activeSection === 'teacher' && <AwardBlock prefix="teacher" title="Green Teacher Award" icon={Users} />}
          {activeSection === 'graduate' && <AwardBlock prefix="graduate" title="Green Graduate Award" icon={GraduationCap} />}
          {activeSection === 'innovator' && <AwardBlock prefix="innovator" title="Green Innovator Award" icon={Zap} />}

          {/* PROCESS SECTION */}
          {activeSection === 'process' && (
            <div className="bg-white/60 backdrop-blur-xl border border-sun/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-sun/5 pb-6">
                <ListChecks className="text-sun" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter">Awards Process</h2>
              </div>
              <Field label="Protocol Header" field="process_title" />
              <div className="grid md:grid-cols-2 gap-8 mt-10">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-8 bg-sun/5 border border-sun/10 rounded-[2rem] space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-sun/40">Phase 0{num}</span>
                    <Field label={`Step ${num} Label`} field={`step${num}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEO SECTION */}
          {activeSection === 'seo' && (
            <div className="bg-white/60 backdrop-blur-xl border border-sun/10 rounded-[2.5rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-3 border-b border-sun/5 pb-6">
                <Search className="text-sun" size={24} />
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
              className="w-full flex items-center justify-center gap-3 py-6 bg-sun text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-sun/30 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale group"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={18} className="group-hover:rotate-12 transition-transform" />
                  Synchronize Awards Protocol
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
