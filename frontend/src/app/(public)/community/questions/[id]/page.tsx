'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronUp, ChevronDown, CheckCircle2, MessageSquare, ArrowLeft, MoreHorizontal, Share, Flag, Bookmark, User, ShieldCheck, Zap } from 'lucide-react';
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

export default function QuestionDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Navigation Header */}
      <section className="pt-32 pb-12 px-8 lg:px-16 bg-[#F8FAFC] border-b border-black/5">
        <div className="max-w-[1800px] mx-auto">
          <Link href="/community/questions" className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-[#0F172A]/40 hover:text-[#21D469] transition-all">
            <ArrowLeft className="w-4 h-4 mr-4 group-hover:-translate-x-2 transition-transform" /> Back to Intelligence Dashboard
          </Link>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Question Header */}
          <div className="mb-20 space-y-12">
            <SectionLabel text="QUERY PROTOCOL" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter text-[#0F172A] leading-[0.9] uppercase">
              How do I implement <span className="text-[#21D469]">Framer Motion</span> layout animations with Next.js App Router?
            </h1>
            
            <div className="flex flex-wrap items-center gap-12 pt-8 border-t border-black/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0F172A]/5 flex items-center justify-center text-[#21D469]">
                  <User size={32} />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Researcher</div>
                  <div className="text-xl font-display font-black uppercase tracking-tighter">alokpatel</div>
                </div>
              </div>
              <div className="h-12 w-px bg-black/5 hidden md:block" />
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Initiated</div>
                <div className="text-sm font-bold uppercase tracking-widest text-[#0F172A]/60">2 Hours Ago</div>
              </div>
              <div className="h-12 w-px bg-black/5 hidden md:block" />
              <div className="space-y-1">
                <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Engagement</div>
                <div className="text-sm font-bold uppercase tracking-widest text-[#0F172A]/60">104 Visualizations</div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16">
            {/* Voting Sidebar */}
            <div className="lg:col-span-1 flex flex-col items-center gap-4 py-8 bg-[#F8FAFC] rounded-full h-fit border border-black/5">
              <button className="p-4 text-[#0F172A]/20 hover:text-[#21D469] transition-colors">
                <ChevronUp size={32} />
              </button>
              <span className="text-3xl font-display font-black text-[#0F172A]">42</span>
              <button className="p-4 text-[#0F172A]/20 hover:text-[#21D469] transition-colors">
                <ChevronDown size={32} />
              </button>
              <div className="mt-8">
                <Bookmark size={24} className="text-[#0F172A]/10 hover:text-[#FACC15] cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-11 space-y-16">
              <div className="prose prose-slate max-w-none">
                <div className="text-2xl font-serif italic text-[#0F172A]/80 leading-relaxed space-y-8">
                  <p>
                    I am migrating an old React app to the Next.js App Router (Next 14). I have a list of cards that I want to animate when an item is removed using Framer Motion's <code>&lt;AnimatePresence&gt;</code>. 
                  </p>
                  <p>
                    The standard entrance/exit animations work perfectly, but the <code>layout</code> animations seem to break entirely when a route transition occurs.
                  </p>
                </div>
                
                <div className="my-12 bg-[#0F172A] rounded-[3rem] p-10 shadow-premium overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8">
                     <Zap size={24} className="text-[#21D469] opacity-20" />
                  </div>
                  <pre className="text-white/80 font-mono text-sm leading-relaxed overflow-x-auto selection:bg-[#21D469]/30">
                    <code>
{`import { motion, AnimatePresence } from 'framer-motion';

export default function CardList({ items }) {
  return (
    <ul className="grid gap-4">
      <AnimatePresence mode="popLayout">
        {items.map(item => (
          <motion.li
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card data={item} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}`}
                    </code>
                  </pre>
                </div>
                
                <p className="text-2xl font-serif italic text-[#0F172A]/80 leading-relaxed">
                  Is there a known issue with the App Router's frozen layout states and Framer Motion's layout engine? What is the recommended workaround?
                </p>
              </div>

              {/* Tags & Meta Actions */}
              <div className="flex flex-wrap items-center justify-between gap-12 pt-12 border-t border-black/5">
                <div className="flex flex-wrap gap-3">
                  {['react', 'next.js', 'framer-motion'].map(tag => (
                    <span key={tag} className="px-6 py-3 bg-[#F8FAFC] text-[#0F172A]/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-black/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-8">
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]/40 hover:text-[#21D469] flex items-center gap-3 transition-colors">
                    <Share size={16} /> Protocol Share
                  </button>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#0F172A]/40 hover:text-red-500 flex items-center gap-3 transition-colors">
                    <Flag size={16} /> Report
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-[#F8FAFC] rounded-[3rem] p-12 border border-black/5 space-y-8">
                <div className="flex items-center gap-4">
                  <MessageSquare size={20} className="text-[#21D469]" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Intelligence Thread</span>
                </div>
                <div className="space-y-6">
                  <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm text-sm font-medium italic opacity-60 leading-relaxed">
                    This might be related to the new Template.tsx file pattern. Have you tried wrapping the layout in a Template component? &ndash; <span className="text-[#21D469] font-black uppercase tracking-tighter not-italic">sam_dev</span>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#21D469] hover:opacity-70 ml-8 transition-opacity">
                    + Contribute Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Answers Matrix */}
          <div className="mt-40 space-y-20">
            <div className="flex items-center justify-between border-b border-black/5 pb-12">
               <h2 className="text-6xl font-display font-black uppercase tracking-tighter">Verified <br /> <span className="text-[#21D469]">Protocols.</span></h2>
               <div className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">3 Active Solutions</div>
            </div>

            <div className="space-y-16">
              {/* Accepted Answer */}
              <div className="bg-[#21D469]/5 rounded-[4rem] p-12 lg:p-20 border border-[#21D469]/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <ShieldCheck size={80} className="text-[#21D469] opacity-10" />
                </div>
                <div className="grid lg:grid-cols-12 gap-16 relative z-10">
                  <div className="lg:col-span-1 flex flex-col items-center gap-6">
                    <button className="p-4 text-[#21D469] hover:bg-[#21D469]/10 rounded-full transition-colors">
                      <ChevronUp size={32} />
                    </button>
                    <span className="text-4xl font-display font-black text-[#21D469]">156</span>
                    <button className="p-4 text-[#0F172A]/20 hover:text-[#21D469] transition-colors">
                      <ChevronDown size={32} />
                    </button>
                    <div className="mt-8 flex flex-col items-center gap-2">
                       <CheckCircle2 size={40} className="text-[#21D469]" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-[#21D469]">Accepted</span>
                    </div>
                  </div>
                  <div className="lg:col-span-11 space-y-12">
                    <div className="prose prose-slate max-w-none">
                      <div className="text-2xl font-serif italic text-[#0F172A]/80 leading-relaxed space-y-8">
                        <p>
                          Yes, this is a known issue. The Next.js App Router keeps the DOM nodes alive across navigations for layouts, which confuses Framer Motion's layout projection tree.
                        </p>
                        <p>
                          To fix this, you need to use the <code>usePathname</code> hook to force the <code>AnimatePresence</code> to re-evaluate its children when the route changes.
                        </p>
                      </div>
                      <div className="my-12 bg-[#0F172A] rounded-[3rem] p-10 shadow-premium overflow-hidden">
                        <pre className="text-white/80 font-mono text-sm leading-relaxed overflow-x-auto">
                          <code>
{`import { usePathname } from 'next/navigation';

export default function AnimatedLayout({ children }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}`}
                          </code>
                        </pre>
                      </div>
                    </div>
                    
                    {/* Author Meta */}
                    <div className="pt-12 border-t border-[#21D469]/20 flex justify-end">
                       <div className="flex items-center gap-6 bg-white p-6 rounded-[2.5rem] border border-[#21D469]/20 shadow-sm">
                          <div className="w-12 h-12 rounded-2xl bg-[#21D469]/10 flex items-center justify-center text-[#21D469]">
                             <User size={24} />
                          </div>
                          <div>
                             <div className="text-[10px] font-black uppercase tracking-widest opacity-30">Protocol Expert</div>
                             <div className="text-lg font-display font-black uppercase tracking-tighter text-[#0F172A]">leemartin</div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your Answer Form */}
              <div className="pt-24 space-y-12">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center text-white">
                       <Zap size={24} />
                    </div>
                    <h3 className="text-4xl font-display font-black uppercase tracking-tighter">Your <span className="text-[#21D469]">Contribution.</span></h3>
                 </div>
                 <div className="bg-[#F8FAFC] rounded-[4rem] p-12 border border-black/5 space-y-10">
                    <div className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden focus-within:ring-4 focus-within:ring-[#21D469]/5 focus-within:border-[#21D469]/30 transition-all">
                       <div className="flex items-center gap-4 p-6 bg-[#F8FAFC] border-b border-black/5">
                          {[1, 2, 3, 4, 5].map(i => (
                             <div key={i} className="w-8 h-8 bg-[#0F172A]/5 rounded-lg" />
                          ))}
                       </div>
                       <textarea 
                          rows={10}
                          className="w-full p-10 focus:outline-none text-[#0F172A] font-medium italic text-xl bg-transparent placeholder:opacity-20"
                          placeholder="Document your proposed solution..."
                       />
                    </div>
                    <button className="bg-[#0F172A] text-white px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                       Post Protocol
                    </button>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
