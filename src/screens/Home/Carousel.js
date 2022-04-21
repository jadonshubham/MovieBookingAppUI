/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
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
const ITEM_SIZE = WINDOW_WIDTH * 0.5;
const THUMBNAIL_SIZE = (WINDOW_HEIGHT * WINDOW_HEIGHT) / 64e4;
const SPACING = 0;
const POSTER_ASPECT_RATIO = 25 / 37;
const ITEM_HEIGHT = ITEM_SIZE / POSTER_ASPECT_RATIO;
const SCALE_FACTOR = 0.7;

const RenderMoviePoster = ({item, translateX, index}) => {
  const INPUT_RANGE = [
    (index - 2) * (WINDOW_WIDTH - ITEM_SIZE + 2 * SPACING),
    (index - 1) * (WINDOW_WIDTH - ITEM_SIZE + 2 * SPACING),
    index * (WINDOW_WIDTH - ITEM_SIZE + 2 * SPACING),
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
      <View>
        <Image
          source={{uri: item.Poster}}
          style={{
            resizeMode: 'cover',
            aspectRatio: POSTER_ASPECT_RATIO,
            // height: '100%',
            // width: `${THUMBNAIL_SIZE > 1 ? 100 : THUMBNAIL_SIZE * 100}%`,
            width: '100%',
            borderRadius: 30,
          }}
        />
      </View>
    </Animated.View>
  );
};

const RenderMovieDetail = ({item, translateX, index}) => {
  const INPUT_RANGE = [
    (index - 2) * (WINDOW_WIDTH - ITEM_SIZE + 2 * SPACING),
    (index - 1) * (WINDOW_WIDTH - ITEM_SIZE + 2 * SPACING),
    index * (WINDOW_WIDTH - ITEM_SIZE + 2 * SPACING),
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

const Carousel = () => {
  const translateX = useSharedValue(0);

  const handleScrollEvent = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

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
            />
          )}
          keyExtractor={(item, index) => index}
          horizontal
          snapToInterval={ITEM_SIZE + 2 * SPACING}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          onScroll={handleScrollEvent}
          scrollEventThrottle={16}
        />
      </View>
      <View style={styles.carouselFooter}>
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
    </>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    // flex: 1,
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
});
