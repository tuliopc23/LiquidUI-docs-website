import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSafeAnimation } from './AnimationProvider';

// Industry-leading scroll animation variants
export const fadeInUpVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const slideInFromLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const slideInFromRightVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export const scaleInVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Liquid morphing hover effect
export const liquidHoverVariants = {
  initial: {
    scale: 1,
    borderRadius: "1.5rem",
  },
  hover: {
    scale: 1.05,
    borderRadius: ["1.5rem", "2rem", "1.2rem", "1.8rem", "1.5rem"],
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
      borderRadius: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

// Scroll-triggered animation component
interface ScrollRevealProps {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({ 
  children, 
  variants = fadeInUpVariants, 
  delay = 0,
  duration,
  className,
  once = true 
}: ScrollRevealProps) {
  const { shouldAnimate } = useSafeAnimation();

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={variants}
      transition={{
        delay,
        duration: duration || 0.6,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Liquid hover effect component
interface LiquidHoverProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'normal' | 'strong';
}

export function LiquidHover({ children, className, intensity = 'normal' }: LiquidHoverProps) {
  const { shouldAnimate } = useSafeAnimation();

  const intensitySettings = {
    subtle: { scale: 1.02, duration: 0.4 },
    normal: { scale: 1.05, duration: 0.6 },
    strong: { scale: 1.08, duration: 0.8 },
  };

  const settings = intensitySettings[intensity];

  const variants = {
    initial: {
      scale: 1,
      borderRadius: "1.5rem",
    },
    hover: shouldAnimate ? {
      scale: settings.scale,
      borderRadius: ["1.5rem", "2rem", "1.2rem", "1.8rem", "1.5rem"],
      transition: {
        duration: settings.duration,
        ease: [0.23, 1, 0.32, 1],
        borderRadius: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      },
    } : {},
    tap: shouldAnimate ? {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    } : {},
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scroll progress indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Parallax section component
interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

// Stagger animation container
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({ children, staggerDelay = 0.1, className }: StaggerContainerProps) {
  const { shouldAnimate } = useSafeAnimation();

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  if (!shouldAnimate) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Magnetic hover effect (follows cursor)
interface MagneticHoverProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticHover({ children, strength = 0.3, className }: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const { shouldAnimate } = useSafeAnimation();

  useEffect(() => {
    if (!shouldAnimate) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !isHovered) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePosition({
        x: (e.clientX - centerX) * strength,
        y: (e.clientY - centerY) * strength,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovered, strength, shouldAnimate]);

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}

// Enhanced scroll-triggered text reveal
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const { shouldAnimate } = useSafeAnimation();

  if (!shouldAnimate) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block mr-2"
          style={{ perspective: "1000px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}