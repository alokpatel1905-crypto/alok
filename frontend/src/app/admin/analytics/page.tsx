'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  Globe, 
  Trophy, 
  Users, 
  Eye, 
  FileText, 
  Calendar, 
  TrendingUp, 
  ArrowUpRight, 
  MousePointer2, 
  RefreshCcw, 
  ChevronRight,
  ShieldCheck,
  Activity,
  Zap,
  Layout,
  ExternalLink,
  Target
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'website' | 'rankings' | 'participation'>('website');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const endpoint = `/analytics/${activeTab}`;

    try {
      const result = await apiFetch(endpoint);
      setData(result);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'API Error' || err.message === 'Unauthorized') {
        router.push('/login');
        return;
      }
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Harvesting Intelligence...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <BarChart3 className="w-10 h-10 text-primary" />
            Intelligence Center
          </h1>
          <p className="text-foreground/60 font-medium italic">Measuring the pulse and impact of the global sustainability network.</p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group"
        >
          <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          Synchronize Data
        </button>
      </div>

      {/* Modern Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10 w-fit">
        {[
          { id: 'website', label: 'Network Traffic', icon: Globe },
          { id: 'rankings', label: 'Ranking Intelligence', icon: Trophy },
          { id: 'participation', label: 'Engagement Pulse', icon: Users },
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === tab.id ? "bg-white text-primary shadow-sm" : "text-foreground/40 hover:text-primary"
            )}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] flex flex-col items-center gap-4 text-red-600 text-center animate-in zoom-in-95 duration-300">
          <RefreshCcw size={48} className="animate-spin-slow opacity-20" />
          <div>
            <h3 className="text-xl font-black tracking-tighter">Connection Failed</h3>
            <p className="text-sm font-medium opacity-80 mt-1 italic italic">"{error}"</p>
          </div>
          <button onClick={fetchData} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            Retry Protocol
          </button>
        </div>
      )}

      {!error && activeTab === 'website' && data && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Impressions" value={data.totalViews || 0} icon={Eye} color="text-primary" bg="bg-primary/5" />
            <StatCard title="Organic Traffic" value={data.breakdown?.pages || 0} icon={TrendingUp} color="text-emerald-500" bg="bg-emerald-500/10" />
            <StatCard title="Program Interest" value={data.breakdown?.programs || 0} icon={Target} color="text-sun" bg="bg-sun/5" />
            <StatCard title="Summit Clicks" value={data.breakdown?.events || 0} icon={MousePointer2} color="text-water" bg="bg-water/10" />
          </div>

          {/* Top Content Table */}
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
            <div className="p-10 border-b border-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Layout size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tighter">High-Impact Content</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Top viewed pages across the network</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-10 py-5">Page Identity</th>
                    <th className="px-10 py-5">Digital Address</th>
                    <th className="px-10 py-5 text-right">Engagement Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {data.topPages?.map((p: any) => (
                    <tr key={p.slug} className="group hover:bg-primary/5 transition-all">
                      <td className="px-10 py-6">
                        <span className="text-[15px] font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{p.title}</span>
                      </td>
                      <td className="px-10 py-6">
                        <code className="text-[11px] font-black uppercase tracking-widest text-foreground/30 bg-foreground/5 px-2 py-1 rounded-lg">/{p.slug}</code>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl text-sm font-black text-primary border border-primary/10 group-hover:scale-105 transition-transform">
                          <Zap size={14} />
                          {(p.views || 0).toLocaleString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!data.topPages || data.topPages.length === 0) && (
                    <tr>
                      <td colSpan={3} className="px-10 py-20 text-center text-foreground/20 italic text-sm border border-dashed border-primary/10 m-8 rounded-2xl">
                        No traffic records detected in the current cycle.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!error && activeTab === 'participation' && data && (
        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
          {/* Participation Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatCard title="Global Enrollments" value={data.totalRegistrations || 0} icon={Users} color="text-primary" bg="bg-primary/5" />
            <StatCard 
              title="Verified Participants" 
              value={data.statusStats?.find((s: any) => s.status === 'CONFIRMED')?._count?._all || 0} 
              icon={ShieldCheck} 
              color="text-emerald-500" 
              bg="bg-emerald-500/10" 
            />
          </div>

          {/* Popular Summits */}
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
            <div className="p-10 border-b border-primary/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-sun/10 rounded-2xl flex items-center justify-center text-sun shadow-sm">
                  <Calendar size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-foreground tracking-tighter">Flagship Summits</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Events with highest engagement volume</p>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="px-10 py-5">Summit Title</th>
                    <th className="px-10 py-5 text-right">Active Enrollments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {data.popularEvents?.map((e: any) => (
                    <tr key={e.id} className="group hover:bg-primary/5 transition-all">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Activity size={18} />
                          </div>
                          <span className="text-[15px] font-black text-foreground tracking-tight">{e.title}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="inline-flex items-center gap-2 bg-sun/10 px-4 py-2 rounded-xl text-sm font-black text-sun border border-sun/10">
                          <Users size={14} />
                          {e._count?.registrations || 0}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(!data.popularEvents || data.popularEvents.length === 0) && (
                    <tr>
                      <td colSpan={2} className="px-10 py-20 text-center text-foreground/20 italic text-sm">
                        No active participation data recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="bg-primary/5 border-t border-primary/5 p-10 rounded-[2.5rem] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">Intelligence Protocol</span>
            <span className="text-xs font-bold text-primary flex items-center gap-2"><ShieldCheck size={12} /> Data Fully Validated</span>
          </div>
          <div className="w-px h-10 bg-primary/10" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">Last Update</span>
            <span className="text-xs font-bold text-foreground/60">{new Date().toLocaleString()}</span>
          </div>
        </div>
        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 hover:text-primary transition-all">
          Generate Advanced Report
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-primary/10 p-8 rounded-[2.5rem] shadow-premium group hover:shadow-xl transition-all relative overflow-hidden">
      <div className="relative z-10 flex flex-col gap-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", bg, color)}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 mb-1">{title}</p>
          <h3 className="text-4xl font-black text-foreground tracking-tighter">{(value || 0).toLocaleString()}</h3>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        <Icon size={120} />
      </div>
    </div>
  );
}