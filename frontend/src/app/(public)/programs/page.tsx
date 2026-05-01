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
  CheckCircle2,
  Sparkles,
  Zap,
  Globe,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';

const CATEGORIES = [
  { id: 'ALL', label: 'All Initiatives' },
  { id: 'SCHOOL', label: 'Green Schools' },
  { id: 'UNIVERSITY', label: 'Global Universities' },
  { id: 'TEACHER', label: 'Educator Training' },
];

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    apiFetch('/programs')
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
    <div className="overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-16 bg-white border-b border-slate-200">
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide uppercase">
            <Globe className="w-3 h-3 text-blue-600" /> Global Education Hub
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            Eco <span className="text-blue-600">Programs</span>.
          </h1>
          
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Scale your sustainability impact from individual schools to global university networks.
          </p>
        </Container>
      </section>

      {/* 2. FILTERS & SEARCH */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                    activeCategory === cat.id 
                      ? "bg-slate-900 text-white shadow-sm" 
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search initiatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* 3. PROGRAMS GRID */}
      <Section className="relative z-10 pt-16 pb-24">
        <Container>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="text-slate-500 font-medium">Loading programs...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredPrograms.map((program, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: idx * 0.05 }}
                      key={program.id}
                    >
                      <PublicProgramCard program={program} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredPrograms.length === 0 && (
                <div className="text-center py-32 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <BookOpen className="text-slate-400 w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">No programs found.</h3>
                  <p className="text-slate-500 font-medium">Adjust your filters or search query to see more results.</p>
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

    </div>
  );
}

function PublicProgramCard({ program }: { program: any }) {
  return (
    <Card className="p-0 overflow-hidden group h-full flex flex-col bg-white border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl">
      <div className="relative h-56 overflow-hidden border-b border-slate-100">
        {program.image ? (
          <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
            <School className="text-slate-300 w-16 h-16" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm border border-slate-200/50">
            {program.category || 'Initiative'}
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight tracking-tight">
          {program.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
          {program.description || 'Comprehensive sustainability program designed for forward-thinking institutions and global educators.'}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
               <CheckCircle2 size={16} />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg pr-2">
             Learn more <ArrowRight className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}