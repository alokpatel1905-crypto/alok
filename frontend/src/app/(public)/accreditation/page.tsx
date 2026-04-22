import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

export const dynamic = 'force-dynamic';

async function getAccreditationData() {
  return await apiFetch('/accreditation-page', { cache: 'no-store' });
}

export default async function AccreditationPage() {
  const page = await getAccreditationData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">Accreditation page hasn't been configured yet.</p>
      </div>
    );
  }

  const sections = [
    { prefix: 'school', t: page.school_title, st: page.school_subtitle, d: page.school_description, b1t: page.school_button_1_text, b1l: page.school_button_1_link, b2t: page.school_button_2_text, b2l: page.school_button_2_link, img: page.school_image },
    { prefix: 'university', t: page.university_title, st: page.university_subtitle, d: page.university_description, b1t: page.university_button_1_text, b1l: page.university_button_1_link, b2t: page.university_button_2_text, b2l: page.university_button_2_link, img: page.university_image },
    { prefix: 'teacher', t: page.teacher_title, st: page.teacher_subtitle, d: page.teacher_description, b1t: page.teacher_button_1_text, b1l: page.teacher_button_1_link, b2t: page.teacher_button_2_text, b2l: page.teacher_button_2_link, img: page.teacher_image },
    { prefix: 'graduate', t: page.graduate_title, st: page.graduate_subtitle, d: page.graduate_description, b1t: page.graduate_button_1_text, b1l: page.graduate_button_1_link, b2t: page.graduate_button_2_text, b2l: page.graduate_button_2_link, img: page.graduate_image },
    { prefix: 'fellowship', t: page.fellowship_title, st: page.fellowship_subtitle, d: page.fellowship_description, b1t: page.fellowship_button_1_text, b1l: page.fellowship_button_1_link, b2t: page.fellowship_button_2_text, b2l: page.fellowship_button_2_link, img: page.fellowship_image },
  ].filter(s => s.t);

  return (
    <div className="overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-foreground text-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full -mr-40 -mt-40 animate-blob" />
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-black uppercase tracking-[0.2em] mb-8">
            <ShieldCheck size={14} className="text-secondary" />
            Verified Global Standard
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter">
            {page.page_title || 'Global Accreditation'}
          </h1>
          {page.intro_description && (
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              {page.intro_description}
            </p>
          )}
        </Container>
      </section>

      {/* 2. PROGRAM LISTINGS */}
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
                        <ShieldCheck className="w-24 h-24 text-primary/20" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className={`space-y-8 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm">
                    <div className="w-10 h-0.5 bg-primary" />
                    Accreditation Level 0{idx + 1}
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

      {/* 3. CTA BLOCK */}
      {(page.cta_title || page.primary_button_text) && (
        <Section background="nature" className="text-center">
          <Container className="max-w-4xl space-y-10">
            <Sparkles className="w-16 h-16 text-primary mx-auto animate-pulse" />
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
              {page.cta_title}
            </h2>
            {page.cta_description && (
              <p className="text-xl md:text-2xl text-foreground/60 font-medium">
                {page.cta_description}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
              {page.primary_button_text && (
                <Button variant="primary" size="xl" className="rounded-full shadow-2xl shadow-primary/20 min-w-[240px]">
                  {page.primary_button_text} <ArrowRight className="ml-2" />
                </Button>
              )}
              {page.secondary_button_text && (
                <Button variant="outline" size="xl" className="rounded-full min-w-[240px]">
                  {page.secondary_button_text}
                </Button>
              )}
            </div>
          </Container>
        </Section>
      )}

    </div>
  );
}

export async function generateMetadata() {
  const page = await getAccreditationData();
  if (!page) return { title: 'Accreditation' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}

