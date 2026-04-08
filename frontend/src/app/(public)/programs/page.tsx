'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  School, 
  ArrowRight,
  ChevronRight,
  LayoutGrid,
  List,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'ALL', label: 'All Programs' },
  { id: 'SCHOOL', label: 'School' },
  { id: 'UNIVERSITY', label: 'University' },
  { id: 'TEACHER', label: 'Teacher Training' },
];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:4000/programs')
      .then((res) => res.json())
      .then((res) => {
        setPrograms(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredPrograms = programs.filter(p => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F9FAFB] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Explore Our <span className="text-emerald-600">Programs</span>.</h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium leading-relaxed">
            From primary schools to global universities, we provide the curriculum and accreditation needed to lead the sustainable transition.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                  activeCategory === cat.id 
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" 
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/40 transition-all text-slate-700 shadow-sm"
            />
          </div>
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Knowledge Base...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPrograms.map((program) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={program.id}
                  >
                    <PublicProgramCard program={program} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredPrograms.length === 0 && (
              <div className="text-center py-32 bg-white rounded-[48px] border border-slate-100">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="text-slate-200" size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">No programs found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your filters or search query.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PublicProgramCard({ program }: { program: any }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[40px] overflow-hidden hover:shadow-2xl hover:shadow-emerald-600/10 transition-all duration-500 hover:-translate-y-2 group h-full flex flex-col shadow-sm">
      <div className="relative h-56 overflow-hidden">
        {program.image ? (
          <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
            <School className="text-emerald-600/30" size={60} />
          </div>
        )}
        <div className="absolute top-6 left-6">
          <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 shadow-lg">
            {program.category || 'Global'}
          </div>
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">
          {program.title}
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 line-clamp-3">
          {program.description || 'Comprehensive sustainability program designed for forward-thinking institutions and global educators.'}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
            <Clock size={14} className="text-emerald-500" />
            Self-Paced
          </div>
          <Link 
            href={`/programs/${program.id}`} 
            className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all group-hover:scale-110"
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}