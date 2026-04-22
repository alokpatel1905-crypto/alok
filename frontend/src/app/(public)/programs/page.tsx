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
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

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
    <div className="overflow-x-hidden bg-[#FFFBF0] min-h-screen perspective-1000">
      
      {/* 1. HERO SECTION - Sun & Flora Theme */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-sun/20 via-background to-flora/10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sun/10 blur-[150px] rounded-full animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-flora/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white text-sun text-[10px] font-black uppercase tracking-[0.4em] shadow-premium"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-sun animate-pulse" /> Global Education Hub
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-foreground tracking-tighter leading-[0.8] drop-shadow-sm">
              Eco <span className="text-sun">Programs</span>.
            </h1>
            
            <p className="text-2xl md:text-3xl text-foreground/70 max-w-3xl leading-tight font-medium border-l-8 border-sun pl-12 py-2">
              Scale your sustainability impact from individual schools to global university networks.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. FILTERS & SEARCH - Floating Glass Bar */}
      <div className="sticky top-24 z-40 px-4 lg:px-0">
        <Container>
          <div className="glass rounded-[3rem] p-4 lg:p-6 flex flex-col lg:flex-row items-center justify-between gap-8 border-white/50 shadow-3d">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2",
                    activeCategory === cat.id 
                      ? "bg-sun border-sun text-white shadow-xl shadow-sun/20 scale-105" 
                      : "bg-white/50 border-white text-foreground/40 hover:border-sun/40 hover:text-sun"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-[400px] group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-sun/40 group-focus-within:text-sun transition-colors" />
              <input 
                type="text" 
                placeholder="Search initiatives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/50 border-2 border-white rounded-[1.5rem] py-5 pl-16 pr-8 text-sm font-bold focus:outline-none focus:border-sun/40 transition-all text-foreground shadow-inner"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* 3. PROGRAMS GRID - 3D Perspective Cards */}
      <Section className="relative z-10 pt-20">
        <Container>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 space-y-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-8 border-sun/10 border-t-sun rounded-full" 
              />
              <p className="text-sun font-black uppercase tracking-[0.4em] text-sm animate-pulse">Synchronizing Global Curriculums...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                <AnimatePresence mode="popLayout">
                  {filteredPrograms.map((program, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: idx * 0.05 }}
                      key={program.id}
                      className="floating-3d"
                    >
                      <PublicProgramCard program={program} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredPrograms.length === 0 && (
                <div className="text-center py-40 bg-white rounded-[5rem] shadow-3d border border-white">
                  <div className="w-32 h-32 bg-sun/5 rounded-full flex items-center justify-center mx-auto mb-12 border border-sun/10">
                    <BookOpen className="text-sun/20" size={56} />
                  </div>
                  <h3 className="text-5xl font-black text-foreground mb-6 tracking-tighter">New programs in orbit.</h3>
                  <p className="text-foreground/40 font-medium text-xl">Adjust your filters to see more of our ecosystem.</p>
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
    <Card variant="default" className="p-0 overflow-hidden group h-full flex flex-col border-none shadow-premium hover:shadow-2xl transition-all duration-500 rounded-[3rem]">
      <div className="relative h-64 overflow-hidden">
        {program.image ? (
          <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        ) : (
          <div className="w-full h-full bg-primary/5 flex items-center justify-center">
            <School className="text-primary/20" size={80} />
          </div>
        )}
        <div className="absolute top-6 left-6">
          <div className="glass px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-foreground shadow-2xl border-white/40">
            {program.category || 'Global Initiative'}
          </div>
        </div>
      </div>

      <div className="p-10 flex-grow flex flex-col">
        <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
          {program.title}
        </h3>
        <p className="text-foreground/50 text-sm font-medium leading-relaxed mb-10 line-clamp-3">
          {program.description || 'Comprehensive sustainability program designed for forward-thinking institutions and global educators.'}
        </p>

        <div className="mt-auto pt-8 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
               <Zap size={18} />
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
              Active Enrollment
            </div>
          </div>
          <Button variant="primary" size="md" className="w-12 h-12 p-0 rounded-2xl group-hover:scale-110 shadow-xl shadow-primary/20">
             <ArrowRight size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
}