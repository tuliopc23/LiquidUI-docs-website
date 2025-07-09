'use client';

import React from 'react';
import { lazyLoadUtils } from '@/lib/performance-utils';

// Lazy load the heavy GlassChart component
const LazyGlassChart = lazyLoadUtils.createLazyComponent(
  () => import('./GlassChart')
);

// Preload function for eager loading on hover
export const preloadGlassChart = lazyLoadUtils.preloadComponent(
  () => import('./GlassChart')
);

// Export with same interface as original
export * from './GlassChart';
export default LazyGlassChart;
