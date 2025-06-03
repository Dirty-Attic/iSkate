import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { colors, ThemeType, shadows } from './theme';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: typeof colors.light;
  shadows: typeof shadows;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Use device preferences as initial theme
  const deviceTheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(deviceTheme || 'light');

  // Update theme when device theme changes
  useEffect(() => {
    if (deviceTheme) {
      setTheme(deviceTheme);
    }
  }, [deviceTheme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    colors: colors[theme],
    shadows,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};