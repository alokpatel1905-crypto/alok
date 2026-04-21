import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

import { apiFetch } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getAccreditationData() {
  return await apiFetch('/accreditation-page', { cache: 'no-store' });
}

export default async function AccreditationPage() {
  const page = await getAccreditationData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
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
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 antialiased min-h-screen flex flex-col">
      
      {/* 1. HERO / INTRO */}
      <section className="bg-emerald-950 text-white pt-24 lg:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/30 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-800/40 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 translate-y-1/3" />
        
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 bg-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-emerald-700/50">
            <ShieldCheck size={48} className="text-emerald-300" strokeWidth={1.5} />
          </div>
          
          {page.subtitle && (
            <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-widest text-xs uppercase mb-8 border border-emerald-500/30 backdrop-blur-sm">
              {page.subtitle}
            </span>
          )}
          
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">{page.page_title || 'Accreditation'}</h1>
          
          {page.intro_description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light max-w-4xl">
              {page.intro_description}
            </p>
          )}
        </div>
      </section>

      {/* 2. PROGRAM LISTINGS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {sections.map((sec, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                
                {/* Visual Side */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative group">
                    {sec.img ? (
                      <img src={sec.img} alt={sec.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <ShieldCheck className="w-32 h-32 text-slate-200" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-emerald-600 font-black tracking-wider uppercase text-sm border-b-2 border-emerald-500 pb-1">
                      Program 0{idx + 1}
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                    {sec.t}
                  </h2>
                  
                  {sec.st && (
                    <h3 className="text-xl text-slate-500 font-medium mb-6 italic">
                      "{sec.st}"
                    </h3>
                  )}

                  {sec.d && (
                    <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-10 whitespace-pre-wrap">
                      {sec.d}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-8">
                    {sec.b1t && (
                      <Link href={sec.b1l || '#'} className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                        {sec.b1t} <CheckCircle2 size={18} />
                      </Link>
                    )}
                    {sec.b2t && (
                      <Link href={sec.b2l || '#'} className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors">
                        {sec.b2t}
                      </Link>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CTA */}
      {(page.cta_title || page.primary_button_text) && (
        <section className="py-32 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-10 pointer-events-none" />
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 font-light">{page.cta_description}</p>}
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              {page.primary_button_text && (
                <Link href={page.primary_button_link || '#'} className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white font-black px-10 py-5 rounded-2xl hover:bg-emerald-400 hover:scale-105 transition-all shadow-xl shadow-emerald-500/20 w-full sm:w-auto">
                  {page.primary_button_text} <ArrowRight size={20} />
                </Link>
              )}
              {page.secondary_button_text && (
                <Link href={page.secondary_button_link || '#'} className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white font-bold px-10 py-5 rounded-2xl hover:bg-white/20 transition-all border border-white/10 w-full sm:w-auto">
                  {page.secondary_button_text}
                </Link>
              )}
            </div>
          </div>
        </section>
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
