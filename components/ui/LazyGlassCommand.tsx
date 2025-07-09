'use client';

import React from 'react';
import { lazyLoadUtils } from '@/lib/performance-utils';

// Lazy load the heavy GlassCommand component
const LazyGlassCommand = lazyLoadUtils.createLazyComponent(
  () => import('./GlassCommand')
);

// Preload function for eager loading on hover
export const preloadGlassCommand = lazyLoadUtils.preloadComponent(
  () => import('./GlassCommand')
);

// Export with same interface as original
export * from './GlassCommand';
export default LazyGlassCommand;
