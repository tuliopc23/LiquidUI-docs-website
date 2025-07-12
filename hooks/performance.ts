/**
 * Performance optimization hooks for the Liquidify documentation project
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { debounce, throttle, prefersReducedMotion } from '@/utils';

/**
 * Hook for optimized state updates with debouncing
 */
export function useDebouncedState<T>(
  initialValue: T,
  delay: number = 300
): [T, T, (value: T) => void] {
  const [immediateValue, setImmediateValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  const debouncedSetValue = useCallback(
    debounce((...args: unknown[]) => setDebouncedValue(args[0] as T), delay),
    [delay]
  );

  const setValue = useCallback(
    (value: T) => {
      setImmediateValue(value);
      debouncedSetValue(value);
    },
    [debouncedSetValue]
  );

  return [immediateValue, debouncedValue, setValue];
}

/**
 * Hook for intersection observer with performance optimizations
 */
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry) {
          setIsIntersecting(entry.isIntersecting);
          setEntry(entry);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return { isIntersecting, entry, elementRef };
}

/**
 * Hook for lazy loading with intersection observer
 */
export function useLazyLoad() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isIntersecting, elementRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (isIntersecting && !isLoaded) {
      setIsLoaded(true);
    }
  }, [isIntersecting, isLoaded]);

  return { isLoaded, ref: elementRef };
}

/**
 * Hook for performance-aware animations
 */
export function usePerformantAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Respect user's motion preferences
    const reducedMotion = prefersReducedMotion();

    // Check for low-end device indicators
    const isLowEndDevice =
      navigator.hardwareConcurrency <= 2 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4) <= 2;

    setShouldAnimate(!reducedMotion && !isLowEndDevice);
  }, []);

  return shouldAnimate;
}

/**
 * Hook for throttled scroll events
 */
export function useThrottledScroll(delay: number = 16) {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    }, delay);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay]);

  return scrollPosition;
}

/**
 * Hook for optimized window resize handling
 */
export function useThrottledResize(delay: number = 100) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, delay);

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);

  return windowSize;
}

/**
 * Hook for memory-efficient component caching
 */
export function useComponentCache<T>(
  factory: () => T,
  deps: React.DependencyList
): T {
  const cacheRef = useRef<{ deps: React.DependencyList; value: T } | null>(
    null
  );

  if (!cacheRef.current || !depsEqual(cacheRef.current.deps, deps)) {
    cacheRef.current = {
      deps: [...deps],
      value: factory(),
    };
  }

  return cacheRef.current.value;
}

// Helper function for dependency comparison
function depsEqual(a: React.DependencyList, b: React.DependencyList): boolean {
  if (a.length !== b.length) return false;
  return a.every((dep, index) => Object.is(dep, b[index]));
}
