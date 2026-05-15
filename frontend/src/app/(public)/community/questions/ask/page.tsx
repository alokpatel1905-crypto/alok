'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Bold, Italic, Link as LinkIcon, Code, List, Image as ImageIcon, HelpCircle, Zap, ShieldCheck } from 'lucide-react';
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

export default function AskQuestionPage() {
  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-8 lg:px-16 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="INTELLECTUAL INITIATIVE" />
          <Link href="/community/questions" className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.4em] text-[#0F172A]/40 hover:text-[#21D469] transition-all mb-12">
            <ArrowLeft className="w-4 h-4 mr-4 group-hover:-translate-x-2 transition-transform" /> Return to Intelligence Base
          </Link>
          <h1 className="text-[clamp(40px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-12 tracking-tighter">
            Initiate <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">Query.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Form Section */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[4rem] border border-black/5 shadow-premium overflow-hidden">
                <div className="p-12 lg:p-20 space-y-16">
                  
                  {/* Title Section */}
                  <div className="space-y-6">
                    <label htmlFor="title" className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469] block">
                      Query Title
                    </label>
                    <p className="text-sm font-medium italic opacity-40">
                      Be specific and institutional in your articulation. Define the primary sustainability challenge.
                    </p>
                    <input 
                      type="text" 
                      id="title"
                      placeholder="e.g. Implementation of closed-loop hydration in K-12 institutional settings..."
                      className="w-full text-3xl font-display font-black uppercase tracking-tighter px-0 py-6 bg-transparent border-b-2 border-black/5 focus:outline-none focus:border-[#21D469] transition-all placeholder:text-[#0F172A]/10"
                    />
                  </div>

                  {/* Body Section */}
                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469] block">
                      Intellectual Details
                    </label>
                    <p className="text-sm font-medium italic opacity-40">
                      Expand on the institutional context and historical data associated with this query.
                    </p>
                    
                    {/* Markdown Editor Mock */}
                    <div className="bg-[#F8FAFC] border border-black/5 rounded-[3rem] overflow-hidden focus-within:ring-4 focus-within:ring-[#21D469]/5 transition-all">
                      {/* Toolbar */}
                      <div className="flex flex-wrap items-center gap-4 p-8 border-b border-black/5">
                        {[Bold, Italic, LinkIcon, Code, ImageIcon, List].map((Icon, idx) => (
                          <button key={idx} className="p-3 text-[#0F172A]/20 hover:text-[#21D469] transition-colors"><Icon size={20} /></button>
                        ))}
                      </div>
                      <textarea 
                        rows={12}
                        className="w-full p-12 focus:outline-none text-[#0F172A] font-medium italic text-xl bg-transparent placeholder:opacity-20 min-h-[300px]"
                        placeholder="Document the methodology and observed metrics..."
                      />
                    </div>
                  </div>

                  {/* Tags Section */}
                  <div className="space-y-6">
                    <label htmlFor="tags" className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469] block">
                      Knowledge Mapping
                    </label>
                    <p className="text-sm font-medium italic opacity-40">
                      Tag with institutional focus areas (e.g. curriculum, architecture, waste).
                    </p>
                    <div className="relative border border-black/5 rounded-[2.5rem] p-8 bg-[#F8FAFC] focus-within:ring-4 focus-within:ring-[#21D469]/5 transition-all flex flex-wrap gap-4 items-center">
                      {['sustainability', 'research'].map(tag => (
                        <span key={tag} className="px-6 py-3 bg-white text-[#0F172A]/60 text-[10px] font-black uppercase tracking-widest rounded-xl border border-black/5 flex items-center gap-3">
                          {tag} <button className="hover:text-red-500 opacity-20 hover:opacity-100 transition-opacity">&times;</button>
                        </span>
                      ))}
                      <input 
                        type="text" 
                        id="tags"
                        placeholder="ADD TAG..."
                        className="flex-grow focus:outline-none bg-transparent font-black text-[10px] uppercase tracking-widest"
                      />
                    </div>
                  </div>

                </div>
                
                {/* Footer Action */}
                <div className="bg-[#0F172A] p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
                  <button className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-[#21D469] transition-colors">
                    Discard Draft Protocol
                  </button>
                  <div className="flex items-center gap-12">
                    <button className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">
                      <HelpCircle size={18} /> Protocol Help
                    </button>
                    <button className="bg-white text-[#0F172A] px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                      Submit Protocol <Zap className="inline ml-4" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-4 space-y-12">
              <div className="bg-[#F8FAFC] p-12 rounded-[4rem] border border-black/5 shadow-premium">
                <SectionLabel text="INTELLECTUAL GUIDELINES" />
                <h3 className="text-4xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.9]">Audit your <br /> <span className="text-[#21D469]">Inquiry.</span></h3>
                <ul className="space-y-6">
                  {[
                    'Verify the uniqueness of your query within the knowledge base.',
                    'Ensure all terminology aligns with global sustainability standards.',
                    'Include specific institutional metrics for empirical context.',
                    'Clearly state the desired outcome of the inquiry.'
                  ].map((tip, idx) => (
                    <li key={idx} className="flex gap-4">
                      <ShieldCheck className="text-[#21D469] shrink-0" size={20} />
                      <p className="text-sm font-medium italic opacity-60 leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
