'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, GlassButton, ThemeProvider } from 'liquidify';
import {
  LazyGlassChart,
  LazyGlassDatePicker,
  LazyGlassCommand,
  preloadGlassChart,
  preloadGlassDatePicker,
  preloadGlassCommand,
} from './ui';
import { lazyLoadUtils } from '@/lib/performance-utils';
import PerformanceMonitor from './PerformanceMonitor';

export const LazyLoadingDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Lazy load hook example
  const { isVisible, elementRef } = lazyLoadUtils.useLazyLoad(0.1);

  const handlePreload = () => {
    // Preload all heavy components
    preloadGlassChart();
    preloadGlassDatePicker();
    preloadGlassCommand();
    setIsPreloaded(true);
  };

  const chartData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 200 },
    { label: 'Apr', value: 180 },
    { label: 'May', value: 220 },
  ];

  return (
    <ThemeProvider>
      <div className='lazy-loading-demo space-y-8'>
        <GlassCard className='p-6'>
          <h2 className='text-2xl font-bold text-white mb-4'>
            Lazy Loading Performance Demo
          </h2>
          <p className='text-gray-400 mb-6'>
            This demo showcases how lazy loading improves performance by only
            loading components when they&apos;re needed.
          </p>

          <div className='flex flex-wrap gap-4 mb-6'>
            <GlassButton
              variant='primary'
              onClick={() => setActiveDemo('chart')}
              onMouseEnter={() => preloadGlassChart()}
            >
              Load Chart (Lazy)
            </GlassButton>

            <GlassButton
              variant='primary'
              onClick={() => setActiveDemo('datepicker')}
              onMouseEnter={() => preloadGlassDatePicker()}
            >
              Load Date Picker (Lazy)
            </GlassButton>

            <GlassButton
              variant='primary'
              onClick={() => setActiveDemo('command')}
              onMouseEnter={() => preloadGlassCommand()}
            >
              Load Command (Lazy)
            </GlassButton>

            <GlassButton
              variant='ghost'
              onClick={handlePreload}
              disabled={isPreloaded}
            >
              {isPreloaded ? 'Preloaded ✓' : 'Preload All'}
            </GlassButton>
          </div>

          <AnimatePresence mode='wait'>
            {activeDemo === 'chart' && (
              <motion.div
                key='chart'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className='p-6'>
                  <h3 className='text-lg font-semibold mb-4'>
                    Lazy Loaded Chart
                  </h3>
                  <LazyGlassChart
                    data={chartData}
                    type='bar'
                    title='Sample Chart'
                    width={500}
                    height={300}
                    animated
                  />
                </GlassCard>
              </motion.div>
            )}

            {activeDemo === 'datepicker' && (
              <motion.div
                key='datepicker'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className='p-6'>
                  <h3 className='text-lg font-semibold mb-4'>
                    Lazy Loaded Date Picker
                  </h3>
                  <LazyGlassDatePicker
                    placeholder='Select a date'
                    onChange={(value: string) =>
                      console.log('Selected date:', value)
                    }
                  />
                </GlassCard>
              </motion.div>
            )}

            {activeDemo === 'command' && (
              <motion.div
                key='command'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className='p-6'>
                  <h3 className='text-lg font-semibold mb-4'>
                    Lazy Loaded Command
                  </h3>
                  <LazyGlassCommand
                    command='npm install liquidify'
                    execute={() => console.info('Command executed!')}
                  />
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>

          {!activeDemo && (
            <div className='text-center py-12 text-gray-400'>
              Click a button above to load a component lazily
            </div>
          )}
        </GlassCard>

        {/* Intersection Observer Demo */}
        <GlassCard className='p-6'>
          <h3 className='text-lg font-semibold mb-4'>
            Intersection Observer Demo
          </h3>
          <p className='text-gray-400 mb-6'>
            This component will be loaded when it becomes visible in the
            viewport.
          </p>

          <div className='h-96 overflow-y-auto border border-gray-300 rounded p-4'>
            <div className='h-96 flex items-center justify-center text-gray-400'>
              Scroll down to see the lazy-loaded component...
            </div>

            <div
              ref={elementRef}
              className='h-96 flex items-center justify-center'
            >
              {isVisible ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <LazyGlassChart
                    data={chartData}
                    type='line'
                    title='Intersection Observer Chart'
                    width={400}
                    height={250}
                    animated
                  />
                </motion.div>
              ) : (
                <div className='text-gray-400'>
                  Component will load when visible...
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Performance Monitoring */}
        <PerformanceMonitor
          components={[
            'LazyGlassChart',
            'LazyGlassDatePicker',
            'LazyGlassCommand',
          ]}
          showBenchmarks={true}
          showBundleSize={true}
        />

        {/* Benefits Section */}
        <GlassCard className='p-6'>
          <h3 className='text-lg font-semibold mb-4'>
            Benefits of Lazy Loading
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h4 className='font-medium text-green-400 mb-2'>
                ✓ Performance Benefits
              </h4>
              <ul className='text-sm text-gray-300 space-y-1'>
                <li>• Faster initial page load</li>
                <li>• Reduced bundle size</li>
                <li>• Better Core Web Vitals</li>
                <li>• Lower memory usage</li>
              </ul>
            </div>

            <div>
              <h4 className='font-medium text-blue-400 mb-2'>
                🎯 Best Practices
              </h4>
              <ul className='text-sm text-gray-300 space-y-1'>
                <li>• Preload on hover/focus</li>
                <li>• Use intersection observer</li>
                <li>• Provide loading states</li>
                <li>• Monitor performance metrics</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>
    </ThemeProvider>
  );
};

export default LazyLoadingDemo;
