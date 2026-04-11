'use client';

import React, { useState, useEffect } from 'react';
import { Leaf, Droplet, Wind, Sun, LayoutGrid, ArrowRight, UserCircle2, Globe, Building, Target, Users, BookOpen } from 'lucide-react';
import { getPageContent } from '@/lib/api';

const ELEMENTS = [
  { id: 'soil', name: 'Soil', icon: <SproutIcon className="w-6 h-6 text-emerald-700" />, desc: 'Cultivating grounded, resilient educational foundations.' },
  { id: 'water', name: 'Water', icon: <Droplet className="w-6 h-6 text-sky-600" />, desc: 'Ensuring fluid, adaptable, and pure learning streams.' },
  { id: 'air', name: 'Air', icon: <Wind className="w-6 h-6 text-teal-600" />, desc: 'Breathing transparency and vitality into school operations.' },
  { id: 'energy', name: 'Energy', icon: <Sun className="w-6 h-6 text-amber-500" />, desc: 'Powering ecosystems with sustainable, renewable action.' },
  { id: 'spaces', name: 'Spaces', icon: <LayoutGrid className="w-6 h-6 text-indigo-500" />, desc: 'Designing living laboratories for conscious learners.' }
];

const HIGHLIGHTS = [
  { title: "Founded in 2012", text: "Over a decade of transformative impact.", icon: <Target className="w-5 h-5" /> },
  { title: "Active in 45 Countries", text: "A truly global educational movement.", icon: <Globe className="w-5 h-5" /> },
  { title: "Education + Sustainability", text: "Integrated framework for systemic change.", icon: <BookOpen className="w-5 h-5" /> },
  { title: "Climate-Conscious", text: "Creating future-ready learning systems.", icon: <Building className="w-5 h-5" /> }
];

function SproutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
  );
}

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    setMounted(true);
    getPageContent('about').then(res => {
      if (res && res.content) {
        setContent(res.content);
      }
    });
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white font-sans text-slate-800 flex flex-col">
      
      {/* 1. Hero / Intro Banner */}
      <header className="relative pt-32 pb-24 px-8 overflow-hidden bg-slate-50 border-b border-emerald-100">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-white -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col items-start">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="hover:text-emerald-700 cursor-pointer transition-colors">Home</span>
            <span>/</span>
            <span className="text-emerald-700">About</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-800 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Leaf size={14} className="text-emerald-600" />
            About Green Mentors
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            {content.heroTitle || 'About'}
          </h1>
          
          <p className="text-xl md:text-2xl font-medium text-slate-500 max-w-3xl leading-relaxed">
            {content.heroSubtitle || 'A global initiative transforming education through sustainability, empowering institutions to champion environmental responsibility.'}
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Top Content Layout */}
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="flex flex-col gap-8 order-2 lg:order-1">
              {/* 3. Our Vision */}
              <div className="space-y-6">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Vision</h2>
                
                <div className="space-y-5 text-lg text-slate-600 leading-[1.8] font-medium">
                  <p>
                    {content.visionPara1 || 'Green Mentors envisions a future where every school and university accepts accountability for both learners’ futures and the health of the planet.'}
                  </p>
                  <p>
                    <strong className="text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">Responsible education</strong> should be presented as the foundation for building resilient, environmentally conscious, and sustainable societies. We are committed to embedding sustainability across every level of education—institutions, educators, classrooms, and graduates working together to build environmental responsibility and <strong className="text-emerald-800 font-bold border-b-2 border-emerald-200">climate leadership</strong>.
                  </p>
                  <p>
                    We believe learning institutions must become <strong className="text-teal-700 italic">“living laboratories of sustainability,”</strong> where students learn through both knowledge and proactive action.
                  </p>
                  <p>
                    Ultimately, our vision is to nurture a generation capable of understanding environmental challenges and leading solutions for a just, resilient, and sustainable future for all.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Photograph Area / Placeholder */}
            <div className="order-1 lg:order-2 w-full h-[500px] bg-slate-50 rounded-[2rem] border border-slate-100 shadow-2xl shadow-emerald-900/5 relative overflow-hidden flex flex-col justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/50 via-white to-sky-50/50 opacity-80" />
              
              <div className="relative z-10 w-48 h-48 rounded-full border border-emerald-200 flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-xl animate-[spin_60s_linear_infinite]">
                <Leaf className="w-20 h-20 text-emerald-700 opacity-20" strokeWidth={1} />
              </div>
              
              <div className="relative z-10 mt-12 bg-white/90 backdrop-blur-md border border-white px-8 py-5 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Global Impact</p>
                  <p className="text-lg font-black text-slate-800">Living Laboratories</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Leadership Section */}
        <section className="py-24 px-8 bg-slate-900 text-slate-300 relative border-y border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-black text-white tracking-tight mb-6">{content.leadershipTitle || 'Leadership'}</h2>
              <p className="text-lg text-slate-400 font-medium leading-[1.8] mb-8">
                {content.leadershipIntro || 'Green Mentors was founded in 2012 by Dr. Virendra Rawat. Our core mission is focused on transforming education systems worldwide through sustainability and environmental responsibility.'}
              </p>
              
              <div className="bg-slate-800/50 border border-slate-700/50 p-6 rounded-2xl flex items-center gap-5 hover:bg-slate-800 transition-colors">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center border border-slate-600 shrink-0">
                  <UserCircle2 className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Dr. Virendra Rawat</h4>
                  <p className="text-emerald-500 font-medium text-sm mb-2">Founder</p>
                  <a href="#founder" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                    View Profile <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 flex flex-col justify-center">
              <div className="pl-0 lg:pl-12 border-l-0 lg:border-l border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="text-emerald-500 w-6 h-6" /> Our Expansion Story
                </h3>
                <p className="text-lg text-slate-400 leading-[1.8] font-medium space-y-6">
                  <span className="block mb-6">
                    What began as a single school initiative in India has grown into a formidable global movement advancing green education across 45 countries and territories.
                  </span>
                  <span className="block">
                    In 2017, the leadership strengthened dramatically when <strong className="text-slate-200">Dr. Gopal Goswami</strong>, <strong className="text-slate-200">Mr. Ambrish Parajiya</strong>, and <strong className="text-slate-200">Mr. Bhavesh Hakani</strong> joined as essential partners to scale and expand the mission, cementing our status as a serious institutional force for planetary change.
                  </span>
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 5. Our Approach Section */}
        <section className="py-32 px-8 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">{content.approachTitle || 'Our Approach'}</h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                {content.approachSubtitle || 'Green Mentors advances sustainability in education through a holistic framework strictly grounded in the five essential elements of nature. These ecological foundations serve as guiding pillars for transforming institutions.'}
              </p>
            </div>

            {/* Elements Framework Visual */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 mb-24">
              {ELEMENTS.map((element, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300">
                    {element.icon}
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3">{element.name}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    {element.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Approach Context */}
            <div className="max-w-4xl mx-auto bg-white border border-emerald-100 rounded-[2.5rem] p-10 md:p-16 shadow-2xl shadow-emerald-900/5">
              <div className="text-lg text-slate-600 font-medium leading-[1.9] space-y-6">
                <p>
                  We support schools and universities in embedding real sustainability into a three-pronged strategy: <strong className="text-slate-800">curriculum</strong>, <strong className="text-slate-800">campus operations</strong>, and <strong className="text-slate-800">community engagement</strong>.
                </p>
                <p>
                  This approach effectively helps academic entities move far beyond theoretical knowledge, evolving into actual living laboratories of sustainability. By doing so, students learn through tangible, real-world environmental stewardship.
                </p>
                <p className="text-xl text-emerald-800 font-semibold border-l-4 border-emerald-400 pl-6 my-8 py-2">
                  Through this integrated framework, institutions across 45 countries permanently cultivate climate-conscious learning environments and future-ready learners.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Supporting Highlights / Value Strip */}
        <section className="py-16 px-8 bg-white border-b border-slate-100 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start p-6 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                <div className="mt-1 bg-emerald-100 text-emerald-700 p-2.5 rounded-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-[15px] mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Call to Action Section */}
        <section className="py-32 px-8 bg-emerald-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjMDU5NjY5IiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Join the Movement for Responsible Education
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We encourage schools, universities, educators, and global partners to collaborate with Green Mentors in shaping a unified, sustainable tomorrow.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#programs" className="w-full sm:w-auto bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold shadow-xl shadow-black/10 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/20">
                Explore Programs
              </a>
              <a href="#contact" className="w-full sm:w-auto bg-emerald-800 text-white border border-emerald-700 px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 hover:border-emerald-600 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-700/50">
                Contact Green Mentors
              </a>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}