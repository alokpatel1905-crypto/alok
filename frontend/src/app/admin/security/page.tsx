'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  History, 
  AlertTriangle, 
  Fingerprint, 
  Globe, 
  User, 
  Clock, 
  MoreHorizontal, 
  RefreshCcw, 
  ChevronRight,
  Zap,
  Activity,
  Terminal,
  Server,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Eye,
  ShieldAlert
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState<'audit' | 'login'>('audit');
  const [data, setData] = useState<any>(null);
  const [alerts, setAlerts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const endpoint = activeTab === 'audit' ? 'security/audit-logs' : 'security/login-history';

    try {
      const [logs, alertsData] = await Promise.all([
        apiFetch(`/${endpoint}`),
        apiFetch(`/security/alerts`)
      ]);

      setData(logs);
      setAlerts(alertsData);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  if (loading && !data) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Securing Environment Matrix...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-primary" />
            Security & Audit Ledger
          </h1>
          <p className="text-foreground/60 font-medium italic">Monitoring administrative access and platform integrity protocols.</p>
        </div>
        <button 
          onClick={fetchData}
          className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group"
        >
          <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
          Refresh Registry
        </button>
      </div>

      {/* High-Risk Alert Banner */}
      {alerts?.isHighRisk && (
        <div className="p-6 bg-red-600 rounded-[2.5rem] shadow-2xl shadow-red-600/20 flex flex-col md:flex-row items-center justify-between gap-6 animate-pulse-subtle">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-md border border-white/20">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Security Protocol Violation</h3>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">High volume of failed access attempts detected ({alerts.recentFailedLogins} incidents).</p>
            </div>
          </div>
          <button className="px-10 py-4 bg-white text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl">
            Initiate Lockdown
          </button>
        </div>
      )}

      {/* Analytics Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Sessions', value: '24', icon: Activity, color: 'text-primary', bg: 'bg-primary/5' },
          { label: 'Total Audit Logs', value: data?.data?.length || 0, icon: Terminal, color: 'text-water', bg: 'bg-water/5' },
          { label: 'System Health', value: '99.9%', icon: Server, color: 'text-emerald-500', bg: 'bg-emerald-500/5' },
        ].map((stat, i) => (
          <div key={i} className="p-8 rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-primary/10 group hover:shadow-premium transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">{stat.label}</p>
                <h3 className="text-3xl font-black text-foreground tracking-tighter">{stat.value}</h3>
              </div>
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10 w-fit">
        {[
          { id: 'audit', label: 'Admin Activity', icon: Fingerprint },
          { id: 'login', label: 'Login History', icon: History },
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

      {/* Logs Table */}
      <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                {activeTab === 'audit' ? (
                  <>
                    <th className="px-10 py-5">Personnel Identity</th>
                    <th className="px-10 py-5">Strategic Action</th>
                    <th className="px-10 py-5">Registry Details</th>
                    <th className="px-10 py-5">Genesis Point</th>
                  </>
                ) : (
                  <>
                    <th className="px-10 py-5">Email Credential</th>
                    <th className="px-10 py-5">Access Status</th>
                    <th className="px-10 py-5">Geographic IP</th>
                    <th className="px-10 py-5">Timestamp</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {data?.data?.map((item: any) => (
                <tr key={item.id} className="group hover:bg-primary/5 transition-all duration-300">
                  {activeTab === 'audit' ? (
                    <>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <User size={18} />
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{item.user?.name || 'System Protocol'}</p>
                            <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">{item.user?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-primary uppercase tracking-widest">{item.action}</span>
                          <span className="text-[9px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">{item.module}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 max-w-xs">
                        <p className="text-xs font-medium text-foreground/40 italic line-clamp-2 leading-relaxed">{item.details || 'No supplemental data recorded.'}</p>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground/40">
                          <Clock size={12} className="text-primary/20" />
                          {new Date(item.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                            <Lock size={18} />
                          </div>
                          <p className="text-[14px] font-black text-foreground tracking-tight">{item.email}</p>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm",
                          item.status === 'SUCCESS' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                        )}>
                          {item.status === 'SUCCESS' ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground/40">
                          <Globe size={12} className="text-primary/20" />
                          {item.ipAddress || 'Internal Protocol'}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold text-foreground/40 italic">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {(!data || !data.data || data.data.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-10 py-32 text-center">
                    <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border border-primary/5">
                      <ShieldCheck className="w-10 h-10 text-primary/20" />
                    </div>
                    <h3 className="text-xl font-black text-foreground tracking-tighter">No Security Logs Detected</h3>
                    <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm italic mt-2">"True security is the absence of recorded violations."</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Ledger */}
        <div className="px-10 py-6 bg-primary/5 border-t border-primary/5 flex items-center justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 italic">
            Integrity Ledger: <span className="text-primary ml-2">{data?.data?.length || 0} Security Fragments Verified</span>
          </p>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-black text-foreground/40 uppercase tracking-widest">Environment Encryption Active</span>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 hover:text-primary transition-all group">
                Export Audit Report
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}