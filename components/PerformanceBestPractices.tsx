'use client';

import React, { useState } from 'react';
import { GlassCard, GlassButton, GlassTabs } from 'liquidify';
import { motion, AnimatePresence } from 'framer-motion';

export const PerformanceBestPractices: React.FC = () => {
  const [activeTab, setActiveTab] = useState('optimization');

  const bestPractices = {
    optimization: [
      {
        title: 'Use Hardware Acceleration',
        description: 'Enable GPU acceleration for glass effects',
        code: `// Enable hardware acceleration for glass elements
element.style.transform = 'translateZ(0)';
element.style.willChange = 'transform, backdrop-filter';`,
        priority: 'high',
      },
      {
        title: 'Optimize Backdrop Filter',
        description: 'Use appropriate blur values based on device capabilities',
        code: `// Use performance-optimized backdrop filter
const optimizedFilter = performanceUtils.getOptimizedBackdropFilter('medium');
element.style.backdropFilter = optimizedFilter;`,
        priority: 'high',
      },
      {
        title: 'Lazy Load Heavy Components',
        description: 'Load complex components only when needed',
        code: `// Lazy load heavy components
const LazyGlassChart = lazyLoadUtils.createLazyComponent(
  () => import('./GlassChart')
);`,
        priority: 'medium',
      },
      {
        title: 'Use Containment',
        description: 'Isolate rendering contexts for better performance',
        code: `// Add containment for better performance
element.style.contain = 'layout style paint';
element.style.isolation = 'isolate';`,
        priority: 'medium',
      },
      {
        title: 'Throttle Scroll Events',
        description: 'Limit the frequency of scroll-based animations',
        code: `// Throttle scroll events for better performance
const throttledScroll = performanceUtils.throttle(handleScroll, 16);
window.addEventListener('scroll', throttledScroll, { passive: true });`,
        priority: 'medium',
      },
    ],
    monitoring: [
      {
        title: 'Monitor Performance Metrics',
        description: 'Track render time, frame rate, and memory usage',
        code: `// Monitor performance with usePerformanceMonitor
const { metrics, startMonitoring } = usePerformanceMonitor();
useEffect(() => {
  startMonitoring();
}, []);`,
        priority: 'high',
      },
      {
        title: 'Measure Glass Effect Performance',
        description: 'Benchmark specific glass effects',
        code: `// Measure glass effect performance
measureGlassEffect('blur-animation', () => {
  // Glass effect code here
});`,
        priority: 'medium',
      },
      {
        title: 'Check Device Capabilities',
        description: 'Adapt effects based on device performance',
        code: `// Check device capabilities
const capabilities = performanceUtils.getDeviceCapabilities();
if (capabilities.isLowEndDevice) {
  // Use simplified effects
}`,
        priority: 'high',
      },
    ],
    bundleSize: [
      {
        title: 'Estimate Component Sizes',
        description: 'Monitor bundle sizes for components',
        code: `// Estimate component bundle size
const size = bundleUtils.estimateComponentSize('GlassChart');
console.log(\`Component size: \${size}KB\`);`,
        priority: 'medium',
      },
      {
        title: 'Get Bundle Recommendations',
        description: 'Receive optimization suggestions',
        code: `// Get bundle optimization recommendations
const recommendations = bundleUtils.getBundleRecommendations([
  'GlassChart', 'GlassDatePicker'
]);`,
        priority: 'medium',
      },
      {
        title: 'Implement Code Splitting',
        description: 'Split large components into separate bundles',
        code: `// Implement code splitting
const GlassChart = dynamic(() => import('./GlassChart'), {
  loading: () => <div>Loading chart...</div>
});`,
        priority: 'low',
      },
    ],
    accessibility: [
      {
        title: 'Respect User Preferences',
        description: 'Check for reduced motion and transparency preferences',
        code: `// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;`,
        priority: 'high',
      },
      {
        title: 'Provide Fallbacks',
        description: 'Ensure components work without backdrop-filter support',
        code: `// Provide fallbacks for unsupported features
if (!performanceUtils.supportsBackdropFilter()) {
  // Use alternative styling
  element.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
}`,
        priority: 'high',
      },
      {
        title: 'Optimize for Screen Readers',
        description: "Ensure glass effects don't interfere with accessibility",
        code: `// Add proper ARIA labels and roles
<div 
  role="button" 
  aria-label="Glass button"
  className="glass-effect"
>
  Content
</div>`,
        priority: 'medium',
      },
    ],
  };

  const tabs = [
    { id: 'optimization', label: 'Optimization', content: null },
    { id: 'monitoring', label: 'Monitoring', content: null },
    { id: 'bundleSize', label: 'Bundle Size', content: null },
    { id: 'accessibility', label: 'Accessibility', content: null },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return '🔴';
      case 'medium':
        return '🟡';
      case 'low':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <GlassCard className='p-6'>
      <div className='mb-6'>
        <h2 className='text-2xl font-bold text-white mb-2'>
          Performance Best Practices
        </h2>
        <p className='text-gray-400'>
          Guidelines for optimizing glass effects and monitoring performance
        </p>
      </div>

      <GlassTabs tabs={tabs} defaultTab={activeTab} className='mb-8' />

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className='space-y-6'>
            {bestPractices[activeTab as keyof typeof bestPractices]?.map(
              (practice, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className='p-4 bg-white/5'>
                    <div className='flex items-start gap-3 mb-3'>
                      <span className='text-lg'>
                        {getPriorityIcon(practice.priority)}
                      </span>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <h3 className='text-lg font-semibold text-white'>
                            {practice.title}
                          </h3>
                          <span
                            className={`text-xs px-2 py-1 rounded-full bg-black/20 ${getPriorityColor(practice.priority)}`}
                          >
                            {practice.priority} priority
                          </span>
                        </div>
                        <p className='text-gray-400 text-sm mb-4'>
                          {practice.description}
                        </p>
                      </div>
                    </div>

                    <div className='relative'>
                      <div className='absolute top-2 right-2'>
                        <GlassButton
                          variant='ghost'
                          size='sm'
                          onClick={() =>
                            navigator.clipboard.writeText(practice.code)
                          }
                          className='text-xs'
                        >
                          Copy
                        </GlassButton>
                      </div>
                      <pre className='bg-black/40 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm'>
                        <code>{practice.code}</code>
                      </pre>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className='mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20'>
        <h3 className='text-lg font-semibold text-blue-400 mb-2'>
          💡 Quick Tips
        </h3>
        <ul className='space-y-2 text-sm text-gray-300'>
          <li>• Test on various devices to ensure consistent performance</li>
          <li>• Use the Performance Monitor to identify bottlenecks</li>
          <li>
            • Consider lazy loading for components with heavy glass effects
          </li>
          <li>
            • Respect user preferences for reduced motion and transparency
          </li>
          <li>• Monitor bundle sizes to avoid performance degradation</li>
        </ul>
      </div>
    </GlassCard>
  );
};

export default PerformanceBestPractices;
