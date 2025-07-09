'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassFooterProps extends Omit<AppleLiquidGlassProps, 'variant' | 'children'> {
  children?: React.ReactNode;
  copyright?: string;
  links?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  variant?: 'simple' | 'detailed' | 'compact';
  className?: string;
}

const GlassFooter = React.forwardRef<HTMLDivElement, GlassFooterProps>(({
  children,
  copyright,
  links = [],
  variant = 'simple',
  className,
  ...props
}, ref) => {
  const variantStyles = {
    simple: 'flex items-center justify-between py-4 px-6',
    detailed: 'flex flex-col space-y-4 py-6 px-6',
    compact: 'flex items-center justify-center py-2 px-4',
  };

  const baseClasses = cn(
    'w-full',
    'border-t border-white/20',
    variantStyles[variant],
    className
  );

  const renderLinks = () => {
    if (links.length === 0) return null;

    return (
      <div className="flex items-center space-x-6">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            {link.href ? (
              <a
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <button
                onClick={link.onClick}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderCopyright = () => {
    if (!copyright) return null;

    return (
      <div className="text-sm text-white/60">
        {copyright}
      </div>
    );
  };

  return (
    <AppleLiquidGlass
      ref={ref}
      variant="panel"
      size="lg"
      prominence="tertiary"
      intensity="regular"
      interactive={false}
      className={baseClasses}
      {...props}
    >
      {variant === 'simple' && (
        <>
          {renderCopyright()}
          {renderLinks()}
        </>
      )}

      {variant === 'detailed' && (
        <>
          {children && (
            <div className="flex-1">
              {children}
            </div>
          )}
          <div className="flex items-center justify-between border-t border-white/20 pt-4">
            {renderCopyright()}
            {renderLinks()}
          </div>
        </>
      )}

      {variant === 'compact' && (
        <div className="flex items-center space-x-4">
          {renderCopyright()}
          {renderLinks()}
        </div>
      )}
    </AppleLiquidGlass>
  );
});

GlassFooter.displayName = 'GlassFooter';

export default GlassFooter;
