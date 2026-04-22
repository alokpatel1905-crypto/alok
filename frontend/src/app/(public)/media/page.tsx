'use client';

import React, { useState, useEffect } from 'react';
import { getMedia } from '@/lib/api';
import { Newspaper, FileText, Image as ImageIcon, ArrowRight, Video, Filter, Megaphone, Search, Zap, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

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
    <div className="overflow-x-hidden bg-background min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-20 overflow-hidden bg-foreground">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 blur-[120px] rounded-full -ml-40 -mt-40 animate-blob" />
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Newspaper size={14} />
            {config?.subtitle || 'Our Global Impact'}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter">
            {config?.page_title || 'Media Center'}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
            {config?.intro_description || 'Explore our latest news, press releases, environmental publications, and gallery highlights covering global sustainability in education.'}
          </p>
        </Container>
      </section>

      {/* 2. FILTERS */}
      <Section background="white" className="py-12 border-b border-black/5 sticky top-20 z-40 bg-white/80 backdrop-blur-md">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Filter;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={cn(
                    "flex items-center gap-3 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border-2",
                    isActive 
                      ? "bg-foreground border-foreground text-white shadow-xl shadow-black/10 scale-105" 
                      : "bg-transparent border-black/5 text-foreground/40 hover:border-primary/40 hover:text-primary"
                  )}
                >
                  <Icon size={14} />
                  {cat}
                </button>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. MEDIA GRID */}
      <Section background="off-white">
        <Container>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className="h-[500px] bg-black/5 rounded-[3rem] animate-pulse" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    key={idx}
                  >
                    <Card variant="white" className="p-0 overflow-hidden group h-full flex flex-col border-none shadow-premium hover:shadow-2xl transition-all duration-500 rounded-[3rem]">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        />
                        <div className="absolute top-6 left-6">
                          <div className="glass px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-foreground shadow-2xl border-white/40">
                            {item.category}
                          </div>
                        </div>
                      </div>
                      <div className="p-10 flex-grow flex flex-col">
                        <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
                           {item.date}
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-foreground/50 text-sm font-medium leading-relaxed mb-10 line-clamp-3">
                          {item.description}
                        </p>
                        <div className="mt-auto pt-8 border-t border-black/5">
                           {item.link && (
                             <Link href={item.link} className="inline-flex items-center gap-2 text-foreground font-black text-xs uppercase tracking-widest hover:text-primary transition-colors group/link">
                               Read Full Story <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                             </Link>
                           )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[4rem] border border-black/5 shadow-2xl shadow-black/5">
              <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mx-auto mb-8 border border-black/5">
                <Newspaper className="text-foreground/10" size={40} />
              </div>
              <h3 className="text-3xl font-black text-foreground mb-4">No content found</h3>
              <p className="text-foreground/40 font-medium text-lg">There are no media items available in this category yet.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* 4. CTA SECTION */}
      <Section background="nature" className="text-center">
        <Container className="max-w-4xl space-y-10">
          <Sparkles className="w-16 h-16 text-primary mx-auto opacity-50" />
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
            {config?.cta_title || 'Media Inquiries'}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/60 font-medium">
            {config?.cta_description || 'For press kits, interviews, and media partnerships, please connect with our public relations department.'}
          </p>
          {(config?.cta_button_text || config?.cta_button_link) && (
            <Button variant="primary" size="xl" className="rounded-full shadow-2xl shadow-primary/20">
               {config?.cta_button_text || 'Contact Media Team'} <ArrowRight className="ml-2" />
            </Button>
          )}
        </Container>
      </Section>

    </div>
  );
}

