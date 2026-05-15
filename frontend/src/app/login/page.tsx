'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  ChevronLeft,
  Wind,
  Layers,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@greenmentors.com');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipToken: true,
      });

      if (data.accessToken) {
        localStorage.setItem('token', data.accessToken);
        window.location.href = '/admin/dashboard';
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Authentication protocol failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6faf5] p-6 font-sans selection:bg-[#1C2B1A]/20 selection:text-[#1C2B1A]">
      <div className="soft-grid absolute inset-0 z-0 opacity-50" />

      <div className="w-full max-w-lg z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Institutional Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
             <div className="relative flex h-16 w-16 items-center justify-center rounded-lg border border-black/5 bg-white/90 shadow-premium backdrop-blur-xl transition-transform duration-500 group-hover:scale-105">
                <ShieldCheck className="w-8 h-8 text-[#1C2B1A]" strokeWidth={1.5} />
             </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-black text-[#1C2B1A] tracking-tighter uppercase leading-none">
              Portal <span className="font-serif italic lowercase font-normal text-[#7CB87A]">Login</span>
            </h1>
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1C2B1A]/40">Institutional Access Management</p>
          </div>
        </div>

        {/* Login Sanctuary Card */}
        <div className="relative overflow-hidden rounded-lg border border-black/5 bg-white/90 p-8 shadow-premium backdrop-blur-xl lg:p-10">
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            {error && (
              <div className="flex items-start gap-3 rounded-lg border border-red-500/10 bg-red-500/5 p-4 text-red-600 animate-in slide-in-from-top-4 duration-500">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 opacity-60" />
                <div>
                  <h4 className="text-[9px] font-black uppercase tracking-widest mb-0.5">Access Error</h4>
                  <p className="text-xs font-medium italic opacity-80">{error}</p>
                </div>
              </div>
            )}

            {/* Authentication Fields */}
            <div className="space-y-6">
              <div className="space-y-3 group/field">
                <label className="text-[9px] font-black text-[#1C2B1A]/40 uppercase tracking-[0.3em] ml-3 flex items-center gap-2 group-focus-within/field:text-[#7CB87A] transition-colors">
                  <Mail size={10} />
                  Email Address
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@greenmentors.com"
                    className="w-full bg-white/50 border border-white/80 rounded-2xl py-4 px-6 text-[#1C2B1A] text-sm font-medium placeholder:text-[#1C2B1A]/20 focus:outline-none focus:ring-4 focus:ring-[#7CB87A]/5 focus:border-[#7CB87A]/40 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 group/field">
                <div className="flex items-center justify-between ml-3 pr-3">
                  <label className="text-[9px] font-black text-[#1C2B1A]/40 uppercase tracking-[0.3em] flex items-center gap-2 group-focus-within/field:text-[#7CB87A] transition-colors">
                    <Lock size={10} />
                    Secure Password
                  </label>
                  <button type="button" className="text-[8px] font-black uppercase tracking-widest text-[#7CB87A] transition-colors hover:text-[#1C2B1A]">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-white/50 border border-white/80 rounded-2xl py-4 px-6 text-[#1C2B1A] text-sm font-medium placeholder:text-[#1C2B1A]/20 focus:outline-none focus:ring-4 focus:ring-[#7CB87A]/5 focus:border-[#7CB87A]/40 transition-all shadow-sm tracking-widest"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full group/btn relative"
            >
              <div className="relative flex items-center justify-center gap-3 rounded-lg bg-[#1C2B1A] py-5 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-xl transition-all hover:bg-[#1C2B1A]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#1C2B1A]/40">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Validating Credentials...
                  </>
                ) : (
                  <>
                    Access Portal
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Infrastructure Context */}
          <div className="mt-8 pt-6 border-t border-black/[0.03] flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity duration-700">
            <div className="flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#1C2B1A]/40 mb-1">System Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7CB87A] animate-pulse" />
                    <span className="text-[9px] font-black text-[#1C2B1A] uppercase tracking-tighter">Encrypted & Active</span>
                  </div>
               </div>
               <div className="w-px h-6 bg-black/5 mx-2" />
               <div className="flex flex-col">
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#1C2B1A]/40 mb-1">Architecture</span>
                  <span className="text-[9px] font-black text-[#1C2B1A] uppercase tracking-tighter">GreenCore v3.0</span>
               </div>
            </div>
            <div className="flex items-center gap-3 text-[#1C2B1A]/30">
               <Layers size={14} />
               <Wind size={14} />
               <Sparkles size={14} />
            </div>
          </div>
        </div>

        {/* Global Return Link */}
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="group flex items-center gap-3 rounded-lg border border-black/5 bg-white/45 px-6 py-3 text-[9px] font-black uppercase tracking-[0.12em] text-[#1C2B1A]/50 shadow-sm transition-all duration-300 hover:bg-white/80 hover:text-[#1C2B1A]"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1.5 transition-transform" />
            Return to Public Website
          </Link>
        </div>
      </div>
      
      {/* Institutional Metadata - Static */}
      <div className="fixed bottom-12 left-12 text-[8px] font-black text-[#1C2B1A]/10 uppercase tracking-[0.5em] hidden lg:block vertical-text">
        Sustainable Education Protocol 2026
      </div>
    </div>
  );
}
