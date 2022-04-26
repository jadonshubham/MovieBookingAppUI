/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import React, {useState} from 'react';
import SEAT_STATUS from '../../constants/SEAT_STATUS';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Canvas, Path, Blur} from '@shopify/react-native-skia';

const {height, width} = Dimensions.get('screen');

const SeatSelector = ({progress}) => {
  const [seatsArr, setSeatsArr] = useState(SEAT_STATUS);

  const animatedSeatsContainer = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [0, 1],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const animatedAvailabilityInfoText = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [1, 2],
      [0, 1],
      Extrapolate.CLAMP,
    );
    return {opacity};
  });

  const handleSelection = (row, column) => {
    if (seatsArr[row][column].available) {
      const newSeatsArr = JSON.parse(JSON.stringify(seatsArr));
      newSeatsArr[row][column].selected = !newSeatsArr[row][column].selected;
      setSeatsArr(newSeatsArr);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Canvas
          style={{
            width: width - 40,
            height: 60,
            flex: 1,
          }}>
          <Path
            path={`M 0 15 Q ${(width - 40) / 2} -5 ${width} 20`}
            color="#fff"
            style="stroke"
            strokeJoin="round"
            strokeWidth={4}
          />
          <Path
            path={`M 0 17 Q ${(width - 40) / 2} -3 ${width} 23 v 20 Q ${
              (width - 40) / 2
            } 15 0 38 Z`}
            color="#fff"
            opacity={0.05}>
            <Blur blur={4} />
          </Path>
        </Canvas>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SCREEN</Text>
        </View>
      </View>
      <Animated.View style={[styles.seatsContainer, animatedSeatsContainer]}>
        {seatsArr.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((ele, columnIndex) => (
              <Pressable
                key={`${rowIndex} ${columnIndex}`}
                style={[
                  styles.seat,
                  {backgroundColor: ele.available ? '#78787A' : '#906B33'},
                  ele.selected && {backgroundColor: '#FFB43A'},
                ]}
                onPress={() => handleSelection(rowIndex, columnIndex)}
              />
            ))}
          </View>
        ))}

        <Animated.View
          style={[styles.infoContainer, animatedAvailabilityInfoText]}>
          <View style={styles.availabiltyInfo}>
            <View style={[styles.dot, {backgroundColor: '#78787A'}]} />
            <Text style={styles.infoText}>Available</Text>
          </View>
          <View style={styles.availabiltyInfo}>
            <View style={[styles.dot, {backgroundColor: '#906B33'}]} />
            <Text style={styles.infoText}>Reserved</Text>
          </View>
          <View style={styles.availabiltyInfo}>
            <View style={[styles.dot, {backgroundColor: '#FFB43A'}]} />
            <Text style={styles.infoText}>Selected</Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default SeatSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  screen: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  titleContainer: {
    position: 'absolute',
    top: 30,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: '#777880',
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  seatsContainer: {
    alignItems: 'center',
    paddingBottom: 20,
    position: 'relative',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  seat: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  availabiltyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  infoText: {
    color: '#F5F6F8',
    fontSize: 16,
  },
});
