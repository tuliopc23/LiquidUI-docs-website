import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Code2, Eye, RotateCcw } from 'lucide-react';
import { cn } from 'liquidify';

interface CodePlaygroundProps {
  code: string;
  preview?: React.ReactNode;
  language?: string;
  title?: string;
  description?: string;
  showLineNumbers?: boolean;
  editable?: boolean;
  dependencies?: Record<string, string>;
}

export function CodePlayground({
  code,
  preview,
  language = 'tsx',
  title,
  description,
  showLineNumbers = true,
  editable = false,
}: CodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [editableCode, setEditableCode] = useState(code);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setEditableCode(code);
  };

  const formatCode = (codeStr: string) => {
    const lines = codeStr.trim().split('\n');
    return lines.map((line, i) => (
      <div key={i} className="table-row">
        {showLineNumbers && (
          <div className="table-cell pr-4 text-gray-500 dark:text-gray-400 select-none text-right min-w-[2rem]">
            {i + 1}
          </div>
        )}
        <div className="table-cell">
          <pre className="m-0">
            <code className={`language-${language}`}>{line || ' '}</code>
          </pre>
        </div>
      </div>
    ));
  };

  return (
    <div className={cn(
      "backdrop-blur-xl bg-white/10 dark:bg-white/5",
      "border border-white/20 dark:border-white/10",
      "rounded-2xl overflow-hidden shadow-xl",
      "my-6"
    )}>
      {/* Header */}
      {(title || description) && (
        <div className="px-6 py-4 border-b border-white/10">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              activeTab === 'preview'
                ? "bg-white/20 dark:bg-white/10 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
            )}
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
              activeTab === 'code'
                ? "bg-white/20 dark:bg-white/10 text-gray-900 dark:text-white"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/10"
            )}
          >
            <Code2 className="w-4 h-4" />
            Code
          </button>
        </div>

        <div className="flex items-center gap-2">
          {editable && editableCode !== code && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              title="Reset code"
            >
              <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Copy code"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="check"
                >
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="copy"
                >
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'preview' ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-8"
          >
            {preview || (
              <div className="text-center text-gray-500 dark:text-gray-400">
                No preview available
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="code"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto"
          >
            {editable ? (
              <textarea
                value={editableCode}
                onChange={(e) => setEditableCode(e.target.value)}
                className={cn(
                  "w-full p-6 bg-transparent resize-none",
                  "font-mono text-sm text-gray-800 dark:text-gray-200",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500/20 rounded-lg"
                )}
                style={{ minHeight: '200px' }}
                spellCheck={false}
              />
            ) : (
              <div className="p-6 font-mono text-sm">
                <div className="table w-full">
                  {formatCode(editableCode)}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Editor Integration Point */}
      {activeTab === 'preview' && editable && (
        <div className="px-6 py-3 border-t border-white/10 bg-blue-500/10">
          <p className="text-xs text-blue-600 dark:text-blue-400">
            💡 Switch to Code tab to edit and see live changes
          </p>
        </div>
      )}
    </div>
  );
}

// Export utilities for MDX usage
export function Playground({ children, ...props }: CodePlaygroundProps & { children?: React.ReactNode }) {
  return <CodePlayground {...props} preview={children} />;
}