'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, ArrowRight, Video, Globe, GraduationCap, Mic, Presentation, Lightbulb, Handshake, Sprout, Network, Target } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FLAGSHIP_EVENTS = [
  {
    title: "NYC Green School Conference",
    subtitle: "Advancing Sustainability in School Education on a Global Stage",
    desc: "Gathers prominent school leaders, visionary educators, and institutional partners to discuss profound sustainability integration in K-12 education. This prestigious conference highlights best practices, unparalleled educational innovation, and sets the stage for global green school transformation.",
    icon: <BuildingIcon className="w-8 h-8 text-emerald-700" />,
    color: "emerald"
  },
  {
    title: "NYC Children’s Climate Conference",
    subtitle: "Empowering Young Voices for a Climate-Responsible Future",
    desc: "Creates a dedicated international platform for children and youth to engage directly in climate dialogue. It actively encourages intense participation, heightened awareness, and resilient leadership among students, officially positioning young people as crucial active contributors to sustainable futures.",
    icon: <Sprout className="w-8 h-8 text-sky-700" />,
    color: "sky"
  },
  {
    title: "World Education Forum – Davos",
    subtitle: "Connecting Education Leadership with Global Sustainability Agendas",
    desc: "Convenes global thought leaders, elite institutions, and high-level policymakers parallel to the world's most significant economic gatherings. Together, they explore the future of education and global responsibility, creating strategic conversations on innovation, leadership, and systemic geopolitical change.",
    icon: <Globe className="w-8 h-8 text-indigo-700" />,
    color: "indigo"
  },
  {
    title: "Global Green Mentors Conference",
    subtitle: "A Global Platform for Collaboration, Recognition, and Transformation",
    desc: "Serves as the ultimate flagship gathering of the entire Green Mentors ecosystem. It unites schools, universities, educators, graduates, and international partners to permanently strengthen global collaboration, optimize visibility, and maximize critical knowledge exchange across the network.",
    icon: <Network className="w-8 h-8 text-amber-700" />,
    color: "amber"
  }
];

function BuildingIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 10v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10" />
      <path d="M2 10l10-8 10 8" />
      <line x1="12" y1="22" x2="12" y2="15" />
    </svg>
  );
}

const WHY_ATTEND = [
  { title: "Global Networking", text: "Forge connections with international education leaders.", icon: <Globe className="w-6 h-6" /> },
  { title: "Thought Leadership", text: "Gain access to cutting-edge sustainability intelligence.", icon: <Lightbulb className="w-6 h-6" /> },
  { title: "Institutional Visibility", text: "Showcase your institution’s achievements globally.", icon: <Target className="w-6 h-6" /> },
  { title: "Strategic Partnerships", text: "Initiate cross-border collaborative alliances.", icon: <Handshake className="w-6 h-6" /> }
];

const EXPERIENCE_FORMAT = [
  { title: "Keynote Talks", icon: <Mic className="w-5 h-5" /> },
  { title: "Institutional Showcases", icon: <Presentation className="w-5 h-5" /> },
  { title: "Panel Discussions", icon: <Users className="w-5 h-5" /> },
  { title: "Knowledge Exchange", icon: <Network className="w-5 h-5" /> }
];

const UPCOMING_MOCKS = [
  { 
    id: 1, 
    date: 'Sep 15, 2026', 
    status: 'UPCOMING', 
    title: '7th NYC Green School Conference', 
    location: 'United Nations HQ, New York',
    mode: 'In-Person'
  },
  { 
    id: 2, 
    date: 'Nov 10, 2026', 
    status: 'UPCOMING', 
    title: 'Global Green Mentors Summit', 
    location: 'Online Virtual Session',
    mode: 'Virtual'
  },
  { 
    id: 3, 
    date: 'Jan 20, 2027', 
    status: 'UPCOMING', 
    title: 'World Education Forum', 
    location: 'Davos, Switzerland',
    mode: 'Hybrid'
  }
];

export default function EventsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-white font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-24 px-8 overflow-hidden bg-slate-900 border-b border-emerald-900/50 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-900 to-emerald-900/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=')]" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-sky-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-sky-400">Events</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
            <Calendar size={14} className="text-sky-500" />
            Global Events
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Convening Leaders for <br/> Sustainable Education
          </h1>
          
          <p className="text-xl font-medium text-slate-400 max-w-3xl leading-relaxed">
            Green Mentors events act as premier planetary platforms, uniquely bringing together visionary educators, institutions, policymakers, youth, and global partners to decisively advance climate-conscious education.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center border-x-4 border-emerald-500 px-8 py-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">The Power of Global Convening</h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Physical and digital convenings act as paramount accelerators. They dramatically compress the timeline required for systemic knowledge-sharing, multi-national collaboration, and decisive global action. Green Mentors meticulously architects these high-level intersectional platforms where elite educational discourse meets immediate sustainability urgency.
            </p>
          </div>
        </section>

        {/* 7. Highlight Strip (Moved up visually for impact) */}
        <div className="border-b border-slate-100 bg-slate-50">
          <div className="max-w-7xl mx-auto px-8 py-8 flex justify-center flex-wrap gap-x-12 gap-y-6">
            {["Global Participation", "Sustainability Dialogue", "Youth Engagement", "Institutional Partnerships"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-600 font-bold text-sm uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Flagship Events (Core Section) */}
        <section className="py-32 px-8 bg-white" id="programs">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center mb-20">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Flagship Conferences</h2>
            </div>
            {FLAGSHIP_EVENTS.map((event, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-100 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group">
                
                <div className={`w-32 h-32 lg:w-48 lg:h-48 shrink-0 bg-${event.color}-50 rounded-full flex items-center justify-center border-4 border-white shadow-lg shadow-${event.color}-900/10 group-hover:scale-110 transition-transform duration-500`}>
                  {event.icon}
                </div>

                <div className="flex-grow text-center lg:text-left">
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">{event.title}</h2>
                  <h3 className={`text-sm md:text-base font-bold text-${event.color}-600 mb-6 uppercase tracking-[0.2em] inline-block pb-2 border-b-2 border-${event.color}-200`}>
                    {event.subtitle}
                  </h3>
                  <p className="text-lg text-slate-500 font-medium leading-[1.8] mb-10 max-w-3xl">
                    {event.desc}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link href="#register" className={`bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-${event.color}-700 hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-slate-900/10`}>
                      Register Now
                    </Link>
                    <button className="bg-white text-slate-600 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5 transition-all duration-300">
                      Know More
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* 4. Why Attend & 5. Experience Block */}
        <section className="py-32 px-8 bg-slate-900 text-white border-t border-slate-800 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
            
            {/* Why Attend */}
            <div>
              <div className="inline-flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Users size={16} /> Audience Value
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">Why Attend?</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WHY_ATTEND.map((benefit, idx) => (
                  <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 group hover:border-sky-500/50 transition-colors">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-all">
                      {benefit.icon}
                    </div>
                    <h4 className="font-bold text-slate-100 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      {benefit.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience / Format */}
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Mic size={16} /> Event Dynamics
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-10">Designed for Action</h2>
              
              <p className="text-lg text-slate-400 font-medium leading-[1.8] mb-10">
                Our summits transcend passive listening. The architecture of Green Mentors events deliberately favors highly reciprocal knowledge exchange, multi-lateral dialogue, and instantaneous collaboration.
              </p>

              <div className="flex flex-wrap gap-4">
                {EXPERIENCE_FORMAT.map((format, idx) => (
                  <div key={idx} className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-bold text-slate-300 uppercase tracking-wide">
                    <span className="text-emerald-500">{format.icon}</span>
                    {format.title}
                  </div>
                ))}
                <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-800/80 border border-slate-700 text-sm font-bold text-slate-300 uppercase tracking-wide">
                  <span className="text-emerald-500"><GraduationCap className="w-5 h-5"/></span>
                  Youth Participation
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 6. Upcoming Events / Calendar Preview */}
        <section className="py-32 px-8 bg-slate-50 relative border-b border-slate-100" id="calendar">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">Upcoming Gatherings</h2>
                <p className="text-lg text-slate-500 font-medium">Secure your organizational footprint in our next global summit.</p>
              </div>
              <button className="flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 bg-emerald-50 px-6 py-3 rounded-full border border-emerald-100 transition-colors">
                View All Events <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {UPCOMING_MOCKS.map((event) => (
                <div key={event.id} className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-sky-50 text-sky-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md border border-sky-100">
                      {event.status}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                       {event.mode === 'Virtual' ? <Video size={14}/> : <MapPin size={14}/>} {event.mode}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors">{event.title}</h3>
                  
                  <div className="space-y-3 mb-8 flex-grow">
                    <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                      <Calendar size={16} className="text-emerald-500" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                      <Globe size={16} className="text-sky-500" />
                      {event.location}
                    </div>
                  </div>

                  <Link 
                    href="#register"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm text-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    Register Details <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Call to Action */}
        <section className="py-32 px-8 bg-sky-950 relative overflow-hidden" id="register">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-800/40 via-sky-950 to-slate-950" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
              Join the Global Conversation
            </h2>
            <p className="text-sky-100/90 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We formally invite educators, visionary institutions, schools, universities, students, and global partners to participate and shape the dialogue in our upcoming summits.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-sky-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-sky-500/20 hover:bg-sky-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                Register for Events <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="w-full sm:w-auto bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2 shadow-xl">
                Partner With Us
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}