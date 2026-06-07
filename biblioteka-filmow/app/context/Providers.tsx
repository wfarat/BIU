'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ThemeContext = createContext(null);

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme musi być użyty wewnątrz ThemeContext.Provider');
    }
    return context;
}

export default function Providers({ children }) {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme); // Zapis w przeglądarce
            return newTheme;
        });
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#121212', color: theme === 'light' ? '#1a1a1a' : '#ffffff' }}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}
