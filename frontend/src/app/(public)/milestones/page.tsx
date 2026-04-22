import React from 'react';
import { apiFetch } from '@/lib/api';
import MilestonesClient from './MilestonesClient';

export const dynamic = 'force-dynamic';

async function getMilestoneData() {
  const [page, list] = await Promise.all([
    apiFetch('/milestones/page', { cache: 'no-store' }),
    apiFetch('/milestones', { cache: 'no-store' }),
  ]);
  return { page, list: list || [] };
}

export default async function MilestonesPage() {
  const { page, list } = await getMilestoneData();

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-xl text-slate-500 font-medium">Milestones configured incorrectly.</p>
      </div>
    );
  }

  return <MilestonesClient page={page} list={list} />;
}

export async function generateMetadata() {
  const { page } = await getMilestoneData();
  if (!page) return { title: 'Our Journey | Green Mentors' };
  
  return {
    title: `${page.meta_title || page.page_title} | Green Mentors`,
    description: page.meta_description,
    keywords: page.meta_keywords,
  };
}
