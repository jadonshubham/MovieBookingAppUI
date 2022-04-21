import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import TabRoutes from './routes/TabRoutes';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
    </>
  );
};

export default App;
