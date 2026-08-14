import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/main/DashboardScreen';
import WorkoutScreen from '../screens/main/WorkoutScreen';
import CameraScreen from '../screens/main/CameraScreen';
import MealPlanScreen from '../screens/main/MealPlanScreen';
import ProgressScreen from '../screens/main/ProgressScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { theme } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: { backgroundColor: theme.card, borderTopColor: '#222' },
      tabBarActiveTintColor: theme.accent,
      tabBarInactiveTintColor: theme.muted,
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Dashboard: 'flame',
          Workouts: 'barbell',
          Camera: 'camera',
          Meals: 'restaurant',
          Progress: 'stats-chart',
          Profile: 'person',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Workouts" component={WorkoutScreen} />
    <Tab.Screen name="Camera" component={CameraScreen} />
    <Tab.Screen name="Meals" component={MealPlanScreen} />
    <Tab.Screen name="Progress" component={ProgressScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default TabNavigator;


