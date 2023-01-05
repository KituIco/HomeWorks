import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function Explore() {
  const explore = [
    {key: 'Edgardo Dela Cena', location: 'Bacoor City', ratings: '4.8', service: 'Roof Cleaning', price: 'min Php 410', src: require("../assets/providers/provider-d.png")},
    {key: 'Ricardo Pollicar', location: 'Mandaluyong City', ratings: '4.4', service: 'Meal Prep Service', price: 'min Php 300', src: require("../assets/providers/provider-e.png")},
    {key: 'Ced Montenegro', location: 'Manila', ratings: '4.6', service: 'Plumbing', price: 'min Php 350', src: require("../assets/providers/provider-f.png")},
    {key: 'Alex Guerrero', location: 'Taguig City', ratings: '4.3', service: 'Car Mechanic', price: 'min Php 420', src: require("../assets/providers/provider-a.png")},
    {key: 'Precious Trinidad', location: 'Los Baños', ratings: '4.6', service: 'House Cleaning', price: 'min Php 360', src: require("../assets/providers/provider-b.png")},
    {key: 'Fe Mercado', location: 'Antipolo', ratings: '4.2', service: 'Laundry', price: 'min Php 330', src: require("../assets/providers/provider-c.png")},
  ]

  const providersList = data => {
    return (
      <View style={styles.lists}>
        <Image style={styles.image} source={data.src} />

        <View style={styles.details}>
          <View style={styles.detailstop}>
            <Text style={styles.names}>{data.key}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
              <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
              <Text style={styles.ratings}>{data.ratings}</Text>
            </View>
          </View>
          
          <Text style={styles.location}>{data.location}</Text>
          <View style={styles.detailsbot}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.tag}>
              <Text style={styles.serve}>{data.service}</Text>
            </LinearGradient>
            <Text style={styles.price}>{data.price}</Text>  
          </View>
        </View>

      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.sections}>
        <View style={styles.grid} paddingBottom={20}>
          {explore.map((value, index) => {
            return providersList(value);
          })}
        </View>
      </View>

    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  sections:{
    paddingVertical: 30,
  },
  lists: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: "#323941",
    margin: 8
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10
  },
  details: {
    width: screenWidth - 150,
    marginLeft: 10,
    marginRight: 4
  },

  detailstop: {
    marginTop: -2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsbot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  names: {
    fontFamily: 'notosans',
    fontSize: 20,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },
  ratings: {
    fontFamily: 'quicksand-medium',
    fontSize: 14
  },

  location: {
    fontFamily: 'quicksand',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 16
  },
  price: {
    fontFamily: 'quicksand',
    fontSize: 12,
    alignSelf: 'flex-end',
    paddingBottom: 2
  },

  tag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  serve: {
    color: "#F9F9F9",
    fontFamily: 'lexend-light',
    fontSize: 12
  }
});