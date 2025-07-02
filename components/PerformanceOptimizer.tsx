/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, memo, useCallback } from 'react';
import { motion, LazyMotion, domAnimation, type Variants } from 'framer-motion';

// Performance-optimized transition presets
const SPRING_CONFIGS = {
  gentle: { type: "spring" as const, stiffness: 260, damping: 20, mass: 1 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 10, mass: 0.7 },
  snappy: { type: "spring" as const, stiffness: 600, damping: 15, mass: 0.5 },
  smooth: { type: "spring" as const, stiffness: 100, damping: 15, mass: 1 },
} as const;

// Type-safe animation configurations
type SpringConfig = typeof SPRING_CONFIGS[keyof typeof SPRING_CONFIGS];

// Performance-optimized motion components with proper typing
export const OptimizedMotion = {
    div: memo(motion.div),
    section: memo(motion.section),
    h1: memo(motion.h1),
    h2: memo(motion.h2),
    h3: memo(motion.h3),
    p: memo(motion.p),
    button: memo(motion.button),
    a: memo(motion.a),
    ul: memo(motion.ul),
    li: memo(motion.li),
    img: memo(motion.img),
    span: memo(motion.span),
} as const;

// Type-safe optimized animation variants
/* eslint-disable @typescript-eslint/no-explicit-any */
export const optimizedVariants: Record<string, any> = {
    // Enhanced page transitions with better performance
    pageTransition: {
        initial: { 
            opacity: 0, 
            y: 20, 
            scale: 0.95,
            filter: "blur(4px)"
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                ...SPRING_CONFIGS.gentle,
                staggerChildren: 0.05,
                delayChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95,
            filter: "blur(2px)",
            transition: {
                ...SPRING_CONFIGS.snappy,
                duration: 0.2,
            }
        }
    },

    // Stagger animations for lists
    staggerContainer: {
        animate: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            }
        }
    },

    // Individual item animations
    staggerItem: {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
            }
        }
    },

    // Enhanced hover animations with micro-interactions
    hoverScale: {
        whileHover: {
            scale: 1.05,
            y: -2,
            filter: "brightness(1.05)",
            transition: {
                ...SPRING_CONFIGS.bouncy,
                duration: 0.2,
            }
        },
        whileTap: {
            scale: 0.95,
            y: 0,
            filter: "brightness(0.95)",
            transition: {
                ...SPRING_CONFIGS.snappy,
                duration: 0.1,
            }
        }
    },
    
    // Enhanced button interactions
    buttonInteraction: {
        initial: { scale: 1 },
        whileHover: {
            scale: 1.02,
            y: -1,
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
            transition: {
                ...SPRING_CONFIGS.gentle,
                duration: 0.2,
            }
        },
        whileTap: {
            scale: 0.98,
            y: 0,
            transition: {
                ...SPRING_CONFIGS.snappy,
                duration: 0.1,
            }
        }
    },
    
    // Card hover effects
    cardHover: {
        initial: { scale: 1, y: 0 },
        whileHover: {
            scale: 1.02,
            y: -4,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            transition: {
                ...SPRING_CONFIGS.gentle,
                duration: 0.3,
            }
        }
    },

    // Enhanced liquid glass morphing with better performance
    liquidMorph: {
        animate: {
            scale: [1, 1.01, 1.02, 1],
            rotate: [0, 0.5, 1, 0],
            borderRadius: ["24px", "28px 16px 32px 20px", "20px 32px 16px 28px", "24px"],
            transition: {
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: [0.4, 0.0, 0.2, 1],
            }
        }
    },
    
    // Advanced glass morphing
    glassMorphAdvanced: {
        animate: {
            scale: [1, 1.005, 1.01, 1.005, 1],
            rotate: [0, 0.3, -0.2, 0.1, 0],
            filter: ["blur(0px)", "blur(0.5px)", "blur(0.8px)", "blur(0.3px)", "blur(0px)"],
            transition: {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    },

    // Floating animations
    float: {
        animate: {
            y: [0, -10, 0],
            rotate: [0, 2, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut",
            }
        }
    },

    // Enhanced viewport animations
    fadeInViewport: {
        initial: { 
            opacity: 0, 
            y: 50, 
            scale: 0.95,
            filter: "blur(4px)"
        },
        whileInView: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                ...SPRING_CONFIGS.smooth,
                duration: 0.6,
            }
        },
        viewport: { once: true, margin: "0px 0px -100px 0px" }
    },
    
    // Slide in from left
    slideInLeft: {
        initial: { opacity: 0, x: -50 },
        whileInView: {
            opacity: 1,
            x: 0,
            transition: {
                ...SPRING_CONFIGS.gentle,
                duration: 0.6,
            }
        },
        viewport: { once: true, margin: "0px 0px -50px 0px" }
    },
    
    // Slide in from right
    slideInRight: {
        initial: { opacity: 0, x: 50 },
        whileInView: {
            opacity: 1,
            x: 0,
            transition: {
                ...SPRING_CONFIGS.gentle,
                duration: 0.6,
            }
        },
        viewport: { once: true, margin: "0px 0px -50px 0px" }
    },
    
    // Scale in animation
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: {
            opacity: 1,
            scale: 1,
            transition: {
                ...SPRING_CONFIGS.bouncy,
                duration: 0.5,
            }
        },
        viewport: { once: true }
    }
};

// Enhanced performance optimization with advanced techniques
export const usePerformanceOptimization = () => {
    const [isReducedMotion, setIsReducedMotion] = React.useState(false);
    
    // Check for reduced motion preference
    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);
        
        const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    
    const optimizeForDevice = useCallback(() => {
        // Detect device capabilities and adjust animations
        const hasReducedPerformance = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasLowMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory && (navigator as unknown as { deviceMemory?: number }).deviceMemory! < 4;
        const isSlowConnection = (navigator as unknown as { connection?: { effectiveType?: string } }).connection && (navigator as unknown as { connection?: { effectiveType?: string } }).connection!.effectiveType === 'slow-2g';
        
        if (hasReducedPerformance || hasLowMemory || isSlowConnection || isReducedMotion) {
            // Reduce animation complexity
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            document.documentElement.style.setProperty('--animation-complexity', 'low');
        }
    }, [isReducedMotion]);
    useEffect(() => {
        // Enable hardware acceleration for all animated elements
        const optimizeAnimations = () => {
            const style = document.createElement('style');
            style.textContent = `
        /* GPU Acceleration */
        .motion-element,
        [data-framer-motion-element] {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Optimize glassmorphism effects */
        .liquid-glass,
        .glass-card,
        .glass-button,
        .glass-button-primary {
          will-change: transform, backdrop-filter;
          transform: translateZ(0);
          contain: layout style paint;
        }
        
        /* Reduce repaints on hover */
        .hover-optimized {
          contain: layout style paint;
          will-change: transform;
        }
        
        /* Optimize scroll performance */
        .scroll-optimized {
          contain: layout style paint;
          will-change: scroll-position;
        }
        
        /* Force GPU acceleration for animations */
        .animate-liquid-morph,
        .animate-glass-float {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Optimize text rendering */
        .hero-text,
        .body-text {
          text-rendering: optimizeSpeed;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Intersection Observer optimizations */
        .in-viewport {
          contain: layout style paint;
        }
        
        /* Reduce layout thrashing */
        .layout-optimized {
          contain: layout;
        }
        
        /* Memory optimization for large lists */
        .list-optimized {
          contain: layout style;
          content-visibility: auto;
          contain-intrinsic-size: 1px 500px;
        }
      `;
            document.head.appendChild(style);
        };

        // Enhanced resize optimization with RAF
        const debouncedResize = debounce(() => {
            requestAnimationFrame(() => {
                // Batch DOM operations
                window.dispatchEvent(new CustomEvent('optimizedResize'));
                optimizeForDevice();
            });
        }, 100);

        // Optimize scroll performance
        const optimizeScroll = () => {
            let ticking = false;

            const updateScrollPosition = () => {
                // Batch DOM reads and writes
                requestAnimationFrame(() => {
                    ticking = false;
                });
            };

            const onScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(updateScrollPosition);
                    ticking = true;
                }
            };

            window.addEventListener('scroll', onScroll, { passive: true });
            return () => window.removeEventListener('scroll', onScroll);
        };

        optimizeAnimations();
        optimizeForDevice();
        window.addEventListener('resize', debouncedResize);
        const cleanupScroll = optimizeScroll();

        return () => {
            window.removeEventListener('resize', debouncedResize);
            cleanupScroll();
        };
    }, [optimizeForDevice]);
};

// Debounce utility
function debounce<T extends (...args: never[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Performance-optimized intersection observer
export const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
) => {
    const [observer, setObserver] = React.useState<IntersectionObserver | null>(null);

    React.useEffect(() => {
        const obs = new IntersectionObserver(callback, {
            rootMargin: '50px',
            threshold: 0.1,
            ...options,
        });
        setObserver(obs);

        return () => obs.disconnect();
    }, [callback, options]);

    return observer;
};

// Performance monitoring utilities
interface PerformanceMetrics {
    fps: number;
    memoryUsage: number;
    renderTime: number;
    animationCount: number;
}

export const usePerformanceMonitor = () => {
    const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
        fps: 60,
        memoryUsage: 0,
        renderTime: 0,
        animationCount: 0
    });
    
    React.useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measurePerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                const memory = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory?.usedJSHeapSize || 0;
                
                setMetrics(prev => ({
                    ...prev,
                    fps,
                    memoryUsage: memory,
                    renderTime: currentTime - lastTime
                }));
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measurePerformance);
        };
        
        const rafId = requestAnimationFrame(measurePerformance);
        return () => cancelAnimationFrame(rafId);
    }, []);
    
    return metrics;
};

// Advanced animation controller
export const useAnimationController = () => {
    const [animationsEnabled, setAnimationsEnabled] = React.useState(true);
    const [complexity, setComplexity] = React.useState<'low' | 'medium' | 'high'>('high');
    
    const toggleAnimations = useCallback(() => {
        setAnimationsEnabled(prev => !prev);
    }, []);
    
    const adjustComplexity = useCallback((level: 'low' | 'medium' | 'high') => {
        setComplexity(level);
        
        // Apply complexity adjustments
        const root = document.documentElement;
        switch (level) {
            case 'low':
                root.style.setProperty('--animation-duration', '0.1s');
                root.style.setProperty('--blur-intensity', '2px');
                break;
            case 'medium':
                root.style.setProperty('--animation-duration', '0.2s');
                root.style.setProperty('--blur-intensity', '8px');
                break;
            case 'high':
                root.style.setProperty('--animation-duration', '0.3s');
                root.style.setProperty('--blur-intensity', '20px');
                break;
        }
    }, []);
    
    return {
        animationsEnabled,
        complexity,
        toggleAnimations,
        adjustComplexity
    };
};

// Type-safe variant factory
export const createVariant = <T extends Record<string, unknown>>(
    variants: T
): T => variants;

// Optimized lazy motion wrapper with performance monitoring
export const LazyOptimizedMotion: React.FC<{ 
    children: React.ReactNode;
    enablePerformanceMonitoring?: boolean;
}> = memo(({ children, enablePerformanceMonitoring = false }) => {
    // Always call hooks to fix conditional hook call
    const metrics = usePerformanceMonitor();
    const shouldShowMetrics = enablePerformanceMonitoring && metrics;
    
    React.useEffect(() => {
        if (shouldShowMetrics) {
            // Log performance warnings
            if (metrics.fps < 30) {
                console.warn('Low FPS detected:', metrics.fps);
            }
            if (metrics.memoryUsage > 100 * 1024 * 1024) { // 100MB
                console.warn('High memory usage detected:', metrics.memoryUsage);
            }
        }
    }, [metrics, shouldShowMetrics]);
    
    return (
        <LazyMotion features={domAnimation} strict>
            {children}
            {shouldShowMetrics && (
                <div 
                    style={{
                        position: 'fixed',
                        top: 10,
                        right: 10,
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        zIndex: 10000,
                        fontFamily: 'monospace'
                    }}
                >
                    FPS: {metrics.fps} | Memory: {Math.round(metrics.memoryUsage / 1024 / 1024)}MB
                </div>
            )}
        </LazyMotion>
    );
});

LazyOptimizedMotion.displayName = 'LazyOptimizedMotion';

export default LazyOptimizedMotion; 