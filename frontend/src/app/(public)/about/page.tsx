import React from 'react';
import Link from 'next/link';
import * as Icons from 'lucide-react';

import { apiFetch } from '@/lib/api';

export const dynamic = 'force-dynamic';

async function getAboutData() {
  return apiFetch('/about-page', { cache: 'no-store' });
}

export default async function AboutPage() {
  const page = await getAboutData();
  
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-xl text-slate-500 font-medium">About page content hasn't been configured yet.</p>
      </div>
    );
  }

  // Compile elements into an array for easier rendering
  const elements = [
    { title: page.soil_title || 'Soil', description: page.soil_description, icon: 'Trees' },
    { title: page.water_title || 'Water', description: page.water_description, icon: 'Droplets' },
    { title: page.air_title || 'Air', description: page.air_description, icon: 'Wind' },
    { title: page.energy_title || 'Energy', description: page.energy_description, icon: 'Zap' },
    { title: page.spaces_title || 'Spaces', description: page.spaces_description, icon: 'Home' },
  ].filter(e => e.description); // Only show if there's content

  return (
    <div className="bg-slate-50 font-sans text-slate-900 selection:bg-emerald-200">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-slate-900 text-white min-h-[60vh] flex items-center pt-24 pb-20 overflow-hidden">
        {page.about_image && (
          <div className="absolute inset-0 z-0">
            <img src={page.about_image} alt={page.image_alt || 'Banner'} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
          </div>
        )}
        <div className="container mx-auto px-6 relative z-10 max-w-5xl text-center">
          {page.short_subtitle && <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold tracking-widest text-xs uppercase mb-6 border border-emerald-500/30 backdrop-blur-sm">{page.short_subtitle}</span>}
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight">{page.page_title || 'About Us'}</h1>
          {page.main_description && <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">{page.main_description}</p>}
        </div>
      </section>

      {/* 2. VISION SECTION */}
      {(page.vision_title || page.vision_description) && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-4xl font-black mb-8 text-emerald-900">{page.vision_title || 'Our Vision'}</h2>
                <div className="space-y-6 text-slate-600 font-medium leading-relaxed md:text-lg whitespace-pre-wrap">
                  {page.vision_description}
                </div>
              </div>
              <div className="bg-emerald-50 p-10 rounded-[3rem] rounded-tr-lg border border-emerald-100 flex items-center justify-center">
                <Icons.Target className="w-24 h-24 text-emerald-300" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. ELEMENTS FRAMEWORK */}
      {elements.length > 0 && (
        <section className="py-24 bg-emerald-900 text-white">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <h2 className="text-4xl font-black mb-16 tracking-tight">The 5 Elements Framework</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {elements.map((el, i) => {
                const IconComp = (Icons as any)[el.icon] || Icons.Box;
                return (
                  <div key={i} className="bg-emerald-800/50 backdrop-blur border border-emerald-700 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 shadow-2xl shadow-emerald-900/50 flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-2xl rotate-3 mb-6 flex items-center justify-center shadow-inner">
                      <IconComp className="w-10 h-10 text-white -rotate-3" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{el.title}</h3>
                    <p className="text-sm text-emerald-100/80 leading-relaxed font-medium">{el.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. HISTORY / GROWTH */}
      {(page.growth_description || page.founded_year) && (
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <span className="text-emerald-600 font-bold tracking-widest uppercase">Our Journey</span>
              <h2 className="text-4xl font-black text-slate-900 max-w-2xl">{page.history_notes || 'Transforming education step by step.'}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                  <div className="text-5xl font-black text-emerald-500 mb-2">{page.founded_year || '2000'}</div>
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-sm">Founded Year</div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
                  <div className="text-5xl font-black text-emerald-500 mb-2">{page.countries_count || '45'}</div>
                  <div className="font-bold text-slate-500 uppercase tracking-wider text-sm">Countries Reached</div>
                </div>
              </div>
              
              {page.growth_description && <p className="text-lg text-slate-600 max-w-3xl mt-8 font-medium whitespace-pre-wrap">{page.growth_description}</p>}
            </div>
          </div>
        </section>
      )}

      {/* 5. APPROACH */}
      {(page.approach_title || page.approach_description) && (
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h2 className="text-4xl font-black mb-8 text-emerald-900">{page.approach_title || 'Our Approach'}</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium whitespace-pre-wrap inline-block text-left">
              {page.approach_description}
            </div>
          </div>
        </section>
      )}

      {/* 6. LEADERSHIP */}
      {(page.founder_name || page.leadership_title) && (
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-slate-900 mb-4">{page.leadership_title || 'Leadership'}</h2>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-16 bg-white p-8 md:p-16 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="w-full md:w-1/3">
                {page.founder_image ? (
                   <img src={page.founder_image} alt={page.founder_name} className="w-full aspect-square object-cover rounded-[2.5rem] shadow-2xl -rotate-2" />
                ) : (
                   <div className="w-full aspect-square bg-slate-200 rounded-[2.5rem] flex items-center justify-center -rotate-2">
                     <Icons.User className="w-20 h-20 text-slate-400" />
                   </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-4xl font-black text-slate-900 mb-2">{page.founder_name}</h3>
                <p className="text-emerald-600 font-bold uppercase tracking-wider mb-6">{page.founder_designation}</p>
                <div className="text-lg text-slate-600 font-medium leading-relaxed mb-8 whitespace-pre-wrap">
                  {page.founder_description}
                </div>
                {page.founder_profile_link && (
                  <a href={page.founder_profile_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors">
                    View Profile <Icons.ArrowRight size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* PARTNERS */}
            <div className="mt-20 text-center">
              <div className="flex flex-wrap justify-center gap-4">
                {page.partner_1_name && (
                  <a href={page.partner_1_link || '#'} target="_blank" rel="noreferrer" className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm flex items-center gap-2">
                      {page.partner_1_name} <Icons.ExternalLink size={16} className="opacity-50" />
                  </a>
                )}
                {page.partner_2_name && (
                  <a href={page.partner_2_link || '#'} target="_blank" rel="noreferrer" className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm flex items-center gap-2">
                      {page.partner_2_name} <Icons.ExternalLink size={16} className="opacity-50" />
                  </a>
                )}
                {page.partner_3_name && (
                  <a href={page.partner_3_link || '#'} target="_blank" rel="noreferrer" className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm flex items-center gap-2">
                      {page.partner_3_name} <Icons.ExternalLink size={16} className="opacity-50" />
                  </a>
                )}
              </div>
            </div>
            
          </div>
        </section>
      )}

      {/* 7. CTA */}
      {(page.button_text || page.secondary_button_text) && (
        <section className="py-24 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
            <h2 className="text-5xl font-black mb-10">Ready to engage?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {page.button_text && (
                <Link href={page.button_link || '#'} className="bg-white text-emerald-700 font-black px-8 py-4 rounded-2xl hover:bg-slate-50 transition-colors shadow-xl text-lg">
                  {page.button_text}
                </Link>
              )}
              {page.secondary_button_text && (
                <Link href={page.secondary_button_link || '#'} className="bg-transparent border-2 border-white/50 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white inset hover:text-emerald-700 transition-colors text-lg">
                  {page.secondary_button_text}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export async function generateMetadata() {
  const page = await getAboutData();
  if (!page) return { title: 'About Us' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
