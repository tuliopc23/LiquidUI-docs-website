/**
 * Shared Glass Effect Component for Liquidify Documentation
 * Provides consistent glassmorphism styling across all components
 */

import React from 'react';

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  variant?: 'default' | 'card' | 'button' | 'panel';
  hover?: boolean;
  animated?: boolean;
  [key: string]: unknown;
}

/**
 * Enhanced SSR-safe glass effect component with Apple HIG liquid glass styling
 */
export function GlassEffect({
  children,
  className = '',
  as: Component = 'div',
  variant = 'default',
  hover = true,
  animated = true,
  ...props
}: GlassEffectProps) {
  // Enhanced glass styling based on variant
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'card':
        return 'apple-liquid-glass bg-white/15 dark:bg-black/15 rounded-xl p-4';
      case 'button':
        return 'glass-button inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium';
      case 'panel':
        return 'apple-liquid-glass bg-white/10 dark:bg-black/10 rounded-2xl p-6';
      default:
        return 'apple-liquid-glass bg-white/12 dark:bg-black/12 rounded-lg';
    }
  };

  const hoverClasses = hover
    ? 'glass-magnetic transition-all duration-300 hover:scale-[1.02]'
    : '';
  const animatedClasses = animated ? 'animate-spring-entrance' : '';

  return (
    <Component
      className={`${getVariantClasses(variant)} ${hoverClasses} ${animatedClasses} ${className}`}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        boxShadow: `
          0 8px 32px rgba(31, 38, 135, 0.37),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default GlassEffect;
