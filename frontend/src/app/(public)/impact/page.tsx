'use client';

import React, { useState, useEffect } from 'react';
import { Target, Building, BookOpen, Users, Globe, ArrowRight, BarChart3, TrendingUp, Sparkles, Sprout, Network, LineChart, Globe2 } from 'lucide-react';
import Link from 'next/link';

const STATS = [
  { value: "8,000+", label: "Schools & Universities", icon: <Building className="text-emerald-700 w-10 h-10 mb-4" strokeWidth={1.2} /> },
  { value: "50,000+", label: "Educators Trained", icon: <BookOpen className="text-teal-600 w-10 h-10 mb-4" strokeWidth={1.2} /> },
  { value: "10 Million", label: "Students Empowered", icon: <Users className="text-sky-600 w-10 h-10 mb-4" strokeWidth={1.2} /> },
  { value: "45", label: "Countries Reached", icon: <Globe className="text-emerald-500 w-10 h-10 mb-4" strokeWidth={1.2} /> }
];

const HIGHLIGHT_CARDS = [
  { title: "Climate-Conscious Learning", icon: <Sprout className="w-5 h-5" />, desc: "Integrating environmental responsibility directly into core curricula." },
  { title: "Institutional Transformation", icon: <Building className="w-5 h-5" />, desc: "Upgrading campus operations to function as living laboratories." },
  { title: "Global Collaboration", icon: <Network className="w-5 h-5" />, desc: "Connecting ecosystems across borders to accelerate impact." },
  { title: "Future-Ready Students", icon: <Sparkles className="w-5 h-5" />, desc: "Equipping graduates with the skills to lead sustainable societies." }
];

export default function ImpactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-12 pb-24 px-8 overflow-hidden bg-slate-50 border-b border-emerald-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/70 to-slate-50/30 -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-700">Impact</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Target size={14} className="text-emerald-600" />
            Global Impact
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Transforming Education <br/> for the Planet
          </h1>
          
          <p className="text-xl font-medium text-slate-500 max-w-2xl leading-relaxed">
            Advancing a unified mission to transform education systems worldwide through sustainability and climate-conscious learning.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Impact Statistics Section */}
        <section className="py-24 px-8 bg-white border-b border-slate-100 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Global Impact at a Glance</h2>
              <p className="text-lg text-slate-500 font-medium">Measurable outcomes driving systemic change worldwide.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STATS.map((stat, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[2rem] p-10 flex flex-col items-center text-center hover:bg-white hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2 group">
                  <div className="group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out">
                    {stat.icon}
                  </div>
                  <h4 className="text-4xl lg:text-[40px] font-black text-emerald-900 mb-3 tracking-tight group-hover:text-emerald-700 transition-colors">{stat.value}</h4>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Visual Data / Graphics Section */}
        <section className="py-24 px-8 bg-slate-900 text-slate-300 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-800 pb-10">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-3">
                  <BarChart3 className="w-4 h-4" /> Impact Visualization
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Data-Driven Growth</h2>
              </div>
              <p className="text-slate-400 font-medium max-w-md text-right hidden md:block">
                Mapping out planetary impact through localized educational reform and international alliances.
              </p>
            </div>

            {/* Abstract Tailwind Dashboard Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden min-h-[400px] flex items-center justify-center group pointer-events-none">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-400 via-slate-900 to-slate-900" />
                <Globe2 className="absolute w-[800px] h-[800px] text-emerald-900/40 -right-[200px] -bottom-[200px] group-hover:scale-105 transition-transform duration-[20s] ease-linear" strokeWidth={0.5} />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_30px_10px_rgba(16,185,129,0.3)] animate-pulse mb-8" />
                  <div className="grid grid-cols-3 gap-8 w-full max-w-lg">
                    <div className="h-40 flex items-end gap-3 justify-center">
                      <div className="w-12 bg-emerald-800/50 rounded-t-lg h-1/4" />
                      <div className="w-12 bg-emerald-700/50 rounded-t-lg h-2/4" />
                      <div className="w-12 bg-emerald-500 rounded-t-lg h-full" />
                    </div>
                  </div>
                  <p className="text-emerald-400 text-sm font-bold tracking-widest uppercase mt-8 border-b border-emerald-500/30 pb-2 inline-block">Global Uptake</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-6">
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex-grow flex flex-col justify-center relative overflow-hidden">
                  <LineChart className="absolute -right-10 -bottom-10 w-48 h-48 text-teal-900/30" />
                  <h4 className="text-4xl font-black text-white mb-2 relative z-10">45<span className="text-teal-500">.</span></h4>
                  <p className="text-teal-400 text-xs font-bold uppercase tracking-widest relative z-10 block mb-4 border-b border-slate-700 pb-4">Countries Active</p>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">Expanded network influence reaching deep into the Global South and mature economies.</p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 flex-grow flex flex-col justify-center relative overflow-hidden">
                  <TrendingUp className="absolute -right-10 -bottom-10 w-48 h-48 text-sky-900/30" />
                  <h4 className="text-4xl font-black text-white mb-2 relative z-10">400<span className="text-sky-500">%</span></h4>
                  <p className="text-sky-400 text-xs font-bold uppercase tracking-widest relative z-10 block mb-4 border-b border-slate-700 pb-4">Program Growth</p>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">Rapid adoption of Green Graduate and Fellowship programs over 3 years.</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Why Greening Education Matters */}
        <section className="py-32 px-8 bg-slate-50 relative">
          <div className="absolute top-0 right-0 w-1/3 bg-emerald-50 h-full -z-10 rounded-l-[100px]" />
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">Why Greening Education Matters</h2>
              
              <div className="space-y-6 text-lg text-slate-600 leading-[1.8] font-medium">
                <p>
                  Global challenges such as <strong className="text-slate-800">climate change, poverty, inequality, conflict, and unemployment</strong> are deeply interconnected. Addressing them requires a fundamental rethinking of how we prepare the next generation.
                </p>
                <p>
                  Traditional education systems often lack sustainability integration, teaching isolated subjects rather than systemic thinking. We believe <strong className="bg-emerald-100/50 text-emerald-900 px-2 rounded">Greening education addresses these root causes</strong> directly by shaping responsible thinking, critical skills, and ethical leadership.
                </p>
                <p className="pl-6 border-l-4 border-emerald-400 text-emerald-800 font-semibold my-8 py-2">
                  Schools and universities must become living laboratories of sustainability, where students learn through both theory and real-world application.
                </p>
                <p>
                  Ultimately, greening education prepares a fearless generation fully capable of building peaceful, equitable, and climate-resilient societies for decades to come.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 w-full h-[500px] border border-slate-200 bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 p-12 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent" />
               <div className="relative z-10">
                 <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-8">
                   <Target className="w-8 h-8" />
                 </div>
                 <h3 className="text-2xl font-bold text-slate-800 mb-4">The Solution Catalyst</h3>
                 <p className="text-slate-500 font-medium leading-relaxed mb-8">
                   Environmental integration serves as the ultimate catalyst, turning passive classrooms into dynamic hubs for global solutions.
                 </p>
                 <div className="flex flex-col gap-4">
                   <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                     <span className="w-8 h-px bg-emerald-300" /> Theory
                   </div>
                   <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-emerald-700">
                     <span className="w-16 h-px bg-emerald-500" /> Real-World Action
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* 5. Impact Story / Narrative Block */}
        <section className="py-24 px-8 bg-white border-y border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-8">Driving Systemic Change Through Education</h2>
            <p className="text-xl text-slate-500 font-medium leading-[1.8]">
              Green Mentors actively enables institutions globally to embed comprehensive sustainability frameworks. Through our guided pathways, students gain practical exposure to local environmental realities, educators are elevated into climate change-makers, and entire academic systems shift permanently toward responsible, regenerative education.
            </p>
          </div>
        </section>

        {/* 6. Mini Highlight Cards */}
        <section className="py-24 px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {HIGHLIGHT_CARDS.map((card, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col items-center text-center group">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    {card.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3">{card.title}</h4>
                  <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Call to Action */}
        <section className="py-32 px-8 bg-emerald-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjMDU5NjY5IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Be Part of the Global Impact
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We invite schools, universities, educators, and global organizations to join the movement. Together, we can shape the future of planetary education.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold shadow-xl shadow-black/10 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20">
                Join Green Mentors
              </Link>
              <Link href="/accreditation" className="w-full sm:w-auto bg-emerald-800 text-white border border-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 hover:border-emerald-600 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-700/50 flex justify-center items-center gap-2">
                Explore Programs <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
