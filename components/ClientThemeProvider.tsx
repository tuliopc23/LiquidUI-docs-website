'use client';

import { ReactNode, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider, useTheme } from 'next-themes';
import {
  LiquidifyProvider,
  SSRConfigProvider,
  GlobalConfigProvider,
} from 'liquidify';

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
  );
}

// New server-safe provider wrapper without client hooks
export function ServerSafeThemeProvider({ children }: { children: ReactNode }) {
  // Provide default theme and config for SSR
  return (
    <SSRConfigProvider>
      <GlobalConfigProvider
        config={{
          defaultVariant: 'glass',
          defaultSize: 'md',
          enableAnimations: true,
          enableA11y: true,
          colorScheme: 'light',
          reducedMotion: false,
          highContrast: false,
        }}
      >
        <LiquidifyProvider
          theme="light"
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
  );
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