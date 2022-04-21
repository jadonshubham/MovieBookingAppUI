import {View, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeRoutes from './HomeRoutes';

const Tab = createBottomTabNavigator();

const IconComp = ({routeName, color}) => {
  switch (routeName) {
    case 'HomeScreen':
      return <MaterialIcons name="home-filled" size={24} color={color} />;
    case 'Favourite':
      return <Ionicons name="heart" size={24} color={color} />;
    case 'Browse':
      return <AntDesign name="appstore1" size={24} color={color} />;
    case 'Profile':
      return <FontAwesome5 name="user-alt" size={24} color={color} />;
  }
};

const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          // const event = navigation.emit({
          //   type: 'tabPress',
          //   target: route.key,
          //   canPreventDefault: true,
          // });
          // if (!isFocused && !event.defaultPrevented) {
          //   // The `merge: true` option makes sure that the params inside the tab screen are preserved
          //   navigation.navigate({name: route.name, merge: true});
          // }
        };

        const onLongPress = () => {
          // navigation.emit({
          //   type: 'tabLongPress',
          //   target: route.key,
          // });
        };

        return (
          <Pressable
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <IconComp
              routeName={route.name}
              color={isFocused ? '#F5F6F8' : '#78787A'}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const TabRoutes = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Tab.Screen name="HomeScreen" component={HomeRoutes} />
      <Tab.Screen name="Favourite" component={HomeRoutes} />
      <Tab.Screen name="Browse" component={HomeRoutes} />
      <Tab.Screen name="Profile" component={HomeRoutes} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 40,
    backgroundColor: '#343641',
  },
});
export default TabRoutes;
