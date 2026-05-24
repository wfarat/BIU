'use client';

import React from 'react';
import { useTheme } from '@/app/context/ThemeContext';

export const ThemeWrapper = ({ children }) => {
    const { theme } = useTheme();

    const styles = {
        backgroundColor: theme === 'light' ? '#ffffff' : '#121212',
        color: theme === 'light' ? '#1a1a1a' : '#ffffff',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    };

    return (
        <div style={styles}>
            {children}
        </div>
    );
};
