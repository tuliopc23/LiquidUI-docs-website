import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { ClipboardIcon, CheckIcon } from '@heroicons/react/outline'
import { GlassCard } from './ui/GlassCard'

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  fileName?: string
  highlightLines?: number[]
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  fileName,
  highlightLines = []
}) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  // Custom syntax highlighter theme
  const customStyle = {
    ...atomDark,
    'pre[class*="language-"]': {
      ...atomDark['pre[class*="language-"]'],
      background: 'transparent',
      margin: 0,
      padding: '1.5rem',
      overflow: 'auto',
      borderRadius: '0.75rem'
    },
    'code[class*="language-"]': {
      ...atomDark['code[class*="language-"]'],
      background: 'transparent',
      textShadow: 'none',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.9rem'
    }
  }
  
  return (
    <GlassCard 
      variant="subtle" 
      className="overflow-hidden"
      hoverEffect={false}
    >
      {fileName && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <span className="text-sm font-medium">{fileName}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      
      <div className="relative">
        {!fileName && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 transition-colors z-10"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-green-500" />
            ) : (
              <ClipboardIcon className="w-4 h-4" />
            )}
          </button>
        )}
        
        <SyntaxHighlighter
          language={language}
          style={customStyle}
          showLineNumbers={showLineNumbers}
          wrapLines={true}
          lineProps={lineNumber => {
            const style: React.CSSProperties = { display: 'block' }
            if (highlightLines.includes(lineNumber)) {
              style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
              style.borderLeft = '3px solid var(--color-primary-400)'
              style.paddingLeft = '1rem'
            }
            return { style }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </GlassCard>
  )
}

export default CodeBlock