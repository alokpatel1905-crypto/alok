'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Trophy, 
  ExternalLink, 
  Filter,
  School,
  Building2,
  GraduationCap,
  Globe2
} from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const TYPES = [
  { id: 'ALL', label: 'All Institutions', icon: Globe2 },
  { id: 'SCHOOL', label: 'Schools', icon: School },
  { id: 'COLLEGE', label: 'Colleges', icon: Building2 },
  { id: 'UNIVERSITY', label: 'Universities', icon: GraduationCap },
];

export default function InstitutionsPublicPage() {
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:4000/institutions')
      .then(res => res.json())
      .then(res => {
        setInstitutions(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = institutions.filter(inst => {
    const matchesType = activeType === 'ALL' || inst.type === activeType;
    const matchesSearch = inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inst.city?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="bg-[#F9FAFB] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Global Network</h2>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
              Partner <span className="text-emerald-600">Institutions</span>.
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Discover the world's most progressive schools and universities leading the charge in sustainable education.
            </p>
          </div>
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
             <div className="px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 font-black text-xs uppercase tracking-widest">
               {institutions.length} Total
             </div>
          </div>
        </div>

        {/* Search & Tabs */}
        <div className="space-y-8 mb-12">
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-100 rounded-[24px] py-5 pl-14 pr-6 text-lg focus:outline-none focus:border-emerald-500/20 focus:ring-4 focus:ring-emerald-500/5 transition-all text-slate-700 shadow-xl shadow-slate-200/50"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveType(t.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border",
                  activeType === t.id 
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20 scale-105" 
                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                )}
              >
                <t.icon size={18} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Synchronizing Global Database...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map((inst) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={inst.id}
                  >
                    <PublicInstitutionCard inst={inst} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[48px] border border-slate-100 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe2 className="text-slate-200" size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No matching institutions</h3>
                <p className="text-slate-500 font-medium">Try broadening your search criteria.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PublicInstitutionCard({ inst }: { inst: any }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[40px] p-8 hover:shadow-2xl hover:shadow-emerald-600/10 transition-all duration-500 hover:-translate-y-2 group h-full flex flex-col shadow-sm relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50 to-transparent -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 flex-grow">
        <div className="flex items-start justify-between mb-8">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-emerald-100 group-hover:bg-emerald-50 transition-colors duration-500">
            {inst.logo ? (
              <img src={inst.logo} alt={inst.name} className="w-10 h-10 object-contain" />
            ) : (
              <Building2 className="text-slate-300 group-hover:text-emerald-600 transition-colors" size={32} />
            )}
          </div>
          <div className="text-right">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Status</div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-black text-xs uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">
          {inst.name}
        </h3>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
            <MapPin size={16} className="text-emerald-500" />
            {inst.city}, {inst.country}
          </div>
          <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
            <Trophy size={16} className="text-amber-500" />
            {inst.type} • Rank #12
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-slate-50 flex items-center justify-between mt-auto">
        <Link 
          href={`/institutions/${inst.id}`}
          className="text-slate-900 font-black text-sm uppercase tracking-widest hover:text-emerald-600 transition-colors flex items-center gap-2"
        >
          View Profile
          <ArrowRight size={14} />
        </Link>
        <a 
          href={inst.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
        >
          <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
}