import React from 'react';
import { Metadata } from 'next';
import { getContactPage } from '@/lib/api';
import { ContactPageContent } from './ContactPageContent';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getContactPage();
  if (!config) return { title: 'Contact Us' };
  return {
    title: config.meta_title || 'Contact Us',
    description: config.meta_description,
    keywords: config.meta_keywords,
  };
}

export default async function ContactPage() {
  const config = await getContactPage();

  return <ContactPageContent config={config} />;
}
