'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassInput, GlassSlider, GlassSwitch, GlassSelect } from 'liquidify';
import {
  AppleButton,
  AppleCard,
  AppleText,
  AppleSection,
} from './AppleHIGSystem';

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

    // Apple HIG scroll reveal animation
    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
        rotationY: -5,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Add premium hover effects
    const hoverTl = gsap.timeline({ paused: true });
    hoverTl.to(card, {
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(0, 122, 255, 0.15)',
      backdropFilter: 'blur(24px) saturate(200%)',
      duration: 0.4,
      ease: 'power2.out',
    });

    card.addEventListener('mouseenter', () => hoverTl.play());
    card.addEventListener('mouseleave', () => hoverTl.reverse());

    return () => {
      hoverTl.kill();
    };
  }, []);

  return (
    <AppleCard
      ref={cardRef}
      className={`showcase-card p-6 ${className}`}
      hover={true}
    >
      <AppleText
        variant='title3'
        color='accent'
        className='block mb-3 font-semibold'
      >
        {title}
      </AppleText>
      <AppleText variant='callout' color='secondary' className='block mb-6'>
        {description}
      </AppleText>
      <div className='space-y-4'>{children}</div>
    </AppleCard>
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
    <div
      className='py-20 showcase-container min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
      ref={containerRef}
    >
      {/* Hero Section */}
      <AppleSection
        title='Experience Liquidify'
        subtitle='Interactive showcase of liquid glass components with premium Apple HIG animations and interactions'
        centered={true}
        className='mb-20'
      >
        <div />
      </AppleSection>

      {/* Component Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-6'>
        <ShowcaseCard
          title='Premium Glass Buttons'
          description='Apple HIG-compliant buttons with magnetic hover effects and haptic-style feedback'
          className='showcase-card'
        >
          <div>
            <div className='space-y-3'>
              <AppleButton variant='primary' size='lg' className='w-full'>
                Primary Action
              </AppleButton>
              <AppleButton variant='secondary' size='md' className='w-full'>
                Secondary Action
              </AppleButton>
              <AppleButton variant='tertiary' size='md' className='w-full'>
                Tertiary Action
              </AppleButton>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title='Advanced Input Elements'
          description='Liquid glass inputs with premium focus animations and Apple HIG accessibility'
          className='showcase-card'
        >
          <div>
            <div className='space-y-4'>
              <GlassInput
                type='text'
                placeholder='Full Name'
                className='w-full transition-all duration-300'
              />
              <GlassInput
                type='email'
                placeholder='Email Address'
                className='w-full transition-all duration-300'
              />
              <GlassSelect
                options={[
                  { value: 'design', label: 'Design' },
                  { value: 'engineering', label: 'Engineering' },
                  { value: 'product', label: 'Product' },
                ]}
                placeholder='Select Department'
                className='w-full'
              />
              <div className='flex items-center gap-4'>
                <GlassSwitch defaultChecked={false} />
                <AppleText variant='callout' color='secondary'>
                  Enable notifications
                </AppleText>
              </div>
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard
          title='Interactive Components'
          description="Premium liquid glass components with Apple's elevation system and micro-interactions"
          className='showcase-card'
        >
          <div>
            <div className='space-y-4'>
              <AppleCard className='p-4' interactive={true}>
                <AppleText variant='headline' className='block mb-2'>
                  Interactive Card
                </AppleText>
                <AppleText
                  variant='footnote'
                  color='secondary'
                  className='block'
                >
                  Click me for haptic feedback
                </AppleText>
              </AppleCard>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <AppleText variant='callout'>Volume</AppleText>
                  <AppleText variant='caption1' color='secondary'>
                    75%
                  </AppleText>
                </div>
                <GlassSlider value={75} min={0} max={100} className='w-full' />
              </div>
              <AppleCard className='p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
                <AppleText variant='headline' className='block mb-2'>
                  Premium Glass
                </AppleText>
                <AppleText
                  variant='footnote'
                  color='secondary'
                  className='block'
                >
                  Enhanced with gradient overlay
                </AppleText>
              </AppleCard>
            </div>
          </div>
        </ShowcaseCard>
      </div>

      {/* Call to Action */}
      <AppleSection className='mt-24'>
        <div className='text-center'>
          <AppleCard className='max-w-3xl mx-auto p-8'>
            <div className='mb-8'>
              <AppleText
                variant='title2'
                className='block mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold'
              >
                Ready to Build Premium Interfaces?
              </AppleText>
              <AppleText
                variant='body'
                color='secondary'
                className='block max-w-2xl mx-auto'
              >
                Start creating beautiful liquid glass interfaces with our
                comprehensive component library, featuring Apple HIG compliance
                and premium animations.
              </AppleText>
            </div>
            <div>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <AppleButton variant='primary' size='lg'>
                  Get Started →
                </AppleButton>
                <AppleButton variant='secondary' size='lg'>
                  View Documentation
                </AppleButton>
              </div>
            </div>
          </AppleCard>
        </div>
      </AppleSection>
    </div>
  );
}

export default SimpleShowcase;
