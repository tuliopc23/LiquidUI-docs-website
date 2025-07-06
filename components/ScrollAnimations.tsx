import React, { useRef, useEffect, useState } from 'react';
import { useSafeAnimation } from './AnimationProvider';

// Clean animation variants for CSS-based animations
export const animationClasses = {
  fadeInUp: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  scaleIn: 'animate-scale-in',
  float: 'animate-float',
};

// Simple scroll reveal component using CSS animations
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: keyof typeof animationClasses;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  animation = 'fadeInUp'
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { shouldAnimate } = useSafeAnimation();

  useEffect(() => {
    if (!shouldAnimate || !ref.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: '-10% 0px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [shouldAnimate, delay]);

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClasses[animation] : 'opacity-0'}`}
      style={{
        transitionDelay: shouldAnimate ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}

// Simple stagger container
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 100
}: StaggerContainerProps) {
  const { shouldAnimate } = useSafeAnimation();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal delay={index * staggerDelay} key={index}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}

// Simple hover animation
interface LiquidHoverProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export function LiquidHover({
  children,
  className = '',
  intensity = 'medium'
}: LiquidHoverProps) {
  const { shouldAnimate } = useSafeAnimation();

  const hoverClasses = {
    subtle: 'hover:scale-[1.02] hover:-translate-y-1',
    medium: 'hover:scale-[1.05] hover:-translate-y-2',
    strong: 'hover:scale-[1.08] hover:-translate-y-3',
  };

  const transitionClass = shouldAnimate
    ? 'transition-all duration-300 ease-out gpu-accelerated'
    : '';

  return (
    <div className={`${className} ${transitionClass} ${shouldAnimate ? hoverClasses[intensity] : ''}`}>
      {children}
    </div>
  );
}

// Text reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 50
}: TextRevealProps) {
  const { shouldAnimate } = useSafeAnimation();
  const words = text.split(' ');

  if (!shouldAnimate) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, index) => (
        <ScrollReveal
          key={index}
          delay={delay + (index * staggerDelay)}
          className="inline-block mr-2"
        >
          {word}
        </ScrollReveal>
      ))}
    </span>
  );
}

// Floating animation wrapper
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingElement({
  children,
  className = ''
}: FloatingElementProps) {
  const { shouldAnimate } = useSafeAnimation();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`${className} animate-float`}>
      {children}
    </div>
  );
}

// Glass card with animation
interface AnimatedGlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedGlassCard({
  children,
  className = '',
  delay = 0
}: AnimatedGlassCardProps) {
  return (
    <ScrollReveal delay={delay} animation="scaleIn">
      <LiquidHover intensity="subtle">
        <div className={`glass-card ${className}`}>
          {children}
        </div>
      </LiquidHover>
    </ScrollReveal>
  );
}