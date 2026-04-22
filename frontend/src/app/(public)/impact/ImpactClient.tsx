'use client';

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, Users, School, GraduationCap, Leaf, TrendingUp, Award, Heart, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { StatsCounter } from '@/components/ui/StatsCounter';
import { NatureIcon } from '@/components/ui/NatureIcon';

export default function ImpactClient({ page }: { page: any }) {
  return (
    <div className="overflow-x-hidden bg-[#F0F9FF] perspective-2000">
      
      {/* 1. HERO SECTION - Water Theme */}
      <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-water/20 via-background to-secondary/10 perspective-2000">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-water/10 blur-[150px] rounded-full animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        
        <Container className="relative z-10 preserve-3d floating-subtle">
          <div className="max-w-5xl space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white text-water text-[10px] font-black uppercase tracking-[0.4em] shadow-premium hover-tilt"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-water animate-pulse" /> {page.subtitle || 'The Ripple Effect'}
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter leading-[0.8] drop-shadow-sm text-shadow-3d">
              {page.title || 'Our'} <span className="text-water">Impact</span>.
            </h1>
            
            {page.description && (
              <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl leading-tight font-medium border-l-8 border-water pl-12 py-2 drop-shadow-md">
                {page.description}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* 2. BIG STATISTICS - 3D Floating Grid */}
      <Section className="relative z-10 perspective-2000">
        <Container className="preserve-3d">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { t: page.stat1_title, v: page.stat1_value, c: 'primary', i: 'School' },
              { t: page.stat2_title, v: page.stat2_value, c: 'water', i: 'Users' },
              { t: page.stat3_title, v: page.stat3_value, c: 'flora', i: 'Forest' },
              { t: page.stat4_title, v: page.stat4_value, c: 'sun', i: 'Globe' }
            ].map((stat, idx) => {
              if (!stat.t && !stat.v) return null;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -20, rotateX: 5, rotateY: 5, translateZ: 50 }}
                  className="preserve-3d floating-subtle"
                >
                  <Card className="text-center p-14 h-full border-none shadow-3d bg-white rounded-[3rem] group hover-tilt preserve-3d">
                    <div className="preserve-3d group-hover:translateZ(40px) transition-transform duration-500">
                      <NatureIcon name={stat.i as any} className={cn("mb-10 mx-auto scale-150 transition-transform duration-500 group-hover:scale-[2]", `text-${stat.c}`)} />
                    </div>
                    <StatsCounter value={stat.v || '0'} label={stat.t || ''} />
                    <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-full transition-all group-hover:w-full", `bg-${stat.c}`)} />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. VISUAL GRAPHICS - Perspective Image */}
      {page.image && (
        <Section background="off-white" className="perspective-2000">
          <Container className="preserve-3d">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter text-shadow-3d">Liquid Metrics</h2>
              <p className="text-foreground/60 font-medium text-lg">Transparency through every ecological layer.</p>
            </div>
            <motion.div 
              whileHover={{ rotateX: -5 }}
              className="rounded-[4rem] overflow-hidden shadow-3d border border-white bg-white p-6 depth-card preserve-3d"
            >
              <img src={page.image} alt="Dashboard" className="w-full rounded-[3rem] transition-transform duration-1000" />
            </motion.div>
          </Container>
        </Section>
      )}

      {/* 4. IMPACT STORIES - Colorful Bento */}
      <Section background="white" className="perspective-2000">
        <Container className="preserve-3d">
          <div className="grid lg:grid-cols-2 gap-16">
            {(page.why_title || page.why_description) && (
              <Card className="p-16 space-y-10 bg-primary text-white rounded-[4rem] shadow-3d floating-vibrant preserve-3d">
                <div className="preserve-3d group-hover:translateZ(50px) transition-transform">
                  <TrendingUp size={64} className="opacity-20" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-none text-shadow-3d">{page.why_title}</h2>
                <div className="text-lg text-white/80 font-medium leading-relaxed">
                  {page.why_description}
                </div>
              </Card>
            )}

            {(page.story_title || page.story_description) && (
              <Card className="p-16 space-y-10 bg-water text-white rounded-[4rem] shadow-3d floating-3d animation-delay-500">
                <Award size={64} className="opacity-20" />
                <h2 className="text-5xl font-black tracking-tighter leading-none">{page.story_title}</h2>
                <div className="text-xl text-white/80 font-medium leading-relaxed">
                  {page.story_description}
                </div>
              </Card>
            )}
          </div>
        </Container>
      </Section>

      {/* 5. CTA - Ocean Theme */}
      <Section className="relative overflow-hidden bg-foreground">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-water/20 blur-[150px] rounded-full animate-blob" />
        <Container className="relative z-10 text-center space-y-16 py-20">
          <Heart className="w-32 h-32 text-primary mx-auto animate-float shadow-2xl" />
          <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">
            {page.cta_title || 'Join The Wave'}
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            <Button variant="primary" size="xl" className="rounded-full shadow-3d bg-water hover:bg-secondary px-16 py-10 text-2xl font-black transition-all">
               {page.button_text || 'Start Now'} <ArrowRight className="ml-4" size={32} />
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}

