import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface SmoothScrollProps {
    children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const { scrollYProgress } = useScroll();

    // Create smooth spring physics for scroll
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 15,
        stiffness: 100,
        restDelta: 0.001,
    });

    useEffect(() => {
        // Enhanced smooth scrolling for the entire page
        const enableSmoothScroll = () => {
            document.documentElement.style.scrollBehavior = 'smooth';

            // Add CSS for hardware acceleration
            document.documentElement.style.setProperty('--scroll-behavior', 'smooth');

            // Optimize scroll performance
            const style = document.createElement('style');
            style.textContent = `
        * {
          scroll-behavior: smooth;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          scroll-behavior: smooth;
        }
        
        /* GPU acceleration for smooth animations */
        .smooth-scroll {
          will-change: transform;
          transform: translateZ(0);
        }
        
        /* Optimize animation performance */
        .motion-element {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Enhanced scroll indicators */
        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #8B5CF6, #EC4899, #3B82F6);
          transform-origin: 0%;
          z-index: 1000;
        }
      `;
            document.head.appendChild(style);
        };

        enableSmoothScroll();

        // Custom smooth scroll for anchor links
        const handleClick = (e: Event) => {
            const target = e.target as HTMLElement;
            const href = target.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                    });
                }
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div className="smooth-scroll">
            {/* Scroll progress indicator */}
            <motion.div
                className="scroll-indicator"
                style={{ scaleX: smoothProgress }}
            />

            {children}
        </div>
    );
};

export default SmoothScroll; 