// Standardized animation constants for consistency
export const ANIMATION_CONSTANTS = {
  // Duration scales
  duration: {
    fast: 150,      // 0.15s - for immediate feedback
    normal: 250,    // 0.25s - standard interactions
    slow: 400,      // 0.4s - complex transitions
    slowest: 600,   // 0.6s - page transitions
  },
  
  // Easing curves
  easing: {
    // Standard material design easing
    standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    // Decelerate - entering elements
    decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    // Accelerate - exiting elements  
    accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
    // Sharp - attention-grabbing
    sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  },
  
  // Scale values for hover effects
  scale: {
    subtle: 1.02,   // Cards, large components
    normal: 1.05,   // Buttons, interactive elements
    strong: 1.1,    // Icons, small elements
  },
  
  // Glass effect blur values
  blur: {
    light: 10,      // Subtle glass effect
    medium: 15,     // Standard glass effect
    heavy: 20,      // Strong glass effect
  }
} as const;

// Framer Motion variants with consistent timing
export const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_CONSTANTS.duration.normal / 1000,
      ease: ANIMATION_CONSTANTS.easing.decelerate
    }
  }
};

export const scaleVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: ANIMATION_CONSTANTS.scale.normal,
    transition: { 
      duration: ANIMATION_CONSTANTS.duration.fast / 1000,
      ease: ANIMATION_CONSTANTS.easing.standard
    }
  },
  tap: { 
    scale: 0.98,
    transition: { 
      duration: ANIMATION_CONSTANTS.duration.fast / 1000,
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