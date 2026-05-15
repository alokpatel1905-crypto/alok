'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  Info, 
  Save, 
  ExternalLink, 
  Eye, 
  Target, 
  Users, 
  History, 
  Compass, 
  Layers, 
  ArrowRight, 
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ManageAboutPage() {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('basic');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/about-page');
      if (data) setFormData(data);
    } catch (e: any) {
      console.error(e);
      setMessage("Note: Starting fresh. No existing data found.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setMessage('');
      await apiFetch('/about-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ About page updated successfully!');
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
    { id: 'basic', label: 'Genesis Content', icon: Info },
    { id: 'vision', label: 'Our Vision', icon: Target },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'history', label: 'Growth & History', icon: History },
    { id: 'approach', label: 'Our Approach', icon: Compass },
    { id: 'framework', label: 'Five Elements', icon: Layers },
    { id: 'seo', label: 'Global SEO', icon: Search },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-black uppercase tracking-widest text-foreground/40 animate-pulse">Syncing Narrative Protocols...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/40 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-10 shadow-premium">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-primary" />
             </div>
             <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">About CMS Master</h1>
          </div>
          <p className="text-foreground/40 font-medium italic pl-1">Orchestrating the institutional narrative and global mission parameters.</p>
        </div>
        <Link 
          href="/about" 
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
          
          {/* GENESIS CONTENT */}
          {activeSection === 'basic' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Info className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Genesis Content</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Section Identifier" field="section_name" />
                <Field label="Manifesto Title" field="page_title" />
              </div>
              <Field label="Short Narrative" field="short_subtitle" />
              <Field label="Main Institutional Description" field="main_description" type="textarea" />
              
              <div className="bg-primary/5 p-8 rounded-[2rem] space-y-8 border border-primary/10">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-primary">Visual Asset Configuration</h3>
                 <Field label="About Image URL" field="about_image" placeholder="https://" />
                 <div className="grid md:grid-cols-2 gap-8">
                    <Field label="Asset Alt Protocol" field="image_alt" />
                    <Field label="Institutional Caption" field="image_caption" />
                 </div>
              </div>
            </div>
          )}

          {/* VISION SECTION */}
          {activeSection === 'vision' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Target className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Our Vision</h2>
              </div>
              <Field label="Vision Protocol Title" field="vision_title" />
              <Field label="Vision Narrative" field="vision_description" type="textarea" />
            </div>
          )}

          {/* LEADERSHIP SECTION */}
          {activeSection === 'leadership' && (
            <div className="space-y-10">
              <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                  <Users className="text-primary" size={24} />
                  <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Institutional Leadership</h2>
                </div>
                <Field label="Leadership Header" field="leadership_title" />
                
                <div className="bg-primary/5 p-10 rounded-[2.5rem] space-y-8 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-primary">Founder Protocol Details</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <Field label="Founder Identity" field="founder_name" />
                    <Field label="Designation Protocol" field="founder_designation" />
                    <Field label="Founder Asset URL" field="founder_image" placeholder="https://" />
                    <Field label="Professional Network Link" field="founder_profile_link" placeholder="https://" />
                  </div>
                  <Field label="Founder Manifesto" field="founder_description" type="textarea" />
                </div>

                <div className="bg-primary/5 p-10 rounded-[2.5rem] space-y-8 border border-primary/10">
                  <div className="flex items-center gap-3 mb-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-primary">Strategic Partners</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <Field label="Partner 01 Identity" field="partner_1_name" />
                    <Field label="Partner 01 Asset URL" field="partner_1_link" placeholder="https://" />
                    <Field label="Partner 02 Identity" field="partner_2_name" />
                    <Field label="Partner 02 Asset URL" field="partner_2_link" placeholder="https://" />
                    <Field label="Partner 03 Identity" field="partner_3_name" />
                    <Field label="Partner 03 Asset URL" field="partner_3_link" placeholder="https://" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HISTORY SECTION */}
          {activeSection === 'history' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <History className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Growth & History</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <Field label="Genesis Year" field="founded_year" />
                <Field label="Global Footprint (Countries)" field="countries_count" />
              </div>
              <Field label="Growth Narrative" field="growth_description" type="textarea" />
              <Field label="Institutional Timeline Notes" field="history_notes" type="textarea" />
            </div>
          )}

          {/* APPROACH SECTION */}
          {activeSection === 'approach' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Compass className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Our Approach</h2>
              </div>
              <Field label="Approach Protocol Title" field="approach_title" />
              <Field label="Methodology Narrative" field="approach_description" type="textarea" />
            </div>
          )}

          {/* FRAMEWORK SECTION */}
          {activeSection === 'framework' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Layers className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Five Elements Framework</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="bg-amber-50/50 p-8 rounded-[2rem] border border-amber-200/40 space-y-6">
                   <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 font-black text-xs">01</div>
                   <Field label="Soil Element Protocol" field="soil_title" />
                   <Field label="Soil Methodology" field="soil_description" type="textarea" />
                </div>
                <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-200/40 space-y-6">
                   <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-black text-xs">02</div>
                   <Field label="Water Element Protocol" field="water_title" />
                   <Field label="Water Methodology" field="water_description" type="textarea" />
                </div>
                <div className="bg-cyan-50/50 p-8 rounded-[2rem] border border-cyan-200/40 space-y-6">
                   <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 font-black text-xs">03</div>
                   <Field label="Air Element Protocol" field="air_title" />
                   <Field label="Air Methodology" field="air_description" type="textarea" />
                </div>
                <div className="bg-yellow-50/50 p-8 rounded-[2rem] border border-yellow-200/40 space-y-6">
                   <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-600 font-black text-xs">04</div>
                   <Field label="Energy Element Protocol" field="energy_title" />
                   <Field label="Energy Methodology" field="energy_description" type="textarea" />
                </div>
                <div className="bg-green-50/50 p-8 rounded-[2rem] border border-green-200/40 space-y-6 md:col-span-2">
                   <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 font-black text-xs">05</div>
                   <Field label="Spaces Element Protocol" field="spaces_title" />
                   <Field label="Spaces Methodology" field="spaces_description" type="textarea" />
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
                  Synchronize About Protocol
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
