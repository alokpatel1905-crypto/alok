'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'outline' | 'flat';
  hoverEffect?: boolean;
}

export const Card = ({ children, className, variant = 'default', hoverEffect = true }: CardProps) => {
  const variants = {
    default: 'bg-white/88 shadow-premium border border-black/5',
    glass: 'glass',
    outline: 'border border-primary/10 bg-white/35',
    flat: 'bg-primary/5 border border-primary/10',
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.3 } } : {}}
      className={cn(
        'rounded-lg p-8 transition-shadow duration-300',
        variants[variant],
        hoverEffect && 'hover:shadow-2xl hover:shadow-primary/10',
        className
      )}
    >
      {children}
    </motion.div>
  );
};
