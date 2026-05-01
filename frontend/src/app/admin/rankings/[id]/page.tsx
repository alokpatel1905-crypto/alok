'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Trophy, 
  ArrowLeft, 
  Save, 
  School, 
  Hash, 
  Calendar, 
  Activity,
  Layers,
  CheckCircle2,
  AlertCircle,
  RefreshCcw
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function EditRankingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [form, setForm] = useState({
    category: '',
    rank: '',
    year: '',
    score: '',
    institutionId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instRes, rankingRes] = await Promise.all([
          apiFetch('/institutions'),
          apiFetch(`/rankings/${id}`)
        ]);
        
        setInstitutions(instRes.data || []);
        setForm({
          category: rankingRes.category,
          rank: rankingRes.rank.toString(),
          year: rankingRes.year.toString(),
          score: rankingRes.score?.toString() || '',
          institutionId: rankingRes.institutionId,
        });
      } catch (err: any) {
        setError(err.message || 'Failed to load ranking details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await apiFetch(`/rankings/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...form,
          rank: +form.rank,
          year: +form.year,
          score: form.score ? +form.score : undefined,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/rankings');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update ranking record');
      setSaving(false);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Loading Record Details...</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/admin/rankings" 
            className="flex items-center gap-2 text-primary font-bold text-sm hover:translate-x-[-4px] transition-transform w-fit"
          >
            <ArrowLeft size={16} />
            Back to Leaderboard
          </Link>
          <h1 className="text-3xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <Trophy className="w-8 h-8 text-sun" />
            Update Ranking
          </h1>
          <p className="text-foreground/60 text-sm font-medium">Modifying institutional achievement record for {form.category}.</p>
        </div>
      </div>

      {error && (
        <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] flex flex-col items-center gap-6 text-red-600 text-center animate-shake">
          <AlertCircle size={48} />
          <div>
            <h3 className="text-lg font-black tracking-tight">Sync Failure</h3>
            <p className="text-sm font-medium opacity-80 mt-1">{error}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest"
          >
            <RefreshCcw size={14} />
            Try Refreshing
          </button>
        </div>
      )}

      {success && (
        <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-3xl flex flex-col items-center gap-4 text-emerald-600 text-center shadow-xl shadow-emerald-500/10 animate-bounce-subtle">
          <CheckCircle2 size={48} className="animate-in zoom-in duration-500" />
          <div>
            <h3 className="text-xl font-black tracking-tight">Changes Applied!</h3>
            <p className="text-sm font-medium opacity-80 mt-1">Returning to your leaderboard...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={cn(
        "bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium p-10 space-y-10 transition-all",
        (success || error) && "opacity-20 scale-95 pointer-events-none grayscale"
      )}>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Category */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Layers size={14} />
              Achievement Category
            </label>
            <div className="relative">
              <input 
                name="category" 
                required 
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Greenest University 2024"
                className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
          </div>

          {/* Institution Select */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <School size={14} />
              Target Institution
            </label>
            <div className="relative">
              <select 
                name="institutionId" 
                required
                value={form.institutionId}
                onChange={handleChange}
                className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold appearance-none cursor-pointer"
              >
                <option value="">Select an institution</option>
                {institutions.map((inst: any) => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30">
                <School size={16} />
              </div>
            </div>
          </div>

          {/* Rank Position */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Hash size={14} />
              Global Rank Position
            </label>
            <div className="relative">
              <input 
                name="rank" 
                type="number"
                required 
                min="1"
                value={form.rank}
                onChange={handleChange}
                placeholder="1"
                className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold"
              />
            </div>
          </div>

          {/* Year Cycle */}
          <div className="space-y-3 group">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Calendar size={14} />
              Evaluation Year
            </label>
            <div className="relative">
              <input 
                name="year" 
                type="number"
                required 
                min="2000"
                max="2100"
                value={form.year}
                onChange={handleChange}
                className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold"
              />
            </div>
          </div>

          {/* Impact Score */}
          <div className="space-y-3 group md:col-span-2">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-foreground/40 group-focus-within:text-primary transition-colors">
              <Activity size={14} />
              Impact Score (0-100)
            </label>
            <div className="relative">
              <input 
                name="score" 
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={form.score}
                onChange={handleChange}
                placeholder="Optional score (e.g. 98.5)"
                className="w-full bg-white/80 border border-primary/10 rounded-2xl py-4 px-5 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-primary/5 flex items-center justify-end gap-4">
          <Link 
            href="/admin/rankings"
            className="px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest text-foreground/40 hover:text-foreground/60 transition-all active:scale-95"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 disabled:opacity-50 disabled:grayscale disabled:scale-100"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : <Save size={18} />}
            {saving ? 'Saving...' : 'Update Record'}
          </button>
        </div>
      </form>
    </div>
  );
}
