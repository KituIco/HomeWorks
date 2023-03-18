import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { StackActions } from '@react-navigation/native';

import CredentialsServices from '../../services/user/credentials-services';
import Loading from '../../hooks/loading';

const screenHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const onLogin = async() => {
    if( mail && password) {
      setLoading(true);
      try {
        await CredentialsServices.login({ identifier: mail, password: password });
        navigation.dispatch(StackActions.popToTop()),
        navigation.replace('HomeStack');

      } catch (err) {
        Alert.alert('Login Warning', err+'. Make sure to input correct credentials.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      { loading && <Loading/> }

      <ScrollView style={{width: '100%'}}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.homeIcon} source={require('../../assets/HomeWorks-Icon.png')} />
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>
      </View>
      </ScrollView>

      <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.bottom}>
        <Text style={styles.botheader}>Hello, Dear Customer!</Text>
        <Text style={styles.content}>Welcome to HomeWorks, your provider of the finest household services.</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setMail} value={mail} placeholder="Email Address"/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true}/>
        </View>

        <TouchableWithoutFeedback onPress= {() => { onLogin() }}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <View style={styles.button}>
              <Text style={styles.register}>Login</Text>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => { navigation.navigate('Register') }}>
          <Text style={styles.login}>Don't have an account? <Text style={{fontFamily:'quicksand-bold', textDecorationLine: 'underline',}}>Register</Text></Text>
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
    marginTop: '35%'
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
    height: screenHeight/1.8,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 20,
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
  },

  textbox: {
    height: 52,
    width: 290,
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans-light',
    fontSize: 16,
  },
});