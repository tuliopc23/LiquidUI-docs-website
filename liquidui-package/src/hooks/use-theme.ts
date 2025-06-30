import { useContext, createContext } from 'react';

interface ThemeContextType {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'system',
    setTheme: () => { },
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}; 