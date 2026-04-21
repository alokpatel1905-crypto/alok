import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Trophy, Target, FileText, Search } from 'lucide-react';

export const dynamic = 'force-dynamic';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getRankingsData() {
  try {
    const res = await fetch(`${API_URL}/rankings-page`, { cache: 'no-store' });
    if (res.ok) return await res.json();
    return null;
  } catch (e) {
    console.error("Failed to fetch Rankings data", e);
    return null;
  }
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
    <div className="bg-[#f8f9fa] font-sans text-slate-900 selection:bg-emerald-200 antialiased min-h-screen flex flex-col">
      
      {/* 1. HERO / INTRO */}
      <section className="bg-slate-950 text-white pt-24 lg:pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/20 blur-[100px] rounded-full point-events-none" />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 bg-emerald-900/50 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-emerald-800">
            <Trophy size={40} className="text-emerald-400" />
          </div>
          {page.subtitle && (
            <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-widest text-xs uppercase mb-8 border border-emerald-500/30">
              {page.subtitle}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">{page.page_title || 'Rankings'}</h1>
          {page.intro_description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light max-w-4xl">
              {page.intro_description}
            </p>
          )}
        </div>
      </section>

      {/* 2. RANKING PROGRAMS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {sections.map((sec, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative group">
                    {sec.img ? (
                      <img src={sec.img} alt={sec.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Trophy className="w-32 h-32 text-slate-200" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-emerald-600 font-black tracking-wider uppercase text-sm border-b-2 border-emerald-500 pb-1">
                      Ranking 0{idx + 1}
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

                  <div className="flex flex-wrap items-center gap-4">
                    {sec.b1t && (
                      <Link href={sec.b1l || '#'} className="inline-flex items-center gap-2 bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-800 transition-colors shadow-lg hover:-translate-y-0.5 duration-300">
                        {sec.b1t} <CheckCircle2 size={18} />
                      </Link>
                    )}
                    {sec.b2t && (
                      <Link href={sec.b2l || '#'} className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors">
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

      {/* 3. INFO BLOCKS (WHY PARTICIPATE & METHODOLOGY) */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Why Participate */}
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <Target size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">{page.why_title}</h2>
              <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {page.why_description}
              </div>
            </div>

            {/* Methodology */}
            <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                <FileText size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">{page.methodology_title}</h2>
              <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                {page.methodology_description}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROCESS STEPS */}
      {steps.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-16">{page.process_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((st, i) => {
                const stepNum = i + 1;
                const Icon = st.icon;
                return (
                  <div key={i} className="relative">
                    <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl h-full shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-xl shadow-slate-900/20">
                        {stepNum}
                      </div>
                      <Icon className="text-emerald-500 mb-4" size={32} />
                      <h3 className="text-xl font-bold text-slate-800">{st.title}</h3>
                    </div>
                    {/* Connecting line for lg */}
                    {i < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-[80px] left-[50%] w-full h-[2px] bg-slate-200 -z-10" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA */}
      {(page.cta_title || page.button_text) && (
        <section className="py-32 bg-emerald-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 font-medium">{page.cta_description}</p>}
            {page.button_text && (
              <Link href={page.button_link || '#'} className="inline-flex items-center gap-2 bg-white text-emerald-900 font-black px-10 py-5 rounded-2xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl">
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
  const page = await getRankingsData();
  if (!page) return { title: 'Rankings' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
