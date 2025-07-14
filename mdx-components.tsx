import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { Suspense } from 'react';

// Enhanced SSR-safe glass effect component for MDX components
function GlassEffect({
  children,
  className = '',
  as: Component = 'div',
  variant = 'default',
  hover = true,
  animated = true,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: string;
  variant?: string;
  hover?: boolean;
  animated?: boolean;
  [key: string]: unknown;
}) {
  const Element = Component as React.ElementType;

  // Enhanced glass styling based on variant
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'card':
        return 'bg-white/15 dark:bg-black/15 rounded-xl p-4';
      case 'button':
        return 'inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium';
      case 'panel':
        return 'bg-white/10 dark:bg-black/10 rounded-2xl p-6';
      default:
        return 'bg-white/12 dark:bg-black/12 rounded-lg';
    }
  };

  const hoverClasses = hover
    ? 'transition-all duration-300 hover:scale-[1.02]'
    : '';
  const animatedClasses = animated ? 'animate-spring-entrance' : '';

  return (
    <Element
      className={`${getVariantClasses(variant)} ${hoverClasses} ${animatedClasses} ${className}`}
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        boxShadow: `
          0 8px 32px rgba(31, 38, 135, 0.2),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `,
      }}
      {...props}
    >
      {children}
    </Element>
  );
}

// Enhanced text processing
const processEmojiText = (text: string): string => {
  if (typeof text !== 'string') {
    return text;
  }
  // Simple emoji replacements
  return text
    .replace(':rocket:', '🚀')
    .replace(':sparkles:', '✨')
    .replace(':fire:', '🔥')
    .replace(':check:', '✅')
    .replace(':x:', '❌');
};

// Enhanced components with glassmorphism styling
const EnhancedParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => {
  if (typeof children === 'string') {
    return (
      <p {...props} className='mb-4'>
        {processEmojiText(children)}
      </p>
    );
  }
  return (
    <p {...props} className='mb-4'>
      {children}
    </p>
  );
};

const EnhancedImage = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <Suspense fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}>
    <GlassEffect variant='card' className='my-6 p-2'>
      <img
        src={src}
        alt={alt}
        loading='lazy'
        className='rounded-lg max-w-full h-auto'
        {...props}
      />
    </GlassEffect>
  </Suspense>
);

const EnhancedPreCode = ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
  <div className='relative group my-6'>
    <Suspense fallback={<div className='animate-pulse bg-gray-200 rounded-lg h-20' />}>
      <GlassEffect variant='card' className='p-4'>
        <pre
          {...props}
          className='overflow-x-auto font-mono bg-transparent'
        >
          {children}
        </pre>
      </GlassEffect>
    </Suspense>
  </div>
);

const EnhancedInlineCode = ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <Suspense fallback={<span className='animate-pulse bg-gray-200 rounded px-2 py-1'>...</span>}>
    <GlassEffect
      variant='button'
      className='inline-flex px-1.5 py-0.5 text-sm font-mono'
      hover={false}
      animated={false}
      {...props}
    >
      {children}
    </GlassEffect>
  </Suspense>
);

const EnhancedBlockquote = ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
  <GlassEffect
    as='blockquote'
    variant='card'
    className='border-l-4 border-blue-400 pl-4 py-3 my-6 italic'
    {...(props as Record<string, unknown>)}
  >
    {children}
  </GlassEffect>
);

const EnhancedTable = ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className='overflow-x-auto my-6'>
    <GlassEffect variant='card' className='w-full overflow-hidden'>
      <table className='w-full' {...props}>
        {children}
      </table>
    </GlassEffect>
  </div>
);

const EnhancedTableHeader = ({ children, ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
  <th
    {...props}
    className='px-4 py-3 text-left font-semibold bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-white/5'
  >
    {children}
  </th>
);

const EnhancedTableData = ({ children, ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
  <td
    {...props}
    className='px-4 py-3 border-b border-white/10 dark:border-white/5'
  >
    {children}
  </td>
);

// Enhanced headings
const EnhancedH1 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    {...props}
    className='text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
  >
    {children}
  </h1>
);

const EnhancedH2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    {...props}
    className='text-3xl font-bold mb-4 mt-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
  >
    {children}
  </h2>
);

const EnhancedH3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    {...props}
    className='text-2xl font-semibold mb-3 mt-6 text-gray-700 dark:text-gray-200'
  >
    {children}
  </h3>
);

// Custom components with glassmorphism styling
const customComponents: MDXComponents = {
  // Enhanced HTML elements
  p: EnhancedParagraph,
  img: EnhancedImage,
  pre: EnhancedPreCode,
  code: EnhancedInlineCode,
  blockquote: EnhancedBlockquote,
  table: EnhancedTable,
  th: EnhancedTableHeader,
  td: EnhancedTableData,
  h1: EnhancedH1,
  h2: EnhancedH2,
  h3: EnhancedH3,
  
  // Glass effect component available in MDX
  GlassEffect,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...getDocsMDXComponents(),
    ...customComponents,
    ...components,
  } as MDXComponents;
}

export default customComponents;