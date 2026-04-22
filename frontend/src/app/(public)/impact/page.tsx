import React from 'react';
import { apiFetch } from '@/lib/api';
import ImpactClient from './ImpactClient';

export const dynamic = 'force-dynamic';

async function getImpactData() {
  return await apiFetch('/impact-page', { cache: 'no-store' });
}

export default async function ImpactPage() {
  const page = await getImpactData();
  
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">Impact page content hasn't been configured yet.</p>
      </div>
    );
  }

  return <ImpactClient page={page} />;
}

export async function generateMetadata() {
  const page = await getImpactData();
  if (!page) return { title: 'Our Impact | Green Mentors' };
  
  return {
    title: `${page.meta_title || page.title} | Green Mentors`,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
