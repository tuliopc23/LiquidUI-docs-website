/**
 * Security utilities for production deployment
 */

// Content Security Policy configuration
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", "https://vercel.live"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  'img-src': ["'self'", "data:", "https:", "blob:"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'connect-src': ["'self'", "https://vitals.vercel-insights.com"],
  'frame-ancestors': ["'none'"],
} as const;

// Rate limiting configuration for API routes
export const RATE_LIMITS = {
  DEFAULT: 100, // requests per minute
  SEARCH: 50,
  ANALYTICS: 20,
} as const;

// Input validation utilities
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
