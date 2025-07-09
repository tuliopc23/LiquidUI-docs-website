'use client';

import React from 'react';
import { GlassCard, ThemeProvider } from 'liquidify';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import PerformanceBestPractices from '@/components/PerformanceBestPractices';
import { bundleUtils } from '@/lib/performance-utils';

export default function PerformancePage() {
  const allComponents = [
    'GlassButton',
    'GlassCard',
    'GlassInput',
    'GlassModal',
    'GlassNavbar',
    'GlassChart',
    'GlassDatePicker',
    'GlassFileUpload',
    'GlassCommand',
  ];

  return (
    <ThemeProvider>
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
        <div className='container mx-auto px-4 py-16'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'>
              Performance Optimization
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto'>
              Monitor, optimize, and benchmark your glass effects for peak
              performance across all devices.
            </p>
          </div>

          {/* Live Performance Monitor */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold mb-6 text-center'>
              Live Performance Monitoring
            </h2>
            <PerformanceMonitor
              components={allComponents}
              showBenchmarks={true}
              showBundleSize={true}
            />
          </div>

          {/* Bundle Analysis */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold mb-6 text-center'>
              Bundle Analysis
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {allComponents.map(component => (
                <GlassCard key={component} className='p-6'>
                  <h3 className='text-lg font-semibold mb-2'>{component}</h3>
                  <div className='text-3xl font-bold text-blue-400 mb-2'>
                    {bundleUtils.estimateComponentSize(component).toFixed(1)}KB
                  </div>
                  <p className='text-sm text-gray-400 mb-4'>Estimated size</p>

                  {bundleUtils.getBundleRecommendations([component]).length >
                    0 && (
                    <div className='space-y-1'>
                      {bundleUtils
                        .getBundleRecommendations([component])
                        .map((rec, index) => (
                          <div key={index} className='text-xs text-yellow-400'>
                            • {rec}
                          </div>
                        ))}
                    </div>
                  )}
                </GlassCard>
              ))}
            </div>

            <div className='mt-8 text-center'>
              <GlassCard className='p-6 inline-block'>
                <h3 className='text-lg font-semibold mb-2'>
                  Total Bundle Size
                </h3>
                <div className='text-4xl font-bold text-purple-400 mb-2'>
                  {bundleUtils.getTotalBundleSize(allComponents).toFixed(1)}KB
                </div>
                <p className='text-sm text-gray-400'>All components combined</p>
              </GlassCard>
            </div>
          </div>

          {/* Performance Best Practices */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold mb-6 text-center'>
              Best Practices
            </h2>
            <PerformanceBestPractices />
          </div>

          {/* Optimization Tips */}
          <div className='mb-12'>
            <h2 className='text-3xl font-bold mb-6 text-center'>
              Optimization Tips
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <GlassCard className='p-6'>
                <h3 className='text-xl font-semibold mb-4 text-blue-400'>
                  📊 Monitoring
                </h3>
                <ul className='space-y-2 text-sm'>
                  <li>
                    • Use the Performance Monitor to track real-time metrics
                  </li>
                  <li>• Monitor frame rates to ensure smooth animations</li>
                  <li>• Watch memory usage to prevent leaks</li>
                  <li>• Benchmark glass effects regularly</li>
                </ul>
              </GlassCard>

              <GlassCard className='p-6'>
                <h3 className='text-xl font-semibold mb-4 text-green-400'>
                  🚀 Optimization
                </h3>
                <ul className='space-y-2 text-sm'>
                  <li>• Enable hardware acceleration for glass effects</li>
                  <li>• Use appropriate backdrop-filter values</li>
                  <li>• Implement lazy loading for heavy components</li>
                  <li>• Throttle scroll-based animations</li>
                </ul>
              </GlassCard>

              <GlassCard className='p-6'>
                <h3 className='text-xl font-semibold mb-4 text-purple-400'>
                  📦 Bundle Size
                </h3>
                <ul className='space-y-2 text-sm'>
                  <li>• Monitor component sizes regularly</li>
                  <li>• Use code splitting for large components</li>
                  <li>• Implement tree shaking where possible</li>
                  <li>• Consider lazy loading for charts and complex UI</li>
                </ul>
              </GlassCard>

              <GlassCard className='p-6'>
                <h3 className='text-xl font-semibold mb-4 text-orange-400'>
                  ♿ Accessibility
                </h3>
                <ul className='space-y-2 text-sm'>
                  <li>• Respect user motion preferences</li>
                  <li>• Provide fallbacks for unsupported features</li>
                  <li>• Ensure proper contrast ratios</li>
                  <li>• Test with screen readers</li>
                </ul>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
