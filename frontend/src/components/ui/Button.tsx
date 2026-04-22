'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white shadow-[0_10px_20px_-5px_rgba(6,78,59,0.3)] hover:bg-primary/90 hover:shadow-[0_15px_25px_-5px_rgba(6,78,59,0.4)]',
      secondary: 'bg-secondary text-white shadow-[0_10px_20px_-5px_rgba(16,185,129,0.3)] hover:bg-secondary/90',
      outline: 'border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary',
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
          'inline-flex items-center justify-center rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
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
