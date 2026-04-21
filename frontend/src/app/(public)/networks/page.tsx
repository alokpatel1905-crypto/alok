import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Globe2, Network, Search, Target, Users } from 'lucide-react';

import { apiFetch } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getNetworksData() {
  return await apiFetch('/networks-page', { cache: 'no-store' });
}

export default async function NetworksPage() {
  const page = await getNetworksData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500 font-medium">Networks page hasn&apos;t been configured yet.</p>
      </div>
    );
  }

  const networks = [
    { prefix: 'school', t: page.school_title, st: page.school_subtitle, d: page.school_description, b1t: page.school_button_1_text, b1l: page.school_button_1_link, b2t: page.school_button_2_text, b2l: page.school_button_2_link, img: page.school_image },
    { prefix: 'university', t: page.university_title, st: page.university_subtitle, d: page.university_description, b1t: page.university_button_1_text, b1l: page.university_button_1_link, b2t: page.university_button_2_text, b2l: page.university_button_2_link, img: page.university_image },
    { prefix: 'teacher', t: page.teacher_title, st: page.teacher_subtitle, d: page.teacher_description, b1t: page.teacher_button_1_text, b1l: page.teacher_button_1_link, b2t: page.teacher_button_2_text, b2l: page.teacher_button_2_link, img: page.teacher_image },
    { prefix: 'graduates', t: page.graduates_title, st: page.graduates_subtitle, d: page.graduates_description, b1t: page.graduates_button_1_text, b1l: page.graduates_button_1_link, b2t: page.graduates_button_2_text, b2l: page.graduates_button_2_link, img: page.graduates_image },
    { prefix: 'innovator', t: page.innovator_title, st: page.innovator_subtitle, d: page.innovator_description, b1t: page.innovator_button_1_text, b1l: page.innovator_button_1_link, b2t: page.innovator_button_2_text, b2l: page.innovator_button_2_link, img: page.innovator_image },
  ].filter((s) => s.t);

  const steps = [
    { title: page.step1, icon: Network },
    { title: page.step2, icon: FileText },
    { title: page.step3, icon: Users },
    { title: page.step4, icon: Globe2 },
  ].filter((s) => s.title);

  return (
    <div className="bg-[#f7f7fb] font-sans text-slate-900 selection:bg-violet-200 antialiased min-h-screen flex flex-col">
      {/* HERO */}
      <section className="bg-slate-950 text-white pt-24 lg:pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-600/15 blur-[120px] rounded-full pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-800/10 blur-[100px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 bg-violet-900/40 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-violet-800/50 shadow-2xl">
            <Network size={44} className="text-violet-400" strokeWidth={1.5} />
          </div>
          {page.subtitle && (
            <span className="inline-block px-5 py-2 rounded-full bg-violet-500/20 text-violet-300 font-bold tracking-widest text-xs uppercase mb-8 border border-violet-500/30 backdrop-blur-sm">{page.subtitle}</span>
          )}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">{page.page_title || 'Networks'}</h1>
          {page.intro_description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light max-w-4xl">{page.intro_description}</p>
          )}
        </div>
      </section>

      {/* NETWORK CATEGORIES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {networks.map((net, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative group">
                    {net.img ? (
                      <img src={net.img} alt={net.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-violet-50">
                        <Network className="w-28 h-28 text-violet-200" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-violet-600 font-black tracking-wider uppercase text-sm border-b-2 border-violet-400 pb-1 inline-block mb-4 w-fit">Network 0{idx + 1}</span>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">{net.t}</h2>
                  {net.st && <h3 className="text-xl text-slate-500 font-medium mb-6 italic">&ldquo;{net.st}&rdquo;</h3>}
                  {net.d && <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-10 whitespace-pre-wrap">{net.d}</div>}
                  <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-8">
                    {net.b1t && (
                      <Link href={net.b1l || '#'} className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-violet-700 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-300">
                        {net.b1t} <CheckCircle2 size={18} />
                      </Link>
                    )}
                    {net.b2t && (
                      <Link href={net.b2l || '#'} className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors">
                        {net.b2t}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY JOIN + IMPACT */}
      {(page.why_title || page.impact_title) && (
        <section className="py-24 bg-slate-50 border-y border-slate-200">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16">
              {page.why_title && (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-16 h-16 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-8">
                    <Target size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">{page.why_title}</h2>
                  <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{page.why_description}</div>
                </div>
              )}
              {page.impact_title && (
                <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
                    <Globe2 size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">{page.impact_title}</h2>
                  <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">{page.impact_description}</div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS STEPS */}
      {steps.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-16">{page.process_title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((st, i) => {
                const Icon = st.icon;
                return (
                  <div key={i} className="bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center">
                    <div className="w-16 h-16 bg-violet-600 text-white rounded-full flex items-center justify-center font-black text-xl mb-6 shadow-xl shadow-violet-600/20">{i + 1}</div>
                    <Icon className="text-violet-500 mb-4" size={32} />
                    <h3 className="text-xl font-bold text-slate-800">{st.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      {(page.cta_title || page.button_text) && (
        <section className="py-32 bg-violet-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl text-violet-100 max-w-2xl mx-auto mb-10 font-medium">{page.cta_description}</p>}
            {page.button_text && (
              <Link href={page.button_link || '#'} className="inline-flex items-center gap-2 bg-white text-violet-900 font-black px-10 py-5 rounded-2xl hover:bg-violet-50 hover:scale-105 transition-all shadow-2xl">
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
  const page = await getNetworksData();
  if (!page) return { title: 'Networks' };
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
