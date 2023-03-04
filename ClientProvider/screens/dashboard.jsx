import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import Back from '../hooks/back';


export default function Dashboard({navigation}) {
  const name = 'Marcus Galang';
  const [registered, setRegistered] = useState(true);

  const changeRegister = () => {
    setRegistered(!registered);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => changeRegister()}>
        <Text style={styles.heading}>Hello, {name}!</Text>
      </TouchableWithoutFeedback>
      <Back navigation={navigation}/>

      { registered &&
      <View>
        <Text style={styles.subheading}>Please click the Ready Button below if you want to receive Service Requests.</Text>
        <TouchableWithoutFeedback onPress= {() => navigation.navigate('Requests')}>          
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
            <View style={styles.border}>
              <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:-0.3, y:0.8 }} style={styles.button}>
                <Text style={styles.ready}>Ready</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
      }

      { !registered &&
      <View>
        <Text style={styles.subheading}>The admins are verifying your profile. You may manage your profile via Options.</Text>
        <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
          <View style={styles.border}>
            <MaterialCommunityIcons name="account-hard-hat" size={190} color='#9C54D5' style={styles.icons}/>
          </View>
        </LinearGradient>
      </View>
      }

      <Text style={styles.footer}>For questions and concerns, you may contact the admin via chat in the <Text style={styles.redirect}>Options</Text> tab.</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '20%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
  },

  shadow: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    marginTop: 50,
    justifyContent:'center',
    alignSelf: 'center',
  },
  border: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    justifyContent:'center',
    backgroundColor: '#E9E9E9',
    marginTop: -8,
    overflow: 'hidden'
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  ready: {
    fontFamily: 'lexend',
    color: '#F9F9F9',
    fontSize: 32,
    textTransform: 'uppercase',
    letterSpacing: -1
  },

  footer: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    letterSpacing: -0.5,
    marginHorizontal: 48,
    textAlign: 'center',
    marginTop: '38%',
  },
  redirect: {
    fontFamily:'quicksand-bold', 
    textDecorationLine: 'underline',
  },
  icons: {
    marginTop: 6, 
    marginLeft: -8,
  }

});