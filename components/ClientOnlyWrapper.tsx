'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientOnlyWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  variant?: 'card' | 'button' | 'panel' | 'default';
}

/**
 * ClientOnlyWrapper - Ensures components only render on the client
 * Prevents SSR hydration mismatches while providing rich liquid glass fallbacks
 */
export function ClientOnlyWrapper({
  children,
  fallback,
  className = '',
  variant = 'default',
}: ClientOnlyWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enhanced liquid glass fallback during SSR and initial client render
  if (!mounted) {
    if (fallback) {
      return <div className={className}>{fallback}</div>;
    }

    // Create rich liquid glass fallback based on variant
    const getVariantFallback = (variant: string) => {
      switch (variant) {
        case 'card':
          return (
            <div
              className={`apple-liquid-glass animate-shimmer rounded-xl p-6 relative overflow-hidden ${className}`}
              style={{
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 8px 32px rgba(31, 38, 135, 0.2),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
              }}
            >
              <div className='h-4 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded mb-3' />
              <div className='h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded mb-2 w-3/4' />
              <div className='h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded w-1/2' />
              <div
                className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none'
                style={{
                  background:
                    'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
                }}
              />
            </div>
          );
        case 'button':
          return (
            <div
              className={`glass-button inline-flex items-center justify-center px-4 py-2 rounded-lg animate-shimmer relative overflow-hidden ${className}`}
              style={{
                backdropFilter: 'blur(12px) saturate(180%)',
                WebkitBackdropFilter: 'blur(12px) saturate(180%)',
                background: 'rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 4px 16px rgba(31, 38, 135, 0.2),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
              }}
            >
              <div className='h-4 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded' />
            </div>
          );
        case 'panel':
          return (
            <div
              className={`apple-liquid-glass animate-shimmer rounded-2xl p-8 relative overflow-hidden ${className}`}
              style={{
                backdropFilter: 'blur(20px) saturate(200%)',
                WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: `
                  0 12px 40px rgba(31, 38, 135, 0.25),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
              }}
            >
              <div className='h-6 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded mb-4' />
              <div className='h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded mb-3 w-4/5' />
              <div className='h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded mb-3 w-3/5' />
              <div className='h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded w-2/3' />
            </div>
          );
        default:
          return (
            <div
              className={`apple-liquid-glass animate-shimmer rounded-lg p-4 relative overflow-hidden ${className}`}
              style={{
                backdropFilter: 'blur(16px) saturate(180%)',
                WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: `
                  0 8px 32px rgba(31, 38, 135, 0.2),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.3)
                `,
              }}
            >
              <div className='h-4 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded mb-2' />
              <div className='h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded mb-2 w-3/4' />
              <div className='h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded w-1/2' />
            </div>
          );
      }
    };

    return getVariantFallback(variant);
  }

  // Render actual content after hydration
  return <div className={className}>{children}</div>;
}

/**
 * withClientOnly - HOC to wrap any component with client-only rendering
 */
export function withClientOnly<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: ReactNode,
  variant?: 'card' | 'button' | 'panel' | 'default'
) {
  return function ClientOnlyComponent(props: T) {
    return (
      <ClientOnlyWrapper fallback={fallback} variant={variant}>
        <Component {...props} />
      </ClientOnlyWrapper>
    );
  };
}

export default ClientOnlyWrapper;
