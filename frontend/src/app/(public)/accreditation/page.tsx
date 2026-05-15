'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, CheckCircle2, ArrowRight, Zap, Globe, 
  Search, FileText, ClipboardCheck, GraduationCap, Leaf, Award, 
  ArrowUpRight, Users, Trophy, Target, Landmark, School
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

import { getAccreditationPage } from '@/lib/api';

export default function AccreditationPage() {
  const [cmsData, setCmsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    country: '',
    email: ''
  });

  useEffect(() => {
    getAccreditationPage().then(data => {
      if (data) setCmsData(data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-[#21D469]/20 border-t-[#21D469] rounded-full animate-spin" />
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Accreditation Inquiry Protocol Initiated. Our audit team will contact you shortly.');
  };

  const programs = [
    { prefix: 'school', title: cmsData?.school_title, subtitle: cmsData?.school_subtitle, desc: cmsData?.school_description, image: cmsData?.school_image, icon: School },
    { prefix: 'university', title: cmsData?.university_title, subtitle: cmsData?.university_subtitle, desc: cmsData?.university_description, image: cmsData?.university_image, icon: Trophy },
    { prefix: 'teacher', title: cmsData?.teacher_title, subtitle: cmsData?.teacher_subtitle, desc: cmsData?.teacher_description, image: cmsData?.teacher_image, icon: Users },
    { prefix: 'graduate', title: cmsData?.graduate_title, subtitle: cmsData?.graduate_subtitle, desc: cmsData?.graduate_description, image: cmsData?.graduate_image, icon: GraduationCap },
    { prefix: 'fellowship', title: cmsData?.fellowship_title, subtitle: cmsData?.fellowship_subtitle, desc: cmsData?.fellowship_description, image: cmsData?.fellowship_image, icon: Target },
  ].filter(p => p.title);

  return (
    <div className="bg-white text-[#0F172A] selection:bg-[#FACC15] selection:text-[#0F172A]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-8 lg:px-16 overflow-hidden bg-[#F8FAFC]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#21D469]/5 blur-[120px] rounded-full" />
        <div className="max-w-[1800px] mx-auto">
          <SectionLabel text="GLOBAL VERIFICATION" />
          <h1 className="text-[clamp(50px,8vw,120px)] leading-[0.85] font-display font-black uppercase mb-16">
            {cmsData?.page_title?.split(' ')[0] || 'Institutional'} <br />
            <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.page_title?.split(' ').slice(1, -1).join(' ') || 'Gold standard'}</span> <br />
            {cmsData?.page_title?.split(' ').slice(-1)[0] || 'Accreditation.'}
          </h1>
          <p className="text-2xl md:text-3xl font-serif italic leading-relaxed text-[#0F172A]/80 max-w-2xl">
            {cmsData?.subtitle || "The world's most rigorous verification for sustainable educational excellence. Transition your institution to a UN-recognized green campus."}
          </p>
          {cmsData?.intro_description && (
             <p className="text-lg font-medium opacity-40 mt-12 max-w-2xl leading-relaxed">{cmsData.intro_description}</p>
          )}
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-40 px-8 lg:px-16">
         <div className="max-w-[1800px] mx-auto">
            <div className="space-y-40">
               {programs.map((p, i) => (
                 <div key={i} className="grid lg:grid-cols-12 gap-24 items-center">
                    <div className={cn("lg:col-span-7 relative", i % 2 === 1 ? "lg:order-2" : "")}>
                       <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-premium relative bg-[#0F172A]">
                          <img 
                            src={p.image || "https://images.unsplash.com/photo-1449156656402-5bf0641b0008?auto=format&fit=crop&q=80"} 
                            className="w-full h-full object-cover opacity-70" 
                          />
                          <div className="absolute inset-0 bg-[#0F172A]/20" />
                       </div>
                       <div className={cn("absolute -bottom-12 -right-12 bg-white border border-black/5 p-12 rounded-[3rem] text-[#0F172A] shadow-premium hidden lg:block", i % 2 === 1 ? "-left-12 right-auto" : "")}>
                          <p.icon size={48} className="text-[#21D469] mb-4" />
                          <div className="text-xs font-black uppercase tracking-widest">Institution Protocol</div>
                       </div>
                    </div>
                    <div className={cn("lg:col-span-5 space-y-12", i % 2 === 1 ? "lg:order-1" : "")}>
                       <div className="space-y-6">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#21D469]">{p.subtitle || "Institutional Excellence"}</span>
                          <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">{p.title}</h2>
                       </div>
                       <p className="text-xl font-medium italic opacity-60 leading-relaxed">
                          {p.desc}
                       </p>
                       <div className="pt-8">
                          <button className="bg-[#0F172A] text-white px-12 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                             Learn Protocol <ArrowUpRight size={16} className="inline ml-4" />
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Journey Section */}
      <section className="py-40 px-8 lg:px-16 bg-[#0F172A] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-20 text-[300px] font-black text-white/[0.02] leading-none select-none pointer-events-none font-display">
          JOURNEY
        </div>
        
        <div className="max-w-[1800px] mx-auto relative z-10">
          <SectionLabel text="VERIFICATION STEPS" />
          <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase mb-24">
            The <br />
            <span className="text-[#21D469]">Audit Pipeline.</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Registration', desc: 'Initial registration and organizational commitment to the green transition.', icon: ClipboardCheck },
              { step: '02', title: 'Self Audit', desc: 'Comprehensive internal assessment using our Five Elements framework.', icon: Search },
              { step: '03', title: 'Expert Review', desc: 'Strategic audit by our global team of sustainability architects.', icon: ShieldCheck },
              { step: '04', title: 'Certification', desc: 'Final accreditation and entry into the Global Ranking system.', icon: Award },
            ].map((item, i) => (
              <div 
                key={i} 
                className="group relative p-12 border border-white/5 bg-white/[0.02] rounded-[3rem]"
              >
                <div className="flex items-center justify-between mb-8">
                  <item.icon size={48} className="text-[#21D469] group-hover:text-[#0F172A] transition-colors" />
                  <span className="text-4xl font-display font-black italic opacity-10 group-hover:opacity-20 transition-all">{item.step}</span>
                </div>
                <h3 className="text-2xl font-display font-black uppercase mb-4 tracking-tighter">{item.title}</h3>
                <p className="text-sm font-medium italic opacity-60 group-hover:opacity-100 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-40 px-8 lg:px-16">
        <div className="max-w-[1800px] mx-auto">
          <div className="bg-[#F8FAFC] rounded-[4rem] p-12 lg:p-24 border border-black/5">
            <div className="grid lg:grid-cols-2 gap-24 items-start">
              <div className="space-y-12">
                <SectionLabel text="INITIATE PROTOCOL" />
                <h2 className="text-6xl md:text-8xl leading-[0.9] font-display font-black uppercase">
                  {cmsData?.cta_title?.split(' ')[0] || 'Ready'} <br />
                  <span className="font-serif italic lowercase font-normal text-[#21D469]">{cmsData?.cta_title?.split(' ').slice(1, -1).join(' ') || 'to lead the'}</span> <br />
                  {cmsData?.cta_title?.split(' ').slice(-1)[0] || 'Change?'}
                </h2>
                <p className="text-xl font-medium italic opacity-60 leading-relaxed max-w-md">
                  {cmsData?.cta_description || 'Complete the initial registration form to receive your institution\'s Green Accreditation roadmap.'}
                </p>
                <div className="flex items-center gap-6 p-8 bg-white rounded-3xl border border-black/5 shadow-premium">
                  <Leaf className="text-[#21D469]" size={40} />
                  <p className="text-xs font-black uppercase tracking-widest opacity-40 italic">Join 2,000+ Verified Institutions Worldwide</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Registrar Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter Full Name"
                      className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Official Email</label>
                    <input 
                      type="email" 
                      placeholder="admin@institution.edu"
                      className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 ml-4">Institution Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter Institution / University Name"
                    className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                    required
                    value={formData.school}
                    onChange={(e) => setFormData({...formData, school: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px) font-black uppercase tracking-[0.4em] opacity-40 ml-4">Country</label>
                  <input 
                    type="text" 
                    placeholder="e.g. United States"
                    className="w-full bg-white border border-black/5 rounded-3xl px-10 py-6 outline-none focus:border-[#21D469] transition-all text-sm font-black uppercase tracking-widest shadow-sm"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  />
                </div>
                <button type="submit" className="w-full bg-[#0F172A] text-white py-8 rounded-3xl text-xs font-black uppercase tracking-[0.4em] hover:bg-[#21D469] transition-all shadow-3d active:scale-95">
                   {cmsData?.primary_button_text || 'Request Audit Protocol'} <ArrowRight className="inline ml-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
