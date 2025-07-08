'use client';

import React from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassButtonProps extends Omit<GlassEffectProps, 'variant' | 'as'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  href,
  onClick,
  className,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-5 text-xl',
  };

  const variantStyles = {
    primary: 'bg-white/20 text-white hover:bg-white/30',
    secondary: 'bg-white/10 text-white/90 hover:bg-white/20',
    outline: 'bg-transparent border-2 border-white/30 text-white hover:bg-white/10',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
      {icon && iconPosition === 'left' && !loading && icon}
      {children}
      {icon && iconPosition === 'right' && !loading && icon}
    </>
  );

  if (href) {
    return (
      <GlassEffect
        variant="button"
        className={baseClasses}
        {...props}
      >
        <a href={href} className="inline-flex items-center gap-2">
          {content}
        </a>
      </GlassEffect>
    );
  }

  return (
    <GlassEffect
      variant="button"
      className={baseClasses}
      {...props}
    >
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className="inline-flex items-center gap-2"
      >
        {content}
      </button>
    </GlassEffect>
  );
};

export default GlassButton;
