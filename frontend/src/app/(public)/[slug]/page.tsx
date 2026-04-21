import { apiFetch, getPageData } from '@/lib/api';
import { DynamicSection } from '@/components/cms/DynamicSection';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'support') {
    const support = await apiFetch('/support-page', { next: { revalidate: 10 } } as any);
    if (!support) return { title: 'Support' };
    return {
      title: support.meta_title || support.page_title || 'Support',
      description: support.meta_description,
    };
  }
  const page = await getPageData(slug);
  if (!page) return { title: 'Not Found' };
  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
  };
}

import { SupportPageContent } from './SupportPageContent';

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === 'support') {
    const support = await apiFetch('/support-page', { next: { revalidate: 10 } } as any);
    if (!support) notFound();
    return <SupportPageContent support={support} />;
  }
  const page = await getPageData(slug);
  if (!page) {
    notFound();
  }
  return (
    <div className="bg-white">
      {page.sections.map((section: any) => (
        <DynamicSection key={section.id} section={section} />
      ))}
    </div>
  );
}

