import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../theme/ThemeContext';
import { shadows } from '../theme/theme';
import { fonts } from '../utils/fonts';

/**
 * HomeScreen component - Main landing screen for the app
 * Displays a welcome card with theme-aware styling
 */
export default function HomeScreen() {
  const { colors, theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Memoize dynamic styles to prevent recalculation on re-renders
  const dynamicStyles = useMemo(() => ({
    container: {
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      shadowColor: colors.shadow,
      borderColor: colors.border,
      ...isLightTheme && shadows.large, // Only apply shadows in light theme
    },
    text: {
      color: colors.text,
      textShadowColor: isLightTheme ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
      fontFamily: fonts.regular,
    },
  }), [colors, isLightTheme]);
  
  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.welcomeCard, dynamicStyles.card]}>
        <Text style={[styles.text, dynamicStyles.text]}>
          Welcome to iSkate 🛹
        </Text>
      </View>
    </View>
  );
}

// Static styles extracted out of component to avoid recreation on re-renders
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeCard: {
    width: '100%',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 8,
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
