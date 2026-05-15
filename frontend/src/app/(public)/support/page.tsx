'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, Zap, Globe, Users, Star, TrendingUp, 
  ArrowRight, Quote, ShieldCheck, Target, Layout, 
  ArrowUpRight, CheckCircle2, ChevronRight, MessageSquare 
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getSupportPage } from '@/lib/api';

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

export default function SupportPage() {
  const [cmsData, setCmsData] = useState<any>(null);

  useEffect(() => {
    getSupportPage().then(data => {
      if (data) setCmsData(data);
    });
  }, []);

  const supportBlocks = [
    {
      prefix: 'partnership',
      title: cmsData?.partnership_title || 'Institutional Partnerships',
      subtitle: cmsData?.partnership_subtitle || 'Strategic Alliances',
      description: cmsData?.partnership_description || 'Join our global network of institutions working together to redefine educational benchmarks through nature-mimicry and resource circularity.',
      icon: HeartHandshake,
      image: cmsData?.partnership_image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
      btn1: cmsData?.partnership_button_1_text || 'Partner with Us',
      btn1Link: cmsData?.partnership_button_1_link || '/contact',
      btn2: cmsData?.partnership_button_2_text || 'View Protocol',
      btn2Link: cmsData?.partnership_button_2_link || '/about'
    },
    {
      prefix: 'sponsorship',
      title: cmsData?.sponsorship_title || 'Sponsorship Opportunities',
      subtitle: cmsData?.sponsorship_subtitle || 'Corporate Responsibility',
      description: cmsData?.sponsorship_description || 'Empower the next generation of green leaders by sponsoring global summits, teacher training programs, and institutional awards.',
      icon: Zap,
      image: cmsData?.sponsorship_image || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80',
      btn1: cmsData?.sponsorship_button_1_text || 'Explore Packages',
      btn1Link: cmsData?.sponsorship_button_1_link || '/contact',
      btn2: cmsData?.sponsorship_button_2_text || 'Success Stories',
      btn2Link: cmsData?.sponsorship_button_2_link || '/impact'
    },
    {
      prefix: 'philanthropy',
      title: cmsData?.philanthropy_title || 'Philanthropic Support',
      subtitle: cmsData?.philanthropy_subtitle || 'Global Mission',
      description: cmsData?.philanthropy_description || 'Direct your philanthropic vision toward high-impact sustainability projects in education, verified by UN ECOSOC protocols.',
      icon: Globe,
      image: cmsData?.philanthropy_image || 'https://images.unsplash.com/photo-1449156656402-5bf0641b0008?auto=format&fit=crop&q=80',
      btn1: cmsData?.philanthropy_button_1_text || 'Donate Vision',
      btn1Link: cmsData?.philanthropy_button_1_link || '/contact',
      btn2: cmsData?.philanthropy_button_2_text || 'Annual Report',
      btn2Link: cmsData?.philanthropy_button_2_link || '/media'
    },
    {
      prefix: 'advisory',
      title: cmsData?.advisory_title || 'Volunteer & Advisory Hub',
      subtitle: cmsData?.advisory_subtitle || 'Expert Engagement',
      description: cmsData?.advisory_description || 'Contribute your expertise to our global advisory board and mentor educational leaders in their transition to green campuses.',
      icon: Users,
      image: cmsData?.advisory_image || 'https://images.unsplash.com/photo-1542601063-7ac3b052146d?auto=format&fit=crop&q=80',
      btn1: cmsData?.advisory_button_1_text || 'Join Advisory',
      btn1Link: cmsData?.advisory_button_1_link || '/contact',
      btn2: cmsData?.advisory_button_2_text || 'Mentor Portal',
      btn2Link: cmsData?.advisory_button_2_link || '/community'
    }
  ];

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="COLLABORATION PROTOCOLS" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || 'Support'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'the global'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Transition.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.subtitle || "Join the world's leading architects of sustainable education. Your support accelerates the transition of institutional paradigms toward environmental responsibility."}
          </p>
        </div>
      </section>

      {/* Support pathways */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto space-y-32">
          {supportBlocks.map((block, i) => (
            <div key={block.prefix} className={cn(
              "grid lg:grid-cols-12 gap-24 items-center",
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            )}>
              <div className={cn(
                "lg:col-span-6 space-y-12",
                i % 2 === 1 ? "lg:order-2" : ""
              )}>
                <SectionLabel text={block.subtitle} />
                <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase tracking-tighter">
                  {block.title.split(' ')[0]} <br />
                  <span className="text-[#21D469]">{block.title.split(' ').slice(1).join(' ')}</span>
                </h2>
                <p className="text-xl font-medium italic opacity-60 leading-relaxed max-w-xl">
                  {block.description}
                </p>
                <div className="flex flex-wrap gap-8">
                  <Link href={block.btn1Link}>
                    <button className="bg-[#0F172A] text-white px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                      {block.btn1} <ArrowRight size={16} className="inline ml-4" />
                    </button>
                  </Link>
                  <Link href={block.btn2Link} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] border-b border-black/10 pb-2 hover:text-[#21D469] transition-colors">
                    {block.btn2} <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>

              <div className={cn(
                "lg:col-span-6",
                i % 2 === 1 ? "lg:order-1" : ""
              )}>
                <div className="aspect-[4/3] rounded-[4rem] overflow-hidden shadow-premium relative group">
                  <img 
                    src={block.image} 
                    className="w-full h-full object-cover grayscale" 
                  />
                  <div className="absolute inset-0 bg-[#0F172A]/20" />
                  <div className="absolute top-12 left-12">
                     <div className="w-16 h-16 bg-[#21D469] text-[#0F172A] rounded-2xl flex items-center justify-center shadow-2xl">
                        <block.icon size={32} />
                     </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 text-[300px] font-black text-white/[0.02] leading-none select-none pointer-events-none font-display">
          TRUST
        </div>
        
        <div className="max-w-[1800px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <SectionLabel text="THE MANIFESTO" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                {cmsData?.why_title?.split(' ')[0] || 'Why'} <br />
                <span className="text-[#21D469]">{cmsData?.why_title?.split(' ').slice(1).join(' ') || 'Support the Mission.'}</span>
              </h2>
              <div className="space-y-8 max-w-2xl">
                {(cmsData?.why_description || "Verified global benchmarks in education. Nature-inspired circular pedagogical frameworks. UN ECOSOC Consultative Status recognition. Direct impact on Quality Education and Climate Action.").split('. ').map((point: string, i: number) => (
                  <div key={i} className="flex items-start gap-6 group">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-[#21D469] group-hover:border-[#21D469] transition-all">
                      <CheckCircle2 size={16} className="text-[#21D469] group-hover:text-[#0F172A]" />
                    </div>
                    <p className="text-xl font-medium italic opacity-60 group-hover:opacity-100 transition-opacity">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
               <div className="p-16 bg-white text-[#0F172A] rounded-[4rem] shadow-premium relative group">
                  <Quote size={60} className="text-[#21D469] mb-12 opacity-20" />
                  <p className="text-3xl font-serif italic leading-relaxed mb-12">
                    {cmsData?.quote_description || '"Green Mentors is not just an organization; it is a global movement returning education to the wisdom of nature."'}
                  </p>
                  <div className="flex items-center gap-6 pt-12 border-t border-black/5">
                     <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center font-display font-black text-2xl text-[#21D469]">
                        VR
                     </div>
                     <div>
                        <h4 className="text-xl font-display font-black uppercase tracking-tighter">{cmsData?.quote_author || 'Virendra Rawat'}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Founder, Green Mentors</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Flow */}
      <section className="py-40 px-8 lg:px-16 bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center mb-24 space-y-8">
            <SectionLabel text="THE PROCESS" />
            <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
               Collaboration <span className="text-[#21D469]">Flow.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: cmsData?.step1 || 'Dialogue', desc: 'Initial strategic consultation to align institutional visions.' },
              { step: '02', title: cmsData?.step2 || 'Protocol', desc: 'Formalizing the collaboration framework and support nodes.' },
              { step: '03', title: cmsData?.step3 || 'Activation', desc: 'Engraving the institutional presence in the global network.' },
              { step: '04', title: cmsData?.step4 || 'Evolution', desc: 'Continuous impact measurement and strategic scaling.' },
            ].map((item, i) => (
              <div key={i} className="group p-12 bg-white rounded-[3rem] border border-black/5 hover:border-[#21D469] transition-all duration-700 shadow-sm relative">
                <span className="text-5xl font-display font-black text-[#21D469]/10 absolute top-12 right-12 group-hover:text-[#21D469]/20 transition-colors">{item.step}</span>
                <h3 className="text-2xl font-display font-black uppercase tracking-tighter mb-4 relative z-10">{item.title}</h3>
                <p className="text-sm font-medium italic opacity-40 group-hover:opacity-60 relative z-10">{item.desc}</p>
                <div className="mt-8 pt-8 border-t border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <ArrowRight size={20} className="text-[#21D469]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-6xl mx-auto text-center space-y-12 bg-[#0F172A] text-white p-24 rounded-[5rem] relative overflow-hidden shadow-premium">
          <div className="absolute top-0 left-0 p-12 text-[200px] font-black text-white/[0.02] select-none pointer-events-none font-display">
            LEAD
          </div>
          <SectionLabel text="JOIN THE MOVEMENT" color={COLORS.sage} />
          <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase relative z-10">
            {cmsData?.cta_title?.split(' ')[0] || 'Ready'} to <br />
            <span className="text-[#21D469]">{cmsData?.cta_title?.split(' ').slice(1).join(' ') || 'Partner?'}</span>
          </h2>
          <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed relative z-10">
            {cmsData?.cta_description || "Architect your institution's sustainable transformation with the world's leading green education network."}
          </p>
          <div className="flex flex-wrap justify-center gap-8 pt-8 relative z-10">
            <Link href={cmsData?.button_link || "/contact"}>
              <button className="bg-[#21D469] text-[#0F172A] px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-white transition-all shadow-3d">
                {cmsData?.button_text || 'Initiate Protocol'}
              </button>
            </Link>
            <Link href={cmsData?.secondary_button_link || "/about"}>
              <button className="border border-white/20 text-white px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all">
                {cmsData?.secondary_button_text || 'Learn More'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
