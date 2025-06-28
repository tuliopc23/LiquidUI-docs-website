import React, { useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@tuliocunha23/liquidui";
// Tree-shaken lucide-react imports (destructured for better tree-shaking)
import { Copy, Check, Code, Eye } from "lucide-react";

// Dynamic import for framer-motion components
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false },
);

const MotionHeader = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false },
);

const MotionShowcase = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false },
);

const MotionCodeSection = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false },
);

const MotionParticle = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  { ssr: false },
);

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

  const handleCopy = async () => {
    if (code) {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="component-showcase group relative overflow-hidden rounded-3xl my-8 glass-card border border-white/20"
    >
      {/* Animated background effect with light mode gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/40 to-green-50/80 opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-transparent to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      {(title || description || code) && (
        <MotionHeader
          className="relative z-10 liquid-glass border-b border-white/20 px-6 py-4 bg-white/20 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          role="banner"
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 ios-logo apple-gradient animate-liquid-morph"></div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-1 hero-text"
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
                  className="glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2"
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
                  className="glass-button p-2 rounded-2xl hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2"
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
          </div>
        </MotionHeader>
      )}

      {/* Component showcase area with light background for better glassmorphism visibility */}
      <MotionShowcase
        className={cn(
          "relative z-10 flex flex-wrap gap-4 items-center justify-center p-8 min-h-[120px]",
          // Force light theme with colorful gradient background for glassmorphism visibility
          "bg-gradient-to-br from-blue-50 via-purple-25 to-cyan-50",
          "dark:bg-gradient-to-br dark:from-blue-50 dark:via-purple-900 dark:to-cyan-900",
          className,
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        {children}
      </MotionShowcase>

      {/* Code section */}
      {code && isCodeVisible && (
        <MotionCodeSection
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/20 overflow-hidden"
        >
          <div className="relative z-10 liquid-glass bg-gray-900/90 backdrop-blur-xl p-4 rounded-b-3xl">
            <pre className="text-sm overflow-x-auto">
              <code className="text-gray-100 font-mono body-text">{code}</code>
            </pre>
          </div>
        </MotionCodeSection>
      )}

      {/* Enhanced floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <MotionParticle
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
              x: [0, 60, 0],
              y: [0, -40, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
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
    </MotionDiv>
  );
}
