'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Enhanced easing curves for micro-interactions
export const microEasing = {
  magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  haptic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Magnetic hover effects
export const magneticHover = {
  // Enhanced magnetic button hover
  button: (element: string | Element, options?: gsap.TweenVars) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(el, {
      scale: 1.08,
      rotationX: 2,
      rotationY: -1,
      transformPerspective: 1000,
      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))',
      duration: 0.4,
      ease: microEasing.magnetic,
      ...options
    });

    return tl;
  },

  // Magnetic card hover with depth
  card: (element: string | Element, options?: gsap.TweenVars) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(el, {
      scale: 1.03,
      rotationX: -3,
      rotationY: 2,
      y: -8,
      transformPerspective: 1000,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      duration: 0.5,
      ease: microEasing.magnetic,
      ...options
    });

    return tl;
  },

  // Cursor following magnetic effect
  magnetic: (element: string | Element, strength: number = 0.3) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (el as Element).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left - rect.width / 2;
      const y = mouseEvent.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: microEasing.magnetic,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: microEasing.spring,
      });
    };

    (el as Element).addEventListener('mousemove', handleMouseMove);
    (el as Element).addEventListener('mouseleave', handleMouseLeave);

    return () => {
      (el as Element).removeEventListener('mousemove', handleMouseMove);
      (el as Element).removeEventListener('mouseleave', handleMouseLeave);
    };
  }
};

// Spring animations
export const springAnimations = {
  // Entrance spring animation
  entrance: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(element, 
      { 
        opacity: 0, 
        scale: 0.8, 
        y: 50,
        rotation: -5
      },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: microEasing.spring,
        ...options 
      }
    );
  },

  // Exit spring animation
  exit: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.to(element, { 
      opacity: 0, 
      scale: 0.8, 
      y: -30,
      rotation: 5,
      duration: 0.8,
      ease: microEasing.spring,
      ...options 
    });
  },

  // Bounce on click
  bounce: (element: string | Element, options?: gsap.TweenVars) => {
    const tl = gsap.timeline();
    
    tl.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: microEasing.haptic,
    })
    .to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: microEasing.bounce,
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: microEasing.spring,
      ...options
    });

    return tl;
  }
};

// Page transitions
export const pageTransitions = {
  // Fade in page transition
  fadeIn: (duration: number = 0.8) => {
    return gsap.fromTo('body', 
      { opacity: 0 }, 
      { opacity: 1, duration, ease: microEasing.smooth }
    );
  },

  // Slide in from bottom
  slideInUp: (selector: string = 'main', duration: number = 1.2) => {
    return gsap.fromTo(selector, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration, ease: microEasing.spring }
    );
  },

  // Stagger reveal for page elements
  staggerReveal: (selector: string, delay: number = 0.1) => {
    const elements = gsap.utils.toArray(selector);
    
    return gsap.fromTo(elements,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        ease: microEasing.spring,
        stagger: delay
      }
    );
  }
};

// Scroll animations
export const scrollAnimations = {
  // Parallax scroll effect
  parallax: (element: string | Element, speed: number = 0.5) => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      animation: gsap.to(element, {
        yPercent: -100 * speed,
        ease: 'none',
      })
    });
  },

  // Reveal on scroll with spring
  revealOnScroll: (selector: string) => {
    if (typeof window === 'undefined') return;

    const elements = gsap.utils.toArray(selector);
    
    elements.forEach((element: any) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: microEasing.spring,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    });
  },

  // Morphing scroll effect
  morphOnScroll: (element: string | Element) => {
    if (typeof window === 'undefined') return;

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1,
      animation: gsap.to(element, {
        borderRadius: '50px',
        scale: 1.1,
        rotation: 5,
        ease: microEasing.smooth,
      })
    });
  }
};

// Haptic feedback simulations
export const hapticFeedback = {
  // Light tap feedback
  lightTap: (element: string | Element) => {
    const tl = gsap.timeline();
    
    tl.to(element, {
      scale: 0.98,
      duration: 0.05,
      ease: microEasing.haptic,
    })
    .to(element, {
      scale: 1,
      duration: 0.1,
      ease: microEasing.bounce,
    });

    return tl;
  },

  // Medium impact feedback
  mediumImpact: (element: string | Element) => {
    const tl = gsap.timeline();
    
    tl.to(element, {
      scale: 0.95,
      duration: 0.1,
      ease: microEasing.haptic,
    })
    .to(element, {
      scale: 1.02,
      duration: 0.15,
      ease: microEasing.bounce,
    })
    .to(element, {
      scale: 1,
      duration: 0.2,
      ease: microEasing.spring,
    });

    return tl;
  },

  // Heavy impact feedback
  heavyImpact: (element: string | Element) => {
    const tl = gsap.timeline();
    
    tl.to(element, {
      scale: 0.9,
      duration: 0.15,
      ease: microEasing.haptic,
    })
    .to(element, {
      scale: 1.05,
      duration: 0.2,
      ease: microEasing.bounce,
    })
    .to(element, {
      scale: 1,
      duration: 0.3,
      ease: microEasing.spring,
    });

    return tl;
  },

  // Ripple effect with haptic feel
  ripple: (element: string | Element, x: number, y: number) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full pointer-events-none';
    ripple.style.cssText = `
      top: ${y}px;
      left: ${x}px;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 40%, transparent 70%);
      transform: translate(-50%, -50%);
      backdrop-filter: blur(2px);
    `;
    
    (el as Element).appendChild(ripple);
    
    const tl = gsap.timeline({
      onComplete: () => ripple.remove()
    });
    
    tl.to(ripple, {
      width: 100,
      height: 100,
      opacity: 0.8,
      duration: 0.1,
      ease: microEasing.haptic,
    })
    .to(ripple, {
      width: 200,
      height: 200,
      opacity: 0,
      duration: 0.6,
      ease: microEasing.spring,
    }, '-=0.05');

    return tl;
  }
};

// Enhanced micro-interactions
export const microInteractions = {
  // Button press with haptic feedback
  buttonPress: (element: string | Element) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const handleMouseDown = () => {
      hapticFeedback.lightTap(el);
    };

    const handleClick = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = (el as Element).getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      
      hapticFeedback.ripple(el, x, y);
    };

    (el as Element).addEventListener('mousedown', handleMouseDown);
    (el as Element).addEventListener('click', handleClick);

    return () => {
      (el as Element).removeEventListener('mousedown', handleMouseDown);
      (el as Element).removeEventListener('click', handleClick);
    };
  },

  // Hover with magnetic attraction
  magneticHover: (element: string | Element, strength: number = 0.3) => {
    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(el, {
      scale: 1.05,
      rotationX: 2,
      rotationY: -1,
      transformPerspective: 1000,
      duration: 0.4,
      ease: microEasing.magnetic,
    });

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    (el as Element).addEventListener('mouseenter', handleMouseEnter);
    (el as Element).addEventListener('mouseleave', handleMouseLeave);

    return () => {
      (el as Element).removeEventListener('mouseenter', handleMouseEnter);
      (el as Element).removeEventListener('mouseleave', handleMouseLeave);
    };
  },

  // Elastic loading animation
  elasticLoading: (element: string | Element) => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(element, {
      scale: 1.1,
      duration: 0.8,
      ease: microEasing.spring,
    })
    .to(element, {
      scale: 0.9,
      duration: 0.8,
      ease: microEasing.spring,
    });

    return tl;
  }
};

// Performance optimization utilities
export const animationUtils = {
  // Batch DOM updates
  batchUpdate: (callback: () => void) => {
    gsap.set({}, { onComplete: callback });
  },

  // Kill all animations
  killAll: () => {
    gsap.killTweensOf('*');
    ScrollTrigger.killAll();
  },

  // Refresh ScrollTrigger
  refreshScrollTrigger: () => {
    ScrollTrigger.refresh();
  },

  // Setup responsive animations
  setupResponsive: () => {
    ScrollTrigger.addEventListener('refreshInit', () => {
      gsap.set('*', { clearProps: 'all' });
    });
  },

  // Preload animations
  preloadAnimations: () => {
    // Preload common animations to improve performance
    gsap.set('body', { opacity: 0 });
    gsap.to('body', { opacity: 1, duration: 0.01 });
  }
};

export { gsap, ScrollTrigger };
