import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StepsScreen from '../screens/StepsScreen';
import StoreScreen from '../screens/StoreScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  Tabs: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a4bdc' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0a4bdc', borderTopColor: 'transparent' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#a8c0ff',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Settings' as never)}>
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </Pressable>
        )
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          title: 'Домой'
        }}
      />
      <Tab.Screen
        name="Steps"
        component={StepsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="walk-outline" size={size} color={color} />,
          title: 'Шаги'
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" size={size} color={color} />,
          title: 'Магазин'
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="trophy-outline" size={size} color={color} />,
          title: 'Ачивки'
        }}
      />
    </Tab.Navigator>
  );
}

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tabs"
      component={TabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Настройки',
        headerStyle: { backgroundColor: '#0a4bdc' },
        headerTintColor: '#fff'
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
