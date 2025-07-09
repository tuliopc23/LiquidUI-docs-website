'use client';

import React, { useEffect, useRef } from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';
import { scrollAnimations, springAnimations } from '@/lib/enhanced-animations';

export interface GlassCardProps extends Omit<AppleLiquidGlassProps, 'variant'> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({ 
  children,
  header,
  footer,
  padding = 'lg',
  spacing = 'md',
  className,
  ...props
}, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const combinedRef = (ref as React.RefObject<HTMLDivElement>) || cardRef;
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const element = cardRef.current;
    
    // Entrance animation
    springAnimations.entrance(element, { delay: 0.2 });
    
    // Parallax effect on scroll
    scrollAnimations.parallax(element, 0.3);
    
    return () => {
      // Cleanup handled by animation utils
    };
  }, []);
  const spacingStyles = {
    none: '',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  };

  const paddingToSize = {
    none: 'xs' as const,
    xs: 'xs' as const,
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
    xl: 'xl' as const,
    '2xl': '2xl' as const,
  };

  return (
    <AppleLiquidGlass
      ref={combinedRef}
      variant="card"
      size={paddingToSize[padding]}
      prominence="secondary"
      intensity="regular"
      interactive={false}
      magnetic={false}
      glow={false}
      className={cn(
        'flex flex-col glass-card',
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {header && (
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          {header}
        </div>
      )}
      
      <div className="flex-1">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-white/10 pt-4 mt-4">
          {footer}
        </div>
      )}
    </AppleLiquidGlass>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
