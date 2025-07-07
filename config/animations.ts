import { gsap } from '../utils/gsap';
import { getAnimationDuration, getTransition } from '../hooks/useReducedMotion';

// Animation intensity levels
export type AnimationIntensity = 'subtle' | 'medium' | 'strong';

// Base animation configuration
export interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  force3D?: boolean;
}

// GSAP Animation presets
export const GSAP_PRESETS = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    slowest: 1.0,
  },
  ease: {
    standard: 'power2.out',
    decelerate: 'power3.out',
    accelerate: 'power2.in',
    sharp: 'power4.inOut',
    bounce: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.3)',
  },
  intensity: {
    subtle: { scale: 0.02, distance: 20, blur: 1 },
    medium: { scale: 0.05, distance: 40, blur: 2 },
    strong: { scale: 0.1, distance: 80, blur: 4 },
  }
};

// CSS Animation variants
export const CSS_ANIMATIONS = {
  fadeIn: {
    keyframes: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    className: 'animate-fade-in',
    style: (duration: string = '300ms') => ({
      animation: `fadeIn ${getAnimationDuration(duration)} ease-out forwards`
    })
  },
  
  slideUp: {
    keyframes: `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `,
    className: 'animate-slide-up',
    style: (duration: string = '300ms') => ({
      animation: `slideUp ${getAnimationDuration(duration)} ease-out forwards`
    })
  },
  
  scaleIn: {
    keyframes: `
      @keyframes scaleIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `,
    className: 'animate-scale-in',
    style: (duration: string = '300ms') => ({
      animation: `scaleIn ${getAnimationDuration(duration)} ease-out forwards`
    })
  },
  
  liquidMorph: {
    keyframes: `
      @keyframes liquidMorph {
        0% { border-radius: 50%; }
        25% { border-radius: 30% 70% 70% 30%; }
        50% { border-radius: 70% 30% 30% 70%; }
        75% { border-radius: 40% 60% 60% 40%; }
        100% { border-radius: 16px; }
      }
    `,
    className: 'animate-liquid-morph',
    style: (duration: string = '2s') => ({
      animation: `liquidMorph ${getAnimationDuration(duration)} ease-in-out infinite`
    })
  },
  
  glassShimmer: {
    keyframes: `
      @keyframes glassShimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `,
    className: 'animate-glass-shimmer',
    style: (duration: string = '1.5s') => ({
      animation: `glassShimmer ${getAnimationDuration(duration)} ease-in-out infinite`
    })
  }
};

// Micro-interaction variants
export const MICRO_INTERACTIONS = {
  hover: {
    scale: (intensity: AnimationIntensity = 'medium') => ({
      transform: `scale(${1 + GSAP_PRESETS.intensity[intensity].scale})`,
      transition: getTransition('transform', '200ms', 'ease-out'),
      willChange: 'transform'
    }),
    
    lift: (intensity: AnimationIntensity = 'medium') => ({
      transform: `translateY(-${GSAP_PRESETS.intensity[intensity].distance / 4}px) scale(${1 + GSAP_PRESETS.intensity[intensity].scale})`,
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      transition: getTransition('all', '200ms', 'ease-out'),
      willChange: 'transform, box-shadow'
    }),
    
    glow: (color: string = 'rgba(59, 130, 246, 0.5)') => ({
      boxShadow: `0 0 20px ${color}`,
      transition: getTransition('box-shadow', '200ms', 'ease-out'),
      willChange: 'box-shadow'
    })
  },
  
  focus: {
    ring: (color: string = 'rgb(59, 130, 246)') => ({
      outline: 'none',
      boxShadow: `0 0 0 3px ${color}40`,
      transition: getTransition('box-shadow', '150ms', 'ease-out'),
      willChange: 'box-shadow'
    }),
    
    scale: (intensity: AnimationIntensity = 'subtle') => ({
      transform: `scale(${1 + GSAP_PRESETS.intensity[intensity].scale})`,
      transition: getTransition('transform', '150ms', 'ease-out'),
      willChange: 'transform'
    })
  },
  
  active: {
    press: (intensity: AnimationIntensity = 'medium') => ({
      transform: `scale(${1 - GSAP_PRESETS.intensity[intensity].scale})`,
      transition: getTransition('transform', '100ms', 'ease-out'),
      willChange: 'transform'
    })
  }
};

// Scroll animations registry
export const SCROLL_ANIMATIONS = {
  fadeInUp: (element: HTMLElement, options: AnimationConfig = {}) => {
    const config = { 
      duration: GSAP_PRESETS.duration.normal, 
      ease: GSAP_PRESETS.ease.standard, 
      force3D: true, 
      ...options 
    };
    
    return gsap.fromTo(element, 
      { opacity: 0, y: 40, force3D: config.force3D },
      { opacity: 1, y: 0, duration: config.duration, ease: config.ease, delay: config.delay }
    );
  },
  
  scaleIn: (element: HTMLElement, options: AnimationConfig = {}) => {
    const config = { 
      duration: GSAP_PRESETS.duration.normal, 
      ease: GSAP_PRESETS.ease.standard, 
      force3D: true, 
      ...options 
    };
    
    return gsap.fromTo(element,
      { opacity: 0, scale: 0.8, force3D: config.force3D },
      { opacity: 1, scale: 1, duration: config.duration, ease: config.ease, delay: config.delay }
    );
  },
  
  liquidMorph: (element: HTMLElement, options: AnimationConfig = {}) => {
    const config = { 
      duration: GSAP_PRESETS.duration.slow, 
      ease: GSAP_PRESETS.ease.standard, 
      force3D: true, 
      ...options 
    };
    
    const tl = gsap.timeline({ delay: config.delay });
    
    tl.fromTo(element,
      { opacity: 0, scale: 0.8, borderRadius: '50%', force3D: config.force3D },
      { opacity: 1, scale: 1, borderRadius: '16px', duration: config.duration, ease: config.ease }
    );
    
    tl.to(element, {
      borderRadius: '30% 70% 70% 30%',
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });
    
    return tl;
  },
  
  parallax: (element: HTMLElement, speed: number = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }
};

// Glass effect variants
export const GLASS_EFFECTS = {
  light: {
    backdrop: 'blur(8px)',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  },
  
  medium: {
    backdrop: 'blur(16px)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  },
  
  heavy: {
    backdrop: 'blur(24px)',
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
  }
};

// Performance optimized CSS classes
export const PERFORMANCE_CLASSES = {
  gpuAccelerated: 'gpu-accelerated',
  willChangeTransform: 'will-change-transform',
  willChangeAuto: 'will-change-auto',
  backfaceHidden: 'backface-hidden',
  transformGpu: 'transform-gpu'
};

// Animation builder utility
export class AnimationBuilder {
  private animations: any[] = [];
  private timeline: gsap.core.Timeline | null = null;
  
  constructor(private useReducedMotion: boolean = false) {
    if (!this.useReducedMotion) {
      this.timeline = gsap.timeline();
    }
  }
  
  add(animation: () => gsap.core.Tween | gsap.core.Timeline, position?: string | number) {
    if (this.useReducedMotion) return this;
    
    if (this.timeline) {
      this.timeline.add(animation(), position);
    }
    return this;
  }
  
  fadeIn(element: HTMLElement, options?: AnimationConfig) {
    return this.add(() => SCROLL_ANIMATIONS.fadeInUp(element, options));
  }
  
  scaleIn(element: HTMLElement, options?: AnimationConfig) {
    return this.add(() => SCROLL_ANIMATIONS.scaleIn(element, options));
  }
  
  liquidMorph(element: HTMLElement, options?: AnimationConfig) {
    return this.add(() => SCROLL_ANIMATIONS.liquidMorph(element, options));
  }
  
  play() {
    if (this.timeline && !this.useReducedMotion) {
      this.timeline.play();
    }
    return this;
  }
  
  pause() {
    if (this.timeline) {
      this.timeline.pause();
    }
    return this;
  }
  
  kill() {
    if (this.timeline) {
      this.timeline.kill();
    }
    return this;
  }
  
  getTimeline() {
    return this.timeline;
  }
}

// Export utility functions
export const createAnimationBuilder = (useReducedMotion: boolean = false) => {
  return new AnimationBuilder(useReducedMotion);
};

export const applyGlassEffect = (element: HTMLElement, intensity: keyof typeof GLASS_EFFECTS = 'medium') => {
  const effect = GLASS_EFFECTS[intensity];
  Object.assign(element.style, {
    backdropFilter: effect.backdrop,
    background: effect.background,
    border: effect.border,
    boxShadow: effect.boxShadow
  });
};

export const getHoverVariant = (type: keyof typeof MICRO_INTERACTIONS.hover, intensity?: AnimationIntensity, color?: string) => {
  if (type === 'glow') {
    return MICRO_INTERACTIONS.hover[type](color);
  }
  return MICRO_INTERACTIONS.hover[type](intensity || 'medium');
};

export const getFocusVariant = (type: keyof typeof MICRO_INTERACTIONS.focus, color?: string, intensity?: AnimationIntensity) => {
  if (type === 'ring') {
    return MICRO_INTERACTIONS.focus[type](color || 'rgb(59, 130, 246)');
  }
  return MICRO_INTERACTIONS.focus[type](intensity || 'subtle');
};

export const getActiveVariant = (type: keyof typeof MICRO_INTERACTIONS.active, intensity?: AnimationIntensity) => {
  return MICRO_INTERACTIONS.active[type](intensity || 'medium');
};
