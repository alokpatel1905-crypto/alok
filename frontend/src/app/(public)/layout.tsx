'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Search, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  ChevronRight,
  Globe,
  Twitter,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- Shared SVGs for Socials ---
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Institutions', href: '/institutions' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'Events', href: '/events' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] text-slate-900 font-poppins">
      {/* Navbar */}
      <nav 
        className={cn(
          "fixed top-0 w-full z-[100] transition-all duration-500",
          isScrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200 py-3 shadow-sm" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight leading-none text-slate-900">GREEN MENTORS</span>
              <span className="text-[10px] font-bold text-emerald-600 tracking-[0.2em] uppercase">Global Force</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all duration-300",
                  pathname === link.href 
                    ? "text-emerald-600 bg-emerald-50" 
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link 
              href="/contact"
              className="px-6 py-2.5 text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Support
            </Link>
            <Link 
              href="/login"
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95"
            >
              Portal Access
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24}/> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="text-2xl font-black text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-slate-100 my-4" />
              <Link 
                href="/login"
                className="w-full bg-emerald-600 text-white text-center py-4 rounded-2xl font-bold text-lg"
              >
                Portal Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-xl text-white tracking-tight">GREEN MENTORS</span>
              </Link>
              <p className="text-sm leading-relaxed text-slate-400 font-medium">
                A non-government organization with Special Consultative Status with the United Nations ECOSOC, dedicated to greening the world's education system.
              </p>
              <div className="flex gap-4">
                <SocialLink icon={TwitterIcon} />
                <SocialLink icon={LinkedinIcon} />
                <SocialLink icon={InstagramIcon} />
                <SocialLink icon={FacebookIcon} />
              </div>
            </div>

            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Quick Navigation</h4>
              <ul className="space-y-4 text-sm font-bold">
                <li><FooterLink href="/about">Who We Are</FooterLink></li>
                <li><FooterLink href="/programs">Greening Triad</FooterLink></li>
                <li><FooterLink href="/rankings">Global Rankings</FooterLink></li>
                <li><FooterLink href="/blog">Press & Media</FooterLink></li>
                <li><FooterLink href="/contact">Get in Touch</FooterLink></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-8">Global Reach</h4>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div className="text-sm">
                    <p className="text-white font-bold mb-1">HQ - India</p>
                    <p className="text-slate-400">Ahmedabad, Gujarat</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin className="w-5 h-5 text-sky-500 shrink-0" />
                  <div className="text-sm">
                    <p className="text-white font-bold mb-1">International - USA</p>
                    <p className="text-slate-400">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
              <h4 className="text-white font-black text-sm uppercase tracking-widest mb-4">Newsletter</h4>
              <p className="text-xs text-slate-400 mb-6 font-medium">Stay updated with our global climate actions.</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Email address"
                  className="w-full bg-white/10 border-none rounded-2xl py-3 px-4 text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500" 
                />
                <button className="w-full bg-emerald-600 text-white py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors">
                  Join Action
                </button>
              </form>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <p>&copy; {new Date().getFullYear()} Green Mentors. Humanizing Education.</p>
            <div className="flex gap-10">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 inline-block"
    >
      {children}
    </Link>
  );
}

function SocialLink({ icon: Icon }: { icon: any }) {
  return (
    <Link 
      href="#" 
      className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all text-slate-500 hover:scale-110 active:scale-95"
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}