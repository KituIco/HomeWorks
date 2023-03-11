import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView, Keyboard } from 'react-native';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Back from '../../hooks/back';
import CredentialsServices from '../../services/user/credentials-services';

const screenHeight = Dimensions.get('window').height;

export default function Login({ navigation }) {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow', () => { setKeyboardVisible(true); });
    const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide', () => { setKeyboardVisible(false); });
  return () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
  };
  }, []);

  const onLogin = () => {
    if( mail && password) {
      CredentialsServices.login({
        identifier: mail,
        password: password,
      }).then(() => {
        navigation.replace('HomeStack');
        navigation.navigate('HomeStack');
      }).catch((err) => console.log(err)) 
    }
  }

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>

      <ScrollView style={{width: '100%'}}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.botheader}>Hello, Service Provider!</Text>
        <MaterialCommunityIcons name="account-hard-hat" size={160} color='#9C54D5'/>
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setMail} value={mail} placeholder="Email Address"/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true}/>
        </View>

        <TouchableWithoutFeedback onPress= {() => onLogin()}>
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.4 }} end={{ x:0, y:0 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.button}>
              <Text style={styles.login}>Login</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
      </ScrollView>

      { !isKeyboardVisible &&
      <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.bottom}>

          <TouchableWithoutFeedback onPress= {() => { navigation.navigate('Register') }}>
            <Text style={styles.register}>Don't have an account? <Text style={{fontFamily:'quicksand-bold', textDecorationLine: 'underline',}}>Register</Text></Text>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress= {() => { navigation.navigate('Register') }}>
              <View style={styles.button}>
                <Text style={[styles.login,{color:'#000'}]}>Register</Text>
              </View>
          </TouchableWithoutFeedback>

        </LinearGradient>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop:100
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
    marginTop: -20,
    color: '#462964'
  },
  subtitle: {
    fontFamily: 'quicksand-light',
    fontSize: 15,
    letterSpacing: -0.6,
    marginTop: -6,
    color: '#1E1E1E',
    marginBottom: 30
  },

  bottom: {
    width: '100%',
    height: screenHeight/5,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botheader: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    color: '#000',
    letterSpacing: -0.5,
    marginBottom: 30
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 44,
    width: 300,
    marginTop: 30,
    justifyContent:'center',
    marginBottom: 40
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
  login: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: -0.5
  },
  register: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 20,
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
  }
});