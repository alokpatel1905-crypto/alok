import React from 'react';
import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';
import { CardGrid } from './sections/CardGrid';
import { Timeline } from './sections/Timeline';
import { CTA } from './sections/CTA';

interface SectionProps {
  section: {
    sectionKey: string;
    content: any;
  };
}

export const DynamicSection: React.FC<SectionProps> = ({ section }) => {
  switch (section.sectionKey) {
    case 'hero':
      return <Hero data={section.content} />;
    case 'stats':
      return <Stats data={section.content} />;
    case 'cards':
      return <CardGrid data={section.content} />;
    case 'timeline':
      return <Timeline data={section.content} />;
    case 'cta':
      return <CTA data={section.content} />;
    default:
      return (
        <div className="py-10 text-center border-2 border-dashed border-slate-200 text-slate-400">
          Section type "{section.sectionKey}" not implemented yet.
        </div>
      );
  }
};
