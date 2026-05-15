'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Globe, Instagram, Leaf, Linkedin, MapPin, Phone, Twitter } from 'lucide-react';

export const Footer = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin') || pathname === '/login') return null;

  return (
    <footer className="relative overflow-hidden bg-[#071F16] px-6 py-16 text-white sm:px-8 lg:px-12">
      <div className="absolute left-0 top-0 h-px w-full bg-[#21D469]/40" />

      <div className="absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap font-display text-[72px] font-black uppercase leading-none text-white/[0.03] lg:text-[120px]">
        GREEN MENTORS
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#21D469]/10 text-[#21D469]">
              <Leaf size={26} />
            </div>
            <h3 className="font-display text-2xl font-black leading-none">
              <span className="text-[#21D469]">GREEN</span> <br /> MENTORS
            </h3>
          </div>
          <p className="max-w-xs text-sm font-medium leading-7 text-white/60">
            Architecting the sustainable educational transition through nature-inspired institutional frameworks.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-all hover:border-[#21D469] hover:bg-[#21D469] hover:text-[#0F172A]"
                aria-label="Social link"
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h5 className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FACC15]">Organization</h5>
          <ul className="space-y-4">
            {['Home', 'About', 'Programs', 'Impact', 'Accreditation', 'Rankings'].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  className="text-sm font-bold uppercase tracking-widest text-white/45 transition-all hover:text-[#21D469]"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <h5 className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FACC15]">India Headquarters</h5>
          <div className="space-y-5 text-sm font-medium leading-relaxed text-white/55">
            <p className="flex gap-3">
              <MapPin size={16} className="mt-1 shrink-0 text-[#21D469]" />
              <span>B-802, Mondeal Heights,<br />S.G. Highway, Ahmedabad 380015</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} className="text-[#21D469]" />
              +91 79 49000160
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <h5 className="text-[10px] font-black uppercase tracking-[0.24em] text-[#FACC15]">USA Global Office</h5>
          <div className="space-y-5 text-sm font-medium leading-relaxed text-white/55">
            <p className="flex gap-3">
              <MapPin size={16} className="mt-1 shrink-0 text-[#21D469]" />
              <span>401, 67 W Street,<br />Brooklyn, New York 11222</span>
            </p>
            <p className="flex items-center gap-3">
              <Phone size={16} className="text-[#21D469]" />
              +1 718 673 3942
            </p>
            <div className="pt-3">
              <div className="inline-flex items-center gap-4 rounded-lg border border-[#21D469]/30 bg-[#21D469]/10 px-5 py-3">
                <Globe size={16} className="text-[#21D469]" />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Status 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
        <div className="text-center text-[10px] font-black uppercase tracking-widest text-white/35 md:text-left">
          © 2026 Green Mentors Global. Architects of Sustainability.
        </div>
        <div className="rounded-lg border border-[#21D469]/30 bg-[#21D469]/15 px-6 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#21D469]">
          UNESCO GEP Partner
        </div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-white/35">
          <Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link>
          <Link href="/terms" className="transition-colors hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
};
