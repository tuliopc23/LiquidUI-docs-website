import React, { useState, useRef, useEffect } from 'react';
import { ComponentSkeleton } from './LoadingSkeleton';

interface LazyLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
  className?: string;
}

export function LazyLoadWrapper({
  children,
  fallback = <ComponentSkeleton />,
  rootMargin = '100px',
  threshold = 0.1,
  className = ''
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      <div
        className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {isVisible ? children : fallback}
      </div>
    </div>
  );
}

// Performance optimized component wrapper
export function OptimizedSection({
  children,
  className = '',
  priority = 'low'
}: {
  children: React.ReactNode;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
}) {
  const shouldLazyLoad = priority === 'low';

  if (!shouldLazyLoad) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyLoadWrapper className={className}>
      {children}
    </LazyLoadWrapper>
  );
}