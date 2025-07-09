// Performance utilities for liquid glass effects
import React, { useState, useEffect, useRef } from 'react';

export const performanceUtils = {
  // Check if backdrop-filter is supported
  supportsBackdropFilter: (): boolean => {
    if (typeof window === 'undefined') return false;

    return (
      'backdropFilter' in document.documentElement.style ||
      'webkitBackdropFilter' in document.documentElement.style
    );
  },

  // Check if device is low-end based on performance indicators
  isLowEndDevice: (): boolean => {
    if (typeof window === 'undefined') return false;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Check for reduced transparency preference
    const prefersReducedTransparency = window.matchMedia(
      '(prefers-reduced-transparency: reduce)'
    ).matches;

    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory;
    const isLowMemory = deviceMemory && deviceMemory < 4;

    // Check connection speed
    const connection = (navigator as any).connection;
    const isSlowConnection =
      connection &&
      (connection.effectiveType === 'slow-2g' ||
        connection.effectiveType === '2g' ||
        connection.effectiveType === '3g');

    // Check viewport size (mobile devices)
    const isMobile = window.innerWidth < 768;

    return (
      prefersReducedMotion ||
      prefersReducedTransparency ||
      isLowMemory ||
      isSlowConnection ||
      isMobile
    );
  },

  // Get optimized backdrop filter based on device capabilities
  getOptimizedBackdropFilter: (
    intensity: 'light' | 'medium' | 'heavy' = 'medium'
  ): string => {
    if (!performanceUtils.supportsBackdropFilter()) {
      return 'none';
    }

    const isLowEnd = performanceUtils.isLowEndDevice();

    const intensityMap = {
      light: isLowEnd
        ? 'blur(4px)'
        : 'blur(8px) saturate(150%) brightness(105%)',
      medium: isLowEnd
        ? 'blur(6px)'
        : 'blur(12px) saturate(180%) brightness(110%)',
      heavy: isLowEnd
        ? 'blur(8px)'
        : 'blur(20px) saturate(200%) brightness(115%)',
    };

    return intensityMap[intensity];
  },

  // Optimize element for liquid glass effects
  optimizeElement: (
    element: HTMLElement,
    intensity: 'light' | 'medium' | 'heavy' = 'medium'
  ): void => {
    if (!element) return;

    // Add performance optimization classes
    element.classList.add('liquid-glass-optimized');

    // Apply optimized backdrop filter
    const backdropFilter =
      performanceUtils.getOptimizedBackdropFilter(intensity);
    element.style.backdropFilter = backdropFilter;
    (element.style as any).webkitBackdropFilter = backdropFilter;

    // Force hardware acceleration
    element.style.transform = 'translateZ(0)';
    element.style.willChange =
      'transform, backdrop-filter, background, box-shadow';

    // Add containment for better performance
    element.style.contain = 'layout style paint';
    element.style.isolation = 'isolate';
  },

  // Throttle function for performance-sensitive operations
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;
    let lastExecTime = 0;

    return (...args: Parameters<T>) => {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func(...args);
        lastExecTime = currentTime;
      } else {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(
          () => {
            func(...args);
            lastExecTime = Date.now();
          },
          delay - (currentTime - lastExecTime)
        );
      }
    };
  },

  // Debounce function for performance-sensitive operations
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    delay: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  },

  // Optimize backdrop-filter for scroll events
  optimizeScrollEffects: (element: HTMLElement): (() => void) => {
    if (!element) return () => {};

    const throttledScroll = performanceUtils.throttle((scrollY: number) => {
      if (performanceUtils.isLowEndDevice()) {
        // Simplified effect for low-end devices
        element.style.backdropFilter = `blur(${Math.min(5 + scrollY * 0.01, 10)}px)`;
      } else {
        // Full effect for capable devices
        const blur = Math.min(5 + scrollY * 0.02, 20);
        const saturation = Math.min(100 + scrollY * 0.1, 200);
        const brightness = Math.min(100 + scrollY * 0.02, 115);

        element.style.backdropFilter = `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`;
      }
    }, 16); // ~60fps

    const handleScroll = () => {
      throttledScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },

  // Intersection Observer for performance optimization
  createIntersectionObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver | null => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return null;
    }

    const defaultOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver(callback, defaultOptions);
  },

  // Optimize animation performance
  optimizeAnimation: (element: HTMLElement): void => {
    if (!element) return;

    // Add animation optimization classes
    element.classList.add('liquid-glass-animating');

    // Optimize for animations
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
    element.style.transformStyle = 'preserve-3d';

    // Use GPU acceleration
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform, opacity, backdrop-filter';
  },

  // Clean up performance optimizations
  cleanup: (element: HTMLElement): void => {
    if (!element) return;

    // Remove performance classes
    element.classList.remove(
      'liquid-glass-optimized',
      'liquid-glass-animating'
    );

    // Reset styles
    element.style.willChange = 'auto';
    element.style.contain = 'none';
    element.style.isolation = 'auto';
    element.style.backfaceVisibility = 'visible';
    element.style.perspective = 'none';
    element.style.transformStyle = 'flat';
  },

  // Get device capabilities
  getDeviceCapabilities: () => {
    if (typeof window === 'undefined') {
      return {
        supportsBackdropFilter: false,
        isLowEndDevice: true,
        hasHardwareAcceleration: false,
        prefersReducedMotion: false,
        prefersReducedTransparency: false,
      };
    }

    return {
      supportsBackdropFilter: performanceUtils.supportsBackdropFilter(),
      isLowEndDevice: performanceUtils.isLowEndDevice(),
      hasHardwareAcceleration: 'transform3d' in document.documentElement.style,
      prefersReducedMotion: window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches,
      prefersReducedTransparency: window.matchMedia(
        '(prefers-reduced-transparency: reduce)'
      ).matches,
    };
  },
};

// React hook for performance optimization
export const usePerformanceOptimization = () => {
  const capabilities = performanceUtils.getDeviceCapabilities();

  const optimizeElement = (
    element: HTMLElement,
    intensity: 'light' | 'medium' | 'heavy' = 'medium'
  ) => {
    performanceUtils.optimizeElement(element, intensity);
  };

  const optimizeForScroll = (element: HTMLElement) => {
    return performanceUtils.optimizeScrollEffects(element);
  };

  const optimizeForAnimation = (element: HTMLElement) => {
    performanceUtils.optimizeAnimation(element);
  };

  const cleanup = (element: HTMLElement) => {
    performanceUtils.cleanup(element);
  };

  return {
    capabilities,
    optimizeElement,
    optimizeForScroll,
    optimizeForAnimation,
    cleanup,
  };
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const metricsRef = useRef<PerformanceMetrics | null>(null);
  const observerRef = useRef<PerformanceObserver | null>(null);

  const startMonitoring = () => {
    if (typeof window === 'undefined' || isMonitoring) return;

    setIsMonitoring(true);

    // Initialize metrics
    const initialMetrics: PerformanceMetrics = {
      renderTime: 0,
      interactionTime: 0,
      memoryUsage: 0,
      frameRate: 0,
      bundleSize: 0,
      glassEffectPerformance: {
        backdropFilterTime: 0,
        renderComplexity: 'low',
        gpuAcceleration:
          performanceUtils.getDeviceCapabilities().hasHardwareAcceleration,
      },
      timestamp: Date.now(),
    };

    metricsRef.current = initialMetrics;
    setMetrics(initialMetrics);

    // Set up performance observer
    if ('PerformanceObserver' in window) {
      observerRef.current = new PerformanceObserver(list => {
        const entries = list.getEntries();

        entries.forEach(entry => {
          if (entry.entryType === 'measure' && metricsRef.current) {
            if (entry.name.includes('glass-effect')) {
              metricsRef.current.glassEffectPerformance.backdropFilterTime =
                entry.duration;
            }
            metricsRef.current.renderTime = entry.duration;
          }
        });

        setMetrics({ ...metricsRef.current! });
      });

      observerRef.current.observe({
        entryTypes: ['measure', 'navigation', 'paint'],
      });
    }

    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();

    const countFrames = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        if (metricsRef.current) {
          metricsRef.current.frameRate = frameCount;
          setMetrics({ ...metricsRef.current });
        }
        frameCount = 0;
        lastTime = currentTime;
      }

      if (isMonitoring) {
        requestAnimationFrame(countFrames);
      }
    };

    requestAnimationFrame(countFrames);

    // Monitor memory usage
    const updateMemoryUsage = () => {
      if ('memory' in performance && metricsRef.current) {
        const memory = (performance as any).memory;
        metricsRef.current.memoryUsage = memory.usedJSHeapSize / (1024 * 1024); // MB
        setMetrics({ ...metricsRef.current });
      }
    };

    const memoryInterval = setInterval(updateMemoryUsage, 1000);

    return () => {
      clearInterval(memoryInterval);
    };
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  const measureGlassEffect = (name: string, fn: () => void) => {
    if (typeof window === 'undefined') return fn();

    performance.mark(`glass-effect-${name}-start`);
    fn();
    performance.mark(`glass-effect-${name}-end`);
    performance.measure(
      `glass-effect-${name}`,
      `glass-effect-${name}-start`,
      `glass-effect-${name}-end`
    );
  };

  const getBenchmarkResults = (): BenchmarkResult[] => {
    if (!metrics) return [];

    return [
      {
        name: 'Render Time',
        value: metrics.renderTime,
        unit: 'ms',
        benchmark: 16.67, // 60fps target
        status:
          metrics.renderTime < 16.67
            ? 'good'
            : metrics.renderTime < 33.33
              ? 'warning'
              : 'poor',
      },
      {
        name: 'Frame Rate',
        value: metrics.frameRate,
        unit: 'fps',
        benchmark: 60,
        status:
          metrics.frameRate >= 60
            ? 'good'
            : metrics.frameRate >= 30
              ? 'warning'
              : 'poor',
      },
      {
        name: 'Memory Usage',
        value: metrics.memoryUsage,
        unit: 'MB',
        benchmark: 50,
        status:
          metrics.memoryUsage < 50
            ? 'good'
            : metrics.memoryUsage < 100
              ? 'warning'
              : 'poor',
      },
      {
        name: 'Glass Effect Performance',
        value: metrics.glassEffectPerformance.backdropFilterTime,
        unit: 'ms',
        benchmark: 5,
        status:
          metrics.glassEffectPerformance.backdropFilterTime < 5
            ? 'good'
            : metrics.glassEffectPerformance.backdropFilterTime < 10
              ? 'warning'
              : 'poor',
      },
    ];
  };

  return {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    measureGlassEffect,
    getBenchmarkResults,
  };
};

// Performance types
interface PerformanceMetrics {
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
  frameRate: number;
  bundleSize: number;
  glassEffectPerformance: {
    backdropFilterTime: number;
    renderComplexity: 'low' | 'medium' | 'high';
    gpuAcceleration: boolean;
  };
  timestamp: number;
}

interface BenchmarkResult {
  name: string;
  value: number;
  unit: string;
  benchmark: number;
  status: 'good' | 'warning' | 'poor';
}

// Bundle size utilities
export const bundleUtils = {
  // Estimate component bundle size
  estimateComponentSize: (componentName: string): number => {
    const baseSizes: Record<string, number> = {
      GlassButton: 3.2,
      GlassCard: 2.8,
      GlassInput: 4.1,
      GlassModal: 6.5,
      GlassNavbar: 5.3,
      GlassChart: 12.8,
      GlassDatePicker: 15.2,
      GlassFileUpload: 8.9,
      GlassCommand: 7.4,
    };

    return baseSizes[componentName] || 4.0; // Default size in KB
  },

  // Get total bundle size for multiple components
  getTotalBundleSize: (components: string[]): number => {
    return components.reduce((total, component) => {
      return total + bundleUtils.estimateComponentSize(component);
    }, 0);
  },

  // Get bundle size recommendations
  getBundleRecommendations: (components: string[]): string[] => {
    const recommendations: string[] = [];
    const totalSize = bundleUtils.getTotalBundleSize(components);

    if (totalSize > 50) {
      recommendations.push('Consider code splitting for better performance');
    }

    if (components.includes('GlassChart')) {
      recommendations.push('GlassChart is heavy - consider lazy loading');
    }

    if (components.includes('GlassDatePicker')) {
      recommendations.push(
        'GlassDatePicker includes date utilities - consider tree shaking'
      );
    }

    return recommendations;
  },
};

// Lazy loading utilities
export const lazyLoadUtils = {
  // Create lazy loaded component
  createLazyComponent: (importFn: () => Promise<any>) => {
    const LazyComponent = React.lazy(importFn);

    return React.forwardRef<any, any>((props, ref) =>
      React.createElement(
        React.Suspense,
        {
          fallback: React.createElement('div', {
            className: 'animate-pulse bg-gray-200 rounded-lg h-20',
          }),
        },
        React.createElement(LazyComponent, { ...props, ref })
      )
    );
  },

  // Intersection observer for lazy loading
  useLazyLoad: (threshold: number = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const observer = performanceUtils.createIntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !isLoaded) {
              setIsVisible(true);
              setIsLoaded(true);
            }
          });
        },
        { threshold }
      );

      if (observer && elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    }, []);

    return { isVisible, isLoaded, elementRef };
  },

  // Preload heavy components
  preloadComponent: (importFn: () => Promise<any>) => {
    // Preload on hover or focus
    const preload = () => {
      importFn().catch(() => {
        // Ignore preload errors
      });
    };

    return preload;
  },
};

export default performanceUtils;
