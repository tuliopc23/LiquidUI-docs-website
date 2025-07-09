'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassIconButtonProps extends Omit<AppleLiquidGlassProps, 'variant' | 'children' | 'onClick'> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  'aria-label': string;
  className?: string;
}

const GlassIconButton = React.forwardRef<HTMLDivElement, GlassIconButtonProps>(({
  icon,
  variant = 'primary',
  size = 'md',
  shape = 'circle',
  loading = false,
  disabled = false,
  href,
  onClick,
  'aria-label': ariaLabel,
  className,
  ...props
}, ref) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-14 h-14 text-xl',
  };

  const variantStyles = {
    primary: 'bg-white/20 text-white hover:bg-white/30',
    secondary: 'bg-white/10 text-white/90 hover:bg-white/20',
    outline: 'bg-transparent border-2 border-white/30 text-white hover:bg-white/10',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
    sizeStyles[size],
    variantStyles[variant],
    shapeStyles[shape],
    className
  );

  const iconContent = (
    <>
      {loading && (
        <svg 
          className="animate-spin absolute inset-0 m-auto h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={cn('transition-opacity duration-200', loading && 'opacity-0')}>
        {icon}
      </span>
    </>
  );

  if (href) {
    return (
      <AppleLiquidGlass
        ref={ref}
        variant="button"
        size={size as any}
        prominence={variant === 'primary' ? 'primary' : 'secondary'}
        intensity="regular"
        interactive={true}
        magnetic={true}
        glow={variant === 'primary'}
        className={baseClasses}
        {...props}
      >
        <a 
          href={href} 
          className="inline-flex items-center justify-center w-full h-full"
          aria-label={ariaLabel}
        >
          {iconContent}
        </a>
      </AppleLiquidGlass>
    );
  }

  return (
    <AppleLiquidGlass
      ref={ref}
      variant="button"
      size={size as any}
      prominence={variant === 'primary' ? 'primary' : 'secondary'}
      intensity="regular"
      interactive={true}
      magnetic={true}
      glow={variant === 'primary'}
      className={baseClasses}
      {...props}
    >
      <button
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        className="inline-flex items-center justify-center w-full h-full"
      >
        {iconContent}
      </button>
    </AppleLiquidGlass>
  );
});

GlassIconButton.displayName = 'GlassIconButton';

export default GlassIconButton;
