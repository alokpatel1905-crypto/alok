'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  Video, 
  Globe,
  Filter,
  Ticket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function EventsPublicPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:4000/events')
      .then(res => res.json())
      .then(res => {
        setEvents(res.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 font-inter">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-20">
          <div className="space-y-6">
            <h2 className="text-emerald-600 font-black text-sm uppercase tracking-[0.3em]">Live Engagement</h2>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-none">
              Global <span className="text-sky-500">Conferences</span> & Webinars.
            </h1>
          </div>
          <p className="text-lg text-slate-500 font-medium leading-relaxed lg:border-l lg:border-slate-100 lg:pl-12">
            Join thousands of global climate leaders, educators, and policy makers in our upcoming summits and training sessions.
          </p>
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Global Event Calendar...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {events.length === 0 ? (
              <div className="text-center py-32 bg-slate-50 rounded-[48px] border border-slate-100">
                <Calendar className="mx-auto text-slate-200 mb-6" size={60} />
                <h3 className="text-2xl font-black text-slate-900 mb-2">No upcoming events</h3>
                <p className="text-slate-500 font-medium">Check back soon for our next global summit.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {events.map((event) => (
                  <PublicEventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Past Highlights Section */}
        <div className="mt-32 pt-20 border-t border-slate-100">
           <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-black text-slate-900">Featured Conferences</h3>
              <Link href="#" className="text-emerald-600 font-bold flex items-center gap-2 hover:gap-4 transition-all">View Archive <ArrowRight size={18}/></Link>
           </div>
           <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative h-80 rounded-[40px] overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="NYC Conference" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-10 flex flex-col justify-end">
                    <h4 className="text-white text-2xl font-black mb-2">NYC Green School Conference</h4>
                    <p className="text-slate-300 font-medium">Annual flagship event at the United Nations HQ.</p>
                 </div>
              </div>
              <div className="group relative h-80 rounded-[40px] overflow-hidden shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1591115765373-520b7a217144?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Davos" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent p-10 flex flex-col justify-end">
                    <h4 className="text-white text-2xl font-black mb-2">World Education Forum - Davos</h4>
                    <p className="text-slate-300 font-medium">Discussing the future of Climatizing Education.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function PublicEventCard({ event }: { event: any }) {
  const date = new Date(event.startDate);
  
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white border border-slate-100 rounded-[40px] p-8 shadow-sm hover:shadow-2xl hover:shadow-emerald-600/5 transition-all duration-500 flex flex-col group h-full"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-3xl text-center min-w-[70px] border border-emerald-100">
          <div className="text-xs font-black uppercase tracking-widest leading-none mb-1">{date.toLocaleString('default', { month: 'short' })}</div>
          <div className="text-2xl font-black leading-none">{date.getDate()}</div>
        </div>
        <div className={cn(
          "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
          event.status === 'UPCOMING' ? "bg-sky-50 text-sky-600 border-sky-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
        )}>
          {event.status}
        </div>
      </div>

      <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-emerald-600 transition-colors">
        {event.title}
      </h3>

      <div className="space-y-4 mb-10 flex-grow">
        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
          <Clock size={16} className="text-emerald-500" />
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Global Time
        </div>
        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
          {event.location?.toLowerCase().includes('online') ? (
            <Video size={16} className="text-sky-500" />
          ) : (
            <MapPin size={16} className="text-sky-500" />
          )}
          {event.location || 'Online Virtual Summit'}
        </div>
        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
          <Users size={16} className="text-indigo-500" />
          {event.registrations?.length || 0} Registered
        </div>
      </div>

      <Link 
        href={`/events/${event.id}`}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
      >
        <Ticket size={18} />
        Register Now
      </Link>
    </motion.div>
  );
}