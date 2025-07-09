'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useState, useEffect } from 'react';

const LiquidGlassProvider = dynamic(
  () => import('liquidify').then(mod => ({ default: mod.LiquidGlassProvider })),
  { ssr: false, loading: () => null }
);

const GlassBackground = dynamic(() => import('./ui/GlassBackground'), {
  ssr: false,
  loading: () => null,
});

interface ClientWrapperProps {
  children: ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LiquidGlassProvider
      config={{
        blur: 12,
        opacity: 0.8,
        saturation: 1.0,
        magneticHover: true,
        specularHighlights: true,
        adaptToContent: true,
      }}
    >
      <GlassBackground variant='gradient' animated={true}>
        {children}
      </GlassBackground>
    </LiquidGlassProvider>
  );
}

export default ClientWrapper;
