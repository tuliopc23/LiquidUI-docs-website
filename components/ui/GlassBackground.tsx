'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

export interface GlassBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'cosmic' | 'minimal';
  animated?: boolean;
  className?: string;
}

const GlassBackground: React.FC<GlassBackgroundProps> = ({
  children,
  variant = 'default',
  animated = true,
  className,
}) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) {
      return;
    }

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    // Animate the floating orbs
    if (orb1Ref.current) {
      tl.to(
        orb1Ref.current,
        {
          x: 100,
          y: -50,
          duration: 8,
          ease: 'sine.inOut',
        },
        0
      );
    }

    if (orb2Ref.current) {
      tl.to(
        orb2Ref.current,
        {
          x: -80,
          y: 60,
          duration: 10,
          ease: 'sine.inOut',
        },
        0
      );
    }

    if (orb3Ref.current) {
      tl.to(
        orb3Ref.current,
        {
          x: 70,
          y: -80,
          duration: 12,
          ease: 'sine.inOut',
        },
        0
      );
    }

    return () => {
      tl.kill();
    };
  }, [animated]);

  const backgroundVariants = {
    default: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage:
        "url('https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NDk1Njc4NTB8&ixlib=rb-4.1.0&q=85')",
    },
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    cosmic: {
      background:
        'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #ec4899 100%)',
    },
    minimal: {
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    },
  };

  return (
    <div
      ref={backgroundRef}
      className={cn('min-h-screen relative overflow-hidden', className)}
      style={{
        ...backgroundVariants[variant],
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Animated background pattern */}
      <div className='absolute inset-0 pointer-events-none'>
        <div
          ref={orb1Ref}
          className='absolute w-96 h-96 rounded-full opacity-30'
          style={{
            background:
              'radial-gradient(circle, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
            top: '20%',
            left: '20%',
          }}
        />
        <div
          ref={orb2Ref}
          className='absolute w-80 h-80 rounded-full opacity-30'
          style={{
            background:
              'radial-gradient(circle, rgba(255, 119, 198, 0.3) 0%, transparent 50%)',
            top: '60%',
            right: '20%',
          }}
        />
        <div
          ref={orb3Ref}
          className='absolute w-72 h-72 rounded-full opacity-30'
          style={{
            background:
              'radial-gradient(circle, rgba(120, 219, 255, 0.3) 0%, transparent 50%)',
            bottom: '20%',
            left: '40%',
          }}
        />
      </div>

      {/* Glass texture overlay */}
      <div
        className='absolute inset-0 pointer-events-none'
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default GlassBackground;
