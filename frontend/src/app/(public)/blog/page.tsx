'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  BookOpen, 
  ChevronRight,
  Newspaper,
  Sparkles,
  Globe,
  Zap,
  Leaf
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

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
    <div className="overflow-x-hidden min-h-screen bg-[#FEF9F5] perspective-1000">
      
      {/* 1. HERO SECTION - Soil & Insight Theme */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-br from-earth/20 via-background to-flora/10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-earth/10 blur-[150px] rounded-full animate-blob" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-flora/10 blur-[120px] rounded-full animate-blob animation-delay-2000" />
        
        <Container className="relative z-10">
          <div className="max-w-5xl space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/50 backdrop-blur-md border border-white text-earth text-[10px] font-black uppercase tracking-[0.4em] shadow-premium"
            >
              <Newspaper size={16} /> Global Publications
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-foreground tracking-tighter leading-[0.8] drop-shadow-sm">
              Green <span className="text-earth">Insights</span>.
            </h1>
            
            <p className="text-2xl md:text-3xl text-foreground/70 max-w-3xl leading-tight font-medium border-l-8 border-earth pl-12 py-2">
              Deep-diving into the ecological neutralization of global education.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. FEATURED ARTICLE - Premium 3D Bento */}
      <Section className="relative z-10">
        <Container>
          {!loading && articles.length > 0 && (
            <Link href={`/blog/${articles[0].id}`} className="group block relative preserve-3d">
              <motion.div 
                whileHover={{ rotateY: -5, rotateX: 2, translateZ: 50 }}
                className="relative z-10"
              >
                <Card className="p-0 overflow-hidden border-none shadow-3d rounded-[4.5rem] bg-white">
                  <div className="grid lg:grid-cols-2 items-stretch">
                    <div className="relative h-[500px] lg:h-full min-h-[500px] overflow-hidden">
                      <img 
                        src={articles[0].image || "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                        alt="Featured" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-earth/40 to-transparent" />
                      <div className="absolute top-12 left-12">
                        <div className="glass px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.3em] text-foreground border-white/40 shadow-2xl">
                          The Spotlight
                        </div>
                      </div>
                    </div>
                    <div className="p-16 lg:p-24 flex flex-col justify-center space-y-10 bg-white">
                      <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] text-earth">
                         <span className="bg-earth/5 px-4 py-1 rounded-full">{articles[0].type}</span>
                         <span className="w-1.5 h-1.5 rounded-full bg-earth/20" />
                         <span className="opacity-40">{new Date(articles[0].createdAt).toLocaleDateString()}</span>
                      </div>
                      <h2 className="text-5xl md:text-7xl font-black text-foreground group-hover:text-earth transition-colors leading-[0.9] tracking-tighter">
                        {articles[0].title}
                      </h2>
                      <p className="text-foreground/50 text-xl font-medium leading-relaxed line-clamp-3 italic">
                        {articles[0].content?.substring(0, 250)}...
                      </p>
                      <div className="pt-12 border-t border-black/5 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-earth/10 flex items-center justify-center text-earth">
                               <User size={24} />
                            </div>
                            <div>
                               <div className="text-[10px] font-black text-earth/40 uppercase tracking-widest">Authored By</div>
                               <div className="text-lg font-black text-foreground uppercase tracking-widest">
                                  {articles[0].author || 'Editorial Team'}
                               </div>
                            </div>
                         </div>
                         <div className="w-20 h-20 rounded-[2rem] bg-foreground text-white flex items-center justify-center group-hover:bg-earth group-hover:rotate-12 transition-all duration-500 shadow-3d">
                            <ArrowRight size={32} />
                         </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
              <div className="absolute -inset-4 bg-earth/10 rounded-[5rem] blur-3xl opacity-30 -z-10" />
            </Link>
          )}
        </Container>
      </Section>

      {/* 3. ARTICLES GRID - Floating 3D Cards */}
      <Section background="off-white">
        <Container>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              {[1, 2, 3].map(i => (
                 <div key={i} className="h-[600px] bg-white/50 rounded-[4rem] animate-pulse shadow-premium" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              <AnimatePresence mode="popLayout">
                {articles.slice(1).map((article, idx) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={article.id}
                    className="floating-3d"
                  >
                    <PublicArticleCard article={article} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && articles.length === 0 && (
            <div className="text-center py-40 bg-white rounded-[5rem] shadow-3d border border-white">
              <NatureIcon name="Sustainability" className="mx-auto scale-[2.5] mb-16 text-earth/10" />
              <h3 className="text-5xl font-black text-foreground mb-6 tracking-tighter">New stories rooting.</h3>
              <p className="text-foreground/40 font-medium text-xl">Our journalists are deep in the field. Check back soon.</p>
            </div>
          )}
        </Container>
      </Section>

      {/* 4. NEWSLETTER - Organic Growth Theme */}
      <Section className="relative overflow-hidden bg-earth">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-flora/20 blur-[150px] rounded-full animate-blob" />
        <Container className="relative z-10 text-center space-y-16 py-20">
          <Sparkles className="w-32 h-32 text-flora mx-auto opacity-30 animate-pulse" />
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            Join the <br/> <span className="text-flora">Dialogue</span>.
          </h2>
          <div className="max-w-2xl mx-auto space-y-10">
            <p className="text-2xl text-white/70 font-medium">
              Join 50,000+ sustainability leaders receiving our weekly insights.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch gap-6 glass p-3 rounded-[2.5rem] border-white/20">
               <input 
                 type="email" 
                 placeholder="your@global-impact.com" 
                 className="flex-grow bg-white/10 px-10 py-6 rounded-[2rem] border-none text-white placeholder:text-white/40 outline-none font-bold text-xl"
               />
               <Button variant="primary" size="xl" className="px-14 rounded-[2rem] bg-flora hover:bg-white hover:text-flora text-xl font-black shadow-3d transition-all">
                  Subscribe
               </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function PublicArticleCard({ article }: { article: any }) {
  return (
    <Link href={`/blog/${article.id}`} className="group block h-full">
      <Card className="p-0 overflow-hidden group h-full flex flex-col border-none shadow-premium hover:shadow-3d transition-all duration-700 rounded-[3.5rem] bg-white">
        <div className="relative h-72 overflow-hidden">
          <img 
            src={article.image || "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=600"} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
            alt={article.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth/20 to-transparent" />
          <div className="absolute top-8 left-8">
            <div className="glass px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-foreground border-white/40 shadow-2xl">
              {article.type}
            </div>
          </div>
        </div>
        
        <div className="p-12 flex-grow flex flex-col space-y-6">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-earth/40">
             <span>{new Date(article.createdAt).toLocaleDateString()}</span>
             <span className="w-1.5 h-1.5 rounded-full bg-earth/10" />
             <span className="text-earth">{article.author || 'Team'}</span>
          </div>
          <h3 className="text-3xl font-black text-foreground group-hover:text-earth transition-colors leading-tight tracking-tighter">
            {article.title}
          </h3>
          <p className="text-foreground/50 text-base font-medium leading-relaxed line-clamp-3">
            {article.content || 'Green Mentors is leading the world into a new era of ecologically neutral education systems.'}
          </p>
          <div className="pt-8 mt-auto flex items-center gap-3 text-earth font-black text-[11px] uppercase tracking-[0.3em] group-hover:translate-x-2 transition-transform">
            Read Full Insight <ChevronRight size={18} />
          </div>
        </div>
      </Card>
    </Link>
  );
}