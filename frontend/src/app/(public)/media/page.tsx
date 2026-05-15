'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper, PlayCircle, ExternalLink, ArrowRight, Globe, 
  Leaf, Zap, Download, FileText, Share2, ArrowUpRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const COLORS = {
  ink: '#0F172A',
  sage: '#21D469',
  gold: '#FACC15',
  parchment: '#FFFFFF',
};

const SectionLabel = ({ text, color = COLORS.sage }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="h-[1px] w-12 bg-black/10" />
    <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color }}>
      {text}
    </span>
  </div>
);

import { getMediaPageConfig, getMediaPosts, apiFetch } from '@/lib/api';

export default function MediaPage() {
  const [config, setConfig] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [publications, setPublications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
       try {
          const [cfg, pts, pubs] = await Promise.all([
             getMediaPageConfig(),
             getMediaPosts(),
             apiFetch('/publications')
          ]);
          if (cfg) setConfig(cfg);
          if (pts) setPosts(pts);
          if (pubs?.data) setPublications(pubs.data);
       } catch (e) {
          console.error(e);
       } finally {
          setLoading(false);
       }
    };
    loadAll();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const NEWS = posts.filter(p => p.isActive);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL ARCHIVES" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {config?.page_title?.split(' ')[0] || 'Media'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{config?.page_title?.split(' ').slice(1).join(' ') || 'and strategic Insights.'}</span>
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {config?.subtitle || "Stay connected with the latest breakthroughs, strategic dialogues, and publications from the global Green Mentors ecosystem."}
          </p>
          {config?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{config.intro_description}</p>
          )}
        </div>
      </section>

      {/* Featured News */}
      {NEWS.length > 0 && (
        <section className="py-40 px-8 lg:px-16">
          <div className="max-w-[1800px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {NEWS.map((item, i) => (
                <div key={i} className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-premium">
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80'} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/20 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#21D469] mb-4">
                      <span>{item.category}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-3xl font-display font-black uppercase tracking-tighter leading-tight mb-4 group-hover:text-[#21D469] transition-colors">{item.title}</h3>
                    <p className="text-sm font-medium italic opacity-60 group-hover:opacity-100 transition-all duration-700 h-0 group-hover:h-auto overflow-hidden leading-relaxed">
                      {item.description || item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Publications */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <SectionLabel text="STRATEGIC PUBLICATIONS" />
              <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                Global <br />
                <span className="font-serif italic lowercase font-normal text-[#21D469]">white paper</span> <br />
                Library.
              </h2>
              <p className="text-xl font-medium italic opacity-60 leading-relaxed max-w-xl">
                Access our library of white papers, research journals, and nature-inspired pedagogical frameworks.
              </p>
              
              <div className="space-y-4">
                {(publications.length > 0 ? publications : [
                  { title: 'Zero Carbon Roadmap for Schools 2026' },
                  { title: 'Nature-Mimicry in Educational Architecture' },
                  { title: 'Global Sustainability Ranking Report 2024' },
                  { title: 'Teacher Empowerment Handbook' }
                ]).map((pub, i) => (
                  <div key={i} className="flex items-center justify-between p-8 bg-white/[0.03] border border-white/5 rounded-3xl group hover:bg-[#21D469] hover:text-[#0F172A] transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                       <FileText size={24} className="text-[#21D469] group-hover:text-[#0F172A]" />
                       <span className="text-xl font-display font-black uppercase tracking-tighter">{pub.title}</span>
                    </div>
                    <Download size={20} className="opacity-20 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-square bg-white text-[#0F172A] rounded-[4rem] p-16 flex flex-col justify-center items-center text-center">
                 <Zap size={80} className="text-[#21D469] mb-12" />
                 <h3 className="text-4xl font-display font-black uppercase tracking-tighter mb-8 leading-tight">Access the <br /> Green Library</h3>
                 <button className="bg-[#0F172A] text-white px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-widest hover:bg-[#21D469] transition-all">
                    Request Credentials
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join the Dialogue */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-[#F8FAFC] rounded-[4rem] p-12 lg:p-24 border border-black/5 flex flex-col lg:flex-row justify-between items-center gap-12">
            <div className="space-y-6 max-w-xl">
               <h2 className="text-6xl font-display font-black uppercase tracking-tighter leading-none">Join the <br /> <span className="text-[#21D469]">Dialogue.</span></h2>
               <p className="text-xl font-medium italic opacity-40 leading-relaxed">Follow our daily pulse of sustainability on social networks and join the conversation with 50,000+ eco-educators.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
               {['Instagram', 'Linkedin', 'Twitter', 'Facebook'].map(social => (
                 <div key={social} className="px-10 py-6 bg-white rounded-full border border-black/5 shadow-premium hover:border-[#21D469] transition-all cursor-pointer flex items-center gap-4 group">
                    <Share2 size={18} className="text-[#21D469]" />
                    <span className="text-sm font-black uppercase tracking-widest">{social}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
