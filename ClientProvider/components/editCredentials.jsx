import { StyleSheet, View, Text, TextInput, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import CredentialsServices from '../services/user/credentials-services';
import { contactHandler } from '../utils/contactHandler';
import Loading from '../hooks/loading';

export default function EditCredentials( props ) {
  let userID = props.providerID;
  let type = props.type;
  let label = type=="Password" ? "Current Password" : "Password";

  let emailType = type=="Email" ? true : false;
  let contactType = type=="Contact Number" ? true : false;
  let passwordType = type=="Password" ? true : false;
  

  const [email, setEmail] = useState(props.email);
  const [contact, setContact] = useState(props.contact);
  const [password, setPassword] = useState();
  const [newPW, setNewPW] = useState();
  const [confirm, setConfirm] = useState();

  const [mailCHK, setMailCHK] = useState();
  const [contactCHK, setContactCHK] = useState();
  const [passwordCHK, setPasswordCHK] = useState();
  const [confirmCHK, setConfirmCHK] = useState();

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  

  useEffect(() => {
    if(done) {
      setTimeout(() => {
        props.navigation.replace('HomeStack');
        props.navigation.navigate('HomeStack', { screen:'OptionsStack', 
          params: { screen: 'Profile', initial:false} });
      }, 1000)
    }
  }, [done]);

  const onUpdate = async() => {
    if(new Set([mailCHK, contactCHK, passwordCHK, confirmCHK ]).has(styles.warning) ){
      Alert.alert('Check your Inputs', 
        'Valid inputs have input boxes with light green border.', [
        {text: 'OK'},
      ]);
    } 
    setLoading(true);
    try {
      await CredentialsServices.login({identifier:props.email, password});
      if (emailType) { await CredentialsServices.patchEmail( userID, {email})};
      if (contactType) { await CredentialsServices.patchPhoneNumber( userID, {phoneNumber:contact})};
      if (passwordType) { await CredentialsServices.patchPassword( userID, {password:newPW})};

      props.fromChild();
      setDone(true);
    } catch (err) {
      Alert.alert('Update Error', err+'.', [ {text: 'OK'} ]);
    } 
    setLoading(false);
  }

  const onCheck = (type) => {
    let mailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    let numRegex = new RegExp(/^\+639[0-9]{9}/);

    if (type == 'pw'|| type == 'confirm') setConfirmCHK( (newPW == confirm) ? styles.accepted : styles.warning);
    else if (type == 'contact') setContactCHK( numRegex.test(contact) ? styles.accepted : styles.warning);
    else if (type == 'email') setMailCHK( mailRegex.test(email) ? styles.accepted : styles.warning);
    if (type == 'pw' ) setPasswordCHK( passRegex.test(newPW) ? styles.accepted : styles.warning) 
  }

  if(done) 
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text style={[styles.address, {fontSize:24, marginTop:-20}]}>Profile Updated</Text>
        <Text style={[styles.desc, {marginBottom:20, marginTop:-6}]}>This form will be closed.</Text>
        <MaterialCommunityIcons name={'progress-check'} size={160} color={'#9C54D5'}/>
      </View>
    )
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={'update'} size={80} color={'#9C54D5'} style={{marginTop:30, marginLeft:10, marginBottom:-8}}/>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:10}}/>        
      <ScrollView style={{marginVertical:-10, paddingHorizontal: 22}}>
        <Text style={styles.head}>Update {type}</Text>
        { !passwordType &&
        <Text style={styles.desc}>To update this info, please enter your new {type} and enter your password. </Text>
        }

        { emailType &&
          <View style={[styles.textbox, mailCHK]}>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Email Address" onBlur={() => onCheck('email')}/>
          </View>
        }

        { contactType &&
          <View style={[styles.textbox, contactCHK]}>
            <TextInput numberOfLines={1} style={styles.input} onChangeText={setContact} value={contactHandler(contact)} placeholder="Contact Number"
            onFocus={() => { if(!contact) setContact('+63') }} onBlur={() => { onCheck('contact'); if(contact == '+63' || contact == '+6') setContact('')} }/>
          </View>
        }

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder={label} secureTextEntry={true}/>
        </View>

        { passwordType &&
        <View>
          <View style={[styles.textbox, passwordCHK]}>
            <TextInput style={styles.input} onChangeText={setNewPW} value={newPW} placeholder='New Password' secureTextEntry={true} onBlur={() => onCheck('pw')}/>
          </View>
          { passwordCHK===styles.warning && 
            <Text style={styles.notice}>At least 8 characters with number, special character, capital letter.</Text> }

          <View style={[styles.textbox, confirmCHK]}>
            <TextInput style={styles.input} onChangeText={setConfirm} value={confirm} placeholder='Confirm Password' secureTextEntry={true} onBlur={() => onCheck('confirm')}/>
          </View>
        </View>
        }

        
        <TouchableWithoutFeedback onPress={() => onUpdate()}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.details}>Update {type}</Text>
            </LinearGradient>
          </LinearGradient> 
        </TouchableWithoutFeedback>
      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:11, zIndex:5, marginBottom:10}}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '92%',
  },
  head: {
    fontFamily: 'notosans',
    fontSize: 24,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    marginTop: -10
  },
  desc: {
    fontFamily: 'quicksand',
    fontSize: 13,
    letterSpacing: -0.5,
    color: '#323941',
    textAlign:'justify',
    marginBottom: 10
  },

  textbox: {
    height: 52,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5,
    maxWidth: 280,
  },

  header: {
    fontFamily: 'notosans',
    fontSize: 14,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    marginTop: 10,
    color: '#303030'
  },
  location: {
    fontFamily: 'quicksand',
    width: '85%',
    fontSize: 12,
    color: '#888486',
    height: 34,
    marginTop: 20
  },

  button: {
    height: 40,
    marginVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 20
  },
  ledge: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#EFEFEF',
    letterSpacing: -0.5,
    fontSize: 16,
  },

  warning: {
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  accepted: {
    borderColor: '#00FF00',
    borderWidth: 1,
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center',  
    fontFamily: 'lexend',
    letterSpacing: -0.5,
    textTransform:'uppercase',
  },

  back: {
    fontFamily: 'lexend',
    marginLeft: 20,
    color: '#9C54D5',
    letterSpacing: -0.5,
    textDecorationLine: 'underline',
  },
  notice: {
    fontFamily: 'notosans',
    fontSize: 9,
    alignSelf:'center'
  },
});