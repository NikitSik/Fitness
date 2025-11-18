import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import AppProviders from './src/providers/AppProviders';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    primary: '#0a4bdc',
    card: '#0a4bdc',
    text: '#ffffff'
  }
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProviders>
        <NavigationContainer theme={navigationTheme}>
          <RootNavigator />
          <StatusBar style="light" />
        </NavigationContainer>
      </AppProviders>
    </SafeAreaProvider>
  );
}
