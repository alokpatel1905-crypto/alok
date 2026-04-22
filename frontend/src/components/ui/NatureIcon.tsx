import { 
  Leaf, 
  Globe, 
  Droplets, 
  Wind, 
  Sun, 
  Sprout, 
  Trees, 
  Recycle, 
  School, 
  Users,
  Award,
  Target,
  Trophy,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Icons = {
  Leaf,
  Globe,
  Water: Droplets,
  Air: Wind,
  Energy: Sun,
  Sprout,
  Forest: Trees,
  Sustainability: Recycle,
  School,
  Users,
  Award,
  Target,
  Trophy,
  ShieldCheck,
  Sparkles
};

interface NatureIconProps {
  name: keyof typeof Icons;
  size?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'white';
}

export const NatureIcon = ({ name, size = 24, className, variant = 'primary' }: NatureIconProps) => {
  const Icon = Icons[name];
  
  const variants = {
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    accent: 'text-accent bg-accent/10',
    white: 'text-white bg-white/20',
  };

  return (
    <div className={cn('p-3 rounded-2xl inline-flex items-center justify-center', variants[variant], className)}>
      <Icon size={size} strokeWidth={1.5} />
    </div>
  );
};
