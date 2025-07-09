'use client';

import React from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';

export interface GlassFloatingActionProps
  extends Omit<AppleLiquidGlassProps, 'variant' | 'children' | 'onClick'> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  'aria-label': string;
  className?: string;
}

const GlassFloatingAction = React.forwardRef<
  HTMLDivElement,
  GlassFloatingActionProps
>(
  (
    {
      icon,
      variant = 'primary',
      size = 'md',
      position = 'bottom-right',
      onClick,
      'aria-label': ariaLabel,
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'w-10 h-10 text-sm',
      md: 'w-12 h-12 text-base',
      lg: 'w-16 h-16 text-lg',
      xl: 'w-20 h-20 text-xl',
    };

    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-green-500 text-white hover:bg-green-600',
      outline:
        'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-100',
      ghost: 'bg-white text-blue-500 hover:bg-blue-100',
    };

    const positionStyles = {
      'bottom-right': 'fixed bottom-4 right-4',
      'bottom-left': 'fixed bottom-4 left-4',
      'top-right': 'fixed top-4 right-4',
      'top-left': 'fixed top-4 left-4',
    };

    const baseClasses = cn(
      'inline-flex items-center justify-center',
      'font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-white/50',
      'relative shadow-lg',
      sizeStyles[size],
      variantStyles[variant],
      positionStyles[position],
      className
    );

    return (
      <AppleLiquidGlass
        ref={ref}
        variant='button'
        size={size as any}
        prominence={variant === 'primary' ? 'primary' : 'secondary'}
        intensity='regular'
        interactive={true}
        magnetic={true}
        glow={variant === 'primary'}
        elevated={true}
        className={baseClasses}
        {...props}
      >
        <button
          onClick={onClick}
          aria-label={ariaLabel}
          className='flex items-center justify-center w-full h-full'
        >
          {icon}
        </button>
      </AppleLiquidGlass>
    );
  }
);

GlassFloatingAction.displayName = 'GlassFloatingAction';

export default GlassFloatingAction;
