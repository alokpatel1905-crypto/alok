'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
  Globe, ShieldCheck, Zap, ArrowRight, Leaf, 
  Search, Users, School, GraduationCap, Award, 
  Mail, Instagram, Twitter, Linkedin, Facebook,
  Menu, X, Check, Star, Globe2, Compass, 
  Wind, Droplets, Mountain, Building2, FileText,
  ClipboardCheck, Play
} from 'lucide-react';

/**
 * DESIGN PHILOSOPHY: "Organic Brutalism meets Editorial Luxury"
 * COLOR PALETTE: Forest Editorial
 */
const COLORS = {
  ink: '#0F172A',         // Deep Slate/Navy for modern tech feel
  parchment: '#FFFFFF',    // Pure White
  sage: '#22C55E',        // Electric Green
  moss: '#21D469',        // User-defined Electric Green
  clay: '#F43F5E',        // Energetic Rose/Red accent
  gold: '#FACC15',        // Cyber Yellow/Gold
  mist: '#F1F5F9',        // Light Slate
  chalk: '#F8FAFC',       // Clean Slate
  charcoal: '#334155',    // Medium Slate text
};

// --- HELPER COMPONENTS ---

const SectionLabel = ({ text, color = COLORS.sage, light = false }: any) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`h-[1px] w-12 ${light ? 'bg-white/20' : 'bg-black/10'}`} />
    <span className="text-[10px] font-bold tracking-[0.5em] uppercase" style={{ color }}>
      {text}
    </span>
  </div>
);

const MagneticButton = ({ children, className = "" }: any) => {
  const btnRef = useRef<any>(null);
  
  const handleMouseMove = (e: any) => {
    const btn = btnRef.current;
    if (!btn) return;
    const { left, top, width, height } = btn.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const btn = btnRef.current;
    if (btn) btn.style.transform = `translate(0, 0)`;
  };

  return (
    <button 
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </button>
  );
};

const ScrambleText = ({ text, delay = 0 }: any) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  useEffect(() => {
    let iteration = 0;
    let interval: any = null;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(text.split('')
          .map((char: any, index: any) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
        );
        
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayText || ' '}</span>;
};

// --- SECTIONS ---

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#FFFFFF] text-[#0F172A] pt-32 pb-20 px-8 lg:px-16 overflow-hidden flex flex-col justify-center">
      {/* Background Blobs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#22C55E]/10 opacity-60 blur-[120px] animate-blob rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#FACC15]/10 opacity-40 blur-[100px] animate-blob animation-delay-2000 rounded-full pointer-events-none" />
      
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay grain-texture" />

      <div className="relative z-10 w-full">
        <div className="flex justify-between items-start mb-20">
          <div className="flex gap-12 text-[10px] font-bold tracking-[0.3em] uppercase">
            <a href="#about" className="hover:text-[#22C55E] transition-colors text-[#0F172A]/40 hover:text-[#0F172A]">About</a>
            <a href="#programs" className="hover:text-[#22C55E] transition-colors text-[#0F172A]/40 hover:text-[#0F172A]">Programs</a>
            <a href="#impact" className="hover:text-[#22C55E] transition-colors text-[#0F172A]/40 hover:text-[#0F172A]">Impact</a>
          </div>
          <a href="/accreditation" className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-[#FACC15] transition-colors">
            Get Accredited <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>

        <div className="w-full text-center lg:text-left">
          <h1 className="flex flex-col leading-[0.85] select-none">
            <span className="font-display font-black text-[clamp(60px,12vw,160px)] tracking-[-0.05em] uppercase">
              <ScrambleText text="Transforming" delay={500} />
            </span>
            <span className="font-serif italic text-[clamp(50px,9vw,110px)] text-[#22C55E] -mt-2 lg:-mt-6 ml-0 lg:ml-20">
              Education for a
            </span>
            <span className="relative font-serif italic font-bold text-[clamp(60px,12vw,160px)] tracking-[-0.02em] -mt-2 lg:-mt-8">
              Sustainable
              <span className="absolute inset-0 translate-x-2 translate-y-2 text-transparent [-webkit-text-stroke:1px_#22C55E] pointer-events-none hidden lg:block">
                Sustainable
              </span>
            </span>
            <span className="font-display font-black text-[clamp(60px,12vw,160px)] tracking-[-0.05em] uppercase text-[#FACC15]">
              FUTURE.
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-24 items-end border-t border-black/5 pt-12">
          <div className="text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase">
            UN ECOSOC Special <br /> Consultative Status
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-12 border border-black/10 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-[#FACC15] rounded-full animate-bounce" />
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-[0.2em] text-[#22C55E] uppercase lg:text-right">
            40+ Countries // 2000+ Schools
          </div>
        </div>
      </div>
    </section>
  );
};

const TrustMarquee = () => {
  return (
    <div className="bg-[#F43F5E] py-4 overflow-hidden border-y border-black/5">
      <div className="flex whitespace-nowrap animate-ticker">
        {[1, 2].map((i: any) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {[
              "UN ECOSOC CERTIFIED", "UNESCO PARTNER", "UNGA AWARD 2019", 
              "40+ COUNTRIES", "2,000+ GREEN SCHOOLS", "50,000+ EDUCATORS",
              "AASHE MEMBER", "FOUNDED 2010"
            ].map((text: any, idx: any) => (
              <React.Fragment key={idx}>
                <span className="text-[#FFFFFF] text-[11px] font-black tracking-[0.3em] uppercase font-display">
                  {text}
                </span>
                <span className="text-[#FFFFFF]/40 text-lg">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="relative bg-[#FFFFFF] text-[#0F172A] py-40 px-8 lg:px-24 overflow-hidden">
      <div className="absolute top-20 left-10 text-[200px] font-black text-black/[0.03] leading-none select-none pointer-events-none font-display">
        01
      </div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-20">
        <div className="lg:col-span-5 space-y-12">
          <SectionLabel text="OUR GENESIS" />
          <h2 className="leading-[1.1] space-y-2">
            <span className="block font-serif italic text-7xl">Pioneering</span>
            <span className="block font-display font-black text-7xl uppercase">Green</span>
            <span className="block font-serif italic text-7xl">Education</span>
            <span className="block font-display font-black text-7xl uppercase text-[#21D469]">Since 2010.</span>
          </h2>
          
          <div className="space-y-8 max-w-md">
            <p className="text-xl font-medium leading-relaxed italic text-[#334155]">
              Green Mentors is a global force in sustainable education, architectural evolution, and institutional responsibility. We bridge the gap between pedagogy and nature.
            </p>
            <p className="text-lg leading-relaxed text-[#334155]/80">
              Founded by Virendra Rawat, recipient of the UNGA Award 2019, our organization has transformed thousands of schools into nature-inspired laboratories of learning.
            </p>
            <div className="pl-6 border-l-4 border-[#FACC15] py-2">
               <p className="text-2xl font-serif italic font-bold leading-snug">
                "Making every school accountable to the future of pupils and the planet."
               </p>
            </div>
            <a href="#" className="inline-block border-b border-[#0F172A] pb-1 text-xs font-black tracking-widest hover:text-[#F43F5E] hover:border-[#F43F5E] transition-all">
              OUR MISSION →
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80" 
                alt="Nature"
                className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-[3s]"
              />
            </div>
            
            <div className="absolute -bottom-10 -left-10 bg-[#21D469] text-[#FFFFFF] p-10 rounded-3xl shadow-2xl max-w-xs transform hover:-translate-y-2 transition-transform">
              <div className="text-xs font-bold tracking-[0.2em] mb-4 text-[#22C55E] uppercase">The Visionary</div>
              <h4 className="text-2xl font-display font-black italic tracking-tighter mb-2">Founder's Legacy</h4>
              <p className="text-sm opacity-70 italic font-medium">Virendra Rawat's mission to green the world's educational footprint.</p>
            </div>

            <div className="absolute top-10 right-10 w-24 h-24 bg-[#FACC15] rounded-full flex flex-col items-center justify-center text-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform">
              <span className="text-[10px] font-black uppercase tracking-widest leading-none">Est.</span>
              <span className="text-2xl font-display font-black leading-none">2010</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const stats = [
    { label: 'Green Schools', value: 2000 },
    { label: 'Universities', value: 200 },
    { label: 'Teachers Trained', value: 50000 },
    { label: 'School Leaders', value: 20000 },
    { label: 'Countries', value: 40 },
  ];

  useEffect(() => {
    const intervals = stats.map((stat: any, i: any) => {
      const step = Math.ceil(stat.value / 50);
      return setInterval(() => {
        setCounts(prev => {
          const next: any = [...prev];
          if (next[i] < stat.value) next[i] = Math.min(stat.value, next[i] + step);
          return next;
        });
      }, 30);
    });
    return () => intervals.forEach((i: any) => clearInterval(i));
  }, []);

  return (
    <section id="impact" className="bg-[#21D469] text-[#FFFFFF] py-32 px-8 lg:px-16 overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-0 border-y border-[#FFFFFF]/10">
        {stats.map((stat: any, i: any) => (
          <div key={i} className={`py-20 px-8 text-center flex flex-col items-center justify-center ${i < stats.length - 1 ? 'lg:border-r border-[#FFFFFF]/10' : ''}`}>
            <div className="flex items-baseline gap-1">
              <span className="text-7xl lg:text-8xl font-serif italic font-black tracking-tighter">
                {counts[i].toLocaleString()}
              </span>
              <span className="text-4xl text-[#22C55E] font-black">+</span>
            </div>
            <div className="mt-4 text-[10px] font-bold tracking-[0.4em] text-[#A8C49A] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-xs font-medium italic opacity-40 tracking-widest uppercase">
        Measured impact across 6 continents
      </div>
    </section>
  );
};

const ProgramsSection = () => {
  const [active, setActive] = useState(0);
  
  const programs = [
    { 
      title: 'Green School Accreditation', 
      id: '01', 
      desc: 'Global benchmark for school sustainability and nature-inspired campus architecture.',
      icon: School,
      grad: 'linear-gradient(to bottom right, #C8D8B8, #22C55E)'
    },
    { 
      title: 'Green University Program', 
      id: '02', 
      desc: 'Strategic transition frameworks for higher education institutions worldwide.',
      icon: GraduationCap,
      grad: 'linear-gradient(to bottom right, #A8C49A, #21D469)'
    },
    { 
      title: 'Green Teacher Training', 
      id: '03', 
      desc: 'Upskilling educators in eco-pedagogy and climate-conscious instruction.',
      icon: Users,
      grad: 'linear-gradient(to bottom right, #E0D8CC, #F43F5E)'
    },
    { 
      title: 'Green Graduate Program', 
      id: '04', 
      desc: 'Preparing the future workforce for the global green economy and sustainable industries.',
      icon: Award,
      grad: 'linear-gradient(to bottom right, #D8D0C0, #FACC15)'
    },
    { 
      title: 'Green Curriculum Design', 
      id: '05', 
      desc: 'Integrating sustainability across all academic disciplines using nature-mimicry.',
      icon: FileText,
      grad: 'linear-gradient(to bottom right, #B8C8B8, #0F172A)'
    },
    { 
      title: 'Green Auditing & Verification', 
      id: '06', 
      desc: 'Rigorous assessment protocols for institutional resource circularity and carbon footprint.',
      icon: Search,
      grad: 'linear-gradient(to bottom right, #D0D8D0, #22C55E)'
    }
  ];

  return (
    <section id="programs" className="bg-[#F8FAFC] text-[#0F172A] py-40 px-8 lg:px-24">
      <SectionLabel text="OUR CORE PILLARS" />
      <h2 className="text-6xl md:text-8xl leading-[0.9] mb-24">
        <span className="block font-serif italic">Strategic Excellence</span>
        <span className="block font-display font-black uppercase">in Sustainable</span>
        <span className="block font-serif italic text-[#21D469]">Education.</span>
      </h2>

      <div className="grid lg:grid-cols-12 gap-20 items-start">
        <div className="lg:col-span-7 space-y-2">
          {programs.map((prog: any, i: any) => (
            <div 
              key={i}
              onMouseEnter={() => setActive(i)}
              className={`group relative py-10 px-8 border-b border-black/5 cursor-pointer transition-all duration-500 overflow-hidden ${active === i ? 'bg-[#FFFFFF] border-l-[3px] border-[#21D469]' : 'hover:bg-black/[0.02]'}`}
            >
              <div className="flex items-start gap-8 relative z-10">
                <span className={`text-xs font-black tracking-widest mt-2 ${active === i ? 'text-[#FACC15]' : 'text-black/20'}`}>
                  {prog.id}
                </span>
                <div className="flex-1">
                  <h3 className="text-3xl font-display font-black uppercase tracking-tighter transition-transform duration-500 group-hover:translate-x-2">
                    {prog.title}
                  </h3>
                  <div className={`mt-4 overflow-hidden transition-all duration-500 ${active === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-lg font-medium italic text-[#334155] max-w-lg mb-6">{prog.desc}</p>
                    <span className="text-[10px] font-black tracking-[0.2em] uppercase border-b border-black/20 pb-1">View Program →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 sticky top-32">
          <div 
            className="w-full aspect-square rounded-[3rem] shadow-3xl flex flex-col items-center justify-center text-center p-16 transition-all duration-700"
            style={{ background: programs[active].grad }}
          >
            {React.createElement(programs[active].icon, { size: 100, className: "text-[#FFFFFF] mb-12 animate-float" })}
            <h4 className="text-4xl font-display font-black uppercase tracking-tighter text-[#FFFFFF] leading-none mb-6">
              {programs[active].title}
            </h4>
            <p className="text-sm text-[#FFFFFF]/70 font-bold uppercase tracking-widest">
              {programs[active].desc.split('.')[0]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ElementsSection = () => {
  const [expanded, setExpanded] = useState(0);
  
  const elements = [
    { 
      name: 'Soil', 
      icon: Mountain, 
      grad: 'linear-gradient(to bottom, #2D1B0E, #4A3020)', 
      desc: 'The foundation of life. Our protocols ensure healthy soil management and organic campus gardening.',
      details: 'Nature-Inspired Grounds // Composting Systems // Biodiversity Hubs'
    },
    { 
      name: 'Water', 
      icon: Droplets, 
      grad: 'linear-gradient(to bottom, #0A2535, #1A4060)', 
      desc: 'Circular aquatic ecosystems. Implementing rainwater harvesting and greywater recycling on campuses.',
      details: 'Closed-Loop Systems // Filtration Protocols // Water Literacy'
    },
    { 
      name: 'Air', 
      icon: Wind, 
      grad: 'linear-gradient(to bottom, #1A2A1A, #2D4A2D)', 
      desc: 'Breathable excellence. Carbon sequestration via campus afforestation and indoor air quality standards.',
      details: 'CO2 Monitoring // Oxygen Corridors // Zero-Emission Transport'
    },
    { 
      name: 'Energy', 
      icon: Zap, 
      grad: 'linear-gradient(to bottom, #2A1A05, #4A3010)', 
      desc: 'Radiant efficiency. Transitioning institutional grids to 100% renewable solar and wind power.',
      details: 'Solar Integration // Smart Grids // Thermal Management'
    },
    { 
      name: 'Spaces', 
      icon: Building2, 
      grad: 'linear-gradient(to bottom, #1A2A20, #2D4A38)', 
      desc: 'Architectural mimicry. Buildings that behave like trees — zero-waste and self-sustaining.',
      details: 'Biophilic Design // Passive Cooling // Modular Evolution'
    }
  ];

  return (
    <section className="bg-[#0F172A] text-[#FFFFFF] min-h-screen flex flex-col">
      <div className="pt-40 px-8 lg:px-24 mb-20">
        <SectionLabel text="THE FRAMEWORK" />
        <h2 className="text-7xl lg:text-9xl leading-[0.8] font-display font-black uppercase">
          <span className="font-serif italic text-white/40 lowercase">The Five</span> <br />
          <span className="text-[#FACC15]">Elements.</span>
        </h2>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row w-full">
        {elements.map((el: any, i: any) => (
          <div 
            key={i}
            onClick={() => setExpanded(i)}
            onMouseEnter={() => setExpanded(i)}
            className={`group relative h-[20vh] lg:h-[70vh] cursor-pointer transition-all duration-1000 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5 ${expanded === i ? 'lg:flex-[3] flex-[4]' : 'lg:flex-[0.5] flex-1'}`}
            style={{ background: expanded === i ? el.grad : '#0F172A' }}
          >
            {/* Grid Overlay for Spaces */}
            {i === 4 && expanded === i && <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />}
            
            <div className={`absolute inset-0 p-12 flex flex-col ${expanded === i ? 'justify-between' : 'justify-center items-center'}`}>
              <div className={`transition-all duration-500 ${expanded === i ? 'opacity-100 translate-y-0' : 'opacity-40 -translate-y-4'}`}>
                {expanded === i ? (
                  <el.icon size={80} className="text-[#FACC15] animate-float" />
                ) : (
                  <span className="text-xs font-black tracking-widest text-[#22C55E]">{i + 1}</span>
                )}
              </div>

              <div className={`transition-all duration-1000 ${expanded === i ? 'translate-y-0' : 'lg:rotate-[-90deg] lg:whitespace-nowrap'}`}>
                <h3 className={`font-display font-black uppercase tracking-tighter leading-none ${expanded === i ? 'text-6xl mb-6' : 'text-xl opacity-60'}`}>
                  {el.name}
                </h3>
                {expanded === i && (
                  <div className="space-y-6 max-w-md animate-reveal-up">
                    <p className="text-xl font-medium italic opacity-80">{el.desc}</p>
                    <div className="text-[10px] font-black tracking-[0.3em] uppercase border border-white/20 p-4 inline-block">
                      {el.details}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const WhyUsSection = () => {
  const points = [
    { title: '01 Global Credibility', desc: 'Direct UN ECOSOC consultative status + UNESCO partnership providing institutional authority on a global scale.' },
    { title: '02 Nature-Inspired', desc: 'Design philosophy rooted in nature-mimicry and resource circularity, moving beyond mere sustainability.' },
    { title: '03 Proven Impact', desc: '2,000+ campuses already transitioned to green accreditation across 40+ sovereign nations.' },
    { title: '04 Futurist Vision', desc: 'Preparing students for the high-demand green economy of 2030+ with specialized vocational skills.' }
  ];

  return (
    <section className="bg-[#F43F5E] text-[#0F172A] py-40 px-8 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-24 leading-none">
          <span className="block font-serif italic text-6xl">Why Partner With</span>
          <span className="block font-display font-black text-8xl uppercase mt-4">Green Mentors?</span>
        </h2>

        <div className="divide-y divide-black/10 border-t border-black/10">
          {points.map((p: any, i: any) => (
            <div key={i} className="py-16 group hover:bg-black/5 transition-colors px-4 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <h3 className="text-4xl lg:text-5xl font-display font-black text-[#FFFFFF] group-hover:text-[#0F172A] transition-colors flex-1">
                {p.title}
              </h3>
              <p className="text-xl font-medium italic text-[#0F172A]/70 max-w-lg lg:text-right">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EventsSection = () => {
  return (
    <section className="bg-[#FFFFFF] text-[#0F172A] py-40 px-8 lg:px-24">
      <SectionLabel text="GLOBAL SUMMITS" />
      <h2 className="text-7xl lg:text-9xl font-display font-black uppercase leading-[0.8] mb-24">
        <span className="font-serif italic text-black/20 lowercase">Where the World</span> <br />
        Learns Resilience.
      </h2>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 group relative rounded-[3rem] overflow-hidden aspect-[4/3] lg:aspect-auto h-[500px] lg:h-[700px] shadow-2xl cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-10 left-10 bg-[#FACC15] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest text-black">
            Sept 24, 2025
          </div>
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
            <h3 className="text-4xl lg:text-6xl font-display font-black text-white uppercase tracking-tighter max-w-md leading-[0.9]">
              9th NYC Green School <br /> Conference
            </h3>
            <span className="text-xs font-black text-white/60 tracking-widest uppercase">New York City 📍</span>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex-1 bg-white p-12 rounded-[3rem] shadow-premium flex flex-col justify-between group cursor-pointer hover:bg-[#22C55E] hover:text-white transition-all duration-500">
             <div className="flex justify-between items-start">
               <span className="text-[10px] font-black tracking-widest uppercase text-[#22C55E] group-hover:text-white">DAVOS, SWITZERLAND</span>
               <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </div>
             <div>
               <h4 className="text-3xl font-display font-black uppercase tracking-tighter mb-4">World Education Forum</h4>
               <p className="text-sm font-bold opacity-40 uppercase tracking-widest">January 2024</p>
             </div>
          </div>
          
          <div className="flex-1 bg-[#0F172A] p-12 rounded-[3rem] shadow-premium flex flex-col justify-between text-[#FFFFFF] group cursor-pointer hover:bg-[#F43F5E] transition-all duration-500">
             <div className="flex justify-between items-start">
               <span className="text-[10px] font-black tracking-widest uppercase text-[#22C55E] group-hover:text-white">Ahmedabad, India</span>
               <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </div>
             <div>
               <h4 className="text-3xl font-display font-black uppercase tracking-tighter mb-4">National Principal Conference</h4>
               <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Yearly Cycle</p>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <a href="#" className="group inline-flex flex-col items-center gap-2">
          <span className="text-xs font-black uppercase tracking-[0.4em]">View All Events</span>
          <div className="w-40 h-[1px] bg-black/10 overflow-hidden">
            <div className="w-full h-full bg-[#0F172A] translate-x-[-100%] group-hover:translate-x-[0] transition-transform duration-500" />
          </div>
        </a>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  return (
    <section className="relative bg-[#22C55E] text-[#0F172A] py-60 px-8 lg:px-24 overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] font-black text-black/10 select-none pointer-events-none font-display leading-none">
        “
      </div>
      
      <div className="absolute top-20 left-20 opacity-10 rotate-12 pointer-events-none">
        <Leaf size={300} strokeWidth={0.5} />
      </div>
      <div className="absolute bottom-20 right-20 opacity-10 -rotate-12 pointer-events-none">
        <Leaf size={300} strokeWidth={0.5} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <blockquote className="text-4xl lg:text-6xl font-serif italic font-bold leading-tight tracking-tight mb-12">
          "Green Mentors transformed our campus into a living laboratory of sustainability. Our students are no longer just learning about the environment — they are living it."
        </blockquote>
        
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-[1px] bg-[#0F172A]" />
          <div className="space-y-2">
            <h4 className="text-xl font-display font-black uppercase tracking-[0.3em]">Institutional Leadership</h4>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Verified Green School Principal</p>
          </div>
          <div className="flex gap-1 text-[#FACC15]">
            {[1,2,3,4,5].map((i: any) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  return (
    <section className="bg-[#F8FAFC] text-[#0F172A] py-40 px-8 lg:px-24">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="leading-none">
            <span className="block font-serif italic text-8xl">Cultivating</span>
            <span className="block font-display font-black text-8xl uppercase text-[#21D469]">Insights.</span>
          </h2>
          <p className="text-lg font-medium italic opacity-60 max-w-sm">
            Receive strategic updates on global green pedagogical standards and sustainability frameworks.
          </p>
        </div>

        <div className="lg:border-l border-black/10 lg:pl-20 py-10">
          <div className="space-y-12">
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Official Email Address"
                className="w-full bg-transparent border-b border-black/20 py-6 text-xl outline-none focus:border-[#21D469] transition-all font-display font-bold uppercase tracking-tighter placeholder:text-black/10 placeholder:font-serif"
              />
              <button className="absolute right-0 bottom-6 group-hover:translate-x-2 transition-transform font-black uppercase text-xs tracking-widest flex items-center gap-2">
                CONNECT NODE <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium italic opacity-40">Join 50,000+ eco-educators worldwide</span>
              <div className="flex gap-4">
                 <div className="h-1 flex-1 bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#21D469] w-[70%] animate-pulse" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#FFFFFF] pt-40 pb-12 px-8 lg:px-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FACC15]/40" />
      
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-[160px] lg:text-[240px] font-black text-white/[0.03] select-none pointer-events-none font-display uppercase whitespace-nowrap leading-none tracking-tighter">
        GREEN MENTORS
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <Leaf size={40} className="text-[#22C55E]" />
            <h3 className="text-2xl font-display font-black leading-none">
              <span className="text-[#22C55E]">GREEN</span> <br /> MENTORS
            </h3>
          </div>
          <p className="text-sm font-medium italic text-[#22C55E] max-w-xs">
            Architecting the sustainable educational transition through nature-inspired institutional frameworks.
          </p>
          <div className="flex gap-6">
            {[Instagram, Twitter, Linkedin, Facebook].map((Icon: any, i: any) => (
              <a key={i} href="#" className="p-3 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <h5 className="text-[10px] font-black tracking-[0.4em] text-[#FACC15] uppercase">Organization</h5>
          <ul className="space-y-4">
            {['Home', 'About', 'Programs', 'Impact', 'Accreditation', 'Rankings'].map((item: any, i: any) => (
              <li key={i}>
                <a href="#" className="text-lg font-medium text-[#A8B89A] hover:text-[#FFFFFF] hover:translate-x-2 transition-all inline-block">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-10">
          <h5 className="text-[10px] font-black tracking-[0.4em] text-[#FACC15] uppercase">India Headquarters</h5>
          <div className="space-y-6 text-sm font-medium opacity-60 leading-relaxed italic">
            <p>📍 B-802, Mondeal Heights,<br />S.G. Highway, Ahmedabad 380015</p>
            <p>📞 +91 79 49000160</p>
            <p>✉ info@greenmentors.in</p>
          </div>
        </div>

        <div className="space-y-10">
          <h5 className="text-[10px] font-black tracking-[0.4em] text-[#FACC15] uppercase">USA Global Office</h5>
          <div className="space-y-6 text-sm font-medium opacity-60 leading-relaxed italic">
            <p>📍 401, 67 W Street,<br />Brooklyn, New York 11222</p>
            <p>📞 +1 718 673 3942</p>
            <p>✉ info@greenmentors.world</p>
            <div className="pt-4">
               <div className="inline-flex items-center gap-4 bg-[#22C55E]/10 border border-[#22C55E]/30 px-6 py-3 rounded-full">
                  <Globe size={16} className="text-[#22C55E]" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Status 2026</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-40 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">
          © 2026 Green Mentors Global. Architects of Sustainability.
        </div>
        <div className="bg-[#22C55E]/20 text-[#22C55E] px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#22C55E]/40">
          UNESCO GEP PARTNER
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest opacity-40">
          <a href="#" className="hover:opacity-100">Privacy</a>
          <a href="#" className="hover:opacity-100">Terms</a>
          <a href="#" className="hover:opacity-100">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

const RevealSection = ({ children, className = "" }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'animate-reveal-up' : 'opacity-0 translate-y-20 transition-all duration-1000'}`}>
      {children}
    </div>
  );
};

// --- MAIN PAGE ---

export default function AvantGardeWebsite() {
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Loader timeout
    const timeout = setTimeout(() => setLoading(false), 2500);
    
    // Mouse movement
    const moveMouse = (e: any) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setRingPos({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Scroll progress
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / total) * 100);
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#FFFFFF] z-[100] flex items-center justify-center overflow-hidden p-8">
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 overflow-hidden">
          {['G','R','E','E','N',' ','M','E','N','T','O','R','S'].map((char: any, i: any) => (
            <span 
              key={i} 
              className="text-[#0F172A] font-display font-black text-4xl md:text-6xl lg:text-9xl animate-reveal-char inline-block"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main className="relative bg-[#FFFFFF] selection:bg-[#FACC15] selection:text-[#0F172A] overflow-x-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:ital,wght@0,900;1,400;1,900&family=Space+Grotesk:wght@700;900&display=swap');

        :root {
          --ink: #0F172A;
          --parchment: #FFFFFF;
          --sage: #22C55E;
          --moss: #21D469;
          --clay: #F43F5E;
          --gold: #FACC15;
        }

        * {
          cursor: none !important;
        }

        body {
          font-family: 'Inter', sans-serif;
          background-color: var(--parchment);
          color: var(--ink);
        }

        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-serif { font-family: 'Playfair Display', serif; }

        .grain-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }

        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes reveal-char {
          from { opacity: 0; transform: translateY(100%); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes reveal-up {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-blob { animation: blob 15s infinite ease-in-out; }
        .animate-ticker { animation: ticker 40s linear infinite; }
        .animate-float { animation: float 6s infinite ease-in-out; }
        .animate-reveal-char { animation: reveal-char 1.5s forwards cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-reveal-up { animation: reveal-up 1.2s forwards cubic-bezier(0.16, 1, 0.3, 1); }

        .animation-delay-2000 { animation-delay: 2s; }

        .shadow-premium {
          box-shadow: 0 40px 100px -20px rgba(13, 31, 14, 0.1);
        }
        
        .shadow-3xl {
          box-shadow: 0 60px 120px -30px rgba(0, 0, 0, 0.3);
        }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--ink); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 10px; }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-[4px] bg-[#FACC15] z-[1001] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-[2000] w-3 h-3 bg-[#22C55E] rounded-full hidden lg:block transition-all duration-100 ease-out"
        style={{ 
          transform: `translate(${cursorPos.x - 6}px, ${cursorPos.y - 6}px) scale(${isClicking ? 2 : 1})`,
          mixBlendMode: 'difference'
        }}
      />
      <div 
        className="fixed pointer-events-none z-[1999] w-12 h-12 border border-[#22C55E]/50 rounded-full hidden lg:block transition-all duration-300 ease-out"
        style={{ 
          transform: `translate(${ringPos.x - 24}px, ${ringPos.y - 24}px) scale(${isClicking ? 0 : 1})`,
          opacity: isClicking ? 0 : 1
        }}
      />

      <Hero />
      <TrustMarquee />
      
      <RevealSection>
        <AboutSection />
      </RevealSection>
      
      <RevealSection>
        <StatsSection />
      </RevealSection>
      
      <RevealSection>
        <ProgramsSection />
      </RevealSection>
      
      <RevealSection>
        <ElementsSection />
      </RevealSection>
      
      <RevealSection>
        <WhyUsSection />
      </RevealSection>
      
      <RevealSection>
        <EventsSection />
      </RevealSection>
      
      <RevealSection>
        <TestimonialSection />
      </RevealSection>
      
      <RevealSection>
        <NewsletterSection />
      </RevealSection>
      
      <Footer />
    </main>
  );
}
