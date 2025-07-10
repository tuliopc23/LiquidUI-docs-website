'use client';

import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { magneticHover, microInteractions } from '@/lib/enhanced-animations';

export interface AppleLiquidGlassProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?:
    | 'card'
    | 'button'
    | 'widget'
    | 'sidebar'
    | 'modal'
    | 'navigation'
    | 'toolbar'
    | 'panel';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  intensity?: 'ultraThin' | 'thin' | 'regular' | 'thick' | 'ultraThick';
  distortion?: boolean;
  magnetic?: boolean;
  interactive?: boolean;
  glow?: boolean;
  specular?: boolean;
  elevated?: boolean;
  prominence?: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  className?: string;
}

const AppleLiquidGlass = forwardRef<HTMLDivElement, AppleLiquidGlassProps>(
  (
    {
      children,
      variant = 'card',
      size = 'md',
      intensity = 'regular',
      distortion = false,
      magnetic = false,
      interactive = false,
      glow = false,
      specular = true,
      elevated = false,
      prominence = 'secondary',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const glassRef = useRef<HTMLDivElement>(null);

    // Properly handle ref merging for forwardRef
    const setCombinedRef = (node: HTMLDivElement | null) => {
      // Set internal ref
      (glassRef as React.MutableRefObject<HTMLDivElement | null>).current =
        node;

      // Forward ref to parent component
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    useEffect(() => {
      if (!glassRef.current) {
        return;
      }

      const element = glassRef.current;

      // Add magnetic hover effect for interactive elements
      if (magnetic && interactive) {
        const cleanup = magneticHover.magnetic(element, 0.3);
        return cleanup;
      }

      // Add interactive effects following Apple HIG
      if (interactive) {
        const cleanup = microInteractions.buttonPress(element);
        return cleanup;
      }

      // Apple HIG entrance animation - subtle and fluid
      gsap.fromTo(
        element,
        { opacity: 0, scale: 0.98, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );

      return undefined;
    }, [magnetic, interactive]);

    // Apple HIG size system
    const sizeClasses = {
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
      '2xl': 'p-10',
    };

    // Apple HIG corner radius system
    const variantClasses = {
      card: 'rounded-3xl', // 24px
      button: 'rounded-2xl', // 16px
      widget: 'rounded-xl', // 12px
      sidebar: 'rounded-r-3xl',
      modal: 'rounded-2xl',
      navigation: 'rounded-2xl',
      toolbar: 'rounded-xl',
      panel: 'rounded-3xl',
    };

    // Apple HIG blur intensity system
    const intensityClasses = {
      ultraThin: 'backdrop-blur-sm', // 4px
      thin: 'backdrop-blur', // 8px
      regular: 'backdrop-blur-md', // 12px
      thick: 'backdrop-blur-lg', // 16px
      ultraThick: 'backdrop-blur-xl', // 24px
    };

    // Apple HIG prominence system
    const prominenceClasses = {
      primary: 'bg-white/25 border-white/30',
      secondary: 'bg-white/15 border-white/20',
      tertiary: 'bg-white/10 border-white/15',
      quaternary: 'bg-white/5 border-white/10',
    };

    const baseClasses = cn(
      'relative overflow-hidden',
      'border transition-all duration-300 ease-out',
      'apple-liquid-glass',
      sizeClasses[size],
      variantClasses[variant],
      intensityClasses[intensity],
      prominenceClasses[prominence],
      magnetic && 'glass-magnetic',
      interactive && 'cursor-pointer select-none',
      elevated && 'shadow-2xl shadow-black/10',
      glow && 'hover:shadow-2xl hover:shadow-blue-500/20',
      className
    );

    return (
      <div
        ref={setCombinedRef}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {/* Glass Filter Layer - Apple HIG backdrop filter */}
        <div
          className={cn(
            'absolute inset-0 z-0',
            'backdrop-filter backdrop-saturate-150',
            distortion && 'liquid-distortion'
          )}
        />

        {/* Glass Overlay Layer - Apple HIG translucent material */}
        <div
          className={cn(
            'absolute inset-0 z-10',
            prominence === 'primary' && 'bg-white/25',
            prominence === 'secondary' && 'bg-white/15',
            prominence === 'tertiary' && 'bg-white/10',
            prominence === 'quaternary' && 'bg-white/5'
          )}
        />

        {/* Glass Specular Layer - Apple HIG highlight */}
        {specular && (
          <div
            className={cn(
              'absolute inset-0 z-20 rounded-inherit',
              'shadow-inner',
              'before:absolute before:inset-0 before:rounded-inherit',
              'before:bg-gradient-to-b before:from-white/20 before:via-transparent before:to-transparent'
            )}
          />
        )}

        {/* Content Layer - Apple HIG content hierarchy */}
        <div className='relative z-30 h-full flex flex-col justify-center'>
          {children}
        </div>
      </div>
    );
  }
);

AppleLiquidGlass.displayName = 'AppleLiquidGlass';

export default AppleLiquidGlass;
