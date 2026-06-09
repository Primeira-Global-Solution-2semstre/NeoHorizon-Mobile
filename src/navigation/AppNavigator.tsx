import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/domain';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DetritosScreen from '../screens/DetritosScreen';
import CadastroDetritoScreen from '../screens/CadastroDetritoScreen';
import DetalhesDetritoScreen from '../screens/DetalhesDetritoScreen';
import EditarDetritoScreen from '../screens/EditarDetritoScreen';
import AlertasScreen from '../screens/AlertasScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detritos" component={DetritosScreen} />
      <Stack.Screen name="CadastroDetrito" component={CadastroDetritoScreen} />
      <Stack.Screen name="DetalhesDetrito" component={DetalhesDetritoScreen} />
      <Stack.Screen name="EditarDetrito" component={EditarDetritoScreen} />
      <Stack.Screen name="Alertas" component={AlertasScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;