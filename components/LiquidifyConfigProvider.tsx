'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import liquidify providers to avoid SSR issues
const LiquidGlassProvider = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.LiquidGlassProvider })),
  { ssr: false }
);

const HapticProvider = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.HapticProvider })),
  { ssr: false }
);

const LiquidifyThemeProvider = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.ThemeProvider })),
  { ssr: false }
);

const ToastProvider = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.ToastProvider })),
  { ssr: false }
);

const GlobalConfigProvider = dynamic(
  () =>
    import('liquidify').then(mod => ({ default: mod.GlobalConfigProvider })),
  { ssr: false }
);

interface LiquidifyConfigProviderProps {
  children: ReactNode;
  config?: {
    defaultVariant?: 'default' | 'glass' | 'frosted' | 'liquid';
    defaultSize?: 'sm' | 'md' | 'lg';
    enableAnimations?: boolean;
    enableA11y?: boolean;
    colorScheme?: 'auto' | 'light' | 'dark';
    reducedMotion?: boolean;
    highContrast?: boolean;
  };
}

export function LiquidifyConfigProvider({
  children,
  config = {
    defaultVariant: 'glass',
    defaultSize: 'md',
    enableAnimations: true,
    enableA11y: true,
    colorScheme: 'auto',
    reducedMotion: false,
    highContrast: false,
  },
}: LiquidifyConfigProviderProps) {
  return (
    <GlobalConfigProvider config={config || {}}>
      <LiquidifyThemeProvider>
        <HapticProvider>
          <ToastProvider>
            <LiquidGlassProvider>{children}</LiquidGlassProvider>
          </ToastProvider>
        </HapticProvider>
      </LiquidifyThemeProvider>
    </GlobalConfigProvider>
  );
}

export default LiquidifyConfigProvider;
