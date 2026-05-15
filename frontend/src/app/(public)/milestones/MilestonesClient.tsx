'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CalendarDays, Award, Star, History, Target, ChevronRight, Zap } from 'lucide-react';

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

export default function MilestonesClient({ page, list }: { page: any, list: any[] }) {
  const activeMilestones = list.filter((m: any) => !m.status || m.status === 'Active' || m.status === 'PUBLISHED');

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#21D469]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="OUR JOURNEY" />
          <h1 className="text-[clamp(50px,10vw,150px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
            {page.page_title || 'Historic'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">Milestones.</span>
          </h1>
          {page.intro_description && (
            <p className="text-2xl font-serif italic text-[#0F172A]/60 leading-relaxed max-w-3xl border-l-4 border-[#21D469] pl-12">
              {page.intro_description}
            </p>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-8 lg:px-16 overflow-hidden">
        <div className="max-w-[1800px] mx-auto relative">
          {activeMilestones.length === 0 ? (
            <div className="text-center py-40 bg-[#F8FAFC] rounded-[4rem] border border-black/5">
              <History size={80} strokeWidth={0.5} className="mx-auto mb-8 opacity-20" />
              <h3 className="text-3xl font-display font-black uppercase opacity-20 tracking-tighter">Journey in Progress</h3>
            </div>
          ) : (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[1px] bg-black/5 lg:-translate-x-1/2" />
              
              <div className="space-y-40 relative z-10">
                {activeMilestones.map((milestone: any, index: number) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div 
                      key={milestone.id} 
                      className={`relative flex flex-col lg:flex-row items-center gap-12 lg:gap-0 ${isEven ? 'lg:flex-row-reverse' : ''}`}
                    >
                      {/* Node */}
                      <div className="absolute left-6 lg:left-1/2 top-0 lg:top-1/2 transform -translate-x-1/2 lg:-translate-y-1/2 w-4 h-4 bg-white border-2 border-[#21D469] rounded-full z-30 shadow-3d" />

                      {/* Content */}
                      <div className={`w-full lg:w-1/2 pl-16 lg:pl-0 ${isEven ? 'lg:pl-24' : 'lg:pr-24'}`}>
                        <div className="group p-12 lg:p-16 bg-white border border-black/5 rounded-[4rem] shadow-premium hover:border-[#21D469] transition-all duration-700">
                          <div className="flex items-center justify-between mb-8">
                            <div className="text-6xl font-display font-black tracking-tighter text-[#21D469]">
                              {milestone.year}
                            </div>
                            <Zap size={40} strokeWidth={1} className="opacity-20 group-hover:opacity-100 group-hover:text-[#FACC15] transition-all" />
                          </div>
                          {milestone.title && (
                            <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-8 leading-none">
                              {milestone.title}
                            </h3>
                          )}
                          <p className="text-xl font-medium italic opacity-60 leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>

                      {/* Spacer for desktop */}
                      <div className="hidden lg:block lg:w-1/2" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-white/[0.02] select-none pointer-events-none font-display">
          GROW
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <SectionLabel text="JOIN THE EVOLUTION" color={COLORS.sage} />
          <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase">
            Write the <br />
            <span className="text-[#21D469]">Future.</span>
          </h2>
          <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
            Become part of the global movement transitioning education toward environmental resilience.
          </p>
          <div className="flex justify-center pt-8">
            <button className="bg-[#21D469] text-[#0F172A] px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-3d">
              {page.button_text || 'Register Protocol'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

