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
  // New lens distortion props
  lensEffect?: 'none' | 'convex' | 'concave' | 'dynamic';
  morphing?: boolean;
  reflection?: boolean;
  shine?: boolean;
  // Enhanced animation props
  magneticHover?: boolean;
  parallaxDepth?: number;
  rippleEffect?: boolean;
  autoGlow?: boolean;
  glowIntensity?: 'subtle' | 'medium' | 'intense';
}

const GlassEffect = forwardRef<HTMLDivElement, GlassEffectProps>(
  (
    {
      children,
      intensity = 'medium',
      borderRadius = 'lg',
      shadow = 'md',
      hover = true,
      animated = true,
      glow = false,
      glowColor = 'blue',
      className,
      style,
      // New props
      lensEffect = 'none',
      morphing = false,
      reflection = false,
      shine = false,
      magneticHover = false,
      parallaxDepth = 0,
      rippleEffect = false,
      autoGlow = false,
      glowIntensity = 'medium',
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const combinedRef = ref || elementRef;

    // GSAP animation setup
    useEffect(() => {
      if (!animated) {
        return;
      }

      const element = typeof combinedRef === 'object' && combinedRef?.current;
      if (!element) {
        return;
      }

      // Set initial state
      gsap.set(element, {
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        transformPerspective: 1000,
        transformOrigin: 'center center',
      });

      // Enhanced hover animations
      if (hover) {
        const handleMouseEnter = () => {
          const tl = gsap.timeline();

          if (magneticHover) {
            tl.to(element, {
              scale: 1.05,
              duration: 0.4,
              ease: 'power2.out',
            });
          } else {
            tl.to(element, {
              scale: 1.02,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          if (autoGlow) {
            const glowIntensityMap = {
              subtle: 0.2,
              medium: 0.4,
              intense: 0.6,
            };

            tl.to(
              element,
              {
                filter: `drop-shadow(0 0 20px rgba(59, 130, 246, ${glowIntensityMap[glowIntensity]}))`,
                duration: 0.3,
                ease: 'power2.out',
              },
              0
            );
          }
        };

        const handleMouseLeave = () => {
          const tl = gsap.timeline();

          tl.to(element, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out',
          });

          if (autoGlow) {
            tl.to(
              element,
              {
                filter: 'none',
                duration: 0.3,
                ease: 'power2.out',
              },
              0
            );
          }
        };

        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * (magneticHover ? -8 : -5);
          const rotateY = ((x - centerX) / centerX) * (magneticHover ? 8 : 5);

          // Apply parallax depth effect
          const translateZ =
            parallaxDepth > 0 ? ((y - centerY) / centerY) * parallaxDepth : 0;

          gsap.to(element, {
            rotationX: rotateX,
            rotationY: rotateY,
            z: translateZ,
            duration: magneticHover ? 0.2 : 0.3,
            ease: 'power2.out',
          });
        };

        const handleClick = (e: MouseEvent) => {
          if (rippleEffect) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className =
              'absolute rounded-full bg-white/30 animate-ping pointer-events-none';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.transform = 'translate(-50%, -50%)';

            element.appendChild(ripple);

            gsap.to(ripple, {
              width: '100px',
              height: '100px',
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
              onComplete: () => ripple.remove(),
            });
          }
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        if (rippleEffect) {
          element.addEventListener('click', handleClick);
        }

        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
          element.removeEventListener('mousemove', handleMouseMove);
          if (rippleEffect) {
            element.removeEventListener('click', handleClick);
          }
        };
      }

      // Return cleanup function for when hover is false
      return () => {
        // No cleanup needed when hover is false
      };
    }, [
      animated,
      hover,
      magneticHover,
      parallaxDepth,
      rippleEffect,
      autoGlow,
      glowIntensity,
      combinedRef,
    ]);

    // Lens distortion styles
    const lensStyles = {
      none: '',
      convex: 'liquid-glass-lens-convex',
      concave: 'liquid-glass-lens-concave',
      dynamic: 'liquid-glass-lens',
    };

    // Intensity-specific liquid glass styles
    const intensityStyles = {
      light: 'liquid-glass-light',
      medium: 'liquid-glass-medium',
      heavy: 'liquid-glass-heavy',
      ultra: 'liquid-glass-ultra',
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
    const glowStyles = glow
      ? {
          blue: 'shadow-glow-blue',
          purple: 'shadow-glow-purple',
          indigo: 'shadow-glow-indigo',
          green: 'shadow-glow-apple-blue',
          pink: 'shadow-glow-purple',
          orange: 'shadow-glow-blue',
        }
      : {};

    const baseClasses = cn(
      // Base glass effect
      'relative overflow-hidden',
      'transition-all duration-300 ease-apple-standard',

      // Core liquid glass effect
      lensEffect === 'none' ? 'liquid-glass' : '',

      // Lens distortion
      lensStyles[lensEffect],

      // Intensity (overrides base if lens effect is none)
      lensEffect === 'none' ? intensityStyles[intensity] : '',

      // Border radius
      radiusStyles[borderRadius],

      // Shadow
      shadowStyles[shadow],

      // Glow effect
      glow && glowStyles[glowColor],

      // Morphing effect
      morphing && 'liquid-glass-morph',

      // Reflection effect
      reflection && 'liquid-glass-reflection',

      // Shine effect
      shine && 'liquid-glass-shine',

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
        style={
          {
            ...style,
            // CSS custom properties for enhanced glass effect
            '--glass-bg': 'rgba(255, 255, 255, 0.1)',
            '--glass-border': 'rgba(255, 255, 255, 0.2)',
            '--glass-shadow': '0 8px 32px rgba(31, 38, 135, 0.2)',
            '--glass-highlight': 'inset 0 4px 20px rgba(255, 255, 255, 0.3)',
            '--lens-perspective': '1000px',
            '--lens-depth': `${parallaxDepth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Enhanced glass reflection overlay - only if not using CSS-based reflection */}
        {!reflection && (
          <div
            className='absolute inset-0 pointer-events-none opacity-60'
            style={{
              background:
                lensEffect === 'convex'
                  ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 70%)'
                  : lensEffect === 'concave'
                    ? 'radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.15) 70%)'
                    : 'rgba(255, 255, 255, 0.1)',
              borderRadius: 'inherit',
              backdropFilter: 'blur(1px)',
              boxShadow: `
              inset -10px -8px 0px -11px rgba(255, 255, 255, 1),
              inset 0px -9px 0px -8px rgba(255, 255, 255, 1)
            `,
              filter:
                'blur(1px) drop-shadow(10px 4px 6px rgba(0, 0, 0, 0.1)) brightness(115%)',
            }}
          />
        )}

        {/* Lens distortion overlay for dynamic effect */}
        {lensEffect === 'dynamic' && (
          <div
            className='absolute inset-0 pointer-events-none opacity-40'
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              borderRadius: 'inherit',
              filter: 'blur(0.5px)',
            }}
          />
        )}

        {/* Content wrapper */}
        <div className='relative z-10'>{children}</div>
      </div>
    );
  }
);

GlassEffect.displayName = 'GlassEffect';

export default GlassEffect;
