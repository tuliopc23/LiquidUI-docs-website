import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Web Vitals thresholds
const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function WebVitalsMonitor() {
  useEffect(() => {
    // Only run in production and when supported
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Dynamically import web-vitals only in production
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToAnalytics = (metric: WebVitalsMetric) => {
        // Log to console in development, send to analytics in production
        // console.log('📊 Web Vitals:', {
        //   name: metric.name,
        //   value: Math.round(metric.value),
        //   rating: metric.rating,
        // });

        // You can integrate with analytics services here:
        // gtag('event', metric.name, {
        //   value: Math.round(metric.value),
        //   custom_rating: metric.rating,
        // });
      };

      // Monitor Core Web Vitals
      onCLS((metric) => sendToAnalytics({
        name: 'CLS',
        value: metric.value,
        rating: getRating('CLS', metric.value)
      }));

      onINP((metric) => sendToAnalytics({
        name: 'INP', 
        value: metric.value,
        rating: getRating('FID', metric.value) // Use FID thresholds for INP
      }));

      onFCP((metric) => sendToAnalytics({
        name: 'FCP',
        value: metric.value, 
        rating: getRating('FCP', metric.value)
      }));

      onLCP((metric) => sendToAnalytics({
        name: 'LCP',
        value: metric.value,
        rating: getRating('LCP', metric.value) 
      }));

      onTTFB((metric) => sendToAnalytics({
        name: 'TTFB',
        value: metric.value,
        rating: getRating('TTFB', metric.value)
      }));
    }).catch(() => {
      // Silently fail if web-vitals is not available
    });
  }, []);

  return null; // This component doesn't render anything
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Monitor memory usage (if available)
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        const memoryUsage = {
          used: Math.round(memory.usedJSHeapSize / 1048576), // MB
          total: Math.round(memory.totalJSHeapSize / 1048576), // MB
          limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
        };

        // Log if memory usage is high
        if (memoryUsage.used / memoryUsage.limit > 0.8) {
          // console.warn('🚨 High memory usage detected:', memoryUsage);
        }
      }
    };

    // Monitor performance every 30 seconds
    const interval = setInterval(monitorMemory, 30000);
    
    // Initial check
    monitorMemory();

    return () => clearInterval(interval);
  }, []);
}

// Bundle size analyzer (development only)
export function BundleAnalyzer() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    // Analyze bundle composition
    const modules = Object.keys(window).filter(key => 
      key.includes('webpack') || key.includes('__next')
    );

    if (modules.length > 0) {
      // console.log('📦 Bundle Analysis:', {
      //   webpackModules: modules.length,
      //   timestamp: new Date().toISOString(),
      // });
    }
  }, []);

  return null;
}