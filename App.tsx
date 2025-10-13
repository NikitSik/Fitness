import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import { ActivityProvider } from './src/context/ActivityContext';
import { SubscriptionProvider } from './src/context/SubscriptionContext';
import { SettingsProvider } from './src/context/SettingsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <SubscriptionProvider>
          <ActivityProvider>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="light" />
            </NavigationContainer>
          </ActivityProvider>
        </SubscriptionProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
