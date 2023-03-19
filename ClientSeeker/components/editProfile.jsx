import { StyleSheet, View, Text, TextInput, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import Loading from '../hooks/loading';
import DatePicker from 'react-native-modern-datepicker';

import { dateHandler } from '../utils/dateHandler';
import { contactHandler } from '../utils/contactHandler';


export default function EditProfile( props ) {
  const [birthdate, setBirthdate] = useState(props.birthdate);
  const [firstName, setFirstname] = useState(props.firstName);
  const [lastName, setLastname] = useState(props.lastName);

  const [firstnameCHK, setFirstnameCHK] = useState();
  const [lastnameCHK, setLastnameCHK] = useState();
  const [birthdayCHK, setBirthdayCHK] = useState();

  const [loading, setLoading] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  

  useEffect(() => {
    if(done){
      // setTimeout(() => {
      //   props.navigation.replace('HomeStack');
      // }, 1000)
      setDone(false)
    }
  }, [done]);

  const onUpdate = async() => {
    if(new Set([usernameCHK, contactCHK, birthdayCHK, firstnameCHK, lastnameCHK]).has(styles.warning) ){
      Alert.alert('Check your Inputs', 
        'Valid inputs have input boxes with light green border.', [
        {text: 'OK'},
      ]);
    } 
    setLoading(true);
    try {
      setDone(true);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    } 
    setLoading(false);
  }

  const onCheck = (type) => {
    if (type == 'first') setFirstnameCHK( firstName ? styles.accepted : styles.warning);
    else if (type == 'last') setLastnameCHK( lastName ? styles.accepted : styles.warning);
    else if (type == 'birthday') setBirthdayCHK( birthdate ? styles.accepted : styles.warning);
  }

  const onOpen = () => {
    onCheck('birthday');
    setOpen(!open);
    if(birthday)
      setBirthdate(dateHandler(birthday))
  }

  if(done) 
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text style={[styles.address, {fontSize:24, marginTop:-20}]}>Address Added</Text>
        <Text style={[styles.desc, {marginBottom:20, marginTop:-6}]}>This form will be closed.</Text>
        <MaterialCommunityIcons name={'progress-check'} size={160} color={'#9C54D5'}/>
      </View>
    )
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  if(open) return (
    <View style={{flex:1, marginTop:16}}>
      <TouchableWithoutFeedback onPress={() => onOpen()}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={[styles.button,{marginHorizontal:20, marginBottom:10}]}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.details}>Select this Date</Text>
            </LinearGradient>
          </LinearGradient> 
        </TouchableWithoutFeedback>
      <DatePicker mode='calendar' selected={birthday} onDateChange={setBirthday}/>
    </View>
  )

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:10}}/>        
      <ScrollView style={{marginVertical:-10}}>
        <Text style={styles.address}>Update Profile</Text>
        <Text style={styles.desc}>You may only update the following fields. Make sure that your inputs are correct.</Text>

        <Text style={styles.header}>First Name</Text>
        <View style={[styles.textbox,firstnameCHK]}>
          <TextInput style={styles.input} onChangeText={setFirstname} value={firstName} placeholder="First Name" onBlur={() => onCheck('first')}/>
        </View>

        <Text style={styles.header}>Last Name</Text>
        <View style={[styles.textbox,lastnameCHK]}>
          <TextInput style={styles.input} onChangeText={setLastname} value={lastName} placeholder="Last Name" onBlur={() => onCheck('last')}/>
        </View>

        <Text style={styles.header}>Birthdate</Text>
        <TouchableWithoutFeedback onPress={() => onOpen()}>
        <View style={[styles.textbox, birthdayCHK]}>
            <Text style={styles.input}>{birthdate}</Text>
          </View>
        </TouchableWithoutFeedback>

        
        <TouchableWithoutFeedback onPress={() => onUpdate()}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.details}>Update Profile</Text>
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
    marginHorizontal: 22,
    marginBottom: 16,
    height: '90%',
  },
  address: {
    fontFamily: 'notosans',
    fontSize: 24,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  desc: {
    fontFamily: 'quicksand',
    fontSize: 13,
    letterSpacing: -0.5,
    color: '#323941',
    textAlign:'justify',
  },

  textbox: {
    height: 52,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    padding: 10,
    marginTop: -2,
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
    justifyContent: 'center'
  },
  ledge: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
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
});