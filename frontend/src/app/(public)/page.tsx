import React from 'react';
import Link from 'next/link';
import { ArrowRight, Leaf, Globe, CheckCircle2, ChevronRight, Quote, Heart } from 'lucide-react';
import { getHomePage } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const page = await getHomePage();

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-400">Welcome to Green Mentors</h2>
          <p className="text-slate-500 mt-2">The CMS content for the home page is currently being set up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-slate-900 selection:bg-emerald-200 antialiased min-h-screen flex flex-col pt-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden text-white">
        {page.hero_image_url ? (
          <div className="absolute inset-0 z-0">
            <img src={page.hero_image_url} alt="Hero Background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
          </div>
        ) : (
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none z-0" />
        )}
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            {page.hero_subtitle && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-widest text-xs uppercase mb-8 border border-emerald-500/30 backdrop-blur-md">
                <Leaf size={14} /> {page.hero_subtitle}
              </span>
            )}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-8">
              {page.hero_title || 'Transforming Education for a Sustainable Future'}
            </h1>
            {page.hero_description && (
              <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light mb-12 max-w-2xl border-l-4 border-emerald-500 pl-6">
                {page.hero_description}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              {page.hero_button_1_text && (
                <Link href={page.hero_button_1_link || '#'} className="inline-flex items-center gap-3 bg-emerald-500 text-white font-black px-8 py-5 rounded-2xl hover:bg-emerald-400 hover:-translate-y-1 transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] uppercase tracking-wide text-sm">
                  {page.hero_button_1_text} <ArrowRight size={18} />
                </Link>
              )}
              {page.hero_button_2_text && (
                <Link href={page.hero_button_2_link || '#'} className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black px-8 py-5 rounded-2xl hover:bg-white/20 hover:-translate-y-1 transition-all uppercase tracking-wide text-sm">
                  {page.hero_button_2_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SUMMARY */}
      {(page.about_title || page.about_description) && (
        <section className="py-24 lg:py-32 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="flex-1 space-y-8">
                <div className="w-16 h-1 rounded-full bg-emerald-500" />
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                  {page.about_title}
                </h2>
                <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                  {page.about_description}
                </div>
                {page.about_button_text && (
                  <Link href={page.about_button_link || '#'} className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors uppercase tracking-wider text-sm mt-4">
                    {page.about_button_text} <ChevronRight size={18} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. IMPACT STATS */}
      <section className="py-24 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
        <Globe className="absolute -top-24 -left-24 w-96 h-96 text-slate-200/50 stroke-[0.5]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { t: page.stat_1_title, v: page.stat_1_value },
              { t: page.stat_2_title, v: page.stat_2_value },
              { t: page.stat_3_title, v: page.stat_3_value },
              { t: page.stat_4_title, v: page.stat_4_value }
            ].map((stat, idx) => {
              if (!stat.t && !stat.v) return null;
              return (
                <div key={idx} className="bg-white p-10 rounded-3xl text-center shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform group">
                  <h4 className="text-5xl md:text-6xl font-black text-emerald-600 mb-4 tracking-tighter group-hover:text-emerald-500 transition-colors">{stat.v}</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.t}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PROGRAMS OVERVIEW */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">{page.programs_title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl">
            {[
              { title: page.program_1_title, desc: page.program_1_desc },
              { title: page.program_2_title, desc: page.program_2_desc },
              { title: page.program_3_title, desc: page.program_3_desc },
              { title: page.program_4_title, desc: page.program_4_desc },
            ].map((prog, idx) => {
              if (!prog.title) return null;
              return (
                <div key={idx} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:bg-emerald-50 transition-colors group">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">{prog.title}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">{prog.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      {(page.why_title || page.why_description) && (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-black mb-10 text-emerald-400">{page.why_title}</h2>
              <div className="prose prose-lg prose-invert text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                {page.why_description}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. FIVE ELEMENTS FRAMEWORK */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 text-center mx-auto text-slate-900">
            <h2 className="text-4xl md:text-5xl font-black">The Five Elements Framework</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: page.element_soil_title, desc: page.element_soil_desc },
              { title: page.element_water_title, desc: page.element_water_desc },
              { title: page.element_air_title, desc: page.element_air_desc },
              { title: page.element_energy_title, desc: page.element_energy_desc },
              { title: page.element_spaces_title, desc: page.element_spaces_desc },
            ].map((el, idx) => {
              if (!el.title) return null;
              return (
                <div key={idx} className="bg-emerald-50/50 rounded-3xl p-8 text-center border border-emerald-100/50 hover:bg-emerald-100 transition-colors">
                  <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-emerald-600 mb-6 shadow-sm font-black text-xl">
                    {el.title?.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{el.title}</h3>
                  <p className="text-slate-600 text-sm font-medium">{el.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 7. EVENTS */}
      {(page.events_title || page.events_description) && (
        <section className="py-24 bg-slate-50 border-t border-slate-200">
           <div className="container mx-auto px-6 text-center max-w-4xl">
            <CalendarIcon className="w-16 h-16 text-emerald-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8">{page.events_title}</h2>
            <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap max-w-none mb-10">
              {page.events_description}
            </div>
            {page.events_button_text && (
               <Link href={page.events_button_link || '#'} className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20">
                 {page.events_button_text} <ArrowRight size={18} />
               </Link>
            )}
           </div>
        </section>
      )}

      {/* 8. TESTIMONIALS */}
      {(page.testimonial_quote) && (
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <h2 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-12">{page.testimonial_title}</h2>
            <Quote className="w-16 h-16 text-emerald-200 mx-auto mb-8 rotate-180" />
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight mb-8">"{page.testimonial_quote}"</h3>
            <p className="text-lg font-black text-slate-900 uppercase tracking-wide">— {page.testimonial_author}</p>
          </div>
        </section>
      )}

      {/* 9. CTA SECTION */}
      {(page.cta_title || page.cta_description) && (
        <section className="py-24 bg-emerald-600 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <Heart className="w-12 h-12 text-emerald-300 mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight max-w-4xl mx-auto">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 font-medium whitespace-pre-wrap">{page.cta_description}</p>}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {page.cta_button_1_text && (
                <Link href={page.cta_button_1_link || '#'} className="inline-flex items-center gap-2 bg-slate-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-slate-800 hover:scale-105 transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] uppercase tracking-widest text-sm">
                  {page.cta_button_1_text} <ArrowRight size={20} />
                </Link>
              )}
              {page.cta_button_2_text && (
                <Link href={page.cta_button_2_link || '#'} className="inline-flex items-center gap-2 bg-white text-emerald-900 font-black px-10 py-5 rounded-2xl hover:bg-emerald-50 hover:scale-105 transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] uppercase tracking-widest text-sm">
                  {page.cta_button_2_text}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
  )
}

export async function generateMetadata() {
  const page = await getHomePage();
  if (!page) return { title: 'Green Mentors | Global Responsible Education Network' };
  
  return {
    title: page.meta_title || 'Home | Green Mentors',
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
