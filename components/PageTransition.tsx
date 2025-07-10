'use client';

import { useEffect } from 'react';
import {
  pageTransitions,
  scrollAnimations,
  animationUtils,
} from '@/lib/enhanced-animations';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  useEffect(() => {
    // Initialize page animations
    animationUtils.preloadAnimations();

    // Page entrance animation
    pageTransitions.fadeIn(0.8);

    // Stagger reveal for main content elements
    setTimeout(() => {
      pageTransitions.staggerReveal(
        '.glass-card, .glass-button, .glass-effect',
        0.1
      );
    }, 200);

    // Initialize scroll animations
    scrollAnimations.revealOnScroll('.glass-card');
    scrollAnimations.revealOnScroll('.glass-button');

    // Setup responsive animations
    animationUtils.setupResponsive();

    // Cleanup on unmount
    return () => {
      animationUtils.killAll();
    };
  }, []);

  return <div style={{ display: 'contents' }}>{children}</div>;
}
