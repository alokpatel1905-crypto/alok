'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Megaphone, 
  Send, 
  Trash2, 
  Mail, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  RefreshCcw, 
  MoreHorizontal,
  Bell,
  MailWarning,
  Sparkles,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'newsletter'>('announcements');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const endpoint = activeTab === 'announcements' ? '/communications/announcements' : '/communications/newsletter/subscribers';

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

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      if (!confirm('Permanently delete this announcement protocol?')) return;
      await apiFetch(`/communications/announcements/${id}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (err: any) {
      console.error('Failed to delete announcement:', err);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest italic tracking-tighter">Connecting to Communication Nodes...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-foreground tracking-tighter flex items-center gap-4">
            <Megaphone className="w-10 h-10 text-primary" />
            Communication Hub
          </h1>
          <p className="text-foreground/60 font-medium italic">Orchestrating platform-wide alerts and institutional broadcast protocols.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-primary/10 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-foreground/60 hover:text-primary transition-all shadow-sm group">
            <Bell size={16} className="group-hover:rotate-12 transition-transform" />
            New Announcement
          </button>
          <button className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all group">
            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            Broadcast Newsletter
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10 w-fit">
        {[
          { id: 'announcements', label: 'Network Alerts', icon: Bell },
          { id: 'newsletter', label: 'Subscriber Matrix', icon: Users },
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
          <h3 className="text-xl font-black tracking-tighter">Node Connection Interrupted</h3>
          <p className="text-sm font-medium opacity-80 italic">"{error}"</p>
          <button onClick={fetchData} className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            Reconnect Node
          </button>
        </div>
      )}

      {/* Main Table Container */}
      {!error && (
        <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary/5 text-foreground/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  {activeTab === 'announcements' ? (
                    <>
                      <th className="px-10 py-5">Alert Parameters</th>
                      <th className="px-10 py-5">Priority Level</th>
                      <th className="px-10 py-5">Genesis Date</th>
                      <th className="px-10 py-5 text-right">Operations</th>
                    </>
                  ) : (
                    <>
                      <th className="px-10 py-5">Subscriber Identity</th>
                      <th className="px-10 py-5">Subscription Status</th>
                      <th className="px-10 py-5">Enrollment</th>
                      <th className="px-10 py-5 text-right">Management</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {activeTab === 'announcements' ? (
                  data?.data?.map((item: any) => (
                    <tr key={item.id} className="group hover:bg-primary/5 transition-all">
                      <td className="px-10 py-6 max-w-xl">
                        <div className="flex items-start gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                            item.priority === 'URGENT' ? "bg-red-50 text-red-500 border border-red-100" : "bg-primary/5 text-primary border border-primary/10"
                          )}>
                            {item.priority === 'URGENT' ? <Zap size={18} /> : <Bell size={18} />}
                          </div>
                          <div>
                            <p className="text-[15px] font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{item.title}</p>
                            <p className="text-xs font-medium text-foreground/40 mt-1 line-clamp-2 italic leading-relaxed">{item.message}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm",
                          item.priority === 'URGENT' ? "bg-red-50 text-red-600 border-red-100" : "bg-primary/5 text-primary border border-primary/10"
                        )}>
                          {item.priority === 'URGENT' && <Sparkles size={10} />}
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground/40">
                          <Clock size={12} className="text-primary/20" />
                          {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => handleDeleteAnnouncement(item.id)}
                            className="p-3 bg-white hover:bg-red-50 rounded-xl text-foreground/20 hover:text-red-600 transition-all border border-primary/10 hover:border-red-100 shadow-sm"
                            title="Revoke Alert"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  data?.data?.map((sub: any) => (
                    <tr key={sub.id} className="group hover:bg-primary/5 transition-all">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 overflow-hidden flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="text-[15px] font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{sub.name || 'Anonymous Entity'}</p>
                            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-foreground/30 mt-0.5">
                              <Mail size={12} className="text-primary/30" />
                              {sub.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all border shadow-sm",
                          sub.isActive 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-red-50 text-red-600 border-red-100"
                        )}>
                          {sub.isActive ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                          {sub.isActive ? 'Active' : 'Unsubscribed'}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-xs font-bold text-foreground/40 italic">
                        {new Date(sub.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-10 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button className="p-3 bg-white hover:bg-white rounded-xl text-foreground/20 hover:text-primary transition-all border border-primary/10 shadow-sm">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
                {(!data || !data.data || data.data.length === 0) && (
                  <tr>
                    <td colSpan={4} className="px-10 py-32 text-center">
                      <div className="w-20 h-20 bg-primary/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border border-primary/5">
                        <Megaphone className="w-10 h-10 text-primary/20" />
                      </div>
                      <h3 className="text-xl font-black text-foreground tracking-tighter">No Active Communications</h3>
                      <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm italic mt-2">"Effective communication is the bridge between confusion and clarity."</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Metadata */}
          <div className="px-10 py-6 bg-primary/5 border-t border-primary/5 flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30 italic">
              Communication Ledger: <span className="text-primary ml-2">{data?.data?.length || 0} Records Synced</span>
            </p>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[9px] font-black text-foreground/40 uppercase tracking-widest">Global Broadcast Protocol Active</span>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/20 hover:text-primary transition-all">
                Audit Logs
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}