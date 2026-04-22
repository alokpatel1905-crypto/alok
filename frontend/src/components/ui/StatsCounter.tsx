'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';

interface StatsCounterProps {
  value: string;
  label: string;
  suffix?: string;
}

export const StatsCounter = ({ value, label, suffix = '' }: StatsCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from string (e.g., "500+" -> 500)
  const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const originalSuffix = suffix || value.replace(/[0-9]/g, '');

  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-primary mb-2 flex justify-center items-baseline">
        <motion.span>{displayValue}</motion.span>
        <span className="text-3xl md:text-4xl ml-1">{originalSuffix}</span>
      </div>
      <p className="text-sm font-bold text-accent uppercase tracking-[0.2em]">{label}</p>
    </div>
  );
};
