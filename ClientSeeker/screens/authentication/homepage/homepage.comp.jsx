import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Back from '../../../hooks/back';
import styles from './homepage.style';
import hook from './homepage.hook';

export default function Home({ navigation }) {
  const {} = hook();

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>

      <View style={{alignItems: 'center'}}>
        <Image style={styles.homeIcon} source={require('../../../assets/HomeWorks-Icon.png')} />
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