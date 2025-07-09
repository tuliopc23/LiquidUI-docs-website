'use client';

import React from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassHeaderProps extends Omit<GlassEffectProps, 'variant' | 'as'> {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  variant?: 'default' | 'centered' | 'split';
  className?: string;
}

const GlassHeader: React.FC<GlassHeaderProps> = ({
  title,
  subtitle,
  actions,
  breadcrumb,
  variant = 'default',
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'flex items-center justify-between',
    centered: 'flex flex-col items-center text-center',
    split: 'flex items-start justify-between',
  };

  const baseClasses = cn(
    'w-full p-6 rounded-lg',
    'backdrop-blur-xl',
    variantStyles[variant],
    className
  );

  return (
    <GlassEffect
      variant="card"
      className={baseClasses}
      {...props}
    >
      <div className="flex-1">
        {breadcrumb && (
          <div className="mb-3">
            {breadcrumb}
          </div>
        )}
        
        <h1 className="text-2xl font-bold text-white mb-2">
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-white/70 text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center space-x-2">
          {actions}
        </div>
      )}
    </GlassEffect>
  );
};

export default GlassHeader;
