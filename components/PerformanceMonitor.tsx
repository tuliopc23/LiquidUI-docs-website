import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface LayoutShiftEntry extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceMonitorProps {
  showInDevelopment?: boolean;
  showInProduction?: boolean;
}

export function PerformanceMonitor({
  showInDevelopment = true,
  showInProduction = false
}: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const shouldShow = (isDevelopment && showInDevelopment) || (!isDevelopment && showInProduction);

    if (!shouldShow) return;

    // Web Vitals measurement
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          }
        }

        if (entry.entryType === 'largest-contentful-paint') {
          setMetrics(prev => ({ ...prev, lcp: entry.startTime }));
        }

        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as PerformanceEventTiming;
          setMetrics(prev => ({ ...prev, fid: firstInputEntry.processingStart - entry.startTime }));
        }

        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          if (!layoutShiftEntry.hadRecentInput) {
            setMetrics(prev => ({
              ...prev,
              cls: (prev.cls || 0) + layoutShiftEntry.value
            }));
          }
        }
      });
    });

    // Observe different performance entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch {
      console.warn('Performance observer not fully supported');
    }

    // Navigation timing for TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics(prev => ({
        ...prev,
        ttfb: navigationEntry.responseStart - navigationEntry.requestStart
      }));
    }

    return () => observer.disconnect();
  }, [showInDevelopment, showInProduction]);

  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[metric as keyof typeof thresholds];
    if (!threshold) return 'text-gray-500';

    if (value <= threshold.good) return 'text-green-500';
    if (value <= threshold.poor) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatValue = (metric: string, value: number) => {
    if (metric === 'cls') return value.toFixed(3);
    return Math.round(value) + 'ms';
  };

  if (Object.keys(metrics).length === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        className="mb-2 px-3 py-1 bg-black/80 text-white text-xs rounded-full backdrop-blur-lg border border-white/20"
        onClick={() => setIsVisible(!isVisible)}
      >
        ⚡ Performance
      </button>

      {isVisible && (
        <div className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-lg p-3 text-white text-xs min-w-[200px]">
          <div className="font-semibold mb-2 text-blue-400">Web Vitals</div>
          <div className="space-y-1">
            {metrics.fcp && (
              <div className="flex justify-between">
                <span>FCP:</span>
                <span className={getScoreColor('fcp', metrics.fcp)}>
                  {formatValue('fcp', metrics.fcp)}
                </span>
              </div>
            )}
            {metrics.lcp && (
              <div className="flex justify-between">
                <span>LCP:</span>
                <span className={getScoreColor('lcp', metrics.lcp)}>
                  {formatValue('lcp', metrics.lcp)}
                </span>
              </div>
            )}
            {metrics.fid && (
              <div className="flex justify-between">
                <span>FID:</span>
                <span className={getScoreColor('fid', metrics.fid)}>
                  {formatValue('fid', metrics.fid)}
                </span>
              </div>
            )}
            {metrics.cls !== undefined && (
              <div className="flex justify-between">
                <span>CLS:</span>
                <span className={getScoreColor('cls', metrics.cls)}>
                  {formatValue('cls', metrics.cls)}
                </span>
              </div>
            )}
            {metrics.ttfb && (
              <div className="flex justify-between">
                <span>TTFB:</span>
                <span className={getScoreColor('ttfb', metrics.ttfb)}>
                  {formatValue('ttfb', metrics.ttfb)}
                </span>
              </div>
            )}
          </div>
          <div className="mt-2 pt-2 border-t border-white/20 text-gray-400">
            <div className="text-[10px]">
              🟢 Good | 🟡 Needs Improvement | 🔴 Poor
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add to development builds for performance monitoring
export function DevPerformanceMonitor() {
  if (process.env.NODE_ENV !== 'development') return null;
  return <PerformanceMonitor showInDevelopment={true} />;
}