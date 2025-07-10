import type { MDXComponents } from 'mdx/types';
import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';
import { withSSRSafety } from './lib/react-compat';
import { Suspense } from 'react';
import {
  GlassFloatingAction,
  GlassSwitch,
  GlassButton,
  GlassCard,
  GlassDropdown,
  GlassTab,
  GlassTabs,
} from './components/ClientComponents';

// Simple fallback component for server-side rendering
function GlassEffect({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <div
      className={`${className} bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg`}
      {...props}
    >
      {children}
    </div>
  );
}

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
  if (typeof text !== 'string') {
    return text;
  }

  let processedText = text;
  Object.entries(emojiMap).forEach(([shortcode, emoji]) => {
    processedText = processedText.replace(new RegExp(shortcode, 'g'), emoji);
  });

  return processedText;
};

// Define named components with proper types
const EnhancedParagraph = withSSRSafety<
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, ...props }) => {
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
});
EnhancedParagraph.displayName = 'EnhancedParagraph';

const EnhancedListItem = withSSRSafety<React.HTMLAttributes<HTMLLIElement>>(
  ({ children, ...props }) => {
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
  }
);
EnhancedListItem.displayName = 'EnhancedListItem';

const EnhancedImage = withSSRSafety<React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ src, alt, ...props }) => (
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
  )
);
EnhancedImage.displayName = 'EnhancedImage';

const EnhancedPreCode = withSSRSafety<React.HTMLAttributes<HTMLPreElement>>(
  ({ children, ...props }) => (
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
  )
);
EnhancedPreCode.displayName = 'EnhancedPreCode';

const EnhancedInlineCode = withSSRSafety<React.HTMLAttributes<HTMLElement>>(
  ({ children, ...props }) => (
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
  )
);
EnhancedInlineCode.displayName = 'EnhancedInlineCode';

const EnhancedBlockquote: React.FC<React.HTMLAttributes<HTMLQuoteElement>> = ({
  children,
  ...props
}) => (
  <GlassEffect
    as='blockquote'
    variant='card'
    className='border-l-4 border-apple-blue pl-4 py-3 my-6 hig-body italic'
    {...(props as Record<string, unknown>)}
  >
    {children}
  </GlassEffect>
);
EnhancedBlockquote.displayName = 'EnhancedBlockquote';

const EnhancedTable: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({
  children,
  ...props
}) => (
  <div className='overflow-x-auto my-6'>
    <GlassEffect variant='card' className='w-full overflow-hidden'>
      <table className='w-full' {...props}>
        {children}
      </table>
    </GlassEffect>
  </div>
);
EnhancedTable.displayName = 'EnhancedTable';

const EnhancedTableHeader: React.FC<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>
> = ({ children, ...props }) => (
  <th
    {...props}
    className='px-4 py-3 text-left hig-headline bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-white/5'
  >
    {children}
  </th>
);
EnhancedTableHeader.displayName = 'EnhancedTableHeader';

const EnhancedTableData: React.FC<
  React.TdHTMLAttributes<HTMLTableDataCellElement>
> = ({ children, ...props }) => (
  <td
    {...props}
    className='px-4 py-3 hig-body border-b border-white/10 dark:border-white/5'
  >
    {children}
  </td>
);
EnhancedTableData.displayName = 'EnhancedTableData';

const EnhancedH1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h1
    {...props}
    className='hig-large-title font-bold mb-6 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'
  >
    {children}
  </h1>
);
EnhancedH1.displayName = 'EnhancedH1';

const EnhancedH2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h2
    {...props}
    className='hig-title-1 font-bold mb-4 mt-8 bg-gradient-to-r from-apple-blue to-apple-purple bg-clip-text text-transparent'
  >
    {children}
  </h2>
);
EnhancedH2.displayName = 'EnhancedH2';

const EnhancedH3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h3
    {...props}
    className='hig-title-2 font-semibold mb-3 mt-6 text-apple-gray-700 dark:text-apple-gray-200'
  >
    {children}
  </h3>
);
EnhancedH3.displayName = 'EnhancedH3';

const EnhancedH4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h4
    {...props}
    className='hig-title-3 font-semibold mb-2 mt-4 text-apple-gray-700 dark:text-apple-gray-200'
  >
    {children}
  </h4>
);
EnhancedH4.displayName = 'EnhancedH4';

const EnhancedH5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h5
    {...props}
    className='hig-headline mb-2 mt-3 text-apple-gray-700 dark:text-apple-gray-200'
  >
    {children}
  </h5>
);
EnhancedH5.displayName = 'EnhancedH5';

const EnhancedH6: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  ...props
}) => (
  <h6
    {...props}
    className='hig-callout font-semibold mb-1 mt-2 text-apple-gray-700 dark:text-apple-gray-200'
  >
    {children}
  </h6>
);
EnhancedH6.displayName = 'EnhancedH6';

// Custom components with glassmorphism styling
const customComponents: MDXComponents = {
  // Enhanced paragraph with Apple HIG typography
  p: EnhancedParagraph,

  // Enhanced list items with Apple HIG typography
  li: EnhancedListItem,

  // Enhanced images with liquid glass
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: EnhancedImage as any,

  // Enhanced code blocks with liquid glass
  pre: EnhancedPreCode,

  // Enhanced inline code
  code: EnhancedInlineCode,

  // Enhanced blockquotes with liquid glass
  blockquote: EnhancedBlockquote,

  // Enhanced tables with liquid glass
  table: EnhancedTable,

  th: EnhancedTableHeader,

  td: EnhancedTableData,

  // Enhanced headings with Apple HIG typography
  h1: EnhancedH1,

  h2: EnhancedH2,

  h3: EnhancedH3,

  h4: EnhancedH4,

  h5: EnhancedH5,

  h6: EnhancedH6,

  // Make liquidify components available globally in MDX
  GlassFloatingAction,
  GlassSwitch,
  GlassButton,
  GlassCard,
  GlassDropdown,
  GlassTab,
  GlassTabs,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...getDocsMDXComponents(),
    ...customComponents,
    ...components,
  } as MDXComponents;
}

export default customComponents;
