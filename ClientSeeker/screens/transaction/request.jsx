import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Header from '../../components/transactheader';
import Next from '../../components/transactnext';

export default function Request({ route, navigation }) {
  const { service }= route.params;
  let icon = 'hammer-screwdriver';

  if(service=='Carpentry') icon = 'hammer-screwdriver';
  else if(service=='Car Mechanic') icon = 'car-wrench'
  else if(service=='Plumbing') icon = 'water-pump'
  else if(service=='House Cleaning') icon = 'broom'
  else if(service=='Baby Sitting') icon = 'human-baby-changing-table'
  else if(service=='Electrician') icon = 'power-plug'
  else if(service=='Laundry') icon = 'tshirt-crew'
  else if(service=='Appliance Repair') icon = 'television'
  else if(service=='Roof Cleaning') icon = 'home-roof'
  else if(service=='Carpet Cleaning') icon = 'rug'
  else if(service=='Meal Preparation') icon = 'silverware-clean'
  else if(service=='Manicurists') icon = 'hand-clap'
  else if(service=='Hair Dresser') icon = 'face-woman-shimmer'


  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={service} icon={icon} phase={1}/>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Detected Address</Text>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4}}/>
        <Image style={styles.image} source={require("../../assets/map.png")} />
        <Image style={styles.pin} source={require("../../assets/pin.png")} />
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.address}>
          <Text style={styles.location}>UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila</Text>
          <MaterialCommunityIcons name={'pencil-outline'} size={30} color="#9C54D5"/>
        </View>


        <Text style={styles.heading}>Minimum Service Cost</Text>
        <View style={styles.details}>
          <Text style={styles.content}>{service} Service</Text>
          <Text style={styles.content}>Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php 320</Text></Text>
        </View>
        <Text style={styles.subcontent}>Note: Price variation depends on the skill of service provider, the load of your request, the proximity from your location, etc. </Text>

        <Text style={styles.heading}>Your Service Provider</Text>
        <View style={[styles.details, {marginBottom:30}]}>
          <View style={{width: '80%',  marginTop: -2}}> 
            <Text style={styles.content}>We will grant you one of the best and the nearest service provider in your area!</Text>
            <View style={{flexDirection: 'row' }}>
              <Text  style={styles.content}>Want a specific service provider? </Text>
              <Text  style={[styles.content, {textDecorationLine: 'underline', fontFamily: 'quicksand-bold'}]}>Search</Text>
            </View>
          </View>
          <MaterialCommunityIcons name={'account-search-outline'} size={70} color="#9C54D5" style={{marginTop:-16}}/>
        </View>
      
      </ScrollView>

      <Next icon={icon} service={service} navigation={navigation} title={'Request a Booking'} screen={'InitSpecs'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom:-6, 
    backgroundColor: '#F9F9F9',
  },
  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginVertical: 8,
    paddingHorizontal: 20,
  },

  image: {
    height: 250,
    width: '250%',
    alignSelf:'center',
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    marginHorizontal: 24,
    marginVertical: 10,
    paddingBottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  location: {
    fontFamily: 'quicksand',
    width: '80%',
    fontSize: 12,
    color: '#888486',
  },


  details: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  content: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
  },
  subcontent: {
    fontFamily: 'quicksand',
    fontSize: 11,
    marginBottom: 20,
    marginTop: -6,
    marginHorizontal: 24,
    color: '#888486'
  }
});