'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Award, Globe, Leaf, Users, CheckCircle2, 
  ArrowRight, MapPin, Building, Target, Compass, 
  ArrowUpRight, Droplets, Wind, Zap, Landmark 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

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

import { getAboutPage } from '@/lib/api';

export default function AboutClient() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const values = [
    { title: cmsData?.vision_title || 'Global Impact', desc: cmsData?.vision_description || 'Operating across 40+ countries with verified institutional frameworks.', icon: Globe },
    { title: cmsData?.approach_title || 'Nature Inspired', desc: cmsData?.approach_description || 'Mimicking natural systems to create circular educational environments.', icon: Leaf },
    { title: 'UN Certified', desc: 'Special Consultative Status with United Nations ECOSOC since 2021.', icon: ShieldCheck },
  ];

  const elements = [
    { id: '01', title: cmsData?.soil_title || 'Soil', desc: cmsData?.soil_description, icon: Landmark, bg: 'bg-amber-50/50', border: 'border-amber-200/40', text: 'text-amber-600' },
    { id: '02', title: cmsData?.water_title || 'Water', desc: cmsData?.water_description, icon: Droplets, bg: 'bg-blue-50/50', border: 'border-blue-200/40', text: 'text-blue-600' },
    { id: '03', title: cmsData?.air_title || 'Air', desc: cmsData?.air_description, icon: Wind, bg: 'bg-cyan-50/50', border: 'border-cyan-200/40', text: 'text-cyan-600' },
    { id: '04', title: cmsData?.energy_title || 'Energy', desc: cmsData?.energy_description, icon: Zap, bg: 'bg-yellow-50/50', border: 'border-yellow-200/40', text: 'text-yellow-600' },
    { id: '05', title: cmsData?.spaces_title || 'Spaces', desc: cmsData?.spaces_description, icon: Building, bg: 'bg-green-50/50', border: 'border-green-200/40', text: 'text-green-600' },
  ].filter(e => e.desc);

  const partners = [
    { name: cmsData?.partner_1_name, link: cmsData?.partner_1_link },
    { name: cmsData?.partner_2_name, link: cmsData?.partner_2_link },
    { name: cmsData?.partner_3_name, link: cmsData?.partner_3_link },
  ].filter(p => p.name);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden">
        <div className="absolute top-20 right-20 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text={cmsData?.section_name || "OUR EVOLUTION"} />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || 'Architecting'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'the future of'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Responsibility.'}
          </h1>
          
          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <div className="space-y-8">
               <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
                {cmsData?.main_description || 'From a conceptual framework in 2010 to a UN-certified global organization in 2021, we have spent a decade redefining the intersection of pedagogy and planetary health.'}
               </p>
               {cmsData?.short_subtitle && (
                 <p className="text-lg font-medium opacity-40 uppercase tracking-widest">{cmsData.short_subtitle}</p>
               )}
            </div>
            <div className="flex gap-12">
              <div className="space-y-2">
                <div className="text-5xl font-display font-black tracking-tighter text-[#21D469]">{cmsData?.founded_year || '10'}+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Years of R&D</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-display font-black tracking-tighter text-[#21D469]">{cmsData?.countries_count || '40'}+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Global Nodes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Section */}
      {cmsData?.about_image && (
        <section className="px-8 lg:px-16 pb-40">
           <div className="max-w-[1800px] mx-auto aspect-[21/9] rounded-[4rem] overflow-hidden shadow-premium">
              <img 
                src={cmsData.about_image} 
                alt={cmsData.image_alt || "Institutional Mission"} 
                className="w-full h-full object-cover"
              />
              {cmsData.image_caption && (
                <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {cmsData.image_caption}
                </div>
              )}
           </div>
        </section>
      )}

      {/* Philosophy Section */}
      <section className="bg-[#0F172A] text-white py-40 px-8 lg:px-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 text-[300px] font-black text-white/[0.02] leading-none select-none pointer-events-none font-display">
          ECO
        </div>
        
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-5 space-y-12">
              <SectionLabel text="THE PHILOSOPHY" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                Nature is the <br />
                <span className="text-[#21D469]">Primary</span> <br />
                Pedagogue.
              </h2>
              <p className="text-xl font-medium italic opacity-60 leading-relaxed max-w-md">
                We believe that the classroom is not a box, but a living ecosystem. Our mission is to strip away the industrial layers of education and return to the wisdom of biological efficiency.
              </p>
              <button className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-[#21D469] transition-all">
                LEARN MORE <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </button>
            </div>
            
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
              {values.map((v, i) => (
                <div 
                  key={i} 
                  className="p-12 border border-white/5 bg-white/[0.02] rounded-[3rem] hover:bg-[#21D469] hover:text-[#0F172A] transition-all duration-700 group cursor-pointer"
                >
                  <v.icon size={48} className="mb-8 text-[#21D469] group-hover:text-[#0F172A] transition-colors" />
                  <h3 className="text-2xl font-display font-black uppercase mb-4 tracking-tighter">{v.title}</h3>
                  <p className="text-sm font-medium italic opacity-60 group-hover:opacity-100">{v.desc}</p>
                </div>
              ))}
              <div className="p-12 bg-[#21D469] text-[#0F172A] rounded-[3rem] flex flex-col justify-between">
                <Target size={48} />
                <div>
                  <h3 className="text-3xl font-display font-black uppercase tracking-tighter leading-none mb-4">Zero Carbon <br /> Campus.</h3>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-60">2030 Global Target</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Elements Section */}
      {elements.length > 0 && (
        <section className="py-40 px-8 lg:px-16">
          <div className="max-w-[1800px] mx-auto">
             <SectionLabel text="THE FIVE ELEMENTS FRAMEWORK" />
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {elements.map((el) => (
                  <div key={el.id} className={cn("p-12 rounded-[3rem] border space-y-8", el.bg, el.border)}>
                     <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm", el.text)}>
                        <el.icon size={24} />
                     </div>
                     <div>
                        <span className={cn("text-[10px] font-black uppercase tracking-widest block mb-2", el.text)}>Element {el.id}</span>
                        <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-4">{el.title}</h4>
                        <p className="text-sm font-medium italic opacity-60 leading-relaxed">{el.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </section>
      )}

      {/* Leadership Section */}
      <section className="py-40 px-8 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-premium">
                <img 
                  src={cmsData?.founder_image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80"} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-[3rem] shadow-3d border border-black/5 max-w-xs transition-transform duration-500">
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469] mb-4">The Visionary</div>
                <h4 className="text-3xl font-display font-black uppercase italic tracking-tighter mb-2">{cmsData?.founder_name || 'Virendra Rawat'}</h4>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest">{cmsData?.founder_designation || 'UNGA Award Recipient 2019'}</p>
                {cmsData?.founder_profile_link && (
                  <Link href={cmsData.founder_profile_link} className="inline-flex items-center gap-2 mt-6 text-[9px] font-black uppercase tracking-widest text-[#21D469] hover:translate-x-2 transition-transform">
                    View Network <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
            
            <div className="space-y-12">
              <SectionLabel text="LEADERSHIP" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                {cmsData?.leadership_title?.split(' ')[0] || 'Institutional'} <br />
                <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.leadership_title?.split(' ').slice(1).join(' ') || 'Responsibility'}</span> <br />
                First.
              </h2>
              <div className="space-y-8 max-w-xl">
                <p className="text-xl font-medium leading-relaxed italic text-[#0F172A]/70">
                  {cmsData?.founder_description || 'Supported by co-founders Ambrish Parajiya, Gopal Goswami, and Bhavesh Hakani, Green Mentors has evolved into a global force with a presence in Ahmedabad, NYC, and Brooklyn.'}
                </p>
                <div className="h-[1px] w-full bg-black/5" />
                <p className="text-lg leading-relaxed text-[#0F172A]/50">
                  {cmsData?.growth_description || 'Our leadership team combines decades of expertise in architecture, pedagogy, and international policy to deliver verified sustainability frameworks that win awards and protect the future.'}
                </p>
              </div>

              {partners.length > 0 && (
                <div className="pt-12 border-t border-black/5">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-8 block">Global Strategic Partners</span>
                   <div className="flex flex-wrap gap-8">
                      {partners.map((p, i) => (
                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                           <div className="w-2 h-2 rounded-full bg-[#21D469]" />
                           <span className="text-sm font-black uppercase tracking-widest group-hover:text-[#21D469] transition-colors">{p.name}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Global Status Marquee */}
      <div className="bg-[#21D469] py-8 overflow-hidden border-y border-black/5">
        <div className="flex whitespace-nowrap">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#0F172A]">UN ECOSOC Certified</span>
              <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#0F172A]">UNESCO GEP Member</span>
              <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#0F172A]">AASHE Leadership</span>
              <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
