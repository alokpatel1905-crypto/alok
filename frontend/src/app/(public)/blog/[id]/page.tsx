'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share, 
  Bookmark, 
  Clock, 
  Tag,
  ChevronRight,
  Globe,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

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

export default function BlogDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiFetch(`/publications/${id}`)
        .then(res => {
          setArticle(res);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#21D469] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-display font-black uppercase mb-8">Publication Not Found</h1>
        <Link href="/blog">
          <button className="bg-[#0F172A] text-white px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em]">
            Back to Insights
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Article Hero */}
      <section className="relative pt-40 pb-24 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#21D469]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionLabel text={article.type || "RESEARCH PUBLICATION"} />
          <h1 className="text-[clamp(40px,6vw,100px)] leading-[0.9] font-display font-black uppercase mb-12 tracking-tighter max-w-5xl">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-black/5">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-[#0F172A] flex items-center justify-center text-[#21D469]">
                <User size={32} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Architect</div>
                <div className="text-xl font-display font-black uppercase tracking-tighter">
                   {article.author || 'Editorial Team'}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-12">
               <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Date</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[#0F172A]/60">
                     {new Date(article.createdAt).toLocaleDateString()}
                  </div>
               </div>
               <div className="space-y-1">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Protocol</div>
                  <div className="text-sm font-bold uppercase tracking-widest text-[#0F172A]/60">
                     {article.type || 'Global Insight'}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-8 lg:px-16 -mt-12 relative z-20">
         <div className="max-w-[1400px] mx-auto">
            <div className="aspect-[21/9] rounded-[4rem] overflow-hidden shadow-premium bg-[#0F172A]">
               <img 
                 src={article.image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600"} 
                 className="w-full h-full object-cover grayscale opacity-70" 
                 alt={article.title} 
               />
            </div>
         </div>
      </section>

      {/* Article Content */}
      <section className="py-32 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-24">
          
          {/* Main Body */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate max-w-none">
              <div className="text-2xl font-serif italic text-[#0F172A]/80 leading-relaxed space-y-12 whitespace-pre-wrap">
                 {article.content}
              </div>
            </div>

            {/* Tags & Interaction */}
            <div className="mt-24 pt-12 border-t border-black/5 flex flex-wrap items-center justify-between gap-12">
               <div className="flex flex-wrap gap-3">
                  {['sustainability', 'research', 'innovation'].map(tag => (
                     <span key={tag} className="px-6 py-3 bg-[#F8FAFC] text-[#0F172A]/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-black/5">
                        {tag}
                     </span>
                  ))}
               </div>
               <div className="flex items-center gap-8">
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]/40 hover:text-[#21D469] flex items-center gap-3 transition-colors">
                    <Share size={16} /> Protocol Share
                  </button>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]/40 hover:text-[#FACC15] flex items-center gap-3 transition-colors">
                    <Bookmark size={16} /> Archive
                  </button>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-16">
             <div className="bg-[#F8FAFC] p-12 rounded-[3rem] border border-black/5">
                <SectionLabel text="MISSION PARAMETERS" />
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-6 leading-none">Ecological <br /> Governance.</h3>
                <p className="text-sm font-medium italic opacity-60 leading-relaxed mb-10">
                   Green Mentors is leading the world into a new era of ecologically neutral education systems, ensuring institutional resilience and global impact.
                </p>
                <Link href="/about">
                   <button className="w-full bg-[#0F172A] text-white py-6 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#21D469] transition-all">
                      Learn More
                   </button>
                </Link>
             </div>

             <div className="bg-[#0F172A] p-12 rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#21D469]/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <SectionLabel text="GLOBAL IMPACT" />
                <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-6">Join the <br /> Movement.</h4>
                <p className="text-xs opacity-50 leading-relaxed mb-8">
                   Subscribe to our weekly strategic insights and institutional updates.
                </p>
                <div className="space-y-4">
                   <input 
                     type="email" 
                     placeholder="PROTOCOL@GLOBAL.COM" 
                     className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest outline-none focus:border-[#21D469]"
                   />
                   <button className="w-full bg-[#21D469] text-[#0F172A] py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
                      Activate
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="py-24 px-8 lg:px-16 border-t border-black/5 bg-[#F8FAFC]">
         <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <Link href="/blog" className="group flex items-center gap-6">
               <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#0F172A] group-hover:text-white transition-all">
                  <ArrowLeft size={24} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100">Back to Intelligence Matrix</span>
            </Link>
         </div>
      </section>
    </div>
  );
}
