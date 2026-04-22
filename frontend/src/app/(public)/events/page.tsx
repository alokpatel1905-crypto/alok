import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Globe, Target, CheckCircle2, Ticket, Users, Bell } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

export const dynamic = 'force-dynamic';

async function getEventsData() {
  return await apiFetch('/events-page', { cache: 'no-store' });
}

export default async function EventsPage() {
  const page = await getEventsData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">Events page hasn't been configured yet.</p>
      </div>
    );
  }

  const mainEvents = [
    { prefix: 'event1', t: page.event1_title, st: page.event1_subtitle, d: page.event1_description, loc: page.event1_location, date: page.event1_date, b1t: page.event1_button1_text, b1l: page.event1_button1_link, b2t: page.event1_button2_text, b2l: page.event1_button2_link, img: page.event1_image },
    { prefix: 'event2', t: page.event2_title, st: page.event2_subtitle, d: page.event2_description, loc: page.event2_location, date: page.event2_date, b1t: page.event2_button1_text, b1l: page.event2_button1_link, b2t: page.event2_button2_text, b2l: page.event2_button2_link, img: page.event2_image },
    { prefix: 'event3', t: page.event3_title, st: page.event3_subtitle, d: page.event3_description, loc: page.event3_location, date: page.event3_date, b1t: page.event3_button1_text, b1l: page.event3_button1_link, b2t: page.event3_button2_text, b2l: page.event3_button2_link, img: page.event3_image },
    { prefix: 'event4', t: page.event4_title, st: page.event4_subtitle, d: page.event4_description, loc: page.event4_location, date: page.event4_date, b1t: page.event4_button1_text, b1l: page.event4_button1_link, b2t: page.event4_button2_text, b2l: page.event4_button2_link, img: page.event4_image },
  ].filter(s => s.t);

  const upcomingEvents = page.upcoming_events || [];

  return (
    <div className="overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden bg-foreground">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -ml-40 -mt-40 animate-blob" />
        <Container className="relative z-10 text-center max-w-4xl">
          {page.subtitle && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-black uppercase tracking-[0.2em] mb-8">
              {page.subtitle}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-none tracking-tighter">
            {page.page_title || 'Global Events'}
          </h1>
          {page.intro_description && (
            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-medium">
              {page.intro_description}
            </p>
          )}
        </Container>
      </section>

      {/* 2. FEATURED EVENTS */}
      <Section background="white">
        <Container className="space-y-32">
          {mainEvents.map((ev, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={idx} className={`grid lg:grid-cols-2 gap-20 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`relative ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 bg-slate-50 relative group">
                    {ev.img ? (
                      <img src={ev.img} alt={ev.t} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <Calendar className="w-24 h-24 text-slate-300" />
                      </div>
                    )}
                    <div className="absolute top-8 left-8 flex flex-col gap-3">
                        {ev.loc && (
                            <div className="glass text-foreground font-black text-xs uppercase px-5 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 border-white/40">
                                <MapPin size={14} className="text-primary" /> {ev.loc}
                            </div>
                        )}
                        {ev.date && (
                            <div className="bg-foreground text-white font-black text-xs uppercase px-5 py-2.5 rounded-xl shadow-2xl flex items-center gap-2">
                                <Calendar size={14} className="text-secondary" /> {ev.date}
                            </div>
                        )}
                    </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
                </div>

                <div className={`space-y-8 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-sm">
                    <div className="w-10 h-0.5 bg-primary" />
                    Featured Event 0{idx + 1}
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                    {ev.t}
                  </h2>
                  {ev.st && <p className="text-xl text-foreground/40 font-bold italic">"{ev.st}"</p>}
                  <div className="text-lg text-foreground/70 font-medium leading-relaxed whitespace-pre-wrap">
                    {ev.d}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {ev.b1t && (
                      <Button variant="primary" size="lg" className="rounded-full">
                        {ev.b1t} <ArrowRight className="ml-2" />
                      </Button>
                    )}
                    {ev.b2t && (
                      <Button variant="outline" size="lg" className="rounded-full">
                        {ev.b2t}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </Section>

      {/* 3. UPCOMING EVENTS TIMELINE */}
      {upcomingEvents.length > 0 && (
        <Section background="dark">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black text-white">Upcoming Global Engagements</h2>
                <p className="text-white/50 text-lg font-medium">Mark your calendars for our upcoming interactions and summits.</p>
              </div>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-foreground">
                View Full Calendar
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((ev: any, i: number) => (
                <Card key={i} variant="glass" className="p-10 hover:bg-white transition-all group flex flex-col h-full border-white/5">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <Calendar size={28} />
                    </div>
                    <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest">
                      {ev.date}
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{ev.name}</h3>
                  <div className="flex items-center gap-2 text-white/40 text-sm font-bold mb-6">
                    <MapPin size={14} className="text-secondary" /> {ev.location}
                  </div>
                  <p className="text-white/60 font-medium text-sm leading-relaxed mb-10 flex-grow">
                    {ev.description}
                  </p>
                  <Button variant="outline" className="w-full text-white border-white/10 group-hover:bg-primary group-hover:border-primary">
                    Register Now
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 4. WHY ATTEND */}
      {(page.why_title || page.why_description) && (
        <Section background="white" className="text-center">
          <Container className="max-w-4xl space-y-10">
            <NatureIcon name="Target" variant="primary" className="mx-auto scale-150 mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-foreground">{page.why_title}</h2>
            <div className="text-lg md:text-xl text-foreground/60 font-medium leading-relaxed whitespace-pre-wrap max-w-3xl mx-auto">
              {page.why_description}
            </div>
          </Container>
        </Section>
      )}

      {/* 5. CTA */}
      <Section background="nature" className="text-center">
        <Container className="max-w-4xl space-y-10">
          <Bell className="w-16 h-16 text-primary mx-auto animate-bounce" />
          <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tighter">
            {page.cta_title || 'Never Miss a Global Event'}
          </h2>
          {page.cta_description && (
            <p className="text-xl md:text-2xl text-foreground/60 font-medium">
              {page.cta_description}
            </p>
          )}
          {page.button_text && (
            <Button variant="primary" size="xl" className="rounded-full shadow-2xl shadow-primary/20">
              {page.button_text} <Ticket className="ml-2" />
            </Button>
          )}
        </Container>
      </Section>

    </div>
  );
}

export async function generateMetadata() {
  const page = await getEventsData();
  if (!page) return { title: 'Events' };
  
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}

