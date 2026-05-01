'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Leaf, Mail, ArrowRight, Instagram, Twitter, Linkedin, Facebook, Heart, Home, GraduationCap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/utils';
import { apiFetch } from '@/lib/api';

interface MenuItem {
  id?: string;
  name: string;
  href: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Impact', href: '/impact' },
    { name: 'Milestones', href: '/milestones' },
    { name: 'Accreditation', href: '/accreditation' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'Events', href: '/events' },
    { name: 'Awards', href: '/awards' },
    { name: 'Networks', href: '/networks' },
    { name: 'Support Us', href: '/support' },
    { name: 'Media', href: '/media' },
    { name: 'Contact', href: '/contact' },
  ]);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    
    const fetchMenu = async () => {
      try {
        const data = await apiFetch('/menu');
        if (data && data.length > 0) setMenuItems(data);
      } catch (err) {
        console.warn('Failed to fetch menu:', err);
      }
    };
    fetchMenu();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full bg-white relative">
      {/* 1. TOP BRAND SECTION (Hidden when scrolled & sticky) */}
      <div className={cn(
        "transition-all duration-500 overflow-hidden",
        isScrolled ? "h-0 opacity-0" : "py-4 lg:py-12 opacity-100"
      )}>
        <Container>
          <div className="flex flex-col items-center text-center space-y-3 lg:space-y-4">
            {/* TITLES */}
            <div className="space-y-0.5 lg:space-y-1">
              <h1 className="text-xl lg:text-4xl font-black tracking-tight text-gray-900 uppercase">
                Green <span className="text-[#16a34a]">Mentors</span>
              </h1>
              <p className="text-[9px] lg:text-sm font-bold tracking-[0.1em] lg:tracking-[0.2em] text-gray-500 uppercase">
                Global Responsible Education Network
              </p>
            </div>

            {/* UN BADGE */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 lg:px-4 lg:py-2 bg-green-50 rounded-full border border-green-100 shadow-sm transition-all hover:bg-green-100">
              <Globe className="text-[#16a34a]" size={12} />
              <span className="text-[8px] lg:text-[11px] font-bold text-[#16a34a] uppercase tracking-wider">
                Special Consultative Status with the United Nations ECOSOC
              </span>
            </div>

            {/* TAGLINE (Hidden on Mobile) */}
            <p className="hidden lg:block text-[10px] font-medium text-gray-400 italic">
              "Education for a climate-conscious and sustainable future"
            </p>
          </div>
        </Container>
      </div>

      {/* 2. MAIN NAVIGATION (Glass Sticky) */}
      <nav className={cn(
        "w-full z-50 transition-all duration-500 ease-in-out",
        isScrolled 
          ? "fixed top-2 lg:top-4 left-1/2 -translate-x-1/2 w-[98%] lg:w-[95%] max-w-7xl px-3 lg:px-4 py-1.5 lg:py-2 bg-white/60 backdrop-blur-2xl rounded-xl lg:rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-black/5" 
          : "relative py-2.5 lg:py-4 bg-white border-y border-gray-100"
      )}>
        <Container>
          <div className="flex items-center justify-between lg:justify-center relative">
            {/* DESKTOP MENU */}
            <ul className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <li key={item.id || item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all relative group",
                      pathname === item.href ? "text-[#16a34a]" : "text-gray-600 hover:text-[#16a34a]"
                    )}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {/* ACTIVE UNDERLINE */}
                    <span className={cn(
                      "absolute bottom-0 left-5 right-5 h-0.5 bg-[#16a34a] transition-all duration-300",
                      pathname === item.href ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-75"
                    )} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* MOBILE TOGGLE */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:text-[#16a34a] transition-all ml-auto"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </Container>
      </nav>

      {/* 3. MOBILE MENU OVERLAY (Compact Glass Card) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="fixed inset-x-4 top-20 bottom-10 lg:hidden bg-white/90 backdrop-blur-3xl z-[60] rounded-3xl border border-white/50 shadow-2xl flex flex-col overflow-hidden max-h-[65vh]"
          >
            {/* ATMOSPHERIC GRAIN */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")` }} />
            
            <div className="p-5 flex flex-col h-full relative z-10">
              <div className="flex-grow overflow-y-auto pr-2 space-y-1 scrollbar-hide">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.id || item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between py-3 px-4 rounded-xl transition-all",
                        pathname === item.href 
                          ? "bg-[#16a34a]/10 text-[#16a34a]" 
                          : "text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      <span className="text-[11px] font-black uppercase tracking-[0.15em]">{item.name}</span>
                      {pathname === item.href && <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-4 mt-2 border-t border-gray-100">
                <Button className="w-full bg-[#16a34a] hover:bg-green-700 text-white rounded-xl py-5 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-green-100">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = () => (
  <footer className="relative bg-[#061B14] text-white pt-20 lg:pt-32 pb-10 lg:pb-16 overflow-hidden border-t border-white/5">
    {/* SUBTLE BACKGROUND GRID */}
    <div className="absolute inset-0 opacity-[0.02] lg:opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

    {/* VIBRANT ACCENT BLOBS */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -tr-40" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-flora/5 blur-[100px] rounded-full -bl-40" />

    <Container className="relative z-10">
      <div className="grid lg:grid-cols-12 gap-12 mb-24">
        {/* BENTO COL 1: BRAND & MISSION (4 Cols) */}
        <div className="lg:col-span-4 space-y-10">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-flora rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-500">
              <Leaf className="text-primary" size={28} />
            </div>
            <span className="font-display font-black text-3xl tracking-tighter leading-none">
              GREEN <br /> <span className="text-flora">MENTORS</span>
            </span>
          </Link>
          <p className="text-white/40 leading-relaxed font-medium text-lg max-w-sm">
            Pioneering the global transition to zero-carbon educational ecosystems through nature-inspired design and technology.
          </p>
          <div className="flex gap-5">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-flora hover:text-primary transition-all duration-300"
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>

        {/* BENTO COL 2: QUICK LINKS (2 Cols) */}
        <div className="lg:col-span-2 space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-flora/60">Ecosystem</h4>
          <ul className="space-y-4">
            {[
              { label: 'About', href: '/about' },
              { label: 'Impact', href: '/impact' },
              { label: 'Milestones', href: '/milestones' },
              { label: 'Programs', href: '/programs' },
              { label: 'Accreditation', href: '/accreditation' },
              { label: 'Rankings', href: '/rankings' }
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-flora opacity-0 group-hover:opacity-100 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* BENTO COL 3: TRUST & RECOGNITION (3 Cols) */}
        <div className="lg:col-span-3 space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-flora/60">Verification</h4>
          <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/[0.05] transition-colors">
            <div className="flex items-center gap-3 text-flora">
              <Globe size={20} />
              <span className="text-xs font-black uppercase tracking-widest">UN ECOSOC</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed font-medium">
              Special Consultative Status with the United Nations Economic and Social Council since 2021.
            </p>
            <div className="flex items-center justify-between">
              <div className="px-3 py-1 rounded-full bg-flora/10 text-flora text-[8px] font-black uppercase tracking-widest">Certified</div>
              <ArrowRight size={14} className="text-white/20" />
            </div>
          </div>
        </div>

        {/* BENTO COL 4: NEWSLETTER (3 Cols) */}
        <div className="lg:col-span-3 space-y-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-flora/60">Stay Rooted</h4>
          <div className="space-y-6">
            <p className="text-sm text-white/40 leading-relaxed font-medium">
              Join 50k+ eco-educators receiving our weekly insights.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-flora transition-all text-sm font-medium"
              />
              <Button className="w-full rounded-2xl bg-flora text-primary font-black uppercase tracking-widest py-6 hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                Join Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM BAR */}
      <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
          <span>&copy; {new Date().getFullYear()} Green Mentors Global</span>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span>Made for Earth</span>
        </div>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">
          <Link href="/privacy" className="hover:text-flora transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-flora transition-colors">Terms</Link>
          <Link href="/cookies" className="hover:text-flora transition-colors">Cookies</Link>
        </div>
      </div>
    </Container>
  </footer>
);

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* GLOBAL BACKGROUND BLOOMS */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-primary/3 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[40vw] h-[40vw] bg-flora/3 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

      <Navbar />

      <main className={cn(
        "flex-grow relative z-10 transition-all duration-700"
      )}>
        <div className="max-w-[1440px] mx-auto bg-white/40 shadow-[0_0_100px_-20px_rgba(0,0,0,0.05)] border-x border-white/20">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}