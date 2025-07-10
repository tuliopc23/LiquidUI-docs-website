'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassEffect from './ui/GlassEffect';
import { GlassCard, GlassButton } from 'liquidify';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ShowcaseCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

function ShowcaseCard({
  title,
  description,
  children,
  className = '',
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    const card = cardRef.current;

    // Simple scroll reveal animation
    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <GlassCard ref={cardRef} className={`hig-touch-target ${className}`}>
      <h3 className='hig-title-3 mb-2 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'>
        {title}
      </h3>
      <p className='hig-callout text-gray-600 dark:text-gray-300 mb-4'>
        {description}
      </p>
      <div className='space-y-3'>{children}</div>
    </GlassCard>
  );
}

export function SimpleShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (!containerRef.current) {
      return;
    }

    // Simple scroll reveal
    gsap.fromTo(
      '.showcase-container',
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
      }
    );
  }, []);

  if (!isClient) {
    return (
      <div className='py-16 text-center'>
        <div className='animate-pulse'>Loading showcase...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className='py-16 showcase-container'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <h2 className='hero-title hig-large-title font-bold bg-gradient-to-r from-apple-blue via-apple-purple to-apple-indigo bg-clip-text text-transparent mb-4'>
          Experience Liquidify
        </h2>
        <p className='hero-subtitle hig-title-2 text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto'>
          Interactive showcase of liquid glass components with fluid animations
        </p>
      </div>

      {/* Component Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4'>
        <ShowcaseCard
          title='Liquid Glass Buttons'
          description="Interactive buttons with Apple's liquid glass effects and spring animations"
          className='showcase-card'
        >
          <GlassButton variant='primary' className='w-full'>
            Primary Action
          </GlassButton>
          <GlassButton variant='ghost' className='w-full'>
            Secondary Action
          </GlassButton>
          <GlassButton variant='ghost' className='w-full'>
            Tertiary Action
          </GlassButton>
        </ShowcaseCard>

        <ShowcaseCard
          title='Input Elements'
          description='Liquid glass inputs with Apple HIG focus states and accessibility'
          className='showcase-card'
        >
          <GlassEffect variant='widget' className='w-full'>
            <input
              type='text'
              placeholder='Enter your name...'
              className='w-full p-3 bg-transparent border-none outline-none hig-body placeholder-apple-gray-500 focus:ring-2 focus:ring-apple-blue'
            />
          </GlassEffect>
          <GlassEffect variant='widget' className='w-full'>
            <input
              type='email'
              placeholder='Enter email address...'
              className='w-full p-3 bg-transparent border-none outline-none hig-body placeholder-apple-gray-500 focus:ring-2 focus:ring-apple-purple'
            />
          </GlassEffect>
          <GlassEffect variant='widget' className='w-full'>
            <textarea
              placeholder='Enter your message...'
              rows={3}
              className='w-full p-3 bg-transparent border-none outline-none hig-body placeholder-apple-gray-500 focus:ring-2 focus:ring-apple-indigo resize-none'
            />
          </GlassEffect>
        </ShowcaseCard>

        <ShowcaseCard
          title='Layout Components'
          description="Liquid glass cards with Apple's elevation system and typography hierarchy"
          className='showcase-card'
        >
          <GlassEffect intensity='light' className='p-4'>
            <h4 className='hig-headline mb-2'>Light Glass</h4>
            <p className='hig-caption-1 text-apple-gray-600 dark:text-apple-gray-300'>
              Ultra-light glass effect
            </p>
          </GlassEffect>
          <GlassEffect intensity='medium' className='p-4'>
            <h4 className='hig-headline mb-2'>Medium Glass</h4>
            <p className='hig-caption-1 text-apple-gray-600 dark:text-apple-gray-300'>
              Standard liquid glass opacity
            </p>
          </GlassEffect>
          <GlassEffect intensity='heavy' className='p-4'>
            <h4 className='hig-headline mb-2'>Heavy Glass</h4>
            <p className='hig-caption-1 text-apple-gray-600 dark:text-apple-gray-300'>
              Enhanced glass with elevation
            </p>
          </GlassEffect>
        </ShowcaseCard>
      </div>

      {/* Call to Action */}
      <div className='text-center mt-16'>
        <GlassCard className='max-w-2xl mx-auto'>
          <h3 className='hig-title-2 font-bold bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent mb-4'>
            Ready to Build?
          </h3>
          <p className='hig-body text-apple-gray-600 dark:text-apple-gray-300 mb-6'>
            Start creating beautiful liquid glass interfaces with our
            comprehensive component library
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <GlassButton variant='primary' size='lg'>
              Get Started
            </GlassButton>
            <GlassButton variant='ghost' size='lg'>
              View Documentation
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

export default SimpleShowcase;
