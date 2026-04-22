"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { submitContactForm } from '@/lib/api';
import { MapPin, Phone, Mail, Clock, Send, Earth, ArrowRight, Sparkles, Facebook, Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

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
    <div className="overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-foreground">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -ml-40 -mt-40 animate-blob" />
        <Container className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Earth className="w-4 h-4" />
            {config.subtitle || 'Connect with us'}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter">
            {config.page_title || 'Get in Touch'}
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
            {config.intro_description}
          </p>
        </Container>
      </section>

      {/* 2. CONTACT INFO & FORM */}
      <Section background="white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-20">
            
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-foreground">Our Global Offices</h2>
                <p className="text-lg text-foreground/50 font-medium">Have a question about our programs, partnerships, or impact? Our team is ready to help.</p>
              </div>

              <div className="grid gap-6">
                {[
                  { icon: Mail, label: 'Email', value: config.email_general, color: 'primary' },
                  { icon: Phone, label: 'Phone', value: config.phone, color: 'secondary' },
                  { icon: MapPin, label: 'Global Headquarter', value: config.address, color: 'accent' },
                ].map((item, i) => (
                  item.value && (
                    <Card key={i} variant="flat" className="p-8 border-none bg-background hover:bg-white transition-all group">
                      <div className="flex gap-6">
                        <div className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color} group-hover:bg-${item.color} group-hover:text-white transition-all`}>
                          <item.icon size={24} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-xl font-black text-foreground">{item.value}</p>
                        </div>
                      </div>
                    </Card>
                  )
                ))}
              </div>

              <div className="pt-8">
                <p className="text-xs font-black text-foreground/40 uppercase tracking-widest mb-8">Follow Our Journey</p>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, link: config.facebook },
                    { icon: Twitter, link: config.twitter },
                    { icon: Linkedin, link: config.linkedin },
                    { icon: Instagram, link: config.instagram },
                  ].map((social, i) => (
                    social.link && (
                      <Link key={i} href={social.link} target="_blank" className="w-14 h-14 rounded-2xl border-2 border-black/5 flex items-center justify-center text-foreground/40 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
                        <social.icon size={20} />
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <Card variant="white" className="p-10 md:p-16 rounded-[4rem] border-none shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
                <div className="relative z-10 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
                      <MessageCircle className="text-primary" />
                      Send a Message
                    </h3>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                  </div>

                  {success && (
                    <div className="p-6 bg-primary/10 border border-primary/20 text-primary font-black rounded-2xl text-center animate-in zoom-in-95">
                      {success}
                    </div>
                  )}
                  
                  {error && (
                    <div className="p-6 bg-red-50 border border-red-100 text-red-600 font-black rounded-2xl text-center">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      {config.show_name && (
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-2">Full Name</label>
                          <input {...register('full_name')} required className="w-full px-8 py-5 bg-background border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-foreground" />
                        </div>
                      )}
                      {config.show_email && (
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-2">Email Address</label>
                          <input {...register('email')} type="email" required className="w-full px-8 py-5 bg-background border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {config.show_organization && (
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-2">Organization</label>
                          <input {...register('organization')} className="w-full px-8 py-5 bg-background border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-foreground" />
                        </div>
                      )}
                      {config.inquiry_type_options && config.inquiry_type_options.length > 0 && (
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-2">Inquiry Type</label>
                          <select {...register('inquiry_type')} className="w-full px-8 py-5 bg-background border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-foreground appearance-none">
                            {config.inquiry_type_options.map((opt: any) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    {config.show_subject && (
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-2">Subject</label>
                        <input {...register('subject')} className="w-full px-8 py-5 bg-background border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-foreground" />
                      </div>
                    )}
                    {config.show_message && (
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 pl-2">Your Message</label>
                        <textarea {...register('message')} required rows={5} className="w-full px-8 py-5 bg-background border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-primary/20 outline-none transition-all font-bold text-foreground resize-none" />
                      </div>
                    )}
                    
                    <Button disabled={isSubmitting} type="submit" size="xl" className="w-full rounded-full shadow-2xl shadow-primary/20 h-20">
                      {isSubmitting ? 'Processing...' : (config.button_text || 'Send Inquiry')}
                      <Send className="ml-3" size={20} />
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

          </div>
        </Container>
      </Section>

      {/* 3. CTA BLOCK */}
      {(config.cta_title || config.cta_description) && (
        <Section background="nature" className="text-center">
          <Container className="max-w-4xl space-y-10">
            <Sparkles className="w-16 h-16 text-primary mx-auto opacity-50" />
            <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
              {config.cta_title}
            </h2>
            <p className="text-xl md:text-2xl text-foreground/60 font-medium">
              {config.cta_description}
            </p>
            {config.cta_button_text && config.cta_button_link && (
               <Button variant="primary" size="xl" className="rounded-full">
                {config.cta_button_text} <ArrowRight className="ml-2" />
               </Button>
            )}
          </Container>
        </Section>
      )}

    </div>
  );
}
