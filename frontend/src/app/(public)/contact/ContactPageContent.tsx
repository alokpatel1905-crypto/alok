'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Globe, Send, ArrowRight, 
  Leaf, ShieldCheck, Zap, Activity, ArrowUpRight, Share2, HelpCircle, Target,
  Trophy, GraduationCap, Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
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

import { getContactPage } from '@/lib/api';

export default function ContactPageContent() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    getContactPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(cmsData?.success_message || 'Communication Protocol Initiated. A regional expert will respond shortly.');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL NODES" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || 'Connect'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'with strategic'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Intelligence.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.subtitle || "Partner with the world's leading architects of sustainable education. Our global network is ready to support your institutional transition."}
          </p>
          {cmsData?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{cmsData.intro_description}</p>
          )}
        </div>
      </section>

      {/* Contact Matrix */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-8">
                <SectionLabel text="THE NETWORK" />
                <h2 className="text-6xl font-display font-black uppercase tracking-tighter leading-none">{cmsData?.global_title || 'Global Presence.'}</h2>
                <p className="text-xl font-medium italic opacity-40 leading-relaxed">
                  {cmsData?.global_description || 'Our nodes facilitate global coordination for green accreditation and strategic dialogues.'}
                </p>
              </div>

              <div className="space-y-12">
                <div className="p-12 border border-black/5 rounded-[4rem] group hover:border-[#21D469] transition-all duration-700">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-12 h-12 bg-[#F8FAFC] rounded-2xl flex items-center justify-center text-[#21D469] group-hover:bg-[#21D469] group-hover:text-[#0F172A] transition-all">
                      <MapPin size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Primary Headquarters</span>
                  </div>
                  <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-4">Office Address.</h3>
                  <p className="text-sm font-medium italic opacity-60 leading-relaxed mb-8 max-w-xs whitespace-pre-line">
                    {cmsData?.address || 'India & USA'}
                  </p>
                  <div className="space-y-4 pt-8 border-t border-black/5">
                     <p className="text-sm font-black uppercase tracking-widest flex items-center gap-4"><Phone size={14} className="text-[#21D469]" /> {cmsData?.phone}</p>
                     <p className="text-sm font-black uppercase tracking-widest flex items-center gap-4"><Mail size={14} className="text-[#21D469]" /> {cmsData?.email_general}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-black/5 hover:border-[#21D469] transition-all">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#21D469] mb-4">Partnerships</h4>
                      <p className="text-xs font-black uppercase tracking-widest opacity-40 line-clamp-1">{cmsData?.email_partnership}</p>
                   </div>
                   <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-black/5 hover:border-[#21D469] transition-all">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#21D469] mb-4">Media</h4>
                      <p className="text-xs font-black uppercase tracking-widest opacity-40 line-clamp-1">{cmsData?.email_media}</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
               <div className="bg-[#F8FAFC] p-12 lg:p-24 rounded-[4rem] border border-black/5">
                  <SectionLabel text="INQUIRY PROTOCOL" />
                  <h2 className="text-4xl font-display font-black uppercase tracking-tighter mb-12">{cmsData?.form_title || 'Send a Message.'}</h2>
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="grid md:grid-cols-2 gap-12">
                      {cmsData?.show_name !== false && (
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Full Name</label>
                          <input 
                            type="text" 
                            placeholder="Your Name"
                            className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                      )}
                      {cmsData?.show_email !== false && (
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Official Email</label>
                          <input 
                            type="email" 
                            placeholder="email@organization.com"
                            className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                      {cmsData?.show_organization !== false && (
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Organization</label>
                          <input 
                            type="text" 
                            placeholder="Institution Name"
                            className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                            value={formData.organization}
                            onChange={(e) => setFormData({...formData, organization: e.target.value})}
                          />
                        </div>
                      )}
                      {cmsData?.show_subject !== false && (
                        <div className="space-y-4">
                          <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Subject</label>
                          <input 
                            type="text" 
                            placeholder="Inquiry Topic"
                            className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          />
                        </div>
                      )}
                    </div>
                    {cmsData?.show_message !== false && (
                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Message</label>
                        <textarea 
                          placeholder="Describe your inquiry..."
                          rows={6}
                          className="w-full bg-white border border-black/5 rounded-[2.5rem] px-10 py-8 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm resize-none"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                      </div>
                    )}
                    <button type="submit" className="w-full bg-[#0F172A] text-white py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d group">
                       {cmsData?.button_text || 'Initiate Communication Protocol'} <Send size={16} className="inline ml-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                    {cmsData?.response_time && (
                       <p className="text-center text-[10px] font-black uppercase tracking-widest opacity-20">{cmsData.response_time}</p>
                    )}
                  </form>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      {cmsData?.who_title && (
        <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white">
           <div className="max-w-[1800px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-24 items-center">
                 <div className="space-y-12">
                    <SectionLabel text="TARGET AUDIENCE" />
                    <h2 className="text-6xl font-display font-black uppercase tracking-tighter leading-none">{cmsData.who_title}</h2>
                    <div className="text-xl font-medium italic opacity-60 leading-relaxed whitespace-pre-line">
                       {cmsData.who_description}
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { icon: ShieldCheck, label: 'Accreditation' },
                      { icon: Trophy, label: 'Rankings' },
                      { icon: GraduationCap, label: 'Programs' },
                      { icon: Star, label: 'Awards' }
                    ].map((item, i) => (
                      <div key={i} className="p-10 border border-white/5 bg-white/[0.02] rounded-[3rem] text-center group hover:bg-[#21D469] transition-all">
                         <item.icon size={48} className="mx-auto mb-6 text-[#21D469] group-hover:text-[#0F172A]" />
                         <span className="text-sm font-black uppercase tracking-widest group-hover:text-[#0F172A]">{item.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* FAQ / Knowledge Base */}
      {cmsData?.faq_q1 && (
        <section className="py-40 px-8 lg:px-16">
           <div className="max-w-[1800px] mx-auto">
              <SectionLabel text="KNOWLEDGE BASE" />
              <h2 className="text-6xl font-display font-black uppercase tracking-tighter leading-none mb-24">Common Queries.</h2>
              <div className="grid md:grid-cols-2 gap-12">
                 {[
                   { q: cmsData.faq_q1, a: cmsData.faq_a1 },
                   { q: cmsData.faq_q2, a: cmsData.faq_a2 }
                 ].filter(f => f.q).map((faq, i) => (
                   <div key={i} className="p-12 bg-[#F8FAFC] rounded-[3rem] border border-black/5">
                      <h4 className="text-2xl font-display font-black uppercase tracking-tighter mb-6">{faq.q}</h4>
                      <p className="text-lg font-medium italic opacity-60 leading-relaxed">{faq.a}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* Final CTA */}
      {cmsData?.cta_title && (
        <section className="py-40 px-8 lg:px-16 text-center">
           <div className="max-w-4xl mx-auto space-y-12">
              <SectionLabel text="ACTION GATEWAY" />
              <h2 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9]">
                 {cmsData.cta_title.split(' ')[0]} <br />
                 <span className="text-[#21D469]">{cmsData.cta_title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-2xl font-serif italic opacity-60 max-w-2xl mx-auto leading-relaxed">
                 {cmsData.cta_description}
              </p>
              <div className="flex justify-center pt-8">
                 <Link href={cmsData.cta_button_link || "/contact"}>
                    <button className="bg-[#0F172A] text-white px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d">
                       {cmsData.cta_button_text || 'Engage Protocol'}
                    </button>
                 </Link>
              </div>
           </div>
        </section>
      )}
    </div>
  );
}
