'use client';

import React from 'react';

// Define DatePicker props interface
interface DatePickerProps {
  placeholder?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

// Lazy load the heavy GlassDatePicker component
const LazyGlassDatePicker = React.lazy(() => import('./GlassDatePicker'));

// Export wrapper with proper typing
const LazyGlassDatePickerWrapper = React.forwardRef<
  HTMLDivElement,
  DatePickerProps
>(props => (
  <React.Suspense
    fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}
  >
    <LazyGlassDatePicker {...props}>
      {props.children || null}
    </LazyGlassDatePicker>
  </React.Suspense>
));

LazyGlassDatePickerWrapper.displayName = 'LazyGlassDatePicker';

// Preload function for eager loading on hover
export const preloadGlassDatePicker = () => {
  import('./GlassDatePicker').catch(() => {
    // Ignore preload errors
  });
};

// Export with same interface as original
export * from './GlassDatePicker';
export default LazyGlassDatePickerWrapper;
