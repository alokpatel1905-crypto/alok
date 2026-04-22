import React from 'react';
import { getHomePage } from '@/lib/api';
import HomeClient from './HomeClient';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const page = await getHomePage();

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-400">Welcome to Green Mentors</h2>
          <p className="text-slate-500 mt-2">The CMS content for the home page is currently being set up.</p>
        </div>
      </div>
    );
  }

  return <HomeClient page={page} />;
}

export async function generateMetadata() {
  const page = await getHomePage();
  if (!page) return { title: 'Green Mentors | Global Responsible Education Network' };
  
  return {
    title: page.meta_title || 'Home | Green Mentors',
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
