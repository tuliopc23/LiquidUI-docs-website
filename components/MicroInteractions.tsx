import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / strength;
    const deltaY = (e.clientY - centerY) / strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative transition-all duration-200 hover:scale-105",
        className
      )}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Ripple effect component
export function RippleButton({ 
  children, 
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.3)',
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: unknown;
}) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);

    props.onClick?.(e);
  };

  return (
    <button
      className={cn("relative overflow-hidden", className)}
      onClick={handleClick}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          initial={{
            width: 0,
            height: 0,
            opacity: 0.5,
            x: ripple.x,
            y: ripple.y,
          }}
          animate={{
            width: 100,
            height: 100,
            opacity: 0,
            x: ripple.x - 50,
            y: ripple.y - 50,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ backgroundColor: rippleColor }}
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
    <motion.div
      className={cn(
        "fixed z-50",
        positionClasses[position]
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.button
        className={cn(
          "w-14 h-14 rounded-full shadow-lg",
          "backdrop-blur-xl bg-blue-500/80 text-white",
          "hover:bg-blue-600/80 transition-all duration-200",
          "flex items-center justify-center",
          className
        )}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={shouldReduceMotion() ? {} : {
          boxShadow: "0 4px 30px rgba(59, 130, 246, 0.5)"
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          repeat: shouldReduceMotion() ? 0 : Infinity,
          repeatType: "reverse",
          duration: 3
        }}
        {...props}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}

// Card with tilt effect
export function TiltCard({ 
  children, 
  className = '',
  maxTilt = 10,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  [key: string]: unknown;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-100, 100], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentRect = e.currentTarget.getBoundingClientRect();
    const centerX = currentRect.left + currentRect.width / 2;
    const centerY = currentRect.top + currentRect.height / 2;
    
    x.set(((e.clientX - centerX) / currentRect.width) * 100);
    y.set(((e.clientY - centerY) / currentRect.height) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("cursor-pointer", className)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

// Parallax scroll effect
export function ParallaxElement({
  children,
  speed = 0.5,
  className = '',
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * speed;
      y.set(rate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, y]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger animation container
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
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}