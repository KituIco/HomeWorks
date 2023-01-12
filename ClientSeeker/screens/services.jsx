import React from 'react';
import { ScrollView, View } from 'react-native';
import Grid from '../components/grid';
import ListHeader from '../components/listheader';

export default function Services({navigation}) {
  const services = [
    {key: 'Carpentry', icon: 'hammer-screwdriver'},
    {key: 'Car Mechanic', icon: 'car-wrench'},
    {key: 'Plumbing', icon: 'water-pump'},
    {key: 'House Cleaning', icon: 'broom'},
    {key: 'Baby Sitting', icon: 'human-baby-changing-table'},
    {key: 'Electrician', icon: 'power-plug'},
    {key: 'Laundry', icon: 'tshirt-crew'},
    {key: 'Appliance Repair', icon: 'television'},
    {key: 'Roof Cleaning', icon: 'home-roof'},
    {key: 'Carpet Cleaning', icon: 'rug'},
    {key: 'Meal Preparation', icon: 'silverware-clean'},
    {key: 'Manicurists', icon: 'hand-clap'},
    {key: 'Hair Dresser', icon: 'face-woman-shimmer'},
  ]
  
  return (
    <View style={{justifyContent: 'flex-end'}}>
      <ListHeader title={"Services"}/>
      <ScrollView>
        <View>
          <Grid listings = {services} navigation={navigation}/>
        </View>
      </ScrollView>
    </View>
  );
}