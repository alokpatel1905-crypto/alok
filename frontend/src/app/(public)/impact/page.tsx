import React from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Users, School, GraduationCap, Leaf } from 'lucide-react';

import { apiFetch } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getImpactData() {
  return await apiFetch('/impact-page', { cache: 'no-store' });
}

export default async function ImpactPage() {
  const page = await getImpactData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500 font-medium">Impact page content hasn't been configured yet.</p>
      </div>
    );
  }

  const icons = [School, Users, GraduationCap, Globe];

  return (
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 antialiased min-h-screen flex flex-col">
      
      {/* 1. HERO / INTRO */}
      <section className="bg-slate-900 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/20 blur-[100px] rounded-full point-events-none" />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          {page.subtitle && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-widest text-xs uppercase mb-6 border border-emerald-500/30">
              {page.subtitle}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">{page.title || 'Our Impact'}</h1>
          {page.description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light max-w-4xl">
              {page.description}
            </p>
          )}
        </div>
      </section>

      {/* 2. IMPACT STATISTICS */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: page.stat1_title, v: page.stat1_value, i: 0 },
              { t: page.stat2_title, v: page.stat2_value, i: 1 },
              { t: page.stat3_title, v: page.stat3_value, i: 2 },
              { t: page.stat4_title, v: page.stat4_value, i: 3 }
            ].map((stat, idx) => {
              if (!stat.t && !stat.v) return null;
              const Icon = icons[idx];
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100 p-10 rounded-3xl text-center flex flex-col items-center shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all group">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                    <Icon strokeWidth={1.5} size={32} />
                  </div>
                  <h3 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">{stat.v}</h3>
                  <p className="text-lg font-bold text-slate-500 uppercase tracking-widest">{stat.t}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VISUAL GRAPHICS (IF PROVIDED) */}
      {page.image && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={page.image} alt="Impact Dashboard Graphic" className="w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* 4. CONTENT BLOCKS */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6 max-w-5xl space-y-24">
          
          {(page.why_title || page.why_description) && (
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/3">
                <div className="w-16 h-1 rounded-full bg-emerald-500 mb-6" />
                <h2 className="text-4xl font-black text-slate-900 leading-tight">{page.why_title}</h2>
              </div>
              <div className="w-full md:w-2/3">
                <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.why_description}
                </div>
              </div>
            </div>
          )}

          {(page.story_title || page.story_description) && (
            <div className="flex flex-col md:flex-row gap-12 items-start border-t border-slate-200 pt-24">
              <div className="w-full md:w-1/3">
                <div className="w-16 h-1 rounded-full bg-emerald-500 mb-6" />
                <h2 className="text-4xl font-black text-slate-900 leading-tight">{page.story_title}</h2>
              </div>
              <div className="w-full md:w-2/3">
                <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.story_description}
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. CTA */}
      {(page.cta_title || page.button_text) && (
        <section className="py-24 bg-emerald-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
             <Leaf className="w-12 h-12 text-emerald-400 opacity-50 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 font-medium">{page.cta_description}</p>}
            {page.button_text && (
              <Link href={page.button_link || '#'} className="inline-flex items-center gap-2 bg-white text-emerald-900 font-black px-8 py-4 rounded-2xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl">
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
  const page = await getImpactData();
  if (!page) return { title: 'Impact' };
  
  return {
    title: page.meta_title || page.title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
