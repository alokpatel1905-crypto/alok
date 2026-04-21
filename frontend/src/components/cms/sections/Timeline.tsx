import React from 'react';

interface TimelineProps {
  data: {
    title: string;
    items: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
}

export const Timeline: React.FC<TimelineProps> = ({ data }) => {
  return (
    <section className="py-32 px-8 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-16 text-center">{data.title}</h2>
        <div className="space-y-12">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {item.year}
                </div>
                <div className="w-px h-full bg-slate-100 mt-4" />
              </div>
              <div className="pb-12">
                <h4 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
