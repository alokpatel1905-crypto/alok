'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  Network, 
  Target, 
  Sparkles,
  FileText,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Section, Container } from '@/components/ui/Section';

const iconMap: Record<string, any> = {
  Network,
  FileText,
  Users,
  Globe2,
};

export default function NetworksClient({ page, networks, steps }: { page: any, networks: any[], steps: any[] }) {
  return (
    <div className="overflow-x-hidden perspective-2000">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center pt-40 pb-20 overflow-hidden bg-[#061B14] text-white">
        {/* Animated Blobs for Depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full -mr-40 -mt-40 animate-blob" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-water/10 blur-[100px] rounded-full -ml-40 -mb-40 animate-blob animation-delay-2000" />
        
        <Container className="relative z-10 text-center max-w-5xl preserve-3d">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-flora/10 border border-flora/20 text-flora text-xs font-black uppercase tracking-[0.4em] mb-10"
          >
            <Network size={14} className="animate-spin-slow" />
            Global Collaborative Ecosystem
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-10 leading-[0.85] tracking-tighter text-shadow-3d">
            {page.page_title || 'Global Networks'}.
          </h1>
          
          {page.intro_description && (
            <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed font-medium border-l-4 border-flora pl-8 text-left inline-block">
              {page.intro_description}
            </p>
          )}
        </Container>
      </section>

      {/* 2. NETWORK CATEGORIES */}
      <Section background="white" className="perspective-2000">
        <Container className="space-y-40 preserve-3d">
          {networks.map((net, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`grid lg:grid-cols-2 gap-24 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative preserve-3d ${isReversed ? 'lg:order-2' : ''}`}>
                  <motion.div 
                    whileHover={{ rotateY: isReversed ? 5 : -5, translateZ: 50 }}
                    className="aspect-[4/3] rounded-[3.5rem] overflow-hidden depth-card relative group shadow-3d"
                  >
                    {net.img ? (
                      <img src={net.img} alt={net.t} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <Network className="w-24 h-24 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-flora/5 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className={`space-y-10 preserve-3d ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-4 text-flora font-black uppercase tracking-[0.5em] text-xs">
                    <div className="w-12 h-1 bg-flora rounded-full" />
                    Strategic Network 0{idx + 1}
                  </div>
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground tracking-tighter leading-none text-shadow-3d">
                    {net.t}
                  </h2>
                  {net.st && (
                    <div className="p-6 rounded-2xl bg-off-white border-l-4 border-flora italic text-xl text-foreground/50 font-bold leading-relaxed">
                      &ldquo;{net.st}&rdquo;
                    </div>
                  )}
                  <div className="text-lg text-foreground/60 font-medium leading-relaxed whitespace-pre-wrap">
                    {net.d}
                  </div>
                  <div className="flex flex-wrap gap-6 pt-6">
                    {net.b1t && (
                      <Button variant="primary" size="xl" className="rounded-2xl bg-primary text-white font-black uppercase tracking-widest px-10 hover:scale-105 active:scale-95 shadow-3d">
                        {net.b1t} <CheckCircle2 className="ml-3" size={20} />
                      </Button>
                    )}
                    {net.b2t && (
                      <Button variant="outline" size="xl" className="rounded-2xl border-2 border-primary/10 text-primary font-black uppercase tracking-widest px-10 hover:bg-primary/5 transition-all">
                        {net.b2t}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* 3. WHY JOIN + IMPACT */}
      {(page.why_title || page.impact_title) && (
        <Section background="off-white" className="perspective-2000">
          <Container className="preserve-3d">
            <div className="grid lg:grid-cols-2 gap-12">
              {page.why_title && (
                <motion.div 
                  whileHover={{ y: -20, rotateX: 2 }}
                  className="p-16 rounded-[4rem] bg-white shadow-premium space-y-10 depth-card floating-vibrant"
                >
                  <div className="w-20 h-20 rounded-3xl bg-flora/10 flex items-center justify-center text-flora shadow-xl">
                    <Target size={40} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter text-shadow-3d">{page.why_title}</h2>
                  <div className="text-lg text-foreground/50 font-medium leading-relaxed whitespace-pre-wrap">
                    {page.why_description}
                  </div>
                </motion.div>
              )}
              {page.impact_title && (
                <motion.div 
                  whileHover={{ y: -20, rotateX: -2 }}
                  className="p-16 rounded-[4rem] bg-white shadow-premium space-y-10 depth-card floating-subtle animation-delay-2000"
                >
                  <div className="w-20 h-20 rounded-3xl bg-water/10 flex items-center justify-center text-water shadow-xl">
                    <Globe2 size={40} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter text-shadow-3d">{page.impact_title}</h2>
                  <div className="text-lg text-foreground/50 font-medium leading-relaxed whitespace-pre-wrap">
                    {page.impact_description}
                  </div>
                </motion.div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* 4. PROCESS STEPS */}
      {steps.length > 0 && (
        <Section background="dark" className="bg-[#061B14] perspective-2000">
          <Container className="text-center preserve-3d">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-24 tracking-tighter text-shadow-3d">{page.process_title || 'Joining Protocol'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {steps.map((st, i) => {
                const Icon = iconMap[st.iconName] || Network;
                return (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -15, scale: 1.02 }}
                    className="glass-dark p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-flora to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-flora mb-10 shadow-inner group-hover:bg-flora group-hover:text-primary transition-all duration-500">
                      <Icon size={32} />
                    </div>
                    <div className="text-white/5 font-black text-8xl absolute -bottom-4 -right-4 leading-none tabular-nums group-hover:text-white/10 transition-colors">0{i + 1}</div>
                    <h3 className="text-2xl font-black text-white text-left relative z-10 leading-tight">{st.title}</h3>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. CTA */}
      <Section background="nature" className="text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
        <Container className="max-w-5xl space-y-12 relative z-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
            <Sparkles className="w-20 h-20 text-flora mx-auto opacity-50" />
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black text-foreground tracking-tighter text-shadow-3d leading-none">
            {page.cta_title || 'Become a Global Partner'}
          </h2>
          {page.cta_description && (
            <p className="text-2xl md:text-3xl text-foreground/60 font-medium max-w-3xl mx-auto">
              {page.cta_description}
            </p>
          )}
          {page.button_text && (
            <Button variant="primary" size="xl" className="rounded-[2rem] bg-primary text-white font-black uppercase tracking-widest py-10 px-16 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(6,78,59,0.3)] border-none">
              {page.button_text} <ArrowRight className="ml-4" size={24} />
            </Button>
          )}
        </Container>
      </Section>

    </div>
  );
}
