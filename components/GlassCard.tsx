import React from 'react';
import { cn } from '../lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glassMorphism?: boolean;
  hoverEffect?: boolean;
  clickable?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  padding = 'md',
  glassMorphism = true,
  hoverEffect = false,
  clickable = false,
  ...props
}: GlassCardProps) {
  const variants = {
    default: 'bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10',
    elevated: 'bg-white/15 dark:bg-black/15 border border-white/30 dark:border-white/15 shadow-lg',
    bordered: 'bg-white/5 dark:bg-black/5 border-2 border-white/30 dark:border-white/20',
    flat: 'bg-white/5 dark:bg-black/5 border-none',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-all duration-300',
        variants[variant],
        paddings[padding],
        glassMorphism && 'backdrop-blur-md',
        hoverEffect && 'hover:translate-y-[-4px] hover:shadow-xl',
        clickable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}