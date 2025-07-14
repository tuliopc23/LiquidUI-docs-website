'use client';

import {
  GlobalConfigProvider,
  ThemeProvider,
  HapticProvider,
  ToastProvider,
  LiquidGlassProvider,
} from 'liquidify';
import React from 'react';

export default function DocsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalConfigProvider
      config={{
        defaultVariant: 'glass',
        defaultSize: 'md',
        enableAnimations: true,
        enableA11y: true,
        colorScheme: 'auto',
        reducedMotion: false,
        highContrast: false,
      }}
    >
      <ThemeProvider>
        <HapticProvider>
          <ToastProvider>
            <LiquidGlassProvider>{children}</LiquidGlassProvider>
          </ToastProvider>
        </HapticProvider>
      </ThemeProvider>
    </GlobalConfigProvider>
  );
}
