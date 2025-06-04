import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import ShopScreen from '../screens/ShopScreen';
import VideoScrollerScreen from '../screens/VideoScrollerScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TopNav from '../components/TopNav';
import BottomNav from '../components/BottomNav';

/**
 * Type definitions for the navigation stack parameters
 */
export type RootStackParamList = {
  MainTabs: undefined;
  // Other non-tab screens can go here
};

export type TabStackParamList = {
  Home: undefined;
  MapScreen: undefined;
  ShopScreen: undefined;
  VideoScrollerScreen: undefined;
  ProfileScreen: undefined;
  // Add any other tab screens here
};

// Create navigation stacks with strongly-typed parameters
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

// This will be accessed by the BottomNav component to get the current route name
export const useCurrentRoute = () => {
  const navigation = useNavigation();
  return (navigation.getState()?.routes[navigation.getState().index]?.name) || 'Home';
};

// Tab Navigator component - defines the bottom tab structure
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      id={undefined}
      tabBar={props => <BottomNav {...props} />}
      screenOptions={{
        header: () => <TopNav />,
        headerShown: true,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }} 
      />
      <Tab.Screen 
        name="MapScreen"
        component={MapScreen} 
        options={{ title: 'Spots' }} 
      />
      <Tab.Screen 
        name="ShopScreen" 
        component={ShopScreen} 
        options={{ title: 'Shop' }} 
      />
      <Tab.Screen 
        name="VideoScrollerScreen" 
        component={VideoScrollerScreen} 
        options={{ title: 'Videos' }} 
      />
      <Tab.Screen 
        name="ProfileScreen" 
        component={ProfileScreen} 
        options={{ title: 'Profile' }} 
      />
    </Tab.Navigator>
  );
}

/**
 * MainNavigator component - Defines the main navigation structure of the app
 */
export default function MainNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
      />
      {/* Add more non-tab screens here as the app grows */}
    </Stack.Navigator>
  );
}