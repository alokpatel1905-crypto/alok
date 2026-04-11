'use client';

import React, { useState, useEffect } from 'react';
import { Network, Globe, Users, Share2, Building2, GraduationCap, UserCheck, Crown, Lightbulb, Target, ArrowRight, Zap, Combine, Leaf, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NETWORKS = [
  {
    id: "schools",
    title: "Global Green Schools Network",
    subtitle: "Connecting Schools Advancing Sustainability in Practice",
    desc: "Connects leading schools unequivocally committed to environmental responsibility, green learning ecosystems, and campus transformation. We actively enable the sharing of best practices, peer inspiration, and collaborative growth to build a highly active global community shaping climate-conscious student learning.",
    icon: <Building2 className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    color: "teal"
  },
  {
    id: "university",
    title: "Global Green University Network",
    subtitle: "Advancing Sustainable Higher Education Through Collaboration",
    desc: "Brings together elite universities integrating sustainability deeply into academics, research, governance, and campus operations. This network aggressively supports high-level academic dialogue, stringent benchmarking, and strategic cross-border partnerships that strengthen global leadership in higher education.",
    icon: <GraduationCap className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    color: "teal"
  },
  {
    id: "teacher",
    title: "Global Green Teacher Network",
    subtitle: "Empowering Educators Through Shared Learning and Leadership",
    desc: "Functionally connects teachers absolutely committed to sustainability-led teaching paradigms. This network actively encourages the rigorous exchange of progressive pedagogy, actionable practices, and classroom innovation, fiercely supporting educators as leaders of community transformation.",
    icon: <UserCheck className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    color: "teal"
  },
  {
    id: "graduates",
    title: "Global Green Graduates Network",
    subtitle: "A Community of Future-Ready Changemakers",
    desc: "Unites ambitious graduates prepared to lead practically in sustainability, responsible innovation, and the burgeoning green economy. It strategically builds long-term community presence, executive visibility, and active collaboration among emerging leaders to strengthen the transition into real-world impact.",
    icon: <Crown className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    color: "teal"
  },
  {
    id: "innovator",
    title: "Global Green Innovator Network",
    subtitle: "Connecting Innovation with Sustainable Educational Futures",
    desc: "A nexus expressly bringing together systemic innovators, visionary thinkers, and solution-builders working at the critical intersection of sustainability and education. Through collective engagement, we dynamically help amplify and deploy practical innovations bearing profound global relevance.",
    icon: <Lightbulb className="w-10 h-10 text-teal-600" strokeWidth={1.5} />,
    color: "teal"
  }
];

const WHY_JOIN = [
  { title: "Global Collaboration", text: "Direct access to international collaborative ecosystems.", icon: <Globe className="w-6 h-6" /> },
  { title: "Shared Learning", text: "Exchange proven, high-value pedagogical and operational practices.", icon: <Share2 className="w-6 h-6" /> },
  { title: "Institutional Visibility", text: "Solidify global positioning amongst elite educational ranks.", icon: <Target className="w-6 h-6" /> },
  { title: "Peer Inspiration", text: "Continuous mutual recognition and dynamic structural engagement.", icon: <Users className="w-6 h-6" /> }
];

const PARTICIPATION_FLOW = [
  { step: "1", title: "Choose Network", desc: "Select the ecosystem alignment best fitting your institution or profile." },
  { step: "2", title: "Submit Registration", desc: "Complete our thorough integration and validation application." },
  { step: "3", title: "Connect & Collaborate", desc: "Gain immediate access to international working groups and databases." },
  { step: "4", title: "Global Growth", desc: "Co-create actionable solutions escalating global impact." }
];

export default function NetworksPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAF9F6] font-sans text-slate-800 selection:bg-teal-200 selection:text-teal-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-32 px-8 overflow-hidden bg-slate-900 border-b-4 border-teal-600 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-emerald-950 to-slate-950" />
        
        {/* CSS Abstract Node Network Background */}
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 opacity-20">
            {/* Some decorative glowing nodes */}
            <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_20px_4px_rgba(45,212,191,0.5)]" />
            <div className="absolute top-[60%] left-[10%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_20px_4px_rgba(52,211,153,0.5)]" />
            <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_20px_4px_rgba(45,212,191,0.5)]" />
            <div className="absolute top-[70%] right-[15%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_20px_4px_rgba(52,211,153,0.5)]" />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-teal-400">Networks</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-teal-900/50 text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.2)]">
            <Network size={14} className="text-teal-400" />
            Global Networks
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Building a Global Community <br className="hidden md:block"/> for Sustainable Education
          </h1>
          
          <p className="text-xl font-medium text-slate-300 max-w-3xl leading-relaxed">
            The Green Mentors network meticulously connects schools, universities, leading teachers, graduates, innovators, and partner institutions to forcefully accelerate climate-conscious transformation across global education.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white relative">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-8">
                <Globe className="w-8 h-8 text-teal-600" />
             </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.8]">
              Networks are the critical infrastructure of institutional acceleration. Collaboration deliberately compounds learning, rapidly scales operational innovation, and amplifies mutual visibility. Green Mentors uniquely engineers robust platforms where disparate communities across countries can fluidly connect, seamlessly share, and powerfully co-create actionable solutions.
            </p>
          </div>
        </section>

        {/* 8. Highlight Strip */}
        <div className="bg-[#FAF9F6] border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-10 flex justify-center flex-wrap gap-x-12 gap-y-6">
            {["Global Community", "Shared Learning", "Institutional Collaboration", "Ecosystem Visibility", "Sustainability Leadership"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-xs uppercase tracking-[0.15em]">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Network Categories (Core Section) */}
        <section className="py-32 px-8 bg-white" id="categories">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Active Global Nodes</h2>
               <p className="mt-4 text-lg text-slate-500 font-medium">Find your dedicated institutional or individual community.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {NETWORKS.map((network, idx) => (
                <div key={network.id} className={cn(
                  "bg-white border border-slate-200 rounded-[2.5rem] p-10 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500 flex flex-col h-full group",
                  idx === NETWORKS.length - 1 && NETWORKS.length % 2 !== 0 ? "lg:col-span-2 lg:max-w-4xl lg:mx-auto lg:w-full" : ""
                )}>
                  
                  <div className="flex items-center justify-between mb-8">
                     <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                       {network.icon}
                     </div>
                     <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                         <div className="w-2 h-2 rounded-full bg-teal-500"/>
                         <div className="w-2 h-2 rounded-full bg-teal-500"/>
                         <div className="w-2 h-2 rounded-full bg-teal-500"/>
                     </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-teal-700 transition-colors">{network.title}</h3>
                    <h4 className="text-sm font-bold text-emerald-600 mb-6 uppercase tracking-widest">{network.subtitle}</h4>
                    <p className="text-slate-600 font-medium leading-[1.8] mb-10 max-w-xl">
                      {network.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-teal-600 hover:-translate-y-0.5 transition-all shadow-xl shadow-slate-900/10 text-center">
                      Join the Network
                    </button>
                    <button className="bg-slate-50 text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:border-teal-300 hover:bg-white transition-all text-center">
                      Know More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Global Community Visual Section */}
        <section className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-900 to-slate-900" />
           <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">A Global Community in Motion</h2>
              <p className="text-lg text-slate-400 font-medium mb-12 max-w-2xl mx-auto">
                 The Green Mentors network operates uninterrupted across borders, uniting progressive institutions through a synchronized, climate-conscious mission.
              </p>
              
              {/* Abstract Tailwind Visualization */}
              <div className="relative h-64 md:h-96 w-full max-w-4xl mx-auto border border-slate-800 rounded-3xl bg-slate-950/50 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                 {/* Decorative connecting lines and nodes */}
                 <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M20,50 Q40,20 60,50 T100,20" fill="none" stroke="#0d9488" strokeWidth="0.5" className="animate-pulse" />
                    <path d="M0,80 Q30,40 70,70 T100,50" fill="none" stroke="#047857" strokeWidth="0.5" />
                 </svg>
                 <div className="flex flex-wrap gap-4 justify-center relative z-10 p-8">
                     {["United States", "India", "United Kingdom", "Australia", "Canada", "Singapore", "Japan", "Brazil", "South Africa", "UAE"].map((country, idx) => (
                         <span key={idx} className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs font-bold tracking-widest uppercase hover:bg-teal-900 hover:border-teal-500 cursor-default transition-all shadow-[0_0_10px_rgba(13,148,136,0.1)]">
                             {country}
                         </span>
                     ))}
                 </div>
              </div>
           </div>
        </section>

        {/* 4 & 5. Why Join & Collective Impact Container */}
        <section className="py-32 px-8 bg-white relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            
            {/* 4. Why Join */}
            <div>
              <div className="inline-flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4">
                <Network size={16} /> Ecosystem Advantage
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-10">Why Join the Network?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_JOIN.map((benefit, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 group">
                    <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-teal-600 mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-teal-100 transition-all">
                      {benefit.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. From Connection to Collective Impact */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
                <Combine size={16} /> Systemic Change
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-10">From Connection to Collective Impact</h2>
              
              <div className="space-y-8">
                 <p className="text-lg text-slate-600 font-medium leading-relaxed">
                   Participation explicitly translates connection into measurable institutional value. Schools and universities systematically benchmark and learn from one another, completely eliminating isolated trial and error.
                 </p>
                 
                 <div className="pl-6 border-l-2 border-teal-500 space-y-4">
                    <p className="text-slate-600 font-medium">
                      Educators fluidly exchange academic approaches and rigorous frameworks.
                    </p>
                    <p className="text-slate-600 font-medium">
                      Graduates and corporate innovators rapidly identify collaborative economic opportunities.
                    </p>
                    <p className="text-slate-600 font-medium">
                      Sustained cross-border dialogue inherently strengthens the systemic transition toward global sustainability-led transformation.
                    </p>
                 </div>
              </div>
            </div>

          </div>
        </section>

        {/* 7. Membership / Participation Flow */}
        <section className="py-32 px-8 bg-[#FAF9F6] relative border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">How to Participate</h2>
               <p className="text-lg text-slate-500 font-medium">Streamlined onboarding yielding immediate ecosystem immersion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-0.5 bg-slate-200" />
              
              {PARTICIPATION_FLOW.map((step, idx) => (
                <div key={idx} className="relative flex flex-col pt-12 items-center text-center group">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-[24px] bg-teal-600 border-4 border-white shadow-xl shadow-teal-900/10 flex items-center justify-center font-black text-xl text-white z-10 group-hover:scale-110 group-hover:bg-slate-900 transition-all">
                    {step.step}
                  </div>
                  <div className="bg-white border border-slate-100 rounded-3xl p-8 pt-12 w-full h-full hover:shadow-xl hover:shadow-teal-900/5 transition-all">
                     <h4 className="text-[17px] font-bold text-slate-900 mb-3">{step.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">
                       {step.desc}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Call to Action */}
        <section className="py-32 px-8 bg-teal-950 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-800/40 via-teal-950 to-slate-950" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
              Join the Global Community
            </h2>
            <p className="text-teal-100/90 text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We formally invite elite schools, universities, visionary teachers, graduates, and innovators to structurally become part of a shared movement for rapid sustainability leadership.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="w-full sm:w-auto bg-teal-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-teal-500/20 hover:bg-teal-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                Join a Network <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="w-full sm:w-auto bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 shadow-xl text-center">
                Contact Green Mentors
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
