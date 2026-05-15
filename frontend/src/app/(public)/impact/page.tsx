import React from 'react';
import ImpactClient from './ImpactClient';

export default function ImpactPage() {
  return <ImpactClient />;
}

export async function generateMetadata() {
  return {
    title: 'Impact | Green Mentors',
    description: 'Measuring our success by the number of educational ecosystems we transition towards sustainability.',
  };
}
