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

// Export commonly used liquidify components with SSR safety
export const GlassFloatingAction = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassFloatingAction })),
  {
    ssr: false,
    loading: () => (
      <div className='w-14 h-14 bg-gray-200 rounded-full animate-pulse' />
    ),
  }
);

export const GlassSwitch = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassSwitch })),
  {
    ssr: false,
    loading: () => (
      <div className='w-10 h-6 bg-gray-200 rounded-full animate-pulse' />
    ),
  }
);

export const GlassButton = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassButton })),
  {
    ssr: false,
    loading: () => (
      <div className='px-4 py-2 bg-gray-200 rounded-lg animate-pulse' />
    ),
  }
);

export const GlassCard = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassCard })),
  {
    ssr: false,
    loading: () => <div className='p-4 bg-gray-200 rounded-lg animate-pulse' />,
  }
);

// Create a local GlassDropdown component since it might not exist in liquidify
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
      <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
        <p className='text-blue-800 text-sm mb-2'>
          <strong>GlassDropdown Demo</strong> - This is a placeholder component
          for documentation purposes.
        </p>
        <div>
          <strong>Trigger:</strong> {trigger}
        </div>
        {content && (
          <div className='mt-2'>
            <strong>Content:</strong> {content}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export const GlassTab = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassTabs })),
  {
    ssr: false,
    loading: () => (
      <div className='px-4 py-2 bg-gray-200 rounded-lg animate-pulse' />
    ),
  }
);

export const GlassTabs = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.GlassTabs })),
  {
    ssr: false,
    loading: () => (
      <div className='w-full bg-gray-200 rounded-lg animate-pulse h-10' />
    ),
  }
);

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
