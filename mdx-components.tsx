import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import GlassEffect from './components/ui/GlassEffect';
import { withSSRSafety } from './lib/react-compat';
import { Suspense } from 'react';

// Emoji mapping for common shortcodes
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
  ':crystal_ball:': '🔮',
};

// Enhanced text processing to handle emoji shortcodes
const processEmojiText = (text: string): string => {
  if (typeof text !== 'string') return text;

  let processedText = text;
  Object.entries(emojiMap).forEach(([shortcode, emoji]) => {
    processedText = processedText.replace(new RegExp(shortcode, 'g'), emoji);
  });

  return processedText;
};

// Custom components with glassmorphism styling
const customComponents: MDXComponents = {
  // Enhanced paragraph with Apple HIG typography
  p: withSSRSafety(({ children, ...props }) => {
    if (typeof children === 'string') {
      return (
        <p {...props} className='hig-body mb-4'>
          {processEmojiText(children)}
        </p>
      );
    }
    return (
      <p {...props} className='hig-body mb-4'>
        {children}
      </p>
    );
  }),

  // Enhanced list items with Apple HIG typography
  li: withSSRSafety(({ children, ...props }) => {
    if (typeof children === 'string') {
      return (
        <li {...props} className='hig-body mb-1'>
          {processEmojiText(children)}
        </li>
      );
    }
    return (
      <li {...props} className='hig-body mb-1'>
        {children}
      </li>
    );
  }),

  // Enhanced images with liquid glass
  img: withSSRSafety(({ src, alt, ...props }) => (
    <Suspense
      fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}
    >
      <GlassEffect variant='card' className='my-6 p-2'>
        <img
          src={src}
          alt={alt}
          loading='lazy'
          className='rounded-apple-lg max-w-full h-auto'
          {...props}
        />
      </GlassEffect>
    </Suspense>
  )),

  // Enhanced code blocks with liquid glass
  pre: withSSRSafety(({ children, ...props }) => (
    <div className='relative group my-6'>
      <Suspense
        fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}
      >
        <GlassEffect variant='card' className='p-4'>
          <pre
            {...props}
            className='overflow-x-auto hig-caption-1 font-mono bg-transparent'
          >
            {children}
          </pre>
        </GlassEffect>
      </Suspense>
    </div>
  )),

  // Enhanced inline code
  code: withSSRSafety(({ children, ...props }) => (
    <Suspense
      fallback={
        <span className='animate-pulse bg-gray-200 rounded px-2 py-1'>...</span>
      }
    >
      <GlassEffect
        variant='button'
        className='inline-flex px-1.5 py-0.5 hig-caption-1 font-mono'
        hover={false}
        animated={false}
        {...props}
      >
        {children}
      </GlassEffect>
    </Suspense>
  )),

  // Enhanced blockquotes with liquid glass
  blockquote: ({ children, ...props }) => (
    <GlassEffect
      variant='card'
      className='border-l-4 border-apple-blue pl-4 py-3 my-6 hig-body italic'
      {...props}
    >
      {children}
    </GlassEffect>
  ),

  // Enhanced tables with liquid glass
  table: ({ children, ...props }) => (
    <div className='overflow-x-auto my-6'>
      <GlassEffect variant='card' className='w-full overflow-hidden'>
        <table className='w-full' {...props}>
          {children}
        </table>
      </GlassEffect>
    </div>
  ),

  th: ({ children, ...props }) => (
    <th
      {...props}
      className='px-4 py-3 text-left hig-headline bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-white/5'
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }) => (
    <td
      {...props}
      className='px-4 py-3 hig-body border-b border-white/10 dark:border-white/5'
    >
      {children}
    </td>
  ),

  // Enhanced headings with Apple HIG typography
  h1: ({ children, ...props }) => (
    <h1
      {...props}
      className='hig-large-title font-bold mb-6 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'
    >
      {children}
    </h1>
  ),

  h2: ({ children, ...props }) => (
    <h2
      {...props}
      className='hig-title-1 font-bold mb-4 mt-8 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3
      {...props}
      className='hig-title-2 font-semibold mb-3 mt-6 text-apple-gray-700 dark:text-apple-gray-200'
    >
      {children}
    </h3>
  ),

  h4: ({ children, ...props }) => (
    <h4
      {...props}
      className='hig-title-3 font-semibold mb-2 mt-4 text-apple-gray-700 dark:text-apple-gray-200'
    >
      {children}
    </h4>
  ),

  h5: ({ children, ...props }) => (
    <h5
      {...props}
      className='hig-headline mb-2 mt-3 text-apple-gray-700 dark:text-apple-gray-200'
    >
      {children}
    </h5>
  ),

  h6: ({ children, ...props }) => (
    <h6
      {...props}
      className='hig-callout font-semibold mb-1 mt-2 text-apple-gray-700 dark:text-apple-gray-200'
    >
      {children}
    </h6>
  ),
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...getDocsMDXComponents(),
    ...customComponents,
    ...components,
  };
}

export default customComponents;
