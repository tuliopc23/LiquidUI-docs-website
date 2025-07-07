import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { gsap, createMotionSafeTimeline } from '../utils/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationContextType {
  shouldAnimate: boolean;
  prefersReducedMotion: boolean;
  enableAnimations: () => void;
  disableAnimations: () => void;
  createLiquidMorph: (element: HTMLElement, options?: LiquidMorphOptions) => gsap.core.Tween;
  createScrollAnimation: (element: HTMLElement, options?: ScrollAnimationOptions) => void;
  isReady: boolean;
}

interface LiquidMorphOptions {
  scale?: number;
  duration?: number;
  blur?: number;
  borderRadius?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

interface ScrollAnimationOptions {
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'liquid' | 'morphing';
  direction?: 'up' | 'down' | 'left' | 'right';
  intensity?: 'subtle' | 'medium' | 'strong';
  duration?: number;
  delay?: number;
  liquidMorph?: boolean;
  glassBreak?: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  shouldAnimate: true,
  prefersReducedMotion: false,
  enableAnimations: () => { },
  disableAnimations: () => { },
  createLiquidMorph: () => gsap.to({}, {}),
  createScrollAnimation: () => { },
  isReady: false,
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initialize GSAP and set ready state
    setIsReady(true);
  }, []);

  // Determine final animation state based on user preference and reduced motion
  const finalShouldAnimate = shouldAnimate && !prefersReducedMotion;

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    const enableAnimations = () => setShouldAnimate(true);
    const disableAnimations = () => setShouldAnimate(false);

    const createLiquidMorph = (element: HTMLElement, options: LiquidMorphOptions = {}) => {
      if (!finalShouldAnimate || !isReady) return gsap.set(element, {});

      const {
        scale = 1.05,
        duration = 0.6,
        blur = 4,
        borderRadius = '24px',
        intensity = 'medium'
      } = options;

      const intensityValues = {
        subtle: { scaleMultiplier: 0.8, blurMultiplier: 0.5 },
        medium: { scaleMultiplier: 1, blurMultiplier: 1 },
        strong: { scaleMultiplier: 1.2, blurMultiplier: 1.5 }
      };

      const { scaleMultiplier, blurMultiplier } = intensityValues[intensity];

      return gsap.to(element, {
        scale: scale * scaleMultiplier,
        filter: `blur(${blur * blurMultiplier}px)`,
        borderRadius,
        duration,
        ease: 'power2.out',
        transformOrigin: 'center',
        force3D: true
      });
    };

    const createScrollAnimation = (element: HTMLElement, options: ScrollAnimationOptions = {}) => {
      if (!finalShouldAnimate || !isReady) return;

      const {
        animationType = 'fade',
        direction = 'up',
        intensity = 'medium',
        duration = 1,
        delay = 0,
        liquidMorph = false
      } = options;

      const intensityValues = {
        subtle: { distance: 30, scale: 0.95, rotation: 5, blur: 2 },
        medium: { distance: 60, scale: 0.9, rotation: 15, blur: 4 },
        strong: { distance: 100, scale: 0.8, rotation: 30, blur: 8 }
      };

      const { distance, scale, blur } = intensityValues[intensity];

      // Set initial state
      let initialState: Record<string, string | number> = { opacity: 0 };

      switch (animationType) {
        case 'fade':
          initialState = { opacity: 0, filter: `blur(${blur}px)` };
          break;
        case 'slide':
          initialState = { opacity: 0 };
          if (direction === 'up') initialState.y = distance;
          if (direction === 'down') initialState.y = -distance;
          if (direction === 'left') initialState.x = distance;
          if (direction === 'right') initialState.x = -distance;
          break;
        case 'scale':
          initialState = { opacity: 0, scale, transformOrigin: 'center' };
          break;
        case 'liquid':
          initialState = {
            opacity: 0,
            scale: 0.8,
            filter: `blur(${blur}px)`,
            borderRadius: '50%',
            skewX: 20,
            skewY: 10
          };
          break;
      }

      gsap.set(element, initialState);

      // Create intersection observer for scroll trigger
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const finalState = {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                scaleX: 1,
                scaleY: 1,
                rotation: 0,
                skewX: 0,
                skewY: 0,
                filter: 'blur(0px)',
                borderRadius: '16px'
              };

              const tl = createMotionSafeTimeline({ delay });
              tl.to(element, {
                ...finalState,
                duration,
                ease: 'power2.out',
                force3D: true
              });

              if (liquidMorph) {
                tl.to(element, {
                  borderRadius: '30% 70% 70% 30%',
                  duration: 2,
                  ease: 'power2.inOut',
                  yoyo: true,
                  repeat: -1
                });
              }

              observer.unobserve(element);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -20% 0px' }
      );

      observer.observe(element);
    };

    return {
      shouldAnimate: finalShouldAnimate,
      prefersReducedMotion,
      enableAnimations,
      disableAnimations,
      createLiquidMorph,
      createScrollAnimation,
      isReady,
    };
  }, [finalShouldAnimate, prefersReducedMotion, isReady]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);

  // Provide safe defaults if context is not available
  if (!context) {
    return {
      shouldAnimate: false,
      prefersReducedMotion: true,
      enableAnimations: () => { },
      disableAnimations: () => { },
      createLiquidMorph: () => gsap.to({}, {}),
      createScrollAnimation: () => { },
      isReady: false,
    };
  }

  return context;
}