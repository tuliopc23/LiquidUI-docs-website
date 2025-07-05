import { useReducedMotion } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/use-prefers-reduced-motion';
import { ANIMATION_CONSTANTS } from '../PerformanceOptimizer';

export { ANIMATION_CONSTANTS };

export const useAnimation = () => {
  const systemPrefersReducedMotion = usePrefersReducedMotion();
  const framerPrefersReducedMotion = useReducedMotion();
  const prefersReducedMotion = systemPrefersReducedMotion || framerPrefersReducedMotion;

  const fadeInVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : ANIMATION_CONSTANTS.duration.normal,
        ease: ANIMATION_CONSTANTS.easing.decelerate,
      },
    },
  };

  const scaleVariants = {
    initial: { scale: 1 },
    hover: {
      scale: prefersReducedMotion ? 1 : ANIMATION_CONSTANTS.scale.normal,
      transition: {
        duration: prefersReducedMotion ? 0 : ANIMATION_CONSTANTS.duration.fast,
        ease: ANIMATION_CONSTANTS.easing.standard,
      },
    },
    tap: {
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: {
        duration: prefersReducedMotion ? 0 : ANIMATION_CONSTANTS.duration.fast,
        ease: ANIMATION_CONSTANTS.easing.sharp,
      },
    },
  };

  return { fadeInVariants, scaleVariants, prefersReducedMotion };
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