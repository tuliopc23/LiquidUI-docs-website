import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { cn } from 'glass-ui-tulio';
// Tree-shaken lucide-react imports (destructured for better tree-shaking)
import { Copy, Check, Code, Eye } from 'lucide-react';

// Dynamic import for framer-motion components
const MotionDiv = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
);

const MotionHeader = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
);

const MotionShowcase = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
);

const MotionCodeSection = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
);

const MotionParticle = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.div })),
  { ssr: false }
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
  showCode = false
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
      className="component-showcase group relative overflow-hidden rounded-xl my-8"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      {(title || description || code) && (
        <MotionHeader
          className="glass-effect border-b border-white/10 px-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          role="banner"
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-foreground mb-1" id={`showcase-${title.replace(/\s+/g, '-').toLowerCase()}`}>
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            {code && (
              <div className="flex items-center gap-2" role="toolbar" aria-label="Code actions">
                <button
                  onClick={() => setIsCodeVisible(!isCodeVisible)}
                  aria-label={isCodeVisible ? "Hide code example" : "Show code example"}
                  aria-expanded={isCodeVisible}
                  aria-controls={title ? `code-${title.replace(/\s+/g, '-').toLowerCase()}` : 'code-section'}
                  className="p-2 rounded-md hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
                  aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
                  className="p-2 rounded-md hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  type="button"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" aria-hidden="true" />
                  ) : (
                    <Copy className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            )}
          </div>
        </MotionHeader>
      )}

      {/* Component showcase area */}
      <MotionShowcase
        className={cn(
          "relative z-10 flex flex-wrap gap-4 items-center justify-center p-8 min-h-[120px]",
          className
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
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/10 overflow-hidden"
        >
          <div className="glass-effect/50 p-4">
            <pre className="text-sm overflow-x-auto">
              <code className="text-muted-foreground font-mono">
                {code}
              </code>
            </pre>
          </div>
        </MotionCodeSection>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <MotionParticle
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${20 + i * 30}%`,
              top: `${50 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </MotionDiv>
  );
}
