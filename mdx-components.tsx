import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as useNextraMDXComponents } from 'nextra/mdx'

// Emoji mapping for common shortcodes (equivalent to remark-emoji)
const emojiMap: Record<string, string> = {
  ':rocket:': '🚀',
  ':heart:': '❤️',
  ':sparkles:': '✨',
  ':wave:': '👋',
  ':fire:': '🔥',
  ':tada:': '🎉',
  ':thumbsup:': '👍',
  ':thumbsdown:': '👎',
  ':warning:': '⚠️',
  ':information_source:': 'ℹ️',
  ':check:': '✅',
  ':x:': '❌',
  ':bulb:': '💡',
  ':gear:': '⚙️',
  ':mag:': '🔍',
  ':lock:': '🔒',
  ':unlock:': '🔓',
  ':key:': '🔑',
  ':eyes:': '👀',
  ':zap:': '⚡',
  ':star:': '⭐',
  ':diamond_shape_with_a_dot_inside:': '💠',
  ':crystal_ball:': '🔮'
}

// Enhanced text processing to handle emoji shortcodes
const processEmojiText = (text: string): string => {
  if (typeof text !== 'string') return text
  
  let processedText = text
  Object.entries(emojiMap).forEach(([shortcode, emoji]) => {
    processedText = processedText.replace(new RegExp(shortcode, 'g'), emoji)
  })
  
  return processedText
}

// Custom components with emoji support
const customComponents: MDXComponents = {
  // Enhanced paragraph with emoji processing
  p: ({ children, ...props }) => {
    if (typeof children === 'string') {
      return <p {...props}>{processEmojiText(children)}</p>
    }
    return <p {...props}>{children}</p>
  },
  
  // Let Nextra handle headings, only process emoji in text content
  // Remove h1, h2, h3 overrides to avoid typography conflicts
  
  // Enhanced list items with emoji processing
  li: ({ children, ...props }) => {
    if (typeof children === 'string') {
      return <li {...props}>{processEmojiText(children)}</li>
    }
    return <li {...props}>{children}</li>
  },

  // Custom components for enhanced UX
  img: ({ src, alt, ...props }) => (
    <img 
      src={src} 
      alt={alt} 
      loading="lazy"
      style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
      {...props} 
    />
  ),
  
  // Enhanced code blocks
  pre: ({ children, ...props }) => (
    <div className="relative group">
      <pre {...props} className="relative overflow-x-auto rounded-xl bg-gray-50 dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-700">
        {children}
      </pre>
    </div>
  ),
  
  // Enhanced inline code
  code: ({ children, ...props }) => (
    <code 
      {...props} 
      className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-sm font-mono border border-gray-200 dark:border-gray-700"
    >
      {children}
    </code>
  ),
  
  // Enhanced blockquotes
  blockquote: ({ children, ...props }) => (
    <blockquote 
      {...props} 
      className="border-l-4 border-blue-500 pl-4 my-4 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg"
    >
      {children}
    </blockquote>
  ),
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...useNextraMDXComponents(components),
    ...customComponents,
  }
}

export default customComponents
