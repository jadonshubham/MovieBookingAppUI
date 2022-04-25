/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SharedElement} from 'react-navigation-shared-element';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MOVIE_LIST from '../../constants/MOVIE_LIST';

// Dummy movie to create center effect
const DUMMY_MOVIE_OBJ_LEFT = {
  title: 'left',
  isDummy: true,
};
const DUMMY_MOVIE_OBJ_RIGHT = {
  title: 'right',
  isDummy: true,
};

const MOVIE_LIST_WITH_DUMMY = [...MOVIE_LIST];
MOVIE_LIST_WITH_DUMMY.push(DUMMY_MOVIE_OBJ_LEFT);
MOVIE_LIST_WITH_DUMMY.unshift(DUMMY_MOVIE_OBJ_RIGHT);

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const ITEM_SIZE_MULTIPLIER = (WINDOW_HEIGHT * WINDOW_HEIGHT) / 64e4;
const ITEM_SIZE =
  WINDOW_WIDTH * 0.5 * (ITEM_SIZE_MULTIPLIER > 1 ? 1 : ITEM_SIZE_MULTIPLIER);
const SPACING = 0;
const POSTER_ASPECT_RATIO = 25 / 37;
const ITEM_HEIGHT = ITEM_SIZE / POSTER_ASPECT_RATIO;
const SCALE_FACTOR = 0.7;
const SNAP_TO_INTERVAL = ITEM_SIZE + 2 * SPACING;

const RenderMoviePoster = ({
  item,
  translateX,
  index,
  handleDetailNavigation,
}) => {
  const INPUT_RANGE = [
    (index - 2) * SNAP_TO_INTERVAL,
    (index - 1) * SNAP_TO_INTERVAL,
    index * SNAP_TO_INTERVAL,
  ];

  const movieCardAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      INPUT_RANGE,
      [SCALE_FACTOR, 1, SCALE_FACTOR],
      Extrapolate.CLAMP,
    );

    const TRANSLATE_VALUE = (ITEM_HEIGHT * (1 - SCALE_FACTOR)) / 2;
    const translateY = interpolate(
      translateX.value,
      INPUT_RANGE,
      [TRANSLATE_VALUE, 0, TRANSLATE_VALUE],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      INPUT_RANGE,
      [0.3, 1, 0.3],
      Extrapolate.CLAMP,
    );

    const padding = interpolate(
      translateX.value,
      INPUT_RANGE,
      [0, 10, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {
          scale,
        },
        {
          translateY,
        },
      ],
      opacity,
      padding,
    };
  });

  if (item?.isDummy) {
    if (item?.title === 'left') {
      return <View style={styles.dummyCardLeft} />;
    }
    return <View style={styles.dummyCardRight} />;
  }
  return (
    <Animated.View
      style={[
        styles.movieCard,
        movieCardAnimatedStyle,
        {alignItems: 'center'},
      ]}>
      <Pressable onPress={handleDetailNavigation}>
        <SharedElement id={item.imdbID}>
          <Image
            source={{uri: item.Poster}}
            style={{
              resizeMode: 'cover',
              aspectRatio: POSTER_ASPECT_RATIO,
              width: '100%',
              borderRadius: 30,
            }}
          />
        </SharedElement>
      </Pressable>
    </Animated.View>
  );
};

const RenderMovieDetail = ({item, translateX, index}) => {
  const INPUT_RANGE = [
    (index - 2) * SNAP_TO_INTERVAL,
    (index - 1) * SNAP_TO_INTERVAL,
    index * SNAP_TO_INTERVAL,
  ];

  const movieCardAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      INPUT_RANGE,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
    };
  });
  if (item?.isDummy) {
    if (item?.title === 'left') {
      return <View style={styles.dummyCardLeft} />;
    }
    return <View style={styles.dummyCardRight} />;
  }
  return (
    <Animated.View style={[styles.movieDetailCard, movieCardAnimatedStyle]}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.movieTitle}>{item.Title}</Text>
        <View style={styles.movieRating}>
          <AntDesign name="star" size={20} color="#ffb43a" />
          <Text style={styles.movieRatingText}>{item.imdbRating}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

const RenderMovieCarouselPagination = ({item, translateX, index}) => {
  const INPUT_RANGE = [
    (index - 2) * SNAP_TO_INTERVAL,
    (index - 1) * SNAP_TO_INTERVAL,
    index * SNAP_TO_INTERVAL,
  ];

  const dotAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      INPUT_RANGE,
      [10, 20, 10],
      Extrapolate.CLAMP,
    );
    const backgroundColor = interpolateColor(translateX.value, INPUT_RANGE, [
      '#78787A',
      '#ffb43a',
      '#78787A',
    ]);

    return {
      width,
      backgroundColor,
    };
  });

  if (item?.isDummy) {
    return null;
  }
  return <Animated.View style={[styles.dot, dotAnimatedStyle]} />;
};

const Carousel = ({navigation}) => {
  const translateX = useSharedValue(0);

  const handleScrollEvent = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const handleDetailNavigation = item => {
    navigation.navigate('Details', {movieData: item});
  };

  return (
    <>
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          data={MOVIE_LIST_WITH_DUMMY}
          renderItem={({item, index}) => (
            <RenderMoviePoster
              item={item}
              translateX={translateX}
              index={index}
              handleDetailNavigation={() => handleDetailNavigation(item)}
            />
          )}
          keyExtractor={(item, index) => index}
          horizontal
          snapToInterval={SNAP_TO_INTERVAL}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={handleScrollEvent}
          scrollEventThrottle={16}
        />
      </View>
      <View style={[styles.carouselFooter]}>
        <View style={{height: 60, width: '100%'}}>
          <Animated.FlatList
            data={MOVIE_LIST_WITH_DUMMY}
            renderItem={({item, index}) => (
              <RenderMovieDetail
                item={item}
                translateX={translateX}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
            contentContainerStyle={{
              position: 'relative',
              width: '100%',
            }}
          />
        </View>

        {/* Pagination Comp */}
        <View style={{alignItems: 'center'}}>
          <Animated.FlatList
            data={MOVIE_LIST_WITH_DUMMY}
            renderItem={({item, index}) => (
              <RenderMovieCarouselPagination
                item={item}
                translateX={translateX}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            scrollEventThrottle={16}
          />
        </View>
      </View>
    </>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
    overflow: 'visible',
  },
  dummyCardLeft: {
    width: (WINDOW_WIDTH - ITEM_SIZE - 4 * SPACING) / 2,
    marginRight: SPACING,
  },
  dummyCardRight: {
    width: (WINDOW_WIDTH - ITEM_SIZE - 4 * SPACING) / 2,
    marginLeft: SPACING,
  },
  movieCard: {
    marginHorizontal: SPACING,
    width: ITEM_SIZE,
  },
  carouselFooter: {width: '100%', height: 80},
  movieDetailCard: {
    position: 'absolute',
    marginHorizontal: 'auto',
    width: ITEM_SIZE,
  },
  movieRating: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieRatingText: {
    color: '#b38239',
    fontSize: 16,
    marginLeft: 5,
    fontWeight: '600',
  },
  movieTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#78787A',
    marginRight: 10,
    borderRadius: 5,
  },
});
