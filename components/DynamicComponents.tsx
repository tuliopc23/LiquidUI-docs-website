import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

// Loading component for all dynamic imports
const DynamicLoading = ({ name }: { name: string }) => (
  <div className="animate-pulse">
    <LoadingSkeleton className="h-48 w-full rounded-ds" />
    <div className="mt-4 space-y-2">
      <LoadingSkeleton className="h-4 w-3/4" />
      <LoadingSkeleton className="h-4 w-1/2" />
    </div>
    <p className="text-xs text-gray-500 mt-2">Loading {name}...</p>
  </div>
);

// Dynamic imports for heavy components with SSR disabled
export const DynamicCodePlayground = dynamic(
  () => import('./CodePlayground').then(mod => ({ default: mod.CodePlayground })),
  {
    ssr: false,
    loading: () => <DynamicLoading name="Code Playground" />,
  }
);

export const DynamicComponentShowcase = dynamic(
  () => import('./ComponentShowcase').then(mod => ({ default: mod.ComponentShowcase })),
  {
    ssr: false,
    loading: () => <DynamicLoading name="Component Showcase" />,
  }
);

export const DynamicThemeCustomizer = dynamic(
  () => import('./ThemeCustomizer').then(mod => ({ default: mod.ThemeCustomizer })),
  {
    ssr: false,
    loading: () => <DynamicLoading name="Theme Customizer" />,
  }
);

export const DynamicApiExplorer = dynamic(
  () => import('./ApiExplorer').then(mod => ({ default: mod.ApiExplorer })),
  {
    ssr: false,
    loading: () => <DynamicLoading name="API Explorer" />,
  }
);

// Note: Removed DynamicEnhancedAnimationsDemo and DynamicGlassComponents 
// to focus on essential dynamic imports only

// Wrapper component with error boundary for heavy playground components
interface DynamicPlaygroundWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const DynamicPlaygroundWrapper: React.FC<DynamicPlaygroundWrapperProps> = ({ 
  children, 
  fallback = <DynamicLoading name="Playground Component" /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      <React.Suspense fallback={fallback}>
        {children}
      </React.Suspense>
    </Suspense>
  );
};

// Note: Removed React.lazy imports due to complex module exports
// Use direct imports for these components as they are already optimized

// HOC for wrapping components with Suspense
export function withSuspense<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function SuspenseWrapper(props: P) {
    return (
      <Suspense fallback={fallback || <DynamicLoading name="Component" />}>
        <Component {...props} />
      </Suspense>
    );
  };
}

const DynamicComponentsExports = {
  DynamicCodePlayground,
  DynamicComponentShowcase,
  DynamicThemeCustomizer,
  DynamicApiExplorer,
  DynamicPlaygroundWrapper,
  withSuspense,
};

export default DynamicComponentsExports;
