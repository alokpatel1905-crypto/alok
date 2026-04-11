'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Handshake, Globe, ShieldCheck, ArrowRight, Building2, Gift, Users, Target, Combine, GraduationCap, Sprout, Star, Quote } from 'lucide-react';
import Link from 'next/link';

const SUPPORT_WAYS = [
  {
    id: "partnerships",
    title: "Institutional Partnerships",
    subtitle: "Collaborating to Advance Sustainable Education at Scale",
    desc: "Schools, universities, foundations, networks, and mission-aligned organizations partner directly with Green Mentors. These vital partnerships support joint ecosystems, exclusive rankings, accreditation deployments, and global events—emphasizing long-term collaboration and shared institutional impact.",
    icon: <Building2 className="w-10 h-10 text-emerald-700" strokeWidth={1.5} />,
    color: "emerald"
  },
  {
    id: "sponsorship",
    title: "Sponsorship Opportunities",
    subtitle: "Supporting High-Impact Initiatives and Global Gatherings",
    desc: "Sponsors are invited to fund premier international conferences, global recognition platforms, elite fellowships, youth engagement initiatives, and major sustainability programs. Sponsorship provides profound, mission-aligned global visibility while actively accelerating educational transformation.",
    icon: <Target className="w-10 h-10 text-emerald-700" strokeWidth={1.5} />,
    color: "emerald"
  },
  {
    id: "philanthropy",
    title: "Philanthropic Support",
    subtitle: "Investing in Future-Ready, Climate-Conscious Learning",
    desc: "Donors and philanthropic visionaries help scale critical sustainability-led education initiatives globally. Financial support aggressively expands program reach to disparate institutions, empowering marginalized educators and students, explicitly positioning giving as an investment in global resilience.",
    icon: <Gift className="w-10 h-10 text-emerald-700" strokeWidth={1.5} />,
    color: "emerald"
  },
  {
    id: "volunteer",
    title: "Volunteer & Advisory Support",
    subtitle: "Contribute Expertise, Leadership, and Global Perspective",
    desc: "Educators, esteemed researchers, industry professionals, and mission-aligned leaders contribute unparalleled expertise via mentorship, strategic advisory support, keynote speaking, and rigorous knowledge-sharing frameworks, fortifying a stronger global ecosystem of learning.",
    icon: <Users className="w-10 h-10 text-emerald-700" strokeWidth={1.5} />,
    color: "emerald"
  }
];

const WHY_SUPPORT = [
  { title: "Global Educational Impact", text: "Drive measurable paradigms shift across thousands of schools and universities." },
  { title: "Systems-Level Transformation", text: "Address root causes of climate inaction through foundational curriculum integration." },
  { title: "Credible International Ecosystem", text: "Partner with a globally recognized, highly vetted institutional network." },
  { title: "Support Future Generations", text: "Empower youths as active, climate-conscious leaders of tomorrow." }
];

const SUPPORT_FLOW = [
  { step: "1", title: "Connect with Green Mentors", desc: "Initiate dialogue regarding organizational capacity and capabilities." },
  { step: "2", title: "Identify Shared Goals", desc: "Align philanthropic vision with specific ecosystem programs." },
  { step: "3", title: "Design Support Pathway", desc: "Structure formal funding, sponsorship, or strategic advisory frameworks." },
  { step: "4", title: "Scale Impact Together", desc: "Execute actively and measure global institutional transformation." }
];

export default function SupportUsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAF9F6] font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-32 px-8 overflow-hidden bg-slate-900 border-b-8 border-emerald-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-950" />
        
        {/* Abstract organic background visual */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-400">Support Us</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-emerald-900/50 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Heart size={14} className="text-emerald-500" />
            Support the Mission
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
            Help Shape a Sustainable Future Through Education
          </h1>
          
          <p className="text-xl font-medium text-slate-300 max-w-3xl leading-relaxed">
            Green Mentors works directly with schools, universities, educators, and global partners to embed sustainability deeply into core education systems. Your vital support helps systematically scale this climate-conscious impact worldwide.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white relative">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-8">
                <Handshake className="w-8 h-8 text-emerald-600" />
             </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.8]">
              Meaningful support transcends simple funding; it fundamentally anchors mission-aligned partnerships capable of scaling immense impact across countries and communities. Joint contributions structurally accelerate educational transformation, rigorous sustainability integration, and the proactive grooming of climate-conscious global leadership.
            </p>
          </div>
        </section>

        {/* 7. Trust / Credibility Strip */}
        <div className="bg-[#FAF9F6] border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-10 flex justify-center flex-wrap gap-x-12 gap-y-6">
            {["Global Reach", "Institutional Ecosystem", "Sustainability Leadership", "Collaborative Impact", "Education Transformation"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-xs uppercase tracking-[0.15em]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Ways to Support (Core Section) */}
        <section className="py-32 px-8 bg-white" id="ways-to-support">
          <div className="max-w-7xl mx-auto space-y-20">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Pathways to Partnership</h2>
               <p className="text-lg text-slate-500 font-medium mt-4">Discover how you can align your resources with global educational change.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {SUPPORT_WAYS.map((way, idx) => (
                <div key={way.id} className="bg-[#FAF9F6] border border-slate-200 rounded-[3rem] p-10 md:p-14 hover:bg-white hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col group h-full">
                  
                  <div className="flex items-center justify-between mb-10">
                     <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                       {way.icon}
                     </div>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3 group-hover:text-emerald-700 transition-colors">{way.title}</h3>
                    <h4 className="text-[15px] font-bold text-emerald-600 mb-6 uppercase tracking-widest">{way.subtitle}</h4>
                    <p className="text-slate-600 font-medium leading-[1.8] mb-12">
                      {way.desc}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto border-t border-slate-200 pt-8">
                    <button className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-emerald-700 hover:-translate-y-0.5 transition-all shadow-xl shadow-slate-900/10 text-center">
                      Join Our Mission
                    </button>
                    <button className="bg-white text-slate-700 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:border-emerald-300 hover:bg-emerald-50 transition-all text-center">
                      Detailed Information
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 & 5. Why Support & Impact Container */}
        <section className="py-32 px-8 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            
            {/* 4. Why Support Green Mentors */}
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                <Star size={16} /> Mission Alignment
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">Why Support Green Mentors?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_SUPPORT.map((benefit, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-3xl p-6 group">
                    <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:border-emerald-500 transition-all">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-slate-100 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Impact of Support */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Combine size={16} /> Verifiable Outcomes
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">Your Support Enables Extreme Impact</h2>
              
              <div className="space-y-8 bg-slate-800 border border-slate-700 p-10 rounded-[2.5rem]">
                 <p className="text-lg text-slate-300 font-medium leading-relaxed">
                   By channeling resources into Green Mentors, you directly fund systems-level change rather than isolated philanthropic gestures. We permanently rewrite how institutions operate.
                 </p>
                 
                 <div className="space-y-6 mt-8">
                    <div className="flex items-start gap-4">
                        <GraduationCap className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-white mb-1">Expanding University Frameworks</h4>
                            <p className="text-slate-400 font-medium text-sm leading-relaxed">Accelerating the deployment of comprehensive sustainability curricula globally.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Users className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-white mb-1">Strengthening Educator Capacity</h4>
                            <p className="text-slate-400 font-medium text-sm leading-relaxed">Funding direct training programs for teachers implementing climate-conscious pedagogies.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Globe className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-white mb-1">Building Connective Infrastructure</h4>
                            <p className="text-slate-400 font-medium text-sm leading-relaxed">Subsidizing major international events, elite rankings, and overarching global recognition platforms.</p>
                        </div>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Partnership / Support Model Overview */}
        <section className="py-32 px-8 bg-emerald-50/50 relative border-y border-emerald-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">How We Work with Supporters</h2>
               <p className="text-lg text-slate-500 font-medium">A frictionless, highly professional architecture mapped for institutional alignment.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-0.5 bg-emerald-200" />
              
              {SUPPORT_FLOW.map((step, idx) => (
                <div key={idx} className="relative flex flex-col pt-12 items-center text-center group">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-[28px] bg-emerald-600 border-4 border-white shadow-xl shadow-emerald-900/10 flex items-center justify-center font-black text-2xl text-white z-10 group-hover:-translate-y-2 transition-transform duration-300">
                    {step.step}
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-[2rem] p-8 pt-16 w-full h-full hover:shadow-xl hover:shadow-emerald-900/5 transition-all">
                     <h4 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h4>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">
                       {step.desc}
                     </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Testimonial / Quote Block */}
        <section className="py-24 px-8 bg-white border-b border-slate-100">
            <div className="max-w-4xl mx-auto text-center">
                <Quote className="w-12 h-12 text-emerald-200 mx-auto mb-8" />
                <blockquote className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-10">
                    "When we explicitly fund education built upon environmental accountability, we do not merely hope for a sustainable future—<span className="text-emerald-700">we actively engineer it.</span>"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
                        <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-slate-900">Green Mentors Governance</div>
                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Institutional Mandate</div>
                    </div>
                </div>
            </div>
        </section>

        {/* 9. Call to Action */}
        <section className="py-32 px-8 bg-emerald-950 relative overflow-hidden text-center">
            
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800/40 via-emerald-950 to-slate-950" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
              Support the Future of <br/> Responsible Education
            </h2>
            <p className="text-emerald-100/90 text-lg md:text-2xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We formally invite highly-aligned institutions, sponsors, major donors, and global partners to critically contribute to this accelerating global movement.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                Become a Partner <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="w-full sm:w-auto bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 shadow-xl text-center">
                Contact Green Mentors
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
