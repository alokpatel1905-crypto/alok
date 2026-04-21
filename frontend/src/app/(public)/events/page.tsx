import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Globe, Target, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function getEventsData() {
  try {
    const res = await fetch(`${API_URL}/events-page`, { cache: 'no-store' });
    if (res.ok) return await res.json();
    return null;
  } catch (e) {
    console.error("Failed to fetch Events data", e);
    return null;
  }
}

export default async function EventsPage() {
  const page = await getEventsData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500 font-medium">Events page hasn't been configured yet.</p>
      </div>
    );
  }

  const mainEvents = [
    { prefix: 'event1', t: page.event1_title, st: page.event1_subtitle, d: page.event1_description, loc: page.event1_location, date: page.event1_date, b1t: page.event1_button1_text, b1l: page.event1_button1_link, b2t: page.event1_button2_text, b2l: page.event1_button2_link, img: page.event1_image },
    { prefix: 'event2', t: page.event2_title, st: page.event2_subtitle, d: page.event2_description, loc: page.event2_location, date: page.event2_date, b1t: page.event2_button1_text, b1l: page.event2_button1_link, b2t: page.event2_button2_text, b2l: page.event2_button2_link, img: page.event2_image },
    { prefix: 'event3', t: page.event3_title, st: page.event3_subtitle, d: page.event3_description, loc: page.event3_location, date: page.event3_date, b1t: page.event3_button1_text, b1l: page.event3_button1_link, b2t: page.event3_button2_text, b2l: page.event3_button2_link, img: page.event3_image },
    { prefix: 'event4', t: page.event4_title, st: page.event4_subtitle, d: page.event4_description, loc: page.event4_location, date: page.event4_date, b1t: page.event4_button1_text, b1l: page.event4_button1_link, b2t: page.event4_button2_text, b2l: page.event4_button2_link, img: page.event4_image },
  ].filter(s => s.t);

  const upcomingEvents = page.upcoming_events || [];

  return (
    <div className="bg-[#f4f7f6] font-sans text-slate-900 selection:bg-emerald-200 antialiased min-h-screen flex flex-col">
      
      {/* 1. HERO / INTRO */}
      <section className="bg-slate-950 text-white pt-24 lg:pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 blur-[100px] rounded-full point-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/20 blur-[100px] rounded-full point-events-none translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-slate-800 shadow-2xl">
            <Globe size={40} className="text-blue-400" />
          </div>
          {page.subtitle && (
            <span className="inline-block px-5 py-2 rounded-full bg-blue-500/20 text-blue-300 font-bold tracking-widest text-xs uppercase mb-8 border border-blue-500/30">
              {page.subtitle}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">{page.page_title || 'Events'}</h1>
          {page.intro_description && (
            <p className="text-lg md:text-2xl text-slate-300 mx-auto leading-relaxed font-light max-w-4xl">
              {page.intro_description}
            </p>
          )}
        </div>
      </section>

      {/* 2. CORE EVENTS (Massive Blocks) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-6xl space-y-32">
          {mainEvents.map((ev, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
                
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 relative group">
                    {ev.img ? (
                      <img src={ev.img} alt={ev.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Calendar className="w-24 h-24 text-slate-300" />
                      </div>
                    )}
                    
                    {/* Floating Date/Loc Badge */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        {ev.loc && (
                            <div className="bg-white/90 backdrop-blur-sm text-slate-900 font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                                <MapPin size={14} className="text-blue-600" /> {ev.loc}
                            </div>
                        )}
                        {ev.date && (
                            <div className="bg-slate-900/90 backdrop-blur-sm text-white font-bold text-xs uppercase px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                                <Calendar size={14} className="text-emerald-400" /> {ev.date}
                            </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="text-blue-600 font-black tracking-wider uppercase text-sm mb-4 block">
                    Main Event 0{idx + 1}
                  </span>
                  
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                    {ev.t}
                  </h2>
                  
                  {ev.st && (
                    <h3 className="text-xl text-slate-500 font-medium mb-6 italic">
                      "{ev.st}"
                    </h3>
                  )}

                  {ev.d && (
                    <div className="prose prose-lg text-slate-600 font-medium leading-relaxed mb-10 whitespace-pre-wrap">
                      {ev.d}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                    {ev.b1t && (
                      <Link href={ev.b1l || '#'} className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/20 hover:-translate-y-0.5 duration-300">
                        {ev.b1t} <ArrowRight size={18} />
                      </Link>
                    )}
                    {ev.b2t && (
                      <Link href={ev.b2l || '#'} className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-200 transition-colors">
                        {ev.b2t}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. UPCOMING EVENTS (Dynamic Array) */}
      {upcomingEvents.length > 0 && (
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                    <h2 className="text-4xl font-black mb-4">Upcoming Events Timeline</h2>
                    <p className="text-slate-400 text-lg">Mark your calendars for our upcoming interactions.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((ev: any, i: number) => (
                    <div key={i} className="bg-slate-800 border border-slate-700 rounded-2xl p-8 hover:border-slate-500 transition-colors flex flex-col h-full group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="bg-slate-900 text-blue-400 p-3 rounded-xl border border-slate-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Calendar size={24} />
                            </div>
                            {ev.date && <span className="bg-slate-700 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">{ev.date}</span>}
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">{ev.name}</h3>
                        
                        {ev.location && (
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium mb-4">
                                <MapPin size={14} /> {ev.location}
                            </div>
                        )}

                        {ev.description && (
                            <p className="text-slate-300 text-base flex-grow mb-8">{ev.description}</p>
                        )}
                        
                        {/* Pushes button to bottom */}
                        <div className="mt-auto">
                            {ev.link && (
                                <Link href={ev.link} className="inline-flex items-center gap-2 text-blue-400 font-bold hover:text-blue-300 transition-colors">
                                    Register <ArrowRight size={16} />
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. WHY ATTEND */}
      {(page.why_title || page.why_description) && (
        <section className="py-24 bg-[#f4f7f6]">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Target size={32} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-8">{page.why_title}</h2>
            <div className="prose prose-lg text-slate-600 font-medium leading-relaxed whitespace-pre-wrap mx-auto">
              {page.why_description}
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA */}
      {(page.cta_title || page.button_text) && (
        <section className="py-32 bg-blue-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">{page.cta_title}</h2>
            {page.cta_description && <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 font-medium">{page.cta_description}</p>}
            {page.button_text && (
              <Link href={page.button_link || '#'} className="inline-flex items-center gap-2 bg-white text-blue-900 font-black px-10 py-5 rounded-2xl hover:bg-slate-50 hover:scale-105 transition-all shadow-xl">
                {page.button_text} <CheckCircle2 size={20} />
              </Link>
            )}
          </div>
        </section>
      )}

    </div>
  );
}

export async function generateMetadata() {
  const page = await getEventsData();
  if (!page) return { title: 'Events' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
