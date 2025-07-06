import React, { createContext, useContext, useEffect, useState } from 'react';

interface AnimationContextType {
  isClient: boolean;
  prefersReducedMotion: boolean;
  isReady: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  isClient: false,
  prefersReducedMotion: false,
  isReady: false,
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Listen for changes
    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handler);
    
    // Mark as ready after hydration
    setIsReady(true);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <AnimationContext.Provider value={{ isClient, prefersReducedMotion, isReady }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}

// Safe animation hook for components
export function useSafeAnimation() {
  const { isClient, prefersReducedMotion, isReady } = useAnimation();
  
  return {
    shouldAnimate: isClient && isReady && !prefersReducedMotion,
    isClient,
    prefersReducedMotion,
    isReady,
  };
}