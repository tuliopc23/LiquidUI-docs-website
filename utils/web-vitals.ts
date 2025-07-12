/**
 * Web Vitals integration for production performance monitoring
 */

import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';
import { analytics } from './oss-analytics';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  INP: { good: 200, poor: 500 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
} as const;

function getRating(
  name: string,
  value: number
): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function reportWebVitals() {
  // Only run in production and if analytics is enabled
  if (process.env['NODE_ENV'] !== 'production') return;
  if (process.env['NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING'] !== 'true')
    return;

  const reportMetric = (metric: Metric) => {
    const webVitalMetric: WebVitalMetric = {
      name: metric.name,
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      delta: metric.delta,
      id: metric.id,
    };

    // Send to analytics
    analytics.reportWebVitals(webVitalMetric);

    // Log to console in development for debugging
    if (process.env['NODE_ENV'] === 'development') {
      console.log(
        `[Web Vitals] ${metric.name}: ${metric.value} (${webVitalMetric.rating})`
      );
    }

    // Send to custom endpoint if configured
    const endpoint = process.env['NEXT_PUBLIC_WEB_VITALS_ENDPOINT'];
    if (endpoint) {
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...webVitalMetric,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
          libraryVersion: process.env['NEXT_PUBLIC_LIQUIDIFY_VERSION'],
        }),
      }).catch(error => {
        console.warn('Failed to send Web Vitals to endpoint:', error);
      });
    }

    // Alert if performance is poor
    if (webVitalMetric.rating === 'poor') {
      console.warn(`Poor ${metric.name} detected: ${metric.value}`);
    }
  };

  // Collect all Core Web Vitals
  onCLS(reportMetric);
  onINP(reportMetric);
  onFCP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);
}

// Custom performance monitoring for React components
export function measureComponentPerformance(componentName: string) {
  if (typeof window === 'undefined') return () => {};

  const startTime = performance.now();

  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;

    // Only report if component takes longer than 16ms (1 frame at 60fps)
    if (duration > 16) {
      analytics.trackComponentUsage(componentName, 'performance_slow');

      if (process.env['NODE_ENV'] === 'development') {
        console.warn(
          `Slow component render: ${componentName} took ${duration.toFixed(2)}ms`
        );
      }
    }
  };
}

// Network performance monitoring
export function monitorNetworkPerformance() {
  if (typeof window === 'undefined') return;
  if (!('connection' in navigator)) return;

  const connection = (
    navigator as Navigator & { 
      connection?: { 
        effectiveType?: string;
        downlink?: number;
        rtt?: number;
        saveData?: boolean;
      } 
    }
  ).connection;
  if (!connection) return;

  const networkInfo = {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };

  // Use console.log for now as analytics.track is private
  console.log('Network performance:', networkInfo);

  // Warn about slow connections
  if (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g'
  ) {
    console.info('Slow network detected, optimizing experience...');
  }
}
