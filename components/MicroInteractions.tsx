import React, { useState, useRef } from 'react';
import { cn } from 'liquidify';

// Custom shouldReduceMotion function
function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / strength;
    const deltaY = (e.clientY - centerY) / strength;

    ref.current.style.setProperty('--x', `${deltaX * 100}%`);
    ref.current.style.setProperty('--y', `${deltaY * 100}%`);
  };

  const handleMouseLeave = () => {
    ref.current?.style.setProperty('--x', '0%');
    ref.current?.style.setProperty('--y', '0%');
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative transition-all duration-200 hover:scale-105 active:scale-95",
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

  const createRipple = (event: React.MouseEvent) => {
    if (!buttonRef.current || shouldReduceMotion()) return;

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
        'relative overflow-hidden',
        'transition-all duration-200 ease-out',
        'hover:scale-105 active:scale-95',
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
          "w-14 h-14 rounded-full shadow-lg",
          "backdrop-blur-xl bg-blue-500/80 text-white",
          "hover:bg-blue-600/80 transition-all duration-200",
          "flex items-center justify-center",
          "hover:scale-110 active:scale-90",
          !shouldReduceMotion() && "animate-pulse",
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
  const x = useRef<HTMLDivElement>(null);
  const y = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!x.current || !y.current) return;

    const currentRect = e.currentTarget.getBoundingClientRect();
    const centerX = currentRect.left + currentRect.width / 2;
    const centerY = currentRect.top + currentRect.height / 2;

    const deltaX = ((e.clientX - centerX) / currentRect.width) * 100;
    const deltaY = ((e.clientY - centerY) / currentRect.height) * 100;

    x.current.style.setProperty('--x', `${deltaX}%`);
    y.current.style.setProperty('--y', `${deltaY}%`);
  };

  const handleMouseLeave = () => {
    x.current?.style.setProperty('--x', '0%');
    y.current?.style.setProperty('--y', '0%');
  };

  return (
    <div
      ref={x}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("cursor-pointer transition-transform duration-200 hover:scale-105", className)}
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

  React.useEffect(() => {
    if (shouldReduceMotion()) return;

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
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={cn('transform-gpu', className)}
      style={!shouldReduceMotion() ? {
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
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{
            animationDelay: `${index * staggerDelay}s`
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}