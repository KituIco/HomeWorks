import { View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import styles from './login.style';
import hook from './login.hook';

export default function Login({ navigation }) {
  const {
    mail, password, loading,
    setMail, setPassword, onLogin,
  } = hook( navigation );

  return (
    <View style={styles.container}>
      { loading && <Loading/> }

      <ScrollView style={{width: '100%'}}>
      <View style={{alignItems: 'center'}}>
        <Image style={styles.homeIcon} source={require('../../../assets/HomeWorks-Icon.png')} />
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>
      </View>
      </ScrollView>

      <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.bottom}>
        <Text style={styles.botheader}>Hello, Dear Customer!</Text>
        <Text style={styles.content}>Welcome to HomeWorks, your provider of the finest household services.</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setMail} value={mail} placeholder="Email or Number"/>
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
