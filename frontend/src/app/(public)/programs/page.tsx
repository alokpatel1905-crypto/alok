'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  School, GraduationCap, Users, Award, BookOpen, Search, 
  ChevronRight, ArrowRight, CheckCircle2, ShieldCheck, Zap, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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

const PROGRAMS = [
  {
    title: 'Green School',
    subtitle: 'Campus Transformation',
    desc: 'Converting existing schools into nature-inspired, zero-carbon educational ecosystems. Focusing on infrastructure and circular design.',
    icon: School,
    features: ['Solar Integration', 'Zero Waste Policy', 'Eco-Design', 'Sustainable Transport']
  },
  {
    title: 'Green University',
    subtitle: 'Higher Ed Leadership',
    desc: 'Transitioning universities into global benchmarks for sustainability and institutional environmental stewardship.',
    icon: GraduationCap,
    features: ['Carbon Auditing', 'Sustainable Research', 'Green Campus Policy', 'Energy Efficiency']
  },
  {
    title: 'Green Teacher Training',
    subtitle: 'Empowering Educators',
    desc: 'Upskilling the world\'s teaching community with climate-conscious pedagogical skills and sustainable classroom management.',
    icon: Users,
    features: ['Eco-Pedagogy', 'Sustainable Curriculum', 'Action Learning', 'Teacher Certification']
  },
  {
    title: 'Green Graduate Program',
    subtitle: 'Future Workforce',
    desc: 'Preparing the next generation of graduates for the global green economy and high-demand climate-focused careers.',
    icon: Award,
    features: ['Green Skills', 'Industry Connect', 'Environmental Ethics', 'Career Mentorship']
  },
  {
    title: 'Green Curriculum',
    subtitle: 'Nature-Inspired Learning',
    desc: 'Designing nature-mimicking curricula that integrate sustainability across all subjects, aligned with UN SDGs.',
    icon: BookOpen,
    features: ['SDG Alignment', 'Interdisciplinary', 'Project Based', 'Holistic Design']
  },
  {
    title: 'Green Auditing & Verification',
    subtitle: 'Verification & Trust',
    desc: 'A rigorous verification protocol for educational institutions to measure and improve their carbon footprint.',
    icon: Search,
    features: ['Carbon Tracking', 'Performance Matrix', 'Global Ranking', 'Verified Badge']
  }
];

export default function ProgramsPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="OUR PILLARS" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            Strategic <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">Excellence in</span> <br />
            Education.
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            Our comprehensive programs provide the roadmap for educational institutions to transition into globally recognized green leaders.
          </p>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-12">
              <SectionLabel text="THE DIRECTORY" />
              <div className="flex flex-col gap-4">
                {PROGRAMS.map((prog, i) => (
                  <button 
                    key={i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "text-left p-8 rounded-[2rem] transition-all duration-500 flex items-center justify-between group border",
                      active === i 
                        ? "bg-[#0F172A] text-white border-transparent" 
                        : "bg-transparent border-black/5 hover:border-[#21D469] text-[#0F172A]/40 hover:text-[#0F172A]"
                    )}
                  >
                    <span className="text-xl font-display font-black uppercase tracking-tighter">{prog.title}</span>
                    <ArrowUpRight className={cn("transition-transform", active === i ? "translate-x-0" : "translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0")} />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 bg-[#0F172A] text-white rounded-[4rem] p-12 lg:p-24 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-12 text-[300px] font-black text-white/[0.02] select-none pointer-events-none font-display">
                {active + 1}
              </div>

              <div className="relative z-10">
                <div className="w-24 h-24 bg-[#21D469] text-[#0F172A] rounded-3xl flex items-center justify-center mb-12">
                  {React.createElement(PROGRAMS[active].icon, { size: 48 })}
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469] mb-4">{PROGRAMS[active].subtitle}</div>
                <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-12">{PROGRAMS[active].title}</h2>
                <p className="text-3xl font-serif italic opacity-80 leading-relaxed max-w-2xl mb-12">
                  {PROGRAMS[active].desc}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {PROGRAMS[active].features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#21D469]" />
                      <span className="text-sm font-black uppercase tracking-widest">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <Link href="/accreditation" className="w-full md:w-auto">
                  <button className="w-full bg-[#21D469] text-[#0F172A] px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl shadow-[#21D469]/20">
                    Apply for Accreditation
                  </button>
                </Link>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40 italic">
                  UN ECOSOC VERIFIED PROTOCOL // 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-[#FACC15] py-8 overflow-hidden border-y border-black/5">
        <div className="flex whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6 text-[#0F172A]">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Architecture of Sustainability</span>
              <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">verified global benchmarks</span>
              <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">institutional excellence</span>
              <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}