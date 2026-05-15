'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white shadow-[0_10px_24px_-12px_rgba(28,43,26,0.55)] hover:bg-primary/90 hover:shadow-[0_14px_28px_-14px_rgba(28,43,26,0.6)]',
      secondary: 'bg-secondary text-primary shadow-[0_10px_24px_-12px_rgba(124,184,122,0.55)] hover:bg-secondary/90',
      outline: 'border border-primary/20 bg-white/40 text-primary hover:bg-primary hover:text-white hover:border-primary',
      ghost: 'text-primary hover:bg-primary/5',
      glass: 'glass text-primary hover:bg-white/80',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg font-semibold',
      xl: 'px-10 py-5 text-xl font-bold tracking-tight',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary/25',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...(props as any)}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
