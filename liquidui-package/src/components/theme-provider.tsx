import React, { useState, useEffect } from 'react';
import { ThemeContext } from '../hooks/use-theme';
import { ThemeProviderProps } from '../types';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    defaultTheme = 'system',
    storageKey = 'liquidui-theme',
    enableSystem = true,
    disableTransitionOnChange = false,
}) => {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(defaultTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey) as 'light' | 'dark' | 'system';
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, [storageKey]);

    useEffect(() => {
        const root = window.document.documentElement;

        if (disableTransitionOnChange) {
            root.classList.add('[&_*]:!transition-none');
        }

        root.classList.remove('light', 'dark');

        let systemTheme: 'light' | 'dark' = 'light';
        if (enableSystem && theme === 'system') {
            systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        const effectiveTheme = theme === 'system' ? systemTheme : theme;
        root.classList.add(effectiveTheme);

        if (disableTransitionOnChange) {
            setTimeout(() => {
                root.classList.remove('[&_*]:!transition-none');
            }, 1);
        }
    }, [theme, enableSystem, disableTransitionOnChange]);

    const handleSetTheme = (newTheme: 'light' | 'dark' | 'system') => {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
    };

    const value = {
        theme,
        setTheme: handleSetTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}; 