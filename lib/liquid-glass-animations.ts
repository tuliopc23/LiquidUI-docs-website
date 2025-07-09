import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Enhanced Apple-inspired easing curves for liquid glass
export const liquidEasing = {
  // Smooth liquid morphing
  liquid: 'cubic-bezier(0.23, 1, 0.320, 1)',

  // Glass surface tension
  surface: 'cubic-bezier(0.645, 0.045, 0.355, 1)',

  // Lens distortion effect
  lens: 'cubic-bezier(0.77, 0, 0.175, 1)',

  // Viscous liquid motion
  viscous: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

  // Elastic glass bounce
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Gentle float animation
  float: 'cubic-bezier(0.4, 0, 0.6, 1)',
};

// Advanced liquid glass animation presets
export const liquidGlassAnimations = {
  // Lens distortion entrance
  lensDistort: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        scale: 0.8,
        rotationX: -15,
        rotationY: 10,
        filter: 'blur(20px)',
        backdropFilter: 'blur(0px)',
        background: 'rgba(255, 255, 255, 0)',
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        rotationY: 0,
        filter: 'blur(0px)',
        backdropFilter: 'blur(16px)',
        background: 'rgba(255, 255, 255, 0.1)',
        duration: 1.2,
        ease: liquidEasing.lens,
        ...options,
      }
    );
  },

  // Morphing liquid glass effect
  liquidMorph: (element: string | Element, options?: gsap.TweenVars) => {
    const tl = gsap.timeline();

    tl.fromTo(
      element,
      {
        borderRadius: '50%',
        scale: 0.5,
        opacity: 0,
        backdropFilter: 'blur(5px)',
      },
      {
        borderRadius: '12px',
        scale: 1,
        opacity: 1,
        backdropFilter: 'blur(16px)',
        duration: 0.8,
        ease: liquidEasing.liquid,
      }
    ).to(
      element,
      {
        background: 'rgba(255, 255, 255, 0.15)',
        boxShadow:
          '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 4px 20px rgba(255, 255, 255, 0.25)',
        duration: 0.4,
        ease: liquidEasing.surface,
      },
      '-=0.4'
    );

    return tl;
  },

  // Advanced glass surface ripple
  surfaceRipple: (element: string | Element, x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full pointer-events-none';
    ripple.style.cssText = `
      top: ${y}px;
      left: ${x}px;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%);
      transform: translate(-50%, -50%);
      backdrop-filter: blur(2px);
    `;

    (element as Element).appendChild(ripple);

    const tl = gsap.timeline({
      onComplete: () => ripple.remove(),
    });

    tl.to(ripple, {
      width: 120,
      height: 120,
      opacity: 0.8,
      duration: 0.2,
      ease: liquidEasing.surface,
    }).to(
      ripple,
      {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 0.6,
        ease: liquidEasing.viscous,
      },
      '-=0.1'
    );

    return tl;
  },

  // Magnetic hover effect for liquid glass
  magneticHover: (element: string | Element) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scale: 1.05,
      rotationX: 2,
      rotationY: -1,
      backdropFilter: 'blur(20px) saturate(200%)',
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow:
        '0 16px 32px rgba(31, 38, 135, 0.2), inset 0 8px 20px rgba(255, 255, 255, 0.3)',
      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
      duration: 0.4,
      ease: liquidEasing.elastic,
    });

    return tl;
  },

  // Convex lens effect
  convexLens: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        transformPerspective: 1000,
        rotationX: -10,
        rotationY: -5,
        scale: 0.9,
        opacity: 0,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(5px)',
      },
      {
        rotationX: 5,
        rotationY: -2,
        scale: 1,
        opacity: 1,
        background:
          'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 70%)',
        backdropFilter: 'blur(20px) saturate(200%)',
        boxShadow:
          '0 16px 32px rgba(31, 38, 135, 0.2), inset 0 8px 20px rgba(255, 255, 255, 0.3)',
        filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.15))',
        duration: 1.0,
        ease: liquidEasing.lens,
        ...options,
      }
    );
  },

  // Concave lens effect
  concaveLens: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        transformPerspective: 1000,
        rotationX: 10,
        rotationY: 5,
        scale: 1.1,
        opacity: 0,
        background: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(25px)',
      },
      {
        rotationX: -3,
        rotationY: 1,
        scale: 1,
        opacity: 1,
        background:
          'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.15) 70%)',
        backdropFilter: 'blur(18px) saturate(160%)',
        boxShadow:
          'inset 0 16px 32px rgba(31, 38, 135, 0.15), 0 8px 20px rgba(0, 0, 0, 0.1)',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08))',
        duration: 1.0,
        ease: liquidEasing.lens,
        ...options,
      }
    );
  },

  // Floating liquid glass particles
  floatingParticles: (container: string | Element, count: number = 5) => {
    const particles: HTMLElement[] = [];
    const containerEl =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!containerEl) return;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full pointer-events-none';
      particle.style.cssText = `
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
        backdrop-filter: blur(${Math.random() * 5 + 2}px);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
      `;

      containerEl.appendChild(particle);
      particles.push(particle);

      // Animate particle
      gsap.to(particle, {
        y: -100 - Math.random() * 200,
        x: Math.random() * 100 - 50,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 4 + 3,
        ease: liquidEasing.float,
        repeat: -1,
        repeatDelay: Math.random() * 2,
        yoyo: true,
      });
    }

    return particles;
  },

  // Liquid glass stagger reveal
  staggerReveal: (elements: string | Element[], options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 50,
        scale: 0.8,
        rotationX: -10,
        backdropFilter: 'blur(0px)',
        background: 'rgba(255, 255, 255, 0)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        backdropFilter: 'blur(16px)',
        background: 'rgba(255, 255, 255, 0.1)',
        duration: 0.8,
        ease: liquidEasing.liquid,
        stagger: {
          amount: 0.6,
          from: 'start',
          ease: liquidEasing.surface,
        },
        ...options,
      }
    );
  },
};

// Enhanced scroll-triggered liquid glass animations
export const liquidScrollAnimations = {
  // Dynamic blur intensity based on scroll
  dynamicBlur: (
    element: string | Element,
    triggerElement: string | Element
  ) => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: self => {
        const progress = self.progress;
        const blurAmount = 8 + progress * 16;
        const saturation = 120 + progress * 80;
        const opacity = 0.1 + progress * 0.15;

        gsap.to(element, {
          backdropFilter: `blur(${blurAmount}px) saturate(${saturation}%)`,
          background: `rgba(255, 255, 255, ${opacity})`,
          duration: 0.3,
        });
      },
    });
  },

  // Morphing shapes on scroll
  morphingShapes: (
    element: string | Element,
    triggerElement: string | Element
  ) => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 2,
      onUpdate: self => {
        const progress = self.progress;
        const borderRadius = 12 + progress * 38; // 12px to 50px
        const rotationY = progress * 10;

        gsap.to(element, {
          borderRadius: `${borderRadius}px`,
          rotationY: rotationY,
          duration: 0.3,
          ease: liquidEasing.viscous,
        });
      },
    });
  },

  // Parallax liquid glass layers
  parallaxLayers: (selector: string) => {
    if (typeof window === 'undefined') return;

    const layers = gsap.utils.toArray(selector);
    layers.forEach((layer: any, i) => {
      const speed = 0.5 + i * 0.3;
      const blur = 8 + i * 4;

      gsap.to(layer, {
        yPercent: -50 * speed,
        backdropFilter: `blur(${blur}px)`,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  },

  // Liquid glass reveal on scroll
  liquidReveal: (selector: string) => {
    if (typeof window === 'undefined') return;

    const elements = gsap.utils.toArray(selector);
    elements.forEach((element: any) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        element,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotationX: -15,
          backdropFilter: 'blur(0px)',
          background: 'rgba(255, 255, 255, 0)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          backdropFilter: 'blur(16px)',
          background: 'rgba(255, 255, 255, 0.1)',
          duration: 1.2,
          ease: liquidEasing.liquid,
        }
      );
    });
  },
};

// Performance optimization utilities
export const liquidGlassUtils = {
  // Optimize backdrop-filter performance
  optimizeBackdropFilter: (element: string | Element) => {
    const el =
      typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    // Force hardware acceleration
    gsap.set(el, {
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      perspective: 1000,
    });
  },

  // Batch update liquid glass elements
  batchUpdate: (elements: Element[], properties: any) => {
    gsap.set(elements, properties);
  },

  // Create optimized liquid glass timeline
  createOptimizedTimeline: (options?: gsap.TimelineVars) => {
    return gsap.timeline({
      ...options,
      onStart: () => {
        // Enable hardware acceleration
        gsap.set('body', { transform: 'translateZ(0)' });
      },
      onComplete: () => {
        // Clean up hardware acceleration
        gsap.set('body', { clearProps: 'transform' });
      },
    });
  },

  // Responsive liquid glass animations
  setupResponsive: () => {
    ScrollTrigger.addEventListener('refreshInit', () => {
      gsap.set('[data-liquid-glass]', { clearProps: 'all' });
    });
  },

  // Kill all liquid glass animations
  killAllAnimations: () => {
    gsap.killTweensOf('[data-liquid-glass]');
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.trigger?.hasAttribute('data-liquid-glass')) {
        trigger.kill();
      }
    });
  },
};

export { gsap, ScrollTrigger };
