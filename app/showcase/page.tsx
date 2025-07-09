'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassButton, GlassCard, ThemeProvider } from 'liquidify';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  springAnimations,
  scrollAnimations,
  pageTransitions,
} from '@/lib/enhanced-animations';
import { usePerformanceMonitor, bundleUtils } from '@/lib/performance-utils';
import PerformanceMonitor from '@/components/PerformanceMonitor';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ShowcaseCard: React.FC<{
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
}> = ({ title, description, href, icon, gradient }) => {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        className='showcase-card'
      >
        <GlassCard className='p-6 h-full cursor-pointer hover:shadow-2xl transition-shadow'>
          <div
            className={`w-16 h-16 rounded-xl ${gradient} flex items-center justify-center mb-4`}
          >
            {icon}
          </div>
          <h3 className='text-xl font-bold mb-2'>{title}</h3>
          <p className='text-gray-600 dark:text-gray-400'>{description}</p>
        </GlassCard>
      </motion.div>
    </Link>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className='feature-card'>
      <GlassCard className='p-6 text-center'>
        <div className='w-12 h-12 mx-auto mb-4 flex items-center justify-center'>
          {icon}
        </div>
        <h4 className='text-lg font-semibold mb-2'>{title}</h4>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

export default function ShowcasePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { measureGlassEffect } = usePerformanceMonitor();

  useEffect(() => {
    if (!pageRef.current) return;

    const page = pageRef.current;

    // Page entrance animation
    pageTransitions.fadeIn(0.8);
    pageTransitions.staggerReveal('.showcase-section', 0.2);

    // Scroll animations
    scrollAnimations.revealOnScroll('.showcase-card');
    scrollAnimations.revealOnScroll('.feature-card');

    return () => {
      gsap.killTweensOf(page);
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <ThemeProvider>
      <div
        ref={pageRef}
        className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
      >
        {/* Hero Section */}
        <div className='showcase-section'>
          <div className='container mx-auto px-4 py-16 text-center'>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6'
            >
              Interactive Component Showcase
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8'
            >
              Experience the full power of Liquidify with interactive
              demonstrations, real-time prop editing, physics animations, and
              responsive design showcases.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='flex flex-col sm:flex-row gap-4 justify-center'
            >
              <Link href='/playground'>
                <GlassButton variant='primary' size='lg'>
                  Open Playground
                </GlassButton>
              </Link>
              <Link href='/components'>
                <GlassButton variant='ghost' size='lg'>
                  View Components
                </GlassButton>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Main Showcases */}
        <div className='showcase-section'>
          <div className='container mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>
                Choose Your Experience
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Explore different aspects of the Liquidify component system
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              <ShowcaseCard
                title='Interactive Playground'
                description='Test components with real-time prop editing, code generation, and live previews'
                href='/playground'
                icon={
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1a3 3 0 000-6h-1m1 6V4a3 3 0 000 6m-2 6h2m0 0h2m-2 0a3 3 0 01-3-3m3 3a3 3 0 01-3-3m0 3a3 3 0 01-3-3m3 3a3 3 0 01-3-3'
                    />
                  </svg>
                }
                gradient='bg-gradient-to-r from-blue-500 to-purple-500'
              />

              <ShowcaseCard
                title='Physics Animations'
                description='Experience magnetic hover effects, spring physics, and haptic feedback simulations'
                href='/playground#physics'
                icon={
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                }
                gradient='bg-gradient-to-r from-green-500 to-blue-500'
              />

              <ShowcaseCard
                title='Responsive Design'
                description='See how components adapt across mobile, tablet, and desktop breakpoints'
                href='/playground#responsive'
                icon={
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                    />
                  </svg>
                }
                gradient='bg-gradient-to-r from-purple-500 to-pink-500'
              />

              <ShowcaseCard
                title='Component Gallery'
                description='Browse through all available Liquidify components with examples'
                href='/components'
                icon={
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
                    />
                  </svg>
                }
                gradient='bg-gradient-to-r from-orange-500 to-red-500'
              />

              <ShowcaseCard
                title='Design System'
                description='Explore the liquid glass design language and Apple HIG principles'
                href='/design-system'
                icon={
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z'
                    />
                  </svg>
                }
                gradient='bg-gradient-to-r from-teal-500 to-cyan-500'
              />

              <ShowcaseCard
                title='Code Examples'
                description='Copy-paste ready code examples for all components and use cases'
                href='/examples'
                icon={
                  <svg
                    className='w-8 h-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                    />
                  </svg>
                }
                gradient='bg-gradient-to-r from-indigo-500 to-purple-500'
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className='showcase-section'>
          <div className='container mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>Why Choose Liquidify?</h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Built with modern web standards and Apple&apos;s Human Interface
                Guidelines
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <FeatureCard
                icon={
                  <svg
                    className='w-8 h-8 text-blue-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  </svg>
                }
                title='Physics-Based'
                description='Realistic animations with magnetic hover and spring physics'
              />

              <FeatureCard
                icon={
                  <svg
                    className='w-8 h-8 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
                    />
                  </svg>
                }
                title='Responsive'
                description='Fluid layouts that work perfectly on all devices'
              />

              <FeatureCard
                icon={
                  <svg
                    className='w-8 h-8 text-purple-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                    />
                  </svg>
                }
                title='Accessible'
                description='WCAG compliant with full keyboard and screen reader support'
              />

              <FeatureCard
                icon={
                  <svg
                    className='w-8 h-8 text-orange-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                    />
                  </svg>
                }
                title='Developer-Friendly'
                description='TypeScript-first with excellent IDE support and documentation'
              />
            </div>
          </div>
        </div>

        {/* Performance Monitoring Section */}
        <div className='showcase-section'>
          <div className='container mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold mb-4'>
                Performance Monitoring
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Real-time performance metrics and optimization insights
              </p>
            </div>

            <PerformanceMonitor
              components={['GlassButton', 'GlassCard', 'GlassNavbar']}
              showBenchmarks={true}
              showBundleSize={true}
              className='mb-8'
            />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <GlassCard className='p-6 text-center'>
                <h3 className='text-xl font-bold mb-2'>Bundle Analysis</h3>
                <div className='text-3xl font-bold text-blue-400 mb-2'>
                  {bundleUtils
                    .getTotalBundleSize([
                      'GlassButton',
                      'GlassCard',
                      'GlassNavbar',
                    ])
                    .toFixed(1)}
                  KB
                </div>
                <p className='text-sm text-gray-400'>Total bundle size</p>
              </GlassCard>

              <GlassCard className='p-6 text-center'>
                <h3 className='text-xl font-bold mb-2'>Lazy Loading</h3>
                <div className='text-3xl font-bold text-green-400 mb-2'>3</div>
                <p className='text-sm text-gray-400'>Components optimized</p>
              </GlassCard>

              <GlassCard className='p-6 text-center'>
                <h3 className='text-xl font-bold mb-2'>Performance</h3>
                <div className='text-3xl font-bold text-purple-400 mb-2'>
                  60+
                </div>
                <p className='text-sm text-gray-400'>Target FPS</p>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='showcase-section'>
          <div className='container mx-auto px-4 py-16'>
            <GlassCard className='p-12 text-center'>
              <h2 className='text-3xl font-bold mb-4'>Ready to Get Started?</h2>
              <p className='text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
                Jump into the interactive playground and start building
                beautiful interfaces with Liquidify&apos;s liquid glass
                components.
              </p>

              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link href='/playground'>
                  <GlassButton
                    variant='primary'
                    size='lg'
                    onMouseEnter={() =>
                      measureGlassEffect('cta-hover', () => {})
                    }
                  >
                    Open Playground
                  </GlassButton>
                </Link>
                <Link href='/getting-started'>
                  <GlassButton variant='ghost' size='lg'>
                    Read Documentation
                  </GlassButton>
                </Link>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
