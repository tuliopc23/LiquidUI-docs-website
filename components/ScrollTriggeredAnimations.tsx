import React, { useRef, useEffect, useState } from 'react';
import { useSafeAnimation } from './AnimationProvider';

interface ScrollAnimationProps {
    children: React.ReactNode;
    className?: string;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
}

// Simple CSS-based scroll fade in
export const ScrollFadeIn: React.FC<ScrollAnimationProps> = ({
    children,
    className = '',
    direction = 'up',
    delay = 0
}) => {
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
            { threshold: 0.1, rootMargin: '-100px 0px' }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [shouldAnimate, delay]);

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    const directionClasses = {
        up: isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8',
        down: isVisible ? 'animate-slide-up' : 'opacity-0 -translate-y-8',
        left: isVisible ? 'animate-slide-up' : 'opacity-0 translate-x-8',
        right: isVisible ? 'animate-slide-up' : 'opacity-0 -translate-x-8'
    };

    return (
        <div
            ref={ref}
            className={`${className} ${directionClasses[direction]} transition-all duration-500 ease-out`}
            style={{ transitionDelay: shouldAnimate ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

// Simple stagger container
export const ScrollStagger: React.FC<{
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 100 }) => {
    const { shouldAnimate } = useSafeAnimation();

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div className={className}>
            {React.Children.map(children, (child, index) => (
                <ScrollFadeIn delay={index * staggerDelay} key={index}>
                    {child}
                </ScrollFadeIn>
            ))}
        </div>
    );
};

// CSS-based parallax effect
export const ScrollParallax: React.FC<{
    children: React.ReactNode;
    speed?: number;
    className?: string;
}> = ({ children, speed = 0.5, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [translateY, setTranslateY] = useState(0);
    const { shouldAnimate } = useSafeAnimation();

    useEffect(() => {
        if (!shouldAnimate) return;

        const updateTranslateY = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -speed;
            setTranslateY(rate);
        };

        const handleScroll = () => {
            requestAnimationFrame(updateTranslateY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateTranslateY();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed, shouldAnimate]);

    return (
        <div
            ref={ref}
            className={`${className} gpu-accelerated`}
            style={shouldAnimate ? {
                transform: `translateY(${translateY}px)`,
                transition: 'transform 0.1s ease-out'
            } : {}}
        >
            {children}
        </div>
    );
};

// Simple scale animation
export const ScrollScale: React.FC<ScrollAnimationProps> = ({
    children,
    className = '',
    delay = 0
}) => {
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
            { threshold: 0.1, rootMargin: '-100px 0px' }
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
            className={`${className} ${isVisible ? 'animate-scale-in' : 'opacity-0 scale-90'} transition-all duration-500 ease-out`}
            style={{ transitionDelay: shouldAnimate ? `${delay}ms` : '0ms' }}
        >
            {children}
        </div>
    );
};

// Simple reveal animation
export const ScrollReveal: React.FC<{
    children: React.ReactNode;
    className?: string;
    width?: string;
    delay?: number;
}> = ({ children, className = '', width = "100%", delay = 0 }) => {
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
            { threshold: 0.1, rootMargin: '-50px 0px' }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [shouldAnimate, delay]);

    if (!shouldAnimate) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <div
                className={`${isVisible ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-out gpu-accelerated`}
                style={{
                    width,
                    transitionDelay: shouldAnimate ? `${delay}ms` : '0ms'
                }}
            >
                {children}
            </div>
        </div>
    );
};

// Simple scroll progress hook
export const useScrollProgress = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrolled = window.pageYOffset;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(scrolled / maxScroll, 1);
            setScrollProgress(progress);
        };

        const handleScroll = () => {
            requestAnimationFrame(updateScrollProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        updateScrollProgress();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollProgress };
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