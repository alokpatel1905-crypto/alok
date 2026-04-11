'use client';

import React, { useState, useEffect } from 'react';
import { Target, Award, ArrowRight, Building2, Globe, TrendingUp, BookOpen, Layers, Users, Leaf, Lightbulb, GraduationCap, Star, BarChart3, ShieldCheck, Handshake } from 'lucide-react';
import Link from 'next/link';

const RANKING_PROGRAMS = [
  {
    title: "Global Green School Ranking",
    subtitle: "Benchmarking Sustainability Leadership in K-12 Education",
    desc: "Recognizes schools explicitly integrating sustainability into core learning, campus culture, environmental practices, and active student engagement. We evaluate institutions on their measurable commitment to climate-conscious education and responsible school transformation, offering a respected platform for global visibility and recognition.",
    color: "emerald",
    icon: <Building2 className="w-8 h-8 text-emerald-700" />
  },
  {
    title: "Global Green University Ranking",
    subtitle: "Celebrating Higher Education Institutions Shaping a Sustainable Future",
    desc: "Provides rigorous benchmarking for universities integrating sustainability across academics, cutting-edge research, campus operations, and societal impact. This ranking positions institutions as apex leaders in environmental responsibility, supporting international recognition and continuous institutional benchmarking.",
    color: "sky",
    icon: <GraduationCap className="w-8 h-8 text-sky-700" />
  },
  {
    title: "National & Regional Green Rankings",
    subtitle: "Strengthening Sustainability Leadership at Local and Regional Levels",
    desc: "Facilitates highly tailored, country-specific or regional benchmarking frameworks. By empowering institutions to map progress within local cultural and infrastructural realities, this ranking champions specialized localized impact while driving overarching global sustainability trajectories.",
    color: "amber",
    icon: <MapIcon className="w-8 h-8 text-amber-700" />
  }
];

// Helper icon
function MapIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

const METHODOLOGY_PILLARS = [
  { title: "Curriculum & Learning", desc: "Integration of climate modules and environmental science into core syllabus.", icon: <BookOpen className="w-6 h-6" /> },
  { title: "Campus Operations", desc: "Energy efficiency, waste management, and sustainable infrastructure metrics.", icon: <SettingsIcon className="w-6 h-6" /> },
  { title: "Environmental Stewardship", desc: "Actionable commitments protecting local biodiversity and ecology.", icon: <Leaf className="w-6 h-6" /> },
  { title: "Innovation & Research", desc: "Volume and impact of academic research advancing green technology.", icon: <Lightbulb className="w-6 h-6" /> },
  { title: "Student Participation", desc: "Active clubs, ecological fellowships, and student-body engagement.", icon: <Users className="w-6 h-6" /> },
  { title: "Community Engagement", desc: "Outreach programs elevating regional environmental awareness.", icon: <Handshake className="w-6 h-6" /> }
];

function SettingsIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  );
}

const VALUE_STRIP = [
  { label: "Global Benchmarking", icon: <Globe size={20} /> },
  { label: "Sustainability Recognition", icon: <Star size={20} /> },
  { label: "Institutional Transformation", icon: <Layers size={20} /> },
  { label: "International Visibility", icon: <EyeIcon size={20} /> }
];

function EyeIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
  );
}

const PARTICIPATION_STEPS = [
  { step: "1", title: "Submit Application", desc: "Register institution and profile metrics." },
  { step: "2", title: "Institutional Review", desc: "Self-assessment submission and audit." },
  { step: "3", title: "Assessment Against Framework", desc: "Expert verification of sustainability credentials." },
  { step: "4", title: "Publication", desc: "Global ranking announcement and recognition." }
];

export default function RankingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-24 px-8 overflow-hidden bg-slate-900 border-b border-emerald-900/50 text-white">
        {/* Subtle institutional background gradient/glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-slate-900 to-emerald-900/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Rankings</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <Award size={14} className="text-amber-500" />
            Global Rankings
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Recognizing Leadership <br/> in Sustainable Education
          </h1>
          
          <p className="text-xl font-medium text-slate-400 max-w-3xl leading-relaxed">
            Green Mentors rankings spotlight schools and universities actively advancing sustainability, setting the global benchmark for environmental responsibility and climate-conscious institutional leadership.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white border-b border-slate-100">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-slate-600 leading-[1.8] font-medium max-w-4xl mx-auto border-y border-slate-100 py-12 px-4 shadow-sm rounded-[3rem] shadow-slate-100/50 bg-slate-50/50">
              Rankings in sustainability-led education serve as powerful catalysts. Benchmarking empowers institutions to <span className="text-emerald-700 font-bold bg-emerald-50 px-1 rounded">measure their progress</span> with clarity, while global recognition drives continuous innovation, accountability, and unparalleled leadership. We support institutions in seamlessly aligning their ecosystems with highly demanded, future-ready environmental goals.
            </p>
          </div>
        </section>

        {/* 6. Featured Credibility / Impact Strip */}
        <div className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-8 py-8 flex items-center justify-center flex-wrap gap-x-12 gap-y-6">
            {VALUE_STRIP.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm uppercase tracking-widest">
                <span className="text-emerald-600">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Ranking Programs */}
        <section className="py-32 px-8 bg-white" id="programs">
          <div className="max-w-7xl mx-auto space-y-16">
            {RANKING_PROGRAMS.map((program, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
                
                <div className={`w-32 h-32 lg:w-48 lg:h-48 shrink-0 bg-${program.color}-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-${program.color}-900/10 group-hover:scale-110 transition-transform duration-500`}>
                  {program.icon}
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">{program.title}</h2>
                  <h3 className={`text-sm md:text-base font-bold text-${program.color}-600 mb-6 uppercase tracking-[0.2em] inline-block pb-2 border-b-2 border-${program.color}-200`}>
                    {program.subtitle}
                  </h3>
                  <p className="text-lg text-slate-500 font-medium leading-[1.8] mb-10 max-w-3xl">
                    {program.desc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link href="#apply" className={`bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-${program.color}-700 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-slate-900/10`}>
                      Apply for Ranking
                    </Link>
                    <button className="bg-white text-slate-600 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300">
                      Know More
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 4. Why Participate & 5. Methodology Combined Layout */}
        <section className="py-32 px-8 bg-slate-900 text-white relative border-t-8 border-amber-500">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            
            {/* Why Participate */}
            <div>
              <div className="inline-flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                <Target size={16} /> Benefit Analysis
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">Why Participate?</h2>
              
              <ul className="space-y-6">
                {[
                  "Unprecedented global recognition tied to institutional excellence.",
                  "Objective benchmarking against elite global counterparts.",
                  "Elevated sustainability visibility to prospective students and staff.",
                  "Definitive institutional credibility validated by green auditing.",
                  "Integration vectors unlocking stronger strategic future planning.",
                  "Solidifying an unquestionable future-ready global positioning."
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                    <span className="text-slate-300 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ranking Methodology Overview */}
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                <BarChart3 size={16} /> Data Framework
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">Ranking Methodology</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {METHODOLOGY_PILLARS.map((pillar, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 group hover:border-emerald-500/50 transition-colors">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 group-hover:bg-emerald-900 group-hover:border-emerald-700 transition-all">
                      {pillar.icon}
                    </div>
                    <h4 className="font-bold text-slate-100 mb-2">{pillar.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 7. Participation Flow / Process */}
        <section className="py-32 px-8 bg-slate-50 relative border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">Structured Assessment Process</h2>
              <p className="text-lg text-slate-500 font-medium">Clear, transparent, and rigorous multi-stage qualification frameworks.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="hidden md:block absolute top-[52px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-emerald-100 via-amber-100 to-sky-100" />
              
              {PARTICIPATION_STEPS.map((step, idx) => (
                <div key={idx} className="relative flex flex-col text-center md:text-left bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all group pt-16">
                  <div className="absolute top-0 right-8 md:left-8 -translate-y-1/2 w-16 h-16 rounded-2xl bg-white border-4 border-slate-50 flex items-center justify-center font-black text-2xl text-slate-800 shadow-lg group-hover:border-emerald-100 group-hover:text-emerald-600 transition-colors">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="py-32 px-8 bg-emerald-900 relative overflow-hidden" id="apply">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-600/30 via-emerald-900 to-slate-950" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjMDU5NjY5IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tight mb-8">
              Showcase Your Sustainability Leadership
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We highly invite discerning schools, universities, and educational institutions worldwide to join the ranking ecosystem and gain globally validated recognition for operational excellence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-amber-500 text-amber-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                Apply for Ranking <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="w-full sm:w-auto bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 focus:outline-none shadow-xl">
                Contact Green Mentors
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}