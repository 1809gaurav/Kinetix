import React from 'react';
import { NavigationContainer, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { theme } from './src/theme/colors';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer
        theme={{
          ...NavigationDarkTheme,
          colors: {
            ...NavigationDarkTheme.colors,
            background: theme.background,
            text: theme.text,
            border: theme.card,
            primary: theme.accent,
            card: theme.card,
            notification: theme.accent,
          },
        }}
      >
        <StatusBar style="light" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
