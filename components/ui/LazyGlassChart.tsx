'use client';

import React from 'react';

// Define chart props interface
interface ChartProps {
  data: Array<{ label: string; value: number }>;
  type: 'line' | 'bar' | 'pie' | 'donut';
  title: string;
  width: number;
  height: number;
  animated?: boolean;
  children?: React.ReactNode;
}

// Lazy load the heavy GlassChart component
const LazyGlassChart = React.lazy(() => import('./GlassChart'));

// Export wrapper with proper typing
const LazyGlassChartWrapper = React.forwardRef<HTMLDivElement, ChartProps>(
  props => (
    <React.Suspense
      fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}
    >
      <LazyGlassChart {...props}>{props.children || null}</LazyGlassChart>
    </React.Suspense>
  )
);

LazyGlassChartWrapper.displayName = 'LazyGlassChart';

// Preload function for eager loading on hover
export const preloadGlassChart = () => {
  import('./GlassChart').catch(() => {
    // Ignore preload errors
  });
};

// Export with same interface as original
export * from './GlassChart';
export default LazyGlassChartWrapper;
