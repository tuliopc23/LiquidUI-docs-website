'use client';

import React from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends Omit<GlassEffectProps, 'variant'> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  header,
  footer,
  padding = 'lg',
  spacing = 'md',
  className,
  ...props
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const spacingStyles = {
    none: '',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
  };

  return (
    <GlassEffect
      variant="card"
      className={cn(
        'flex flex-col',
        paddingStyles[padding],
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
    </GlassEffect>
  );
};

export default GlassCard;
