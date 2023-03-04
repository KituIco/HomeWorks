import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, Animated, Easing } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { useState } from 'react';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Back from '../hooks/back';

export default function Arriving({navigation}){
  const address = 'UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila';
  const [opacity, setOpacity] = useState(0.1)
  const [accepted, setAccepted] = useState(false);
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue,
      {
       toValue: 1,
       duration: 1200,
       easing: Easing.linear,
       useNativeDriver: true
      }
    )
   ).start();

   const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const changeStatus = () => {
    setAccepted(true);
    setOpacity(0.8);
  }

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>   
      <View style={{width: '100%'}}>
        <Text style={styles.address}><Text style={{fontFamily:'quicksand-medium', color: '#9C54D5'}}>Destination: </Text>{address}</Text>
      </View>

      <View style={{flex:1, width:'100%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:14, zIndex:5}}/>
          <ScrollView style={{marginVertical:-14}}>
            <Image style={[styles.image,{opacity: opacity}]} source={require("../assets/map.png")} />     
          </ScrollView>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:14, zIndex:5}}/>
      </View>

      { !accepted &&
      <View style={styles.waiting}>
        <Animated.View style={{transform:[{rotate:spin}]}}>
          <MaterialCommunityIcons name={'loading'} size={60} color={'#9C54D5'}/>
        </Animated.View>
        <Text style={styles.subheading}>Waiting for the Customer to Agree with the Service Cost and Details submitted.</Text>
      </View>
      }
      
      <View style={{alignItems:'center', width:'100%'}}>
        { !accepted &&
        <TouchableWithoutFeedback onPress={() => changeStatus()}>
          <Text style={styles.header}>Please Standby</Text>
        </TouchableWithoutFeedback>
        }


        { accepted &&
        <View style={{width:'80%'}}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Serving')}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.next}>Press button if you have Arrived</Text>
              </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        </View>
        }

      </View>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(233,233,233,1)' ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={{width:'100%', height:14, zIndex:5}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
  },
  header: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
    paddingVertical: 20
  },

  shadow: {
    borderRadius: 10,
    height: 40,
    width:'100%',
    marginTop: 20,
    marginBottom: 4,
  },
  button: {
    height: 40,
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
  ledge: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },

  image: {
    height: 700,
    width: '250%',
    alignSelf:'center',
  },

  address: {
    fontFamily: 'quicksand',
    width: '75%',
    fontSize: 12,
    color: '#888486',
    marginHorizontal: 20
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 6,
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

  waiting: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 54,
    textAlign: 'center',
    marginTop: 20,
  },
});