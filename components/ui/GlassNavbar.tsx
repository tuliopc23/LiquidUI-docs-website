'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassNavbarProps extends Omit<AppleLiquidGlassProps, 'variant'> {
  children: React.ReactNode;
  variant?: 'fixed' | 'static' | 'sticky';
  position?: 'top' | 'bottom';
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const GlassNavbar = React.forwardRef<HTMLDivElement, GlassNavbarProps>(({
  children,
  variant = 'static',
  position = 'top',
  logo,
  actions,
  className,
  ...props
}, ref) => {
  const variantStyles = {
    fixed: 'fixed left-0 right-0 z-50',
    static: 'static',
    sticky: 'sticky z-50',
  };

  const positionStyles = {
    top: variant === 'fixed' ? 'top-0' : variant === 'sticky' ? 'top-0' : '',
    bottom: variant === 'fixed' ? 'bottom-0' : variant === 'sticky' ? 'bottom-0' : '',
  };

  const baseClasses = cn(
    'w-full',
    'border-b border-white/20',
    variantStyles[variant],
    positionStyles[position],
    className
  );

  return (
    <AppleLiquidGlass
      ref={ref}
      variant="navigation"
      size="md"
      prominence="secondary"
      intensity="thick"
      interactive={false}
      magnetic={false}
      glow={false}
      className={baseClasses}
      {...props}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {logo && (
          <div className="flex items-center flex-shrink-0">
            {logo}
          </div>
        )}
        
        <div className="flex items-center space-x-4">
          {children}
        </div>
        
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </nav>
    </AppleLiquidGlass>
  );
});

GlassNavbar.displayName = 'GlassNavbar';

export default GlassNavbar;
