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
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-foreground tracking-[0.02em] leading-[0.8] text-shadow-3d">
              {page.page_title || 'Building'} <br/>
              <span className="bg-gradient-to-r from-earth via-flora to-secondary bg-clip-text text-transparent drop-shadow-2xl">
                Nature.
              </span>
            </h1>
            
            {page.main_description && (
              <p className="text-xl md:text-3xl text-foreground/50 max-w-3xl leading-tight font-medium border-l-[12px] border-earth pl-16 py-4">
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
                
                <div className="grid grid-cols-2 gap-8 pt-8 preserve-3d">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: -10, translateZ: 30 }}
                    className="p-10 rounded-[3rem] bg-white border border-black/5 shadow-3d depth-card relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-6xl font-black text-primary tracking-tighter mb-2 text-shadow-3d">2021</div>
                    <div className="text-[10px] font-black text-earth uppercase tracking-[0.4em] relative z-10">ECOSOC Status</div>
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, rotateY: 10, translateZ: 30 }}
                    className="p-10 rounded-[3rem] bg-white border border-black/5 shadow-3d depth-card relative overflow-hidden group animation-delay-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-6xl font-black text-secondary tracking-tighter mb-2 text-shadow-3d">Net 0</div>
                    <div className="text-[10px] font-black text-earth uppercase tracking-[0.4em] relative z-10">Global Pledge</div>
                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors" />
                  </motion.div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 perspective-2000 preserve-3d">
              {elements.map((el, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                  whileHover={{ 
                    y: -15, 
                    rotateY: 8, 
                    rotateX: -5,
                    translateZ: 100,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-[3.5rem] p-10 shadow-3d group cursor-pointer h-[550px] flex flex-col justify-between preserve-3d transition-all duration-500",
                    i % 5 === 0 ? "bg-primary" : 
                    i % 5 === 1 ? "bg-water" : 
                    i % 5 === 2 ? "bg-earth" : 
                    i % 5 === 3 ? "bg-flora" : "bg-sun"
                  )}
                >
                  {/* Atmospheric Glow Background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -mr-32 -mt-32 group-hover:bg-white/40 transition-colors duration-700" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[60px] rounded-full -ml-24 -mb-24" />
                  
                  {/* Glassmorphic Icon Container */}
                  <div 
                    className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 preserve-3d"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    <NatureIcon name={el.icon as any} className="text-white scale-125" />
                  </div>

                  <div className="relative z-10 space-y-6 preserve-3d" style={{ transform: 'translateZ(30px)' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-1 bg-white/40 rounded-full" />
                      <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">Element 0{i + 1}</span>
                    </div>
                    <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-[0.9] text-shadow-3d">
                      {el.title}
                    </h3>
                    <p className="text-white/80 text-lg font-medium leading-tight">
                      {el.description}
                    </p>
                  </div>

                  {/* Grain Overlay */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay grain-overlay" />
                  
                  {/* Floating Micro-interaction Decor */}
                  <div className="absolute top-1/2 right-4 w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                  <div className="absolute bottom-1/3 left-6 w-1 h-1 rounded-full bg-white/20 animate-ping" />
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

            <div className="relative max-w-7xl mx-auto perspective-2000 preserve-3d">
               <div className="absolute -inset-10 bg-earth/10 rounded-[6rem] blur-[120px] opacity-40 animate-pulse" />
               <motion.div 
                 whileHover={{ scale: 1.01, rotateY: 2 }}
                 className="relative z-10 overflow-hidden shadow-3d rounded-[5rem] border border-white/40 bg-white/80 backdrop-blur-3xl preserve-3d"
               >
                 <div className="grid lg:grid-cols-2 items-stretch">
                   <div className="relative min-h-[700px] group overflow-hidden perspective-1000">
                     {page.founder_image ? (
                       <img src={page.founder_image} alt={page.founder_name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
                     ) : (
                       <div className="absolute inset-0 bg-earth/5 flex items-center justify-center">
                         <User className="w-40 h-40 text-earth/20" />
                       </div>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-r from-earth/40 via-transparent to-transparent mix-blend-overlay" />
                     <div className="absolute bottom-12 left-12 glass p-8 rounded-3xl border-white/30 floating-subtle">
                        <div className="text-white text-xs font-black uppercase tracking-[0.4em]">Chief Visionary</div>
                     </div>
                   </div>
                   <div className="p-20 lg:p-32 flex flex-col justify-center space-y-16 preserve-3d">
                     <div className="space-y-6" style={{ transform: 'translateZ(50px)' }}>
                       <h3 className="text-6xl md:text-8xl font-black text-foreground tracking-tighter leading-none text-shadow-3d">{page.founder_name}</h3>
                       <div className="inline-flex items-center gap-5 text-earth font-black uppercase tracking-[0.5em] text-[12px] bg-earth/10 px-8 py-3 rounded-full border border-earth/20">
                         {page.founder_designation}
                       </div>
                     </div>
                     <div className="text-2xl md:text-3xl text-foreground/40 font-medium leading-relaxed italic border-l-[10px] border-earth/30 pl-12 drop-shadow-sm" style={{ transform: 'translateZ(30px)' }}>
                       "{page.founder_description}"
                     </div>
                     {page.founder_profile_link && (
                       <div style={{ transform: 'translateZ(60px)' }}>
                         <Button variant="primary" size="xl" className="rounded-[2.5rem] bg-earth hover:bg-primary px-16 py-10 text-2xl font-black shadow-[0_20px_50px_rgba(102,67,46,0.3)] border-none">
                           Meet the Founder <ArrowRight className="ml-4" size={28} />
                         </Button>
                       </div>
                     )}
                   </div>
                 </div>
               </motion.div>
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
      {/* GLOBAL GRAIN OVERLAY */}
      <div className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-[0.15] z-[100] grain-overlay" />
    </div>
  );
}

