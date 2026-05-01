'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Edit2, 
  Calendar, 
  BarChart3, 
  ChevronRight,
  RefreshCcw,
  XCircle,
  Hash,
  School
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';

type Ranking = {
  id: string;
  category: string;
  rank: number;
  year: number;
  score?: number;
  institution: { name: string };
  createdAt: string;
};

export default function RankingsPage() {
  const [data, setData] = useState<{ data: Ranking[]; total: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRankings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch('/rankings');
      setData(res);
    } catch (err: any) {
      console.error('Fetch error:', err);
      if (err.message === 'Unauthorized') {
        window.location.href = '/login';
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this ranking record?')) return;
    try {
      await apiFetch(`/rankings/${id}`, {
        method: 'DELETE',
      });
      fetchRankings();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredRankings = data?.data.filter(item => 
    item.institution?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
      <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Loading Leaderboards...</p>
    </div>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center bg-white/60 backdrop-blur-xl border border-red-100 rounded-3xl shadow-premium">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
          <XCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">Sync Error</h2>
        <p className="text-foreground/60 max-w-md mb-8 font-medium">{error}</p>
        <button 
          onClick={() => fetchRankings()}
          className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
        >
          <RefreshCcw size={18} />
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground tracking-tighter flex items-center gap-3">
            <Trophy className="w-8 h-8 text-sun" />
            Global Rankings
          </h1>
          <p className="text-foreground/60 mt-1 text-sm font-medium">Tracking institutional performance and sustainability impact scores.</p>
        </div>
        <Link 
          href="/admin/rankings/create"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-primary/20 active:scale-95 group"
        >
          <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
          Add Ranking
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search by institution or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/60 backdrop-blur-md border border-primary/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-medium placeholder:text-foreground/30 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-primary/10 px-6 py-4 rounded-2xl text-sm font-bold text-foreground/60 hover:bg-white hover:text-primary transition-all shadow-sm">
          <Filter className="w-4 h-4" />
          Categories
        </button>
      </div>

      {/* Rankings Table */}
      <div className="bg-white/60 backdrop-blur-xl border border-primary/10 rounded-[2.5rem] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary/5 text-foreground/40 text-[11px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Rank Position</th>
                <th className="px-8 py-6">Institution</th>
                <th className="px-8 py-6">Evaluation Category</th>
                <th className="px-8 py-6">Cycle</th>
                <th className="px-8 py-6">Impact Score</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredRankings?.map((item) => (
                <tr key={item.id} className="hover:bg-primary/5 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 shadow-sm transition-transform group-hover:scale-110",
                        item.rank === 1 ? "bg-sun/20 border-sun/30 text-sun shadow-sun/10" :
                        item.rank === 2 ? "bg-slate-200/50 border-slate-300 text-slate-500" :
                        item.rank === 3 ? "bg-orange-100/50 border-orange-200 text-orange-600" :
                        "bg-primary/5 border-primary/10 text-foreground/40"
                      )}>
                        {item.rank <= 3 ? <Trophy size={16} /> : <Hash size={14} />}
                        <span className="ml-0.5">{item.rank}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary/40 font-bold text-xs">
                        {item.institution?.name?.charAt(0) || <School size={14} />}
                      </div>
                      <span className="text-[15px] font-black text-foreground group-hover:text-primary transition-colors">
                        {item.institution?.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold bg-water/5 text-water border border-water/10 uppercase tracking-tight">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-sm text-foreground/60 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-primary/40" />
                      {item.year}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 w-16 bg-primary/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-flora transition-all duration-1000" 
                          style={{ width: `${Math.min(100, (item.score || 0))}%` }} 
                        />
                      </div>
                      <span className="text-sm font-black text-primary">
                        {item.score || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-4">
                      <Link 
                        href={`/admin/rankings/${item.id}`}
                        className="p-3 bg-white/80 hover:bg-white rounded-xl text-foreground/40 hover:text-primary transition-all border border-primary/10 shadow-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-3 bg-red-50 hover:bg-red-100 rounded-xl text-red-400 hover:text-red-600 transition-all border border-red-100 shadow-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!filteredRankings || filteredRankings.length === 0) && (
          <div className="p-32 text-center">
            <div className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-primary/5">
              <BarChart3 className="w-10 h-10 text-primary/20" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No Rankings Data</h3>
            <p className="text-foreground/40 font-medium max-w-xs mx-auto text-sm">We couldn't find any ranking records matching your current view.</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-10 py-6 bg-primary/5 border-t border-primary/5 flex items-center justify-between">
          <p className="text-[11px] text-foreground/40 font-black uppercase tracking-[0.2em]">
            Database Records: <span className="text-primary ml-2">{data?.data.length || 0} Positions</span>
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-primary/10 flex items-center justify-center text-[10px] text-primary font-bold">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Top Performers Highlighted</span>
          </div>
        </div>
      </div>
    </div>
  );
}