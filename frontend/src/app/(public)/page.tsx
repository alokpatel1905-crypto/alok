import { getPageData } from '@/lib/api';
import { DynamicSection } from '@/components/cms/DynamicSection';

export const metadata = {
  title: 'Home | Green Mentors',
  description: 'Building the blueprint for schools, universities, and educators to design, execute, and sustain zero-carbon educational ecosystems globally.',
};

export default async function HomePage() {
  const page = await getPageData('home');

  if (!page) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-400">Welcome to Green Mentors</h2>
          <p className="text-slate-500 mt-2">The CMS content for the home page is currently being set up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {page.sections.map((section: any) => (
        <DynamicSection key={section.id} section={section} />
      ))}
    </div>
  );
}
