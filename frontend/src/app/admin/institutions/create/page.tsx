'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  School, 
  ArrowLeft, 
  Save, 
  Type, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Building2, 
  AlignLeft, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function CreateInstitutionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    type: 'SCHOOL',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    website: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await apiFetch('/institutions', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/institutions');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to onboard institution');
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/admin/institutions" 
            className="flex items-center gap-2 text-primary font-bold text-xs hover:translate-x-[-4px] transition-transform w-fit uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            Back to Partners
          </Link>
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <School className="w-10 h-10 text-primary" />
            Partner Registration
          </h1>
          <p className="text-foreground/60 text-sm font-medium italic">Enlist a new academic entity into the global sustainability network.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-shake">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex flex-col items-center gap-4 text-emerald-600 text-center shadow-xl shadow-emerald-500/10 animate-bounce-subtle">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-black tracking-tighter">Entity Onboarded!</h3>
            <p className="text-sm font-medium opacity-80 mt-1 italic italic">Integrating partner identity into the global ledger...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={cn(
        "bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium p-12 space-y-12 transition-all",
        success && "opacity-20 scale-95 pointer-events-none grayscale"
      )}>
        {/* Core Identity */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
            <Sparkles className="text-sun" size={20} />
            <h2 className="text-xl font-black text-foreground tracking-tight">Core Identity</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <Type size={12} />
                Institutional Name
              </label>
              <input 
                name="name" 
                required 
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Green Valley International"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <Building2 size={12} />
                Entity Classification
              </label>
              <div className="relative">
                <select 
                  name="type" 
                  required
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-black uppercase tracking-widest appearance-none cursor-pointer"
                >
                  <option value="SCHOOL">School</option>
                  <option value="COLLEGE">College</option>
                  <option value="UNIVERSITY">University</option>
                  <option value="ORGANIZATION">Organization</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/20">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Access */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
            <Globe className="text-water" size={20} />
            <h2 className="text-xl font-black text-foreground tracking-tight">Global Access</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <Mail size={12} />
                Institutional Email
              </label>
              <input 
                name="email" 
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="registrar@entity.edu"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <LinkIcon size={12} />
                Official Website
              </label>
              <input 
                name="website" 
                value={form.website}
                onChange={handleChange}
                placeholder="https://entity.edu"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <Phone size={12} />
                Contact Frequency
              </label>
              <input 
                name="phone" 
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
          </div>
        </section>

        {/* Geographic Locale */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
            <MapPin className="text-primary" size={20} />
            <h2 className="text-xl font-black text-foreground tracking-tight">Geographic Locale</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <MapPin size={12} />
                City
              </label>
              <input 
                name="city" 
                value={form.city}
                onChange={handleChange}
                placeholder="e.g. London"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <MapPin size={12} />
                State / Province
              </label>
              <input 
                name="state" 
                value={form.state}
                onChange={handleChange}
                placeholder="e.g. Greater London"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
                <Globe size={12} />
                Country
              </label>
              <input 
                name="country" 
                value={form.country}
                onChange={handleChange}
                placeholder="e.g. United Kingdom"
                className="w-full bg-primary/5 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-primary/5 pb-6">
            <AlignLeft className="text-foreground/40" size={20} />
            <h2 className="text-xl font-black text-foreground tracking-tight">Vision & Mission</h2>
          </div>
          <div className="space-y-2 group">
            <label className="text-[10px] font-black text-foreground/40 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-primary transition-colors">
              <AlignLeft size={12} />
              Entity Narrative
            </label>
            <textarea 
              name="description" 
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the unique sustainability mission of this institution..."
              className="w-full bg-primary/5 border border-primary/10 rounded-[2rem] py-5 px-6 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-medium min-h-[150px] placeholder:text-foreground/20 italic"
            />
          </div>
        </section>

        {/* Form Footer */}
        <div className="pt-10 border-t border-primary/5 flex items-center justify-end gap-6">
          <Link 
            href="/admin/institutions"
            className="text-[10px] font-black uppercase tracking-widest text-foreground/30 hover:text-foreground/60 transition-all active:scale-95"
          >
            Discard Registration
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-12 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:grayscale"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : <Save size={18} />}
            {saving ? 'Validating...' : 'Register Entity'}
          </button>
        </div>
      </form>
    </div>
  );
}

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);