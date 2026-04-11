'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Building2, UserCircle, Globe, Newspaper, HelpCircle, ArrowRight, ShieldCheck, HeartHandshake, BookOpen, Send, Clock, Combine } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const INQUIRY_TYPES = [
  "General Inquiry",
  "Accreditation",
  "Rankings",
  "Events",
  "Awards",
  "Networks",
  "Support / Partnership",
  "Media",
  "Other"
];

const WHO_CAN_REACH_OUT = [
  { title: "Schools", desc: "Inquire about K-12 accreditation, ranking audits, and ecosystem integration.", icon: <Building2 className="w-6 h-6 text-emerald-600" /> },
  { title: "Universities", desc: "Explore global higher-ed partnerships and academic benchmarking.", icon: <BookOpen className="w-6 h-6 text-emerald-600" /> },
  { title: "Educators", desc: "Join fellowship networks and explore teacher recognition platforms.", icon: <UserCircle className="w-6 h-6 text-emerald-600" /> },
  { title: "Media & Press", desc: "Request organizational statements, executive interviews, or press kits.", icon: <Newspaper className="w-6 h-6 text-emerald-600" /> },
  { title: "Partners", desc: "Discuss institutional sponsorships and mission-aligned collaborations.", icon: <HeartHandshake className="w-6 h-6 text-emerald-600" /> },
  { title: "Students", desc: "Engage with youth panels and green graduate communities.", icon: <Combine className="w-6 h-6 text-emerald-600" /> }
];

const FAQS = [
  { q: "How long does it take to receive a response?", a: "To ensure thorough, professional replies, our governance team typically responds within 2-3 business days depending on inquiry volume." },
  { q: "Which email should I use for media inquiries?", a: "For time-sensitive press matters, interview requests, or asset needs, please reach out directly to media@greenmentors.org." },
  { q: "Can institutions request partnership discussions?", a: "Absolutely. We welcome multi-lateral dialogues with universities, NGOs, and corporate entities. Contact partnerships@greenmentors.org." },
  { q: "How do I ask about accreditation or rankings?", a: "Select the specific category in the contact form below. Our assessment coordinators will route your inquiry to the respective global audit team." }
];

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
      name: '', email: '', organization: '', type: 'General Inquiry', subject: '', message: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAF9F6] font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-32 px-8 overflow-hidden bg-slate-900 border-b-4 border-slate-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-emerald-950/40" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">Contact</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-emerald-900/50 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-sm">
            <Mail size={14} className="text-emerald-500" />
            Contact Green Mentors
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Let's Connect for <br className="hidden md:block"/> Sustainable Education
          </h1>
          
          <p className="text-xl font-medium text-slate-400 max-w-3xl leading-relaxed">
            We welcome formal inquiries from global institutions, dedicated educators, mission-aligned partners, dynamic media, and supporters vigorously working toward a climate-conscious future.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white relative">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-16 h-16 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-8 shadow-sm rotate-3 hover:rotate-0 transition-transform">
                <Globe className="w-8 h-8 text-slate-600" />
             </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.8]">
              Dialogue constitutes the bedrock of progress. Whether you are an elite university exploring benchmarking rankings, a policymaker seeking actionable frameworks, or a media outlet documenting climate transitions, our global coordination team is structurally positioned to support your exact objectives.
            </p>
          </div>
        </section>

        {/* 7. Trust / Relationship Strip */}
        <div className="bg-[#FAF9F6] border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-10 flex justify-center flex-wrap gap-x-12 gap-y-6">
            {["Institutional Collaboration", "Global Reach", "Partnership Opportunities", "Timely Communication", "Mission-Aligned Support"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-xs uppercase tracking-[0.15em]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Contact Form & Details (Core Section) */}
        <section className="py-32 px-8 bg-white relative" id="form-section">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 lg:gap-20">
            
            {/* LEFT: Contact Form */}
            <div className="lg:col-span-3">
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-8">Send an Inquiry</h2>
               
               <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Full Name <span className="text-red-500">*</span></label>
                          <input 
                            type="text" 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder-slate-400"
                            placeholder="Dr. Jane Doe"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder-slate-400"
                            placeholder="jane@institution.edu"
                          />
                      </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Organization / Institution</label>
                          <input 
                            type="text" 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder-slate-400"
                            placeholder="Global University"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700">Inquiry Type <span className="text-red-500">*</span></label>
                          <select 
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                          >
                             {INQUIRY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                          </select>
                      </div>
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Subject <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder-slate-400"
                        placeholder="Regarding University Benchmarking..."
                      />
                  </div>

                  <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Message <span className="text-red-500">*</span></label>
                      <textarea 
                        rows={6}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all font-medium text-slate-800 placeholder-slate-400 resize-none"
                        placeholder="Please provide specific details about your inquiry to help our coordinators route it efficiently..."
                      />
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6 justify-between">
                     <p className="text-xs text-slate-500 font-medium max-w-sm flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0" />
                        Your highly restricted information will be exclusively utilized to accurately respond to your institutional inquiry.
                     </p>
                     <button type="submit" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-xl hover:-translate-y-0.5">
                       Submit Inquiry <Send size={18} />
                     </button>
                  </div>
               </form>
            </div>

            {/* RIGHT: Contact Details */}
            <div className="lg:col-span-2 space-y-8">
                <div className="p-10 rounded-[2.5rem] bg-[#FAF9F6] border border-slate-200/60 shadow-xl shadow-slate-200/30">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Direct Channels</h3>
                   
                   <div className="space-y-8">
                       <div className="flex items-start gap-5">
                           <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                               <Mail className="w-5 h-5 text-emerald-600" />
                           </div>
                           <div>
                               <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">General & Partnership</h4>
                               <p className="text-slate-900 font-bold hover:text-emerald-600 cursor-pointer transition-colors">hello@greenmentors.org</p>
                               <p className="text-slate-900 font-bold hover:text-emerald-600 cursor-pointer transition-colors">partnerships@greenmentors.org</p>
                           </div>
                       </div>
                       
                       <div className="flex items-start gap-5">
                           <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                               <Newspaper className="w-5 h-5 text-sky-600" />
                           </div>
                           <div>
                               <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Media & Events</h4>
                               <p className="text-slate-900 font-bold hover:text-sky-600 cursor-pointer transition-colors">media@greenmentors.org</p>
                               <p className="text-slate-900 font-bold hover:text-sky-600 cursor-pointer transition-colors">events@greenmentors.org</p>
                           </div>
                       </div>

                       <div className="flex items-start gap-5">
                           <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                               <MapPin className="w-5 h-5 text-indigo-600" />
                           </div>
                           <div>
                               <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Operations Base</h4>
                               <p className="text-slate-700 font-medium leading-relaxed">
                                  Global network functioning with deep systemic roots in India, managing profound international engagement across multiple regions.
                               </p>
                           </div>
                       </div>
                   </div>

                   <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-4">
                       <Clock className="w-10 h-10 text-slate-300" />
                       <p className="text-sm font-bold text-slate-600">
                          We aim to deploy specialized coordinators to address logic inquiries within 2-3 business days.
                       </p>
                   </div>
                </div>
            </div>

          </div>
        </section>

        {/* 4. Contact Categories / Who We Work With */}
        <section className="py-32 px-8 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Combine size={16} /> Ecosystem Integration
               </div>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Who Can Reach Out?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {WHO_CAN_REACH_OUT.map((item, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-[2rem] p-8 hover:bg-slate-800/80 transition-all border-b-4 hover:border-b-emerald-500 group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          {item.icon}
                      </div>
                      <h4 className="text-xl font-bold text-slate-100 mb-3">{item.title}</h4>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* 5. Global Presence / Location */}
        <section className="py-32 px-8 bg-white border-b border-emerald-100 relative overflow-hidden">
           {/* Fake subtle map lines */}
           <div className="absolute inset-0 opacity-5 pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
           
           <div className="max-w-4xl mx-auto text-center relative z-10">
              <Globe className="w-20 h-20 text-emerald-100 mx-auto mb-8" />
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">A Global Mission with International Reach</h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-12">
                 Green Mentors works systematically across countries and complex territories through superior education platforms, cross-border partnerships, and verifiable sustainability initiatives. We proudly engage institutions across North America, Europe, Asia, and emerging global spheres.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                  {["North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "South America"].map(region => (
                      <span key={region} className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 font-bold text-sm tracking-wide shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-default">
                          {region}
                      </span>
                  ))}
              </div>
           </div>
        </section>

        {/* 6. FAQ Section */}
        <section className="py-32 px-8 bg-[#FAF9F6]">
           <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-600 mb-6">
                      <HelpCircle size={24} />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Before You Reach Out</h2>
              </div>

              <div className="space-y-6">
                  {FAQS.map((faq, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-lg transition-shadow">
                          <h4 className="text-lg font-bold text-slate-900 mb-3 pr-8">{faq.q}</h4>
                          <p className="text-slate-600 font-medium leading-relaxed">{faq.a}</p>
                      </div>
                  ))}
              </div>
           </div>
        </section>

        {/* 8. Call to Action */}
        <section className="py-32 px-8 bg-emerald-950 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-800/40 via-emerald-950 to-slate-950" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
              Start the Conversation
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We proactively invite institutions, educators, and journalists to connect with Green Mentors and thoroughly explore meaningful global collaboration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="#form-section" className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                Send an Inquiry <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/accreditation" className="w-full sm:w-auto bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 shadow-xl text-center">
                Explore Programs
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}