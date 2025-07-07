import { gsap } from 'gsap';

// Only import what we need for tree-shaking
// ScrollTrigger is imported in AnimationProvider where it's registered

// Configure GSAP for optimal performance
gsap.config({
  force3D: true,
  nullTargetWarn: false,
  autoSleep: 60, // Performance: sleep after 60s of inactivity
  units: {
    rotation: 'deg',
    rotationX: 'deg',
    rotationY: 'deg'
  }
});

// Set sensible defaults for all animations
gsap.defaults({
  duration: 0.6,
  ease: "power2.out",
  force3D: true,
  transformOrigin: "center center"
});

// Create a singleton GSAP instance to ensure consistency
const gsapInstance = gsap;

// Utility function to create motion-safe animations
export const createMotionSafeAnimation = (target: any, vars: any) => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // For reduced motion, set immediately without animation
      return gsapInstance.set(target, vars);
    }
  }
  return gsapInstance.to(target, vars);
};

// Utility function to create motion-safe timelines
export const createMotionSafeTimeline = (vars?: any) => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Return a mock timeline for reduced motion
      return {
        to: (target: any, vars: any) => gsapInstance.set(target, vars),
        from: (target: any, vars: any) => gsapInstance.set(target, vars),
        fromTo: (target: any, fromVars: any, toVars: any) => gsapInstance.set(target, toVars),
        set: gsapInstance.set,
        add: () => {},
        kill: () => {},
        play: () => {},
        pause: () => {},
        reverse: () => {},
        seek: () => {}
      };
    }
  }
  return gsapInstance.timeline(vars);
};

export { gsapInstance as gsap };
