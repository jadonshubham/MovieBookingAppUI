/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {getDateArr, getTimeArr} from '../../utils';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DateBlock = ({date, selected, setSelectedDate}) => {
  const handleSelectedDate = () => setSelectedDate(date);
  return (
    <Pressable
      style={[
        styles.dateBlock,
        {backgroundColor: selected ? '#ffb43a' : '#2A2D37'},
      ]}
      onPress={handleSelectedDate}>
      <View style={styles.dot} />
      <Text style={styles.monthText}>{date.format('MMM')}</Text>
      <Text style={styles.dayText}>{date.date()}</Text>
      <View style={[styles.dot, styles.leftDot]} />
      <View style={[styles.dot, styles.rightDot]} />
    </Pressable>
  );
};

const TimeBlock = ({
  time = moment(),
  selected,
  setSelectedTime,
  progress,
  index,
}) => {
  const animatedTimeBlock = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [index, index + 2],
      [0, 1],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      progress.value,
      [index, index + 2],
      [30, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const handleSelectedTime = () => setSelectedTime(time);

  return (
    <Animated.View style={animatedTimeBlock}>
      <Pressable
        style={[
          styles.timeBlock,
          {backgroundColor: selected ? '#ffb43a' : '#2A2D37'},
        ]}
        onPress={handleSelectedTime}>
        <Text style={styles.timeText}>{time.format('HH:mm')}</Text>
      </Pressable>
    </Animated.View>
  );
};

const DateTimePicker = ({setShowTime}) => {
  const [dateArr, setDateArr] = useState([]);
  const [timeArr, setTimeArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedTime, setSelectedTime] = useState(moment());
  const flatlistRenderProgress = useSharedValue(0);

  useEffect(() => {
    const newDateArr = getDateArr();
    setDateArr(newDateArr);
    const newTimeArr = getTimeArr();
    setSelectedTime(newTimeArr[0]);
    setTimeArr(newTimeArr);
  }, []);

  useEffect(() => {
    const newTimeArr = getTimeArr(!moment().isSame(selectedDate, 'day'));
    setSelectedTime(newTimeArr[0]);
    setTimeArr(newTimeArr);
  }, [selectedDate]);

  useEffect(() => {
    const hour = selectedTime.get('hour');
    const min = selectedTime.get('minute');
    const newShowTime = selectedDate
      .set('h', hour)
      .set('m', min)
      .set('second', 0);
    setShowTime(newShowTime);
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    flatlistRenderProgress.value = withTiming(10, {duration: 2000});
  }, []);

  return (
    <>
      <View style={styles.datePicker}>
        <FlatList
          data={dateArr}
          horizontal
          renderItem={({item, index}) => (
            <DateBlock
              date={item}
              selected={selectedDate.isSame(item, 'day')}
              setSelectedDate={setSelectedDate}
            />
          )}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      </View>

      <View style={[styles.timePicker]}>
        <FlatList
          data={timeArr}
          horizontal
          renderItem={({item, index}) => (
            <TimeBlock
              time={item}
              selected={selectedTime.isSame(item, 'hour')}
              setSelectedTime={setSelectedTime}
              progress={flatlistRenderProgress}
              index={index}
            />
          )}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      </View>
    </>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  datePicker: {
    height: 70,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  seperator: {
    width: 20,
    height: 10,
  },
  timePicker: {
    paddingHorizontal: 10,
    height: 70,
  },
  dateBlock: {
    padding: 5,
    alignItems: 'center',
    width: 50,
    borderRadius: 10,
    paddingVertical: 5,
    position: 'relative',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#21242C',
    marginBottom: 5,
  },
  monthText: {
    fontSize: 14,
    color: '#f0f0f5',
    marginBottom: 5,
  },
  dayText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
  leftDot: {
    position: 'absolute',
    bottom: 10,
    left: -3,
  },
  rightDot: {
    position: 'absolute',
    bottom: 10,
    right: -3,
  },
  timeBlock: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: 75,
    borderRadius: 10,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
  },
});
