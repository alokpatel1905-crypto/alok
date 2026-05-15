'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Network, Users, Target, Zap, Star, Share2, ArrowRight, 
  ShieldCheck, CheckCircle2, ListChecks, ArrowUpRight, School, Trophy
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

import { getNetworksPage } from '@/lib/api';

export default function NetworksPage() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNetworksPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const NETWORK_BLOCKS = [
    { prefix: 'school', title: cmsData?.school_title, subtitle: cmsData?.school_subtitle, desc: cmsData?.school_description, image: cmsData?.school_image, icon: School },
    { prefix: 'university', title: cmsData?.university_title, subtitle: cmsData?.university_subtitle, desc: cmsData?.university_description, image: cmsData?.university_image, icon: Trophy },
    { prefix: 'teacher', title: cmsData?.teacher_title, subtitle: cmsData?.teacher_subtitle, desc: cmsData?.teacher_description, image: cmsData?.teacher_image, icon: Users },
    { prefix: 'graduates', title: cmsData?.graduates_title, subtitle: cmsData?.graduates_subtitle, desc: cmsData?.graduates_description, image: cmsData?.graduates_image, icon: Target },
    { prefix: 'innovator', title: cmsData?.innovator_title, subtitle: cmsData?.innovator_subtitle, desc: cmsData?.innovator_description, image: cmsData?.innovator_image, icon: Zap },
  ].filter(n => n.title);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL ECOSYSTEM" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || 'Unifying'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'strategic'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Networks.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.subtitle || "Green Mentors bridges the gap between institutions, educators, and innovators through a unified global network for sustainable transformation."}
          </p>
          {cmsData?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{cmsData.intro_description}</p>
          )}
        </div>
      </section>

      {/* Network Grid */}
      <section className="py-40 px-8 lg:px-16">
         <div className="max-w-[1800px] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
               {NETWORK_BLOCKS.map((net, i) => (
                 <div key={i} className="group p-12 bg-white rounded-[4rem] border border-black/5 shadow-premium hover:border-[#21D469] transition-all duration-700">
                    <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-[#21D469] group-hover:bg-[#21D469] group-hover:text-[#0F172A] transition-all mb-12">
                       <net.icon size={32} />
                    </div>
                    <div className="space-y-2 mb-8">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#21D469]">{net.subtitle || "Global Hub"}</span>
                       <h3 className="text-3xl font-display font-black uppercase tracking-tighter leading-tight">{net.title}</h3>
                    </div>
                    <p className="text-lg font-medium italic opacity-40 mb-12 line-clamp-4">{net.desc}</p>
                    <Link href="/contact" className="inline-flex items-center gap-4 text-xs font-black uppercase tracking-widest hover:text-[#21D469] transition-colors">
                       Join Protocol <ArrowUpRight size={14} />
                    </Link>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Manifesto Section */}
      {cmsData?.why_title && (
        <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white overflow-hidden relative">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[300px] font-black text-white/[0.01] select-none pointer-events-none font-display">
              MISSION
           </div>
           <div className="max-w-[1800px] mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <SectionLabel text="NETWORK MANIFESTO" />
                    <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                       {cmsData.why_title.split(' ')[0]} <br />
                       <span className="text-[#21D469]">{cmsData.why_title.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <div className="text-xl font-medium italic opacity-60 leading-relaxed whitespace-pre-line max-w-xl">
                       {cmsData.why_description}
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: Globe, label: 'Global Access' },
                      { icon: Users, label: 'Collaboration' },
                      { icon: Zap, label: 'Innovation' },
                      { icon: ShieldCheck, label: 'Verification' }
                    ].map((item, i) => (
                      <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-[3rem] text-center group hover:bg-[#21D469] transition-all">
                         <item.icon size={48} className="mx-auto mb-6 text-[#21D469] group-hover:text-[#0F172A]" />
                         <span className="text-sm font-black uppercase tracking-widest group-hover:text-[#0F172A]">{item.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Impact Section */}
      {cmsData?.impact_title && (
        <section className="py-40 px-8 lg:px-16">
           <div className="max-w-[1800px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div className="aspect-video rounded-[4rem] overflow-hidden shadow-premium">
                    <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
                 </div>
                 <div className="space-y-12">
                    <SectionLabel text="COLLECTIVE IMPACT" />
                    <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">{cmsData.impact_title}</h2>
                    <p className="text-xl font-medium italic opacity-60 leading-relaxed">
                       {cmsData.impact_description}
                    </p>
                    <div className="flex gap-12">
                       <div className="space-y-2">
                          <div className="text-4xl font-display font-black tracking-tighter text-[#21D469]">40+</div>
                          <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Nations</div>
                       </div>
                       <div className="space-y-2">
                          <div className="text-4xl font-display font-black tracking-tighter text-[#21D469]">5,000+</div>
                          <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Entities</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Process Section */}
      {cmsData?.process_title && (
        <section className="py-40 px-8 lg:px-16 bg-[#F8FAFC]">
           <div className="max-w-[1800px] mx-auto">
              <SectionLabel text="PARTICIPATION FLOW" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase mb-24 text-center">
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

      {/* Action Gateway */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-white/[0.02] select-none pointer-events-none font-display">
          HUB
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <SectionLabel text="ACTION GATEWAY" color={COLORS.sage} />
          <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase">
            {cmsData?.cta_title?.split(' ')[0] || 'Ready'} <br />
            <span className="text-[#21D469]">{cmsData?.cta_title?.split(' ').slice(1).join(' ') || 'to be Connected?'}</span>
          </h2>
          <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
            {cmsData?.cta_description || 'Join the global registry of verified sustainable institutions and begin your transition today.'}
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
