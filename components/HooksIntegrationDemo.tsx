import React, { useState, useEffect } from 'react';
import { useLiquidGlass, usePerformanceMonitor } from 'liquidify';
import { GlassButton, GlassCard, GlassSelect } from 'liquidify';

interface HooksIntegrationDemoProps {
  className?: string;
}

export default function HooksIntegrationDemo({
  className = '',
}: HooksIntegrationDemoProps) {
  const [contentType, setContentType] = useState<
    'text' | 'image' | 'video' | 'navigation'
  >('text');
  const [backgroundType, setBackgroundType] = useState<
    'solid' | 'gradient' | 'image' | 'dynamic'
  >('gradient');
  const [priority, setPriority] = useState<
    'readability' | 'aesthetics' | 'contrast' | 'blur'
  >('aesthetics');
  const [isInteracting, setIsInteracting] = useState(false);
  const [activeDemo, setActiveDemo] = useState<
    'performance' | 'content-aware' | 'manual' | 'integrated'
  >('integrated');

  // Performance monitoring
  const { startMonitoring, stopMonitoring } = usePerformanceMonitor({
    componentName: 'HooksIntegrationDemo',
  });

  // Manual glass configuration
  const glassConfig = useLiquidGlass();

  // Start monitoring on mount
  useEffect(() => {
    startMonitoring();
    return () => {
      stopMonitoring();
    };
  }, [startMonitoring, stopMonitoring]);

  // Record interaction metrics
  const handleInteraction = (type: string) => {
    setIsInteracting(true);
    setTimeout(() => {
      setIsInteracting(false);
    }, 1000);
  };

  const selectOptions = [
    { value: 'text', label: 'Text' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
    { value: 'navigation', label: 'Navigation' },
  ];

  return (
    <div className={`w-full max-w-6xl mx-auto p-6 space-y-8 ${className}`}>
      {/* Header */}
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent'>
          Hooks Integration Demo
        </h1>
        <p className='text-lg opacity-80'>
          Interactive demonstration of Liquidify hooks working together
        </p>
      </div>

      {/* Performance Dashboard */}
      <GlassCard className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>Performance Dashboard</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400'>60.0</div>
            <div className='text-sm opacity-70'>FPS</div>
            <div className='text-xs opacity-50'>Target: 60</div>
          </div>

          <div className='text-center'>
            <div className='text-2xl font-bold text-blue-400'>45.2</div>
            <div className='text-sm opacity-70'>Memory (MB)</div>
            <div className='text-xs opacity-50'>Limit: 100MB</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-purple-400'>12.5</div>
            <div className='text-sm opacity-70'>Render Time (ms)</div>
            <div className='text-xs opacity-50'>Target: &lt; 16ms</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-400'>35</div>
            <div className='text-sm opacity-70'>CPU Usage (%)</div>
            <div className='text-xs opacity-50'>Limit: 70%</div>
          </div>
        </div>
      </GlassCard>

      {/* Content-Aware Configuration */}
      <GlassCard className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>
          Content-Aware Configuration
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>
              Content Type
            </label>
            <GlassSelect
              options={selectOptions}
              value={contentType}
              onChange={value => setContentType(value as typeof contentType)}
              placeholder='Select content type'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>
              Background Type
            </label>
            <GlassSelect
              options={[
                { value: 'solid', label: 'Solid' },
                { value: 'gradient', label: 'Gradient' },
                { value: 'image', label: 'Image' },
                { value: 'dynamic', label: 'Dynamic' },
              ]}
              value={backgroundType}
              onChange={value =>
                setBackgroundType(value as typeof backgroundType)
              }
              placeholder='Select background type'
            />
          </div>
          <div>
            <label className='block text-sm font-medium mb-2'>Priority</label>
            <GlassSelect
              options={[
                { value: 'readability', label: 'Readability' },
                { value: 'aesthetics', label: 'Aesthetics' },
                { value: 'contrast', label: 'Contrast' },
                { value: 'blur', label: 'Blur' },
              ]}
              value={priority}
              onChange={value => setPriority(value as typeof priority)}
              placeholder='Select priority'
            />
          </div>
        </div>
      </GlassCard>

      {/* Interactive Elements */}
      <GlassCard className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>Interactive Elements</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mb-3'>Glass Effects</h3>
            <div className='space-y-3'>
              <GlassButton
                variant='primary'
                onClick={() => handleInteraction('primary')}
                className='w-full'
              >
                Primary Glass Button
              </GlassButton>
              <GlassButton
                variant='secondary'
                onClick={() => handleInteraction('secondary')}
                className='w-full'
              >
                Secondary Glass Button
              </GlassButton>
              <GlassButton
                variant='ghost'
                onClick={() => handleInteraction('ghost')}
                className='w-full'
              >
                Ghost Glass Button
              </GlassButton>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3'>Performance Metrics</h3>
            <div className='space-y-3'>
              <div className='p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-sm font-medium'>Interaction State</div>
                <div
                  className={`text-lg ${isInteracting ? 'text-green-400' : 'text-gray-400'}`}
                >
                  {isInteracting ? 'Active' : 'Idle'}
                </div>
              </div>
              <div className='p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-sm font-medium'>Glass Quality</div>
                <div className='text-lg text-blue-400'>High</div>
              </div>
              <div className='p-3 bg-gray-800/50 rounded-lg'>
                <div className='text-sm font-medium'>Optimization</div>
                <div className='text-lg text-purple-400'>Enabled</div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Demo Showcase */}
      <GlassCard className='p-6'>
        <h2 className='text-xl font-semibold mb-4'>Integrated Demo</h2>
        <div className='space-y-4'>
          <div className='flex flex-wrap gap-2'>
            {(
              ['performance', 'content-aware', 'manual', 'integrated'] as const
            ).map(demo => (
              <GlassButton
                key={demo}
                variant={activeDemo === demo ? 'primary' : 'ghost'}
                onClick={() => setActiveDemo(demo)}
                size='sm'
              >
                {demo.charAt(0).toUpperCase() + demo.slice(1).replace('-', ' ')}
              </GlassButton>
            ))}
          </div>

          <div className='p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg'>
            <div className='text-center'>
              <h3 className='text-2xl font-bold mb-2'>
                {activeDemo.charAt(0).toUpperCase() +
                  activeDemo.slice(1).replace('-', ' ')}{' '}
                Demo
              </h3>
              <p className='text-lg opacity-80'>
                This section demonstrates the {activeDemo} configuration
              </p>
              <div className='mt-4 space-y-2'>
                <div className='text-sm opacity-70'>
                  Content Type: {contentType} • Background: {backgroundType} •
                  Priority: {priority}
                </div>
                <div className='text-sm opacity-70'>
                  Glass effects are optimized for current settings
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
