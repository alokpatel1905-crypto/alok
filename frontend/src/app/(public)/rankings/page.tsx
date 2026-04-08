'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  TrendingUp, 
  BarChart3, 
  ShieldCheck, 
  Search,
  Star,
  ChevronRight,
  Info,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'GLOBAL', label: 'Overall Global', icon: Trophy },
  { id: 'ACADEMIC', label: 'Academic Excellence', icon: GraduationCap },
  { id: 'ECOLOGICAL', label: 'Ecological Neutrality', icon: Leaf },
  { id: 'INNOVATION', label: 'Innovation Index', icon: Zap },
];

// Fallback category icon
import { GraduationCap, Leaf, Zap } from 'lucide-react';

export default function RankingsPublicPage() {
  const [activeCategory, setActiveCategory] = useState('GLOBAL');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/rankings')
      .then(res => res.json())
      .then(res => {
        setData(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen pt-32 pb-24 font-inter">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] border border-amber-100"
          >
            <Trophy size={14} className="fill-amber-500" />
            2026 World Green Rankings
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter">
            Global <span className="text-emerald-600">Institutional</span> Rankings.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
            Unbiased, data-driven performance metrics for the world's most sustainable educational institutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-[24px] text-sm font-black uppercase tracking-widest transition-all duration-500 border",
                activeCategory === cat.id 
                  ? "bg-slate-900 text-white border-slate-900 shadow-2xl shadow-slate-900/20 scale-105" 
                  : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
              )}
            >
              <cat.icon size={18} className={activeCategory === cat.id ? "text-emerald-400" : "text-slate-400"} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rankings Table */}
        <div className="bg-white border border-slate-100 rounded-[48px] shadow-2xl shadow-slate-200/50 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-sky-500 to-amber-500" />
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Rank</th>
                  <th className="px-10 py-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Institution</th>
                  <th className="px-10 py-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400">Category</th>
                  <th className="px-10 py-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 text-center">Score</th>
                  <th className="px-10 py-8 font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Computing Global Standards...</p>
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-10 py-32 text-center">
                      <p className="text-slate-400 font-bold">No ranking data published yet for this cycle.</p>
                    </td>
                  </tr>
                ) : (
                  data.map((rank, i) => (
                    <tr key={rank.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                      <td className="px-10 py-8">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm border transition-transform group-hover:scale-110",
                          i === 0 ? "bg-amber-100 border-amber-200 text-amber-700" :
                          i === 1 ? "bg-slate-100 border-slate-200 text-slate-600" :
                          i === 2 ? "bg-orange-50 border-orange-100 text-orange-700" :
                          "bg-white border-slate-100 text-slate-400"
                        )}>
                          #{rank.rank}
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                            <Building size={20} />
                          </div>
                          <div>
                            <div className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{rank.institution.name}</div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{rank.year} Cycle</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                          {rank.category}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="text-xl font-black text-slate-900 tracking-tighter">{rank.score || 98.2}</div>
                          <div className="w-20 h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[92%] shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-emerald-600 hover:border-emerald-100 hover:shadow-lg transition-all active:scale-90">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer of Table */}
          <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Info size={14} className="text-sky-500" />
              Verified by Green Mentors Auditing Council
            </div>
            <div className="flex gap-2">
               <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-slate-400 cursor-not-allowed">Previous</button>
               <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm">Next Page</button>
            </div>
          </div>
        </div>

        {/* Legend / Info */}
        <div className="mt-20 grid md:grid-cols-3 gap-12 text-center border-t border-slate-100 pt-20">
           <div className="space-y-4">
             <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm"><ShieldCheck /></div>
             <h4 className="font-black text-slate-900 tracking-tight">Accreditation Based</h4>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">Rankings are strictly based on verified ecological audits and academic reports.</p>
           </div>
           <div className="space-y-4">
             <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto text-sky-600 shadow-sm"><TrendingUp /></div>
             <h4 className="font-black text-slate-900 tracking-tight">Dynamic Metrics</h4>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">Real-time participation tracking and monthly performance synchronization.</p>
           </div>
           <div className="space-y-4">
             <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-600 shadow-sm"><BarChart3 /></div>
             <h4 className="font-black text-slate-900 tracking-tight">Global Reach</h4>
             <p className="text-sm text-slate-500 leading-relaxed font-medium">Comparing 2000+ institutions across 40 countries using universal green standards.</p>
           </div>
        </div>
      </div>
    </div>
  );
}