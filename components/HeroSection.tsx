import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-gray-900">
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-gray-800/50 dark:to-transparent" />
      
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 mb-8 shadow-sm"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Now available: LiquidUI v0.17</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 rounded-full">Stable</span>
          </motion.div>
          
          <div className="mb-12 max-w-4xl mx-auto">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight"
              style={{ lineHeight: '1.1' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <span className="block mb-4">LiquidUI</span>
              <span className="block bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Component Library
              </span>
            </motion.h1>
            
            <motion.p 
              className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              A modern React component library with glassmorphism design and physics-based interactions. 
              Build beautiful, accessible UIs with pre-built components and customizable themes.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16 button-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <a
              href="/getting-started"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-blue-500 border border-transparent rounded-xl shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
            </a>
            <a
              href="https://github.com/tuliopc23/LiquidUI-docs-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </motion.div>
          
          <motion.div 
            className="relative w-full max-w-6xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-200/70 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: 'spring' }}
          >
            <div className="p-1">
              <div className="relative aspect-video bg-gray-50 dark:bg-gray-900/50 rounded-xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-2xl font-semibold text-gray-400 dark:text-gray-600 mb-3">Component Showcase</div>
                  <p className="text-gray-500 dark:text-gray-500 mb-8">Interactive component demos will appear here</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                    {[
                      { label: 'Components', value: '30+' },
                      { label: 'Themes', value: '3' },
                      { label: 'TypeScript', value: '100%' },
                      { label: 'Tree Shakable', value: 'Yes' },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className="text-center"
                      >
                        <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
  );
}
