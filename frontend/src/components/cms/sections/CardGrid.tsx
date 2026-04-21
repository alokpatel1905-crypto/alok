import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CardGridProps {
  data: {
    title: string;
    description?: string;
    cards: Array<{
      title: string;
      items: string[];
    }>;
  };
}

export const CardGrid: React.FC<CardGridProps> = ({ data }) => {
  return (
    <section className="py-32 px-8 bg-slate-50 relative border-y border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-20 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-5">{data.title}</h2>
          {data.description && (
            <p className="text-slate-500 font-medium text-[17px] leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.cards.map((category, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <h4 className="text-[13px] font-bold text-slate-800 mb-8 uppercase tracking-widest border-b border-emerald-50 pb-5 inline-flex items-center gap-4 w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                {category.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {category.items.map((item, i) => (
                  <li key={i}>
                    <div className="group inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-slate-50 text-[13px] font-semibold text-slate-600 border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 transition-all duration-200 cursor-default">
                      <span className="truncate pr-4 leading-relaxed">{item}</span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 shrink-0 transition-transform" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
