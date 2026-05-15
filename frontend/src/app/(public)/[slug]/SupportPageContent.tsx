'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, CheckCircle2, Quote, Handshake, Target, Heart, Lightbulb,
  ArrowUpRight, Sparkles, Zap
} from 'lucide-react';

const COLORS = {
  ink: '#0F172A',
  sage: '#21D469',
  gold: '#FACC15',
  parchment: '#FFFFFF',
};

const SectionLabel = ({ text, color = COLORS.sage }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] w-12 bg-black/10" />
    <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color }}>
      {text}
    </span>
  </div>
);

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
      <div className={`grid lg:grid-cols-12 gap-24 items-center py-24 ${reverse ? 'lg:flex-row-reverse' : ''}`}>
        <div className={`lg:col-span-6 space-y-12 ${reverse ? 'lg:order-2' : ''}`}>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#21D469]">
               <Icon size={32} strokeWidth={1.5} />
               {subtitle && <span className="text-[10px] font-black uppercase tracking-[0.4em]">{subtitle}</span>}
            </div>
            <h2 className="text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-[0.9]">{title}</h2>
          </div>
          <p className="text-xl font-medium italic opacity-60 leading-relaxed">
            {desc}
          </p>
          <div className="flex flex-wrap gap-8">
            {btn1Text && (
              <button className="bg-[#0F172A] text-white px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                {btn1Text} <ArrowUpRight size={16} className="inline ml-4" />
              </button>
            )}
            {btn2Text && (
               <Link href={btn2Link || '#'} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] border-b border-black/10 pb-2 hover:text-[#21D469] transition-colors">
                {btn2Text}
              </Link>
            )}
          </div>
        </div>
        <div className={`lg:col-span-6 relative ${reverse ? 'lg:order-1' : ''}`}>
          <div className="aspect-[4/3] rounded-[4rem] overflow-hidden shadow-premium relative bg-[#F8FAFC]">
             {img ? (
                <img src={img} alt={title} className="w-full h-full object-cover grayscale opacity-70" />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-[#21D469]/10">
                   <Icon size={160} strokeWidth={0.5} />
                </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#21D469]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="STRATEGIC ALLIANCE" />
          <h1 className="text-[clamp(50px,10vw,150px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
            {support.page_title || 'Support the Evolution.'}
          </h1>
          {support.intro_description && (
            <p className="text-2xl font-serif italic text-[#0F172A]/60 leading-relaxed max-w-3xl border-l-4 border-[#21D469] pl-12">
              {support.intro_description}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
        <SupportBlock prefix="partnership" icon={Handshake} />
        <SupportBlock prefix="sponsorship" icon={Target} reverse />
        <SupportBlock prefix="philanthropy" icon={Heart} />
        <SupportBlock prefix="advisory" icon={Lightbulb} reverse />

        {/* Why & Impact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 py-32">
          {(support.why_title || support.why_description) && (
            <div className="bg-[#F8FAFC] p-16 lg:p-24 rounded-[4rem] border border-black/5 shadow-premium">
              <SectionLabel text="THE PURPOSE" />
              <h2 className="text-5xl font-display font-black uppercase tracking-tighter mb-12">{support.why_title}</h2>
              <ul className="space-y-8">
                {parseBullets(support.why_description).map((item, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <CheckCircle2 size={24} className="text-[#21D469] shrink-0 mt-1" />
                    <span className="text-xl font-medium italic opacity-60 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(support.impact_title || support.impact_description) && (
            <div className="bg-[#0F172A] p-16 lg:p-24 rounded-[4rem] text-white shadow-premium relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 text-[#21D469]/5">
                  <Zap size={160} strokeWidth={0.5} />
               </div>
              <SectionLabel text="THE IMPACT" color={COLORS.sage} />
              <h2 className="text-5xl font-display font-black uppercase tracking-tighter mb-12">{support.impact_title}</h2>
              <ul className="space-y-8">
                {parseBullets(support.impact_description).map((item, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <Target size={24} className="text-[#FACC15] shrink-0 mt-1" />
                    <span className="text-xl font-medium italic opacity-60 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Process Steps */}
        {(support.process_title || support.step1) && (
          <div className="py-32 text-center">
            <SectionLabel text="THE PROTOCOL" />
            <h2 className="text-6xl md:text-9xl font-display font-black uppercase tracking-tighter mb-32">{support.process_title}</h2>
            <div className="grid md:grid-cols-4 gap-12">
              {[support.step1, support.step2, support.step3, support.step4].map((step, i) => step ? (
                <div key={i} className="group p-12 bg-white border border-black/5 rounded-[3rem] hover:border-[#21D469] transition-all duration-700 text-center">
                  <div className="w-16 h-16 bg-[#21D469] text-[#0F172A] rounded-2xl flex items-center justify-center text-3xl font-display font-black mx-auto mb-12 shadow-3d">
                    {i + 1}
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase tracking-tighter">{step}</h3>
                </div>
              ) : null)}
            </div>
          </div>
        )}
      </div>

      {/* Quote */}
      {(support.quote_title || support.quote_description) && (
        <section className="bg-[#F8FAFC] py-40 px-8 lg:px-16 relative overflow-hidden text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#21D469]/5 font-display font-black text-[500px] select-none pointer-events-none">
             "
          </div>
          <div className="max-w-5xl mx-auto relative z-10 space-y-12">
            {support.quote_title && <SectionLabel text={support.quote_title} />}
            <p className="text-4xl lg:text-6xl font-display font-black uppercase tracking-tighter leading-tight italic">"{support.quote_description}"</p>
            {support.quote_author && (
              <div className="pt-8 flex items-center justify-center gap-6">
                 <div className="h-[1px] w-12 bg-black/20" />
                 <p className="text-xl font-display font-black uppercase tracking-widest text-[#21D469]">{support.quote_author}</p>
                 <div className="h-[1px] w-12 bg-black/20" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      {(support.cta_title || support.cta_description) && (
        <section className="py-40 px-8 lg:px-16">
          <div className="max-w-[1800px] mx-auto bg-[#FACC15] rounded-[5rem] p-16 lg:p-32 text-center relative overflow-hidden shadow-premium">
            <div className="absolute top-0 right-0 p-24 text-[300px] font-black text-[#0F172A]/[0.03] select-none pointer-events-none font-display uppercase">
              LEAD
            </div>
            
            <div className="max-w-4xl mx-auto relative z-10 space-y-12">
               <Sparkles size={64} className="mx-auto mb-8" />
               <h2 className="text-6xl md:text-9xl leading-[0.8] font-display font-black uppercase tracking-tighter">{support.cta_title}</h2>
               <p className="text-2xl font-serif italic opacity-60 leading-relaxed max-w-2xl mx-auto">{support.cta_description}</p>
               
               <div className="flex flex-wrap justify-center gap-8 pt-8">
                  {support.button_text && (
                    <button className="bg-[#0F172A] text-white px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                      {support.button_text} <ArrowRight size={20} className="inline ml-4" />
                    </button>
                  )}
                  {support.secondary_button_text && (
                    <button className="bg-white text-[#0F172A] px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d border border-black/5">
                      {support.secondary_button_text}
                    </button>
                  )}
               </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
