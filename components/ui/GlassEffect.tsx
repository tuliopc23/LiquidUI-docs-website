'use client';

import React, { useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export interface GlassEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'card' | 'modal' | 'button' | 'overlay' | 'widget';
  intensity?: 'light' | 'medium' | 'heavy' | 'ultra';
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  animated?: boolean;
  glow?: boolean;
  glowColor?: 'blue' | 'purple' | 'indigo' | 'green' | 'pink' | 'orange';
  className?: string;
  style?: React.CSSProperties;
}

const GlassEffect = forwardRef<HTMLDivElement, GlassEffectProps>(({
  children,
  variant = 'default',
  intensity = 'medium',
  borderRadius = 'lg',
  shadow = 'md',
  hover = true,
  animated = true,
  glow = false,
  glowColor = 'blue',
  className,
  style,
  ...props
}, ref) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const combinedRef = ref || elementRef;

  // GSAP animation setup
  useEffect(() => {
    if (!animated) return;

    const element = typeof combinedRef === 'object' && combinedRef?.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      scale: 1,
      rotationX: 0,
      rotationY: 0,
      transformPerspective: 1000,
      transformOrigin: 'center center',
    });

    // Hover animations
    if (hover) {
      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        gsap.to(element, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('mousemove', handleMouseMove);

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        element.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [animated, hover, combinedRef]);

  // Variant-specific styles
  const variantStyles = {
    default: 'bg-white/15 backdrop-blur-sm',
    card: 'bg-white/10 backdrop-blur-md',
    modal: 'bg-white/20 backdrop-blur-lg',
    button: 'bg-white/25 backdrop-blur-sm',
    overlay: 'bg-white/5 backdrop-blur-xl',
    widget: 'bg-white/15 backdrop-blur-md',
  };

  // Intensity-specific styles
  const intensityStyles = {
    light: 'backdrop-blur-sm backdrop-saturate-100',
    medium: 'backdrop-blur-md backdrop-saturate-150',
    heavy: 'backdrop-blur-lg backdrop-saturate-180',
    ultra: 'backdrop-blur-xl backdrop-saturate-200',
  };

  // Border radius styles
  const radiusStyles = {
    sm: 'rounded-apple-sm',
    md: 'rounded-apple-md',
    lg: 'rounded-apple-lg',
    xl: 'rounded-apple-xl',
    full: 'rounded-full',
  };

  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: 'shadow-apple-1',
    md: 'shadow-apple-2 shadow-glass',
    lg: 'shadow-apple-3 shadow-glass',
    xl: 'shadow-apple-4 shadow-glass',
  };

  // Glow styles
  const glowStyles = glow ? {
    blue: 'shadow-glow-blue',
    purple: 'shadow-glow-purple',
    indigo: 'shadow-glow-indigo',
    green: 'shadow-glow-apple-blue',
    pink: 'shadow-glow-purple',
    orange: 'shadow-glow-blue',
  } : {};

  const baseClasses = cn(
    // Base glass effect
    'relative overflow-hidden',
    'border border-white/20',
    'transition-all duration-300 ease-apple-standard',
    
    // Variant styles
    variantStyles[variant],
    
    // Intensity
    intensityStyles[intensity],
    
    // Border radius
    radiusStyles[borderRadius],
    
    // Shadow
    shadowStyles[shadow],
    
    // Glow effect
    glow && glowStyles[glowColor],
    
    // Hover effects
    hover && 'hover:bg-white/30 hover:border-white/40',
    hover && 'hover:shadow-apple-3',
    
    // Custom classes
    className
  );

  return (
    <div
      ref={combinedRef}
      className={baseClasses}
      style={{
        ...style,
        // CSS custom properties for glass effect
        '--glass-bg': 'rgba(255, 255, 255, 0.1)',
        '--glass-border': 'rgba(255, 255, 255, 0.2)',
        '--glass-shadow': '0 8px 32px rgba(31, 38, 135, 0.2)',
        '--glass-highlight': 'inset 0 4px 20px rgba(255, 255, 255, 0.3)',
      } as React.CSSProperties}
      {...props}
    >
      {/* Glass reflection overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 'inherit',
          backdropFilter: 'blur(1px)',
          boxShadow: `
            inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
            inset 0px -9px 0px -8px rgba(255, 255, 255, 1)
          `,
          filter: 'blur(1px) drop-shadow(10px 4px 6px rgba(0, 0, 0, 0.1)) brightness(115%)',
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

GlassEffect.displayName = 'GlassEffect';

export default GlassEffect;
