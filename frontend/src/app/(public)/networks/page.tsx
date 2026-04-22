import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, Globe2, Network, Search, Target, Users, Share2, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Section, Container } from '@/components/ui/Section';
import { NatureIcon } from '@/components/ui/NatureIcon';

export const dynamic = 'force-dynamic';

async function getNetworksData() {
  return await apiFetch('/networks-page', { cache: 'no-store' });
}

import NetworksClient from './NetworksClient';

export default async function NetworksPage() {
  const page = await getNetworksData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">Networks page hasn&apos;t been configured yet.</p>
      </div>
    );
  }

  const networks = [
    { prefix: 'school', t: page.school_title, st: page.school_subtitle, d: page.school_description, b1t: page.school_button_1_text, b1l: page.school_button_1_link, b2t: page.school_button_2_text, b2l: page.school_button_2_link, img: page.school_image },
    { prefix: 'university', t: page.university_title, st: page.university_subtitle, d: page.university_description, b1t: page.university_button_1_text, b1l: page.university_button_1_link, b2t: page.university_button_2_text, b2l: page.university_button_2_link, img: page.university_image },
    { prefix: 'teacher', t: page.teacher_title, st: page.teacher_subtitle, d: page.teacher_description, b1t: page.teacher_button_1_text, b1l: page.teacher_button_1_link, b2t: page.teacher_button_2_text, b2l: page.teacher_button_2_link, img: page.teacher_image },
    { prefix: 'graduates', t: page.graduates_title, st: page.graduates_subtitle, d: page.graduates_description, b1t: page.graduates_button_1_text, b1l: page.graduates_button_1_link, b2t: page.graduates_button_2_text, b2l: page.graduates_button_2_link, img: page.graduates_image },
    { prefix: 'innovator', t: page.innovator_title, st: page.innovator_subtitle, d: page.innovator_description, b1t: page.innovator_button_1_text, b1l: page.innovator_button_1_link, b2t: page.innovator_button_2_text, b2l: page.innovator_button_2_link, img: page.innovator_image },
  ].filter((s) => s.t);

  const steps = [
    { title: page.step1, icon: Network },
    { title: page.step2, icon: FileText },
    { title: page.step3, icon: Users },
    { title: page.step4, icon: Globe2 },
  ].filter((s) => s.title);

  return <NetworksClient page={page} networks={networks} steps={steps} />;
}

export async function generateMetadata() {
  const page = await getNetworksData();
  if (!page) return { title: 'Networks' };
  return {
    title: page.meta_title || page.page_title,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
