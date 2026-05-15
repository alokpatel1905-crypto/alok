'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, GraduationCap, School, Building2, Globe2, 
  ArrowRight, CheckCircle2, Zap, Users, Share2, Network, ArrowUpRight 
} from 'lucide-react';

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

import { getNetworksPage } from '@/lib/api';

export default function NetworksClient() {
  const [cmsData, setCmsData] = React.useState<any>(null);

  React.useEffect(() => {
    getNetworksPage().then(data => {
      if (data) setCmsData(data);
    });
  }, []);

  const NETWORKS = [
    {
      title: cmsData?.school_title || 'Indo-American Green School Network',
      subtitle: cmsData?.school_subtitle || 'Primary Ed Synergy',
      desc: cmsData?.school_description || 'A collaborative platform for schools to share nature-inspired curriculum, pedagogy, and campus resource management best practices across borders.',
      icon: School,
      features: ['Eco-Curriculum Exchange', 'Teacher Mentorship', 'Student Climate Action', 'Verified Accreditation'],
      link: cmsData?.school_button_1_link || '#'
    },
    {
      title: cmsData?.university_title || 'Indo-American Green University Network',
      subtitle: cmsData?.university_subtitle || 'Higher Ed Bridge',
      desc: cmsData?.university_description || 'Connecting premier universities in India and the USA to foster research collaboration, student exchange, and shared sustainability architectural goals.',
      icon: GraduationCap,
      features: ['Research Exchange', 'Sustainability Audits', 'Shared Green Tech', 'Global Symposiums'],
      link: cmsData?.university_button_1_link || '#'
    },
    {
      title: cmsData?.innovator_title || 'Indo-American Green Innovator Network',
      subtitle: cmsData?.innovator_subtitle || 'Innovation Hub',
      desc: cmsData?.innovator_description || 'Empowering green innovators and entrepreneurs to scale sustainable solutions through cross-continental institutional support.',
      icon: Zap,
      features: ['Tech Incubation', 'Venture Mentorship', 'Global Scale-up', 'Resource Access'],
      link: cmsData?.innovator_button_1_link || '#'
    }
  ];

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="CROSS-CONTINENTAL SYNERGY" />
          <h1 className="text-[clamp(50px,10vw,150px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
            {cmsData?.page_title?.split(' ')[0] || 'Indo-American'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'Green'}</span> {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Networks.'}
          </h1>
          <p className="text-2xl font-serif italic text-[#0F172A]/60 leading-relaxed max-w-3xl">
            {cmsData?.subtitle || "Fostering deep collaboration between the world's two largest democracies to build a unified roadmap for global educational sustainability."}
          </p>
        </div>
      </section>

      {/* Networks Grid */}
      <section className="py-32 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
             {NETWORKS.map((net, i) => (
               <div 
                key={i}
                className="group p-12 bg-white rounded-[4rem] border border-black/5 shadow-premium hover:border-[#21D469] transition-all duration-700 flex flex-col gap-12"
               >
                  <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-[#21D469] group-hover:bg-[#21D469] group-hover:text-[#0F172A] transition-all shadow-3d">
                    <net.icon size={40} />
                  </div>
                  <div className="space-y-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">{net.subtitle}</div>
                    <h2 className="text-3xl font-display font-black uppercase tracking-tighter leading-tight">{net.title}</h2>
                    <p className="text-xl font-medium italic opacity-60 leading-relaxed">{net.desc}</p>
                  </div>
                  <div className="space-y-4 flex-grow">
                    {net.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest opacity-40">
                        <div className="w-1.5 h-1.5 bg-[#21D469] rounded-full" />
                        {feat}
                      </div>
                    ))}
                  </div>
                  <div className="pt-8">
                    <button className="w-full bg-[#0F172A] text-white py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                      Join Network <ArrowUpRight size={14} className="inline ml-4" />
                    </button>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Global Collaboration Section */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#21D469]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto">
           <div className="grid lg:grid-cols-12 gap-24 items-center">
              <div className="lg:col-span-5 space-y-12">
                <SectionLabel text="THE BRIDGE" color={COLORS.sage} />
                <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase tracking-tighter">
                  {cmsData?.impact_title?.split(' ')[0] || 'Global'} <br />
                  <span className="text-[#FACC15]">{cmsData?.impact_title?.split(' ').slice(1).join(' ') || 'Collective'}</span> IQ.
                </h2>
                <p className="text-2xl font-serif italic opacity-60 leading-relaxed">
                  {cmsData?.impact_description || 'Our networks are more than just directories; they are strategic bridges for knowledge transfer and nature-inspired research across two continents.'}
                </p>
                <div className="flex gap-12">
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#21D469]">
                         <Share2 size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Flow</span>
                   </div>
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#FACC15]">
                         <Globe2 size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Sync</span>
                   </div>
                   <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#21D469]">
                         <Zap size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Sync</span>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                 <div className="aspect-[4/3] bg-white/5 border border-white/10 rounded-[4rem] flex flex-col justify-center items-center text-center p-24 relative overflow-hidden group">
                    <Globe size={300} strokeWidth={0.5} className="text-white/[0.03]" />
                    <div className="absolute inset-0 flex flex-col justify-center items-center p-24">
                       <h3 className="text-4xl lg:text-6xl font-display font-black uppercase tracking-tighter italic leading-none mb-8">Indo-American <br /> Synergy</h3>
                       <p className="text-xl font-serif italic opacity-40 max-w-sm">Building the infrastructure of hope across the globe.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
