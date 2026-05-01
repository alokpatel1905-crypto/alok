'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Globe, ChevronRight, Quote, Heart, Star, Users, Zap, ShieldCheck, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { NatureIcon } from '@/components/ui/NatureIcon';

const springTrans = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function HomeClient({ page }: { page: any }) {
  return (
    <div className="overflow-x-hidden bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 lg:pt-32 overflow-hidden bg-white border-b border-slate-200">
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTrans}
              className="space-y-8"
            >
              {page.hero_subtitle && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  {page.hero_subtitle}
                </div>
              )}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {page.hero_title || 'Nature Tech'} <span className="text-emerald-600">2026</span>.
              </h1>
              {page.hero_description && (
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
                  {page.hero_description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button variant="primary" size="lg" className="rounded-xl shadow-sm hover:shadow-md transition-all group">
                  {page.hero_button_1_text || 'Get Started'} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 group">
                  <PlayCircle className="mr-2 w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" /> {page.hero_button_2_text || 'Watch Demo'}
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTrans, delay: 0.1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
                 {page.hero_image_url ? (
                  <img src={page.hero_image_url} alt="Platform Dashboard" className="w-full h-full object-cover" />
                ) : (
                  <div className="aspect-[4/3] w-full bg-slate-100 flex items-center justify-center border-b border-slate-200">
                    <div className="text-slate-400 font-medium">Dashboard Preview</div>
                  </div>
                )}
                {/* Flat, SaaS-style badge replacing 3D floating object */}
                <div className="absolute bottom-4 left-4 lg:-left-6 bg-white border border-slate-200 shadow-lg rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">ECOSOC Status</div>
                    <div className="text-xs text-slate-500 font-medium">United Nations Certified</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT SUMMARY */}
      <Section background="off-white" className="border-b border-slate-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="text-sm font-bold text-emerald-600 tracking-wide uppercase">The Vision</div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
                {page.about_title}
              </h2>
              <div className="text-lg text-slate-600 font-medium leading-relaxed max-w-xl">
                {page.about_description}
              </div>
              <Button variant="outline" size="lg" className="rounded-xl border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition-all group">
                {page.about_button_text} <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
               {[
                 { name: 'Leaf', color: 'text-emerald-600', label: 'Soil Care', bg: 'bg-emerald-50' },
                 { name: 'Globe', color: 'text-blue-600', label: 'Blue Planet', bg: 'bg-blue-50' },
                 { name: 'Water', color: 'text-cyan-600', label: 'Hydration', bg: 'bg-cyan-50' },
                 { name: 'Energy', color: 'text-amber-500', label: 'Solar Power', bg: 'bg-amber-50' },
               ].map((item, i) => (
                 <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start gap-4"
                 >
                    <div className={`p-3 rounded-lg ${item.bg} ${item.color}`}>
                      <NatureIcon name={item.name as any} size={24} />
                    </div>
                    <div className="font-semibold text-slate-900">{item.label}</div>
                 </div>
               ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. IMPACT STATS */}
      <Section background="white" className="border-b border-slate-200 py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {[
              { t: page.stat_1_title, v: page.stat_1_value },
              { t: page.stat_2_title, v: page.stat_2_value },
              { t: page.stat_3_title, v: page.stat_3_value },
              { t: page.stat_4_title, v: page.stat_4_value }
            ].map((stat, idx) => {
              if (!stat.t && !stat.v) return null;
              return (
                <div key={idx} className="px-6 text-center lg:text-left">
                  <div className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2">
                    <StatsCounter value={stat.v || '0'} label="" />
                  </div>
                  <div className="text-sm font-medium text-slate-500">{stat.t}</div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. PROGRAMS GRID */}
      <Section background="off-white" className="border-b border-slate-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
             <div className="text-sm font-bold text-emerald-600 tracking-wide uppercase">Educational Ecosystems</div>
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                {page.programs_title || 'Global Curriculums'}
             </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: page.program_1_title, desc: page.program_1_desc, icon: 'Sprout', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { title: page.program_2_title, desc: page.program_2_desc, icon: 'Forest', color: 'text-teal-600', bg: 'bg-teal-50' },
              { title: page.program_3_title, desc: page.program_3_desc, icon: 'Sustainability', color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: page.program_4_title, desc: page.program_4_desc, icon: 'Globe', color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((prog, idx) => {
              if (!prog.title) return null;
              return (
                <div key={idx} className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${prog.bg} ${prog.color}`}>
                     <NatureIcon name={prog.icon as any} size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{prog.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{prog.desc}</p>
                  <Link href="/programs" className="inline-flex items-center font-semibold text-emerald-600 text-sm hover:text-emerald-700">
                     Explore Program <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 5. WHY CHOOSE US (Dark Mode Section) */}
      {(page.why_title || page.why_description) && (
        <Section background="dark" className="bg-[#0A0A0A] border-b border-slate-800">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0A0A] to-transparent opacity-60" />
              </div>
              <div className="space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                  {page.why_title}
                </h2>
                <div className="text-slate-400 font-medium leading-relaxed text-lg">
                  {page.why_description}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  {[
                    { icon: ShieldCheck, text: 'UN ECOSOC Certified' },
                    { icon: Zap, text: 'Zero Carbon Ready' },
                    { icon: Users, text: 'Global Network' },
                    { icon: Star, text: 'Award Winning' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-500">
                        <item.icon size={20} />
                      </div>
                      <span className="font-semibold text-slate-300 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. FIVE ELEMENTS FRAMEWORK */}
      <Section background="white" className="border-b border-slate-200">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">The Five Elements Framework</h2>
            <p className="text-slate-500 font-medium">Our holistic approach to sustainable education ecosystems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: page.element_soil_title, desc: page.element_soil_desc, icon: 'Sprout' },
              { title: page.element_water_title, desc: page.element_water_desc, icon: 'Water' },
              { title: page.element_air_title, desc: page.element_air_desc, icon: 'Air' },
              { title: page.element_energy_title, desc: page.element_energy_desc, icon: 'Energy' },
              { title: page.element_spaces_title, desc: page.element_spaces_desc, icon: 'Globe' },
            ].map((el, idx) => {
              if (!el.title) return null;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 text-emerald-600">
                    <NatureIcon name={el.icon as any} size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">{el.title}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{el.desc}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 8. TESTIMONIALS */}
      {(page.testimonial_quote) && (
        <Section background="off-white" className="border-b border-slate-200">
          <Container>
            <div className="max-w-4xl mx-auto bg-white border border-slate-200 shadow-sm p-10 md:p-16 rounded-2xl text-center space-y-8 relative">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-slate-100" />
              
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className="fill-amber-400 text-amber-400" />)}
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-snug tracking-tight">
                "{page.testimonial_quote}"
              </h3>
              <div className="flex flex-col items-center gap-1 pt-4">
                <div className="font-bold text-slate-900">{page.testimonial_author}</div>
                <div className="text-sm font-medium text-slate-500">{page.testimonial_title}</div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 9. CTA SECTION */}
      {(page.cta_title || page.cta_description) && (
        <Section background="white" className="pb-24 pt-24">
          <Container>
            <div className="bg-emerald-600 rounded-2xl p-12 md:p-20 text-center text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-700/20" />
              <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                  {page.cta_title}
                </h2>
                {page.cta_description && <p className="text-lg md:text-xl text-emerald-50 font-medium">{page.cta_description}</p>}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  {page.cta_button_1_text && (
                    <Button variant="glass" size="lg" className="rounded-xl bg-white text-emerald-600 border-none hover:bg-slate-50 font-semibold shadow-sm">
                      {page.cta_button_1_text} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  )}
                  {page.cta_button_2_text && (
                    <Button variant="outline" size="lg" className="rounded-xl border-white/30 text-white hover:bg-white/10 font-semibold">
                      {page.cta_button_2_text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

    </div>
  );
}

