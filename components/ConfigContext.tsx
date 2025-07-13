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
  config = {},
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
