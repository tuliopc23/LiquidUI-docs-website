import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Apple-inspired easing curves
export const appleEasing = {
  // Standard Apple easing for UI elements
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',

  // Apple's signature bounce for buttons
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

  // Smooth deceleration for scroll animations
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',

  // Sharp acceleration for entrances
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',

  // Apple's signature spring for interactions
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// Liquid glass animation presets
export const liquidAnimations = {
  // Entrance animations
  fadeInUp: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: appleEasing.spring,
        ...options,
      }
    );
  },

  // Glass morphism reveal
  glassReveal: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        background: 'rgba(255, 255, 255, 0)',
      },
      {
        opacity: 1,
        backdropFilter: 'blur(20px)',
        background: 'rgba(255, 255, 255, 0.1)',
        duration: 1.2,
        ease: appleEasing.decelerate,
        ...options,
      }
    );
  },

  // Liquid button hover
  liquidHover: (element: string | Element) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scale: 1.05,
      backdropFilter: 'blur(25px)',
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      duration: 0.3,
      ease: appleEasing.standard,
    });

    return tl;
  },

  // Ripple effect
  createRipple: (element: Element, x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.className = 'liquid-ripple';
    ripple.style.cssText = `
      position: absolute;
      top: ${y}px;
      left: ${x}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      pointer-events: none;
      transform: translate(-50%, -50%);
    `;

    element.appendChild(ripple);

    gsap.to(ripple, {
      width: 100,
      height: 100,
      opacity: 0,
      duration: 0.6,
      ease: appleEasing.decelerate,
      onComplete: () => ripple.remove(),
    });
  },

  // Stagger animations for lists
  staggerIn: (elements: string | Element[], options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: appleEasing.spring,
        stagger: 0.1,
        ...options,
      }
    );
  },
};

// Scroll-triggered animations
export const scrollAnimations = {
  // Progressive glass blur on scroll
  progressiveBlur: (
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
        gsap.to(element, {
          backdropFilter: `blur(${5 + progress * 15}px)`,
          background: `rgba(255, 255, 255, ${0.05 + progress * 0.15})`,
          duration: 0.3,
        });
      },
    });
  },

  // Parallax glass cards
  parallaxCards: (selector: string) => {
    if (typeof window === 'undefined') return;

    const cards = gsap.utils.toArray(selector);
    cards.forEach((card: any, i) => {
      const speed = 1 + i * 0.2;
      gsap.to(card, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * speed,
        ease: 'none',
        scrollTrigger: {
          start: 0,
          end: 'max',
          invalidateOnRefresh: true,
          scrub: 0,
        },
      });
    });
  },

  // Component reveal on scroll
  revealOnScroll: (selector: string) => {
    if (typeof window === 'undefined') return;

    const elements = gsap.utils.toArray(selector);
    elements.forEach((element: any) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: appleEasing.spring,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  },
};

// Apple-inspired hero animations
export const heroAnimations = {
  // Main hero sequence
  createHeroSequence: (container: string | Element) => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(`${container} .hero-title`, { opacity: 0, y: 100, scale: 0.9 });
    gsap.set(`${container} .hero-subtitle`, { opacity: 0, y: 50 });
    gsap.set(`${container} .hero-cta`, { opacity: 0, y: 30, scale: 0.95 });
    gsap.set(`${container} .hero-bg`, { scale: 1.1, filter: 'blur(5px)' });

    // Animation sequence
    tl.to(`${container} .hero-bg`, {
      scale: 1,
      filter: 'blur(0px)',
      duration: 2,
      ease: appleEasing.decelerate,
    })
      .to(
        `${container} .hero-title`,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: appleEasing.spring,
        },
        0.3
      )
      .to(
        `${container} .hero-subtitle`,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: appleEasing.standard,
        },
        0.8
      )
      .to(
        `${container} .hero-cta`,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: appleEasing.bounce,
        },
        1.2
      );

    return tl;
  },

  // Floating elements animation
  createFloatingAnimation: (selector: string) => {
    const elements = gsap.utils.toArray(selector);

    elements.forEach((element: any, i) => {
      gsap.to(element, {
        y: -20,
        rotation: 5,
        duration: 2 + i * 0.3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });
    });
  },
};

// Performance optimizations
export const gsapUtils = {
  // Batch DOM updates
  batchUpdate: (callback: () => void) => {
    gsap.set({}, { onComplete: callback });
  },

  // Kill all animations
  killAll: () => {
    gsap.killTweensOf('*');
    ScrollTrigger.killAll();
  },

  // Refresh ScrollTrigger on resize
  refreshScrollTrigger: () => {
    ScrollTrigger.refresh();
  },

  // Set up responsive animations
  setupResponsive: () => {
    ScrollTrigger.addEventListener('refreshInit', () => {
      gsap.set('*', { clearProps: 'all' });
    });
  },
};

export { gsap, ScrollTrigger };
