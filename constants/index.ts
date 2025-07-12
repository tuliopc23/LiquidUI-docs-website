/**
 * Application constants and configuration values
 */

// Animation constants
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Component variants
export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'tertiary',
  'ghost',
  'destructive',
] as const;

export const BUTTON_SIZES = ['sm', 'md', 'lg'] as const;

// Theme constants
export const THEME_MODES = ['light', 'dark', 'system'] as const;

// API endpoints (if applicable)
export const API_ENDPOINTS = {
  COMPONENTS: '/api/components',
  EXAMPLES: '/api/examples',
  METRICS: '/api/metrics',
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  FCP: 1800, // First Contentful Paint
  LCP: 2500, // Largest Contentful Paint
  FID: 100, // First Input Delay
  CLS: 0.1, // Cumulative Layout Shift
  TTFB: 600, // Time to First Byte
} as const;

// Accessibility constants
export const ARIA_LABELS = {
  CLOSE_MODAL: 'Close modal',
  TOGGLE_THEME: 'Toggle theme',
  OPEN_MENU: 'Open navigation menu',
  CLOSE_MENU: 'Close navigation menu',
  SKIP_TO_CONTENT: 'Skip to main content',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  PERMISSION: 'You do not have permission to perform this action.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully!',
  UPDATED: 'Updated successfully!',
  CREATED: 'Created successfully!',
  DELETED: 'Deleted successfully!',
} as const;

// Application metadata
export const APP_CONFIG = {
  NAME: 'Liquidify Documentation',
  DESCRIPTION: 'Modern glassmorphism UI component library documentation',
  VERSION: '2.0.0',
  REPOSITORY: 'https://github.com/tuliopc23/Liquidify-docs',
  AUTHOR: 'Tulio Pinheiro Cunha',
} as const;

// Social links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/tuliopc23/Liquidify-docs',
  TWITTER: 'https://twitter.com/liquidify',
  DISCORD: 'https://discord.gg/liquidify',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  PERFORMANCE_MONITORING: true,
  ACCESSIBILITY_TESTING: true,
  ANALYTICS: process.env['NODE_ENV'] === 'production',
  DEBUG_MODE: process.env['NODE_ENV'] === 'development',
} as const;
