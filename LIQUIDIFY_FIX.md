# How to Fix ConfigContext in Liquidify Library

## Problem

The liquidify library components expect a `ConfigContext` but the library doesn't provide it, causing build failures during static generation.

## Solution: Add ConfigContext to the Library

### 1. Create `src/contexts/ConfigContext.tsx`

```typescript
'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Configuration interface
export interface LiquidifyConfig {
  theme: 'light' | 'dark' | 'auto';
  animations: boolean;
  haptics: boolean;
  accessibility: boolean;
  performance: 'auto' | 'high' | 'low';
  reducedMotion?: boolean;
  highContrast?: boolean;
}

// Default configuration
const defaultConfig: LiquidifyConfig = {
  theme: 'light',
  animations: true,
  haptics: true,
  accessibility: true,
  performance: 'auto',
  reducedMotion: false,
  highContrast: false,
};

// Create the ConfigContext
const ConfigContext = createContext<LiquidifyConfig>(defaultConfig);

// Hook to use the config
export const useConfig = (): LiquidifyConfig => {
  const config = useContext(ConfigContext);
  if (!config) {
    // Return default config if context is not available (SSR safety)
    return defaultConfig;
  }
  return config;
};

// Provider component
interface ConfigProviderProps {
  children: ReactNode;
  config?: Partial<LiquidifyConfig>;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({
  children,
  config = {}
}) => {
  const mergedConfig = { ...defaultConfig, ...config };

  return (
    <ConfigContext.Provider value={mergedConfig}>
      {children}
    </ConfigContext.Provider>
  );
};

// Export the context for external use
export { ConfigContext };
export default ConfigContext;
```

### 2. Update `src/index.ts` to export the ConfigContext

```typescript
// Add these exports to the main index.ts file
export {
  ConfigProvider,
  useConfig,
  ConfigContext,
  type LiquidifyConfig,
} from './contexts/ConfigContext';
```

### 3. Update LiquidGlassProvider to include ConfigContext

In `src/hooks/use-liquid-glass.tsx` (or wherever LiquidGlassProvider is defined):

```typescript
import { ConfigProvider } from '../contexts/ConfigContext';

export function LiquidGlassProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider>
      {/* existing LiquidGlassProvider content */}
      {children}
    </ConfigProvider>
  );
}
```

### 4. Update Components to Use ConfigContext Safely

In any component that needs config (e.g., `src/components/glass-button/glass-button.tsx`):

```typescript
import { useConfig } from '../../contexts/ConfigContext';

export function GlassButton({ children, ...props }) {
  // Safe access to config with fallback
  const config = useConfig();

  // Use config values
  const shouldAnimate = config.animations && !config.reducedMotion;
  const themeClass = config.theme === 'dark' ? 'dark-theme' : 'light-theme';

  return (
    <button
      className={`glass-button ${themeClass} ${shouldAnimate ? 'animate' : ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### 5. Update Package Version

After making these changes:

1. Update `package.json` version: `"version": "1.0.29"`
2. Build the library: `npm run build`
3. Publish: `npm publish`

## Alternative Quick Fix (For Current Project)

If you can't update the library immediately, you can continue using the `LiquidifyConfigProvider` wrapper we created in your docs project. This provides the missing context without needing to modify the published library.

## Steps to Implement

1. Clone the liquidify repo: `git clone https://github.com/tuliopc23/LiqUIdify.git`
2. Add the ConfigContext files as shown above
3. Update exports and components
4. Test the changes
5. Build and publish new version
6. Update your docs project to use the new version

This fix will resolve the static generation issues permanently for all users of the liquidify library.
