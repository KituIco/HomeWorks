import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState } from 'react';

export default function Details({navigation}) {
  const service = 'Carpentry';
  const address = 'UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila';
  const specs = 'One of my closet doors fell of the track. I am requesting to replace both of the closet doors since the other door seems to be detached soon as well. \n\n I am looking for a carpenter that can create customized closet doors. I will only provide the door materials.'

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{service}</Text>

      <View style={{width:'100%', height: '70%'}}>
        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0.5)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:14, zIndex:5}}/>
        <ScrollView style={{marginVertical:-10}}>
          <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5, marginTop:10}}/>
          <Image style={styles.image} source={require("../assets/map.png")} />
          <Image style={styles.pin} source={require("../assets/pin.png")} />
          <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5, marginTop:-4}}/>

          <Text style={styles.address}>{address}</Text>

          <Text style={styles.heading}>Minimum Service Cost</Text>
          <View style={styles.details}>
            <Text style={styles.content}>{service} Service</Text>
            <Text style={styles.content}>Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php 320</Text></Text>
          </View>

          <Text style={styles.heading}>Service Specs</Text>
          <Text style={styles.content}>{specs}</Text>
        </ScrollView>
        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0.5)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:14, zIndex:5}}/>
      </View>
      
      <View style={{marginBottom:30, marginTop:12, width:'80%', alignItems:'center'}}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={[styles.button, {borderWidth:1, borderColor: '#606060', height:32}]}>
            <Text style={[styles.next, {color: '#606060', fontSize:14}]}>Go Back to Requests Page</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('')}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <Text style={styles.next}>Settle Request via Chat</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
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
    marginTop: 10,
    width:'100%',
  },
  button: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
  },

  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },

  image: {
    height: 250,
    width: '250%',
    alignSelf:'center',
    marginTop: -4
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    fontFamily: 'quicksand',
    width: '75%',
    fontSize: 12,
    color: '#888486',
    marginVertical: 6,
    marginHorizontal: 20
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 12,
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 24,
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
  },

});