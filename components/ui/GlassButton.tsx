'use client';

import React, { useEffect, useRef } from 'react';
import AppleLiquidGlass, { AppleLiquidGlassProps } from './AppleLiquidGlass';
import { cn } from '@/lib/utils';
import { microInteractions, hapticFeedback, magneticHover } from '@/lib/enhanced-animations';

export interface GlassButtonProps extends Omit<AppleLiquidGlassProps, 'variant' | 'onClick'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const GlassButton = React.forwardRef<HTMLDivElement, GlassButtonProps>(({
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
}, ref) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const combinedRef = (ref as React.RefObject<HTMLDivElement>) || buttonRef;
  
  useEffect(() => {
    if (!combinedRef.current || disabled) return;
    
    const element = combinedRef.current;
    
    // Setup magnetic hover effect
    const magneticAnimation = magneticHover.button(element);
    
    // Setup haptic feedback interactions
    const interactionCleanup = microInteractions.buttonPress(element);
    
    // Enhanced click handler with haptic feedback
    const handleEnhancedClick = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      
      // Trigger haptic feedback
      hapticFeedback.mediumImpact(element);
      
      // Original click handler
      if (onClick) {
        const syntheticEvent = mouseEvent as unknown as React.MouseEvent<HTMLButtonElement>;
        onClick(syntheticEvent);
      }
    };
    
    element.addEventListener('click', handleEnhancedClick);
    
    return () => {
      element.removeEventListener('click', handleEnhancedClick);
      if (interactionCleanup) interactionCleanup();
    };
  }, [disabled, onClick]);
  const variantStyles = {
    primary: 'text-white font-semibold',
    secondary: 'text-white/90 font-medium',
    outline: 'text-white font-medium border-2 border-white/30',
    ghost: 'text-white/80 font-medium',
  };

  const variantToProminence = {
    primary: 'primary' as const,
    secondary: 'secondary' as const,
    outline: 'tertiary' as const,
    ghost: 'quaternary' as const,
  };

  const variantToIntensity = {
    primary: 'thick' as const,
    secondary: 'regular' as const,
    outline: 'thin' as const,
    ghost: 'ultraThin' as const,
  };

  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-white/50',
    'disabled:opacity-50 disabled:cursor-not-allowed',
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
      <AppleLiquidGlass
        variant="button"
        size={size}
        prominence={variantToProminence[variant]}
        intensity={variantToIntensity[variant]}
        interactive={true}
        magnetic={true}
        glow={variant === 'primary'}
        className={baseClasses}
        {...props}
      >
        <a href={href} className="inline-flex items-center gap-2">
          {content}
        </a>
      </AppleLiquidGlass>
    );
  }

  return (
    <AppleLiquidGlass
      ref={combinedRef}
      variant="button"
      size={size}
      prominence={variantToProminence[variant]}
      intensity={variantToIntensity[variant]}
      interactive={true}
      magnetic={true}
      glow={variant === 'primary'}
      className={cn(baseClasses, 'glass-button')}
      {...props}
    >
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className="inline-flex items-center gap-2 w-full h-full"
      >
        {content}
      </button>
    </AppleLiquidGlass>
  );
});

GlassButton.displayName = 'GlassButton';

export default GlassButton;
