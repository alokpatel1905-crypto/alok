'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Droplets,
  GraduationCap,
  Layers,
  Mountain,
  School,
  ShieldCheck,
  Sun,
  Users,
  Wind,
} from 'lucide-react';
import { getHomePage } from '@/lib/api';
import { StatsCounter } from '@/components/ui/StatsCounter';

const heroImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80';
const campusImage = 'https://images.unsplash.com/photo-1542601063-7ac3b052146d?auto=format&fit=crop&q=80';
const summitImage = 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80';

type CmsData = Record<string, string | undefined> | null;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase text-[#2c7c45]">
    <span className="h-px w-10 bg-[#2c7c45]/35" />
    {children}
  </div>
);

const cleanTitle = (value: string | undefined, fallback: string) => value?.trim() || fallback;

export default function HomeClient() {
  const [cmsData, setCmsData] = useState<CmsData>(null);

  useEffect(() => {
    getHomePage().then((data) => {
      if (data) setCmsData(data);
    });
  }, []);

  const stats = useMemo(() => [
    { label: cmsData?.stat_1_title || 'Green Schools', value: cmsData?.stat_1_value || '2000' },
    { label: cmsData?.stat_2_title || 'Universities', value: cmsData?.stat_2_value || '200' },
    { label: cmsData?.stat_3_title || 'Teachers', value: cmsData?.stat_3_value || '50000' },
    { label: cmsData?.stat_4_title || 'Leaders', value: cmsData?.stat_4_value || '20000' },
  ], [cmsData]);

  const programs = [
    { title: cmsData?.program_1_title || 'Green School Program', desc: cmsData?.program_1_desc || 'Campus systems, student leadership, and learning practices aligned to measurable sustainability goals.', icon: School },
    { title: cmsData?.program_2_title || 'Green University Program', desc: cmsData?.program_2_desc || 'Institution-wide frameworks for responsible operations, research, governance, and climate literacy.', icon: GraduationCap },
    { title: cmsData?.program_3_title || 'Mentor Network', desc: cmsData?.program_3_desc || 'Training pathways that help educators guide practical sustainability action across communities.', icon: Users },
    { title: cmsData?.program_4_title || 'Recognition & Awards', desc: cmsData?.program_4_desc || 'Transparent accreditation and recognition for institutions leading the transition.', icon: Award },
  ];

  const elements = [
    { title: cmsData?.element_soil_title || 'Soil Care', desc: cmsData?.element_soil_desc || 'Regenerative landscapes and outdoor learning foundations.', icon: Mountain },
    { title: cmsData?.element_water_title || 'Water Wisdom', desc: cmsData?.element_water_desc || 'Conservation, reuse, and student-led water literacy.', icon: Droplets },
    { title: cmsData?.element_air_title || 'Air Quality', desc: cmsData?.element_air_desc || 'Healthier classrooms through ventilation and green cover.', icon: Wind },
    { title: cmsData?.element_energy_title || 'Clean Energy', desc: cmsData?.element_energy_desc || 'Efficiency, renewables, and visible energy accountability.', icon: Sun },
    { title: cmsData?.element_spaces_title || 'Living Spaces', desc: cmsData?.element_spaces_desc || 'Campus design that makes sustainability part of daily life.', icon: Layers },
  ];

  return (
    <div className="bg-[#fbfcf8] text-[#132018]">
      <section className="soft-grid relative overflow-hidden bg-[#f5f8ef] px-5 pb-16 pt-36 sm:px-6 lg:px-8 lg:pb-20">
        <div className="mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionLabel>UN ECOSOC certified</SectionLabel>
            <h1 className="text-balance max-w-4xl font-display text-5xl font-black leading-none text-[#102117] sm:text-7xl lg:text-8xl">
              {cleanTitle(cmsData?.hero_title, 'Transforming education for a sustainable future.')}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#314236] sm:text-xl">
              {cmsData?.hero_description || 'Green Mentors helps schools, universities, educators, and leaders build practical sustainability systems across learning, operations, culture, and community impact.'}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={cmsData?.hero_button_1_link || '/accreditation'}
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#132018] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[#21D469] hover:text-[#132018]"
              >
                {cmsData?.hero_button_1_text || 'Get Accredited'}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={cmsData?.hero_button_2_link || '/about'}
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-[#132018]/15 px-7 py-4 text-sm font-bold text-[#132018] transition-colors hover:border-[#21D469] hover:text-[#2c7c45]"
              >
                {cmsData?.hero_button_2_text || 'Explore Our Work'}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
              <img
                src={cmsData?.hero_image_url || heroImage}
                alt="Students learning in a green outdoor education setting"
                className="h-[360px] w-full object-cover sm:h-[460px] lg:h-[560px]"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-lg bg-white/92 p-5 shadow-xl backdrop-blur">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-1 shrink-0 text-[#21D469]" size={24} />
                <div>
                  <p className="text-sm font-black uppercase text-[#132018]">Global responsible education network</p>
                  <p className="mt-1 text-sm leading-6 text-[#526055]">Trusted by institutions working toward measurable climate and sustainability outcomes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l border-black/10 pl-5">
              <div className="font-display text-4xl font-black text-[#2c7c45] sm:text-5xl">
                <StatsCounter value={stat.value} />
              </div>
              <div className="mt-2 text-sm font-semibold text-[#526055]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <SectionLabel>Our genesis</SectionLabel>
            <h2 className="text-balance font-display text-4xl font-black leading-tight sm:text-5xl">
              {cleanTitle(cmsData?.about_title, 'Pioneering green education with practical institutional change.')}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#526055]">
              {cmsData?.about_description || 'Founded by Virendra Rawat, Green Mentors works with education leaders to connect sustainability values with real programs, governance, campuses, and student action.'}
            </p>
            <Link
              href={cmsData?.about_button_link || '/about'}
              className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#2c7c45] hover:text-[#132018]"
            >
              {cmsData?.about_button_text || 'Read our story'}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {programs.map((program) => (
              <article key={program.title} className="rounded-lg border border-black/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-[#21D469]/70 hover:shadow-xl">
                <program.icon className="mb-8 text-[#2c7c45]" size={30} />
                <h3 className="font-display text-2xl font-black leading-tight">{program.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#526055]">{program.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#132018] px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-lg">
            <img src={campusImage} alt="Green campus walkway" className="h-[420px] w-full object-cover opacity-90" />
          </div>
          <div>
            <SectionLabel>Five element framework</SectionLabel>
            <h2 className="text-balance font-display text-4xl font-black leading-tight sm:text-6xl">
              A campus model people can see, measure, and practice.
            </h2>
            <div className="mt-10 grid gap-4">
              {elements.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <item.icon className="mt-1 shrink-0 text-[#21D469]" size={24} />
                  <div>
                    <h3 className="font-display text-xl font-black">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>Global summits</SectionLabel>
              <h2 className="text-balance font-display text-4xl font-black leading-tight sm:text-6xl">
                {cleanTitle(cmsData?.events_title, 'Events that move institutions from intent to action.')}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#526055]">
                {cmsData?.events_description || 'Conferences, workshops, and leadership forums connect educators with peers, experts, and practical roadmaps.'}
              </p>
            </div>
            <Link
              href={cmsData?.events_button_link || '/events'}
              className="inline-flex items-center justify-center gap-3 rounded-lg bg-[#132018] px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-[#21D469] hover:text-[#132018]"
            >
              {cmsData?.events_button_text || 'View Events'}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <article className="relative min-h-[420px] overflow-hidden rounded-lg bg-[#132018]">
              <img src={summitImage} alt="City skyline for global education summit" className="absolute inset-0 h-full w-full object-cover opacity-65" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132018] via-[#132018]/50 to-transparent" />
              <div className="absolute bottom-0 max-w-2xl p-8 text-white">
                <p className="mb-3 text-sm font-bold text-[#21D469]">Featured summit</p>
                <h3 className="font-display text-4xl font-black leading-tight">NYC Green School Conference</h3>
                <Link href="/events" className="mt-6 inline-flex items-center gap-3 text-sm font-bold hover:text-[#21D469]">
                  Register interest <ArrowUpRight size={18} />
                </Link>
              </div>
            </article>

            <div className="rounded-lg border border-black/10 bg-white p-7 shadow-sm">
              <CheckCircle2 className="mb-8 text-[#2c7c45]" size={32} />
              <h3 className="font-display text-3xl font-black leading-tight">Build a greener institution with a clear path.</h3>
              <p className="mt-5 text-sm leading-7 text-[#526055]">
                Start with accreditation, program design, or a custom institutional roadmap for your school or university.
              </p>
              <Link href="/accreditation" className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#2c7c45] hover:text-[#132018]">
                Request accreditation <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
