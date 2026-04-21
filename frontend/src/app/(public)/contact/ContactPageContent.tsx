"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContactForm } from '@/lib/api';
import { MapPin, Phone, Mail, Clock, Send, Earth, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_ICONS = {
  Facebook: ({ className }: { className?: string }) => (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Twitter: ({ className }: { className?: string }) => (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  ),
  Linkedin: ({ className }: { className?: string }) => (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  Instagram: ({ className }: { className?: string }) => (
    <svg className={className} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  )
};

type FormData = {
  full_name: string;
  email: string;
  organization?: string;
  inquiry_type?: string;
  subject?: string;
  message: string;
};

export function ContactPageContent({ config }: { config: any }) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    try {
      await submitContactForm(data);
      setSuccess(config.success_message || 'Thank you for reaching out! We will get back to you shortly.');
      reset();
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* HEADER */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-[#0D0D0D] text-white px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold tracking-widest uppercase mb-8">
            <Earth className="w-4 h-4" />
            {config.subtitle || 'Connect with us'}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-8">
            {config.page_title}
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            {config.intro_description}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* CONTACT INFO */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Get In Touch</h2>
              <p className="text-lg text-slate-600 font-medium">Have a question about our programs, partnerships, or impact? Our team is ready to help.</p>
            </div>

            <div className="space-y-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
              {config.email_general && (
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                    <a href={`mailto:${config.email_general}`} className="text-lg font-bold text-slate-800 hover:text-emerald-600 transition-colors">{config.email_general}</a>
                  </div>
                </div>
              )}
              {config.phone && (
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Phone</p>
                    <a href={`tel:${config.phone}`} className="text-lg font-bold text-slate-800 hover:text-emerald-600 transition-colors">{config.phone}</a>
                  </div>
                </div>
              )}
              {config.address && (
                <div className="flex gap-5">
                  <div className="w-12 h-12 shrink-0 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-lg font-bold text-slate-800">{config.address}</p>
                  </div>
                </div>
              )}
              {config.response_time && (
                <div className="flex gap-5 border-t border-slate-200/60 pt-8 mt-2">
                  <div className="w-12 h-12 shrink-0 bg-slate-200 text-slate-600 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Response Time</p>
                    <p className="text-lg font-bold text-slate-800">{config.response_time}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Follow Our Journey</p>
              <div className="flex gap-4">
                {config.facebook && (
                  <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 rounded-full flex items-center justify-center transition-all">
                    <SOCIAL_ICONS.Facebook className="w-5 h-5" />
                  </a>
                )}
                {config.twitter && (
                  <a href={config.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 rounded-full flex items-center justify-center transition-all">
                    <SOCIAL_ICONS.Twitter className="w-5 h-5" />
                  </a>
                )}
                {config.linkedin && (
                  <a href={config.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 rounded-full flex items-center justify-center transition-all">
                    <SOCIAL_ICONS.Linkedin className="w-5 h-5" />
                  </a>
                )}
                {config.instagram && (
                  <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white text-slate-600 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 rounded-full flex items-center justify-center transition-all">
                    <SOCIAL_ICONS.Instagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white p-10 lg:p-12 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-6">Send us a message</h3>
            
            {success && (
              <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-2xl font-medium">
                {success}
              </div>
            )}
            
            {error && (
              <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-800 rounded-2xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {config.show_name && (
                <div>
                  <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">Full Name</label>
                  <input {...register('full_name')} required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium h-14" />
                </div>
              )}
              {config.show_email && (
                <div>
                  <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">Email Address</label>
                  <input {...register('email')} type="email" required className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium h-14" />
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                {config.show_organization && (
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">Organization</label>
                    <input {...register('organization')} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium h-14" />
                  </div>
                )}
                {config.inquiry_type_options && config.inquiry_type_options.length > 0 && (
                  <div>
                    <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">Inquiry Type</label>
                    <select {...register('inquiry_type')} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 h-14">
                      {config.inquiry_type_options.map((opt: any) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              {config.show_subject && (
                <div>
                  <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">Subject</label>
                  <input {...register('subject')} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium h-14" />
                </div>
              )}
              {config.show_message && (
                <div>
                  <label className="block text-sm font-bold tracking-wide text-slate-700 mb-2 uppercase">Message</label>
                  <textarea {...register('message')} required rows={5} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-medium resize-none min-h-[160px]" />
                </div>
              )}
              
              <button disabled={isSubmitting} type="submit" className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-xl shadow-emerald-200/50 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none mt-4 text-lg">
                {isSubmitting ? 'Sending Message...' : (config.button_text || 'Send Message')}
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* CTA BLOCK */}
      {(config.cta_title || config.cta_description) && (
        <section className="bg-emerald-900 py-32 relative overflow-hidden">
          {/* Decorative nodes */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/30 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
              {config.cta_title}
            </h2>
            <p className="text-xl text-emerald-100 font-medium max-w-2xl mx-auto mb-12">
              {config.cta_description}
            </p>
            {config.cta_button_text && config.cta_button_link && (
               <Link href={config.cta_button_link} className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-900 font-black rounded-2xl shadow-xl hover:bg-emerald-50 hover:-translate-y-1 transition-all text-lg group">
                {config.cta_button_text}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
