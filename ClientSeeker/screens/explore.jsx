import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import { Dimensions } from 'react-native';
import Listing from '../components/listing';

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

  return (
    <ScrollView style={styles.container}>
      <Listing listings={explore}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
});