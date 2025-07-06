import React, { useEffect, useRef } from 'react';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import { LiquidGlassAnimations } from './animations/LiquidGlassAnimations';
import { ScrollAnimations } from './animations/ScrollAnimations';
import { MagneticHover } from './animations/MagneticHover';
import { LiquidifyLogo } from './LiquidifyLogo';
import { useAnimation } from './AnimationProvider';

export function HeroSection() {
  const { createScrollAnimation, isReady } = useAnimation();
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady) return;

    // Create scroll animations for each section
    if (logoRef.current) {
      createScrollAnimation(logoRef.current, {
        animationType: 'liquid',
        intensity: 'medium',
        duration: 1,
        delay: 0.1
      });
    }

    if (titleRef.current) {
      createScrollAnimation(titleRef.current, {
        animationType: 'morphing',
        intensity: 'strong',
        duration: 1.2,
        delay: 0.3,
        liquidMorph: true
      });
    }

    if (subtitleRef.current) {
      createScrollAnimation(subtitleRef.current, {
        animationType: 'slide',
        direction: 'up',
        intensity: 'medium',
        duration: 1,
        delay: 0.5
      });
    }

    if (descriptionRef.current) {
      createScrollAnimation(descriptionRef.current, {
        animationType: 'fade',
        intensity: 'subtle',
        duration: 1,
        delay: 0.7
      });
    }

    if (buttonsRef.current) {
      createScrollAnimation(buttonsRef.current, {
        animationType: 'scale',
        intensity: 'medium',
        duration: 1,
        delay: 0.9
      });
    }

    if (featuresRef.current) {
      createScrollAnimation(featuresRef.current, {
        animationType: 'liquid',
        intensity: 'medium',
        duration: 1.2,
        delay: 1.1
      });
    }

    if (statsRef.current) {
      createScrollAnimation(statsRef.current, {
        animationType: 'fade',
        intensity: 'subtle',
        duration: 1,
        delay: 1.3
      });
    }
  }, [isReady, createScrollAnimation]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container max-w-6xl mx-auto text-center">
        <div className="space-y-8">
          {/* Logo */}
          <div ref={logoRef} className="flex justify-center mb-8">
            <MagneticHover strength="medium" speed="slow" triggerDistance={100} className="p-4">
              <LiquidGlassAnimations intensity="strong" morphSpeed="medium" className="p-4">
                <LiquidifyLogo className="w-20 h-20" />
              </LiquidGlassAnimations>
            </MagneticHover>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 ref={titleRef} className="text-display gradient-text">
              LiqUIdify
            </h1>

            <h2 ref={subtitleRef} className="text-hero text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
              Beautiful Liquid Glass Components for Modern Web Applications
            </h2>
          </div>

          {/* Description */}
          <p ref={descriptionRef} className="text-body-large text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Create stunning glassmorphism interfaces with our comprehensive library of
            React components. Featuring Apple-style design, smooth animations, and
            accessibility-first approach.
          </p>

          {/* Action Buttons */}
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <MagneticHover strength="medium" speed="fast" triggerDistance={120} className="min-w-[200px]">
              <LiquidGlassAnimations intensity="medium" morphSpeed="fast" className="w-full">
                <button className="glass-button glass-button-primary text-white px-8 py-4 text-lg font-semibold flex items-center gap-3 w-full justify-center">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </LiquidGlassAnimations>
            </MagneticHover>

            <MagneticHover strength="subtle" speed="fast" triggerDistance={120} className="min-w-[200px]">
              <LiquidGlassAnimations intensity="subtle" morphSpeed="fast" className="w-full">
                <button className="glass-button text-gray-700 dark:text-gray-300 px-8 py-4 text-lg font-semibold flex items-center gap-3 w-full justify-center">
                  <Github className="w-5 h-5" />
                  View on GitHub
                </button>
              </LiquidGlassAnimations>
            </MagneticHover>
          </div>

          {/* Features Grid */}
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <MagneticHover strength="subtle" speed="medium" triggerDistance={80} className="h-full">
              <LiquidGlassAnimations intensity="medium" morphSpeed="medium" className="h-full">
                <div className="glass-card p-6 text-center space-y-4 h-full">
                  <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-heading text-gray-800 dark:text-gray-200">
                    Beautiful Design
                  </h3>
                  <p className="text-body text-gray-600 dark:text-gray-400">
                    Apple-inspired glassmorphism components with stunning visual effects.
                  </p>
                </div>
              </LiquidGlassAnimations>
            </MagneticHover>

            <MagneticHover strength="subtle" speed="medium" triggerDistance={80} className="h-full">
              <LiquidGlassAnimations intensity="medium" morphSpeed="medium" className="h-full">
                <div className="glass-card p-6 text-center space-y-4 h-full">
                  <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-heading text-gray-800 dark:text-gray-200">
                    High Performance
                  </h3>
                  <p className="text-body text-gray-600 dark:text-gray-400">
                    Optimized animations and GPU-accelerated effects for smooth experiences.
                  </p>
                </div>
              </LiquidGlassAnimations>
            </MagneticHover>

            <MagneticHover strength="subtle" speed="medium" triggerDistance={80} className="h-full">
              <LiquidGlassAnimations intensity="medium" morphSpeed="medium" className="h-full">
                <div className="glass-card p-6 text-center space-y-4 h-full">
                  <div className="w-12 h-12 mx-auto bg-pink-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-heading text-gray-800 dark:text-gray-200">
                    Accessible
                  </h3>
                  <p className="text-body text-gray-600 dark:text-gray-400">
                    Built with accessibility in mind, supporting screen readers and keyboard navigation.
                  </p>
                </div>
              </LiquidGlassAnimations>
            </MagneticHover>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-16 text-center">
            <MagneticHover strength="subtle" speed="fast" triggerDistance={60}>
              <ScrollAnimations animationType="liquid" intensity="subtle" className="space-y-2">
                <div className="text-3xl font-bold gradient-text">40+</div>
                <div className="text-caption text-gray-600 dark:text-gray-400">Components</div>
              </ScrollAnimations>
            </MagneticHover>
            <MagneticHover strength="subtle" speed="fast" triggerDistance={60}>
              <ScrollAnimations animationType="liquid" intensity="subtle" delay={0.1} className="space-y-2">
                <div className="text-3xl font-bold gradient-text">100%</div>
                <div className="text-caption text-gray-600 dark:text-gray-400">TypeScript</div>
              </ScrollAnimations>
            </MagneticHover>
            <MagneticHover strength="subtle" speed="fast" triggerDistance={60}>
              <ScrollAnimations animationType="liquid" intensity="subtle" delay={0.2} className="space-y-2">
                <div className="text-3xl font-bold gradient-text">A11Y</div>
                <div className="text-caption text-gray-600 dark:text-gray-400">Accessible</div>
              </ScrollAnimations>
            </MagneticHover>
            <MagneticHover strength="subtle" speed="fast" triggerDistance={60}>
              <ScrollAnimations animationType="liquid" intensity="subtle" delay={0.3} className="space-y-2">
                <div className="text-3xl font-bold gradient-text">MIT</div>
                <div className="text-caption text-gray-600 dark:text-gray-400">License</div>
              </ScrollAnimations>
            </MagneticHover>
          </div>
        </div>
      </div>
    </section>
  );
}
