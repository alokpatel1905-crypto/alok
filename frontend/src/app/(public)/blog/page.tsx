'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  BookOpen, 
  ChevronRight,
  Newspaper,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { apiFetch } from '@/lib/api';

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/publications')
      .then(res => {
        setArticles(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen pt-32 pb-24 font-inter">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-20 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={14} />
            Insights & Media
          </motion.div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none">
            Greening the <span className="text-emerald-600 border-b-8 border-emerald-100">Global</span> Conversation.
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Latest education news, sustainability research, and career tips from our global network of climate co-creators.
          </p>
        </div>

        {/* Featured Post */}
        {!loading && articles.length > 0 && (
          <div className="mb-20">
            <Link href={`/blog/${articles[0].id}`} className="group grid lg:grid-cols-2 gap-12 bg-white rounded-[48px] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 items-center overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 group-hover:bg-emerald-100 transition-colors duration-700" />
               <div className="h-[400px] rounded-[32px] overflow-hidden shadow-xl border-4 border-slate-50">
                  <img src={articles[0].image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Featured" />
               </div>
               <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                     <span className="bg-emerald-50 px-3 py-1 rounded-lg">Featured</span>
                     <span className="text-slate-300">•</span>
                     <span>{articles[0].type}</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                    {articles[0].title}
                  </h2>
                  <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {articles[0].content?.substring(0, 200)}...
                  </p>
                  <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                     <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                        <Calendar size={14} className="text-emerald-500" />
                        {new Date(articles[0].createdAt).toLocaleDateString()}
                     </div>
                     <div className="flex items-center gap-2 text-slate-400 font-bold text-xs font-bold">
                        <User size={14} className="text-sky-500" />
                        {articles[0].author || 'Editorial Team'}
                     </div>
                  </div>
               </div>
            </Link>
          </div>
        )}

        {/* List Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Gathering Global Intelligence...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.slice(1).map((article) => (
              <PublicArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {articles.length === 0 && !loading && (
          <div className="text-center py-32 bg-white rounded-[48px] border border-slate-100">
            <Newspaper className="mx-auto text-slate-200 mb-6" size={60} />
            <h3 className="text-2xl font-black text-slate-900 mb-2">No articles published yet</h3>
            <p className="text-slate-500 font-medium">Our journalists are currently in the field. Stay tuned.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function PublicArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/blog/${article.id}`} className="group flex flex-col h-full">
      <div className="relative h-72 rounded-[40px] overflow-hidden mb-8 shadow-lg border border-slate-100">
        <img src={article.image || "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={article.title} />
        <div className="absolute bottom-6 left-6">
          <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 shadow-xl border border-white">
            {article.type}
          </div>
        </div>
      </div>
      
      <div className="space-y-4 flex-grow px-2">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
           <span>{new Date(article.createdAt).toLocaleDateString()}</span>
           <span className="w-1 h-1 rounded-full bg-slate-200" />
           <span>{article.author || 'Team'}</span>
        </div>
        <h3 className="text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
          {article.title}
        </h3>
        <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
          {article.content || 'Green Mentors is leading the world into a new era of ecologically neutral education systems.'}
        </p>
      </div>

      <div className="pt-8 mt-auto flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all px-2">
        Continue Reading <ChevronRight size={16} />
      </div>
    </Link>
  );
}