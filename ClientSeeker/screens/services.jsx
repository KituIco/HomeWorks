import React from 'react';
import { ScrollView } from 'react-native';
import Grid from '../components/grid';

export default function Services() {
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
    {key: 'Meal Prep Services', icon: 'silverware-clean'},
    {key: 'Manicurists', icon: 'hand-clap'},
    {key: 'Hair Dresser', icon: 'face-woman-shimmer'},
  ]
  
  return (
    <ScrollView>
      <Grid listings = {services} />
    </ScrollView>
  );
}