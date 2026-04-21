'use client';

import React, { useState, useEffect } from 'react';
import { getMedia } from '@/lib/api';
import { Newspaper, FileText, Image as ImageIcon, ArrowRight, Video, Filter, Megaphone } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type MediaItem = {
  title: string;
  category: string;
  description: string;
  image: string;
  date: string;
  link: string;
};

const CATEGORY_ICONS: Record<string, any> = {
  "All": Filter,
  "News": Newspaper,
  "Press": Megaphone,
  "Publications": FileText,
  "Gallery": ImageIcon,
  "Video": Video
};

export default function MediaPage() {
  const [config, setConfig] = useState<any>(null);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MediaItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  // Derive dynamic categories based on the data, ensuring 'All' is always first
  const categories = ["All", ...Array.from(new Set(items.map(i => i.category)))];

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getMedia();
        setConfig(response);
        const fetchedItems = response?.items ?? [];
        setItems(fetchedItems);
        setFilteredItems(fetchedItems);
      } catch (error) {
        console.error("Failed to load media items:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleFilter = (cat: string) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter((i) => i.category === cat));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* HEADER SECTION */}
      <section className="relative overflow-hidden bg-[#0D0D0D] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 px-6 lg:px-8 text-center border-b-[8px] border-emerald-600">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold tracking-widest uppercase mb-8">
            <Newspaper className="w-4 h-4" />
            {config?.subtitle || 'Our Updates'}
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8">
            {config?.page_title || 'Media & Publications'}
          </h1>
          <p className="text-lg lg:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium">
            {config?.intro_description || 'Explore our latest news, press releases, environmental publications, and gallery highlights covering global sustainability in education.'}
          </p>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || Filter;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all",
                  isActive 
                    ? "bg-emerald-600 text-white shadow-xl shadow-emerald-600/20 scale-105" 
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
                )}
              >
                <Icon className="w-4 h-4" />
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* MEDIA GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => (
               <div key={i} className="h-[400px] bg-slate-200 rounded-[2rem]" />
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <div key={idx} className="group bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col hover:-translate-y-2 transition-transform duration-300">
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-3 block">
                    {item.date}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 font-medium mb-8 leading-relaxed flex-1 whitespace-pre-wrap">
                    {item.description}
                  </p>
                  {item.link && (
                    <a href={item.link} className="inline-flex flex-wrap items-center gap-2 text-emerald-600 font-bold text-sm tracking-wide uppercase hover:text-emerald-800 transition-colors mt-auto">
                      Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No content found</h3>
            <p className="text-slate-500">There are no media items available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* CTA SECTION */}
      <section className="bg-emerald-900 py-32 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
            {config?.cta_title || 'Media Inquiries'}
          </h2>
          <p className="text-xl text-emerald-100 font-medium max-w-2xl mx-auto mb-10 whitespace-pre-wrap">
            {config?.cta_description || 'For press kits, interviews, and media partnerships, please connect with our public relations department.'}
          </p>
          {(config?.cta_button_text || config?.cta_button_link) && (
            <Link href={config?.cta_button_link || '/contact'} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-900 font-black rounded-2xl shadow-xl hover:bg-emerald-50 hover:-translate-y-1 transition-all text-lg group">
              {config?.cta_button_text || 'Contact Media Team'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
