import React, { useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { shadows, spacing } from '../theme/theme';
import { SvgXml } from 'react-native-svg';

// Theme-aware icon configuration
const getIconColors = (isLightTheme: boolean) => ({
  outlinePrimary: isLightTheme ? '#1A1A1A' : '#FFFFFF', // Very dark gray for light mode, white for dark mode
  outlineInactive: isLightTheme ? '#1A1A1A' : '#FFFFFF', // Very dark gray for light mode, white for dark mode
  fillActive: '#777777', 
  shadowColor: isLightTheme ? '#000000' : '#000000',
  shadowOpacity: isLightTheme ? 0.3 : 0.5,
  shadowRadius: isLightTheme ? 2 : 3,
});

// SVG icon strings with fill placeholder to be replaced
const svgIcons = {
  home: {
    outline: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="OUTLINE_COLOR" d="M20.25 10a1.25 1.25 0 1 0-2.5 0zm-14 0a1.25 1.25 0 1 0-2.5 0zm13.866 2.884a1.25 1.25 0 0 0 1.768-1.768zM12 3l.884-.884a1.25 1.25 0 0 0-1.768 0zm-9.884 8.116a1.25 1.25 0 0 0 1.768 1.768zM7 22.25h10v-2.5H7zM20.25 19v-9h-2.5v9zm-14 0v-9h-2.5v9zm15.634-7.884l-9-9l-1.768 1.768l9 9zm-10.768-9l-9 9l1.768 1.768l9-9zM17 22.25A3.25 3.25 0 0 0 20.25 19h-2.5a.75.75 0 0 1-.75.75zm-10-2.5a.75.75 0 0 1-.75-.75h-2.5A3.25 3.25 0 0 0 7 22.25z" />
    </svg>`,
    fill: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="FILL_COLOR" fill-rule="evenodd" d="M12.707 2.293a1 1 0 0 0-1.414 0l-7 7l-2 2a1 1 0 1 0 1.414 1.414L4 12.414V19a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6.586l.293.293a1 1 0 0 0 1.414-1.414z" clip-rule="evenodd" />
    </svg>`
  },
  map: {
    outline: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="OUTLINE_COLOR" d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5" />
    </svg>`,
    fill: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="FILL_COLOR" d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7" />
    </svg>`
  },
  cart: {
    outline: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="OUTLINE_COLOR" d="M17 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2M1 2h3.27l.94 2H20a1 1 0 0 1 1 1c0 .17-.05.34-.12.5l-3.58 6.47c-.34.61-1 1.03-1.75 1.03H8.1l-.9 1.63l-.03.12a.25.25 0 0 0 .25.25H19v2H7a2 2 0 0 1-2-2c0-.35.09-.68.24-.96l1.36-2.45L3 4H1zm6 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2c0-1.11.89-2 2-2m9-7l2.78-5H6.14l2.36 5z" />
    </svg>`,
    fill: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="FILL_COLOR" d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2" />
    </svg>`
  },
  video: {
    outline: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="OUTLINE_COLOR" d="M15 8v8H5V8zm1-2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4V7a1 1 0 0 0-1-1" />
    </svg>`,
    fill: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="FILL_COLOR" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z" />
    </svg>`
  },
  profile: {
    outline: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="OUTLINE_COLOR" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2M7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.5.88 4.93 1.78A7.9 7.9 0 0 1 12 20c-1.86 0-3.57-.64-4.93-1.72m11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33A7.93 7.93 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.5-1.64 4.83M12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6m0 5a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 12 8a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 12 11" />
    </svg>`,
    fill: `<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
      <path fill="FILL_COLOR" d="M12 19.2c-2.5 0-4.71-1.28-6-3.2c.03-2 4-3.1 6-3.1s5.97 1.1 6 3.1a7.23 7.23 0 0 1-6 3.2M12 5a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-3A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10c0-5.53-4.5-10-10-10" />
    </svg>`
  }
};

export default function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { colors, theme } = useTheme();
  const isLightTheme = theme === 'light';
  const currentRouteName = state.routes[state.index].name;
  const windowWidth = Dimensions.get('window').width;
  
  // Get theme-specific icon colors
  const iconColors = useMemo(() => getIconColors(isLightTheme), [isLightTheme]);

  // Dynamic styles based on theme and safe area
  const dynamicStyles = useMemo(
    () => ({
      container: {
        backgroundColor: colors.foreground,
        paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 2,
        borderTopColor: colors.border,
        ...shadows.medium,
        shadowColor: colors.shadow,
        shadowOpacity: isLightTheme ? 0.2 : 0.5,
      },
      activeOutlineLayer: {
        shadowColor: iconColors.shadowColor,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: iconColors.shadowOpacity,
        shadowRadius: iconColors.shadowRadius,
        elevation: isLightTheme ? 2 : 3,
      }
    }),
    [colors, isLightTheme, insets.bottom, iconColors]
  );

  // Handles switching between tabs
  const handleTabPress = (screenName: string) => {
    navigation.navigate(screenName);
  };

  // Renders icons with SVG components
  const renderIcon = (routeName: string, isActive: boolean) => {
    // Base icon size for most icons
    const iconSize = 36;
    
    // Get larger size for video icon
    const getIconSize = () => {
      if (routeName === 'VideoScrollerScreen') {
        return 46; // Make video/camera icon larger
      }
      return iconSize;
    };
    
    const getIconKey = () => {
      switch (routeName) {
        case 'MapScreen':
          return 'map';
        case 'ShopScreen':
          return 'cart';
        case 'Home':
          return 'home';
        case 'VideoScrollerScreen':
          return 'video';
        case 'ProfileScreen':
          return 'profile';
        default:
          return 'home';
      }
    };

    const iconKey = getIconKey();
    const outlineSvg = svgIcons[iconKey].outline;
    const fillSvg = svgIcons[iconKey].fill;
    const currentIconSize = getIconSize();

    // Apply correct colors based on theme
    const outlineColor = iconColors.outlinePrimary;
    const fillColor = iconColors.fillActive;

    return (
      <View style={[
        styles.iconContainer,
        routeName === 'VideoScrollerScreen' && styles.videoIconContainer
      ]}>
        {/* Fill layer - only shown when active */}
        {isActive && (
          <View style={styles.fillLayer}>
            <SvgXml 
              xml={fillSvg.replace('FILL_COLOR', fillColor)} 
              width={currentIconSize} 
              height={currentIconSize} 
            />
          </View>
        )}
        
        {/* Outline layer - always on top, always uses outline color */}
        <View style={[styles.outlineLayer, isActive && dynamicStyles.activeOutlineLayer]}>
          <SvgXml 
            xml={outlineSvg.replace('OUTLINE_COLOR', outlineColor)} 
            width={currentIconSize} 
            height={currentIconSize} 
          />
        </View>
      </View>
    );
  };

  // Order and config for tabs
  const tabItems = [
    { name: 'MapScreen', screen: 'MapScreen' },
    { name: 'ShopScreen', screen: 'ShopScreen' },
    { name: 'Home', screen: 'Home' },
    { name: 'VideoScrollerScreen', screen: 'VideoScrollerScreen' },
    { name: 'ProfileScreen', screen: 'ProfileScreen' },
  ];

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={styles.tabBar}>
        {tabItems.map((item) => {
          const isActive = currentRouteName === item.screen;

          return (
            <TouchableOpacity
              key={item.name}
              style={[styles.tabButton, { width: windowWidth / 5 }]}
              onPress={() => handleTabPress(item.screen)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.activeIconWrapper,
                ]}
              >
                {renderIcon(item.screen, isActive)}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Static styles for layout and appearance
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56, // Increased from 50 to 56
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs / 2,
  },
  iconWrapper: {
    width: 42, // Increased from 36 to 42
    height: 42, // Increased from 36 to 42
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21, // Half of width/height
  },
  activeIconWrapper: {
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    position: 'relative',
    width: 32, // Increased from 28 to 32
    height: 32, // Increased from 28 to 32
    justifyContent: 'center',
    alignItems: 'center',
  },
  fillLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  outlineLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  videoIconContainer: {
    width: 38, // Slightly larger container for video icon
    height: 38,
  },
});