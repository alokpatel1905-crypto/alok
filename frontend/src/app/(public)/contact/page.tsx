'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Globe, 
  MessageSquare,
  Clock,
  CheckCircle2,
  Linkedin,
  Twitter,
  Instagram,
  Facebook
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Logic to send to backend would go here
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Connect With Us</h2>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter">
            Let's Start a <span className="text-emerald-600">Climate</span> Action.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 font-medium">
            Whether you're an educator, student, or institutional leader, we're here to help you green your educational journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Info Side */}
          <div className="lg:col-span-1 space-y-8">
            <ContactInfoCard 
              icon={MapPin}
              title="Global Offices"
              details={[
                { label: 'India (HQ)', value: 'Ahmedabad, Gujarat' },
                { label: 'USA', value: 'New York, NY' }
              ]}
              color="emerald"
            />
            <ContactInfoCard 
              icon={Mail}
              title="Digital Reach"
              details={[
                { label: 'General', value: 'info@greenmentors.in' },
                { label: 'Support', value: 'support@greenmentors.in' }
              ]}
              color="sky"
            />
            <ContactInfoCard 
              icon={Phone}
              title="Voice Call"
              details={[
                { label: 'Office', value: '+91 79 4901 0101' },
                { label: 'WhatsApp', value: '+91 99740 61629' }
              ]}
              color="indigo"
            />

            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
               <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">Follow Global News</h4>
               <div className="flex gap-4">
                  <SocialLink icon={TwitterIcon} />
                  <SocialLink icon={LinkedinIcon} />
                  <SocialLink icon={InstagramIcon} />
                  <SocialLink icon={FacebookIcon} />
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[48px] p-8 lg:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-6 relative z-10"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900">Message Received!</h3>
                  <p className="text-slate-500 font-medium max-w-sm mx-auto">
                    Thank you for joining the force. Our climate educators will reach out to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Inquiry Subject</label>
                    <select 
                      className="w-full bg-slate-50 border-none rounded-3xl py-4 px-6 text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                      value={formState.subject}
                      onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    >
                      <option>General Inquiry</option>
                      <option>Green School Accreditation</option>
                      <option>Green University Network</option>
                      <option>Teacher Training</option>
                      <option>Media & PR</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Your Message</label>
                    <textarea 
                      rows={6}
                      required
                      className="w-full bg-slate-50 border-none rounded-[32px] py-4 px-6 text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                      placeholder="Tell us about your institution or goals..."
                      value={formState.message}
                      onChange={(e) => setFormState({...formState, message: e.target.value})}
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-3xl font-black text-lg uppercase tracking-widest shadow-2xl shadow-emerald-600/20 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <Send size={20} />
                    Broadcast Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-32 h-[500px] bg-slate-200 rounded-[60px] overflow-hidden border-8 border-white shadow-2xl relative group">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000" />
           <div className="absolute inset-0 bg-emerald-900/20 pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-8 rounded-[40px] shadow-2xl border border-white text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto text-white shadow-lg"><MapPin /></div>
              <h4 className="font-black text-xl text-slate-900">Global Headquarters</h4>
              <p className="text-slate-500 font-medium text-sm">Interactive Map Integration <br /> Coming Soon</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon: Icon, title, details, color }: any) {
  const colors: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-600/5",
    sky: "bg-sky-50 text-sky-600 border-sky-100 shadow-sky-600/5",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 shadow-indigo-600/5",
  };

  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 group-hover:scale-110", colors[color])}>
        <Icon size={24} />
      </div>
      <h4 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{title}</h4>
      <div className="space-y-3">
        {details.map((d: any, i: number) => (
          <div key={i}>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">{d.label}</div>
            <div className="text-slate-700 font-bold">{d.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialLink({ icon: Icon }: { icon: any }) {
  return (
    <Link 
      href="#" 
      className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all text-slate-400 hover:scale-110 active:scale-95"
    >
      <Icon size={20} />
    </Link>
  );
}