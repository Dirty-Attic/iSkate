import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import MainNavigator from './navigation/MainNavigator';
import { ThemeProvider } from './theme/ThemeContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

/**
 * Main application component
 * Handles font loading, splash screen management and wraps the app with necessary providers
 */
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  // Setup app resources - optimized with useCallback to avoid re-creation on re-renders
  const prepareApp = useCallback(async () => {
    try {
      // Pre-load custom fonts
      await Font.loadAsync({
        'Lalezar': require('./assets/fonts/Lalezar-Regular.ttf'),
      });
      
      // Short artificial delay to ensure font is fully loaded
      // Consider removing in production if loading is quick enough
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.warn('Error loading assets:', e);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  }, []);

  // Load resources when component mounts
  useEffect(() => {
    prepareApp();
  }, [prepareApp]);

  // Don't render anything until assets are ready
  if (!appIsReady) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}