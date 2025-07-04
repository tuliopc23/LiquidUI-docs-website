import React, { useState, useCallback, useMemo } from "react";
import { motion, type Variants } from "framer-motion";
// Tree-shaken lucide-react imports (destructured for better tree-shaking)
import { Copy, Check, Code, Eye } from "lucide-react";
import { LiquidifyLogo } from "./LiquidifyLogo";
import { StorybookLogo } from "./StorybookLogo";
import { ViewportMotion, ANIMATION_CONSTANTS } from "./PerformanceOptimizer";

// Utility function for classname merging
function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Custom shouldReduceMotion function
function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Animation variants optimized with spring physics
const showcaseVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      mass: 1,
      staggerChildren: 0.1
    }
  }
};

// Animation variants (removed unused ones to fix linting)

/**
 * Props for the ComponentShowcase component.
 */
interface ComponentShowcaseProps {
  /** The component to be showcased. */
  children: React.ReactNode;
  /** Optional additional CSS classes to apply to the showcase area. */
  className?: string;
  /** The title of the component showcase. */
  title?: string;
  /** A description of the component being showcased. */
  description?: string;
  /** The code snippet to be displayed. */
  code?: string;
  /** Whether to show the code snippet by default. */
  showCode?: boolean;
}

/**
 * A component that showcases other components with an optional code display.
 * Features a glass morphism design with smooth animations and interactive elements.
 *
 * @param children - The component(s) to be showcased
 * @param className - Optional CSS classes for the showcase area
 * @param title - Optional title displayed in the header
 * @param description - Optional description displayed below the title
 * @param code - Optional code snippet to display
 * @param showCode - Whether to show the code snippet by default
 * @returns A styled showcase component with optional code display
 */
export function ComponentShowcase({
  children,
  className,
  title,
  description,
  code,
  showCode = false,
}: ComponentShowcaseProps) {
  const [copied, setCopied] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(showCode);

  const handleCopy = useCallback(async () => {
    if (!code) return;
    
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [code]);
  
  // Removed unused toggleCodeVisibility to fix linting
  
  // Memoize aria label for better accessibility
  const ariaLabel = useMemo(() => {
    return title ? `Component showcase for ${title}` : 'Component showcase';
  }, [title]);

  return (
    <ViewportMotion
      variants={showcaseVariants}
      className="component-showcase group relative overflow-hidden rounded-3xl my-8 glass-card border border-white/20"
      threshold={0.2}
      rootMargin={ANIMATION_CONSTANTS.viewport.lazy}
      once={true}
    >
      <div
        role="region"
        aria-label={ariaLabel}
      >
      {/* Animated background effect for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30 dark:from-blue-400/10 dark:via-transparent dark:to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      {(title || description || code) && (
        <motion.div
          className="relative z-10 liquid-glass border-b border-white/20 dark:border-white/10 px-6 py-4 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          role="banner"
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <div className="flex items-center gap-3">
                  <LiquidifyLogo size={24} />
                  <h3
                    className={cn("text-lg font-semibold text-gray-900 mb-1 hero-text", className?.includes('text-liquid-glass') ? 'text-liquid-glass' : '')}
                    id={`showcase-${title.replace(/\s+/g, "-").toLowerCase()}`}
                  >
                    {title}
                  </h3>
                </div>
              )}
              {description && (
                <p className="text-sm text-gray-700 body-text mt-2">
                  {description}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {code && (
                <div
                  className="flex items-center gap-2"
                  role="toolbar"
                  aria-label="Code actions"
                >
                  <button
                    onClick={() => setIsCodeVisible(!isCodeVisible)}
                    aria-label={
                      isCodeVisible ? "Hide code example" : "Show code example"
                    }
                    aria-expanded={isCodeVisible}
                    aria-controls={
                      title
                        ? `code-${title.replace(/\s+/g, "-").toLowerCase()}`
                        : "code-section"
                    }
                    className="min-w-[44px] min-h-[44px] glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2"
                    type="button"
                  >
                    {isCodeVisible ? (
                      <Eye className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Code className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    onClick={handleCopy}
                    aria-label={
                      copied
                        ? "Code copied to clipboard"
                        : "Copy code to clipboard"
                    }
                    className="min-w-[44px] min-h-[44px] glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2"
                    type="button"
                  >
                    {copied ? (
                      <Check
                        className="w-4 h-4 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy
                        className="w-4 h-4 text-gray-700"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              )}

              {/* Storybook Link */}
              <a
                    href="https://lib.useliquidify.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                aria-label="View component in Storybook"
              >
                <StorybookLogo size={16} className="w-4 h-4" />
                <span className="hidden sm:inline">Storybook</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Component showcase area with proper contrast for visibility */}
      <motion.div
        className={cn(
          "relative z-10 flex flex-wrap gap-4 items-center justify-center p-8 min-h-[120px]",
          // Light mode: bright background for glass components to show
          "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50",
          // Dark mode: darker but visible background
          "dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-800",
          className,
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {children}
      </motion.div>

      {/* Code section */}
      {code && isCodeVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/20 overflow-hidden"
        >
          <div className="relative z-10 liquid-glass bg-gray-50/90 dark:bg-gray-900/90 backdrop-blur-xl p-4 rounded-b-3xl">
            <pre className="text-sm overflow-x-auto">
              <code className="text-gray-900 dark:text-gray-100 font-mono body-text">
                {code}
              </code>
            </pre>
          </div>
        </motion.div>
      )}

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {!shouldReduceMotion() && [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, #3b82f6, #10b981)"
                      : "linear-gradient(135deg, #06b6d4, #34d399)",
                  left: `${15 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  x: 45,
                  y: -30,
                  opacity: 0.5,
                  scale: 0.8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 3 + i * 0.3, // Reduced duration
                  delay: i * 0.6, // Reduced delay
                }}
              />
            ))}

        {/* Background glass orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full animate-glass-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-green-400/10 rounded-full animate-glass-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      </div>
    </ViewportMotion>
  );
}
