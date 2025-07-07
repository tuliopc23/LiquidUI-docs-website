import React, { memo, useCallback } from 'react';
import { useAnimation } from './AnimationProvider';

// Custom shouldReduceMotion function
function shouldReduceMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Shared animation constants for CSS animations
export const ANIMATION_CONSTANTS = {
    // Duration scales (in milliseconds for CSS)
    duration: {
        fast: '150ms',
        normal: '250ms',
        slow: '400ms',
        slowest: '600ms',
    },

    // Easing curves for CSS transitions
    easing: {
        standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
    },

    // Scale values for hover effects
    scale: {
        small: 1.02,
        normal: 1.05,
        large: 1.1,
    },

    // Viewport settings for intersection observer
    viewport: {
        eager: '100px 0px 100px 0px',
        lazy: '0px 0px -100px 0px',
        conservative: '0px 0px -200px 0px',
    }
};

// Spring configuration presets for CSS animations
export const SPRING_CONFIGS = {
    gentle: {
        stiffness: 120,
        damping: 14,
        mass: 1,
    },
    bouncy: {
        stiffness: 180,
        damping: 10,
        mass: 1,
    },
    snappy: {
        stiffness: 400,
        damping: 22,
        mass: 1,
    },
    smooth: {
        stiffness: 300,
        damping: 30,
        mass: 1,
    },
};

// Performance optimization hook
export const usePerformanceOptimization = () => {
    const [isReducedMotion, setIsReducedMotion] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mobileQuery = window.matchMedia('(max-width: 768px)');

        setIsReducedMotion(shouldReduceMotion() || reducedMotionQuery.matches);
        setIsMobile(mobileQuery.matches);

        const handleReducedMotionChange = (e: MediaQueryListEvent) => {
            setIsReducedMotion(shouldReduceMotion() || e.matches);
        };

        const handleMobileChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
        mobileQuery.addEventListener('change', handleMobileChange);

        return () => {
            reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
            mobileQuery.removeEventListener('change', handleMobileChange);
        };
    }, []);

    return {
        isReducedMotion,
        isMobile,
        shouldAnimate: !isReducedMotion,
    };
};

// Performance monitoring interface
interface PerformanceMetrics {
    fps: number;
    memoryUsage: number;
    renderTime: number;
    animationCount: number;
}

// Simple performance monitor hook
export const usePerformanceMonitor = (): PerformanceMetrics => {
    const [metrics, setMetrics] = React.useState<PerformanceMetrics>({
        fps: 60,
        memoryUsage: 0,
        renderTime: 0,
        animationCount: 0,
    });

    React.useEffect(() => {
        let frameCount = 0;
        let lastTime = performance.now();

        const measurePerformance = () => {
            const currentTime = performance.now();
            frameCount++;

            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

                setMetrics(prev => ({
                    ...prev,
                    fps,
                    memoryUsage: (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory?.usedJSHeapSize || 0,
                    renderTime: currentTime - lastTime,
                }));

                frameCount = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(measurePerformance);
        };

        const animationFrame = requestAnimationFrame(measurePerformance);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return metrics;
};

// Simplified animation controller
export const useAnimationController = () => {
    const [animationsEnabled, setAnimationsEnabled] = React.useState(true);
    const [complexity, setComplexity] = React.useState<'low' | 'medium' | 'high'>('high');

    const toggleAnimations = useCallback(() => {
        setAnimationsEnabled(prev => !prev);
    }, []);

    const adjustComplexity = useCallback((level: 'low' | 'medium' | 'high') => {
        setComplexity(level);

        // Apply complexity adjustments via CSS variables
        const root = document.documentElement;
        switch (level) {
            case 'low':
                root.style.setProperty('--animation-duration', '100ms');
                root.style.setProperty('--blur-intensity', '2px');
                break;
            case 'medium':
                root.style.setProperty('--animation-duration', '200ms');
                root.style.setProperty('--blur-intensity', '8px');
                break;
            case 'high':
                root.style.setProperty('--animation-duration', '300ms');
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

// Simple intersection observer hook
export const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {}
) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(callback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
            ...options,
        });

        observer.observe(element);
        return () => observer.disconnect();
    }, [callback, options]);

    return ref;
};

// CSS-based animation utilities
export const getOptimizedTransition = (isMobile = false, complexity: 'low' | 'medium' | 'high' = 'medium') => {
    const durationMap = {
        low: isMobile ? '100ms' : '150ms',
        medium: isMobile ? '200ms' : '250ms',
        high: isMobile ? '300ms' : '400ms',
    };

    return {
        duration: durationMap[complexity],
        easing: ANIMATION_CONSTANTS.easing.standard,
    };
};

// Utility to check if animations should be reduced
export const shouldUseReducedAnimations = () => {
    if (typeof window === 'undefined') return false;
    return shouldReduceMotion();
};

// GPU acceleration utility
export const addGPUAcceleration = (element: HTMLElement) => {
    element.style.willChange = 'transform, opacity';
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
};

// Simple viewport motion component using CSS
export const ViewportMotion: React.FC<{
    children: React.ReactNode;
    className?: string;
    animation?: 'fadeIn' | 'slideUp' | 'scaleIn';
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
}> = memo(({
    children,
    className = '',
    animation = 'fadeIn',
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    once = true
}) => {
    const [isInView, setIsInView] = React.useState(false);
    const [hasAnimated, setHasAnimated] = React.useState(false);
    const { shouldAnimate } = useAnimation();

    const ref = useIntersectionObserver(
        ([entry]) => {
            const inView = entry.isIntersecting;
            setIsInView(inView);

            if (inView && once && !hasAnimated) {
                setHasAnimated(true);
            }
        },
        { threshold, rootMargin }
    );

    if (!shouldAnimate) {
        return (
            <div ref={ref} className={className}>
                {children}
            </div>
        );
    }

    const shouldShow = isInView || (once && hasAnimated);
    const animationClass = shouldShow ? `animate-${animation}` : 'opacity-0';

    return (
        <div
            ref={ref}
            className={`${className} ${animationClass} transition-all duration-500 ease-out`}
        >
            {children}
        </div>
    );
});

ViewportMotion.displayName = 'ViewportMotion';

// Optimized lazy wrapper for performance monitoring
export const LazyOptimizedMotion: React.FC<{
    children: React.ReactNode;
    enablePerformanceMonitoring?: boolean;
}> = memo(({ children, enablePerformanceMonitoring = false }) => {
    const metrics = usePerformanceMonitor();
    const shouldShowMetrics = enablePerformanceMonitoring && metrics;

    React.useEffect(() => {
        if (shouldShowMetrics) {
            // Log performance warnings
            if (metrics.fps < 30) {
                // console.warn('Low FPS detected:', metrics.fps);
            }
            if (metrics.memoryUsage > 100 * 1024 * 1024) { // 100MB
                // console.warn('High memory usage detected:', metrics.memoryUsage);
            }
        }
    }, [metrics, shouldShowMetrics]);

    return <>{children}</>;
});

LazyOptimizedMotion.displayName = 'LazyOptimizedMotion';