import React, { useEffect, memo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// Performance-optimized motion components
export const OptimizedMotion = {
    div: memo(motion.div),
    section: memo(motion.section),
    h1: memo(motion.h1),
    h2: memo(motion.h2),
    h3: memo(motion.h3),
    p: memo(motion.p),
    button: memo(motion.button),
    a: memo(motion.a),
};

// Optimized animation variants
export const optimizedVariants = {
    // Page transitions
    pageTransition: {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                mass: 1,
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
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

    // Hover animations (optimized)
    hoverScale: {
        whileHover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10,
                mass: 0.7,
            }
        },
        whileTap: {
            scale: 0.95,
            transition: {
                type: "spring",
                stiffness: 600,
                damping: 15,
                mass: 0.5,
            }
        }
    },

    // Liquid glass morphing
    liquidMorph: {
        animate: {
            scale: [1, 1.02, 1],
            rotate: [0, 1, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse" as const,
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

    // Fade in viewport
    fadeInViewport: {
        initial: { opacity: 0, y: 50 },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 1,
            }
        },
        viewport: { once: true, margin: "0px 0px -100px 0px" }
    }
};

// Performance optimization hooks
export const usePerformanceOptimization = () => {
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

        // Debounced resize handler
        const debouncedResize = debounce(() => {
            // Trigger re-layout optimizations on resize
            window.dispatchEvent(new CustomEvent('optimizedResize'));
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
        window.addEventListener('resize', debouncedResize);
        const cleanupScroll = optimizeScroll();

        return () => {
            window.removeEventListener('resize', debouncedResize);
            cleanupScroll();
        };
    }, []);
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

// Optimized lazy motion wrapper
export const LazyOptimizedMotion: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <LazyMotion features={domAnimation} strict>
            {children}
        </LazyMotion>
    );
};

export default memo(LazyOptimizedMotion); 