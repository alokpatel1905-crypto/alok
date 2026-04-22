'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, Leaf, Mail, ArrowRight, Instagram, Twitter, Linkedin, Facebook, Heart, Home, GraduationCap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { cn } from '@/lib/utils';

const NAV_GROUPS = [
  { 
    label: 'Mission', 
    icon: Leaf,
    links: [
      { label: 'About', href: '/about' },
      { label: 'Impact', href: '/impact' },
      { label: 'Milestones', href: '/milestones' }
    ]
  },
  { 
    label: 'Education', 
    icon: Globe,
    links: [
      { label: 'Programs', href: '/programs' },
      { label: 'Accreditation', href: '/accreditation' },
      { label: 'Rankings', href: '/rankings' }
    ]
  },
  { 
    label: 'Updates', 
    icon: Mail,
    links: [
      { label: 'Events', href: '/events' },
      { label: 'Media', href: '/media' },
      { label: 'Blog', href: '/blog' }
    ]
  },
  { 
    label: 'Join', 
    icon: Heart,
    links: [
      { label: 'Support Us', href: '/support' },
      { label: 'Contact', href: '/contact' }
    ]
  }
];

const Navbar = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: { 
  isMobileMenuOpen: boolean; 
  setIsMobileMenuOpen: (val: boolean) => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 lg:p-5 pointer-events-none">
      {/* 0. TOP SHADOW OVERLAY FOR VISIBILITY */}
      <div className="absolute top-0 left-0 right-0 h-24 lg:h-32 bg-gradient-to-b from-black/20 via-black/5 to-transparent pointer-events-none" />

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-auto flex items-center justify-between px-5 lg:px-8 py-2.5 lg:py-3 rounded-[1.5rem] lg:rounded-[2rem] transition-all duration-700 relative",
          isScrolled 
            ? "w-[98%] lg:w-[90%] max-w-6xl bg-primary/90 backdrop-blur-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] border border-white/10" 
            : "w-[98%] lg:w-[92%] max-w-[1200px] bg-white/20 backdrop-blur-2xl border border-white/30 shadow-[0_20px_40px_rgba(0,0,0,0.1)]"
        )}
      >
        {/* 1. LOGO & STATUS */}
        <div className="flex items-center gap-4 lg:gap-8">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
            <div className="w-9 h-9 lg:w-11 lg:h-11 bg-flora rounded-lg lg:rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-all duration-500 ring-2 lg:ring-4 ring-white/10">
              <Leaf className="text-primary" size={20} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-lg lg:text-xl font-black tracking-tighter leading-none transition-colors drop-shadow-sm text-white"
              )}>
                Green <span className="text-flora">Mentors</span>
              </span>
              <div className="hidden lg:flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-flora animate-pulse" />
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-[0.3em] opacity-50 text-white"
                )}>
                  Eco-Live 2026
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* 2. DESKTOP NAVIGATION (Centered) */}
        <div className="hidden xl:flex items-center bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-black/5">
          <ul className="flex items-center gap-2">
            <li 
              className="relative"
              onMouseEnter={() => setActiveGroup('Home')}
              onMouseLeave={() => setActiveGroup(null)}
            >
              <Link 
                href="/"
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-500 cursor-pointer relative group/btn",
                  isScrolled 
                    ? (pathname === "/" ? "text-flora" : "text-white hover:text-flora") 
                    : (pathname === "/" ? "text-white" : "text-white hover:text-white")
                )}
              >
                <Home size={16} className={cn(
                  "transition-all duration-500 group-hover/btn:scale-125 drop-shadow-sm", 
                  isScrolled 
                    ? (pathname === "/" ? "text-flora" : "text-flora") 
                    : (pathname === "/" ? "text-white" : "text-white")
                )} />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">Home</span>
                
                <AnimatePresence>
                  {activeGroup === 'Home' && (
                    <motion.div 
                      layoutId="navbar-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className={cn(
                        "absolute inset-0 rounded-full shadow-lg border border-white/20",
                        isScrolled ? "bg-white/10 shadow-flora/10" : "bg-white/20"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            </li>

            {NAV_GROUPS.map((group) => (
              <li 
                key={group.label}
                onMouseEnter={() => setActiveGroup(group.label)}
                onMouseLeave={() => setActiveGroup(null)}
                className="relative"
              >
                <div className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-500 cursor-pointer relative group/btn",
                  isScrolled 
                    ? "text-white hover:text-flora" 
                    : "text-white hover:text-white"
                )}>
                  <group.icon size={16} className={cn("transition-all duration-500 group-hover/btn:scale-125 drop-shadow-sm", isScrolled ? "text-flora" : "text-white")} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-sm">{group.label}</span>
                  
                  {/* SLIDING PILL BACKGROUND */}
                  <AnimatePresence>
                    {activeGroup === group.label && (
                      <motion.div 
                        layoutId="navbar-pill"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className={cn(
                          "absolute inset-0 rounded-full shadow-lg border border-white/20",
                          isScrolled ? "bg-white/10 shadow-flora/10" : "bg-white/20"
                        )}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {activeGroup === group.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 10, rotateX: -15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 perspective-1000"
                    >
                      <div className={cn(
                        "rounded-[2.5rem] p-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-white relative overflow-hidden",
                        isScrolled ? "bg-primary/95 backdrop-blur-3xl" : "bg-white/95 backdrop-blur-2xl"
                      )}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-flora" />
                        {group.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                              "flex items-center justify-between px-6 py-5 rounded-[1.5rem] text-sm font-black transition-all group/link",
                              pathname === link.href 
                                ? "bg-flora text-primary shadow-lg shadow-flora/20" 
                                : (isScrolled ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-foreground/60 hover:bg-primary/5 hover:text-primary")
                            )}
                          >
                            {link.label}
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                              pathname === link.href ? "bg-primary/20" : (isScrolled ? "bg-white/10 group-hover/link:bg-white/20" : "bg-primary/5 group-hover/link:bg-primary/10")
                            )}>
                              <ArrowRight size={14} className={cn(
                                "transition-transform duration-500",
                                pathname === link.href ? (isScrolled ? "text-primary" : "text-primary") : (isScrolled ? "text-white" : "text-primary group-hover/link:translate-x-1")
                              )} />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. CTA & MOBILE TOGGLE */}
        <div className="flex items-center gap-6">
          <Button 
            variant="primary" 
            size="xl" 
            className="hidden md:flex rounded-full bg-gradient-to-r from-primary to-flora hover:scale-110 shadow-2xl px-8 py-4 text-sm font-black uppercase tracking-widest border-none"
          >
            Get Started
          </Button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "xl:hidden w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg",
              isScrolled ? "bg-primary/10 text-primary" : "bg-white/20 text-white backdrop-blur-md border border-white/20"
            )}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* 4. MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[60] xl:hidden"
          >
            <div className="absolute inset-0 bg-primary/95 backdrop-blur-3xl" />
            
            <div className="relative h-full flex flex-col p-8 pt-24 overflow-y-auto">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white"
              >
                <X size={24} />
              </button>

              <div className="space-y-12 mb-20">
                {NAV_GROUPS.map((group, i) => (
                  <motion.div 
                    key={group.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex items-center gap-4 text-flora font-black uppercase tracking-[0.5em] text-[10px] mb-6">
                      <div className="w-10 h-[2px] bg-flora rounded-full" /> {group.label}
                    </div>
                    <ul className="space-y-6">
                      {group.links.map((link, j) => (
                        <motion.li 
                          key={link.href}
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (i * 0.1) + (j * 0.05) }}
                        >
                          <Link 
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "text-5xl font-black transition-all leading-none tracking-tighter inline-block",
                              pathname === link.href 
                                ? "text-flora" 
                                : "text-white/30 hover:text-white"
                            )}
                          >
                            {link.label}.
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-white/5 space-y-10">
                <Button 
                  size="xl" 
                  className="w-full rounded-2xl py-10 text-xl font-black uppercase tracking-widest shadow-3d bg-flora text-primary" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Movement <ArrowRight className="ml-4" />
                </Button>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-white/20">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                      <Icon key={i} size={24} className="hover:text-flora transition-colors cursor-pointer" />
                    ))}
                  </div>
                  <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
                    &copy; 2026 Green Mentors
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
            {NAV_GROUPS[0].links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-bold flex items-center gap-2 group">
                  <div className="w-1 h-1 rounded-full bg-flora opacity-0 group-hover:opacity-100 transition-all" />
                  {link.label}
                </Link>
              </li>
            ))}
            {NAV_GROUPS[1].links.map((link) => (
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* GLOBAL BACKGROUND BLOOMS */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vw] bg-primary/3 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[40vw] h-[40vw] bg-flora/3 blur-[120px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none z-0" />

      <Navbar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <main className="flex-grow pb-24 xl:pb-0 relative z-10">
        <div className="max-w-[1440px] mx-auto bg-white/40 shadow-[0_0_100px_-20px_rgba(0,0,0,0.05)] border-x border-white/20">
          {children}
        </div>
      </main>

      {/* MOBILE BOTTOM NAV - NATIVE APP FEEL */}
      <div className="xl:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md h-16 bg-primary/90 backdrop-blur-2xl rounded-2xl z-50 flex justify-around items-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-2">
        {[
          { icon: Home, label: 'Home', href: '/' },
          { icon: GraduationCap, label: 'Programs', href: '/programs' },
          { icon: TrendingUp, label: 'Impact', href: '/impact' },
          { icon: isMobileMenuOpen ? X : Menu, label: 'More', action: () => setIsMobileMenuOpen(!isMobileMenuOpen) }
        ].map((item, i) => (
          item.href ? (
            <Link 
              key={i} 
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                pathname === item.href ? "text-flora scale-110" : "text-white/40 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            </Link>
          ) : (
            <button 
              key={i} 
              onClick={item.action}
              className={cn(
                "flex flex-col items-center gap-1 transition-all",
                isMobileMenuOpen ? "text-flora scale-110" : "text-white/40 hover:text-white"
              )}
            >
              <item.icon size={20} />
              <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
            </button>
          )
        ))}
      </div>

      <Footer />
    </div>
  );
}