import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState } from 'react';

import Back from '../hooks/back';
import Listing from '../components/listing';

export default function Requests({navigation}) {

  const baseServices = [
    { id:'0', service: 'Car Mechanic', time: '14m 10s', address: 'UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila'},
    { id:'1', service: 'Electrician', time: '12m 10s', address: '234-B Padre Faura Street, Ermita, Manila, 1000 Metro Manila'},
    { id:'2', service: 'Electrician', time: '10m 10s', address: 'Honda, Quirino Avenue cor. UN Avenue, San Andres, Manila, 1000 Metro Manila'},
    { id:'3', service: 'Appliance Repair', time: '10m 10s', address: 'Smart, Boni Avenue cor. Barangka Drive, Mandaluyong City, 1200 Metro Manila'},
  ]

  for (let i=0; i<baseServices.length; i++) {
    if(baseServices[i].service == 'Carpentry') baseServices[i]['icon'] = 'hammer-screwdriver';
    else if(baseServices[i].service == 'Car Mechanic') baseServices[i]['icon'] = 'car-wrench';
    else if(baseServices[i].service == 'Plumbing') baseServices[i]['icon'] = 'water-pump';
    else if(baseServices[i].service == 'House Cleaning') baseServices[i]['icon'] = 'broom';
    else if(baseServices[i].service == 'Baby Sitting') baseServices[i]['icon'] = 'human-baby-changing-table';
    else if(baseServices[i].service == 'Electrician') baseServices[i]['icon'] = 'power-plug';
    else if(baseServices[i].service == 'Laundry') baseServices[i]['icon'] = 'tshirt-crew';
    else if(baseServices[i].service == 'Appliance Repair') baseServices[i]['icon'] = 'television';
    else if(baseServices[i].service == 'Roof Cleaning') baseServices[i]['icon'] = 'home-roof';
    else if(baseServices[i].service == 'Carpet Cleaning') baseServices[i]['icon'] = 'rug';
    else if(baseServices[i].service == 'Meal Preparation') baseServices[i]['icon'] = 'silverware-clean';
    else if(baseServices[i].service == 'Manicurists') baseServices[i]['icon'] = 'hand-clap';
    else if(baseServices[i].service == 'Hair Dresser') baseServices[i]['icon'] = 'face-woman-shimmer';
  }

  const [services, setServices] = useState(baseServices);
  const [waiting, setWaiting] = useState(false)

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>
      <TouchableWithoutFeedback onPress={() => {setWaiting(!waiting)}}>
        <Text style={styles.header}>Requests Page</Text>
      </TouchableWithoutFeedback>
      
      { waiting &&
      <View style={{alignItems: 'center'}}>
        <Text style={styles.subheader}>Standby for Requests.</Text>
        <MaterialCommunityIcons name="home-search" size={150} color='#9C54D5' style={{marginTop: 20}}/>
        <Text style={styles.subcontent}>Currently waiting Service Requests. Please watch out for App Notifications.</Text>
      </View>
      }
      
      { !waiting &&
      <View style={{width:'100%', height:'75%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
        <ScrollView style={{marginVertical:-10}}>
          <Listing listings={services} navigation={navigation}/>
        </ScrollView>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      </View>
      }
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Dashboard')}>
        <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
            <Text style={styles.content}>Stop Accepting Requests</Text>
          </LinearGradient>
        </LinearGradient>
      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
  },
  header: {
    fontFamily: 'lexend',
    color: '#9C54D5',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
  },

  shadow: {
    borderRadius: 10,
    height: 34,
    marginBottom: 40,
    marginTop: 10,
    width:'80%',
  },
  button: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
  },

  content: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },

  subheader: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
  },
  subcontent: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 60
  },
});