// Import and re-export animation constants from PerformanceOptimizer for backward compatibility
// @deprecated - Use ANIMATION_CONSTANTS from PerformanceOptimizer instead
import { ANIMATION_CONSTANTS } from '../PerformanceOptimizer';
export { ANIMATION_CONSTANTS };

// Legacy constants _LEGACY_ANIMATION_CONSTANTS removed as they are no longer in use.

// Framer Motion variants with consistent timing
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_CONSTANTS.duration.normal,
      ease: ANIMATION_CONSTANTS.easing.decelerate
    }
  }
};

export const scaleVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: ANIMATION_CONSTANTS.scale.normal,
    transition: { 
      duration: ANIMATION_CONSTANTS.duration.fast,
      ease: ANIMATION_CONSTANTS.easing.standard
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: ANIMATION_CONSTANTS.duration.fast,
      ease: ANIMATION_CONSTANTS.easing.sharp
    }
  }
};

// CSS class helpers for consistent animations
export const getHoverScale = (size: 'subtle' | 'normal' | 'strong' = 'normal') => {
  return `hover:scale-[${ANIMATION_CONSTANTS.scale[size]}] transition-transform duration-${ANIMATION_CONSTANTS.duration.fast}`;
};

export const getGlassEffect = (intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
  const blur = ANIMATION_CONSTANTS.blur[intensity];
  const opacity = intensity === 'light' ? 0.05 : intensity === 'medium' ? 0.10 : 0.15;
  const borderOpacity = intensity === 'light' ? 0.1 : intensity === 'medium' ? 0.15 : 0.20;
  
  return {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`
  };
};