'use client';

import React, { useState, useEffect } from 'react';
import { Newspaper, FileText, Camera, Radio, ArrowRight, Download, BookOpen, Quote, ShieldCheck, Globe, Star, PlayCircle, Eye, Share2 } from 'lucide-react';
import Link from 'next/link';

const FEATURED_MEDIA = [
  {
    id: "news",
    title: "News & Announcements",
    subtitle: "Updates from Across the Green Mentors Ecosystem",
    desc: "Stay informed with definitive organizational updates, powerful new institutional partnerships, massive milestone announcements, and real-time accreditation or ranking updates.",
    icon: <Radio className="w-10 h-10 text-emerald-700" strokeWidth={1.5} />,
    color: "emerald"
  },
  {
    id: "press",
    title: "Press & Media Coverage",
    subtitle: "External Recognition and Public Visibility",
    desc: "Explore highly vetted external articles, high-profile interviews, global features, and prestigious institutional press mentions validating Green Mentors initiatives globally.",
    icon: <Newspaper className="w-10 h-10 text-teal-700" strokeWidth={1.5} />,
    color: "teal"
  },
  {
    id: "publications",
    title: "Publications & Reports",
    subtitle: "Thought Leadership for Sustainability-Led Education",
    desc: "Access premier intellectual capital including comprehensive white papers, global research summaries, robust educational frameworks, and sophisticated policy-oriented resources.",
    icon: <FileText className="w-10 h-10 text-sky-700" strokeWidth={1.5} />,
    color: "sky"
  },
  {
    id: "gallery",
    title: "Gallery & Visual Highlights",
    subtitle: "Moments from Events, Networks, and Recognition",
    desc: "Experience profound visual storytelling capturing paramount conference moments, elite institutional gatherings, and high-impact partnership collaborations across the world.",
    icon: <Camera className="w-10 h-10 text-indigo-700" strokeWidth={1.5} />,
    color: "indigo"
  }
];

const LATEST_UPDATES = [
  { tag: "Announcement", title: "Green Mentors Launches 2026 Global Ranking Framework", date: "Oct 12, 2026", readTime: "4 min read" },
  { tag: "Partnership", title: "United Nations Environmental Assembly Welcomes Green Schools", date: "Sep 28, 2026", readTime: "3 min read" },
  { tag: "Event", title: "Highlights from the World Education Forum in Davos", date: "Sep 15, 2026", readTime: "6 min read" },
  { tag: "Publication", title: "New Whitepaper: The Economics of Climate-Conscious Campuses", date: "Aug 30, 2026", readTime: "12 min read" },
  { tag: "Recognition", title: "Top 50 Green Educators Awarded in Annual Global Ceremony", date: "Aug 14, 2026", readTime: "5 min read" },
  { tag: "Media Mention", title: "Times Higher Ed Features Green Mentors Audit System", date: "Jul 22, 2026", readTime: "2 min read" }
];

const PRESS_RESOURCES = [
  { title: "Brand Assets & Logos", format: "ZIP / 4.2 MB", icon: <Download className="w-6 h-6" /> },
  { title: "Organization Profile", format: "PDF / 1.1 MB", icon: <FileText className="w-6 h-6" /> },
  { title: "Leadership Biographies", format: "PDF / 2.3 MB", icon: <UsersIcon className="w-6 h-6" /> },
  { title: "Press Contact Direct", format: "vCard / 12 KB", icon: <ContactIcon className="w-6 h-6" /> },
  { title: "Event Media Pack 2026", format: "ZIP / 45 MB", icon: <Camera className="w-6 h-6" /> },
  { title: "Publications Archive", format: "Portal Access", icon: <BookOpen className="w-6 h-6" /> }
];

function UsersIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  );
}

function ContactIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  );
}

export default function MediaPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#FAF9F6] font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-950 flex flex-col pt-24">
      
      {/* 1. Top Hero / Page Intro */}
      <header className="relative pt-16 pb-32 px-8 overflow-hidden bg-slate-900 border-b-4 border-slate-700 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnPjxwYXRoIGQ9Ik0zNiAzNHYtbDItMiAyLTJ2NGgtNHptMC0xNHY0aC00di0ybDItMiAyLTJ6bS0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMTggMzRsMiAyIDItMnY0aC00di00em0xNCAwdi0xbDIgMnYyaC00di0xbDItMnpNMzIgMTZ2NGgtNHYtNGg0em0tMTQgMHY0aC00di00aDR6IiBmaWxsPSIjRkZGRkZGIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <nav className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-300">Media</span>
          </nav>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-sm">
            <Newspaper size={14} className="text-emerald-500" />
            Media & Publications
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Stories, Insights, and <br className="hidden md:block"/> Global Visibility
          </h1>
          
          <p className="text-xl font-medium text-slate-400 max-w-3xl leading-relaxed">
            A centralized, elite repository showcasing Green Mentors news, decisive press features, intellectual publications, visual hallmarks, and institutional knowledge resources advancing sustainability worldwide.
          </p>
        </div>
      </header>

      <main className="flex-grow">
        
        {/* 2. Introduction Section */}
        <section className="py-24 px-8 bg-white relative">
          <div className="max-w-4xl mx-auto text-center">
             <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-8 shadow-sm">
                <Globe className="w-8 h-8 text-slate-600" />
             </div>
            <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.8]">
              Radical media visibility is functionally imperative for global systems change. Compelling stories, stringent publications, and transparent reporting actively amplify our mission impact. Through this dedicated channel, Green Mentors transparently shares profound milestones, architectural partnerships, and unyielding thought leadership with the world.
            </p>
          </div>
        </section>

        {/* 7. Media Impact / Visibility Strip */}
        <div className="bg-[#FAF9F6] border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-8 py-10 flex justify-center flex-wrap gap-x-12 gap-y-6">
            {["Global Visibility", "Knowledge Sharing", "Institutional Recognition", "Sustainability Dialogue", "Public Engagement"].map((label, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-700 font-bold text-xs uppercase tracking-[0.15em]">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Featured Media Highlights (Core Section) */}
        <section className="py-32 px-8 bg-white" id="featured">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Ecosystem Media</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {FEATURED_MEDIA.map((media) => (
                <div key={media.id} className="bg-[#FAF9F6] border border-slate-200 rounded-[2.5rem] p-10 hover:bg-white hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col group h-full">
                  
                  <div className="flex items-center justify-between mb-8">
                     <div className={`w-20 h-20 bg-${media.color}-50 rounded-full flex items-center justify-center border border-${media.color}-100 group-hover:scale-110 group-hover:bg-${media.color}-600 group-hover:text-white transition-all duration-500`}>
                       {media.icon}
                     </div>
                     <ArrowRight className="w-8 h-8 text-slate-300 group-hover:text-slate-600 transition-colors -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3">{media.title}</h3>
                    <h4 className={`text-sm font-bold text-${media.color}-600 mb-6 uppercase tracking-widest`}>{media.subtitle}</h4>
                    <p className="text-slate-600 font-medium leading-[1.8] mb-10">
                      {media.desc}
                    </p>
                  </div>
                  
                  <button className="bg-white text-slate-700 border border-slate-200 w-full py-4 rounded-xl font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all text-center">
                    {media.id === 'news' ? 'View Updates' : media.id === 'press' ? 'Explore Coverage' : media.id === 'publications' ? 'Read Publications' : 'View Gallery'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Latest Articles / News Grid */}
        <section className="py-32 px-8 bg-slate-900 text-white relative border-y border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
                  <PlayCircle size={16} /> Live Newsroom
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Latest Updates</h2>
              </div>
              <button className="flex items-center gap-2 text-white font-bold hover:text-emerald-400 border border-slate-700 px-6 py-3 rounded-full hover:border-emerald-500 transition-colors">
                View Publication Archive <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LATEST_UPDATES.map((post, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-[2rem] p-8 hover:border-emerald-500/50 hover:-translate-y-1 transition-all group flex flex-col">
                  
                  <div className="flex items-center justify-between mb-6">
                     <span className="px-3 py-1 bg-slate-900 rounded-md text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                       {post.tag}
                     </span>
                     <span className="text-xs text-slate-500 font-medium">{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 mb-6 leading-relaxed group-hover:text-white flex-grow">
                    {post.title}
                  </h3>

                  <div className="flex items-center justify-between border-t border-slate-700 pt-6 mt-auto">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{post.date}</span>
                     <button className="text-emerald-500 hover:text-emerald-400 font-bold text-sm tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
                       Read More <ArrowRight size={14} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Thought Leadership / Insights Section */}
        <section className="py-32 px-8 bg-white border-b border-slate-100">
           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
              <div className="lg:w-1/2">
                 <div className="inline-flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
                  <BookOpen size={16} /> Intellectual Capital
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-8">Insights for a Sustainable Future</h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
                    Green Mentors does not merely report news; we fundamentally shape the international dialogue surrounding responsible education architecture.
                 </p>
                 <ul className="space-y-4 mb-10">
                    {["Climate-Conscious Institutions", "Sustainability Integration Frameworks", "Future-Ready Pedagogical Learning", "Global Educational Transformation"].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                           <ShieldCheck className="w-5 h-5 text-emerald-500" />
                           {item}
                       </li>
                    ))}
                 </ul>
                 <button className="bg-slate-900 text-white border border-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all text-center flex items-center gap-2">
                    Access Whitepapers <ArrowRight size={18} />
                 </button>
              </div>

              <div className="lg:w-1/2 w-full">
                 <div className="p-10 md:p-16 rounded-[3rem] bg-emerald-50 border border-emerald-100 relative">
                     <Quote className="w-16 h-16 text-emerald-200 absolute top-8 right-8" />
                     <p className="text-2xl font-black text-slate-900 leading-snug mb-8 relative z-10 italic">
                        "The most critical transformation of our time isn't technological—it is educational. How we teach today dictates what survives tomorrow."
                     </p>
                     <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white"><Star className="w-5 h-5"/></div>
                         <div>
                             <h4 className="font-bold text-slate-900">Executive Insight</h4>
                             <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Global Strategy Publication, 2026</p>
                         </div>
                     </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 8. Gallery Preview Section */}
        <section className="py-32 px-8 bg-[#FAF9F6]">
           <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Moments from the Movement</h2>
                 <p className="text-lg text-slate-500 font-medium">Visualizing global collaboration and institutional excellence.</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
                 {/* Abstract Photo Placeholders doing a Masonry-like grid */}
                 <div className="col-span-2 row-span-2 rounded-[2rem] bg-slate-200 border border-slate-300 relative overflow-hidden group">
                     {/* Image Placeholder */}
                     <div className="absolute inset-0 bg-slate-300/50 flex items-center justify-center mix-blend-multiply transition-transform duration-700 group-hover:scale-110">
                        <Camera className="w-12 h-12 text-slate-100 opacity-50" />
                     </div>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                         <span className="text-white text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Global Awards</span>
                         <h4 className="text-white font-bold text-xl">Annual Gala 2026</h4>
                     </div>
                 </div>
                 
                 <div className="col-span-1 row-span-1 rounded-[2rem] bg-emerald-100 border border-emerald-200 relative overflow-hidden group">
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-6">
                         <h4 className="text-white font-bold text-sm">Davos Forum</h4>
                     </div>
                 </div>

                 <div className="col-span-1 row-span-2 rounded-[2rem] bg-sky-100 border border-sky-200 relative overflow-hidden">
                     <div className="absolute inset-0 flex items-center justify-center"><Globe className="w-16 h-16 text-sky-200" /></div>
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-6">
                         <h4 className="text-white font-bold text-sm">NYC Climate Panel</h4>
                     </div>
                 </div>

                 <div className="col-span-1 row-span-1 rounded-[2rem] bg-amber-100 border border-amber-200 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-6">
                         <h4 className="text-white font-bold text-sm">Youth Summit</h4>
                     </div>
                 </div>
              </div>
           </div>
        </section>

        {/* 5. Press Kit / Media Resources Section */}
        <section className="py-32 px-8 bg-slate-900 border-t border-slate-800 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">Media Resources</h2>
               <p className="text-lg text-slate-400 font-medium">Official organizational assets authorized for press and publication usage.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PRESS_RESOURCES.map((resource, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex flex-row items-center justify-between group hover:border-emerald-500 hover:bg-slate-800/80 transition-all cursor-pointer">
                   <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-center text-emerald-400">
                         {resource.icon}
                       </div>
                       <div>
                           <h4 className="font-bold text-slate-100 text-sm">{resource.title}</h4>
                           <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{resource.format}</p>
                       </div>
                   </div>
                   <Download className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
                 <button className="bg-white text-slate-900 border border-white px-8 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all text-center flex items-center gap-2">
                    Download Master Press Kit
                 </button>
            </div>
          </div>
        </section>

        {/* 9. Call to Action */}
        <section className="py-32 px-8 bg-emerald-900 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/80 via-emerald-950 to-slate-950" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 text-white mb-8 border border-slate-600 shadow-xl shadow-slate-900/50">
              <Eye className="w-8 h-8" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">
              Explore the Story of Green Mentors
            </h2>
            <p className="text-emerald-100/80 text-lg md:text-xl font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              We securely invite institutions, prestigious journalists, elite educators, and global partners to follow our updates, access vital resources, and intimately connect with our mission via deep media content.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <button className="w-full sm:w-auto bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-emerald-500/20 hover:bg-emerald-400 hover:-translate-y-1 transition-all duration-300 focus:outline-none flex justify-center items-center gap-2">
                View All Updates <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="w-full sm:w-auto bg-slate-900 text-white border border-slate-700 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300 shadow-xl text-center">
                Contact the Media Team
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
