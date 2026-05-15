import React from 'react';
import ContactPageContent from './ContactPageContent';

export default function ContactPage() {
  return <ContactPageContent />;
}

export async function generateMetadata() {
  return {
    title: 'Contact | Green Mentors',
    description: 'Connect with our global strategic nodes in India and the USA for sustainable education partnership.',
  };
}
