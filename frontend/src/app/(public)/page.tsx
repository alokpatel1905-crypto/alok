'use client';

import React from 'react';
import { ArrowRight, Globe, GraduationCap, Users, ChevronRight, BookOpen, Building, Target, Network } from 'lucide-react';

const ECOSYSTEM_PROGRAMS = [
  { title: 'Programs', items: ['Green School', 'Green University', 'Green Teacher', 'Green Graduate', 'Green Fellowship'] },
  { title: 'Rankings', items: ['Global Green School Ranking', 'Global Green University Ranking', 'National Green University Ranking'] },
  { title: 'Events', items: ['NYC Green School Conference', 'NYC Children\'s Climate Conference', 'World Education Forum – Davos', 'Global Green Mentors Conference'] },
  { title: 'Networks', items: ['Global Green Teacher Network', 'Global Green Schools Network', 'Global Green University Network', 'Global Green Graduates Network', 'Global Green Innovator Network'] }
];

const IMPACT_STATS = [
  { value: "8,000+", label: "Schools & Universities", icon: <Building className="text-emerald-700 mb-5" size={40} strokeWidth={1.2} /> },
  { value: "50,000+", label: "Educators Trained", icon: <BookOpen className="text-teal-600 mb-5" size={40} strokeWidth={1.2} /> },
  { value: "10 Million", label: "Students Empowered", icon: <Users className="text-sky-600 mb-5" size={40} strokeWidth={1.2} /> },
  { value: "45", label: "Countries Reached", icon: <Globe className="text-emerald-500 mb-5" size={40} strokeWidth={1.2} /> }
];

const MEGA_CATEGORIES = [
  { title: "K-12 School", links: ["Accreditation", "Global Ranking", "Green Class"] },
  { title: "University", links: ["Accreditation", "Global Ranking", "Green Graduate", "Green Fellowship"] },
  { title: "Teacher", links: ["Green Teacher Accreditation", "Green Educator Program"] },
  { title: "Students", links: ["Climate Olympiad", "Green Fellowship", "Green Internship", "Green Jobs"] },
  { title: "Event", links: ["NYC Green School Conference", "NYC Children's Climate Conference", "World Education Forum – Davos", "Global Green Mentors Conference"] },
  { title: "Awards", links: ["Green University", "Green School", "Green Mentor", "Green Teacher", "Green Graduate"] },
  { title: "Network", links: ["Global Green Teacher Network", "Global Green Schools Network", "Global Green University Network", "Global Green Graduates Network", "Global Green Innovator Network"] },
  { title: "Support Us", links: ["Green Graduate Accreditation", "Green Teacher Accreditation", "Green School Accreditation", "Green University Accreditation"] }
];

const HeroSection = () => (
  <section id="home" className="relative py-24 lg:py-32 px-8 flex items-center min-h-[90vh] bg-white overflow-hidden scroll-mt-32">
    <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white -z-20" />
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
      <div className="flex flex-col items-start z-10 lg:pr-8">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-10">
          <Target size={14} className="text-emerald-600" />
          Global Greening Education Initiative
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-8">
          Transforming Education <br className="hidden lg:block"/> for a <span className="text-emerald-700 font-black">Sustainable Future</span>
        </h2>
        <p className="text-[17px] md:text-lg text-slate-500 mb-12 max-w-xl font-medium leading-[1.8]">
          Green Mentors empowers schools, universities, teachers, graduates, and education ecosystems through accreditation, rankings, events, awards, global networks, and sustainability-led collaboration.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <a href="#programs" className="w-full sm:w-auto bg-emerald-800 text-white px-8 py-4 flex items-center justify-center gap-3 rounded-xl font-semibold shadow-lg shadow-emerald-900/10 hover:bg-emerald-900 hover:-translate-y-0.5 transition-all duration-300">
            Explore Programs <ArrowRight size={18} />
          </a>
          <a href="#support" className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 flex items-center justify-center gap-3 rounded-xl font-semibold shadow-sm hover:border-emerald-200 hover:text-emerald-800 hover:bg-emerald-50/50 hover:-translate-y-0.5 transition-all duration-300">
            Join the Movement
          </a>
        </div>
        <div className="mt-12">
          <a href="#impact" className="inline-flex items-center gap-2 text-[12px] font-bold text-slate-400 hover:text-emerald-700 transition-colors uppercase tracking-widest group">
            View Global Impact <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="relative hidden lg:flex items-center justify-center h-[600px] w-full">
        <div className="absolute w-[500px] h-[500px] border-[0.5px] border-emerald-100 rounded-full" />
        <div className="absolute w-[360px] h-[360px] border-[1px] border-dashed border-slate-200 rounded-full animate-[spin_100s_linear_infinite]" />
        <div className="absolute w-[220px] h-[220px] bg-white border border-slate-100 rounded-full shadow-2xl shadow-slate-200/50 flex items-center justify-center z-10 hover:scale-105 transition-transform duration-700 cursor-default">
          <Globe className="w-28 h-28 text-emerald-800/[0.08]" strokeWidth={1} />
        </div>
        <div className="absolute top-12 right-6 bg-white py-3 px-5 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4 z-20 animate-[bounce_8s_infinite] hover:-translate-y-1 transition-transform cursor-default">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center"><Network className="text-emerald-600 w-6 h-6" strokeWidth={1.5} /></div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Global Network</div>
            <div className="text-lg font-black text-slate-700">45 Countries</div>
          </div>
        </div>
        <div className="absolute bottom-20 left-4 bg-white py-3 px-5 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex items-center gap-4 z-20 animate-[bounce_10s_infinite_reverse] hover:-translate-y-1 transition-transform cursor-default">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center"><GraduationCap className="text-teal-600 w-6 h-6" strokeWidth={1.5} /></div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Community</div>
            <div className="text-lg font-black text-slate-700">10M Students</div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-emerald-50/80 to-sky-50/50 rounded-full blur-[60px] -z-10" />
      </div>
    </div>
  </section>
);

const EcosystemLinksSection = () => (
  <section id="programs" className="py-32 px-8 bg-slate-50 relative border-y border-slate-100 scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="text-center md:text-left mb-20 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-5">Explore the Green Mentors Ecosystem</h2>
        <p className="text-slate-500 font-medium text-[17px] leading-relaxed">
          Discover accreditation pathways, global rankings, international events, and sustainability networks structured for worldwide institutional growth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ECOSYSTEM_PROGRAMS.map((category, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
            <h4 className="text-[13px] font-bold text-slate-800 mb-8 uppercase tracking-widest border-b border-emerald-50 pb-5 inline-flex items-center gap-4 w-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              {category.title}
            </h4>
            <ul className="flex flex-col gap-3">
              {category.items.map((item, i) => (
                <li key={i}>
                  <a href={`/accreditation#${item.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} className="group inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-slate-50 text-[13px] font-semibold text-slate-600 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200">
                    <span className="truncate pr-4 leading-relaxed">{item}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 shrink-0 transition-transform" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ImpactSection = () => (
  <section id="impact" className="py-32 px-8 bg-white relative scroll-mt-24">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-24 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-6">Global Impact in Motion</h2>
        <p className="text-slate-500 font-medium text-[17px] leading-relaxed">
          Our global education transformation mission spans continents, tangibly equipping institutions and communities with the blueprints for a zero-carbon future.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        {IMPACT_STATS.map((stat, idx) => (
          <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-10 flex flex-col items-center text-center hover:bg-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2 group">
            <div className="group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out">{stat.icon}</div>
            <h4 className="text-4xl lg:text-[42px] font-black text-slate-800 mb-3 tracking-tight">{stat.value}</h4>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const MegaNavSection = () => (
  <section id="networks" className="bg-slate-900 py-32 px-8 text-slate-300 scroll-mt-24">
    <nav className="max-w-7xl mx-auto" aria-label="Ecosystem Navigator">
      <div className="mb-24 flex flex-col items-center md:items-start border-b border-slate-800 pb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 text-center md:text-left">Ecosystem Navigator</h2>
        <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-3xl text-center md:text-left">
          Discover the complete foundation of our specialized pathways, professional networks, global recognitions, and environmental support paradigms.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 lg:gap-y-20">
        {MEGA_CATEGORIES.map((category, idx) => (
          <div key={idx} className="group flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="text-white font-bold text-[13px] uppercase tracking-[0.15em] mb-8 flex flex-col sm:flex-row items-center gap-4">
              <span className="w-8 h-[2px] bg-emerald-600 rounded-full" />
              {category.title}
            </h4>
            <ul className="space-y-4 text-[14px] font-medium flex-grow w-full">
              {category.links.map((link, i) => (
                <li key={i}>
                  <a href={`/accreditation#${link.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} className="text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all duration-200 inline-block py-1">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  </section>
);

export default function HomePage() {
  return (
    <div className="bg-white text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <HeroSection />
      <EcosystemLinksSection />
      <ImpactSection />
      <MegaNavSection />
    </div>
  );
}