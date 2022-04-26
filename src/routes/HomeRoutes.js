import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Details from '../screens/Details';
import Reservation from '../screens/Reservation';
import TabRoutes from './TabRoutes';

const Stack = createSharedElementStackNavigator();

const HomeRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={TabRoutes} />
      <Stack.Screen
        name="Details"
        component={Details}
        sharedElements={(route, otherRoute, showing) => {
          if (
            otherRoute.name === 'Home' ||
            (otherRoute.name === 'Details' && showing)
          ) {
            const {movieData} = route.params;
            return [movieData.imdbID];
          }
        }}
        options={{
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
      <Stack.Screen name="Reservation" component={Reservation} />
    </Stack.Navigator>
  );
};

export default HomeRoutes;
