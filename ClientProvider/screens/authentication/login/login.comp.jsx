import { View, Text, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';
import styles from './login.style';
import hook from './login.hook';

export default function Login({ navigation }) {
  const { 
    mail, password, loading, isKeyboardVisible,
    setMail, setPassword, onLogin,
  } = hook( navigation );

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>
      { loading && <Loading/> }

      <ScrollView style={{width: '100%'}}>
      <View style={{alignItems: 'center', marginTop: 100}}>
        <Text style={styles.botheader}>Hello, Service Provider!</Text>
        <MaterialCommunityIcons name="account-hard-hat" size={160} color='#9C54D5'/>
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setMail} value={mail} placeholder="Email or Number"/>
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
            <Text style={styles.register}>Don't have an account? <Text style={{fontFamily:'quicksand-bold', textDecorationLine: 'underline',}}>
              Register</Text> </Text>
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