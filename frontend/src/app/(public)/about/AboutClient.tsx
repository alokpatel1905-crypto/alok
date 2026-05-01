'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, User, ArrowRight, Globe, ShieldCheck, Star, ExternalLink, ChevronRight, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon, Icons } from '@/components/ui/NatureIcon';

const springTrans = { type: "spring" as const, stiffness: 300, damping: 30 };

export default function AboutClient({ page }: { page: any }) {
  const elements = [
    { title: page.soil_title || 'Soil', description: page.soil_description, icon: 'Sprout', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: page.water_title || 'Water', description: page.water_description, icon: 'Water', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: page.air_title || 'Air', description: page.air_description, icon: 'Air', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { title: page.energy_title || 'Energy', description: page.energy_description, icon: 'Energy', color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: page.spaces_title || 'Spaces', description: page.spaces_description, icon: 'Globe', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ].filter(e => e.description);

  return (
    <div className="overflow-x-hidden bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden bg-white border-b border-slate-200">
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTrans}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide uppercase">
                <Leaf className="w-3 h-3 text-emerald-600" /> {page.short_subtitle || 'Rooted in Purpose'}
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                {page.page_title || 'Building'} <br/>
                <span className="text-emerald-600">Nature.</span>
              </h1>
              
              {page.main_description && (
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-xl">
                  {page.main_description}
                </p>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTrans, delay: 0.1 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-white aspect-[4/3]">
                {page.about_image ? (
                  <img src={page.about_image} alt={page.image_alt || 'About Us'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                    <Globe className="w-24 h-24 text-slate-300" />
                  </div>
                )}
                
                <div className="absolute bottom-6 right-6 bg-white border border-slate-200 shadow-lg rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 tracking-tight">EST. 2010</div>
                    <div className="text-xs text-slate-500 font-medium">Sustainability Pioneers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. VISION & MISSION */}
      {(page.vision_title || page.vision_description) && (
        <Section background="off-white" className="border-b border-slate-200">
          <Container>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-square lg:aspect-auto lg:h-[600px] bg-white">
                  <img 
                    src={page.about_image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"} 
                    className="w-full h-full object-cover" 
                    alt="Vision"
                  />
                </div>
              </div>

              <div className="space-y-10 order-1 lg:order-2">
                <div>
                  <div className="text-sm font-bold text-emerald-600 tracking-wide uppercase mb-3">The Strategic Path</div>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                    {page.vision_title || 'Visionary Impact.'}
                  </h2>
                </div>
                
                <div className="text-lg text-slate-600 leading-relaxed font-medium">
                  {page.vision_description}
                </div>
                
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">2021</div>
                    <div className="text-sm font-semibold text-slate-500">ECOSOC Status</div>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Net 0</div>
                    <div className="text-sm font-semibold text-slate-500">Global Pledge</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 3. ELEMENTS FRAMEWORK */}
      {elements.length > 0 && (
        <Section background="white" className="border-b border-slate-200">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">The 5 Elements.</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Our holistic blueprint for designing regenerative education ecosystems across the globe.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {elements.map((el, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-start gap-4 group"
                >
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center transition-colors", el.bg, el.color)}>
                    <NatureIcon name={el.icon as any} size={28} />
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Element 0{i + 1}</div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                      {el.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mt-2 flex-grow">
                    {el.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 4. FOUNDER / LEADERSHIP */}
      {(page.founder_name || page.leadership_title) && (
        <Section background="off-white" className="border-b border-slate-200">
          <Container>
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
                 {page.leadership_title || 'Global Leadership'}
               </h2>
            </div>

            <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-2/5 relative h-80 md:h-auto bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200">
                 {page.founder_image ? (
                   <img src={page.founder_image} alt={page.founder_name} className="absolute inset-0 w-full h-full object-cover" />
                 ) : (
                   <div className="absolute inset-0 flex items-center justify-center">
                     <User className="w-24 h-24 text-slate-300" />
                   </div>
                 )}
              </div>
              
              <div className="md:w-3/5 p-10 md:p-16 flex flex-col justify-center space-y-8">
                 <div>
                   <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2">{page.founder_name}</h3>
                   <div className="inline-flex items-center text-emerald-700 font-semibold text-sm bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                     {page.founder_designation}
                   </div>
                 </div>
                 
                 <div className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed italic border-l-4 border-slate-200 pl-6">
                   "{page.founder_description}"
                 </div>
                 
                 {page.founder_profile_link && (
                   <div className="pt-4">
                     <Button variant="outline" size="lg" className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold">
                       Meet the Founder <ExternalLink className="ml-2 w-4 h-4" />
                     </Button>
                   </div>
                 )}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 5. FINAL CTA */}
      <Section className="bg-[#0A0A0A] border-b border-slate-800 text-white py-24">
        <Container className="text-center space-y-12 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Let's Redesign <br/> <span className="text-emerald-500">The Future</span>.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold border-none px-8">
              Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-xl border-white/20 hover:bg-white/10 text-white font-semibold px-8">
              Explore Programs
            </Button>
          </div>
        </Container>
      </Section>
      
    </div>
  );
}

