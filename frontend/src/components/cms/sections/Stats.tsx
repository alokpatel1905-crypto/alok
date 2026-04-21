import React from 'react';
import { Users, Globe, BookOpen, Building } from 'lucide-react';

interface StatsProps {
  data: {
    title: string;
    description?: string;
    stats: Array<{
      value: string;
      label: string;
      icon: 'users' | 'globe' | 'book' | 'building';
    }>;
  };
}

const IconMap = {
  users: Users,
  globe: Globe,
  book: BookOpen,
  building: Building,
};

export const Stats: React.FC<StatsProps> = ({ data }) => {
  return (
    <section className="py-32 px-8 bg-white relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-6">{data.title}</h2>
          {data.description && (
            <p className="text-slate-500 font-medium text-[17px] leading-relaxed">
              {data.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {data.stats.map((stat, idx) => {
            const Icon = IconMap[stat.icon] || Globe;
            return (
              <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-10 flex flex-col items-center text-center hover:bg-white hover:border-emerald-100 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2 group">
                <div className="group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out mb-5">
                   <Icon size={40} className="text-emerald-700" strokeWidth={1.2} />
                </div>
                <h4 className="text-4xl lg:text-[42px] font-black text-slate-800 mb-3 tracking-tight">{stat.value}</h4>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
