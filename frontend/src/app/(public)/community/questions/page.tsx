'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Check, Search, Filter, ArrowUpCircle, MessageSquare, Users, Globe, Zap, ArrowRight, ChevronRight, ArrowUpRight } from 'lucide-react';
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

// Mock Data
const MOCK_QUESTIONS = [
  {
    id: 1,
    title: 'How do I implement Framer Motion layout animations with Next.js App Router?',
    summary: 'I am trying to animate a list of cards when an item is removed. The standard AnimatePresence works, but layout animations seem to break during route transitions.',
    votes: 42,
    answers: 3,
    views: 104,
    tags: ['react', 'next.js', 'framer-motion'],
    author: 'alokpatel',
    time: '2 hours ago',
    isAnswered: true
  },
  {
    id: 2,
    title: 'Tailwind CSS container queries not working in nested flexboxes',
    summary: 'When using @container on a parent div, the @md:grid-cols-2 class on the child doesn\'t seem to apply if the parent itself is a flex item.',
    votes: 15,
    answers: 0,
    views: 89,
    tags: ['css', 'tailwind'],
    author: 'sarah_dev',
    time: '5 hours ago',
    isAnswered: false
  },
  {
    id: 3,
    title: 'Best approach for handling Stripe Webhooks in NestJS?',
    summary: 'Looking for architectural advice. Should the webhook endpoint go directly into the BillingService, or should it emit an event to a dedicated WebhookHandler module?',
    votes: 89,
    answers: 5,
    views: 412,
    tags: ['nestjs', 'stripe', 'architecture'],
    author: 'tech_lead',
    time: '1 day ago',
    isAnswered: true
  }
];

export default function QuestionsDashboard() {
  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="INTELLECTUAL EXCHANGE" />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <h1 className="text-[clamp(40px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
                Community <br />
                <span className="font-serif italic lowercase font-normal text-[#21D469]">Discussions.</span>
              </h1>
              <p className="text-2xl font-serif italic text-[#0F172A]/60 leading-relaxed max-w-2xl border-l-4 border-[#21D469] pl-12">
                Co-creating solutions for the ecological transition of education through collaborative inquiry.
              </p>
            </div>
            <Link href="/community/questions/ask">
              <button className="bg-[#0F172A] text-white px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                Ask Question <Zap className="inline ml-4" size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-12">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center bg-[#F8FAFC] p-8 rounded-[3rem] border border-black/5 shadow-premium">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#0F172A]/20 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Search queries..." 
                    className="w-full pl-16 pr-8 py-5 bg-white border border-black/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#21D469]/5 focus:border-[#21D469]/30 transition-all placeholder:text-[#0F172A]/20 uppercase tracking-widest"
                  />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                   {['Newest', 'Active', 'Unanswered'].map((label, idx) => (
                     <button key={label} className={cn(
                       "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                       idx === 0 ? "bg-[#0F172A] text-white shadow-xl" : "text-[#0F172A]/40 hover:text-[#21D469]"
                     )}>
                       {label}
                     </button>
                   ))}
                   <button className="p-4 text-[#0F172A]/20 hover:text-[#21D469] transition-colors ml-auto">
                      <Filter className="w-5 h-5" />
                   </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-8">
                {MOCK_QUESTIONS.map((q) => (
                  <Link key={q.id} href={`/community/questions/${q.id}`} className="block group">
                    <div className="bg-white rounded-[3rem] border border-black/5 p-12 hover:border-[#21D469]/30 transition-all duration-700 shadow-premium relative overflow-hidden">
                      <div className="flex flex-col md:flex-row gap-12 relative z-10">
                        
                        {/* Stats Block */}
                        <div className="flex md:flex-col items-center md:items-start gap-8 md:gap-4 shrink-0 md:w-32 border-r border-black/5 pr-12 md:pr-0 md:border-r-0 md:border-b md:pb-8">
                          <div className="flex flex-col">
                            <span className="text-3xl font-display font-black text-[#0F172A]">{q.votes}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Votes</span>
                          </div>
                          <div className={cn(
                            "flex flex-col",
                            q.isAnswered ? "text-[#21D469]" : "opacity-30"
                          )}>
                            <span className="text-3xl font-display font-black">{q.answers}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest">Answers</span>
                          </div>
                        </div>
                        
                        {/* Content Block */}
                        <div className="flex-grow space-y-6">
                          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-30">
                            <Users size={14} />
                            <span>{q.author}</span>
                            <span className="w-1 h-1 rounded-full bg-current opacity-20" />
                            <span>{q.time}</span>
                          </div>
                          
                          <h3 className="text-3xl lg:text-4xl font-display font-black text-[#0F172A] tracking-tighter leading-[0.9] group-hover:text-[#21D469] transition-colors">
                            {q.title}
                          </h3>
                          
                          <p className="text-lg font-medium italic opacity-40 line-clamp-2 leading-relaxed">
                            {q.summary}
                          </p>
                          
                          <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-black/5">
                            <div className="flex flex-wrap gap-2">
                              {q.tags.map(tag => (
                                <span key={tag} className="px-5 py-2 bg-[#F8FAFC] text-[#0F172A]/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-black/5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#21D469] opacity-0 group-hover:opacity-100 transition-all">
                              Review Protocol <ChevronRight size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center pt-12">
                 <div className="flex gap-4">
                    <button className="w-16 h-16 rounded-2xl border border-black/5 flex items-center justify-center opacity-20 cursor-not-allowed">
                       <ArrowRight size={24} className="rotate-180" />
                    </button>
                    <button className="w-16 h-16 rounded-2xl bg-[#0F172A] text-white font-display font-black flex items-center justify-center">1</button>
                    <button className="w-16 h-16 rounded-2xl border border-black/5 font-display font-black text-[#0F172A]/40 flex items-center justify-center hover:text-[#21D469] hover:border-[#21D469]/30 transition-all">2</button>
                    <button className="w-16 h-16 rounded-2xl border border-black/5 flex items-center justify-center text-[#0F172A]/40 hover:text-[#21D469] hover:border-[#21D469]/30 transition-all">
                       <ArrowRight size={24} />
                    </button>
                 </div>
              </div>
              
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-12">
               <div className="bg-[#F8FAFC] p-10 rounded-[3rem] border border-black/5 shadow-premium">
                  <SectionLabel text="POPULAR TAGS" />
                  <div className="flex flex-wrap gap-3">
                    {['sustainability', 'green-campus', 'prakriti', 'curriculum', 'architecture', 'waste-mgmt', 'energy'].map(tag => (
                       <Link key={tag} href="#" className="px-5 py-3 bg-white hover:bg-[#21D469] hover:text-white text-[#0F172A]/40 text-[10px] font-black uppercase tracking-widest rounded-xl border border-black/5 transition-all">
                          {tag}
                       </Link>
                    ))}
                  </div>
               </div>

               <div className="bg-[#0F172A] p-10 rounded-[3rem] text-white shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#21D469]/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <SectionLabel text="PROTOCOL RULES" />
                  <h3 className="text-3xl font-display font-black uppercase mb-6 tracking-tighter">Dialogue <br /> Guidelines.</h3>
                  <p className="text-sm font-medium italic opacity-60 leading-relaxed mb-8">
                    Our community is built on mutual respect and shared expertise. Ensure your inquiries are descriptive and include institutional context where applicable.
                  </p>
                  <Link href="#" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469] hover:text-white transition-colors">
                    Read Ethics <ArrowUpRight size={16} />
                  </Link>
               </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
