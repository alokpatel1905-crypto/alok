import React from 'react';
import { apiFetch } from '@/lib/api';
import AboutClient from './AboutClient';

export const dynamic = 'force-dynamic';

async function getAboutData() {
  return apiFetch('/about-page', { cache: 'no-store' });
}

export default async function AboutPage() {
  const page = await getAboutData();
  
  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">About page content hasn't been configured yet.</p>
      </div>
    );
  }

  return <AboutClient page={page} />;
}

export async function generateMetadata() {
  const page = await getAboutData();
  if (!page) return { title: 'About Us | Green Mentors' };
  
  return {
    title: `${page.meta_title || page.page_title} | Green Mentors`,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
