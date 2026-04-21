import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Quote, Handshake, Target, Heart, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SupportPageContent({ support }: { support: any }) {
  const parseBullets = (text: string) => {
    if (!text) return [];
    return text.split('-').map(t => t.trim()).filter(Boolean);
  };

  const SupportBlock = ({ prefix, icon: Icon, reverse = false }: { prefix: string; icon: any; reverse?: boolean }) => {
    const title = support[`${prefix}_title`];
    const subtitle = support[`${prefix}_subtitle`];
    const desc = support[`${prefix}_description`];
    const img = support[`${prefix}_image`];
    const btn1Text = support[`${prefix}_button_1_text`];
    const btn1Link = support[`${prefix}_button_1_link`];
    const btn2Text = support[`${prefix}_button_2_text`];
    const btn2Link = support[`${prefix}_button_2_link`];

    if (!title && !desc) return null;

    return (
      <div className={cn("flex flex-col lg:flex-row gap-12 items-center py-16", reverse ? "lg:flex-row-reverse" : "")}>
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-2">
            <Icon className="w-6 h-6" />
          </div>
          {subtitle && <p className="text-emerald-600 font-bold tracking-widest text-sm uppercase">{subtitle}</p>}
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0D0D0D] tracking-tight hover:text-emerald-800 transition-colors">{title}</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">{desc}</p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            {btn1Text && btn1Link && (
              <Link href={btn1Link} className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all group">
                {btn1Text}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
            {btn2Text && btn2Link && (
              <Link href={btn2Link} className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 font-bold rounded-xl transition-all">
                {btn2Text}
              </Link>
            )}
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative bg-slate-100">
             {img ? (
                <img src={img} alt={title} className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full bg-gradient-to-tr from-emerald-100 to-teal-50 flex items-center justify-center">
                   <Icon className="w-24 h-24 text-emerald-200" />
                </div>
             )}
          </div>
          {/* Decorative shapes */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl -z-10" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden bg-[#0D0D0D] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-8 text-center border-b-[8px] border-emerald-600">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
            {support.page_title}
          </h1>
          {support.subtitle && (
             <p className="text-xl lg:text-2xl text-emerald-400 font-medium mb-8 uppercase tracking-widest">{support.subtitle}</p>
          )}
          <p className="text-lg lg:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {support.intro_description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-8">

        {/* BLOCKS */}
        <SupportBlock prefix="partnership" icon={Handshake} />
        <SupportBlock prefix="sponsorship" icon={Target} reverse />
        <SupportBlock prefix="philanthropy" icon={Heart} />
        <SupportBlock prefix="advisory" icon={Lightbulb} reverse />

        {/* WHY & IMPACT */}
        <div className="grid lg:grid-cols-2 gap-12 py-16">
          {(support.why_title || support.why_description) && (
            <div className="bg-white p-10 lg:p-14 rounded-[32px] shadow-xl shadow-slate-200/40 border border-slate-100 hover:shadow-2xl transition-shadow">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">{support.why_title}</h2>
              <ul className="space-y-4">
                {parseBullets(support.why_description).map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(support.impact_title || support.impact_description) && (
            <div className="bg-emerald-900 p-10 lg:p-14 rounded-[32px] shadow-xl text-white">
              <h2 className="text-3xl font-extrabold text-white mb-8">{support.impact_title}</h2>
              <ul className="space-y-4">
                {parseBullets(support.impact_description).map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Target className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-emerald-50 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* PROCESS */}
        {(support.process_title || support.step1) && (
          <div className="py-20 text-center">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-16">{support.process_title}</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[support.step1, support.step2, support.step3, support.step4].map((step, i) => step ? (
                <div key={i} className="relative bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:-translate-y-2 transition-transform">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-snug">{step}</h3>
                </div>
              ) : null)}
            </div>
          </div>
        )}

      </div>

      {/* QUOTE */}
      {(support.quote_title || support.quote_description) && (
        <section className="bg-emerald-50 py-24 px-6 relative overflow-hidden">
          <div className="absolute top-1/2 left-4 lg:left-20 -translate-y-1/2 text-emerald-600/10 transition-transform">
             <Quote size={200} />
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            {support.quote_title && <h3 className="text-emerald-700 font-bold uppercase tracking-widest mb-6">{support.quote_title}</h3>}
            <p className="text-3xl lg:text-5xl font-medium text-slate-800 leading-tight mb-8">"{support.quote_description}"</p>
            {support.quote_author && <p className="text-lg font-bold text-emerald-600">— {support.quote_author}</p>}
          </div>
        </section>
      )}

      {/* CTA */}
      {(support.cta_title || support.cta_description) && (
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden">
            {/* Decal */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
            
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 relative z-10">{support.cta_title}</h2>
            <p className="text-xl text-slate-300 font-medium mb-10 max-w-2xl mx-auto relative z-10">{support.cta_description}</p>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {support.button_text && support.button_link && (
                <Link href={support.button_link} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95">
                  {support.button_text}
                </Link>
              )}
              {support.secondary_button_text && support.secondary_button_link && (
                <Link href={support.secondary_button_link} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl backdrop-blur-sm transition-all border border-white/10">
                  {support.secondary_button_text}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
