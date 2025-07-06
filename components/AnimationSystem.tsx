import React, { useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 translate-y-4 transition-all duration-700',
        className
      )}
    >
      {children}
    </div>
  );
}

interface LiquidBlobProps {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LiquidBlob({ 
  color = 'primary', 
  size = 'md', 
  className 
}: LiquidBlobProps) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64'
  };

  return (
    <div
      className={cn(
        'absolute rounded-full blur-3xl animate-pulse',
        sizeClasses[size],
        color === 'primary' && 'bg-blue-500/20',
        color === 'secondary' && 'bg-purple-500/20',
        color === 'accent' && 'bg-pink-500/20',
        className
      )}
    />
  );
}

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticElement({ children, strength = 0.5 }: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className="transition-transform duration-300 ease-out">
      {children}
    </div>
  );
}