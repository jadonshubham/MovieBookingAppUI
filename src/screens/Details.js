/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Pressable,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('screen');
const POSTER_ASPECT_RATIO = 25 / 37;
const HORIZONTAL_SPACING = 20;
const VERTICAL_SPACING = 20;

const RenderCast = ({item}) => {
  return (
    <View style={styles.castTile}>
      <Image source={{uri: item.thumbnail}} style={styles.castThumbnail} />
      <View style={styles.castNameContainer}>
        <Text style={styles.castName}>{item.name}</Text>
        <Text style={styles.castPetName}>{item.petName}</Text>
      </View>
    </View>
  );
};

const Details = ({route, navigation}) => {
  const {movieData} = route.params;
  const insets = useSafeAreaInsets();

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ScrollView style={styles.container}>
        <View style={styles.headerImage}>
          <View style={{position: 'relative', width: '100%', height: '100%'}}>
            <Image
              source={{uri: movieData.Poster}}
              style={{
                resizeMode: 'cover',
                aspectRatio: POSTER_ASPECT_RATIO,
                width: '100%',
              }}
            />
            <LinearGradient
              colors={['transparent', 'rgba(153, 153, 153, 0.5)', '#21242C']}
              style={styles.gradient}
            />
          </View>
        </View>
        <View style={[styles.navbar, {top: insets?.top || 10}]}>
          <Pressable onPress={goBack} style={styles.navbarIconContainer}>
            <Ionicons name="chevron-back" size={30} color="#ffffff" />
          </Pressable>
          <View style={styles.navbarIconContainer}>
            <MaterialCommunityIcons name="bookmark" size={30} color="#ffffff" />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeading}>{movieData?.Title}</Text>
            <View style={styles.movieRating}>
              <AntDesign name="star" size={20} color="#ffb43a" />
              <Text style={styles.movieRatingText}>{movieData.imdbRating}</Text>
            </View>
          </View>
          <View style={styles.plotContainer}>
            <Text style={styles.plot} numberOfLines={5}>
              {movieData.Plot}
            </Text>
            <View style={styles.movieInfo}>
              <Text style={styles.movieInfoText}>
                Director:{' '}
                <Text style={styles.movieInfoName}>{movieData.Director}</Text>
              </Text>
              <Text style={[styles.movieInfoNameSeperator]}>|</Text>
              <Text
                style={[styles.movieInfoText, {flex: 1}]}
                numberOfLines={1}
                ellipsizeMode="clip">
                Writer:{' '}
                <Text style={styles.movieInfoName}>
                  {movieData.Writer?.split(',')?.[0] || movieData.Writer}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.seperator} />
          <View style={styles.castContainer}>
            <Text style={styles.castContainerHeading}>Starring</Text>
            <ScrollView
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <FlatList
                scrollEnabled={false}
                data={movieData?.cast}
                numColumns={Math.ceil(movieData?.cast?.length / 2)}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({item}) => <RenderCast item={item} />}
                ItemSeparatorComponent={item => (
                  <View style={{height: 20, width: 10}} />
                )}
                contentContainerStyle={styles.castListContainer}
              />
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity activeOpacity={0.9} style={styles.button}>
          <Text style={styles.buttonText}>Reservation</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: insets.bottom || 10}} />
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242C',
    fontFamily: 'Montserrat-Regular',
  },
  headerImage: {
    height: height / 2.7,
  },
  navbar: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_SPACING,
  },
  navbarIconContainer: {
    backgroundColor: 'rgba(33,36,44, 0.6)',
    padding: 8,
    borderRadius: 15,
  },
  gradient: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  card: {
    flex: 1,
    backgroundColor: '#21242C',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: HORIZONTAL_SPACING,
    marginTop: -5,
  },
  cardHeading: {
    fontSize: 24,
    color: '#ffffff',
    fontFamily: 'Montserrat-ExtraBold',
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
  plotContainer: {
    paddingLeft: HORIZONTAL_SPACING,
    paddingRight: 2 * HORIZONTAL_SPACING,
    marginTop: VERTICAL_SPACING,
  },
  plot: {
    color: '#F5F6F8',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
  },
  movieInfo: {
    flexDirection: 'row',
    marginTop: VERTICAL_SPACING,
  },
  movieInfoText: {
    color: '#F5F6F8',
    fontSize: 14,
  },
  movieInfoName: {
    fontFamily: 'Montserrat-SemiBold',
  },
  movieInfoNameSeperator: {
    paddingHorizontal: 5,
    color: '#F5F6F8',
    fontSize: 14,
  },
  seperator: {
    marginVertical: VERTICAL_SPACING,
    marginHorizontal: HORIZONTAL_SPACING,
    borderBottomWidth: 2,
    borderBottomColor: '#343641',
  },
  castContainer: {
    paddingLeft: HORIZONTAL_SPACING,
  },
  castContainerHeading: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#ffffff',
  },
  castListContainer: {
    marginVertical: VERTICAL_SPACING,
    marginLeft: -10,
  },
  castTile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: width / 1.7,
    overflow: 'hidden',
  },
  castThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  castNameContainer: {
    marginLeft: 10,
    width: '100%',
  },
  castName: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 5,
  },
  castPetName: {
    color: '#f5f6f8',
    fontSize: 14,
  },
  buttonContainer: {
    paddingHorizontal: HORIZONTAL_SPACING,
    marginTop: VERTICAL_SPACING,
  },
  button: {
    borderRadius: 15,
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
