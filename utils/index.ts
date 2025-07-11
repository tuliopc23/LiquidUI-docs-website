/**
 *
 * Utility functions for the Liquidify documentation project
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind CSS merge functionality
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Deep clone utility
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item)) as T;
  }

  if (typeof obj === 'object') {
    const copy = {} as { [Key in keyof T]: T[Key] };
    Object.keys(obj).forEach(key => {
      copy[key as keyof T] = deepClone((obj as { [Key in keyof T]: T[Key] })[key as keyof T]);
    });
    return copy;
  }

  return obj;
}

/**
 * Format number with locale
 */
export function formatNumber(
  num: number,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat('en-US', options).format(num);
}

/**
 * Generate unique ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if code is running in browser
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Local storage utilities with error handling
 */
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (!isBrowser) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Silently fail if storage is unavailable
    }
  },

  remove: (key: string): void => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail if storage is unavailable
    }
  },
};

/**
 * Error logging utility
 */
export function logError(error: Error, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`Error${context ? ` in ${context}` : ''}:`, error);
  }

  // In production, you might want to send errors to a logging service
  // Example: analytics.track('error', { message: error.message, context });
}
