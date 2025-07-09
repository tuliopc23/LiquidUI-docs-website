'use client';

import React from 'react';
import { lazyLoadUtils } from '@/lib/performance-utils';

// Lazy load the heavy GlassDatePicker component
const LazyGlassDatePicker = lazyLoadUtils.createLazyComponent(
  () => import('./GlassDatePicker')
);

// Preload function for eager loading on hover
export const preloadGlassDatePicker = lazyLoadUtils.preloadComponent(
  () => import('./GlassDatePicker')
);

// Export with same interface as original
export * from './GlassDatePicker';
export default LazyGlassDatePicker;
