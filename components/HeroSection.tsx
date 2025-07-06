import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Github } from "lucide-react";
import { LiquidifyLogo } from "./LiquidifyLogo";
import { LiquidTitle } from "./LiquidTitle";
import {
  OptimizedMotion,
  optimizedVariants,
  ViewportMotion,
} from "./PerformanceOptimizer";
import {
  ScrollReveal,
  LiquidHover,
  StaggerContainer,
  TextReveal,
  MagneticHover,
  fadeInUpVariants,
  scaleInVariants,
} from "./ScrollAnimations";


export function HeroSection() {
  return (
    <ScrollReveal variants={fadeInUpVariants}>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900 py-12 sm:py-20 px-4 section-spacing">
      {/* Rounded gradient overlay container with responsive spacing */}
      <div className="absolute inset-4 sm:inset-6 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-gray-800/50 dark:to-transparent rounded-ds" />

      {/* Floating Elements for visual depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left floating element - optimized with spring */}
        <ViewportMotion threshold={0.2} once>
          <motion.div
            className="absolute top-16 sm:top-24 left-8 sm:left-16 lg:left-24 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-400/8 rounded-ds blur-3xl enhanced-float"
            animate={{
              scale: 1.05,
              opacity: 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 6, // Reduced from 8s
            }}
          />
        </ViewportMotion>

        {/* Bottom right floating element - optimized with spring */}
        <ViewportMotion threshold={0.2} once>
          <motion.div
            className="absolute bottom-16 sm:bottom-24 right-8 sm:right-16 lg:right-24 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-purple-400/8 rounded-ds blur-3xl enhanced-float"
            animate={{
              scale: 1.1,
              opacity: 0.6,
            }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 25,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 8, // Reduced from 10s
              delay: 2,
            }}
          />
        </ViewportMotion>

        {/* Additional elements for larger screens - optimized with spring */}
        <ViewportMotion threshold={0.2} once>
          <motion.div
            className="hidden lg:block absolute top-1/3 right-12 w-20 h-20 bg-green-400/5 rounded-ds blur-2xl enhanced-float"
            animate={{
              y: -15,
              opacity: 0.4,
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 15,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 5, // Reduced from 6s
              delay: 4,
            }}
          />
        </ViewportMotion>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ViewportMotion
          variants={optimizedVariants.pageTransition}
          className="flex flex-col items-center motion-element"
          threshold={0.2}
          once={true}
        >
          <OptimizedMotion.div
            className="inline-flex items-center space-x-2 enhanced-glass px-3 sm:px-4 py-2 sm:py-2.5 rounded-ds border border-gray-200/70 dark:border-gray-700/50 mb-6 sm:mb-8 shadow-sm motion-element hover-optimized enhanced-button"
            {...optimizedVariants.hoverScale}
          >
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4 text-blue-500" />
            <span className="caption-text text-gray-700 dark:text-gray-300">
              Now Available: LiqUIdify v1.1.0
            </span>
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full">
              Stable
            </span>
          </OptimizedMotion.div>

          <StaggerContainer className="mb-8 sm:mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <ScrollReveal variants={scaleInVariants} delay={0.1}>
                <MagneticHover className="mb-4 sm:mb-6">
                  <LiquidifyLogo size={80} className="mx-auto" />
                </MagneticHover>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <LiquidTitle
                  as="h1"
                  tiltX={8}
                  tiltY={-6}
                  className="text-center text-gray-900 dark:text-white"
                >
                  <TextReveal 
                    text="LiqUIdify"
                    className="block text-[2.8rem] sm:text-6xl lg:text-7xl tracking-tight font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 gradient-text drop-shadow-lg mb-2 sm:mb-4"
                  />
                  <TextReveal 
                    text="Component Library"
                    delay={0.3}
                    className="block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600 bg-clip-text text-transparent gradient-text text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide mt-2"
                  />
                </LiquidTitle>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.4}>
              <p className="mt-6 sm:mt-8 body-text text-lg sm:text-xl md:text-2xl text-pretty text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal sm:font-medium">
                A modern React component library with glassmorphism design and
                physics-based interactions.
                <br />
                <span className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-normal">
                  Build beautiful, accessible UIs with pre-built components and
                  customizable themes.
                </span>
              </p>
            </ScrollReveal>
          </StaggerContainer>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none">
              <LiquidHover intensity="normal">
                <a
                  href="/getting-started"
                  className="inline-flex items-center justify-center px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white bg-blue-500 border border-transparent rounded-ds shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
                </a>
              </LiquidHover>
              <LiquidHover intensity="normal">
                <a
                  href="https://github.com/tuliopc23/LiquidUI-docs-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-ds shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </LiquidHover>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.8} variants={scaleInVariants}>
            <LiquidHover intensity="subtle" className="relative w-full max-w-6xl mx-auto enhanced-glass backdrop-blur-lg rounded-ds shadow-xl overflow-hidden border border-gray-200/70 dark:border-gray-700/50">
            <div className="p-1">
              <div className="relative aspect-video bg-gray-50/50 dark:bg-gray-900/50 rounded-ds overflow-hidden flex items-center justify-center">
                <div className="text-center p-4 sm:p-8">
                  <div className="text-liquid-glass subtitle-text text-gray-400 dark:text-gray-600 mb-2 sm:mb-3">
                    Component Showcase
                  </div>
                  <p className="body-text text-pretty text-gray-500 dark:text-gray-500 mb-4 sm:mb-8">
                    Interactive component demos will appear here
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 max-w-2xl mx-auto">
                    {[
                      { label: "Components", value: "30+" },
                      { label: "Themes", value: "3" },
                      { label: "TypeScript", value: "100%" },
                      { label: "Tree Shakable", value: "Yes" },
                    ].map((stat, index) => (
                      <OptimizedMotion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className="text-center motion-element hover-optimized"
                      >
                        <div className="subtitle-text text-blue-500 dark:text-blue-400 mb-1 text-lg sm:text-xl font-semibold">
                          {stat.value}
                        </div>
                        <div className="caption-text text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium">
                          {stat.label}
                        </div>
                      </OptimizedMotion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </LiquidHover>
          </ScrollReveal>
        </ViewportMotion>
      </div>

      {/* Scroll Indicator with responsive positioning - optimized with spring */}
        <ScrollReveal delay={1.0}>
          <motion.div
            className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: 6 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              repeat: Infinity,
              repeatType: "reverse",
              duration: 2,
            }}
          >
            <div className="w-5 sm:w-6 h-8 sm:h-10 border-2 border-gray-400/50 rounded-full flex justify-center">
              <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-gray-400/50 rounded-full mt-1.5 sm:mt-2" />
            </div>
          </motion.div>
        </ScrollReveal>
      </section>
    </ScrollReveal>
  );
}
