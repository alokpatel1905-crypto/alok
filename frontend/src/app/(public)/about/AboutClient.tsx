'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, User, ArrowRight, Globe, ShieldCheck, Star, ExternalLink, ChevronRight, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon, Icons } from '@/components/ui/NatureIcon';
import { StatsCounter } from '@/components/ui/StatsCounter';

export default function AboutClient({ page }: { page: any }) {
  const elements = [
    { title: page.soil_title || 'Soil', description: page.soil_description, icon: 'Sprout' },
    { title: page.water_title || 'Water', description: page.water_description, icon: 'Water' },
    { title: page.air_title || 'Air', description: page.air_description, icon: 'Air' },
    { title: page.energy_title || 'Energy', description: page.energy_description, icon: 'Energy' },
    { title: page.spaces_title || 'Spaces', description: page.spaces_description, icon: 'Globe' },
  ].filter(e => e.description);

  return (
    <div className="overflow-x-hidden bg-[#FEF9F5] perspective-2000">
      
      {/* 1. HERO SECTION - Earth & Soil Theme */}
      <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-earth/20 via-background to-accent/10 perspective-2000">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-earth/10 blur-[150px] rounded-full animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sun/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        
        {page.about_image && (
          <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply">
            <img src={page.about_image} alt={page.image_alt || 'Banner'} className="w-full h-full object-cover" />
          </div>
        )}

        <Container className="relative z-10 preserve-3d floating-subtle">
          <div className="max-w-5xl space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white text-earth text-[10px] font-black uppercase tracking-[0.4em] shadow-premium hover-tilt"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-earth animate-pulse" /> {page.short_subtitle || 'Rooted in Purpose'}
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.8] drop-shadow-sm text-shadow-3d">
              {page.page_title || 'Building'} <span className="text-earth">Nature</span>.
            </h1>
            
            {page.main_description && (
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-tight font-medium border-l-8 border-earth pl-12 py-2 drop-shadow-md">
                {page.main_description}
              </p>
            )}
          </div>
        </Container>

        {/* 3D Floating Interactive Badge */}
        <motion.div 
          className="absolute right-20 top-1/2 z-20 hidden xl:block glass p-10 rounded-4xl border-white/50 shadow-3d floating-vibrant preserve-3d"
          style={{ transform: 'translateZ(120px) rotate(12deg)' }}
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-earth rounded-3xl flex items-center justify-center text-white shadow-2xl group-hover:rotate-0 transition-transform">
              <Leaf size={32} />
            </div>
            <div>
              <div className="text-3xl font-black text-earth tracking-tighter">EST. 2010</div>
              <div className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">Sustainability Pioneers</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. VISION & MISSION - 3D Perspective */}
      {(page.vision_title || page.vision_description) && (
        <Section className="relative z-10 perspective-2000">
          <Container className="preserve-3d">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div className="relative preserve-3d">
                <motion.div 
                  whileHover={{ rotateY: -10, rotateX: 10, translateZ: 50 }}
                  className="relative z-10 rounded-[4rem] overflow-hidden group p-4 depth-card bg-white/5 backdrop-blur-sm"
                >
                  <img 
                    src={page.about_image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"} 
                    className="w-full h-full object-cover rounded-[3.5rem] group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-earth/20 rounded-full blur-[100px] animate-blob" />
              </div>

              <div className="space-y-12">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-2 bg-earth rounded-full" />
                   <span className="text-[9px] font-black text-earth uppercase tracking-[0.5em] hover-tilt">The Strategic Path</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
                  {page.vision_title || 'Visionary Impact.'}
                </h2>
                <div className="text-2xl text-foreground/60 leading-relaxed font-medium">
                  {page.vision_description}
                </div>
                
                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-premium floating-3d">
                    <div className="text-5xl font-black text-primary tracking-tighter mb-2">2021</div>
                    <div className="text-[9px] font-black text-earth uppercase tracking-[0.3em]">ECOSOC Status</div>
                  </div>
                  <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-premium floating-3d animation-delay-500">
                    <div className="text-5xl font-black text-secondary tracking-tighter mb-2">Net 0</div>
                    <div className="text-[9px] font-black text-earth uppercase tracking-[0.3em]">Global Pledge</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 3. ELEMENTS FRAMEWORK - Multi-colored Bento Grid */}
      {elements.length > 0 && (
        <Section className="bg-nature-gradient relative">
          <Container>
            <div className="text-center max-w-4xl mx-auto mb-32 space-y-10">
              <h2 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-none">The 5 Elements.</h2>
              <p className="text-2xl text-foreground/60 font-medium max-w-2xl mx-auto">Our holistic blueprint for designing regenerative education ecosystems across the globe.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 perspective-1000">
              {elements.map((el, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -20, rotateX: 5, translateZ: 30 }}
                  className={cn(
                    "relative overflow-hidden rounded-[3rem] p-12 shadow-premium hover:shadow-3d transition-all group cursor-pointer h-[450px] flex flex-col justify-between",
                    i % 5 === 0 ? "bg-primary text-white" : 
                    i % 5 === 1 ? "bg-water text-white" : 
                    i % 5 === 2 ? "bg-earth text-white" : 
                    i % 5 === 3 ? "bg-flora text-white" : "bg-sun text-white"
                  )}
                >
                  <NatureIcon name={el.icon as any} className="scale-150 origin-left text-white bg-white/10" />
                  <div>
                    <h3 className="text-3xl font-black mb-6 tracking-tighter">{el.title}</h3>
                    <p className="text-white/80 text-sm font-medium leading-relaxed">{el.description}</p>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 4. FOUNDER / LEADERSHIP - Premium Spotlight */}
      {(page.founder_name || page.leadership_title) && (
        <Section background="off-white">
          <Container>
            <div className="text-center mb-32">
               <h2 className="text-7xl font-black tracking-tighter">{page.leadership_title || 'Global Leadership'}</h2>
               <div className="w-24 h-3 bg-earth mx-auto rounded-full mt-8" />
            </div>

            <div className="relative max-w-7xl mx-auto">
               <div className="absolute -inset-4 bg-earth/10 rounded-[5rem] blur-3xl opacity-50" />
               <Card className="relative z-10 p-0 overflow-hidden shadow-3d rounded-[4.5rem] border-none bg-white">
                 <div className="grid lg:grid-cols-2 items-stretch">
                   <div className="relative min-h-[600px] group overflow-hidden">
                     {page.founder_image ? (
                       <img src={page.founder_image} alt={page.founder_name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                     ) : (
                       <div className="absolute inset-0 bg-earth/5 flex items-center justify-center">
                         <User className="w-32 h-32 text-earth/20" />
                       </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-r from-earth/30 to-transparent" />
                   </div>
                   <div className="p-16 lg:p-24 flex flex-col justify-center space-y-12">
                     <div className="space-y-4">
                       <h3 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none">{page.founder_name}</h3>
                       <div className="inline-flex items-center gap-4 text-earth font-black uppercase tracking-[0.4em] text-[11px] bg-earth/5 px-6 py-2 rounded-full">
                         {page.founder_designation}
                       </div>
                     </div>
                     <div className="text-2xl text-foreground/60 font-medium leading-relaxed italic border-l-4 border-earth/20 pl-10">
                       "{page.founder_description}"
                     </div>
                     {page.founder_profile_link && (
                       <Button variant="primary" size="xl" className="rounded-full shadow-3d bg-earth hover:bg-primary px-14 py-8 text-xl">
                         Meet the Founder <ArrowRight className="ml-3" />
                       </Button>
                     )}
                   </div>
                 </div>
               </Card>
            </div>
          </Container>
        </Section>
      )}

      {/* 5. FINAL CTA - Nature Tech theme */}
      <Section className="relative overflow-hidden bg-foreground">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/20 blur-[150px] rounded-full -mr-40 -mt-40 animate-blob" />
        <Container className="relative z-10 text-center space-y-16 py-20">
          <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85]">
            Let's Redesign <br/> <span className="text-gradient">The Future</span>.
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <Button variant="primary" size="xl" className="rounded-full shadow-2xl shadow-primary/40 bg-primary px-16 py-10 text-2xl font-black">
              Start Your Journey <ArrowRight className="ml-4" size={32} />
            </Button>
            <Button variant="glass" size="xl" className="rounded-full text-white border-white/20 px-16 py-10 text-2xl font-black">
              Explore Programs
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}

