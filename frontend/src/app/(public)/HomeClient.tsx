'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Globe, CheckCircle2, ChevronRight, Quote, Heart, Star, Users, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { NatureIcon } from '@/components/ui/NatureIcon';

export default function HomeClient({ page }: { page: any }) {
  return (
    <div className="overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24 lg:pt-32 overflow-hidden bg-nature-gradient perspective-2000">
        {/* Animated Blobs for Depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full -mr-40 -mt-40 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-water/10 blur-[100px] rounded-full -ml-40 -mb-40 animate-blob animation-delay-2000" />
        
        <Container className="relative z-10 preserve-3d floating-subtle">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              {page.hero_subtitle && (
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white text-primary text-[10px] font-black uppercase tracking-[0.3em] shadow-xl hover-tilt">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> {page.hero_subtitle}
                </div>
              )}
              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter text-foreground drop-shadow-sm text-shadow-3d">
                {page.hero_title || 'Nature Tech'} <span className="text-gradient">2026</span>.
              </h1>
              {page.hero_description && (
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-xl font-medium border-l-4 border-primary pl-8">
                  {page.hero_description}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-6 pt-6">
                <Button variant="primary" size="xl" className="rounded-4xl shadow-3d hover:scale-110 active:scale-95 transition-transform">
                  {page.hero_button_1_text} <ArrowRight className="ml-2" />
                </Button>
                <Button variant="glass" size="xl" className="rounded-4xl hover:bg-white/20">
                  {page.hero_button_2_text}
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, rotateY: 30, scale: 0.8 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative preserve-3d"
            >
              <div className="relative z-10 rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden group p-2 lg:p-4 depth-card bg-white/5 backdrop-blur-sm">
                <div className="w-full h-full rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden relative shadow-inner">
                   {page.hero_image_url ? (
                    <img src={page.hero_image_url} alt="Sustainability" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-flora animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* 3D Floating Interactive Badges */}
              <motion.div 
                className="absolute -left-16 top-1/4 z-20 glass p-8 rounded-4xl border-white/50 shadow-3d floating-vibrant preserve-3d"
                style={{ transform: 'translateZ(100px)' }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-primary rounded-3xl flex items-center justify-center text-white shadow-xl rotate-12 group-hover:rotate-0 transition-transform">
                    <Globe size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-primary">ECOSOC</div>
                    <div className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">Special Status</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="absolute -right-10 bottom-16 z-20 glass p-8 rounded-4xl border-white/50 shadow-3d floating-subtle preserve-3d"
                style={{ transform: 'translateZ(80px)' }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-water rounded-3xl flex items-center justify-center text-white shadow-xl -rotate-12 group-hover:rotate-0 transition-transform">
                    <Users size={28} />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-water">1M+</div>
                    <div className="text-[10px] font-black text-accent uppercase tracking-widest mt-1">Eco Warriors</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 2. ABOUT SUMMARY - More Color */}
      <Section background="white" className="relative overflow-hidden perspective-2000">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-background to-transparent" />
        <Container className="preserve-3d">
          <div className="grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-10 order-2 lg:order-1">
              <div className="flex items-center gap-4">
                 <div className="w-16 h-2 bg-flora rounded-full" />
                 <span className="text-[10px] font-black text-flora uppercase tracking-[0.5em]">The Vision</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground leading-[0.9] tracking-tighter text-shadow-3d">
                {page.about_title}
              </h2>
              <div className="text-lg text-foreground/70 font-medium leading-relaxed max-w-xl">
                {page.about_description}
              </div>
              <Button variant="outline" size="xl" className="rounded-full border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all px-12 group hover:scale-105 active:scale-95">
                {page.about_button_text} <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>

            <div className="order-1 lg:order-2 grid grid-cols-2 gap-6 preserve-3d">
               {[
                 { name: 'Leaf', color: 'primary', label: 'Soil Care', bg: 'bg-primary/5' },
                 { name: 'Globe', color: 'water', label: 'Blue Planet', bg: 'bg-water/5' },
                 { name: 'Water', color: 'secondary', label: 'Hydration', bg: 'bg-secondary/5' },
                 { name: 'Energy', color: 'sun', colorVal: 'sun', label: 'Solar Power', bg: 'bg-sun/5' },
               ].map((item, i) => (
                 <motion.div
                  key={i}
                  whileHover={{ translateZ: 50, rotateX: 10, rotateY: -10 }}
                  className={`${item.bg} aspect-square rounded-[3rem] flex flex-col items-center justify-center p-6 lg:p-8 border border-white shadow-premium transition-all group pointer-events-auto cursor-pointer hover-tilt preserve-3d`}
                 >
                    <div className="preserve-3d group-hover:translateZ(30px) transition-transform duration-500">
                      <NatureIcon name={item.name as any} variant={item.colorVal ? 'accent' : (item.color as any)} size={48} className="mb-6 group-hover:scale-125 transition-transform duration-500" />
                    </div>
                    <div className="font-black text-foreground text-xl tracking-tighter drop-shadow-sm">{item.label}</div>
                 </motion.div>
               ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. IMPACT STATS - Color Grids */}
      <Section background="off-white" className="relative perspective-2000">
        <Container className="preserve-3d">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { t: page.stat_1_title, v: page.stat_1_value, c: 'primary' },
              { t: page.stat_2_title, v: page.stat_2_value, c: 'water' },
              { t: page.stat_3_title, v: page.stat_3_value, c: 'flora' },
              { t: page.stat_4_title, v: page.stat_4_value, c: 'sun' }
            ].map((stat, idx) => {
              if (!stat.t && !stat.v) return null;
              return (
                <Card key={idx} variant="glass" className="p-8 lg:p-12 text-center group transition-all duration-500 border-none shadow-3d overflow-hidden relative floating-subtle hover-tilt preserve-3d hover:translate-y-[-10px]">
                  <div className={`absolute top-0 left-0 w-1.5 h-full bg-${stat.c}`} />
                  <div className="relative z-10 preserve-3d group-hover:translateZ(40px) transition-transform">
                    <StatsCounter value={stat.v || '0'} label={stat.t || ''} />
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 4. PROGRAMS GRID - Vivid Colors */}
      <Section background="white" className="perspective-2000">
        <Container className="preserve-3d">
          <div className="text-center max-w-4xl mx-auto mb-32 space-y-8">
             <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-flora/10 text-flora text-[10px] font-black uppercase tracking-[0.4em] hover-tilt">
                <Star size={14} className="animate-spin-slow" /> Global Curriculums
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none text-shadow-3d">
                {page.programs_title || 'Educational Ecosystems'}
             </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {[
              { title: page.program_1_title, desc: page.program_1_desc, icon: 'Sprout', color: 'primary', theme: 'Soil' },
              { title: page.program_2_title, desc: page.program_2_desc, icon: 'Forest', color: 'flora', theme: 'Life' },
              { title: page.program_3_title, desc: page.program_3_desc, icon: 'Sustainability', color: 'water', theme: 'Cycle' },
              { title: page.program_4_title, desc: page.program_4_desc, icon: 'Globe', color: 'sun', theme: 'Global' },
            ].map((prog, idx) => {
              if (!prog.title) return null;
              return (
                <div key={idx} className="group relative floating-3d preserve-3d">
                  <div className={`absolute -inset-4 bg-${prog.color}/5 rounded-[4rem] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl`} />
                  <Card className="relative z-10 overflow-hidden border-none bg-background hover:bg-white p-8 lg:p-14 h-full flex flex-col rounded-[4rem] shadow-premium hover:shadow-3d depth-card preserve-3d">
                    <div className="flex items-center justify-between mb-12 preserve-3d group-hover:translateZ(40px) transition-transform">
                       <NatureIcon name={prog.icon as any} className={`scale-150 origin-left text-${prog.color} bg-${prog.color}/10`} />
                       <span className={`text-[10px] font-black text-${prog.color} uppercase tracking-[0.5em]`}>{prog.theme}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 group-hover:translate-x-2 group-hover:translateZ(20px) transition-transform leading-tight drop-shadow-sm">{prog.title}</h3>
                    <p className="text-foreground/60 font-medium text-base leading-relaxed mb-10 flex-grow">{prog.desc}</p>
                    <Link href="/programs" className={`inline-flex items-center gap-3 font-black text-${prog.color} text-[11px] uppercase tracking-[0.3em] group/link`}>
                       Deep Dive <ArrowRight size={18} className="group-hover/link:translate-x-4 transition-transform" />
                    </Link>
                  </Card>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 5. WHY CHOOSE US */}
      {(page.why_title || page.why_description) && (
        <Section background="dark" className="relative">
          <Container>
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative rounded-[3rem] overflow-hidden aspect-video lg:aspect-square">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center animate-pulse">
                    <Leaf size={40} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {page.why_title}
                </h2>
                <div className="text-white/70 font-medium leading-relaxed whitespace-pre-wrap text-lg">
                  {page.why_description}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                  {[
                    { icon: ShieldCheck, text: 'UN ECOSOC Certified' },
                    { icon: Zap, text: 'Zero Carbon Ready' },
                    { icon: Users, text: 'Global Network' },
                    { icon: Star, text: 'Award Winning' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary">
                        <item.icon size={20} />
                      </div>
                      <span className="font-bold text-white/90">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 6. FIVE ELEMENTS FRAMEWORK */}
      <Section background="nature">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-foreground">The Five Elements Framework</h2>
            <p className="text-foreground/60 font-medium">Our holistic approach to sustainable education ecosystems.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: page.element_soil_title, desc: page.element_soil_desc, icon: 'Sprout', color: 'bg-primary' },
              { title: page.element_water_title, desc: page.element_water_desc, icon: 'Water', color: 'bg-secondary' },
              { title: page.element_air_title, desc: page.element_air_desc, icon: 'Air', color: 'bg-accent' },
              { title: page.element_energy_title, desc: page.element_energy_desc, icon: 'Energy', color: 'bg-primary' },
              { title: page.element_spaces_title, desc: page.element_spaces_desc, icon: 'Globe', color: 'bg-secondary' },
            ].map((el, idx) => {
              if (!el.title) return null;
              return (
                <Card key={idx} variant="glass" className="text-center p-10 hover:bg-white transition-all group">
                  <NatureIcon name={el.icon as any} className="mb-6 scale-125 mx-auto" variant={idx % 2 === 0 ? 'primary' : 'secondary'} />
                  <h3 className="text-xl font-black text-foreground mb-4 group-hover:text-primary">{el.title}</h3>
                  <p className="text-foreground/60 text-sm font-medium leading-relaxed">{el.desc}</p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* 8. TESTIMONIALS */}
      {(page.testimonial_quote) && (
        <Section background="white">
          <Container>
            <div className="max-w-5xl mx-auto glass p-12 md:p-20 rounded-[3rem] text-center space-y-10 relative overflow-hidden">
              <Quote className="absolute -top-10 -left-10 w-40 h-40 text-primary/5 -rotate-12" />
              <Quote className="absolute -bottom-10 -right-10 w-40 h-40 text-primary/5 rotate-160" />
              
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="fill-secondary text-secondary" />)}
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-foreground leading-[1.2] tracking-tight">
                "{page.testimonial_quote}"
              </h3>
              <div className="flex flex-col items-center gap-2">
                <div className="font-black text-primary uppercase tracking-[0.2em]">{page.testimonial_author}</div>
                <div className="text-xs font-bold text-accent uppercase tracking-widest">{page.testimonial_title}</div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* 9. CTA SECTION */}
      {(page.cta_title || page.cta_description) && (
        <Section className="pb-0 pt-0 overflow-visible">
          <Container className="relative z-10 -mb-24">
            <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white shadow-2xl shadow-primary/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10" />
              <div className="relative z-10 space-y-10">
                <Heart className="w-16 h-16 text-white/30 mx-auto animate-pulse" />
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-none tracking-tighter max-w-4xl mx-auto">
                  {page.cta_title}
                </h2>
                {page.cta_description && <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-medium">{page.cta_description}</p>}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                  {page.cta_button_1_text && (
                    <Button variant="glass" size="xl" className="rounded-full bg-white text-primary border-none hover:bg-background">
                      {page.cta_button_1_text} <ArrowRight className="ml-2" />
                    </Button>
                  )}
                  {page.cta_button_2_text && (
                    <Button variant="outline" size="xl" className="rounded-full border-white/30 text-white hover:bg-white/10">
                      {page.cta_button_2_text}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Container>
          <div className="h-48 bg-foreground" />
        </Section>
      )}

    </div>
  );
}

