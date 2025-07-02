import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  fallback,
  rootMargin = '50px',
  threshold = 0.1,
  className = ''
}: LazyLoadWrapperProps) {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true);
          setHasLoaded(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, hasLoaded]);

  const LoadingFallback = () => <ComponentSkeleton />;

  return (
    <div ref={ref} className={className}>
      {isInView ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || <LoadingFallback />
      )}
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