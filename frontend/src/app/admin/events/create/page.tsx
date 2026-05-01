'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CalendarDays, 
  ArrowLeft, 
  Save, 
  Type, 
  AlignLeft, 
  Clock, 
  MapPin, 
  Building, 
  Activity,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function CreateEventPage() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    status: 'UPCOMING',
    institutionId: '',
  });

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await apiFetch('/institutions');
        setInstitutions(res.data || []);
      } catch (err) {
        console.error('Error fetching institutions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInstitutions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await apiFetch('/events', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          institutionId: form.institutionId || undefined,
          endDate: form.endDate || undefined,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/events');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create event');
      setSaving(false);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic">Preparing Summit Builder...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/admin/events" 
            className="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-[-4px] transition-transform w-fit"
          >
            <ArrowLeft size={16} />
            Back to Timeline
          </Link>
          <h1 className="text-3xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-primary" />
            Schedule New Summit
          </h1>
          <p className="text-foreground/60 text-sm font-medium">Design an impactful gathering for the global sustainability network.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-shake">
          <AlertCircle size={20} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col items-center gap-4 text-emerald-600 text-center shadow-xl shadow-emerald-500/10 animate-bounce-subtle">
          <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
          <div>
            <h3 className="text-xl font-black tracking-tight">Event Scheduled!</h3>
            <p className="text-sm font-medium opacity-80 mt-1">Redirecting to your updated timeline...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={cn(
        "bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium p-10 space-y-10 transition-all",
        success && "opacity-20 scale-95 pointer-events-none grayscale"
      )}>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Title */}
          <div className="space-y-3 group md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Type size={14} />
              Summit Title
            </label>
            <input 
              name="title" 
              required 
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Annual Green Schools Conference 2024"
              className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
            />
          </div>
          
          {/* Description */}
          <div className="space-y-3 group md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <AlignLeft size={14} />
              Summit Overview
            </label>
            <textarea 
              name="description" 
              value={form.description}
              onChange={handleChange}
              placeholder="Provide a compelling narrative for this event..."
              className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-medium min-h-[120px] placeholder:text-foreground/20 italic"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Clock size={14} />
              Commencement Date & Time
            </label>
            <input 
              name="startDate" 
              type="datetime-local"
              required 
              value={form.startDate}
              onChange={handleChange}
              className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold"
            />
          </div>

          {/* End Date */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Clock size={14} />
              Conclusion (Optional)
            </label>
            <input 
              name="endDate" 
              type="datetime-local"
              value={form.endDate}
              onChange={handleChange}
              className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold"
            />
          </div>

          {/* Location */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <MapPin size={14} />
              Summit Venue / Digital Link
            </label>
            <input 
              name="location" 
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. New York Convention Center or Zoom Link"
              className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
            />
          </div>

          {/* Status */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Activity size={14} />
              Schedule Status
            </label>
            <select 
              name="status" 
              value={form.status}
              onChange={handleChange}
              className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold appearance-none cursor-pointer"
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Institution Select */}
          <div className="space-y-3 group md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Building size={14} />
              Host Institution
            </label>
            <div className="relative">
              <select 
                name="institutionId" 
                value={form.institutionId}
                onChange={handleChange}
                className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold appearance-none cursor-pointer"
              >
                <option value="">Global Network Summit (No specific host)</option>
                {institutions.map((inst: any) => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30">
                <Building size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-primary/5 flex items-center justify-end gap-4">
          <Link 
            href="/admin/events"
            className="px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-foreground/40 hover:text-foreground/60 transition-all active:scale-95"
          >
            Discard
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : <Save size={18} />}
            {saving ? 'Finalising...' : 'Schedule Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
