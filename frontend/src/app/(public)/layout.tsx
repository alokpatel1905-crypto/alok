'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Leaf, Mail } from 'lucide-react';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Impact', href: '/impact' },
  { label: 'Accreditation', href: '/accreditation' },
  { label: 'Rankings', href: '/rankings' },
  { label: 'Events', href: '/events' },
  { label: 'Awards', href: '/awards' },
  { label: 'Networks', href: '/networks' },
  { label: 'Support Us', href: '/support' },
  { label: 'Media', href: '/media' },
  { label: 'Contact', href: '/contact' }
];

const SOCIAL_ICONS = {
  Facebook: ({ className, size = 20 }: { className?: string, size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Twitter: ({ className, size = 20 }: { className?: string, size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  Linkedin: ({ className, size = 20 }: { className?: string, size?: number }) => (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  )
};

const Header = () => (
  <header className="pt-20 pb-12 px-8 flex flex-col items-center text-center bg-[#FDFDFD]">
    <div className="flex flex-col items-center max-w-4xl mx-auto">
      <Link href="/" className="w-[88px] h-[88px] bg-emerald-800 rounded-full flex items-center justify-center shadow-lg shadow-emerald-900/10 mb-8 transition-transform hover:scale-105 duration-500 relative group">
        <Leaf className="w-10 h-10 text-white relative z-10 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-full opacity-20 blur-md" />
      </Link>
      
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight mb-3">GREEN MENTORS</h1>
      <p className="text-[12px] md:text-sm font-semibold text-emerald-800 uppercase tracking-[0.25em] mb-10">Global Responsible Education Network</p>
      
      <div className="flex flex-col gap-4 items-center">
        <span className="text-[10px] md:text-[11px] font-bold text-emerald-700 uppercase tracking-[0.15em] bg-emerald-50 px-6 py-2.5 rounded-full border border-emerald-100">
          Special Consultative Status with the United Nations ECOSOC
        </span>
        <span className="text-[15px] border-t border-slate-100 pt-5 md:text-base font-medium text-slate-500">
          Education for a climate-conscious and sustainable future
        </span>
      </div>
    </div>
  </header>
);

const MainNav = ({ isScrolled, currentPath }: { isScrolled: boolean, currentPath: string }) => (
  <nav className={`hidden lg:block w-full z-40 transition-all duration-300 sticky top-0 ${isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-5 shadow-sm" : "bg-[#FDFDFD]/90 backdrop-blur-md py-6 border-b border-slate-100"}`}>
    <ul className="max-w-[1400px] mx-auto px-8 flex justify-center items-center flex-wrap gap-x-8 gap-y-2">
      {NAV_LINKS.filter(l => l.href !== '/').map((link) => {
        const isActive = currentPath === link.href;
        return (
          <li key={link.label}>
            <Link href={link.href} className={`text-[14px] font-semibold transition-colors relative group py-2 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm ${isActive ? 'text-emerald-800' : 'text-slate-600 hover:text-emerald-700'}`}>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-emerald-600 transition-all duration-300 rounded-full ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
);

const FloatingQuickNav = ({ currentPath }: { currentPath: string }) => (
  <aside className="hidden xl:flex flex-col gap-4 fixed right-8 top-1/2 -translate-y-1/2 z-50 pointer-events-none">
    {NAV_LINKS.map((link) => {
      const isActive = currentPath === link.href;
      return (
        <Link key={link.label} href={link.href} className="group flex items-center justify-end gap-4 outline-none pointer-events-auto" aria-label={`Navigate to ${link.label}`}>
          <span className={`text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-xl px-3 py-1.5 rounded-md transition-all duration-300 border ${isActive ? 'text-emerald-800 bg-emerald-50/90 border-emerald-200 translate-x-0 opacity-100 shadow-sm' : 'text-slate-500 bg-white/80 border-slate-200/50 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0'}`}>
            {link.label}
          </span>
          <div className={`w-2 h-2 rounded-full border transition-all duration-300 shadow-sm ${isActive ? 'border-emerald-600 bg-emerald-600 scale-125' : 'border-slate-300 bg-white group-hover:bg-emerald-500 group-hover:border-emerald-500 group-hover:scale-125 group-focus-visible:bg-emerald-500 group-focus-visible:scale-125'}`} />
        </Link>
      );
    })}
  </aside>
);

const MobileNav = ({ currentPath }: { currentPath: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  return (
    <>
      <div className="lg:hidden fixed top-6 right-6 z-[100]">
        <button onClick={() => setIsOpen(!isOpen)} className="p-3 bg-white shadow-xl shadow-slate-200/50 rounded-full text-emerald-800 border border-slate-100 hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-[90] flex flex-col pt-32 px-10 overflow-y-auto lg:hidden animate-in fade-in slide-in-from-right-8 duration-300">
          <ul className="flex flex-col gap-6 pb-32">
            {NAV_LINKS.map(link => {
              const isActive = currentPath === link.href;
              return (
                <li key={link.label}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className={`text-3xl font-bold transition-colors border-b border-slate-100 pb-4 block ${isActive ? 'text-emerald-700' : 'text-slate-800 hover:text-emerald-700'}`}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

const MiniFooterStrip = () => (
  <div className="bg-slate-950 py-10 px-8 border-t border-b border-slate-800/50 mt-auto">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <Link href="/" className="flex items-center gap-4 group">
        <div className="w-10 h-10 rounded-full border border-emerald-800/50 flex items-center justify-center bg-slate-900 group-hover:bg-emerald-900/50 transition-colors">
          <Leaf className="w-4 h-4 text-emerald-600" />
        </div>
        <span className="font-black text-[15px] tracking-widest text-slate-200 uppercase">Green Mentors</span>
      </Link>
      <div className="w-full h-px bg-slate-800/50 md:hidden" />
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
        <Link href="/about" className="hover:text-emerald-500 transition-colors">Our Programs</Link>
        <Link href="/rankings" className="hover:text-emerald-500 transition-colors">Global Rankings</Link>
        <Link href="/awards" className="hover:text-emerald-500 transition-colors">Awards</Link>
        <Link href="/contact" className="hover:text-emerald-500 transition-colors">Support Us</Link>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-slate-950 py-20 px-8 relative text-slate-500">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
      <div className="flex flex-col items-center lg:items-start gap-4">
        <p className="text-[15px] font-medium tracking-wide max-w-md leading-[1.8]">
          Building the blueprint for schools, universities, and educators to design, execute, and sustain zero-carbon educational ecosystems globally.
        </p>
        <a href="mailto:contact@greenmentors.org" className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm mt-3 hover:text-emerald-400 transition-colors">
          <Mail size={16} />
          info@greenmentors.world
        </a>
      </div>
      <div className="flex flex-col items-center lg:items-end gap-8">
        <div className="flex gap-6">
          <Link href="#twitter" aria-label="Twitter" className="text-slate-600 hover:text-slate-300 transition-colors"><SOCIAL_ICONS.Twitter size={22} /></Link>
          <Link href="#linkedin" aria-label="LinkedIn" className="text-slate-600 hover:text-slate-300 transition-colors"><SOCIAL_ICONS.Linkedin size={22} /></Link>
          <Link href="#facebook" aria-label="Facebook" className="text-slate-600 hover:text-slate-300 transition-colors"><SOCIAL_ICONS.Facebook size={22} /></Link>
        </div>
        <p className="text-[12px] font-medium tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Green Mentors. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname() || '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <FloatingQuickNav currentPath={pathname} />
      <MobileNav currentPath={pathname} />
      
      <Header />
      <MainNav isScrolled={isScrolled} currentPath={pathname} />
      
      <main className="flex-grow">
        {children}
      </main>

      <MiniFooterStrip />
      <Footer />
    </div>
  );
}