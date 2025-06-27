import React, { useState } from 'react';
import { cn } from 'glass-ui-tulio';
import { motion } from 'framer-motion';
import { Copy, Check, Code, Eye } from 'lucide-react';

interface ComponentShowcaseProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  code?: string;
  showCode?: boolean;
}

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="component-showcase group relative overflow-hidden rounded-xl my-8"
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Header */}
      {(title || description || code) && (
        <motion.div
          className="glass-effect border-b border-white/10 px-6 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-foreground mb-1">
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
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCodeVisible(!isCodeVisible)}
                  className="glass-effect p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={isCodeVisible ? "Hide code" : "Show code"}
                >
                  {isCodeVisible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <Code className="w-4 h-4" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopy}
                  className="glass-effect p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Component showcase area */}
      <motion.div
        className={cn(
          "relative z-10 flex flex-wrap gap-4 items-center justify-center p-8 min-h-[120px]",
          className
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
        </motion.div>
      )}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
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
    </motion.div>
  );
}
