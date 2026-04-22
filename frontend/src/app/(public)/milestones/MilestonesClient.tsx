'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CalendarDays, Award, Star, History, Target, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

export default function MilestonesClient({ page, list }: { page: any, list: any[] }) {
  const activeMilestones = list.filter((m: any) => m.status === 'Active');

  return (
    <div className="overflow-x-hidden bg-[#F2FDF5] perspective-1000">
      
      {/* 1. HERO SECTION - Flora Theme */}
      <section className="relative min-h-[75vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-flora/20 via-background to-primary/10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-flora/10 blur-[150px] rounded-full animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white text-primary text-[10px] font-black uppercase tracking-[0.4em] shadow-premium"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-flora animate-pulse" /> {page.subtitle || 'Historic Growth'}
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-foreground tracking-tighter leading-[0.8] drop-shadow-sm">
              {page.page_title || 'Our'} <span className="text-flora">Journey</span>.
            </h1>
            
            {page.intro_description && (
              <p className="text-2xl md:text-3xl text-foreground/70 max-w-3xl leading-tight font-medium border-l-8 border-flora pl-12 py-2">
                {page.intro_description}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* 2. TIMELINE SECTION - 3D Perspective Nodes */}
      <Section className="relative z-10 overflow-visible">
        <Container className="max-w-6xl">
          {activeMilestones.length === 0 ? (
            <div className="text-center py-40 bg-white rounded-[4rem] shadow-3d border border-white">
              <History className="w-24 h-24 text-flora/20 mx-auto mb-10" />
              <h3 className="text-4xl font-black text-foreground/40 tracking-tighter">Growth in progress.</h3>
            </div>
          ) : (
            <div className="relative">
              {/* Vertical line with 3D shadow */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-flora via-primary to-flora rounded-full md:-translate-x-1/2 opacity-20" />
              
              <div className="space-y-40 relative z-10">
                {activeMilestones.map((milestone: any, index: number) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div 
                      key={milestone.id} 
                      whileInView={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 50 }}
                      viewport={{ once: true }}
                      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                      {/* 3D Animated Node */}
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute left-6 md:left-1/2 top-0 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-12 h-12 bg-white rounded-full border-4 border-flora shadow-3d z-30 flex items-center justify-center"
                      >
                         <div className="w-4 h-4 bg-flora rounded-full" />
                      </motion.div>

                      {/* Content side with 3D Float */}
                      <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pl-20' : 'md:pr-20'}`}>
                        <motion.div
                          whileHover={{ rotateY: isEven ? -10 : 10, translateZ: 50 }}
                          className="preserve-3d"
                        >
                          <Card className={cn(
                            "p-16 rounded-[4rem] border-none shadow-3d group transition-all duration-700",
                            isEven ? "bg-white hover:bg-flora/5" : "bg-white hover:bg-primary/5"
                          )}>
                            <div className="flex items-center justify-between mb-8">
                              <div className={cn("text-6xl font-black tracking-tighter", isEven ? "text-flora" : "text-primary")}>
                                {milestone.year}
                              </div>
                              <NatureIcon name={isEven ? 'Award' : 'Target'} className={cn("scale-150", isEven ? "text-flora" : "text-primary")} />
                            </div>
                            {milestone.title && <h3 className="text-4xl font-black text-foreground mb-8 tracking-tighter leading-none">{milestone.title}</h3>}
                            <p className="text-xl text-foreground/60 font-medium leading-relaxed">{milestone.description}</p>
                          </Card>
                        </motion.div>
                      </div>

                      {/* Spacer side */}
                      <div className="hidden md:block md:w-1/2" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* 3. CTA - Forest Depth */}
      <Section className="relative overflow-hidden bg-primary">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-flora/20 blur-[150px] rounded-full animate-blob" />
        <Container className="relative z-10 text-center space-y-16 py-20">
          <History className="w-32 h-32 text-flora mx-auto opacity-30 animate-float" />
          <h2 className="text-7xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85]">
            Redesigning <br/> <span className="text-flora">History</span>.
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            <Button variant="primary" size="xl" className="rounded-full shadow-3d bg-flora hover:bg-white hover:text-flora px-16 py-10 text-2xl font-black transition-all">
               {page.button_text || 'Join Now'} <ArrowRight className="ml-4" size={32} />
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}

