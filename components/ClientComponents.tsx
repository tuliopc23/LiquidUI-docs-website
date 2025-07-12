'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useState, useEffect } from 'react';

// Create fallback components for components that might not exist in liquidify
// Note: Currently unused but kept for future extensibility
// function createFallbackComponent(componentName: string) {
//   return function FallbackComponent(props: Record<string, unknown>) {
//     return (
//       <div className='p-4 bg-yellow-100 border border-yellow-300 rounded-lg'>
//         <p className='text-yellow-800'>
//           {componentName} component not available. This is a placeholder for
//           documentation purposes.
//         </p>
//         {props.children && <div className='mt-2'>{props.children}</div>}
//       </div>
//     );
//   };
// }

// Dynamically import liquidify components to avoid SSR issues
const LiquidGlassProvider = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.LiquidGlassProvider })),
  {
    ssr: false,
    loading: () => <div className='contents' />,
  }
);

const GlassBackground = dynamic(() => import('./ui/GlassBackground'), {
  ssr: false,
  loading: () => null,
});

// Export properly typed liquidify components with SSR safety
export const GlassFloatingAction = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassFloatingAction })),
  {
    ssr: false,
    loading: () => (
      <div
        className='fixed bottom-4 right-4 w-14 h-14 apple-liquid-glass rounded-full flex items-center justify-center text-white glass-magnetic animate-float'
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(59, 130, 246, 0.3)',
          boxShadow: `
            0 8px 32px rgba(31, 38, 135, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.4)
          `,
        }}
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12 5V19M5 12H19'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    ),
  }
);

export const GlassSwitch = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassSwitch })),
  {
    ssr: false,
    loading: () => (
      <div
        className='w-10 h-6 apple-liquid-glass rounded-full relative glass-magnetic cursor-pointer'
        style={{
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          background: 'rgba(120, 120, 128, 0.3)',
          boxShadow: `
            inset 0 2px 4px rgba(0, 0, 0, 0.2),
            0 4px 8px rgba(31, 38, 135, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        <div
          className='w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform duration-300 ease-spring'
          style={{
            boxShadow:
              '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
          }}
        />
      </div>
    ),
  }
);

export const GlassButton = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassButton })),
  {
    ssr: false,
    loading: () => (
      <button
        className='glass-button px-4 py-2 text-white rounded-lg glass-magnetic glass-focus relative overflow-hidden'
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(59, 130, 246, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 8px 32px rgba(31, 38, 135, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4)
          `,
        }}
      >
        <span className='relative z-10 font-medium'>Loading...</span>
        <div
          className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'
          style={{
            background:
              'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)',
          }}
        />
      </button>
    ),
  }
);

export const GlassCard = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassCard })),
  {
    ssr: false,
    loading: () => (
      <div
        className='glass-card p-6 rounded-xl glass-magnetic animate-spring-entrance relative overflow-hidden'
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 8px 32px rgba(31, 38, 135, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        <div className='animate-shimmer h-4 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded mb-3' />
        <div className='animate-shimmer h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded mb-2 w-3/4' />
        <div className='animate-shimmer h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded w-1/2' />
        <div
          className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none'
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>
    ),
  }
);

// Enhanced GlassDropdown component with liquid glass styling
export function GlassDropdown({
  trigger,
  content,
  children,
}: {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className='relative inline-block'>
      <div
        className='apple-liquid-glass p-4 rounded-xl glass-magnetic animate-spring-entrance relative overflow-hidden'
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: `
            0 8px 32px rgba(31, 38, 135, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
        }}
      >
        <p className='text-white/90 text-sm mb-3 font-medium'>
          <span className='text-blue-200'>✨ GlassDropdown Demo</span> -
          Interactive showcase component
        </p>
        {trigger && (
          <div className='mb-2'>
            <span className='text-white/70 text-xs uppercase tracking-wider'>
              Trigger:
            </span>
            <div className='mt-1'>{trigger}</div>
          </div>
        )}
        {content && (
          <div className='mt-3'>
            <span className='text-white/70 text-xs uppercase tracking-wider'>
              Content:
            </span>
            <div className='mt-1'>{content}</div>
          </div>
        )}
        {children}
        <div
          className='absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none'
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, transparent 60%)',
          }}
        />
      </div>
    </div>
  );
}

// Enhanced GlassTab component with liquid glass styling
export function GlassTab({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className='glass-button px-4 py-2 rounded-lg glass-magnetic glass-focus relative overflow-hidden transition-all duration-300'
      style={{
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',
        background: 'rgba(255, 255, 255, 0.12)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `
          0 4px 16px rgba(31, 38, 135, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `,
      }}
      {...props}
    >
      <span className='relative z-10 text-white/90 font-medium'>
        {children}
      </span>
      <div
        className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300'
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)',
        }}
      />
    </button>
  );
}

export function GlassTabs({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className='flex space-x-1 p-1 apple-liquid-glass rounded-xl glass-magnetic animate-spring-entrance relative overflow-hidden'
      style={{
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `
          0 6px 24px rgba(31, 38, 135, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.1),
          inset 0 1px 0 rgba(255, 255, 255, 0.2)
        `,
      }}
      {...props}
    >
      {children}
      <div
        className='absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none'
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

interface ClientWrapperProps {
  children: ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ display: 'contents' }}>{children}</div>;
  }

  return (
    <LiquidGlassProvider>
      <GlassBackground variant='gradient' animated={true}>
        {children}
      </GlassBackground>
    </LiquidGlassProvider>
  );
}

export default ClientWrapper;
