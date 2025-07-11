/**
 * Global type definitions for the Liquidify documentation project
 */

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Demo Component State Types
export interface DemoState {
  inputValue: string;
  checkboxValue: boolean;
  switchValue: boolean;
  loading: boolean;
  progress: number;
  searchValue: string;
  selectValue: string;
  sliderValue: number;
  textareaValue: string;
  activeTab: string;
  isModalOpen: boolean;
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

// Navigation Types
export interface NavigationItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

// Performance Monitoring Types
export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  fid: number;
  ttfb: number;
}

// Accessibility Types
export interface AccessibilityAudit {
  violations: Array<{
    id: string;
    impact: 'minor' | 'moderate' | 'serious' | 'critical';
    description: string;
    nodes: Array<{
      target: string[];
      html: string;
    }>;
  }>;
  passes: Array<{
    id: string;
    description: string;
  }>;
}

// Error Types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

// Component Library Types
export interface ComponentMetadata {
  name: string;
  version: string;
  description: string;
  props: Record<string, unknown>;
  examples: string[];
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type NonEmptyArray<T> = [T, ...T[]];

export type ValueOf<T> = T[keyof T];
