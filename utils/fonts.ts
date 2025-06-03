import { Platform } from 'react-native';

export const fonts = {
  logo: Platform.select({
    ios: 'Lalezar',
    android: 'Lalezar',
    default: 'Lalezar'
  }),
  regular: Platform.select({
    ios: 'Lalezar',
    android: 'Lalezar',
    default: 'Lalezar'
  }),
  // Add more font weights or styles if needed
};