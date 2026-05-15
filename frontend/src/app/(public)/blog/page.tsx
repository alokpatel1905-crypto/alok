'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  BookOpen, 
  ChevronRight,
  Newspaper,
  Sparkles,
  Globe,
  Zap,
  Leaf,
  ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';

const COLORS = {
  ink: '#0F172A',
  sage: '#21D469',
  gold: '#FACC15',
  parchment: '#FFFFFF',
};

const SectionLabel = ({ text, color = COLORS.sage }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] w-12 bg-black/10" />
    <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color }}>
      {text}
    </span>
  </div>
);

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/publications')
      .then(res => {
        setArticles(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#21D469]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="GLOBAL PUBLICATIONS" />
          <h1 className="text-[clamp(50px,10vw,150px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
            Green <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">Insights.</span>
          </h1>
          <p className="text-2xl font-serif italic text-[#0F172A]/60 leading-relaxed max-w-3xl border-l-4 border-[#21D469] pl-12">
            Deep-diving into the ecological neutralization of global education and institutional resilience.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-24 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          {!loading && articles.length > 0 && (
            <Link href={`/blog/${articles[0].id}`} className="group block relative">
              <div className="grid lg:grid-cols-12 items-stretch gap-0 bg-[#0F172A] rounded-[4rem] overflow-hidden shadow-premium">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img 
                    src={articles[0].image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"} 
                    className="w-full h-full object-cover grayscale opacity-70" 
                    alt="Featured" 
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/20 mix-blend-overlay" />
                </div>
                <div className="lg:col-span-5 p-12 lg:p-24 flex flex-col justify-center bg-[#0F172A] text-white">
                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">Spotlight</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{new Date(articles[0].createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9] group-hover:text-[#FACC15] transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="text-xl font-serif italic opacity-60 line-clamp-3 leading-relaxed">
                      {articles[0].content?.substring(0, 250)}...
                    </p>
                    <div className="pt-12 border-t border-white/10 flex items-center justify-between">
                       <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-[#21D469]">
                             <User size={32} />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Architect</div>
                             <div className="text-lg font-display font-black uppercase tracking-tighter">
                                {articles[0].author || 'Editorial Team'}
                             </div>
                          </div>
                       </div>
                       <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#21D469] group-hover:text-[#0F172A] transition-all duration-500">
                          <ArrowRight size={32} />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-32 px-8 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[1, 2, 3].map(i => (
                 <div key={i} className="aspect-[4/5] bg-white rounded-[4rem] shadow-premium" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {articles.slice(1).map((article, idx) => (
                <Link key={article.id} href={`/blog/${article.id}`} className="group block">
                  <div className="bg-white rounded-[4rem] border border-black/5 shadow-premium hover:border-[#21D469] transition-all duration-700 flex flex-col h-full overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={article.image || "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600"} 
                        className="w-full h-full object-cover grayscale opacity-70" 
                        alt={article.title} 
                      />
                    </div>
                    <div className="p-12 space-y-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">{article.type}</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-3xl font-display font-black uppercase tracking-tighter leading-tight group-hover:text-[#21D469] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-lg font-medium italic opacity-60 line-clamp-3 leading-relaxed flex-grow">
                        {article.content || 'Green Mentors is leading the world into a new era of ecologically neutral education systems.'}
                      </p>
                      <div className="pt-8 border-t border-black/5 flex items-center justify-between text-[#0F172A] font-black text-[10px] uppercase tracking-[0.4em]">
                        Read Publication <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && articles.length === 0 && (
            <div className="text-center py-40">
              <Newspaper size={80} strokeWidth={0.5} className="mx-auto mb-8 opacity-20" />
              <h3 className="text-3xl font-display font-black uppercase opacity-20 tracking-tighter">New Stories Rooting</h3>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-40 px-8 lg:px-16 bg-[#FACC15] text-[#0F172A] text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-[#0F172A]/[0.02] select-none pointer-events-none font-display">
          VOICE
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <SectionLabel text="JOIN THE DIALOGUE" color={COLORS.ink} />
          <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase tracking-tighter">
            Subscribe <br />
            <span className="text-white">Pulse.</span>
          </h2>
          <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ sustainability leaders receiving our weekly strategic insights and global updates.
          </p>
          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
               <input 
                 type="email" 
                 placeholder="PROTOCOL@GLOBAL-IMPACT.COM" 
                 className="flex-grow bg-[#0F172A] px-10 py-6 rounded-3xl border-none text-white placeholder:text-white/20 outline-none font-black text-xs uppercase tracking-widest"
               />
               <button className="bg-white text-[#0F172A] px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                  Subscribe
               </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}