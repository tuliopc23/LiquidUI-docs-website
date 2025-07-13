'use client';

import { ReactNode, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider, useTheme } from 'next-themes';
import {
  LiquidifyProvider,
  SSRConfigProvider,
  GlobalConfigProvider,
} from 'liquidify';

import { ConfigProvider } from './ConfigContext';

// Import CSS styles at the top level
import 'liquidify/css';

interface ClientThemeProviderProps {
  children: ReactNode;
}

function LiquidifyWrapper({ children }: { children: ReactNode }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render provider until mounted to avoid hydration mismatch
  if (!mounted) {
    return <div style={{ display: 'contents' }}>{children}</div>;
  }

  const currentTheme = (resolvedTheme || theme || 'light') as 'light' | 'dark';

  return (
    <ConfigProvider>
      <SSRConfigProvider>
        <GlobalConfigProvider
          config={{
            defaultVariant: 'glass',
            defaultSize: 'md',
            enableAnimations: true,
            enableA11y: true,
            colorScheme: currentTheme === 'dark' ? 'dark' : 'light',
            reducedMotion: false,
            highContrast: false,
          }}
        >
          <LiquidifyProvider
            theme={currentTheme}
            glassConfig={{
              intensity: 0.8,
              blur: 10,
              saturation: 1.5,
              enableMagnetic: true,
              enableSpecular: true,
            }}
            hapticConfig={{
              enableVibration: true,
              enableAudio: true,
              enableVisual: true,
            }}
          >
            {children}
          </LiquidifyProvider>
        </GlobalConfigProvider>
      </SSRConfigProvider>
    </ConfigProvider>
  );
}

// Server-safe provider wrapper that only provides basic context without liquidify providers
export function ServerSafeThemeProvider({ children }: { children: ReactNode }) {
  // Only provide basic config context for SSR - no liquidify providers that use hooks
  return <ConfigProvider>{children}</ConfigProvider>;
}

export function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ display: 'contents' }}>{children}</div>;
  }

  return (
    <MotionConfig reducedMotion='user'>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <LiquidifyWrapper>{children}</LiquidifyWrapper>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default ClientThemeProvider;
