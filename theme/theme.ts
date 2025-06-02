export type ThemeType = 'light' | 'dark';

interface ColorPalette {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  shadow: string;
  accent: string;
}

export const colors: Record<ThemeType, ColorPalette> = {
  light: {
    primary: '#2775EB',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#E8E8E8',
    notification: '#FF3B30',
    shadow: '#000000',
    accent: '#FF974C',
  },
  dark: {
    primary: '#378EF0',
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    border: '#2C2C2C',
    notification: '#FF453A',
    shadow: '#000000',
    accent: '#FF974C',
  }
};

export const spacing = {
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
};