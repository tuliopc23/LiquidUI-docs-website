import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get initial theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Apply theme
    applyTheme(savedTheme || 'system');
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    const isDark = 
      newTheme === 'dark' || 
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    // Update dark mode state
    setIsDarkMode(isDark);
    
    // Apply or remove dark class
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Store theme preference
    localStorage.setItem('theme', newTheme);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme: handleThemeChange,
        isDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}