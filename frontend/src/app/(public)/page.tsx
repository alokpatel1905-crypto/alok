import React from 'react';
import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}

export async function generateMetadata() {
  return {
    title: 'Green Mentors | Global Responsible Education Network',
    description: 'Special Consultative Status with the United Nations ECOSOC since 2021. Transforming education for a sustainable future.',
  };
}
