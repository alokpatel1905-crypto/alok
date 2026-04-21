import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CTAProps {
  data: {
    title: string;
    description: string;
    buttonLabel: string;
    buttonLink: string;
  };
}

export const CTA: React.FC<CTAProps> = ({ data }) => {
  return (
    <section className="py-24 px-8 bg-emerald-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight leading-tight">
          {data.title}
        </h2>
        <p className="text-emerald-50/80 text-lg md:text-xl font-medium mb-12 leading-relaxed">
          {data.description}
        </p>
        <a href={data.buttonLink} className="inline-flex items-center gap-3 bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black shadow-xl hover:bg-emerald-50 hover:-translate-y-1 transition-all duration-300">
          {data.buttonLabel} <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
};
