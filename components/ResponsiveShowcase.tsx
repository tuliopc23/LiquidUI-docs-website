'use client';

import React, { useEffect, useRef } from 'react';
import { GlassCard, ThemeProvider } from 'liquidify';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimations, pageTransitions } from '@/lib/enhanced-animations';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ResponsiveDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // Setup scroll animations
    scrollAnimations.revealOnScroll('.responsive-section');

    // Entrance animation
    pageTransitions.slideInUp('.responsive-demo');

    return () => {
      gsap.killTweensOf(container);
    };
  }, []);

  return (
    <ThemeProvider>
      <div ref={containerRef} className='responsive-demo space-y-8'>
        <div className='responsive-section text-center'>
          <h2 className='text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4'>
            Responsive Showcase
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8'>
            Fluid responsive design demonstrated across various devices and
            screen sizes
          </p>
        </div>

        <div className='responsive-section flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
          <GlassCard className='p-6 w-full sm:w-1/3'>
            <div className='w-full h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mb-3' />
            <p className='font-semibold mb-2'>Mobile</p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Optimized for small screens and touch interfaces
            </p>
          </GlassCard>

          <GlassCard className='p-6 w-full sm:w-1/3'>
            <div className='w-full h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg mb-3' />
            <p className='font-semibold mb-2'>Tablet</p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Ready for multitasking and split screen views
            </p>
          </GlassCard>

          <GlassCard className='p-6 w-full sm:w-1/3'>
            <div className='w-full h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg mb-3' />
            <p className='font-semibold mb-2'>Desktop</p>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              Full-featured experiences with more content
            </p>
          </GlassCard>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ResponsiveDemo;
