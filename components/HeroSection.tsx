import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Play, Github, ExternalLink } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Version Badge */}
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 mb-8 animate-float">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Introducing LiquidUI v2.0
            </span>
            <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full">
              Beta
            </span>
          </div>

          {/* Main Heading - Fixed Typography */}
          <div className="mb-12">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white"
              style={{
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
            >
              <span className="block mb-4 pb-2">Liquid Glass</span>
              <span 
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
                style={{
                  paddingTop: '0.2em',
                  paddingBottom: '0.4em',
                  marginTop: '0.2em',
                  display: 'inline-block',
                  lineHeight: '1.1'
                }}
              >
                Components
              </span>
            </h1>
          </div>

          {/* Subheading - Enhanced Typography */}
          <p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            style={{
              lineHeight: '1.6',
              letterSpacing: '-0.01em'
            }}
          >
            Experience the future of UI design with our glassmorphism component library. 
            Fluid animations, liquid interactions, and cutting-edge aesthetics inspired by Apple&apos;s design language.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
              className="liquid-glass-enhanced px-8 py-4 bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="https://github.com/your-username/liquidui"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-enhanced px-8 py-4 bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2 group border border-gray-200/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Components', value: '70+' },
              { label: 'Animations', value: '30+' },
              { label: 'TypeScript', value: '100%' },
              { label: 'Bundle Size', value: '<50KB' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
