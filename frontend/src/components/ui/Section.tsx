import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'off-white' | 'nature' | 'dark';
}

export const Section = ({ children, className, id, background = 'white' }: SectionProps) => {
  const backgrounds = {
    white: 'bg-white',
    'off-white': 'bg-background',
    nature: 'bg-nature-gradient',
    dark: 'bg-foreground text-white',
  };

  return (
    <section 
      id={id} 
      className={cn('section-spacing overflow-hidden relative', backgrounds[background], className)}
    >
      {children}
    </section>
  );
};

export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn('max-w-[1200px] mx-auto px-6 lg:px-10', className)}>
      {children}
    </div>
  );
};
