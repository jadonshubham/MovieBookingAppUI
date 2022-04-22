import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ProfileImage from '../../assets/images/avatar.jpg';
import Carousel from './Carousel';

const FILM_GENRE = [
  {type: 'Horror', emoji: '😱'},
  {type: 'Action', emoji: '😎'},
  {type: 'Drama', emoji: '😚'},
  {type: 'Fantasy', emoji: '✨'},
  {type: 'Comedy', emoji: '😜'},
  {type: 'Mystery', emoji: '😲'},
  {type: 'Romance', emoji: '😍'},
  {type: 'Thriller', emoji: '😬'},
  {type: 'Western', emoji: '🤠'},
];

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText1}>Welcome Larry 👋</Text>
          <Text style={styles.headerText2}>
            What movie are we going to see today?
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Image style={styles.headerImage} source={ProfileImage} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.input}>
          <Feather name="search" size={20} color="#78787A" />
          <TextInput
            style={styles.textInput}
            placeholder="Search"
            placeholderTextColor="#78787A"
          />
        </View>
      </View>
      <View style={styles.genreContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.genreContentContainer}
          showsHorizontalScrollIndicator={false}
          // style={styles.genreContainer}
        >
          {FILM_GENRE.map(ele => (
            <View key={ele.type} style={styles.genreBlock}>
              <Text style={styles.genre}>
                {ele.emoji} {ele.type}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.carouselHeadingContainer}>
        <Text style={styles.carouselHeading}>Showing this month</Text>
      </View>
      <Carousel navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21242C',
    paddingVertical: 20,
  },
  header: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerText1: {
    color: '#777880',
    fontSize: 16,
  },
  headerText2: {
    color: '#F5F6F8',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
  },
  headerRight: {
    paddingLeft: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  input: {
    borderRadius: 30,
    backgroundColor: '#2A2D37',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    padding: 0,
    flex: 1,
    paddingLeft: 10,
    color: '#78787A',
    fontSize: 16,
  },
  genreContainer: {
    marginTop: 20,
    height: 40,
  },
  genreContentContainer: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  genreBlock: {
    marginLeft: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#2A2D37',

    // to created shadow effect
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 5,
    borderColor: '#1A1D27',
  },
  genre: {
    color: '#F5F6F8',
    fontSize: 16,
  },
  carouselHeadingContainer: {
    paddingHorizontal: 10,
    marginTop: 25,
  },
  carouselHeading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F5F6F8',
  },
});
