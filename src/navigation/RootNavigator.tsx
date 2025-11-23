import React from 'react';
import { Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StepsScreen from '../screens/StepsScreen';
import StoreScreen from '../screens/StoreScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useNavigation } from '@react-navigation/native';
import { HomeIcon, StepsIcon, StoreIcon, TrophyIcon, SettingsIcon } from '../components/icons/SimpleIcons';

export type RootStackParamList = {
  Tabs: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      screenOptions={{
        headerStyle: { backgroundColor: 'transparent' },
        headerTitleStyle: { color: '#ffffff', fontWeight: '700' },
        headerShadowVisible: false,
        headerTintColor: '#ffffff',
        tabBarStyle: {
          backgroundColor: '#0a4bdc',
          borderTopColor: 'transparent',
          height: 68,
          paddingBottom: 12,
          paddingTop: 10
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#a8c0ff',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('Settings' as never)}>
            <SettingsIcon color="#ffffff" size={22} />
          </Pressable>
        )
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Домой',
          tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Steps"
        component={StepsScreen}
        options={{
          title: 'Шаги',
          tabBarIcon: ({ color, size }) => <StepsIcon color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Store"
        component={StoreScreen}
        options={{
          title: 'Магазин',
          tabBarIcon: ({ color, size }) => <StoreIcon color={color} size={size} />
        }}
      />
      <Tab.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          title: 'Ачивки',
          tabBarIcon: ({ color, size }) => <TrophyIcon color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        title: 'Настройки',
        headerStyle: { backgroundColor: '#0a4bdc' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700', color: '#ffffff' }
      }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
