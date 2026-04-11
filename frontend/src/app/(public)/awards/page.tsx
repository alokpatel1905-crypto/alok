'use client';

import React, { useState, useEffect } from 'react';
import { Award, Trophy, Star, Medal, ArrowRight, ShieldCheck, CheckCircle2, Crown, Sparkles, Building2, GraduationCap, Lightbulb, BookOpen, UserCheck, Settings } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const AWARDS = [
  {
    id: "school",
    title: "Green School Award",
    subtitle: "Recognizing Schools Leading Environmental Transformation",
    desc: "Celebrates schools integrating sustainability into core learning, campus culture, environmental stewardship, and student engagement. This award recognizes institutions actively creating climate-conscious and responsible learning environments, highlighting practical, measurable school-wide transformation.",
    icon: <Building2 className="w-10 h-10 text-amber-500" strokeWidth={1.5} />,
    color: "amber"
  },
  {
    id: "university",
    title: "Green University Award",
    subtitle: "Celebrating Higher Education Institutions Driving Sustainable Change",
    desc: "Recognizes universities advancing sustainability explicitly through academics, cutting-edge research, campus operations, innovation, and community engagement. This honors institutions effectively shaping the future of responsible higher education on a global stage.",
    icon: <GraduationCap className="w-10 h-10 text-amber-500" strokeWidth={1.5} />,
    color: "amber"
  },
  {
    id: "teacher",
    title: "Green Teacher Award",
    subtitle: "Honoring Educators Inspiring Climate-Conscious Learning",
    desc: "Celebrates exceptional teachers integrating sustainability, critical thinking, and environmental responsibility deeply into their teaching. This award honors educators who inspire students to actively think and act for a better planetary future.",
    icon: <UserCheck className="w-10 h-10 text-amber-500" strokeWidth={1.5} />,
    color: "amber"
  },
  {
    id: "graduate",
    title: "Green Graduate Award",
    subtitle: "Recognizing Emerging Leaders for a Sustainable Future",
    desc: "Honors recent graduates demonstrating exceptional commitment to sustainability, innovation, and responsible leadership. We celebrate young changemakers contributing tangibly to environmental and social progress, positioning them as future-ready leaders.",
    icon: <Crown className="w-10 h-10 text-amber-500" strokeWidth={1.5} />,
    color: "amber"
  },
  {
    id: "innovator",
    title: "Green Innovator Award",
    subtitle: "Celebrating Creative Solutions for Sustainable Education",
    desc: "Recognizes brilliant innovators developing ideas, tools, systems, or practices that substantially advance sustainability within education. We celebrate applied creativity, structural leadership, and high-impact problem-solving for global environmental challenges.",
    icon: <Lightbulb className="w-10 h-10 text-amber-500" strokeWidth={1.5} />,
    color: "amber"
  },
  {
    id: "curriculum",
    title: "Curriculum Award",
    subtitle: "Recognizing Excellence in Sustainability-Integrated Learning",
    desc: "Honors comprehensive curriculum models and academic frameworks that successfully embed environmental responsibility. This recognizes institutions and educators shaping highly effective, future-ready educational content pushing long-term systemic change.",
    icon: <BookOpen className="w-10 h-10 text-amber-500" strokeWidth={1.5} />,
    color: "amber"
  }
];

const WHY_RECOGNITION_MATTERS = [
  { title: "Showcases Best Practices", desc: "Highlights operational and academic excellence for global replication." },
  { title: "Encourages Innovation", desc: "Drives institutions to push the boundaries of green education continuously." },
  { title: "Institutional Visibility", text: "Drastically strengthens the global prestige of participating schools and universities." },
  { title: "Builds Credibility", text: "Validates long-term commitments to global sustainability-led frameworks." }
];

const NOMINATION_PROCESS = [
  { step: "1", title: "Submit Nomination", desc: "Detailed institutional alignment and supporting evidence." },
  { step: "2", title: "Review & Evaluation", desc: "Preliminary screening of submitted operational metrics." },
  { step: "3", title: "Jury Assessment", desc: "Expert panel analysis verifying actual sustainability impact." },
  { step: "4", title: "Recognition", desc: "Prestigious global awarding and continued network collaboration." }
];

export default function AwardsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAF9F6] font-sans text-slate-800 selection:bg-amber-200 selection:text-amber-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-32 px-8 overflow-hidden bg-slate-900 border-b-8 border-amber-500 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-slate-900 to-slate-950" />
        <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=')]" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-amber-400">Awards</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-amber-900/50 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Trophy size={14} className="text-amber-500" />
            Global Awards
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Honoring Leadership in <br className="hidden md:block"/> Sustainable Education
          </h1>
          
          <p className="text-xl font-medium text-slate-400 max-w-3xl leading-relaxed">
            The Green Mentors Awards formally celebrate institutions, distinct educators, outstanding graduates, innovators, and changemakers actively advancing global sustainability through transformative education.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white border-b border-slate-100 relative">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-8 shadow-sm">
                <Medal className="w-8 h-8 text-amber-600" />
             </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.8]">
              Targeted recognition matters profoundly in sustainability-led education. It structurally inspires supreme leadership, elevates institutional visibility, and crucially drives the replication of proven best practices. At Green Mentors, we honor these massive collaborative commitments transcending schools, universities, visionary educators, and dedicated students worldwide.
            </p>
          </div>
        </section>

        {/* 6. Featured Honors / Recognition Strip */}
        <div className="bg-[#FAF9F6] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-10 flex justify-center flex-wrap gap-x-12 gap-y-6">
            {["Institutional Excellence", "Educator Leadership", "Youth Recognition", "Innovation for Impact", "Sustainability in Practice"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-xs uppercase tracking-[0.15em]">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Award Categories (Core Section) */}
        <section className="py-32 px-8 bg-white" id="categories">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Prestigious Categories</h2>
               <div className="w-24 h-1 bg-amber-500 mx-auto mt-8 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {AWARDS.map((award, idx) => (
                <div key={award.id} className="bg-[#FAF9F6] border border-slate-200 rounded-[2.5rem] p-10 hover:bg-white hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-900/5 transition-all duration-500 group flex flex-col h-full relative overflow-hidden">
                  
                  {/* Subtle decorative background icon */}
                  <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-amber-900 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                    {award.icon}
                  </div>

                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md shadow-amber-900/5 border border-amber-100 mb-8 z-10 group-hover:-translate-y-1 transition-transform">
                    {award.icon}
                  </div>
                  
                  <div className="flex-grow z-10">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-amber-700 transition-colors">{award.title}</h3>
                    <h4 className="text-sm font-bold text-amber-600 mb-6 uppercase tracking-widest">{award.subtitle}</h4>
                    <p className="text-slate-600 font-medium leading-[1.8] mb-10">
                      {award.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto z-10">
                    <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-amber-600 hover:-translate-y-0.5 transition-all shadow-xl shadow-slate-900/10">
                      Nominate Now
                    </button>
                    <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:border-amber-600 hover:text-amber-800 hover:bg-amber-50 transition-all">
                      Know More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Why These Awards Matter */}
        <section className="py-32 px-8 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">
                <Crown size={16} /> Ecosystem Value
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Why Recognition Matters</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_RECOGNITION_MATTERS.map((benefit, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-3xl p-8 hover:border-amber-500/50 hover:bg-slate-800/80 transition-colors group">
                  <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-100 text-lg mb-3">{benefit.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">
                    {benefit.desc || benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Nomination / Selection Process */}
        <section className="py-32 px-8 bg-[#FAF9F6] relative border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">How the Awards Process Works</h2>
                <p className="text-lg text-slate-500 font-medium">A transparent, rigorous, and mission-aligned global evaluation system.</p>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100 text-sm">
                <ShieldCheck size={18} /> Verified by Global Jury
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-slate-200 via-amber-200 to-emerald-200" />
              
              {NOMINATION_PROCESS.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-100 shadow-xl shadow-amber-900/10 flex items-center justify-center font-black text-2xl text-amber-600 mb-6 relative z-10 group-hover:scale-110 group-hover:border-amber-400 transition-all">
                    {step.step}
                  </div>
                  <h4 className="text-[17px] font-bold text-slate-900 mb-3 px-4">{step.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. Call to Action */}
        <section className="py-32 px-8 bg-emerald-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-600/20 via-emerald-900 to-slate-950" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500 text-amber-950 mb-8 border-4 border-amber-400/50 shadow-2xl shadow-amber-900/50 animate-bounce-slow">
              <Award className="w-10 h-10" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
              Celebrate Leadership That Shapes the Future
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We highly encourage schools, universities, educators, graduates, and innovators to participate in the prestigious Green Mentors awards ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="w-full sm:w-auto bg-amber-500 text-amber-950 px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                Submit a Nomination <ArrowRight className="w-5 h-5" />
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
