
/**
 * Lazy-loaded component wrapper with performance optimizations
 */

import { lazy, Suspense, ComponentType, ReactNode } from 'react';
import { useLazyLoad, usePerformantAnimation } from '@/hooks/performance';
import { cn } from '@/utils';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

/**
 * Lazy loading wrapper component that only loads content when in viewport
 */
export function LazyComponent({
  children,
  fallback = <LazyComponentSkeleton />,
  className,
  threshold = 0.1,
  rootMargin = '100px',
}: LazyComponentProps) {
  const { isLoaded, ref } = useLazyLoad();
  const shouldAnimate = usePerformantAnimation();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-opacity duration-300',
        shouldAnimate && 'animate-fade-in',
        className,
      )}
    >
      {isLoaded ? children : fallback}
    </div>
  );
}

/**
 * Default skeleton loader for lazy components
 */
function LazyComponentSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg h-32 w-full" />
  );
}

/**
 * Higher-order component for lazy loading with error boundaries
 */
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  fallback?: ReactNode,
) {
  const LazyWrapper = (props: P) => (
    <Suspense fallback={fallback || <LazyComponentSkeleton />}>
      <Component {...props} />
    </Suspense>
  );

  LazyWrapper.displayName = `LazyLoaded(${Component.displayName || Component.name})`;

  return LazyWrapper;
}

/**
 * Create lazy-loaded component with optimizations
 */
export function createLazyComponent<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  fallback?: ReactNode,
) {
  const LazyComponent = lazy(factory);

  return withLazyLoading(LazyComponent, fallback);
}

/**
 * Preload a lazy component for better UX
 */
export function preloadComponent(factory: () => Promise<any>) {
  // Preload on hover or focus
  const preload = () => {
    factory().catch(() => {
      // Silently fail - component will be loaded when actually needed
    });
  };

  return {
    onMouseEnter: preload,
    onFocus: preload,
  };
}
