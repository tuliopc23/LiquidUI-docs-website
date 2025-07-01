import React, { useRef, useEffect } from 'react';
import { useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { OptimizedMotion } from './PerformanceOptimizer';

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    once?: boolean;
}

export const ScrollFadeIn: React.FC<ScrollAnimationProps> = ({
    children,
    className = '',
    direction = 'up',
    delay = 0,
    duration = 0.6,
    once = true
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "0px 0px -100px 0px" });

    const directionVariants = {
        up: { y: 50, opacity: 0 },
        down: { y: -50, opacity: 0 },
        left: { x: 50, opacity: 0 },
        right: { x: -50, opacity: 0 }
    };

    return (
        <OptimizedMotion.div
            ref={ref}
            className={`motion-element ${className}`}
            initial={directionVariants[direction]}
            animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration,
                delay,
                mass: 1,
            }}
        >
            {children}
        </OptimizedMotion.div>
    );
};

export const ScrollStagger: React.FC<{
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

    return (
        <OptimizedMotion.div
            ref={ref}
            className={`motion-element ${className}`}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1,
                    }
                }
            }}
        >
            {children}
        </OptimizedMotion.div>
    );
};

export const ScrollParallax: React.FC<{
    children: React.ReactNode;
    speed?: number;
    className?: string;
}> = ({ children, speed = 0.5, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const y = useMotionValue(0);
    const smoothY = useSpring(y, { damping: 15, stiffness: 100, restDelta: 0.001 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateY = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            y.set(rate);
        };

        const handleScroll = () => {
            requestAnimationFrame(updateY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateY();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, y]);

    return (
        <OptimizedMotion.div
            ref={ref}
            className={`motion-element ${className}`}
            style={{ y: smoothY }}
        >
            {children}
        </OptimizedMotion.div>
    );
};

export const ScrollScale: React.FC<ScrollAnimationProps> = ({
    children,
    className = '',
    delay = 0,
    once = true
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once, margin: "0px 0px -100px 0px" });

    return (
        <OptimizedMotion.div
            ref={ref}
            className={`motion-element ${className}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay,
                mass: 1,
            }}
        >
            {children}
        </OptimizedMotion.div>
    );
};

export const ScrollReveal: React.FC<{
    children: React.ReactNode;
    className?: string;
    width?: string;
    delay?: number;
}> = ({ children, className = '', width = "100%", delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <OptimizedMotion.div
                className="motion-element"
                initial={{ x: "-100%" }}
                animate={isInView ? { x: "0%" } : { x: "-100%" }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay,
                    mass: 1,
                }}
                style={{ width }}
            >
                {children}
            </OptimizedMotion.div>
        </div>
    );
};

// Hook for custom scroll animations
export const useScrollProgress = () => {
    const scrollY = useMotionValue(0);
    const scrollProgress = useTransform(scrollY, [0, 1000], [0, 1]);

    useEffect(() => {
        const updateScrollY = () => {
            scrollY.set(window.pageYOffset);
        };

        const handleScroll = () => {
            requestAnimationFrame(updateScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateScrollY();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollY]);

    return { scrollY, scrollProgress };
};

const ScrollAnimations = {
    ScrollFadeIn,
    ScrollStagger,
    ScrollParallax,
    ScrollScale,
    ScrollReveal,
    useScrollProgress
};

export default ScrollAnimations; 