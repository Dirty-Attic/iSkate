import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TopNav from '../components/TopNav';

/**
 * Type definitions for the navigation stack parameters
 * Add new screen route parameters here as the app grows
 */
export type RootStackParamList = {
  Home: undefined;
  // Example of a screen with params:
  // Profile: { userId: string; username: string };
};

// Create navigation stack with strongly-typed parameters
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * MainNavigator component - Defines the main navigation structure of the app
 * Currently implements a stack navigator with custom header
 */
export default function MainNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        header: () => <TopNav />,
        headerShown: true,
        // Add common screen options here
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'iSkate Home' }} 
      />
      {/* Add more screens here as the app grows */}
    </Stack.Navigator>
  );
}