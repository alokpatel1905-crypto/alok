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
  Sparkles,
  Fingerprint,
  Zap,
  Globe,
  Activity,
  Terminal,
  Server
} from 'lucide-react';
import { cn } from '@/lib/utils';
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
      setError(err.message || 'The secure authentication node rejected the credentials.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-primary selection:text-white">
      {/* Dynamic Background Matrix */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-water/10 blur-[160px] rounded-full animate-pulse-slow delay-1000" />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="w-full max-w-lg z-10 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Portal Branding */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
             <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
             <div className="relative w-20 h-20 bg-white/5 backdrop-blur-xl border border-primary/20 rounded-3xl flex items-center justify-center shadow-2xl group overflow-hidden">
                <ShieldCheck className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
              Command <span className="text-primary italic">Node</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Green Mentors Strategic Admin Portal</p>
          </div>
        </div>

        {/* Login Matrix Card */}
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
          {/* Internal Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
          
          <form onSubmit={handleLogin} className="space-y-8 relative z-10">
            {error && (
              <div className="bg-red-500/5 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-start gap-4 animate-in slide-in-from-top-4 duration-500">
                <AlertCircle className="w-6 h-6 shrink-0 mt-0.5 opacity-50" />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">Access Denied</h4>
                  <p className="text-xs font-medium italic opacity-80">{error}</p>
                </div>
              </div>
            )}

            {/* Credential Fields */}
            <div className="space-y-6">
              <div className="space-y-3 group/field">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-2 flex items-center gap-2 group-focus-within/field:text-primary transition-colors">
                  <Fingerprint size={12} />
                  Personnel Identity
                </label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/field:text-primary transition-colors" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@greenmentors.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all text-sm tracking-tight"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 group/field">
                <div className="flex items-center justify-between ml-2 pr-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-primary transition-colors">
                    <Lock size={12} />
                    Secure Passphrase
                  </label>
                  <button type="button" className="text-[9px] font-black text-primary/60 hover:text-primary uppercase tracking-widest transition-colors">
                    Reset Protocol
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within/field:text-primary transition-colors" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/40 transition-all text-sm tracking-widest"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary blur-xl opacity-20 group-hover/btn:opacity-40 transition-opacity" />
              <div className="relative bg-primary hover:bg-primary/90 disabled:bg-primary/40 disabled:cursor-not-allowed text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95">
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Synchronizing Session...
                  </>
                ) : (
                  <>
                    Initiate Connection
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Infrastructure Metadata */}
          <div className="mt-12 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-4">
               <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Node Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black text-white/80 uppercase">Fully Operational</span>
                  </div>
               </div>
               <div className="w-px h-8 bg-white/10 mx-2" />
               <div className="flex flex-col">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">Identity Provider</span>
                  <span className="text-[10px] font-black text-white/80 uppercase">GM SecureAuth</span>
               </div>
            </div>
            <p className="text-[10px] font-black text-white/20 uppercase tracking-widest italic tracking-tighter">
              v2.0 // Secured by deep forest
            </p>
          </div>
        </div>

        {/* Global Navigation Link */}
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="group flex items-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all duration-500 shadow-sm"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Exit to Public Matrix
          </Link>
        </div>
      </div>
      
      {/* Static Visual Enhancements */}
      <div className="fixed top-12 left-12 flex items-center gap-4 opacity-10 pointer-events-none">
        <Globe size={40} className="text-white" />
        <div className="h-px w-24 bg-white" />
        <Zap size={24} className="text-white" />
      </div>
      <div className="fixed bottom-12 right-12 opacity-10 pointer-events-none flex flex-col items-end">
        <Activity size={40} className="text-white mb-4" />
        <Terminal size={24} className="text-white" />
      </div>
    </div>
  );
}