'use client';

import React from 'react';

// Define Command props interface
interface CommandProps {
  command: string;
  execute?: () => void;
  children?: React.ReactNode;
}

// Lazy load the heavy GlassCommand component
const LazyGlassCommand = React.lazy(() => import('./GlassCommand'));

// Export wrapper with proper typing
const LazyGlassCommandWrapper = React.forwardRef<HTMLDivElement, CommandProps>(
  props => (
    <React.Suspense
      fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}
    >
      <LazyGlassCommand {...props}>{props.children || null}</LazyGlassCommand>
    </React.Suspense>
  )
);

LazyGlassCommandWrapper.displayName = 'LazyGlassCommand';

// Preload function for eager loading on hover
export const preloadGlassCommand = () => {
  import('./GlassCommand').catch(() => {
    // Ignore preload errors
  });
};

// Export with same interface as original
export * from './GlassCommand';
export default LazyGlassCommandWrapper;
