'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Award, Star, Zap, GraduationCap, School, Users, 
  Search, ShieldCheck, ArrowRight, CheckCircle2, ListChecks, ArrowUpRight
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

import { getAwardsPage } from '@/lib/api';

export default function AwardsPage() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAwardsPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const AWARD_PROGRAMS = [
    { prefix: 'school', title: cmsData?.school_title, subtitle: cmsData?.school_subtitle, desc: cmsData?.school_description, image: cmsData?.school_image, icon: School },
    { prefix: 'university', title: cmsData?.university_title, subtitle: cmsData?.university_subtitle, desc: cmsData?.university_description, image: cmsData?.university_image, icon: Trophy },
    { prefix: 'teacher', title: cmsData?.teacher_title, subtitle: cmsData?.teacher_subtitle, desc: cmsData?.teacher_description, image: cmsData?.teacher_image, icon: Users },
    { prefix: 'graduate', title: cmsData?.graduate_title, subtitle: cmsData?.graduate_subtitle, desc: cmsData?.graduate_description, image: cmsData?.graduate_image, icon: GraduationCap },
    { prefix: 'innovator', title: cmsData?.innovator_title, subtitle: cmsData?.innovator_subtitle, desc: cmsData?.innovator_description, image: cmsData?.innovator_image, icon: Zap },
  ].filter(a => a.title);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL RECOGNITION" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || 'Celebrating'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'sustainable'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Excellence.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.subtitle || "Green Mentors recognizes the visionaries and institutions leading the global transition toward nature-inspired responsibility."}
          </p>
          {cmsData?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{cmsData.intro_description}</p>
          )}
        </div>
      </section>

      {/* Awards Grid */}
      <section className="py-40 px-8 lg:px-16">
         <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
               {AWARD_PROGRAMS.map((award, i) => (
                 <div key={i} className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-premium bg-[#0F172A]">
                    <img 
                      src={award.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"} 
                      className="w-full h-full object-cover opacity-50" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent" />
                    
                    <div className="absolute top-12 left-12">
                       <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center text-[#21D469] group-hover:bg-[#21D469] group-hover:text-[#0F172A] transition-all">
                          <award.icon size={32} />
                       </div>
                    </div>

                    <div className="absolute bottom-12 left-12 right-12 text-white space-y-6">
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">{award.subtitle || "Global Recognition"}</span>
                          <h3 className="text-4xl font-display font-black uppercase tracking-tighter leading-none">{award.title}</h3>
                       </div>
                       <p className="text-lg font-medium italic opacity-60 leading-relaxed line-clamp-3 group-hover:opacity-100 transition-opacity">
                          {award.desc}
                       </p>
                       <div className="pt-4 flex gap-8">
                          <Link href="/accreditation" className="flex items-center gap-4 text-xs font-black uppercase tracking-widest hover:text-[#21D469] transition-colors">
                             Nominate Now <ArrowUpRight size={14} />
                          </Link>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Process Section */}
      {cmsData?.process_title && (
        <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white overflow-hidden relative">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[300px] font-black text-white/[0.01] select-none pointer-events-none font-display">
              PROTOCOL
           </div>
           <div className="max-w-[1800px] mx-auto relative z-10">
              <SectionLabel text="THE PROCESS" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase mb-24">
                 {cmsData.process_title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                 {[cmsData.step1, cmsData.step2, cmsData.step3, cmsData.step4].filter(Boolean).map((step, i) => (
                   <div key={i} className="group space-y-8 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:border-[#21D469] transition-all">
                      <div className="text-6xl font-display font-black text-white/5 group-hover:text-[#21D469]/20 transition-colors">0{i+1}</div>
                      <h4 className="text-2xl font-display font-black uppercase tracking-tighter leading-tight">{step}</h4>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-40 px-8 lg:px-16 text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <SectionLabel text="ACTION GATEWAY" />
            <h2 className="text-6xl md:text-9xl font-display font-black uppercase leading-[0.8]">
               Ready to be <br />
               <span className="text-[#21D469]">Honored?</span>
            </h2>
            <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
               Showcase your institution's sustainable journey and inspire the next generation of green leaders.
            </p>
            <div className="flex justify-center pt-8">
               <Link href="/contact">
                  <button className="bg-[#0F172A] text-white px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                     Initiate Nomination
                  </button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
