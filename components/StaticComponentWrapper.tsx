'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

interface StaticComponentWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  enableClientInteraction?: boolean;
  className?: string;
}

/**
 * Wrapper component that renders children statically during SSG
 * but enables full interactivity after hydration for specific components
 */
export function StaticComponentWrapper({
  children,
  fallback,
  enableClientInteraction = false,
  className = '',
}: StaticComponentWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Delay hydration to ensure smooth static export
    const timer = setTimeout(() => setIsHydrated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // During SSG/SSR, render static content
  if (!isClient) {
    return (
      <div className={`static-wrapper ${className}`} suppressHydrationWarning>
        {fallback || children}
      </div>
    );
  }

  // After hydration, enable full interactivity if requested
  if (enableClientInteraction && isHydrated) {
    return (
      <ErrorBoundary>
        <div className={`interactive-wrapper ${className}`}>{children}</div>
      </ErrorBoundary>
    );
  }

  // Default: render with basic client-side functionality
  return (
    <div className={`client-wrapper ${className}`} suppressHydrationWarning>
      {children}
    </div>
  );
}

/**
 * Higher-order component for creating static-friendly component variants
 */
export function withStaticRendering<T extends object>(
  Component: React.ComponentType<T>,
  staticProps?: Partial<T>
) {
  return function StaticComponent(props: T) {
    return (
      <StaticComponentWrapper enableClientInteraction={false}>
        <Component {...(staticProps ? { ...staticProps, ...props } : props)} />
      </StaticComponentWrapper>
    );
  };
}

/**
 * Higher-order component for creating interactive component variants
 */
export function withInteractiveRendering<T extends object>(
  Component: React.ComponentType<T>
) {
  return function InteractiveComponent(props: T) {
    return (
      <StaticComponentWrapper enableClientInteraction={true}>
        <Component {...props} />
      </StaticComponentWrapper>
    );
  };
}
