import React from 'react';
import AuditFormClient from './AuditFormClient';

export async function generateMetadata() {
  return {
    title: 'Green School Audit | Green Mentors',
    description:
      'Submit your Green School Audit Framework data covering governance, sustainability, water, energy, air quality, health, waste, education, innovation, and localization.',
  };
}

export default function AuditPage() {
  return <AuditFormClient />;
}
