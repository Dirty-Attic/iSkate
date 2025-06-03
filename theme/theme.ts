export type ThemeType = 'light' | 'dark';

interface ColorPalette {
  primary: string;
  background: string;
  foreground: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  shadow: string;
  accent: string;
  // Adding elevation shadows for different levels of depth
  elevation1: string;
  elevation2: string;
  elevation3: string;
}

export const colors: Record<ThemeType, ColorPalette> = {
  light: {
    primary: '#4285F4',           // Softer blue
    background: '#F5F7FA',        // Very light blue-gray
    foreground: '#FFFFFF',        // Pure white for header
    card: '#FFFFFF',              // White cards
    text: '#3C4043',              // Dark gray instead of pure black
    border: '#E1E5EA',            // Subtle light gray for borders
    notification: '#FF5252',      // Slightly softer red
    shadow: 'rgba(0,0,0,0.25)',   // Darker shadow for more contrast
    accent: '#FF974C',            // Kept your accent color
    elevation1: 'rgba(0,0,0,0.08)', // Subtle elevation
    elevation2: 'rgba(0,0,0,0.12)', // Medium elevation
    elevation3: 'rgba(0,0,0,0.16)', // Strong elevation
  },
  dark: {
    primary: '#5B8DEF',           // Brighter blue for dark mode
    background: '#222222',        // Darker background
    foreground: '#333333',        // Slightly lighter than background
    card: '#2D2D2D',              // Lighter card color for contrast
    text: '#FFFFFF',              // White text
    border: '#111',            // More visible borders
    notification: '#FF5252',      // Bright red notification
    shadow: '#000000',            // Pure black shadow
    accent: '#FF9D5C',            // Slightly brighter accent
    elevation1: 'rgba(0,0,0,0.5)',  // Strong dark mode elevation
    elevation2: 'rgba(0,0,0,0.65)', // Stronger dark mode elevation
    elevation3: 'rgba(0,0,0,0.8)',  // Strongest dark mode elevation
  }
};

// Shadow styles for different elevations
export const shadows = {
  small: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  medium: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  large: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  }
};

export const spacing = {
  xxs: 2,
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const fontSizes = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 24,
  xxxl: 36,
  xxxxl: 48,
};