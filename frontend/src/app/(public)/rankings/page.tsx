import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Trophy, Target, FileText, Search, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';

export const dynamic = 'force-dynamic';

async function getRankingsData() {
  return await apiFetch('/rankings-page', { cache: 'no-store' });
}

export default async function RankingsPage() {
  const page = await getRankingsData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
    <div className="overflow-x-hidden bg-slate-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 bg-[#0A0A0A] border-b border-slate-800 text-white">
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-slate-300 text-xs font-semibold uppercase tracking-widest mb-8">
            <Trophy size={14} className="text-yellow-500" />
            Global Performance Benchmark
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
            {page.page_title || 'Global Rankings'}
          </h1>
          {page.intro_description && (
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              {page.intro_description}
            </p>
          )}
        </Container>
      </section>

      {/* 2. RANKING CATEGORIES */}
      <Section background="white" className="border-b border-slate-200">
        <Container className="space-y-24">
          {sections.map((sec, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`grid lg:grid-cols-2 gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-50 relative group">
                    {sec.img ? (
                      <img src={sec.img} alt={sec.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Trophy className="w-20 h-20 text-slate-300" />
                      </div>
                    )}
                  </div>
                </div>

                <div className={`space-y-8 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-xs">
                    <div className="w-8 h-px bg-slate-300" />
                    Ranking Index 0{idx + 1}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                    {sec.t}
                  </h2>
                  {sec.st && <p className="text-lg text-emerald-600 font-semibold">&ldquo;{sec.st}&rdquo;</p>}
                  <div className="text-base text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                    {sec.d}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {sec.b1t && (
                      <Button variant="primary" size="lg" className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white">
                        {sec.b1t} <CheckCircle2 className="ml-2 w-4 h-4" />
                      </Button>
                    )}
                    {sec.b2t && (
                      <Button variant="outline" size="lg" className="rounded-xl border-slate-200 text-slate-700">
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
      <Section background="off-white" className="border-b border-slate-200">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8">
            {page.why_title && (
              <Card className="p-10 md:p-12 rounded-2xl border border-slate-200 shadow-sm bg-white space-y-6">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                  <Target size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{page.why_title}</h2>
                <div className="text-base text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.why_description}
                </div>
              </Card>
            )}
            {page.methodology_title && (
              <Card className="p-10 md:p-12 rounded-2xl border border-slate-200 shadow-sm bg-white space-y-6">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                  <FileText size={28} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{page.methodology_title}</h2>
                <div className="text-base text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.methodology_description}
                </div>
              </Card>
            )}
          </div>
        </Container>
      </Section>

      {/* 4. PROCESS STEPS */}
      {steps.length > 0 && (
        <Section className="bg-[#0A0A0A] border-b border-slate-800 text-white">
          <Container className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">{page.process_title || 'Evaluation Workflow'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((st, i) => {
                const Icon = st.icon;
                return (
                  <Card key={i} className="p-8 bg-[#111111] border border-white/10 hover:border-white/20 transition-all flex flex-col items-center rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white mb-6 border border-white/10">
                      <Icon size={24} />
                    </div>
                    <div className="text-slate-500 font-bold text-sm mb-2 uppercase tracking-widest">Step 0{i + 1}</div>
                    <h3 className="text-lg font-bold text-white">{st.title}</h3>
                  </Card>
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. CTA */}
      <Section className="bg-white border-t border-slate-200 text-center py-24">
        <Container className="max-w-3xl space-y-8">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
             <Trophy size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {page.cta_title || 'Join Global Rankings'}
          </h2>
          {page.cta_description && (
            <p className="text-lg md:text-xl text-slate-500 font-medium">
              {page.cta_description}
            </p>
          )}
          {page.button_text && (
            <div className="pt-4">
               <Button variant="primary" size="lg" className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                 {page.button_text} <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
            </div>
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

