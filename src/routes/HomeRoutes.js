import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Details from '../screens/Details';
import TabRoutes from './TabRoutes';

const Stack = createSharedElementStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen
        name="Details"
        component={Details}
        sharedElements={route => {
          const {movieData} = route.params;
          return [movieData.imdbID];
        }}
        options={{
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeRoutes;
