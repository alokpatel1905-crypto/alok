'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Globe, Star, Search, ShieldCheck, ArrowRight, 
  BarChart3, Award, CheckCircle2, Zap, GraduationCap, School, Sun, ArrowUpRight,
  TrendingUp, ListChecks
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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

import { getRankingsPage } from '@/lib/api';

export default function RankingsPage() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRankingsPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const RANKING_BLOCKS = [
    { prefix: 'school', title: cmsData?.school_title, subtitle: cmsData?.school_subtitle, desc: cmsData?.school_description, image: cmsData?.school_image, icon: School },
    { prefix: 'university', title: cmsData?.university_title, subtitle: cmsData?.university_subtitle, desc: cmsData?.university_description, image: cmsData?.university_image, icon: Trophy },
    { prefix: 'regional', title: cmsData?.regional_title, subtitle: cmsData?.regional_subtitle, desc: cmsData?.regional_description, image: cmsData?.regional_image, icon: Globe },
  ].filter(b => b.title);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full" />
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL MATRIX" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || "The World's"} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'integrity based'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Rankings.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.subtitle || "The world's only ranking system that evaluates educational institutions based on their commitment to nature-inspired responsibility and zero-carbon resilience."}
          </p>
          {cmsData?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{cmsData.intro_description}</p>
          )}
        </div>
      </section>

      {/* Ranking Blocks */}
      <section className="py-40 px-8 lg:px-16">
         <div className="max-w-[1800px] mx-auto">
            <div className="space-y-40">
               {RANKING_BLOCKS.map((block, i) => (
                 <div key={i} className="grid lg:grid-cols-12 gap-24 items-center">
                    <div className={cn("lg:col-span-7 relative", i % 2 === 1 ? "lg:order-2" : "")}>
                       <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-premium relative bg-[#0F172A]">
                          <img 
                            src={block.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"} 
                            className="w-full h-full object-cover opacity-70" 
                          />
                          <div className="absolute inset-0 bg-[#0F172A]/20" />
                       </div>
                       <div className={cn("absolute -bottom-12 -right-12 bg-white border border-black/5 p-12 rounded-[3rem] text-[#0F172A] shadow-premium hidden lg:block", i % 2 === 1 ? "-left-12 right-auto" : "")}>
                          <block.icon size={48} className="text-[#21D469] mb-4" />
                          <div className="text-xs font-black uppercase tracking-widest">Global Benchmark</div>
                       </div>
                    </div>
                    <div className={cn("lg:col-span-5 space-y-12", i % 2 === 1 ? "lg:order-1" : "")}>
                       <div className="space-y-6">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">{block.subtitle || "Institutional Resilience"}</span>
                          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">{block.title}</h2>
                       </div>
                       <p className="text-xl font-medium italic opacity-60 leading-relaxed">
                          {block.desc}
                       </p>
                       <div className="flex flex-wrap gap-6 pt-8">
                          <Link href="/accreditation">
                             <button className="bg-[#0F172A] text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#21D469] transition-all shadow-3d">
                                Register Interest
                             </button>
                          </Link>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Methodology Section */}
      {cmsData?.methodology_title && (
        <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white overflow-hidden relative">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[300px] font-black text-white/[0.01] select-none pointer-events-none font-display">
              MATRIX
           </div>
           <div className="max-w-[1800px] mx-auto relative z-10">
              <div className="grid lg:grid-cols-12 gap-24 items-center">
                 <div className="lg:col-span-6 space-y-12">
                    <SectionLabel text="GLOBAL METHODOLOGY" />
                    <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                       {cmsData.methodology_title.split(' ')[0]} <br />
                       <span className="text-[#21D469]">{cmsData.methodology_title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-2xl font-serif italic opacity-60 leading-relaxed max-w-xl">
                       {cmsData.methodology_description}
                    </p>
                 </div>
                 <div className="lg:col-span-6 grid grid-cols-2 gap-8">
                    {[
                      { icon: Zap, label: 'Circularity', val: '24%' },
                      { icon: Search, label: 'Literacy', val: '20%' },
                      { icon: Globe, label: 'Impact', val: '18%' },
                      { icon: ShieldCheck, label: 'Design', val: '15%' },
                      { icon: Sun, label: 'Energy', val: '13%' },
                      { icon: Star, label: 'Leadership', val: '10%' },
                    ].map((stat, i) => (
                      <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col items-center text-center">
                         <stat.icon size={32} className="mb-4 text-[#21D469] group-hover:text-[#0F172A]" />
                         <div className="text-4xl font-display font-black tracking-tighter group-hover:text-[#0F172A]">{stat.val}</div>
                         <div className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:text-[#0F172A]/60">{stat.label} Weightage</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Process Flow */}
      {cmsData?.process_title && (
        <section className="py-40 px-8 lg:px-16 bg-[#F8FAFC]">
           <div className="max-w-[1800px] mx-auto">
              <SectionLabel text="RANKING FLOW" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase mb-24">
                 {cmsData.process_title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                 {[cmsData.step1, cmsData.step2, cmsData.step3, cmsData.step4].filter(Boolean).map((step, i) => (
                   <div key={i} className="bg-white p-12 rounded-[3rem] border border-black/5 hover:border-[#21D469] transition-all group relative overflow-hidden">
                      <div className="absolute -top-10 -right-10 text-[150px] font-black text-black/[0.02] group-hover:text-[#21D469]/5 transition-colors">
                         {i+1}
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-[#21D469]/10 flex items-center justify-center text-[#21D469] mb-12">
                         <ListChecks size={24} />
                      </div>
                      <h4 className="text-xl font-display font-black uppercase tracking-tighter leading-tight relative z-10">{step}</h4>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Manifesto Section */}
      {cmsData?.why_description && (
        <section className="py-40 px-8 lg:px-16 overflow-hidden relative">
           <div className="max-w-[1800px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <SectionLabel text="PARTICIPATION MANIFESTO" />
                    <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                       {cmsData?.why_title?.split(' ')[0] || 'Institutional'} <br />
                       <span className="text-[#21D469]">{cmsData?.why_title?.split(' ').slice(1).join(' ') || 'Excellence.'}</span>
                    </h2>
                    <p className="text-2xl font-serif italic opacity-60 leading-relaxed max-w-xl">
                       {cmsData.why_description}
                    </p>
                 </div>
                 <div className="aspect-video rounded-[4rem] overflow-hidden shadow-premium">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Action Gateway */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-white/[0.02] select-none pointer-events-none font-display">
          SCALE
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <SectionLabel text="ACTION GATEWAY" color={COLORS.sage} />
          <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase">
            {cmsData?.cta_title?.split(' ')[0] || 'Ready'} <br />
            <span className="text-[#21D469]">{cmsData?.cta_title?.split(' ').slice(1).join(' ') || 'to be Measured?'}</span>
          </h2>
          <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
            {cmsData?.cta_description || 'Join the global movement of verified sustainable institutions and benchmark your progress.'}
          </p>
          <div className="flex justify-center pt-8">
            <Link href={cmsData?.button_link || "/contact"}>
              <button className="bg-white text-[#0F172A] px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                {cmsData?.button_text || 'Initiate Protocol'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
