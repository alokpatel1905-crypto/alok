import React from 'react';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Award } from 'lucide-react';

import { apiFetch } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getMilestoneData() {
  const [page, list] = await Promise.all([
    apiFetch('/milestones/page', { cache: 'no-store' }),
    apiFetch('/milestones', { cache: 'no-store' }),
  ]);
  return { page, list: list || [] };
}

export default async function MilestonesPage() {
  const { page, list } = await getMilestoneData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500 font-medium">Milestones configured incorrectly. Please set up the page.</p>
      </div>
    );
  }

  // Filter out inactive ones
  const activeMilestones = list.filter((m: any) => m.status === 'Active');

  const useTimeline = page.show_timeline_style !== false;
  const useYearHighlight = page.show_year_highlight !== false;

  return (
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200 antialiased min-h-screen flex flex-col">
      
      {/* 1. HERO / INTRO */}
      <section className="bg-slate-900 text-white py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-emerald-600/20 blur-[120px] rounded-full point-events-none" />
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          {page.subtitle && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-widest text-xs uppercase mb-6 border border-emerald-500/30 backdrop-blur-sm">
              {page.subtitle}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-white">{page.page_title}</h1>
          {page.intro_description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light">
              {page.intro_description}
            </p>
          )}
        </div>
      </section>

      {/* 2. TIMELINE LIST */}
      <section className="py-24 bg-white flex-grow">
        <div className="container mx-auto px-6 max-w-5xl">
          {activeMilestones.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <Award className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-500">No milestones announced yet.</h3>
            </div>
          ) : (
            <div className="relative">
              {useTimeline && (
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-emerald-200 transform md:-translate-x-1/2 z-0" />
              )}
              
              <div className="space-y-12 md:space-y-24 relative z-10">
                {activeMilestones.map((milestone: any, index: number) => {
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div key={milestone.id} className={`flex tracking-tight flex-col md:flex-row items-start ${useTimeline ? '' : 'border-b border-slate-100 pb-12'}`}>
                      
                      {/* Left Side (Empty on even, content on odd in timeline) */}
                      {useTimeline && (
                         <div className={`hidden md:block w-1/2 pr-16 text-right ${!isEven ? 'opacity-100' : 'opacity-0'}`}>
                           {!isEven && (
                              <div>
                                {useYearHighlight && <div className="text-6xl font-black text-slate-200 mb-2 leading-none">{milestone.year}</div>}
                                {milestone.title && <h3 className="text-xl font-bold text-emerald-800 mb-3 uppercase tracking-wider">{milestone.title}</h3>}
                                <p className="text-lg text-slate-600 font-medium leading-relaxed">{milestone.description}</p>
                              </div>
                           )}
                         </div>
                      )}

                      {/* Center Node */}
                      {useTimeline && (
                        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-white rounded-full border-[4px] border-emerald-500 shadow-xl shadow-emerald-500/20 z-20">
                          <div className="w-4 h-4 bg-emerald-600 rounded-full" />
                        </div>
                      )}

                      {/* Right Side (Content on even, empty on odd in timeline) */}
                      {useTimeline ? (
                        <div className={`w-full md:w-1/2 md:pl-16 relative pl-16 md:text-left ${isEven ? 'opacity-100' : 'md:opacity-0 hidden md:block'}`}>
                           {/* Mobile Node */}
                           <div className="md:hidden absolute left-3 top-2 transform -translate-x-1/2 items-center justify-center w-6 h-6 bg-white rounded-full border-[2px] border-emerald-500 z-20">
                             <div className="w-2 h-2 bg-emerald-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                           </div>
                           
                           {isEven || true ? (
                             <div>
                               {useYearHighlight && <div className="text-5xl md:text-6xl font-black text-slate-200 mb-2 leading-none">{milestone.year}</div>}
                               {!useYearHighlight && <div className="text-lg font-bold text-emerald-600 mb-1 flex items-center gap-2"><CalendarDays size={18}/> {milestone.year}</div>}
                               {milestone.title && <h3 className="text-xl font-bold text-emerald-800 mb-3 uppercase tracking-wider">{milestone.title}</h3>}
                               <p className="text-lg text-slate-600 font-medium leading-relaxed">{milestone.description}</p>
                             </div>
                           ) : null}
                        </div>
                      ) : (
                        // Standard Vertical List fallback
                        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-12 pl-4 border-l-4 border-emerald-500 hover:border-emerald-600 transition-colors">
                           <div className="w-full md:w-1/4">
                             <div className="text-4xl md:text-5xl font-black text-slate-900">{milestone.year}</div>
                           </div>
                           <div className="w-full md:w-3/4">
                             {milestone.title && <h3 className="text-xl font-bold text-emerald-800 mb-3 uppercase tracking-wider">{milestone.title}</h3>}
                             <p className="text-lg text-slate-600 leading-relaxed font-medium">{milestone.description}</p>
                           </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CTA */}
      {(page.cta_title || page.button_text) && (
        <section className="py-24 bg-emerald-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
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
  const { page } = await getMilestoneData();
  if (!page) return { title: 'Milestones' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
