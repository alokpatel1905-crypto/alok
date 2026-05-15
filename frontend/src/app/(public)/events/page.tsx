'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Calendar, MapPin, Globe, ArrowRight, ArrowUpRight, 
  Users, Mic2, ShieldCheck, Zap, Star, Clock, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

import { getEventsPage } from '@/lib/api';

export default function EventsPage() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventsPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const FEATURED_EVENTS = [
    { prefix: 'event1', title: cmsData?.event1_title, subtitle: cmsData?.event1_subtitle, date: cmsData?.event1_date, location: cmsData?.event1_location, desc: cmsData?.event1_description, image: cmsData?.event1_image, buttons: [{ text: cmsData?.event1_button1_text, link: cmsData?.event1_button1_link }, { text: cmsData?.event1_button2_text, link: cmsData?.event1_button2_link }] },
    { prefix: 'event2', title: cmsData?.event2_title, subtitle: cmsData?.event2_subtitle, date: cmsData?.event2_date, location: cmsData?.event2_location, desc: cmsData?.event2_description, image: cmsData?.event2_image, buttons: [{ text: cmsData?.event2_button1_text, link: cmsData?.event2_button1_link }, { text: cmsData?.event2_button2_text, link: cmsData?.event2_button2_link }] },
    { prefix: 'event3', title: cmsData?.event3_title, subtitle: cmsData?.event3_subtitle, date: cmsData?.event3_date, location: cmsData?.event3_location, desc: cmsData?.event3_description, image: cmsData?.event3_image, buttons: [{ text: cmsData?.event3_button1_text, link: cmsData?.event3_button1_link }, { text: cmsData?.event3_button2_text, link: cmsData?.event3_button2_link }] },
    { prefix: 'event4', title: cmsData?.event4_title, subtitle: cmsData?.event4_subtitle, date: cmsData?.event4_date, location: cmsData?.event4_location, desc: cmsData?.event4_description, image: cmsData?.event4_image, buttons: [{ text: cmsData?.event4_button1_text, link: cmsData?.event4_button1_link }, { text: cmsData?.event4_button2_text, link: cmsData?.event4_button2_link }] },
  ].filter(e => e.title);

  const UPCOMING = cmsData?.upcoming_events || [];

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="GLOBAL SUMMITS" />
          <h1 className="text-[clamp(50px,10vw,150px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
            {cmsData?.page_title?.split(' ')[0] || 'Gathering'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1).join(' ') || 'of Visionaries.'}</span>
          </h1>
          <p className="text-2xl font-serif italic text-[#0F172A]/60 leading-relaxed max-w-3xl">
            {cmsData?.subtitle || "Our events bring together the brightest minds in sustainable education to architect the global transition towards resilient, nature-inspired learning ecosystems."}
          </p>
          {cmsData?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{cmsData.intro_description}</p>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-32 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="space-y-40">
            {FEATURED_EVENTS.map((event, i) => (
              <div key={i} className="grid lg:grid-cols-12 gap-24 items-center">
                <div className={`lg:col-span-7 relative ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-premium relative bg-[#0F172A]">
                    <img src={event.image || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80'} className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 bg-[#0F172A]/20" />
                    <div className="absolute top-10 left-10">
                       <div className="px-8 py-3 bg-[#FACC15] rounded-full text-[10px] font-black uppercase tracking-widest text-[#0F172A] shadow-3d">
                        {event.date}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-12 -right-12 bg-white border border-black/5 p-12 rounded-[3rem] text-[#0F172A] shadow-premium hidden lg:block">
                    <MapPin size={32} className="text-[#21D469] mb-4" />
                    <div className="text-xs font-black uppercase tracking-widest">{event.location}</div>
                  </div>
                </div>

                <div className={`lg:col-span-5 space-y-12 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">{event.subtitle}</span>
                    <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">{event.title}</h2>
                  </div>
                  <p className="text-xl font-medium italic opacity-60 leading-relaxed">
                    {event.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-6 pt-8">
                    {event.buttons.filter(b => b.text).map((btn, j) => (
                      <Link key={j} href={btn.link || '#'}>
                        <button className={cn(
                          "px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-3d active:scale-95",
                          j === 0 ? "bg-[#0F172A] text-white hover:bg-[#21D469] hover:text-[#0F172A]" : "bg-white border border-black/10 hover:border-[#21D469]"
                        )}>
                          {btn.text} <ArrowUpRight size={14} className="inline ml-2" />
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Timeline */}
      {UPCOMING.length > 0 && (
        <section className="py-40 px-8 lg:px-16 bg-[#F8FAFC]">
           <div className="max-w-[1800px] mx-auto">
              <SectionLabel text="UPCOMING TIMELINE" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {UPCOMING.map((ev: any, i: number) => (
                   <div key={i} className="bg-white p-12 rounded-[3rem] border border-black/5 hover:border-[#21D469] transition-all group">
                      <div className="flex justify-between items-start mb-8">
                         <div className="w-12 h-12 rounded-2xl bg-[#21D469]/10 flex items-center justify-center text-[#21D469]">
                            <Clock size={24} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest opacity-20">{ev.date}</span>
                      </div>
                      <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-[#21D469] transition-colors">{ev.name}</h4>
                      <p className="text-sm font-medium italic opacity-40 mb-8 line-clamp-3">{ev.description}</p>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#0F172A]/40 mb-8">
                         <MapPin size={14} className="text-[#21D469]" /> {ev.location}
                      </div>
                      {ev.link && (
                        <Link href={ev.link} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#21D469] hover:translate-x-2 transition-transform">
                          REGISTRATION PROTOCOL <ArrowRight size={14} />
                        </Link>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Manifesto Section */}
      {cmsData?.why_description && (
        <section className="py-40 px-8 lg:px-16 overflow-hidden relative">
           <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[300px] font-black text-black/[0.01] select-none pointer-events-none font-display">
              WHY
           </div>
           <div className="max-w-[1800px] mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <SectionLabel text="PARTICIPATION MANIFESTO" />
                    <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                       {cmsData?.why_title?.split(' ')[0] || 'Institutional'} <br />
                       <span className="text-[#21D469]">{cmsData?.why_title?.split(' ').slice(1).join(' ') || 'Excellence.'}</span>
                    </h2>
                    <p className="text-2xl font-serif italic opacity-60 leading-relaxed max-w-xl">
                       {cmsData.why_description}
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: Users, label: 'Global Network', val: '50k+' },
                      { icon: Target, label: 'Verified Nodes', val: '2k+' },
                      { icon: Globe, label: 'Countries', val: '40+' },
                      { icon: Zap, label: 'Impact Factor', val: '9.8' },
                    ].map((stat, i) => (
                      <div key={i} className="p-10 bg-[#F8FAFC] rounded-[3rem] border border-black/5 flex flex-col items-center text-center group">
                         <stat.icon size={32} className="mb-6 text-[#21D469] group-hover:text-[#0F172A]" />
                         <div className="text-4xl font-display font-black tracking-tighter group-hover:text-[#0F172A]">{stat.val}</div>
                         <div className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:text-[#0F172A]/60">{stat.label}</div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Hosting Request CTA */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-white/[0.02] select-none pointer-events-none font-display">
          HOST
        </div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-12">
          <SectionLabel text="REGIONAL NODES" color={COLORS.sage} />
          <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase">
            {cmsData?.cta_title?.split(' ')[0] || 'Lead'} <br />
            <span className="text-[#21D469]">{cmsData?.cta_title?.split(' ').slice(1).join(' ') || 'the Dialogue.'}</span>
          </h2>
          <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
            {cmsData?.cta_description || 'Partner with Green Mentors to bring the global green education dialogue to your city or institution.'}
          </p>
          <div className="flex justify-center pt-8">
            <Link href={cmsData?.button_link || "/contact"}>
              <button className="bg-white text-[#0F172A] px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                {cmsData?.button_text || 'Partner Protocol'}
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
