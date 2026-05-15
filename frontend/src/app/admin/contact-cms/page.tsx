'use client';

import React, { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { 
  MessageSquare, 
  Save, 
  ExternalLink, 
  Eye, 
  Plus, 
  Trash2, 
  Mail, 
  Phone, 
  MapPin, 
  Share2, 
  HelpCircle, 
  Target, 
  ArrowRight, 
  Search,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Layout,
  Star,
  Zap,
  Lightbulb,
  Globe,
  Users,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const EXAMPLE_DATA = {
  page_title: 'Contact Us',
  subtitle: 'Let\'s Connect for Sustainable Education',
  intro_description: 'Green Mentors welcomes inquiries from institutions, educators, partners, media, and supporters working toward sustainability and responsible education systems worldwide.',
  form_title: 'Send Us a Message',
  show_name: true,
  show_email: true,
  show_phone: false,
  show_organization: false,
  show_subject: true,
  show_message: true,
  button_text: 'Submit Inquiry',
  success_message: 'Thank you for contacting Green Mentors. Our team will respond shortly.',
  email_general: 'hello@greenmentors.org',
  email_partnership: 'partnerships@greenmentors.org',
  email_media: 'media@greenmentors.org',
  email_events: 'events@greenmentors.org',
  phone: '+91-XXXXXXXXXX',
  address: 'Global initiative with presence across multiple countries, with roots in India.',
  response_time: 'We aim to respond within 2–3 business days.',
  facebook: 'https://facebook.com/greenmentors',
  linkedin: 'https://linkedin.com/company/greenmentors',
  twitter: 'https://twitter.com/greenmentors',
  instagram: 'https://instagram.com/greenmentors',
  who_title: 'Who Can Reach Out',
  who_description: '- Schools and Universities for accreditation and rankings\n- Educators for programs and recognition\n- Media for interviews and coverage\n- Partners and sponsors for collaboration\n- Students and graduates for participation',
  global_title: 'A Global Mission',
  global_description: 'Green Mentors operates across multiple countries and territories, connecting institutions, educators, and leaders worldwide to drive sustainability in education.',
  faq_q1: 'How long does it take to get a response?',
  faq_a1: 'We typically respond within 2–3 business days.',
  faq_q2: 'Can institutions request partnerships?',
  faq_a2: 'Yes, institutions can contact us for collaboration and partnership opportunities.',
  cta_title: 'Start the Conversation',
  cta_description: 'Connect with Green Mentors and explore collaboration for sustainability-led education.',
  cta_button_text: 'Send Inquiry',
  cta_button_link: '/contact',
  meta_title: 'Contact Green Mentors | Sustainability in Education',
  meta_keywords: 'contact green mentors, education partnership contact, sustainability inquiry',
  meta_description: 'Contact Green Mentors for partnerships, accreditation, events, and sustainability-led education initiatives.',
  status: 'Active',
};

export default function ManageContactPage() {
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
      const data = await apiFetch('/contact-page');
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
      await apiFetch('/contact-page/update', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      setMessage('✅ Contact protocols synchronized successfully!');
      setTimeout(() => setMessage(''), 3000);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const loadExample = () => {
    setFormData(EXAMPLE_DATA);
    setMessage('📋 Example protocols loaded! Review and synchronize to apply.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const ToggleField = ({ label, field }: { label: string; field: string }) => (
    <div className="flex items-center justify-between p-4 bg-white/40 border border-primary/5 rounded-2xl hover:border-primary/20 transition-all group">
      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60 group-hover:text-primary transition-colors">{label}</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={formData[field] ?? true}
          onChange={(e) => handleChange(field, e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-12 h-6 bg-primary/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-primary/10 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
      </label>
    </div>
  );

  const sections = [
    { id: 'intro', label: 'Genesis Intro', icon: Layout },
    { id: 'form', label: 'Form Controls', icon: Settings },
    { id: 'details', label: 'Contact Matrix', icon: Mail },
    { id: 'social', label: 'Network Links', icon: Share2 },
    { id: 'who', label: 'Target Audience', icon: Users },
    { id: 'presence', label: 'Global Presence', icon: Globe },
    { id: 'faq', label: 'Knowledge Base', icon: HelpCircle },
    { id: 'cta', label: 'Action Gateway', icon: Target },
    { id: 'seo', label: 'Global SEO', icon: Search },
  ];

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-black uppercase tracking-widest text-foreground/40 animate-pulse">Syncing Contact Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white/40 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-10 shadow-premium">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
             </div>
             <h1 className="text-4xl font-display font-black text-foreground tracking-tighter uppercase">Contact CMS Master</h1>
          </div>
          <p className="text-foreground/40 font-medium italic pl-1">Configuring the global contact matrix, form dynamics, and institutional engagement protocols.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/contact" 
            target="_blank" 
            className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group"
          >
            <Eye size={16} className="group-hover:scale-110 transition-transform" />
            Live Preview
          </Link>
          <button 
            type="button" 
            onClick={loadExample} 
            className="flex items-center gap-3 bg-primary/5 border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-all group"
          >
            <Lightbulb size={16} className="group-hover:rotate-12 transition-transform" />
            Load Example
          </button>
        </div>
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

          {/* FORM CONTROLS */}
          {activeSection === 'form' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Settings className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Form Dynamics</h2>
              </div>
              <Field label="Form Identity Title" field="form_title" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10">
                 <ToggleField label="Show Name Field" field="show_name" />
                 <ToggleField label="Show Email Field" field="show_email" />
                 <ToggleField label="Show Phone Field" field="show_phone" />
                 <ToggleField label="Show Organization" field="show_organization" />
                 <ToggleField label="Show Subject" field="show_subject" />
                 <ToggleField label="Show Message" field="show_message" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                 <Field label="Action Button Text" field="button_text" />
              </div>
              <Field label="Transmission Success Narrative" field="success_message" type="textarea" />
            </div>
          )}

          {/* CONTACT MATRIX */}
          {activeSection === 'details' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Mail className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Contact Matrix</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10">
                 <Field label="General Protocol Email" field="email_general" />
                 <Field label="Partnership Protocol Email" field="email_partnership" />
                 <Field label="Media Relations Email" field="email_media" />
                 <Field label="Events Coordination Email" field="email_events" />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                 <Field label="Institutional Phone" field="phone" />
                 <Field label="Protocol Response Time" field="response_time" />
              </div>
              <Field label="Global Office Address" field="address" type="textarea" />
            </div>
          )}

          {/* NETWORK LINKS */}
          {activeSection === 'social' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Share2 className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Network Links</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                 <Field label="Facebook Protocol" field="facebook" placeholder="https://" />
                 <Field label="LinkedIn Protocol" field="linkedin" placeholder="https://" />
                 <Field label="Twitter Protocol" field="twitter" placeholder="https://" />
                 <Field label="Instagram Protocol" field="instagram" placeholder="https://" />
              </div>
            </div>
          )}

          {/* WHO CAN CONTACT */}
          {activeSection === 'who' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Users className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Target Audience</h2>
              </div>
              <Field label="Manifesto Title" field="who_title" />
              <Field label="Inclusion Narrative" field="who_description" type="textarea" placeholder="Use hyphens for bullets..." />
            </div>
          )}

          {/* GLOBAL PRESENCE */}
          {activeSection === 'presence' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <Globe className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Global Presence</h2>
              </div>
              <Field label="Section Header" field="global_title" />
              <Field label="Presence Narrative" field="global_description" type="textarea" />
            </div>
          )}

          {/* FAQ SECTION */}
          {activeSection === 'faq' && (
            <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[3rem] p-12 space-y-10 shadow-premium animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="flex items-center gap-4 border-b border-primary/5 pb-8">
                <HelpCircle className="text-primary" size={24} />
                <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Knowledge Base</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 space-y-6">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Inquiry 01</span>
                   <Field label="Common Query" field="faq_q1" />
                   <Field label="Institutional Response" field="faq_a1" type="textarea" />
                </div>
                <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10 space-y-6">
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Inquiry 02</span>
                   <Field label="Common Query" field="faq_q2" />
                   <Field label="Institutional Response" field="faq_a2" type="textarea" />
                </div>
              </div>
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
                 <Field label="Gateway Link Text" field="cta_button_text" />
                 <Field label="Gateway Link URL" field="cta_button_link" />
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
                  Synchronize Contact Protocol
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
