'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  ChevronDown,
  Instagram,
  Leaf,
  Linkedin,
  Menu,
  Twitter,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MenuItem {
  name: string;
  href: string;
}

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Awards', href: '/awards' },
    { name: 'Impact', href: '/impact' },
    { name: 'Milestones', href: '/milestones' },
    { name: 'Accreditation', href: '/accreditation' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'Events', href: '/events' },
    { name: 'Media', href: '/media' },
    { name: 'Blog', href: '/blog' },
    { name: 'Community', href: '/community' },
    { name: 'Networks', href: '/networks' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide public navbar on admin and login pages
  if (pathname?.startsWith('/admin') || pathname === '/login') return null;

  return (
    <header className="fixed left-0 top-0 z-[100] w-full transition-all duration-300">
      <nav className={cn(
        "w-full border-b transition-all duration-300",
        isScrolled
          ? "border-black/10 bg-white/95 py-3 shadow-sm backdrop-blur-xl"
          : "border-black/5 bg-white/90 py-4 backdrop-blur-md"
      )}>
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#16351f] text-[#8ff0a4] shadow-sm">
                <Leaf size={20} />
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-black text-[#0F172A] transition-colors sm:text-xl">
                  <span className="text-[#21D469]">GREEN</span> MENTORS
                </span>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#0F172A]/50">Sustainable Education</span>
              </div>
            </Link>

            <ul className="hidden items-center gap-3 lg:flex xl:gap-4">
              {menuItems.slice(0, 7).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative whitespace-nowrap rounded-md px-2 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-all",
                      pathname === item.href ? "text-[#21D469]" : "text-[#0F172A]/60 hover:text-[#0F172A]"
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      "absolute bottom-0 left-2 h-[2px] w-0 bg-[#21D469] transition-all duration-300 group-hover:w-[calc(100%-1rem)]",
                      pathname === item.href && "w-[calc(100%-1rem)]"
                    )} />
                  </Link>
                </li>
              ))}
              
              <li className="relative group/more">
                <button className="flex items-center gap-2 rounded-md px-2 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#0F172A]/60 transition-all hover:text-[#0F172A]">
                  More <ChevronDown size={12} className="group-hover/more:rotate-180 transition-transform" />
                </button>
                <div className="pointer-events-none absolute left-0 top-full z-[110] pt-4 opacity-0 translate-y-2 transition-all duration-200 group-hover/more:pointer-events-auto group-hover/more:translate-y-0 group-hover/more:opacity-100">
                  <div className="grid min-w-[240px] grid-cols-1 gap-2 rounded-lg border border-black/10 bg-white/95 p-3 shadow-premium backdrop-blur-xl">
                    {menuItems.slice(7).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "group/link flex items-center justify-between rounded-md px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition-all hover:bg-[#21D469]/10 hover:text-[#132018]",
                          pathname === item.href ? "text-[#21D469]" : "text-[#0F172A]/40"
                        )}
                      >
                        {item.name}
                        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            <div className="hidden items-center gap-3 lg:flex">
              <Link href="/audit">
                <button className="rounded-lg border-2 border-[#21D469] px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#132018] transition-all hover:bg-[#21D469] hover:text-[#132018] active:scale-95">
                  🌿 School Audit
                </button>
              </Link>
              <Link href="/accreditation">
                <button className="rounded-lg bg-[#132018] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-white shadow-lg shadow-black/10 transition-all hover:bg-[#21D469] hover:text-[#132018] active:scale-95">
                  Get Accredited
                </button>
              </Link>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-black/5 text-[#0F172A] lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[110] flex flex-col bg-white p-6 pt-28 lg:hidden"
          >
            <div className="flex-grow overflow-y-auto custom-scrollbar pr-4">
              <div className="flex flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "rounded-lg px-2 py-3 font-display text-2xl font-black uppercase transition-all",
                      pathname === item.href ? "text-[#21D469]" : "text-[#0F172A]/40 hover:text-[#0F172A]"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-8 flex-shrink-0 space-y-6">
              <Link href="/audit" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full rounded-lg border-2 border-[#21D469] py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#132018] transition-all active:scale-95">
                  🌿 School Audit
                </button>
              </Link>
              <Link href="/accreditation" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full rounded-lg bg-[#132018] py-4 text-xs font-bold uppercase tracking-[0.08em] text-white transition-all active:scale-95">
                  Apply for Accreditation
                </button>
              </Link>
              <div className="flex justify-center gap-8 text-[#0F172A]/40 pb-4">
                <Instagram size={20} />
                <Twitter size={20} />
                <Linkedin size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
