import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes, shadows } from '../theme/theme';
import { fonts } from '../utils/fonts';

// Icon components - could be replaced with proper icon library like React Native Vector Icons
const IconPlaceholder = ({ symbol }: { symbol: string }) => (
  <Text style={styles.iconText}>{symbol}</Text>
);

/**
 * TopNav component - Main navigation header with app logo and action buttons
 * Supports both light and dark themes with appropriate styling and shadows
 */
export default function TopNav() {
  const insets = useSafeAreaInsets();
  const { colors, theme } = useTheme();
  
  // Memoize complex style objects to prevent recalculations on re-renders
  const dynamicStyles = useMemo(() => {
    const isLightTheme = theme === 'light';
    
    // Container shadow with theme-specific settings
    const navShadow = {
      ...shadows.small,
      shadowColor: colors.shadow,
      shadowOpacity: isLightTheme ? 0.3 : 0.5,
      shadowRadius: 6,
      elevation: 10,
    };
    
    // Button shadows with 3D effect
    const buttonShadow = {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isLightTheme ? 0.5 : 0.7,
      shadowRadius: 6,
      elevation: 10,
    };
    
    // Theme-specific button styles
    const buttonStyle = {
      backgroundColor: isLightTheme ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.2)',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: isLightTheme ? colors.border : 'transparent',
      transform: [{ translateY: -1 }],
    };
    
    // Logo text styles with shadow for depth
    const logoStyle = {
      color: colors.text,
      textShadowColor: colors.shadow,
      textShadowOffset: { width: 1, height: 2 },
      textShadowRadius: 5,
      fontFamily: fonts.logo,
    };
    
    // Container styles with theme adjustments
    const containerStyle = {
      paddingTop: insets.top,
      backgroundColor: colors.foreground,
      borderBottomWidth: 2,
      borderBottomColor: colors.border,
    };
    
    return { navShadow, buttonShadow, buttonStyle, logoStyle, containerStyle };
  }, [colors, theme, insets.top]);
  
  return (
    <View style={[styles.container, dynamicStyles.navShadow, dynamicStyles.containerStyle]}>
      <View style={styles.innerContainer}>
        {/* App logo/title */}
        <Text style={[styles.logo, dynamicStyles.logoStyle]}>
          iSkate
        </Text>
        
        {/* Action buttons container */}
        <View style={styles.iconContainer}>
          {['🔍', '🔔', '✉️'].map((icon, index) => (
            <TouchableOpacity
              key={`icon-${index}`}
              style={[styles.iconButton, dynamicStyles.buttonShadow, dynamicStyles.buttonStyle]}
            >
              <IconPlaceholder symbol={icon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

// Static styles extracted outside component to prevent recreation on re-renders
const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000, // Ensure the nav appears above other content
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: spacing.m,
  },
  logo: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: spacing.m,
    padding: spacing.xs,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: fontSizes.xl,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  }
});