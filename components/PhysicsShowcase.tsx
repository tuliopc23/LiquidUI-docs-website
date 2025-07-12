'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard, GlassButton, GlassSlider, GlassSwitch } from 'liquidify';
import { MockThemeProvider } from '@/components/MockThemeProvider';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  magneticHover,
  springAnimations,
  hapticFeedback,
  scrollAnimations,
} from '@/lib/enhanced-animations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Magnetic hover demo component
const MagneticHoverDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [magneticStrength, setMagneticStrength] = useState(0.3);
  const [enableMagnetic, setEnableMagnetic] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !enableMagnetic) {
      return;
    }

    const elements = containerRef.current.querySelectorAll('.magnetic-element');
    const cleanupFunctions: (() => void)[] = [];

    elements.forEach(element => {
      const cleanup = magneticHover.magnetic(element, magneticStrength);
      if (cleanup) {
        cleanupFunctions.push(cleanup);
      }
    });

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }, [magneticStrength, enableMagnetic]);

  return (
    <div ref={containerRef} className='space-y-6'>
      <div className='controls-panel p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
        <h4 className='text-lg font-semibold mb-4'>Magnetic Hover Controls</h4>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium mb-2'>
              Magnetic Strength: {magneticStrength.toFixed(1)}
            </label>
            <GlassSlider
              value={magneticStrength}
              onChange={value => setMagneticStrength(value)}
              min={0.1}
              max={1.0}
              step={0.1}
              className='w-full'
            />
          </div>

          <div>
            <GlassSwitch
              checked={enableMagnetic}
              onChange={setEnableMagnetic}
              label='Enable Magnetic Effect'
            />
          </div>
        </div>
      </div>

      <div className='demo-area grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <motion.div whileHover={{ scale: 1.02 }} className='magnetic-element'>
          <GlassCard className='p-6 h-32 flex items-center justify-center cursor-pointer'>
            <div className='text-center'>
              <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2' />
              <p className='text-sm font-medium'>Magnetic Button</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className='magnetic-element'>
          <GlassCard className='p-6 h-32 flex items-center justify-center cursor-pointer'>
            <div className='text-center'>
              <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-2' />
              <p className='text-sm font-medium'>Magnetic Card</p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className='magnetic-element'>
          <GlassCard className='p-6 h-32 flex items-center justify-center cursor-pointer'>
            <div className='text-center'>
              <div className='w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2' />
              <p className='text-sm font-medium'>Magnetic Element</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <div className='physics-info p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg'>
        <h5 className='font-semibold mb-2'>Physics Principles</h5>
        <ul className='text-sm space-y-1'>
          <li>• Cursor position tracking with getBoundingClientRect()</li>
          <li>• Magnetic force calculation based on distance</li>
          <li>• GSAP transforms for smooth movement</li>
          <li>• Spring easing for natural feel</li>
        </ul>
      </div>
    </div>
  );
};

// Spring animations demo
const SpringAnimationsDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerSpringAnimation = (type: 'entrance' | 'exit' | 'bounce') => {
    if (!containerRef.current) {
      return;
    }

    const elements = containerRef.current.querySelectorAll('.spring-element');

    elements.forEach((element, index) => {
      switch (type) {
        case 'entrance':
          springAnimations.entrance(element, { delay: index * 0.1 });
          break;
        case 'exit':
          springAnimations.exit(element, { delay: index * 0.1 }).then(() => {
            setTimeout(() => {
              springAnimations.entrance(element, { delay: index * 0.1 });
            }, 500);
          });
          break;
        case 'bounce':
          springAnimations.bounce(element);
          break;
      }
    });
  };

  return (
    <div ref={containerRef} className='space-y-6'>
      <div className='controls-panel p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
        <h4 className='text-lg font-semibold mb-4'>
          Spring Animation Controls
        </h4>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <GlassButton
            variant='primary'
            onClick={() => triggerSpringAnimation('entrance')}
            className='w-full'
          >
            Trigger Entrance
          </GlassButton>

          <GlassButton
            variant='secondary'
            onClick={() => triggerSpringAnimation('exit')}
            className='w-full'
          >
            Trigger Exit
          </GlassButton>

          <GlassButton
            variant='ghost'
            onClick={() => triggerSpringAnimation('bounce')}
            className='w-full'
          >
            Trigger Bounce
          </GlassButton>
        </div>
      </div>

      <div className='demo-area grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className='spring-element'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className='p-4 h-24 flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow'>
              <div className='text-center'>
                <div
                  className={`w-6 h-6 bg-gradient-to-r ${
                    index % 4 === 0
                      ? 'from-blue-500 to-purple-500'
                      : index % 4 === 1
                        ? 'from-green-500 to-blue-500'
                        : index % 4 === 2
                          ? 'from-purple-500 to-pink-500'
                          : 'from-orange-500 to-red-500'
                  } rounded-full mx-auto mb-1`}
                />
                <p className='text-xs font-medium'>Element {index + 1}</p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className='physics-info p-4 bg-green-50 dark:bg-green-900/20 rounded-lg'>
        <h5 className='font-semibold mb-2'>Spring Physics</h5>
        <ul className='text-sm space-y-1'>
          <li>• Elastic easing curves for natural movement</li>
          <li>• Staggered animations for fluid sequences</li>
          <li>• Bounce effects with overshoot</li>
          <li>• Configurable spring tension and friction</li>
        </ul>
      </div>
    </div>
  );
};

// Haptic feedback demo
const HapticFeedbackDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [feedbackEnabled, setFeedbackEnabled] = useState(true);

  const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy') => {
    if (!containerRef.current || !feedbackEnabled) {
      return;
    }

    const targetElement = containerRef.current.querySelector('.haptic-target');
    if (!targetElement) {
      return;
    }

    switch (type) {
      case 'light':
        hapticFeedback.lightTap(targetElement);
        break;
      case 'medium':
        hapticFeedback.mediumImpact(targetElement);
        break;
      case 'heavy':
        hapticFeedback.heavyImpact(targetElement);
        break;
    }
  };

  const triggerRipple = (event: React.MouseEvent) => {
    if (!feedbackEnabled) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    hapticFeedback.ripple(event.currentTarget, x, y);
  };

  return (
    <div ref={containerRef} className='space-y-6'>
      <div className='controls-panel p-4 bg-gray-50 dark:bg-gray-800 rounded-lg'>
        <h4 className='text-lg font-semibold mb-4'>Haptic Feedback Controls</h4>

        <div className='flex items-center gap-4 mb-4'>
          <GlassSwitch
            checked={feedbackEnabled}
            onChange={setFeedbackEnabled}
            label='Enable Haptic Feedback'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <GlassButton
            variant='ghost'
            onClick={() => triggerHapticFeedback('light')}
            className='w-full'
          >
            Light Tap
          </GlassButton>

          <GlassButton
            variant='primary'
            onClick={() => triggerHapticFeedback('medium')}
            className='w-full'
          >
            Medium Impact
          </GlassButton>

          <GlassButton
            variant='secondary'
            onClick={() => triggerHapticFeedback('heavy')}
            className='w-full'
          >
            Heavy Impact
          </GlassButton>
        </div>
      </div>

      <div className='demo-area space-y-4'>
        <div className='haptic-target'>
          <GlassCard className='p-8 text-center cursor-pointer hover:shadow-lg transition-shadow'>
            <h5 className='text-lg font-semibold mb-2'>Haptic Target</h5>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Click the buttons above to see haptic feedback animations on this
              card
            </p>
          </GlassCard>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <GlassCard
            className='p-6 text-center cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden'
            onClick={triggerRipple}
          >
            <h5 className='text-lg font-semibold mb-2'>Ripple Effect</h5>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Click anywhere on this card to create a ripple effect
            </p>
          </GlassCard>

          <GlassCard
            className='p-6 text-center cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden'
            onClick={triggerRipple}
          >
            <h5 className='text-lg font-semibold mb-2'>Interactive Ripple</h5>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Each click creates a unique ripple at the cursor position
            </p>
          </GlassCard>
        </div>
      </div>

      <div className='physics-info p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg'>
        <h5 className='font-semibold mb-2'>Haptic Feedback Simulation</h5>
        <ul className='text-sm space-y-1'>
          <li>• Visual feedback simulating device haptics</li>
          <li>• Scale and position transforms for impact</li>
          <li>• Ripple effects with radial gradients</li>
          <li>• Timing functions matching iOS haptic patterns</li>
        </ul>
      </div>
    </div>
  );
};

// Main PhysicsShowcase component
export const PhysicsShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<
    'magnetic' | 'spring' | 'haptic'
  >('magnetic');
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showcaseRef.current) {
      return;
    }

    const showcase = showcaseRef.current;

    // Setup scroll animations
    scrollAnimations.revealOnScroll('.physics-section');

    // Entrance animation
    springAnimations.entrance(showcase, { delay: 0.3 });

    return () => {
      gsap.killTweensOf(showcase);
    };
  }, []);

  const demos = {
    magnetic: {
      title: 'Magnetic Hover Effects',
      description:
        'Elements that attract to cursor position with configurable magnetic strength',
      component: <MagneticHoverDemo />,
    },
    spring: {
      title: 'Spring Animations',
      description:
        'Natural spring physics for entrance, exit, and bounce animations',
      component: <SpringAnimationsDemo />,
    },
    haptic: {
      title: 'Haptic Feedback',
      description:
        'Visual simulation of device haptic feedback with various intensities',
      component: <HapticFeedbackDemo />,
    },
  };

  return (
    <MockThemeProvider>
      <div ref={showcaseRef} className='physics-showcase space-y-8'>
        <div className='physics-section'>
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
              Physics Animations Showcase
            </h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              Experience advanced physics simulations with magnetic hover
              effects, spring animations, and haptic feedback
            </p>
          </div>

          <div className='demo-selector mb-8'>
            <div className='flex justify-center gap-4'>
              {Object.entries(demos).map(([key, demo]) => (
                <GlassButton
                  key={key}
                  variant={activeDemo === key ? 'primary' : 'ghost'}
                  onClick={() =>
                    setActiveDemo(key as 'magnetic' | 'spring' | 'haptic')
                  }
                  className='min-w-[120px]'
                >
                  {demo.title.split(' ')[0]}
                </GlassButton>
              ))}
            </div>
          </div>
        </div>

        <div className='physics-section'>
          <GlassCard className='p-8'>
            <div className='mb-6'>
              <h3 className='text-2xl font-bold mb-2'>
                {demos[activeDemo].title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                {demos[activeDemo].description}
              </p>
            </div>

            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {demos[activeDemo].component}
            </motion.div>
          </GlassCard>
        </div>

        <div className='physics-section'>
          <GlassCard className='p-8'>
            <h3 className='text-2xl font-bold mb-6'>
              Technical Implementation
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <h4 className='text-lg font-semibold mb-3'>
                  Technologies Used
                </h4>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full' />
                    GSAP for high-performance animations
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full' />
                    Framer Motion for React animations
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full' />
                    Custom easing curves for natural feel
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full' />
                    Hardware acceleration with transform3d
                  </li>
                </ul>
              </div>

              <div>
                <h4 className='text-lg font-semibold mb-3'>
                  Performance Features
                </h4>
                <ul className='space-y-2 text-sm'>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full' />
                    60fps animations with GPU acceleration
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-green-500 rounded-full' />
                    Efficient DOM manipulation batching
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-purple-500 rounded-full' />
                    Automatic cleanup and memory management
                  </li>
                  <li className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-orange-500 rounded-full' />
                    Responsive design with touch support
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </MockThemeProvider>
  );
};

export default PhysicsShowcase;
