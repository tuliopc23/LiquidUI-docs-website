'use client';

import React from 'react';
import GlassEffect, { GlassEffectProps } from './GlassEffect';
import { cn } from '@/lib/utils';

export interface GlassToggleButtonProps
  extends Omit<GlassEffectProps, 'variant' | 'as'> {
  children: React.ReactNode;
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  className?: string;
}

const GlassToggleButton: React.FC<GlassToggleButtonProps> = ({
  children,
  pressed,
  defaultPressed = false,
  onPressedChange,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...props
}) => {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed);

  const isPressed = pressed !== undefined ? pressed : internalPressed;
  const isControlled = pressed !== undefined;

  const handleClick = () => {
    if (disabled) {
      return;
    }

    const newPressed = !isPressed;

    if (!isControlled) {
      setInternalPressed(newPressed);
    }

    onPressedChange?.(newPressed);
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
    xl: 'px-8 py-5 text-xl',
  };

  const variantStyles = {
    primary: {
      base: 'bg-white/20 text-white hover:bg-white/30',
      pressed: 'bg-white/40 text-white shadow-lg',
    },
    secondary: {
      base: 'bg-white/10 text-white/90 hover:bg-white/20',
      pressed: 'bg-white/30 text-white shadow-lg',
    },
    outline: {
      base: 'bg-transparent border-2 border-white/30 text-white hover:bg-white/10',
      pressed: 'bg-white/20 border-white/50 text-white shadow-lg',
    },
    ghost: {
      base: 'bg-transparent text-white hover:bg-white/10',
      pressed: 'bg-white/20 text-white shadow-lg',
    },
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative overflow-hidden',
    sizeStyles[size],
    isPressed ? variantStyles[variant].pressed : variantStyles[variant].base,
    isPressed && 'transform scale-95',
    className
  );

  return (
    <GlassEffect variant='button' className={baseClasses} {...props}>
      <button
        onClick={handleClick}
        disabled={disabled}
        aria-pressed={isPressed}
        className='inline-flex items-center justify-center gap-2 w-full h-full'
      >
        {children}
      </button>
    </GlassEffect>
  );
};

export default GlassToggleButton;
