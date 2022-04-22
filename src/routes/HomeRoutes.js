import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from '../screens/Details';
import TabRoutes from './TabRoutes';

const Stack = createNativeStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default HomeRoutes;
