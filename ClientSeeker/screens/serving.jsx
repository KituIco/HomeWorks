import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackActions } from '@react-navigation/native';

import Header from '../components/transactheader';
import Next from '../components/transactnext';
import Listing from '../components/listing';

export default function Serving({route, navigation}) {
  const { service, icon } = route.params;
  const [status, setStatus] = useState('Arriving');
  const [statusIcon, setStatusIcon] = useState('train-car');
  const [paid, setPaid] = useState(false)

  const provider = [
    {key: 'Alex Guerrero', location: 'Taguig City', ratings: '4.3', service: 'Car Mechanic', price: 'min Php 420', src: require("../assets/providers/provider-a.png")},
  ]
  const price = '520.00'

  const changeStatus = () => {
    setStatus('Serving');
    setStatusIcon('progress-star');
  };

  const changePaid = () => {
    setPaid(!paid)
  }
  
  return (
    <View style={{flex:1}}>
      {/* remove touchables */}
      <Header service={service} icon={icon} phase={3}/>

      <ScrollView style={styles.container}>
        <Text style={styles.status}>{status}</Text>
        <TouchableWithoutFeedback onPress={() => changeStatus()}>
          <View style={styles.circle}>
            <MaterialCommunityIcons name={statusIcon} size={129} style={{color:'#9C54D5'}}/>
          </View>
        </TouchableWithoutFeedback>
        
        <Text style={styles.heading}>Your Service Provider</Text>
        <Listing listings={provider} solo={true}/>

        <Text style={styles.heading}>Service Payment</Text>
        <View style={styles.subheading}>
          <Text style={[{width: '60%'},styles.texts]}>{service} Service</Text>
          <TouchableWithoutFeedback onPress={() => changePaid()}>
            <Text style={styles.texts}> Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {price}</Text></Text>
          </TouchableWithoutFeedback>
        </View>

      </ScrollView>

      { !paid &&
      <Next icon={icon} service={service} navigation={navigation} title={'Settle Payment'} screen={'Payment'}/>
      }

      { paid &&
      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
        <TouchableWithoutFeedback onPress= {() => {
          navigation.dispatch(StackActions.popToTop()),
          navigation.navigate('CompleteStack', {service: service, icon: icon})
        }}>
        <View style={styles.bottom}>
          <MaterialCommunityIcons name={'check-circle-outline'} size={26} style={{color:'#462964'}}/>
          <Text style={styles.bottext}>Payment has been Settled</Text>
        </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
      }

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  status: {
    fontFamily: 'lexend',   
    fontSize: 23,
    textTransform:'uppercase',
    alignSelf: 'center',
    color: "#9C54D5",
    letterSpacing: -1,
    marginTop: 24,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 140,
    backgroundColor: '#E9E9E9',
    alignSelf: 'center',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
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

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    margin: 24,
    marginTop: -4,
    alignItems: 'center'
  },
  texts: {
    fontFamily: 'quicksand', 
    fontSize: 12
  },

  bottom: {
    height: 80,
    backgroundColor: '#E9E9E9',
    marginTop:6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottext: {
    fontSize: 20,
    letterSpacing: -0.5,
    fontFamily: 'lexend',
    color: '#462964',
    paddingLeft: 6,
    paddingBottom: 2,
  }
});