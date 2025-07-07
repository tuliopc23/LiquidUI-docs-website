import { useState, useEffect } from 'react';

export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
};

// Helper function for conditional motion
export const motionSafe = (withMotion: any, withoutMotion: any = null) => {
  if (typeof window === 'undefined') return withoutMotion;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? withoutMotion : withMotion;
};

// GSAP timeline wrapper that respects reduced motion preference
export const createMotionSafeTimeline = (gsap: any, options: any = {}) => {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (prefersReducedMotion) {
    // Return a mock timeline that completes instantly
    return {
      to: () => ({ kill: () => {} }),
      from: () => ({ kill: () => {} }),
      fromTo: () => ({ kill: () => {} }),
      set: gsap.set,
      kill: () => {},
      play: () => {},
      pause: () => {},
      reverse: () => {},
      seek: () => {}
    };
  }

  return gsap.timeline(options);
};

// CSS animation duration helper
export const getAnimationDuration = (duration: string = '300ms') => {
  if (typeof window === 'undefined') return '0ms';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? '0ms' : duration;
};

// CSS transition helper
export const getTransition = (property: string = 'all', duration: string = '300ms', easing: string = 'ease') => {
  if (typeof window === 'undefined') return 'none';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? 'none' : `${property} ${duration} ${easing}`;
};
