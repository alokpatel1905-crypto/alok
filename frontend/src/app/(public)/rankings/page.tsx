import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Trophy, Target, FileText, Search, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

export const dynamic = 'force-dynamic';

async function getRankingsData() {
  return await apiFetch('/rankings-page', { cache: 'no-store' });
}

export default async function RankingsPage() {
  const page = await getRankingsData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">Rankings page hasn't been configured yet.</p>
      </div>
    );
  }

  const sections = [
    { prefix: 'school', t: page.school_title, st: page.school_subtitle, d: page.school_description, b1t: page.school_button_1_text, b1l: page.school_button_1_link, b2t: page.school_button_2_text, b2l: page.school_button_2_link, img: page.school_image },
    { prefix: 'university', t: page.university_title, st: page.university_subtitle, d: page.university_description, b1t: page.university_button_1_text, b1l: page.university_button_1_link, b2t: page.university_button_2_text, b2l: page.university_button_2_link, img: page.university_image },
    { prefix: 'regional', t: page.regional_title, st: page.regional_subtitle, d: page.regional_description, b1t: page.regional_button_1_text, b1l: page.regional_button_1_link, b2t: page.regional_button_2_text, b2l: page.regional_button_2_link, img: page.regional_image },
  ].filter(s => s.t);

  const steps = [
    { title: page.step1, icon: FileText },
    { title: page.step2, icon: Search },
    { title: page.step3, icon: Target },
    { title: page.step4, icon: Trophy },
  ].filter(s => s.title);

  return (
    <div className="overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-foreground text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full -mr-40 -mt-40 animate-blob" />
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Trophy size={14} className="text-secondary" />
            Global Performance Benchmark
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter">
            {page.page_title || 'Global Rankings'}
          </h1>
          {page.intro_description && (
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              {page.intro_description}
            </p>
          )}
        </Container>
      </section>

      {/* 2. RANKING CATEGORIES */}
      <Section background="white">
        <Container className="space-y-32">
          {sections.map((sec, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`grid lg:grid-cols-2 gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 bg-slate-50 relative group">
                    {sec.img ? (
                      <img src={sec.img} alt={sec.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <Trophy className="w-24 h-24 text-primary/20" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className={`space-y-8 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm">
                    <div className="w-10 h-0.5 bg-primary" />
                    Ranking Index 0{idx + 1}
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                    {sec.t}
                  </h2>
                  {sec.st && <p className="text-xl text-foreground/40 font-bold italic">&ldquo;{sec.st}&rdquo;</p>}
                  <div className="text-lg text-foreground/70 font-medium leading-relaxed whitespace-pre-wrap">
                    {sec.d}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {sec.b1t && (
                      <Button variant="primary" size="lg" className="rounded-full shadow-2xl shadow-primary/20">
                        {sec.b1t} <CheckCircle2 className="ml-2" size={18} />
                      </Button>
                    )}
                    {sec.b2t && (
                      <Button variant="outline" size="lg" className="rounded-full">
                        {sec.b2t}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* 3. INFO BLOCKS */}
      <Section background="off-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10">
            {page.why_title && (
              <Card variant="default" className="p-12 md:p-16 rounded-[4rem] border-none shadow-premium space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Target size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground">{page.why_title}</h2>
                <div className="text-lg text-foreground/50 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.why_description}
                </div>
              </Card>
            )}
            {page.methodology_title && (
              <Card variant="default" className="p-12 md:p-16 rounded-[4rem] border-none shadow-premium space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                  <FileText size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-foreground">{page.methodology_title}</h2>
                <div className="text-lg text-foreground/50 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.methodology_description}
                </div>
              </Card>
            )}
          </div>
        </Container>
      </Section>

      {/* 4. PROCESS STEPS */}
      {steps.length > 0 && (
        <Section background="dark">
          <Container className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-20">{page.process_title || 'Evaluation Workflow'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((st, i) => {
                const Icon = st.icon;
                return (
                  <Card key={i} variant="glass" className="p-10 hover:bg-white transition-all group flex flex-col items-center border-white/5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all mb-8 shadow-xl">
                      <Icon size={28} />
                    </div>
                    <div className="text-white/20 font-black text-6xl mb-4 tabular-nums">0{i + 1}</div>
                    <h3 className="text-xl font-black text-white group-hover:text-foreground">{st.title}</h3>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. CTA */}
      <Section background="nature" className="text-center">
        <Container className="max-w-4xl space-y-10">
          <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
            {page.cta_title || 'Join Global Rankings'}
          </h2>
          {page.cta_description && (
            <p className="text-xl md:text-2xl text-foreground/60 font-medium">
              {page.cta_description}
            </p>
          )}
          {page.button_text && (
            <Button variant="primary" size="xl" className="rounded-full shadow-2xl shadow-primary/20">
              {page.button_text} <ArrowRight className="ml-2" />
            </Button>
          )}
        </Container>
      </Section>

    </div>
  );
}

export async function generateMetadata() {
  const page = await getRankingsData();
  if (!page) return { title: 'Rankings' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}

