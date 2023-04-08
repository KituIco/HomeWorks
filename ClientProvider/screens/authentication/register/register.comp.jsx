import { View, Text, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import styles from './register.style';
import hook from './register.hook';

export default function Register({ navigation }) {
  const {
    mail, password, firstname, lastname, confirm, mailCHK, passwordCHK, firstnameCHK, confirmCHK, lastnameCHK, loading, 
    onCheck, setPassword, setFirstname, setLastname, setConfirm, setMail, onRegister,
  } = hook( navigation );

  return (
    <View style={{flex:1, backgroundColor: '#E9E9E9'}}>
    <View style={{width:'100%', height:40, backgroundColor: '#E9E9E9'}}/>
    { loading && <Loading/> }
    
    <ScrollView style={{width: '100%', backgroundColor: '#E9E9E9'}}>
      <MaterialCommunityIcons name="account-hard-hat" size={160} color='#9C54D5' style={{alignSelf:'center', marginTop:50, marginBottom:-20}}/>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Home<Text style={{color:'#1E1E1E'}}>Works</Text></Text>
        <Text style={styles.subtitle}>Household and Wellness Services App</Text>

        <View style={[styles.textbox,firstnameCHK]}>
          <TextInput style={styles.input} onChangeText={setFirstname} value={firstname} 
            placeholder="First Name" onBlur={() => onCheck('first')}/>
        </View>
        <View style={[styles.textbox,lastnameCHK]}>
          <TextInput style={styles.input} onChangeText={setLastname} value={lastname} 
            placeholder="Last Name" onBlur={() => onCheck('last')}/>
        </View>

        <View style={[styles.textbox,mailCHK]}>
          <TextInput style={styles.input} onChangeText={setMail} value={mail} 
            placeholder="Email Address" onBlur={() => onCheck('mail')}/>
        </View>

        <View style={[styles.textbox,passwordCHK]}>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} 
            placeholder="Password" secureTextEntry={true} onBlur={() => onCheck('pw')}/>
        </View>
        { passwordCHK===styles.warning && 
        <Text style={styles.notice}>At least 8 characters with number, special character, capital letter.</Text> }
        
        <View style={[styles.textbox,confirmCHK]}>
          <TextInput style={styles.input} onChangeText={setConfirm} value={confirm} 
            placeholder="Confirm Password" secureTextEntry={true} onBlur={() => onCheck('confirm')}/>
        </View>

        <TouchableWithoutFeedback onPress= {() => onRegister()}>
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.4 }} end={{ x:0, y:0 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.button}>
              <Text style={styles.register}>Create Account</Text>
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