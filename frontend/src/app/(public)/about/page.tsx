'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  History, 
  Users, 
  CheckCircle2, 
  Award, 
  Globe,
  Leaf,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div {...fadeIn} className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Leaf size={14} />
            Humanizing Education
          </motion.div>
          <motion.h1 
            {...fadeIn} 
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-8"
          >
            We are the global force <br />
            behind <span className="text-emerald-600">Green Schools</span>.
          </motion.h1>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 font-medium leading-relaxed"
          >
            Green Mentors is a non-government organization with Special Consultative Status with the United Nations ECOSOC, dedicated to bringing sustainability to the heart of global learning.
          </motion.p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div 
            {...fadeIn}
            className="bg-[#F9FAFB] p-12 rounded-[48px] border border-slate-100 space-y-6 hover:shadow-xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Our Mission</h3>
            <p className="text-slate-600 font-medium leading-relaxed">
              To transform the global education landscape by integrating ecological neutrality and responsible pedagogy into every classroom, empowering the next generation of climate leaders.
            </p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 p-12 rounded-[48px] text-white space-y-6 hover:shadow-2xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-black tracking-tight">Our Vision</h3>
            <p className="text-slate-300 font-medium leading-relaxed opacity-80">
              A world where every educational institution is a beacon of sustainability, and every student graduates with the tools to solve the planet's greatest environmental challenges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. OUR STORY TIMELINE */}
      <section className="py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Our Journey</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">The Evolution of Green Mentors</h3>
          </div>

          <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {TIMELINE_DATA.map((item, idx) => (
              <TimelineItem key={idx} {...item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn} className="space-y-8">
              <h3 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Why Institutions <br />Trust <span className="text-emerald-600">Green Mentors</span>.</h3>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                As a global force in sustainable education, we provide the authority, expertise, and network required for institutional transformation.
              </p>
              <div className="space-y-4">
                {WHY_POINTS.map((point, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="font-bold text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="h-64 bg-emerald-50 rounded-[32px] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="About 1" />
                </div>
                <div className="h-80 bg-slate-100 rounded-[32px] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="About 2" />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="h-80 bg-blue-50 rounded-[32px] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="About 3" />
                </div>
                <div className="h-64 bg-emerald-100 rounded-[32px] overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="About 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TEAM MEMBERS */}
      <section className="py-32 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">The Leadership</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Co-Creators of Change</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <TeamCard 
              name="Virendra Rawat" 
              role="Founder & Director" 
              bio="Global pioneer in Green School concepts and sustainable education architecture."
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=Virendra"
            />
            <TeamCard 
              name="Dr. Archana Rawat" 
              role="Co-Founder" 
              bio="Academic expert focusing on pedagogical innovation and child-centric sustainability."
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=Archana"
            />
            <TeamCard 
              name="Jennifer Thompson" 
              role="International Relations" 
              bio="Building global bridges between Indo-American green educational networks."
              image="https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineItem({ year, title, description, index }: any) {
  const isEven = index % 2 === 0;
  return (
    <div className={cn(
      "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active",
      isEven ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-200 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-[.is-active]:bg-emerald-600 group-[.is-active]:text-emerald-50 transition-colors duration-500">
        <History size={16} />
      </div>
      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
        <div className="flex items-center justify-between space-x-2 mb-2">
          <div className="font-black text-2xl text-emerald-600 tracking-tighter">{year}</div>
        </div>
        <div className="text-xl font-black text-slate-900 mb-2">{title}</div>
        <div className="text-slate-500 font-medium leading-relaxed text-sm">{description}</div>
      </div>
    </div>
  );
}

function TeamCard({ name, role, bio, image }: any) {
  return (
    <motion.div {...fadeIn} className="group">
      <div className="relative mb-8 aspect-square rounded-[48px] overflow-hidden bg-slate-100 border border-slate-100 shadow-lg group-hover:shadow-emerald-600/10 transition-all duration-500 group-hover:-translate-y-2">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <h4 className="text-2xl font-black text-slate-900 mb-1">{name}</h4>
      <p className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4">{role}</p>
      <p className="text-slate-500 font-medium leading-relaxed">{bio}</p>
    </motion.div>
  );
}

const TIMELINE_DATA = [
  { year: "2010", title: "The Concept", description: "Inception of the first Green School model focusing on ecological neutrality." },
  { year: "2015", title: "Global Expansion", description: "Launched our programs across 10 countries, reaching 500+ institutions." },
  { year: "2021", title: "UN Recognition", description: "Granted Special Consultative Status with the United Nations ECOSOC." },
  { year: "2024", title: "UNESCO Partnership", description: "Joined the Greening Education Partnership to climatize global learning." },
];

const WHY_POINTS = [
  "UN ECOSOC Special Consultative Status",
  "Partner of UNESCO Greening Education",
  "Member of AASHE (USA)",
  "Global Network of 2000+ Schools",
  "Audited & Verified Certification"
];