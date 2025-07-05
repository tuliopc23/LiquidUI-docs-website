import React from 'react';
import { motion, HTMLMotionProps, TargetAndTransition } from 'framer-motion';
import './LiquidTitle.css';

interface LiquidTitleProps extends Omit<HTMLMotionProps<'h1'>, 'whileHover'> {
  /** The heading level to render (h1, h2, h3, h4, h5, h6) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Children content to render inside the title */
  children: React.ReactNode;
  /** Enable or disable the 3D tilt effect on hover */
  enableTilt?: boolean;
  /** Custom tilt values for X and Y rotation */
  tiltX?: number;
  tiltY?: number;
  /** Additional CSS class names */
  className?: string;
  /** Custom hover animations (overrides tilt if provided) */
  customHoverAnimation?: TargetAndTransition;
}

/**
 * LiquidTitle - A reusable component for interactive headings with 3D tilt/parallax effects
 * 
 * Features:
 * - Semantic HTML heading elements (h1-h6)
 * - 3D tilt effect on hover using framer-motion
 * - Customizable tilt values
 * - Accessibility-friendly with reduced motion support
 * - Fully customizable styling
 * 
 * @example
 * ```tsx
 * <LiquidTitle as="h1" className="text-4xl font-bold">
 *   Welcome to LiquidUI
 * </LiquidTitle>
 * 
 * <LiquidTitle as="h2" tiltX={10} tiltY={-8}>
 *   Custom Tilt Values
 * </LiquidTitle>
 * ```
 */
export const LiquidTitle: React.FC<LiquidTitleProps> = ({
  as = 'h1',
  children,
  enableTilt = true,
  tiltX = 8,
  tiltY = -6,
  className = '',
  customHoverAnimation,
  ...props
}) => {
  // Check for reduced motion preference
  const shouldReduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Create the motion component based on the heading level
  const MotionComponent = motion[as] as typeof motion.h1;

  // Default hover animation with 3D tilt
  const defaultHoverAnimation: TargetAndTransition = enableTilt && !shouldReduceMotion ? {
    rotateX: tiltX,
    rotateY: tiltY,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      duration: 0.3,
    }
  } : {};

  // Use custom hover animation if provided, otherwise use default
  const hoverAnimation = customHoverAnimation || defaultHoverAnimation;

  // Generate CSS classes based on variant and tilt settings
  const getCssClasses = () => {
    const classes = ['liquid-title'];
    
    if (!enableTilt || shouldReduceMotion) {
      classes.push('liquid-title--static');
    } else if (tiltX >= 10 || tiltY <= -8) {
      classes.push('liquid-title--hero');
    } else if (tiltX <= 4 && tiltY >= -2) {
      classes.push('liquid-title--subtle');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <MotionComponent
      className={getCssClasses()}
      whileHover={hoverAnimation}
      style={{
        transformStyle: 'preserve-3d',
        transformOrigin: 'center',
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Pre-configured LiquidTitle variants for common use cases
 */
export const LiquidTitleVariants = {
  /** Hero title with strong tilt effect */
hero: {
    as: 'h1' as const,
    tiltX: 12,
    tiltY: -8,
    className: 'text-display-2xl md:text-display-4xl font-display',
  },
  
  /** Section title with moderate tilt effect */
  section: {
    as: 'h2' as const,
    tiltX: 6,
    tiltY: -4,
    className: 'text-display-xl md:text-display-2xl font-display',
  },
  
  /** Subtle title with minimal tilt effect */
  subtle: {
    as: 'h3' as const,
    tiltX: 4,
    tiltY: -2,
    className: 'text-display-lg md:text-display-xl font-display',
  },
  
  /** Disabled tilt for accessibility */
  static: {
    enableTilt: false,
    className: 'text-display-lg md:text-display-xl font-display',
  },
} as const;

/**
 * Quick access components for common heading levels
 */
export const LiquidH1: React.FC<Omit<LiquidTitleProps, 'as'>> = (props) => (
  <LiquidTitle as="h1" {...props} />
);

export const LiquidH2: React.FC<Omit<LiquidTitleProps, 'as'>> = (props) => (
  <LiquidTitle as="h2" {...props} />
);

export const LiquidH3: React.FC<Omit<LiquidTitleProps, 'as'>> = (props) => (
  <LiquidTitle as="h3" {...props} />
);

export const LiquidH4: React.FC<Omit<LiquidTitleProps, 'as'>> = (props) => (
  <LiquidTitle as="h4" {...props} />
);

export const LiquidH5: React.FC<Omit<LiquidTitleProps, 'as'>> = (props) => (
  <LiquidTitle as="h5" {...props} />
);

export const LiquidH6: React.FC<Omit<LiquidTitleProps, 'as'>> = (props) => (
  <LiquidTitle as="h6" {...props} />
);
