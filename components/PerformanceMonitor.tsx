'use client';

import React, { useEffect, useState } from 'react';
import { usePerformanceMonitor, bundleUtils } from '@/lib/performance-utils';
import { GlassCard, GlassButton, GlassSwitch } from 'liquidify';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMonitorProps {
  componentName?: string;
  components?: string[];
  showBenchmarks?: boolean;
  showBundleSize?: boolean;
  className?: string;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  componentName,
  components = [],
  showBenchmarks = true,
  showBundleSize = true,
  className = '',
}) => {
  const {
    metrics,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    measureGlassEffect,
    getBenchmarkResults,
  } = usePerformanceMonitor();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Auto-start monitoring when component mounts
    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, []);

  const benchmarkResults = getBenchmarkResults();
  const bundleSize = componentName
    ? bundleUtils.estimateComponentSize(componentName)
    : bundleUtils.getTotalBundleSize(components);

  const bundleRecommendations = bundleUtils.getBundleRecommendations(
    componentName ? [componentName] : components
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return '✓';
      case 'warning':
        return '⚠';
      case 'poor':
        return '✗';
      default:
        return '?';
    }
  };

  return (
    <div className={`performance-monitor ${className}`}>
      <GlassCard className='p-4 mb-4'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
            <span className='text-blue-400'>⚡</span>
            Performance Monitor
            {componentName && (
              <span className='text-sm text-gray-400'>({componentName})</span>
            )}
          </h3>

          <div className='flex items-center gap-2'>
            <GlassSwitch
              checked={isMonitoring}
              onChange={isMonitoring ? stopMonitoring : startMonitoring}
              label='Monitor'
              size={20}
            />
            <GlassButton
              variant='ghost'
              size='sm'
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </GlassButton>
          </div>
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-white'>
              {metrics?.frameRate || 0}
            </div>
            <div className='text-sm text-gray-400'>FPS</div>
          </div>

          <div className='text-center'>
            <div className='text-2xl font-bold text-white'>
              {metrics?.renderTime.toFixed(1) || 0}ms
            </div>
            <div className='text-sm text-gray-400'>Render Time</div>
          </div>

          <div className='text-center'>
            <div className='text-2xl font-bold text-white'>
              {metrics?.memoryUsage.toFixed(1) || 0}MB
            </div>
            <div className='text-sm text-gray-400'>Memory</div>
          </div>

          {showBundleSize && (
            <div className='text-center'>
              <div className='text-2xl font-bold text-white'>
                {bundleSize.toFixed(1)}KB
              </div>
              <div className='text-sm text-gray-400'>Bundle Size</div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Benchmark Results */}
              {showBenchmarks && benchmarkResults.length > 0 && (
                <div className='mb-6'>
                  <h4 className='text-md font-semibold text-white mb-3'>
                    Performance Benchmarks
                  </h4>
                  <div className='space-y-2'>
                    {benchmarkResults.map((result, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-3 bg-white/10 rounded-lg'
                      >
                        <div className='flex items-center gap-3'>
                          <span
                            className={`text-lg ${getStatusColor(result.status)}`}
                          >
                            {getStatusIcon(result.status)}
                          </span>
                          <span className='text-white'>{result.name}</span>
                        </div>
                        <div className='text-right'>
                          <div className='text-white font-semibold'>
                            {result.value.toFixed(1)} {result.unit}
                          </div>
                          <div className='text-sm text-gray-400'>
                            Target: {result.benchmark} {result.unit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bundle Information */}
              {showBundleSize && (
                <div className='mb-6'>
                  <h4 className='text-md font-semibold text-white mb-3'>
                    Bundle Information
                  </h4>

                  {components.length > 0 && (
                    <div className='mb-4'>
                      <h5 className='text-sm font-medium text-gray-300 mb-2'>
                        Component Sizes
                      </h5>
                      <div className='space-y-1'>
                        {components.map((component, index) => (
                          <div
                            key={index}
                            className='flex justify-between text-sm'
                          >
                            <span className='text-gray-400'>{component}</span>
                            <span className='text-white'>
                              {bundleUtils
                                .estimateComponentSize(component)
                                .toFixed(1)}
                              KB
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bundleRecommendations.length > 0 && (
                    <div>
                      <h5 className='text-sm font-medium text-gray-300 mb-2'>
                        Recommendations
                      </h5>
                      <div className='space-y-1'>
                        {bundleRecommendations.map((recommendation, index) => (
                          <div key={index} className='text-sm text-yellow-400'>
                            • {recommendation}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Glass Effect Performance */}
              {metrics?.glassEffectPerformance && (
                <div className='mb-6'>
                  <h4 className='text-md font-semibold text-white mb-3'>
                    Glass Effect Performance
                  </h4>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='bg-white/10 p-3 rounded-lg'>
                      <div className='text-sm text-gray-400'>
                        Backdrop Filter
                      </div>
                      <div className='text-white font-semibold'>
                        {metrics.glassEffectPerformance.backdropFilterTime.toFixed(
                          1
                        )}
                        ms
                      </div>
                    </div>
                    <div className='bg-white/10 p-3 rounded-lg'>
                      <div className='text-sm text-gray-400'>Complexity</div>
                      <div className='text-white font-semibold capitalize'>
                        {metrics.glassEffectPerformance.renderComplexity}
                      </div>
                    </div>
                    <div className='bg-white/10 p-3 rounded-lg'>
                      <div className='text-sm text-gray-400'>
                        GPU Acceleration
                      </div>
                      <div className='text-white font-semibold'>
                        {metrics.glassEffectPerformance.gpuAcceleration
                          ? 'Enabled'
                          : 'Disabled'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className='flex flex-wrap gap-2'>
                <GlassButton
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide' : 'Show'} Details
                </GlassButton>

                <GlassButton
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    measureGlassEffect('manual-test', () => {
                      console.log('Manual glass effect test');
                    });
                  }}
                >
                  Test Glass Effect
                </GlassButton>
              </div>

              {/* Detailed Metrics */}
              <AnimatePresence>
                {showDetails && metrics && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='mt-4 p-4 bg-black/20 rounded-lg'
                  >
                    <h5 className='text-sm font-medium text-gray-300 mb-2'>
                      Raw Metrics
                    </h5>
                    <pre className='text-xs text-gray-400 overflow-x-auto'>
                      {JSON.stringify(metrics, null, 2)}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
};

export default PerformanceMonitor;
