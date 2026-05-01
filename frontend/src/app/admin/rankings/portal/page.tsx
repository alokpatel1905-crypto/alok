'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Send, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  School,
  Activity,
  Calendar,
  AlertCircle,
  FileSearch,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function RankingPortalPage() {
  const [activeTab, setActiveTab] = useState<'submissions' | 'submit'>('submissions');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('/rankings/submissions');
      setSubmissions(data || []);
    } catch (err: any) {
      console.error(err);
      if (err.message === 'Unauthorized') router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'submissions') fetchSubmissions();
  }, [activeTab]);

  const handleEvaluate = async (id: string) => {
    const note = prompt('Enter evaluation notes:');
    if (!note) return;

    try {
      await apiFetch(`/rankings/submissions/${id}/evaluate`, {
        method: 'PATCH',
        body: JSON.stringify({ note, reviewerId: 'current-user-id' }), // Simplified
      });
      fetchSubmissions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Global Ranking Portal
          </h1>
          <p className="text-foreground/60 mt-1 text-sm font-medium">Verify institutional data and manage sustainability submissons.</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-primary/5 rounded-2xl border border-primary/10 self-start">
          <button 
            onClick={() => setActiveTab('submissions')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              activeTab === 'submissions' ? "bg-white text-primary shadow-sm" : "text-foreground/40 hover:text-primary"
            )}
          >
            Evaluations
          </button>
          <button 
            onClick={() => setActiveTab('submit')}
            className={cn(
              "px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              activeTab === 'submit' ? "bg-white text-primary shadow-sm" : "text-foreground/40 hover:text-primary"
            )}
          >
            Submissions
          </button>
        </div>
      </div>

      {activeTab === 'submissions' ? (
        <div className="space-y-6">
          {/* Submissions Table */}
          <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-primary/5 text-foreground/40 text-[11px] font-black uppercase tracking-[0.2em]">
                    <th className="px-8 py-6">Institution</th>
                    <th className="px-8 py-6">Evaluation Category</th>
                    <th className="px-8 py-6">Auto-Score</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="hover:bg-primary/5 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary/40 font-bold text-xs uppercase">
                            {sub.institution?.name?.charAt(0) || <School size={14} />}
                          </div>
                          <span className="text-[15px] font-black text-foreground group-hover:text-primary transition-colors">
                            {sub.institution?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-foreground/80">{sub.category}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mt-0.5">{sub.year} Cycle</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <Activity size={14} className="text-water" />
                          <span className="text-sm font-black text-water uppercase tracking-tighter">
                            {sub.score || 'Calculating...'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-tighter border",
                          sub.status === 'APPROVED' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          sub.status === 'UNDER_REVIEW' ? "bg-sun/10 text-sun border-sun/20" :
                          "bg-primary/5 text-primary border-primary/10"
                        )}>
                          {sub.status === 'APPROVED' ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleEvaluate(sub.id)}
                          className="px-6 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                        >
                          Evaluate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {loading && (
              <div className="p-32 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em]">Opening the Ranking Vault...</p>
              </div>
            )}

            {!loading && submissions.length === 0 && (
              <div className="p-32 text-center">
                <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-primary/5">
                  <FileSearch className="w-10 h-10 text-primary/20" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">No Active Submissions</h3>
                <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm">We couldn't find any institutional data awaiting evaluation.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto py-20 text-center space-y-10 animate-in zoom-in-95 duration-700">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-primary/5 rounded-[3rem] flex items-center justify-center mx-auto border border-primary/5 relative z-10">
              <Send className="w-12 h-12 text-primary" />
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-sun/10 rounded-full flex items-center justify-center animate-bounce-subtle z-0">
              <Sparkles className="w-6 h-6 text-sun" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-foreground tracking-tighter">Ready to join the Global Rankings?</h2>
            <p className="text-foreground/60 font-medium max-w-xl mx-auto leading-relaxed">
              This portal allows institutions to submit their sustainability data directly. 
              Our <span className="text-primary font-bold">Automated Ranking Score Calculation</span> engine will instantly analyze your data against global standards.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 pt-4">
            <button className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-primary/30 active:scale-95 group">
              Start New Data Submission
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] flex items-center gap-2">
              <ShieldCheck size={12} className="text-emerald-500" />
              Secure Institutional Verification
            </p>
          </div>
        </div>
      )}
    </div>
  );
}