'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  School, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit2, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  RefreshCcw,
  MoreVertical,
  ChevronRight,
  Globe,
  Building2,
  Activity,
  ArrowUpRight,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';

export default function InstitutionsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInstitutions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiFetch('/institutions');
      setData(result);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm('Are you sure you want to delete this institution? This action cannot be undone.')) return;
      await apiFetch(`/institutions/${id}`, {
        method: 'DELETE',
      });
      fetchInstitutions();
    } catch (err: any) {
      console.error('Failed to delete institution:', err);
    }
  };

  const toggleActive = async (inst: any) => {
    try {
      await apiFetch(`/institutions/${inst.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ isActive: !inst.isActive }),
      });
      fetchInstitutions();
    } catch (err: any) {
      console.error('Failed to toggle institution status:', err);
    }
  };

  const filteredData = data?.data?.filter((inst: any) => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = data?.data?.filter((i: any) => i.isActive).length || 0;
  const globalReach = new Set(data?.data?.map((i: any) => i.country)).size || 0;

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic">Synchronizing Global Network...</p>
    </div>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white/60 backdrop-blur-xl border border-red-100 rounded-[2.5rem] shadow-premium max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-red-50 rounded-[2rem] flex items-center justify-center text-red-500 mb-8 border border-red-100">
          <RefreshCcw size={32} className="animate-spin-slow" />
        </div>
        <h2 className="text-2xl font-black text-foreground tracking-tighter mb-2">Protocol Interrupted</h2>
        <p className="text-foreground/60 max-w-md mb-10 font-medium italic">"{error}"</p>
        <button 
          onClick={() => fetchInstitutions()}
          className="flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
        >
          <Zap size={18} />
          Attempt Reconnection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <School className="w-10 h-10 text-primary" />
            Institutional Partners
          </h1>
          <p className="text-foreground/60 font-medium italic">Architecting the global ecosystem of sustainable academic entities.</p>
        </div>
        <Link 
          href="/admin/institutions/create"
          className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          Onboard Entity
        </Link>
      </div>

      {/* Analytics Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Network Entities', value: data?.data?.length || 0, icon: Building2, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Active Channels', value: activeCount, icon: Activity, color: 'text-flora', bg: 'bg-flora/10' },
          { label: 'Global Reach', value: `${globalReach} Nations`, icon: Globe, color: 'text-water', bg: 'bg-water/5' },
        ].map((stat, i) => (
          <div key={i} className={cn("p-8 rounded-[2.5rem] border border-primary/5 relative overflow-hidden group hover:shadow-premium transition-all bg-white/60 backdrop-blur-xl")}>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-foreground tracking-tighter">{stat.value}</h3>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by identity, classification, or global locale..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-xl border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold placeholder:text-foreground/20 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm">
          <Filter size={16} />
          Filters
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-foreground/40 text-[11px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Entity Identity</th>
                <th className="px-8 py-6">Classification</th>
                <th className="px-8 py-6">Global Locale</th>
                <th className="px-8 py-6">Operational Status</th>
                <th className="px-8 py-6 text-right">Administrative</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredData?.map((inst: any) => (
                <tr key={inst.id} className="hover:bg-primary/5 transition-all group duration-300">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary/10 to-water/10 flex items-center justify-center text-primary font-black text-xl shadow-sm border border-primary/5 group-hover:scale-110 transition-transform">
                        {inst.name.charAt(0)}
                      </div>
                      <div>
                        <Link href={`/admin/institutions/${inst.id}`} className="text-[16px] font-black text-foreground group-hover:text-primary transition-colors tracking-tight leading-tight">
                          {inst.name}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] text-foreground/30 font-black uppercase tracking-widest mt-1">
                          UID: {inst.id.slice(0, 8)} <ChevronRight size={10} className="text-primary/40" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black bg-water/5 text-water border border-water/10 uppercase tracking-widest">
                      {inst.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-foreground/70 font-black tracking-tight">
                        <MapPin size={12} className="text-primary/40" />
                        {inst.city}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-5">{inst.country}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleActive(inst)}
                      className={cn(
                        "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm",
                        inst.isActive 
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100" 
                          : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"
                      )}
                    >
                      {inst.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {inst.isActive ? 'Active' : 'Offline'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <Link 
                        href={`/admin/institutions/${inst.id}`}
                        className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-primary transition-all border border-primary/10 shadow-sm"
                        title="Modify Profile"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(inst.id)}
                        className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-red-600 transition-all border border-primary/10 shadow-sm hover:border-red-100"
                        title="Revoke Identity"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/20 hover:text-foreground transition-all border border-primary/10 shadow-sm">
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {(!filteredData || filteredData.length === 0) && (
          <div className="p-40 text-center">
            <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-primary/5">
              <School className="w-12 h-12 text-primary/20" />
            </div>
            <h3 className="text-2xl font-black text-foreground tracking-tighter mb-2">Identity Not Found</h3>
            <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm italic">"The strongest network is built on the most diverse foundations." - Onboard a new partner.</p>
            <button 
              onClick={() => {setSearchQuery(''); fetchInstitutions();}}
              className="mt-10 text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:underline decoration-2 underline-offset-8 transition-all"
            >
              Reset Search Parameters
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="px-10 py-6 bg-primary/5 border-t border-primary/5 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 italic">
            Secure Ledger: <span className="text-primary ml-2">{data?.data?.length || 0} Entities Verified</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[9px] font-black text-foreground/40 uppercase tracking-widest">Global Sync Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}