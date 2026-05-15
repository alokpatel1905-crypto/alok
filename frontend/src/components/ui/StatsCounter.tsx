'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatsCounterProps {
  value: string;
  label?: string;
  suffix?: string;
  className?: string;
}

export const StatsCounter = ({ value, label, suffix = '', className }: StatsCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
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
    <div ref={ref} className={cn("text-center", className)}>
      <div className="flex justify-center items-baseline font-black">
        <motion.span>{displayValue}</motion.span>
        <span className="text-[0.6em] ml-1">{originalSuffix}</span>
      </div>
      {label && <p className="text-[0.2em] opacity-40 font-black uppercase tracking-[0.3em] mt-2">{label}</p>}
    </div>
  );
};
