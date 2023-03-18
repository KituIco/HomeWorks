import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../../components/transactheader';
import Listing from '../../components/listing';

export default function Complete({route, navigation}) {
  const { service, icon } = route.params;
  const [value, onChangeText] = React.useState('');
  const [rates, setRates] = React.useState(0);
  const [answered, setAnswered] = React.useState(false);

  const starList = ['star-outline','star-outline','star-outline','star-outline','star-outline']
  const [stars, setStars] = useState(starList);

  const provider = [
    {key: 'Alex Guerrero', location: 'Taguig City', ratings: '4.3', service: 'Car Mechanic', price: 'min Php 420', src: require("../../assets/providers/provider-a.png")},
  ]
  const price = '420.00'

  const changeRating = (rate) => {
    let newList = ['star-outline','star-outline','star-outline','star-outline','star-outline'];
    for (let i=0; i<=rate; i++){
      newList[i] = 'star'
    }
    setStars(newList);
    setRates(rate+1);
  }

  const changeStatus = () => {
    setAnswered(true);
  }

  var ratings = [];
  for (let i=0; i<5; i++){
    ratings.push(
      <TouchableWithoutFeedback onPress={() => changeRating(i)} key={i}>
        <MaterialCommunityIcons name={stars[i]} size={16} style={{color:'#9C54D5', marginHorizontal:3}}/>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={{flex:1}}>
      <Header service={service} icon={icon} phase={4}/>

      <ScrollView style={styles.container}>
        <Text style={styles.status}>Complete</Text>
          <View style={styles.circle}>
            <MaterialCommunityIcons name={'star-check'} size={129} style={{color:'#9C54D5'}}/>
          </View>
        
        <Text style={styles.heading}>Your Service Provider</Text>
        <Listing listings={provider} solo={true}/>

        <Text style={styles.heading}>Service Payment</Text>
        <View style={styles.subheading}>
          <Text style={[{width: '60%'},styles.texts]}>{service} Service</Text>
          <TouchableWithoutFeedback onPress={() => changePaid()}>
            <Text style={styles.texts}> Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {price}</Text></Text>
          </TouchableWithoutFeedback>
        </View>

        { answered &&
        <View style={{marginTop:-24}}>
          <Text style={styles.heading}>My Feedback</Text>
          <View style={styles.subheading}>
            <Text style={[{width: '85%', paddingBottom:4},styles.texts]}>{value} </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
              <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
              <Text style={styles.ratings}> {rates}</Text>
            </View>
          </View>
        </View>
        }

      </ScrollView>

      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
        { !answered &&
        <View style={styles.bottom}>

          { rates === 0 || value === '' ? (
            <Text style={styles.instructions}>Toggle Star Ratings and Add a Review to Submit Feedback</Text>
          ): (null)
          }
          

          <View style={styles.stars}>
            { ratings }
          </View>
          <TextInput multiline numberOfLines={3} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
            placeholder='We would greatly appreciate your review for our service.'/>

          { rates !== 0 && value !== '' ? (
            <TouchableWithoutFeedback onPress= {() => changeStatus()}>
              <LinearGradient colors={['rgba(10,10,10,0.4)','rgba(10,10,10,0)']} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
                <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.accept}>
                  <Text style={styles.prompt}>Submit Ratings and Review</Text>
                </LinearGradient>         
              </LinearGradient>
            </TouchableWithoutFeedback>
          ): (null)
          }
          
        </View>
        }

      </LinearGradient>

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

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    margin: 24,
    marginTop: -4,
    alignItems: 'center',
  },
  texts: {
    fontFamily: 'quicksand', 
    fontSize: 12,
  },

  bottom: {
    height: 170,
    backgroundColor: '#E9E9E9',
    marginTop:6,
    alignItems: 'center',
    padding: 12,
  },
  text: {
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    // placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    textAlignVertical: 'top',
    letterSpacing: -0.5,
    fontSize: 12,
    width: '100%',
    marginTop: 6,
  },

  accept: {
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
  },
  shadow: {
    marginHorizontal: 30,
    borderRadius: 6,
    width: '100%',
    marginTop: 10,
  },
  prompt: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 14,
  },
  stars: {
    flexDirection:'row',
    width: '100%', 
    marginTop:6, 
    alignItems:'center',
    justifyContent: 'flex-end',
  },

  instructions: {
    textAlign: 'center',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    color:'#484446',
    marginVertical: 10,
  },
  ratings: {
    fontFamily: 'quicksand-medium',
    fontSize: 14
  },
});