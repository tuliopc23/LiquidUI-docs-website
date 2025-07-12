'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Mock theme context
interface MockThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const MockThemeContext = createContext<MockThemeContextType | undefined>(
  undefined
);

export const useMockTheme = () => {
  const context = useContext(MockThemeContext);
  if (!context) {
    return { theme: 'light', setTheme: () => {} };
  }
  return context;
};

interface MockThemeProviderProps {
  children: ReactNode;
  theme?: string;
}

export const MockThemeProvider: React.FC<MockThemeProviderProps> = ({
  children,
  theme = 'light',
}) => {
  const [currentTheme, setCurrentTheme] = React.useState(theme);

  return (
    <MockThemeContext.Provider
      value={{
        theme: currentTheme,
        setTheme: setCurrentTheme,
      }}
    >
      {children}
    </MockThemeContext.Provider>
  );
};

// Default export for easier importing
export default MockThemeProvider;
