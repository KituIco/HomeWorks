import { View, Text, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Header from '../../../components/transactheader';
import Listing from '../../../components/serviceListing';
import Loading from '../../../hooks/loading';

import styles from './transaction-complete.style';
import hook from './transaction-complete.hook';

export default function TransactionComplete({route, navigation}) {
  const {
    typeName, icon, value, rates, answered, stars, loading, cost, desc, list, address,
    onChangeText, changeRating, changeStatus,
  } = hook( navigation, route );
  
  var ratings = [];
  for (let i=0; i<5; i++){
    ratings.push(
      <TouchableWithoutFeedback onPress={() => changeRating(i)} key={i}>
        <MaterialCommunityIcons name={stars[i]} size={16} style={{color:'#9C54D5', marginHorizontal:3}}/>
      </TouchableWithoutFeedback>
    )
  }

  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={{flex:1}}>
      <Header service={typeName} icon={icon} phase={4}/>

      <ScrollView style={styles.container}>
        <Text style={styles.status}>Complete</Text>
          <View style={styles.circle}>
            <MaterialCommunityIcons name={'star-check'} size={129} style={{color:'#9C54D5'}}/>
          </View>
        
        <Text style={styles.heading}>Your Service Provider</Text>
        <Listing listings={list} solo={true} navigation={navigation}/>

        <Text style={styles.heading}>Service Payment</Text>
        <View style={styles.subheading}>
          <Text style={[{width: '60%'},styles.texts]}>{typeName} Service</Text>
          <TouchableWithoutFeedback onPress={() => changePaid()}>
            <Text style={[styles.texts, {fontFamily:'quicksand-bold'}]}>Php {cost}</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.heading}>Service Description</Text>
        <Text style={[{marginHorizontal:24},styles.texts]}>{desc}</Text>
        <Text style={[styles.texts, {marginHorizontal:24, marginBottom:20, marginTop:6, color:'#9C54D5', fontFamily:'quicksand-bold'}]}>
          Service Location: <Text style={{color:'#000000', fontFamily:'quicksand-medium'}}>{address}</Text> </Text>

        { answered &&
        <View style={{marginTop:-24, marginBottom: 40}}>
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

      <LinearGradient colors={['rgba(0,0,0,0.9)','rgba(0,0,0,0)']} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
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
              <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)']} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
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