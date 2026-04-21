import React from 'react';
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle2, FileText, Search, Star, Target, Trophy } from 'lucide-react';

import { apiFetch } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getAwardsData() {
  return await apiFetch('/awards-page', { cache: 'no-store' });
}

export default async function AwardsPage() {
  const page = await getAwardsData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500 font-medium">Awards page hasn&apos;t been configured yet.</p>
      </div>
    );
  }

  const awards = [
    { prefix: 'school', t: page.school_title, st: page.school_subtitle, d: page.school_description, b1t: page.school_button_1_text, b1l: page.school_button_1_link, b2t: page.school_button_2_text, b2l: page.school_button_2_link, img: page.school_image },
    { prefix: 'university', t: page.university_title, st: page.university_subtitle, d: page.university_description, b1t: page.university_button_1_text, b1l: page.university_button_1_link, b2t: page.university_button_2_text, b2l: page.university_button_2_link, img: page.university_image },
    { prefix: 'teacher', t: page.teacher_title, st: page.teacher_subtitle, d: page.teacher_description, b1t: page.teacher_button_1_text, b1l: page.teacher_button_1_link, b2t: page.teacher_button_2_text, b2l: page.teacher_button_2_link, img: page.teacher_image },
    { prefix: 'graduate', t: page.graduate_title, st: page.graduate_subtitle, d: page.graduate_description, b1t: page.graduate_button_1_text, b1l: page.graduate_button_1_link, b2t: page.graduate_button_2_text, b2l: page.graduate_button_2_link, img: page.graduate_image },
    { prefix: 'innovator', t: page.innovator_title, st: page.innovator_subtitle, d: page.innovator_description, b1t: page.innovator_button_1_text, b1l: page.innovator_button_1_link, b2t: page.innovator_button_2_text, b2l: page.innovator_button_2_link, img: page.innovator_image },
    { prefix: 'curriculum', t: page.curriculum_title, st: page.curriculum_subtitle, d: page.curriculum_description, b1t: page.curriculum_button_1_text, b1l: page.curriculum_button_1_link, b2t: page.curriculum_button_2_text, b2l: page.curriculum_button_2_link, img: page.curriculum_image },
  ].filter((s) => s.t);

  const steps = [
    { title: page.step1, icon: FileText },
    { title: page.step2, icon: Search },
    { title: page.step3, icon: Star },
    { title: page.step4, icon: Trophy },
  ].filter((s) => s.title);

  return (
    <div className="bg-[#faf9f7] font-sans text-slate-900 selection:bg-amber-200 antialiased min-h-screen flex flex-col">
      {/* 1. HERO */}
      <section className="bg-slate-950 text-white pt-24 lg:pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-700/10 blur-[100px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 bg-amber-900/40 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-800/50 shadow-2xl">
            <Award size={44} className="text-amber-400" strokeWidth={1.5} />
          </div>
          {page.subtitle && (
            <span className="inline-block px-5 py-2 rounded-full bg-amber-500/20 text-amber-300 font-bold tracking-widest text-xs uppercase mb-8 border border-amber-500/30 backdrop-blur-sm">
              {page.subtitle}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">{page.page_title || 'Awards'}</h1>
          {page.intro_description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light max-w-4xl">{page.intro_description}</p>
          )}
        </div>
      </section>

      {/* 2. AWARD CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {awards.map((aw, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative group">
                    {aw.img ? (
                      <img src={aw.img} alt={aw.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-amber-50">
                        <Award className="w-28 h-28 text-amber-200" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-amber-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-amber-600 font-black tracking-wider uppercase text-sm border-b-2 border-amber-400 pb-1 inline-block mb-4 w-fit">
                    Award 0{idx + 1}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{aw.t}</h2>
                  {aw.st && <h3 className="text-xl text-slate-500 font-medium mb-6 italic">&ldquo;{aw.st}&rdquo;</h3>}
                  {aw.d && <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-10 whitespace-pre-wrap">{aw.d}</div>}
                  <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-8">
                    {aw.b1t && (
                      <Link href={aw.b1l || '#'} className="inline-flex items-center gap-2 bg-amber-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-amber-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                        {aw.b1t} <CheckCircle2 size={18} />
                      </Link>
                    )}
                    {aw.b2t && (
                      <Link href={aw.b2l || '#'} className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors">
                        {aw.b2t}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INFO BLOCKS: WHY RECOGNITION MATTERS */}
      {(page.why_title || page.why_description) && (
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-8">{page.why_title}</h2>
            <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap mx-auto">{page.why_description}</div>
          </div>
        </section>
      )}

      {/* 4. PROCESS STEPS */}
      {steps.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-16">{page.process_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="relative">
                    <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl h-full shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                      <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-xl shadow-amber-500/20">
                        {i + 1}
                      </div>
                      <Icon className="text-amber-500 mb-4" size={32} />
                      <h3 className="text-xl font-bold text-slate-800">{st.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA */}
      {(page.cta_title || page.button_text) && (
        <section className="py-32 bg-amber-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl text-amber-100 max-w-2xl mx-auto mb-10 font-medium">{page.cta_description}</p>}
            {page.button_text && (
              <Link href={page.button_link || '#'} className="inline-flex items-center gap-2 bg-white text-amber-900 font-black px-10 py-5 rounded-2xl hover:bg-amber-50 hover:scale-105 transition-all shadow-2xl">
                {page.button_text} <ArrowRight size={20} />
              </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export async function generateMetadata() {
  const page = await getAwardsData();
  if (!page) return { title: 'Awards' };

  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
