import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeContext';
import { spacing, fontSizes } from '../theme/theme';

// Since we don't have the actual icons imported yet, we'll use placeholders
// You should replace these with actual icon components from a library like @expo/vector-icons
const SearchIcon = () => (
  <Text style={styles.iconText}>🔍</Text>
);

const NotificationIcon = () => (
  <Text style={styles.iconText}>🔔</Text>
);

const MessagesIcon = () => (
  <Text style={styles.iconText}>✉️</Text>
);

export default function TopNav() {
  const insets = useSafeAreaInsets();
  const { colors, theme } = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          paddingTop: insets.top,
          backgroundColor: colors.background,
          shadowColor: colors.shadow,
        }
      ]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.logo, { color: colors.text }]}>
          iSkate
        </Text>
        
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <SearchIcon />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <NotificationIcon />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <MessagesIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: spacing.m,
  },
  logo: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    fontFamily: 'Lazezar',
    letterSpacing: -1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: spacing.l,
    padding: spacing.s,
  },
  iconText: {
    fontSize: fontSizes.xxl,
  }
});