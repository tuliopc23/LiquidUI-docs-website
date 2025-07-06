import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility to check if we're in a browser environment
export const isBrowser = typeof window !== 'undefined';

// Utility to check if device is mobile
export function isMobile() {
  if (!isBrowser) return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// Utility to check if device prefers reduced motion
export function prefersReducedMotion() {
  if (!isBrowser) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Utility to generate a unique ID
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

// Utility to debounce function calls
export function debounce<T extends (...args: unknown[]) => void>(fn: T, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function(this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

// Utility to throttle function calls
export function throttle<T extends (...args: unknown[]) => void>(fn: T, wait = 300) {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;
  
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          fn.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
}

// Enhanced device detection
export function isTablet() {
  if (!isBrowser) return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
}

export function isDesktop() {
  if (!isBrowser) return false;
  return window.innerWidth >= 1024;
}

export function isTouchDevice() {
  if (!isBrowser) return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Accessibility utilities
export function isHighContrastMode() {
  if (!isBrowser) return false;
  return window.matchMedia('(prefers-contrast: high)').matches;
}

export function getContrastRatio(): number {
  // Simplified - in production, implement full WCAG contrast calculation
  return 4.5; // Meets WCAG AA
}

// Performance utilities
export function measurePerformance(name: string, fn: () => void): number {
  const start = performance.now();
  fn();
  const end = performance.now();
  const duration = end - start;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${duration.toFixed(2)}ms`);
  }
  
  return duration;
}

// Animation easing presets
export const easings = {
  easeInOut: [0.4, 0.0, 0.2, 1] as const,
  easeOut: [0.0, 0.0, 0.2, 1] as const,
  easeIn: [0.4, 0.0, 1, 1] as const,
  sharp: [0.4, 0.0, 0.6, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
};

// Color utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}