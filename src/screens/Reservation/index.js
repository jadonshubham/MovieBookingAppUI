/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from './DateTimePicker';
import SeatSelector from './SeatSelector';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const Reservation = ({route, navigation}) => {
  const {movieData} = route.params;
  const [showTime, setShowTime] = useState(null);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(1000, withTiming(3, {duration: 2000}));
  }, [progress]);

  const animatedButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [2, 3],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const goBack = () => navigation.goBack();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle="light-content" />
      <ScrollView style={{flex: 1}}>
        <View style={styles.navbar}>
          <Pressable onPress={goBack}>
            <Ionicons name="chevron-back" size={30} color="#ffffff" />
          </Pressable>
          <View style={styles.navbarHeadingContainer}>
            <Text style={styles.navbarHeading}>{movieData.Title}</Text>
            <Text style={styles.navbarSubheading}>Session Selection</Text>
          </View>
        </View>

        <DateTimePicker setShowTime={setShowTime} progress={progress} />
        <SeatSelector progress={progress} />
      </ScrollView>

      <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
        <TouchableOpacity activeOpacity={0.9} style={styles.button}>
          <Text style={styles.buttonText}>Buy Ticket | $ 45</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Reservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242C',
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: 'Montserrat-Regular',
  },
  navbar: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
  },
  navbarHeadingContainer: {
    flex: 1,
    alignItems: 'center',
  },
  navbarHeading: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  navbarSubheading: {
    color: '#777880',
    fontSize: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#ffb43a',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#f5f6f8',
  },
});
