import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeRoutes from './routes/HomeRoutes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <HomeRoutes />
      </NavigationContainer>
    </>
  );
};

export default App;
