'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import appleDesign from '@/lib/apple-design-enhancements';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AppleHIGContainerProps {
  children: ReactNode;
  variant?: 'page' | 'section' | 'card' | 'modal';
  enableAnimations?: boolean;
  enableScrollEffects?: boolean;
  className?: string;
}

/**
 * Apple HIG-compliant container with premium animations and interactions
 */
export function AppleHIGContainer({
  children,
  variant = 'section',
  enableAnimations = true,
  enableScrollEffects = true,
  className = '',
}: AppleHIGContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableAnimations || !containerRef.current) {
      return;
    }

    const element = containerRef.current;

    // Setup accessibility
    appleDesign.accessibility.respectReducedMotion();
    appleDesign.accessibility.enhanceFocusIndicators();
    appleDesign.accessibility.highContrastMode();

    // Apply performance optimizations
    appleDesign.performance.optimizeElement(element);

    // Setup animations based on variant
    const animations: gsap.core.Timeline[] = [];

    if (variant === 'page') {
      appleDesign.pageTransitions.fadeInScale(0.8);
      if (enableScrollEffects) {
        appleDesign.scrollAnimations.revealOnScroll(
          `#${element.id || 'page-container'}`
        );
      }
    }

    if (variant === 'card') {
      animations.push(
        appleDesign.microInteractions.magneticHover(element, 1.02)
      );
      animations.push(appleDesign.microInteractions.glassIntensify(element));
    }

    // Cleanup
    return () => {
      animations.forEach(animation => animation.kill());
      appleDesign.performance.cleanupElement(element);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [variant, enableAnimations, enableScrollEffects]);

  const baseClasses = {
    page: 'min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900',
    section: 'relative',
    card: 'relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500',
    modal:
      'relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl',
  };

  return (
    <div
      ref={containerRef}
      className={`apple-hig-container ${baseClasses[variant]} ${className}`}
      data-animate='page'
      data-respect-motion
    >
      {children}
    </div>
  );
}

interface AppleButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Apple HIG-compliant button with premium interactions
 */
export function AppleButton({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: AppleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current || disabled) {
      return;
    }

    const button = buttonRef.current;

    // Setup micro interactions
    const hoverAnimation = appleDesign.microInteractions.magneticHover(
      button,
      1.05
    );
    const pressAnimation = appleDesign.microInteractions.hapticPress(button);
    const focusAnimation = appleDesign.microInteractions.focusRing(button);

    return () => {
      hoverAnimation.kill();
      pressAnimation.kill();
      focusAnimation.kill();
    };
  }, [disabled]);

  const variantClasses = {
    primary:
      'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl',
    secondary:
      'bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white border border-white/20 backdrop-blur-md',
    tertiary:
      'bg-transparent hover:bg-white/10 text-blue-600 dark:text-blue-400',
    destructive:
      'bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg min-h-[32px]',
    md: 'px-4 py-3 text-base rounded-xl min-h-[44px]',
    lg: 'px-6 py-4 text-lg rounded-2xl min-h-[52px]',
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        apple-button glass-focus
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'opacity-75' : ''}
        font-medium transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50
        active:scale-95
        ${className}
      `}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      }}
    >
      {loading ? (
        <div className='flex items-center gap-2'>
          <div className='w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin' />
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
}

interface AppleCardProps {
  children: ReactNode;
  hover?: boolean;
  interactive?: boolean;
  className?: string;
}

/**
 * Apple HIG-compliant card with liquid glass effects
 */
export function AppleCard({
  children,
  hover = true,
  interactive = false,
  className = '',
}: AppleCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    const card = cardRef.current;
    const animations: gsap.core.Timeline[] = [];

    if (hover) {
      animations.push(appleDesign.microInteractions.magneticHover(card, 1.02));
      animations.push(appleDesign.microInteractions.glassIntensify(card));
    }

    if (interactive) {
      animations.push(appleDesign.microInteractions.hapticPress(card));
      card.style.cursor = 'pointer';
    }

    // Scroll reveal animation
    appleDesign.scrollAnimations.revealOnScroll(
      `#${card.id || 'apple-card-' + Math.random().toString(36).substr(2, 9)}`
    );

    return () => {
      animations.forEach(animation => animation.kill());
    };
  }, [hover, interactive]);

  return (
    <div
      ref={cardRef}
      className={`
        apple-card glass-focus
        backdrop-blur-xl bg-white/10 dark:bg-white/5
        border border-white/20 dark:border-white/10
        rounded-2xl shadow-lg hover:shadow-2xl
        transition-all duration-500 ease-out
        ${interactive ? 'cursor-pointer hover:scale-105' : ''}
        ${className}
      `}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {children}
    </div>
  );
}

interface AppleTextProps {
  children: ReactNode;
  variant?: keyof typeof appleDesign.typography;
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
  className?: string;
}

/**
 * Apple HIG-compliant typography component
 */
export function AppleText({
  children,
  variant = 'body',
  color = 'primary',
  className = '',
}: AppleTextProps) {
  const typography = appleDesign.typography[variant];

  const colorClasses = {
    primary: 'text-gray-900 dark:text-white',
    secondary: 'text-gray-600 dark:text-gray-300',
    tertiary: 'text-gray-500 dark:text-gray-400',
    accent: 'text-blue-600 dark:text-blue-400',
  };

  return (
    <span
      className={`apple-text ${colorClasses[color]} ${className}`}
      style={{
        ...typography,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
      }}
    >
      {children}
    </span>
  );
}

interface AppleSectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

/**
 * Apple HIG-compliant section with automatic animations
 */
export function AppleSection({
  children,
  title,
  subtitle,
  centered = false,
  className = '',
}: AppleSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const section = sectionRef.current;

    // Stagger reveal children
    appleDesign.pageTransitions.staggerReveal('.apple-section-child', 0.1);

    // Setup scroll animations
    appleDesign.scrollAnimations.revealOnScroll(
      `#${section.id || 'section-' + Math.random().toString(36).substr(2, 9)}`
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`
        apple-section py-16 lg:py-24
        ${centered ? 'text-center' : ''}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div
          className={`apple-section-child mb-12 ${centered ? 'mx-auto max-w-3xl' : ''}`}
        >
          {title && (
            <AppleText variant='title1' className='mb-4 block'>
              {title}
            </AppleText>
          )}
          {subtitle && (
            <AppleText variant='body' color='secondary' className='block'>
              {subtitle}
            </AppleText>
          )}
        </div>
      )}

      <div className='apple-section-child'>{children}</div>
    </section>
  );
}

// Export all components
export { appleDesign };
