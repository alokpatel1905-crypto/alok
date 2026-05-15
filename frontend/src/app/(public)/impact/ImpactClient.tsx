'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Users, School, GraduationCap, Award, Zap, Heart, Star, ChevronRight, Globe2, ArrowUpRight, MousePointer2 } from 'lucide-react';
import { StatsCounter } from '@/components/ui/StatsCounter';
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

import { getImpactPage } from '@/lib/api';

export default function ImpactClient() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getImpactPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const stats = [
    { label: cmsData?.stat1_title || 'Green Schools', value: cmsData?.stat1_value || '2000', icon: School },
    { label: cmsData?.stat2_title || 'Green Universities', value: cmsData?.stat2_value || '200', icon: GraduationCap },
    { label: cmsData?.stat3_title || 'Teachers Trained', value: cmsData?.stat3_value || '50000', icon: Users },
    { label: cmsData?.stat4_title || 'School Leaders', value: cmsData?.stat4_value || '20000', icon: Award },
    { label: 'Countries Reach', value: '40', icon: Globe },
  ];

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL FOOTPRINT" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.title?.split(' ')[0] || 'Impact'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.title?.split(' ').slice(1, -1).join(' ') || 'measured in'}</span> <br />
            {cmsData?.title?.split(' ').slice(-1)[0] || 'Evolution.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.description || 'We measure our success by the number of educational ecosystems we transition towards sustainability and the lives we empower through green literacy.'}
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0 border border-white/10">
            {stats.map((stat, i) => (
              <div key={i} className="p-16 text-center border-r border-b border-white/10 last:border-r-0 flex flex-col items-center justify-center group hover:bg-[#21D469] hover:text-[#0F172A] transition-all duration-700">
                <stat.icon size={40} className="mb-8 text-[#21D469] group-hover:text-[#0F172A] transition-colors" />
                <div className="text-6xl font-display font-black tracking-tighter mb-4">
                  <StatsCounter value={stat.value} suffix="" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Alignment */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-6 space-y-12">
              <SectionLabel text="STRATEGIC ALIGNMENT" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                {cmsData?.why_title?.split(' ')[0] || 'SDG'} <span className="text-[#21D469]">{cmsData?.why_title?.split(' ').slice(1).join(' ') || 'Catalyst'}</span> <br />
                for Global <br />
                Action.
              </h2>
              <p className="text-xl font-medium leading-relaxed italic text-[#0F172A]/70 max-w-xl">
                {cmsData?.why_description || 'Our programs are specifically engineered to drive progress in Quality Education (Goal 4) and Climate Action (Goal 13).'}
              </p>
              <div className="space-y-6">
                {[
                  'Verified Carbon Neutral Roadmap',
                  '100% Water Recycling Protocols',
                  'Nature-Mimicry Campus Design',
                  'Global Green Literacy Standards'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 text-xl font-display font-black uppercase tracking-tighter group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#0F172A] text-[#21D469] flex items-center justify-center group-hover:bg-[#21D469] group-hover:text-[#0F172A] transition-all">
                      <ChevronRight size={16} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="aspect-square rounded-[4rem] overflow-hidden shadow-premium relative">
                <img 
                  src={cmsData?.image || "https://images.unsplash.com/photo-1542601063-7ac3b052146d?auto=format&fit=crop&q=80"} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-[#0F172A]/40" />
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl">
                   <div className="text-5xl font-display font-black tracking-tighter text-[#0F172A] mb-2">100%</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-[#21D469]">Renewable Institutional Vision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-40 px-8 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-[#0F172A] rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 text-[300px] font-black text-white/[0.02] select-none pointer-events-none font-display">
               MAP
             </div>
             
             <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
               <div className="space-y-12">
                 <SectionLabel text="GLOBAL REACH" />
                  <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                    {cmsData?.story_title?.split(' ')[0] || '40'} Sovereign <br />
                    <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.story_title?.split(' ').slice(1).join(' ') || 'Nations Unified.'}</span>
                  </h2>
                  <p className="text-xl font-medium italic opacity-60 leading-relaxed max-w-md">
                    {cmsData?.story_description || 'From Ahmedabad to New York, our network creates a unified global voice for sustainable education.'}
                  </p>
                 <div className="flex gap-12">
                   <div className="space-y-2">
                     <div className="text-4xl font-display font-black tracking-tighter text-[#21D469]">2,200+</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Institutions</div>
                   </div>
                   <div className="space-y-2">
                     <div className="text-4xl font-display font-black tracking-tighter text-[#21D469]">70,000+</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Personnel</div>
                   </div>
                 </div>
               </div>
               
               <div className="flex items-center justify-center">
                 <div className="relative">
                    <Globe2 size={400} className="text-[#21D469] opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Zap size={80} className="text-[#21D469]" />
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 lg:px-16 text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <SectionLabel text="ACTION GATEWAY" color={COLORS.sage} />
            <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9]">
               {cmsData?.cta_title?.split(' ')[0] || 'Scale'} <br />
               <span className="text-[#21D469]">{cmsData?.cta_title?.split(' ').slice(1).join(' ') || 'Your Impact.'}</span>
            </h2>
            <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
               {cmsData?.cta_description || 'Join our global registry of verified sustainable institutions and begin your transition today.'}
            </p>
            <div className="flex justify-center pt-8">
               <Link href={cmsData?.button_link || "/contact"}>
                  <button className="bg-[#0F172A] text-white px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d group">
                     {cmsData?.button_text || 'Engage Protocol'} <MousePointer2 className="inline ml-4 group-hover:translate-x-2 transition-transform" />
                  </button>
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
