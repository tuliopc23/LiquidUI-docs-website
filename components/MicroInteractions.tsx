import React, { useState, useRef, useCallback } from 'react';
import { cn } from '../lib/liquidify-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Throttle utility for performance
const throttle = (func: (...args: unknown[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;
  return (...args: unknown[]) => {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

// Magnetic button effect
export function MagneticButton({
  children,
  className = '',
  strength = 15,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const animationFrameRef = useRef<number | null>(null);

  const updateTransform = useCallback((deltaX: number, deltaY: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    });
  }, []);

  const throttledMouseMove = useCallback((e: React.MouseEvent) => {
    const throttledFn = throttle((...args: unknown[]) => {
      const event = args[0] as React.MouseEvent;
      if (!ref.current || prefersReducedMotion) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) / strength;
      const deltaY = (event.clientY - centerY) / strength;

      updateTransform(deltaX, deltaY);
    }, 16);
    
    throttledFn(e);
  }, [strength, prefersReducedMotion, updateTransform]);

  const handleMouseEnter = () => {
    if (!ref.current || prefersReducedMotion) return;
    ref.current.style.willChange = 'transform';
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    ref.current.style.willChange = 'auto';
    
    if (!prefersReducedMotion) {
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = 'translate(0px, 0px)';
        }
      });
    }
  };

  return (
    <button
      ref={ref}
      onMouseMove={throttledMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative gpu-accelerated",
        !prefersReducedMotion && "transition-all duration-200 hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Ripple effect on click
export function RippleButton({
  children,
  className = '',
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const createRipple = (event: React.MouseEvent) => {
    if (!buttonRef.current || prefersReducedMotion) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden gpu-accelerated',
        !prefersReducedMotion && 'transition-all duration-200 ease-out hover:scale-105 active:scale-95',
        className
      )}
      onMouseDown={createRipple}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '20px',
            height: '20px',
          }}
        />
      ))}
    </button>
  );
}

// Floating action button with pulse
export function FloatingActionButton({
  children,
  className = '',
  position = 'bottom-right',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  [key: string]: unknown;
}) {
  const prefersReducedMotion = useReducedMotion();
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={cn("fixed z-50", positionClasses[position])}>
      <button
        className={cn(
          "w-14 h-14 rounded-full shadow-lg gpu-accelerated",
          "backdrop-blur-xl bg-blue-500/80 text-white",
          "flex items-center justify-center",
          !prefersReducedMotion && "hover:bg-blue-600/80 transition-all duration-200 hover:scale-110 active:scale-90 animate-pulse",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}

// Card with tilt effect
export function TiltCard({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const animationFrameRef = useRef<number | null>(null);

  const updateTilt = useCallback((rotateX: number, rotateY: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
  }, []);

  const throttledMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const throttledFn = throttle((...args: unknown[]) => {
      const event = args[0] as React.MouseEvent<HTMLDivElement>;
      if (!cardRef.current || prefersReducedMotion) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) / rect.width;
      const deltaY = (event.clientY - centerY) / rect.height;

      const rotateY = deltaX * 15; // Max 15 degrees
      const rotateX = -deltaY * 15; // Negative for natural movement

      updateTilt(rotateX, rotateY);
    }, 16);
    
    throttledFn(e);
  }, [prefersReducedMotion, updateTilt]);

  const handleMouseEnter = () => {
    if (!cardRef.current || prefersReducedMotion) return;
    cardRef.current.style.willChange = 'transform';
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    cardRef.current.style.willChange = 'auto';
    
    if (!prefersReducedMotion) {
      requestAnimationFrame(() => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={throttledMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "cursor-pointer gpu-accelerated",
        !prefersReducedMotion && "transition-transform duration-200 hover:scale-105",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
      {...props}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </div>
  );
}

// CSS-based parallax effect
export function ParallaxContainer({
  children,
  speed = 0.5,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const [translateY, setTranslateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const updateTransform = () => {
      if (!containerRef.current) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      setTranslateY(rate);
    };

    const handleScroll = () => {
      requestAnimationFrame(updateTransform);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransform();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('gpu-accelerated', className)}
      style={!prefersReducedMotion ? {
        transform: `translateY(${translateY}px)`,
        willChange: 'transform'
      } : {}}
    >
      {children}
    </div>
  );
}

// Stagger animation container using CSS
export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
}: {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={cn(
            "gpu-accelerated",
            !prefersReducedMotion && "animate-fade-in"
          )}
          style={!prefersReducedMotion ? {
            animationDelay: `${index * staggerDelay}s`
          } : {}}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
