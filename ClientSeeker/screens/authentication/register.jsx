import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView, Alert } from 'react-native';
import { Dimensions } from 'react-native';

import SeekerServices from '../../services/user/seeker-services'

const screenHeight = Dimensions.get('window').height;

export default function Register({ navigation }) {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [confirm, setConfirm] = useState('')

  const passwordError = () =>
    Alert.alert('Check your Password', 
    'Your password input and confirmation of password input did not match', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const onRegister = () => {
   
    if (password == confirm) {
      // navigation.navigate('Credentials', {
      //   firstname: firstname, 
      //   lastname: lastname,
      //   mail: mail,
      //   password: password,
      // });

      let res = SeekerServices.createSeeker({
        email: mail,
        password: password,
        firstName: firstname,
        lastName: lastname,
      })
      navigation.navigate('Dashboard') 
    }

    else {
      passwordError()
    }
  }

  return (
    <View style={{flex:1, backgroundColor: '#E9E9E9'}}>
    <View style={{width:'100%', height:40, backgroundColor: '#E9E9E9'}}/>
    
    <ScrollView style={{width: '100%', backgroundColor: '#E9E9E9'}}>

      <View style={{alignItems: 'center'}}>
        <Image style={styles.homeIcon} source={require('../../assets/HomeWorks-Icon.png')} />
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setFirstname} value={firstname} placeholder="First Name"/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setLastname} value={lastname} placeholder="Last Name"/>
        </View>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setMail} value={mail} placeholder="Email Address"/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Password" secureTextEntry={true}/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setConfirm} value={confirm} placeholder="Confirm Password" secureTextEntry={true}/>
        </View>


        <TouchableWithoutFeedback onPress= {() => { onRegister() }}>
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.4 }} end={{ x:0, y:0 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.button}>
              <Text style={styles.register}>Register</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => { navigation.navigate('Login') }}>
          <Text style={styles.login}>Already have an account? <Text style={{fontFamily:'quicksand-bold', textDecorationLine: 'underline',}}>Login</Text></Text>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    homeIcon: {
    width: 100,
    height: 100,
    marginTop: '25%'
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
    color: '#1E1E1E',
    marginBottom: 20,
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
    height: 42,
    width: 320,
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
    width: 320,
  },
  register: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  login: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    color: '#1E1E1E',
    marginBottom: 30
  },

  textbox: {
    height: 52,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5
  }
});