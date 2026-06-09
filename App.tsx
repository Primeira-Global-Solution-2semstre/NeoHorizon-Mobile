import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { DetritosProvider } from './src/context/DetritosContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <DetritosProvider>
      <NavigationContainer>
        <StatusBar style="light" translucent={false} />
        <AppNavigator />
      </NavigationContainer>
    </DetritosProvider>
  );
}