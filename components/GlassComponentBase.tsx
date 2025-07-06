import React from 'react';
import { cn } from '../lib/utils';

type GlassIntensity = 'subtle' | 'default' | 'strong' | 'intense';

interface GlassComponentProps {
  children: React.ReactNode;
  className?: string;
  intensity?: GlassIntensity;
  hoverEffect?: boolean;
  animateOnScroll?: boolean;
  magneticEffect?: boolean;
}

export function GlassComponent({
  children,
  className,
  intensity = 'default',
  hoverEffect = false,
  animateOnScroll = false,
  magneticEffect = false,
}: GlassComponentProps) {
  const intensityMap = {
    subtle: 'backdrop-blur-sm bg-white/5 dark:bg-black/5 border-white/10 dark:border-white/5',
    default: 'backdrop-blur-md bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10',
    strong: 'backdrop-blur-lg bg-white/20 dark:bg-black/20 border-white/30 dark:border-white/15',
    intense: 'backdrop-blur-xl bg-white/30 dark:bg-black/30 border-white/40 dark:border-white/20',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border transition-all duration-300',
        intensityMap[intensity],
        hoverEffect && 'hover:translate-y-[-4px] hover:shadow-lg',
        animateOnScroll && 'scroll-animate',
        magneticEffect && 'magnetic-element',
        className
      )}
    >
      {children}
    </div>
  );
}