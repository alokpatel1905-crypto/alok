'use client';

import React, { useState, useEffect } from 'react';
import { Target, Award, ArrowRight, Building2, BookOpen, GraduationCap, Users, Globe, Settings, Map, Layout, ShieldCheck, BookmarkCheck, TrendingUp, Cpu } from 'lucide-react';
import Link from 'next/link';

const PROGRAMS = [
  {
    id: "green-school",
    title: "Green School Accreditation",
    subtitle: "Transforming Schools into Living Laboratories of Sustainability",
    desc: "We support schools in deeply integrating sustainability into everyday learning and campus practices. Our framework embeds environmental stewardship, comprehensive climate education, and sustainable campus management directly into the institutional DNA, preparing students from a young age to become climate-conscious citizens and responsible stewards of the planet.",
    icon: <Building2 className="w-8 h-8 text-emerald-700" strokeWidth={1.5} />,
    color: "emerald"
  },
  {
    id: "green-university",
    title: "Green University Accreditation",
    subtitle: "Universities as Catalysts for Sustainable Innovation",
    desc: "Enables higher education institutions to evolve into primary hubs of sustainability leadership, cutting-edge research, and innovation. We evaluate and support the transition of campus operations, research initiatives, community impact, and core curricula to ensure every graduate is thoroughly prepared for the global sustainability transition.",
    icon: <Layout className="w-8 h-8 text-teal-700" strokeWidth={1.5} />,
    color: "teal"
  },
  {
    id: "green-teacher",
    title: "Green Teacher Accreditation",
    subtitle: "Empowering Educators to Shape the Future",
    desc: "Designed to equip teachers with vital knowledge, pedagogical tools, and robust sustainability frameworks. By seamlessly integrating climate change awareness and environmental responsibility into everyday teaching, educators are empowered to inspire critical thinking and responsible environmental action in every classroom.",
    icon: <BookOpen className="w-8 h-8 text-sky-700" strokeWidth={1.5} />,
    color: "sky"
  },
  {
    id: "green-graduate",
    title: "Green Graduate Accreditation",
    subtitle: "Preparing Graduates to Lead the Green Economy",
    desc: "Directly equips graduating students with future-ready green skills highly sought after in the global workforce. Focusing on core pillars like climate action, renewable energy, green finance, and environmental governance, this accreditation develops responsible professionals ready to practically contribute to sustainable development.",
    icon: <GraduationCap className="w-8 h-8 text-indigo-700" strokeWidth={1.5} />,
    color: "indigo"
  },
  {
    id: "green-fellowship",
    title: "Greening Education Fellowship",
    subtitle: "Developing Global Leaders for Sustainable Education",
    desc: "An elite program explicitly supporting educators, researchers, and institutional leaders. The Fellowship provides unprecedented mentorship, access to global networks, and tangible collaboration opportunities to build ultimate leadership capacity for managing and advancing climate-conscious education systems globally.",
    icon: <Users className="w-8 h-8 text-orange-700" strokeWidth={1.5} />,
    color: "orange"
  }
];

const BENEFITS = [
  { title: "Global Recognition", text: "Join an internationally respected network acknowledged by leading UN and educational bodies.", icon: <Globe className="w-6 h-6" /> },
  { title: "Sustainability Integration", text: "Holistic frameworks that permanently embed green practices into institutional DNA.", icon: <Settings className="w-6 h-6" /> },
  { title: "Future-Ready Skills", text: "Equip learners and educators with the exact competencies required for the green economy.", icon: <Cpu className="w-6 h-6" /> },
  { title: "Institutional Transformation", text: "Measurable operational upgrades that turn campuses into living laboratories.", icon: <TrendingUp className="w-6 h-6" /> }
];

const PROCESS = [
  { step: "1", title: "Apply for Accreditation", desc: "Submit your institutional profile and intent." },
  { step: "2", title: "Assessment & Evaluation", desc: "Comprehensive audit of current campus and curriculum practices." },
  { step: "3", title: "Implementation Support", desc: "Guided coaching to integrate target sustainability frameworks." },
  { step: "4", title: "Certification & Recognition", desc: "Official awarding of Green Mentors accreditation status." }
];

export default function AccreditationPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-12 pb-24 px-8 overflow-hidden bg-slate-50 border-b border-emerald-100">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjMDU5NjY5IiBmaWxsLW9wYWNpdHk9IjAuMDUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-700">Accreditation</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Award size={14} className="text-emerald-600" />
            Accreditation Programs
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Transforming Education <br/> Through Accreditation
          </h1>
          
          <p className="text-xl font-medium text-slate-500 max-w-3xl leading-relaxed">
            Green Mentors rigorously evaluates and empowers institutions, fully integrating sustainability directly through structured global accreditation frameworks.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center border-l-4 border-emerald-500 pl-8 md:pl-12 py-4">
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-6 text-left">
              Accreditation with Green Mentors is the definitive continuous pathway to deeply embed sustainability into the global education paradigm. By achieving our credentials, institutions inherently become globally recognized leaders in environmental responsibility.
            </p>
            <div className="flex flex-wrap gap-4 items-center mb-0 justify-start">
              <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest">Curriculum</span>
              <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest">Campus Practices</span>
              <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest">Climate Education</span>
              <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest">Global Responsibility</span>
            </div>
          </div>
        </section>

        {/* 3. Accreditation Programs (Core Section) */}
        <section className="py-24 px-8 bg-slate-50 border-y border-slate-100" id="programs">
          <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
            {PROGRAMS.map((program, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={program.id} id={program.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center scroll-mt-32`}>
                  
                  <div className="w-full lg:w-1/2 flex justify-center">
                    <div className={`w-full max-w-md aspect-square rounded-[3rem] bg-gradient-to-br from-${program.color}-100 to-white border border-${program.color}-200 shadow-2xl shadow-${program.color}-900/5 flex items-center justify-center relative overflow-hidden group`}>
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t pb-8 flex items-end justify-center opacity-10">
                        {program.icon}
                      </div>
                      <div className={`w-28 h-28 bg-white rounded-3xl shadow-lg border border-${program.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        {program.icon}
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">{program.title}</h2>
                    <h3 className={`text-lg font-bold text-${program.color}-700 mb-6 uppercase tracking-widest`}>{program.subtitle}</h3>
                    <p className="text-lg text-slate-600 font-medium leading-[1.8] mb-10">
                      {program.desc}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <Link href="#contact" className={`bg-${program.color}-700 text-white px-8 py-4 rounded-xl font-bold hover:bg-${program.color}-800 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-${program.color}-900/20 text-center`}>
                        Register Now
                      </Link>
                      <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300 text-center">
                        Know More
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Value / Benefits Section */}
        <section className="py-32 px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Why Choose Our Accreditation?</h2>
              <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                Green Mentors’ accreditations distinguish your institution globally, demonstrating an unquestionable commitment to executing tangible planetary betterment.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {BENEFITS.map((benefit, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3">{benefit.title}</h4>
                  <p className="text-sm font-medium text-slate-500 leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Process Overview */}
        <section className="py-24 px-8 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center gap-2 text-emerald-400 font-bold tracking-widest uppercase text-xs mb-4">
                <Map className="w-4 h-4" /> Accreditation Pathway
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Structured Route to Recognition</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-slate-800" />
              
              {PROCESS.map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center group">
                  <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-black text-xl text-emerald-500 mb-6 relative z-10 group-hover:border-emerald-500 group-hover:bg-emerald-900/30 transition-colors">
                    {step.step}
                  </div>
                  <h4 className="text-[15px] font-bold text-slate-100 mb-3 px-4">{step.title}</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Call to Action */}
        <section className="py-32 px-8 bg-emerald-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjMDU5NjY5IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-800/50 text-emerald-300 mb-8 border border-emerald-700 shadow-lg">
              <BookmarkCheck className="w-8 h-8" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Start Your Sustainability Journey Today
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We formally invite ambitious schools, universities, dedicated educators, and visionary students to apply for Green Mentors accreditation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#apply" className="w-full sm:w-auto bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold shadow-xl shadow-black/10 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20 flex justify-center items-center gap-2">
                Apply Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="w-full sm:w-auto bg-emerald-800 text-white border border-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 hover:border-emerald-600 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-700/50">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
