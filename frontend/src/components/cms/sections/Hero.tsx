import React from 'react';
import { ArrowRight, Target } from 'lucide-react';

interface HeroProps {
  data: {
    title: string;
    subtitle?: string;
    description: string;
    ctaLabel?: string;
    ctaLink?: string;
    secondaryCtaLabel?: string;
    secondaryCtaLink?: string;
    badgeText?: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative py-24 lg:py-32 px-8 flex items-center min-h-[70vh] bg-white overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white -z-20" />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="flex flex-col items-start z-10 lg:pr-8">
          {data.badgeText && (
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-widest mb-10">
              <Target size={14} className="text-emerald-600" />
              {data.badgeText}
            </div>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-8">
            {data.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < data.title.split('\n').length - 1 && <br className="hidden lg:block"/>}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-[17px] md:text-lg text-slate-500 mb-12 max-w-xl font-medium leading-[1.8]">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            {data.ctaLabel && (
              <a href={data.ctaLink || '#'} className="w-full sm:w-auto bg-emerald-800 text-white px-8 py-4 flex items-center justify-center gap-3 rounded-xl font-semibold shadow-lg shadow-emerald-900/10 hover:bg-emerald-900 hover:-translate-y-0.5 transition-all duration-300">
                {data.ctaLabel} <ArrowRight size={18} />
              </a>
            )}
            {data.secondaryCtaLabel && (
              <a href={data.secondaryCtaLink || '#'} className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-8 py-4 flex items-center justify-center gap-3 rounded-xl font-semibold shadow-sm hover:border-emerald-200 hover:text-emerald-800 hover:bg-emerald-50/50 hover:-translate-y-0.5 transition-all duration-300">
                {data.secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
