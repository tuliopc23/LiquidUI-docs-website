import { gsap } from 'gsap';

/**
 * Apple HIG-compliant design enhancements and animations
 * Following Apple's Human Interface Guidelines for premium UX
 */

// Apple HIG Color System
export const appleColors = {
  systemBlue: '#007AFF',
  systemGreen: '#34C759',
  systemIndigo: '#5856D6',
  systemOrange: '#FF9500',
  systemPink: '#FF2D92',
  systemPurple: '#AF52DE',
  systemRed: '#FF3B30',
  systemTeal: '#5AC8FA',
  systemYellow: '#FFCC00',
  systemGray: '#8E8E93',
  systemGray2: '#AEAEB2',
  systemGray3: '#C7C7CC',
  systemGray4: '#D1D1D6',
  systemGray5: '#E5E5EA',
  systemGray6: '#F2F2F7',
} as const;

// Apple HIG Typography Scale
export const appleTypography = {
  largeTitle: {
    fontSize: '34px',
    lineHeight: '41px',
    fontWeight: '400',
    letterSpacing: '0.37px',
  },
  title1: {
    fontSize: '28px',
    lineHeight: '34px',
    fontWeight: '400',
    letterSpacing: '0.36px',
  },
  title2: {
    fontSize: '22px',
    lineHeight: '28px',
    fontWeight: '400',
    letterSpacing: '0.35px',
  },
  title3: {
    fontSize: '20px',
    lineHeight: '25px',
    fontWeight: '400',
    letterSpacing: '0.38px',
  },
  headline: {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: '600',
    letterSpacing: '-0.41px',
  },
  body: {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: '400',
    letterSpacing: '-0.41px',
  },
  callout: {
    fontSize: '16px',
    lineHeight: '21px',
    fontWeight: '400',
    letterSpacing: '-0.32px',
  },
  subhead: {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: '400',
    letterSpacing: '-0.24px',
  },
  footnote: {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: '400',
    letterSpacing: '-0.08px',
  },
  caption1: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    letterSpacing: '0px',
  },
  caption2: {
    fontSize: '11px',
    lineHeight: '13px',
    fontWeight: '400',
    letterSpacing: '0.07px',
  },
} as const;

// Apple HIG Spacing System (4pt grid)
export const appleSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '48px',
  '6xl': '64px',
} as const;

// Apple HIG Corner Radius
export const appleRadius = {
  none: '0px',
  xs: '4px',
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',
} as const;

// Apple HIG Shadow System
export const appleShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

// Apple-style Micro Interactions
export const appleMicroInteractions = {
  // Gentle scale and glow on hover
  magneticHover: (element: HTMLElement, intensity = 1.02) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scale: intensity,
      duration: 0.3,
      ease: 'power2.out',
    }).to(
      element,
      {
        boxShadow: '0 8px 32px rgba(0, 122, 255, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      },
      0
    );

    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());

    return tl;
  },

  // Haptic-style press feedback
  hapticPress: (element: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scale: 0.96,
      duration: 0.1,
      ease: 'power2.out',
    }).to(element, {
      scale: 1,
      duration: 0.2,
      ease: 'back.out(1.7)',
    });

    element.addEventListener('mousedown', () => tl.restart());

    return tl;
  },

  // Smooth focus ring animation
  focusRing: (element: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      boxShadow: `0 0 0 4px ${appleColors.systemBlue}40`,
      duration: 0.2,
      ease: 'power2.out',
    });

    element.addEventListener('focus', () => tl.play());
    element.addEventListener('blur', () => tl.reverse());

    return tl;
  },

  // Liquid morphing animation
  liquidMorph: (element: HTMLElement, targetProps: gsap.TweenVars) => {
    return gsap.to(element, {
      ...targetProps,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  },

  // Glass effect enhancement
  glassIntensify: (element: HTMLElement) => {
    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      backdropFilter: 'blur(24px) saturate(200%)',
      background: 'rgba(255, 255, 255, 0.18)',
      borderColor: 'rgba(255, 255, 255, 0.3)',
      duration: 0.4,
      ease: 'power2.out',
    });

    element.addEventListener('mouseenter', () => tl.play());
    element.addEventListener('mouseleave', () => tl.reverse());

    return tl;
  },
};

// Apple-style Page Transitions
export const applePageTransitions = {
  // Smooth fade in with scale
  fadeInScale: (duration = 0.8) => {
    gsap.fromTo(
      '[data-animate="page"]',
      {
        opacity: 0,
        scale: 0.95,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration,
        ease: 'power3.out',
        stagger: 0.1,
      }
    );
  },

  // Stagger reveal animation
  staggerReveal: (selector: string, stagger = 0.1) => {
    gsap.fromTo(
      selector,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger,
      }
    );
  },

  // Liquid slide in
  liquidSlideIn: (selector: string, direction = 'up') => {
    const yValue = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;
    const xValue = direction === 'left' ? 50 : direction === 'right' ? -50 : 0;

    gsap.fromTo(
      selector,
      {
        opacity: 0,
        y: yValue,
        x: xValue,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.1,
      }
    );
  },
};

// Apple-style Scroll Animations
export const appleScrollAnimations = {
  // Parallax scrolling
  parallax: (selector: string, speed = 0.5) => {
    gsap.to(selector, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  },

  // Reveal on scroll
  revealOnScroll: (selector: string) => {
    gsap.fromTo(
      selector,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  },

  // Pinned section animation
  pinnedSection: (selector: string) => {
    gsap.to(selector, {
      scale: 0.8,
      opacity: 0.5,
      borderRadius: '24px',
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        pin: true,
      },
    });
  },
};

// Apple HIG Performance Utilities
export const applePerformance = {
  // Optimize element for animations
  optimizeElement: (element: HTMLElement) => {
    element.style.willChange = 'transform, opacity';
    element.style.transform = 'translateZ(0)'; // Force hardware acceleration
  },

  // Cleanup optimizations
  cleanupElement: (element: HTMLElement) => {
    element.style.willChange = 'auto';
    element.style.transform = '';
  },

  // Batch DOM updates
  batchUpdates: (updates: (() => void)[]) => {
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  },
};

// Apple HIG Accessibility Enhancements
export const appleAccessibility = {
  // Respect reduced motion preference
  respectReducedMotion: () => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0.1); // Dramatically reduce animation speed

      // Override specific animations with instant transitions
      gsap.set('[data-respect-motion]', {
        transition: 'none',
        animationDuration: '0.01s',
      });
    }

    return prefersReducedMotion;
  },

  // Enhance focus indicators
  enhanceFocusIndicators: () => {
    const style = document.createElement('style');
    style.textContent = `
      *:focus-visible {
        outline: 2px solid ${appleColors.systemBlue};
        outline-offset: 2px;
        border-radius: 4px;
      }
      
      .glass-focus:focus-visible {
        box-shadow: 0 0 0 4px ${appleColors.systemBlue}40, 
                    0 8px 32px rgba(0, 122, 255, 0.3);
        outline: none;
      }
    `;
    document.head.appendChild(style);
  },

  // High contrast mode support
  highContrastMode: () => {
    const isHighContrast = window.matchMedia(
      '(prefers-contrast: high)'
    ).matches;

    if (isHighContrast) {
      document.documentElement.style.setProperty('--glass-opacity', '0.9');
      document.documentElement.style.setProperty('--glass-border-opacity', '1');
      document.documentElement.style.setProperty('--glass-blur', '4px');
    }

    return isHighContrast;
  },
};

const appleDesignSystem = {
  colors: appleColors,
  typography: appleTypography,
  spacing: appleSpacing,
  radius: appleRadius,
  shadows: appleShadows,
  microInteractions: appleMicroInteractions,
  pageTransitions: applePageTransitions,
  scrollAnimations: appleScrollAnimations,
  performance: applePerformance,
  accessibility: appleAccessibility,
};

export default appleDesignSystem;
