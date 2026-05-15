import React from 'react';
import AboutClient from './AboutClient';

export default function AboutPage() {
  return <AboutClient />;
}

export async function generateMetadata() {
  return {
    title: 'About | Green Mentors',
    description: 'Learn about our mission to transition the global educational system towards responsibility and environmental consciousness.',
  };
}
