import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from 'react-native';

import Back from '../../hooks/back';

const screenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>

      <View style={{alignItems: 'center'}}>
        <Image style={styles.homeIcon} source={require('../../assets/HomeWorks-Icon.png')} />
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>
      </View>

      <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.bottom}>
        <Text style={styles.botheader}>Hello, Dear Customer!</Text>
        <Text style={styles.content}>Welcome to HomeWorks, your provider of the finest household services.</Text>

        <TouchableWithoutFeedback onPress= {() => { navigation.navigate('Register') }}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <View style={styles.button}>
              <Text style={styles.register}>Register</Text>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => { navigation.navigate('Login') }}>
          <Text style={styles.login}>Already have an account? <Text style={{fontFamily:'quicksand-bold', textDecorationLine: 'underline',}}>Login</Text></Text>
        </TouchableWithoutFeedback>

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },


  homeIcon: {
    width: 100,
    height: 100,
    marginTop: '45%'
  },
  title: {
    fontFamily: 'lexend',
    fontSize: 48,
    letterSpacing: -2,
    marginTop: 10,
    color: '#462964'
  },
  subtitle: {
    fontFamily: 'quicksand-light',
    fontSize: 15,
    letterSpacing: -0.6,
    marginTop: -6,
    color: '#1E1E1E'
  },

  bottom: {
    width: '100%',
    height: screenHeight/2.5,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 14,
  },
  botheader: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  content: {
    fontFamily: 'quicksand-light',
    fontSize: 15,
    color: '#E9E9E9',
    letterSpacing: -0.5,
    width: 270,
    textAlign: 'center',
    marginTop: 12,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 48,
    width: 300,
    marginTop: 40,
    justifyContent:'center',
    
  },
  button: {
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    alignItems: 'center',
    width: 300,
  },
  register: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#1E1E1E',
    letterSpacing: -0.5
  },
  login: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    color: '#FFF'
  }
});