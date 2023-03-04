import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const screenHeight = Dimensions.get('window').height;

export default function Credentials( navigation ) {
  const firstname = navigation.route.params.firstname;
  const lastname = navigation.route.params.lastname;

  const [contact, setContact] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')

  const [image, setImage] = useState(null);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage();
  };

  return (
    <View style={{flex:1, backgroundColor: '#E9E9E9'}}>
    <View style={{width:'100%', height:40, backgroundColor: '#E9E9E9'}}/>
    
    <ScrollView style={{width: '100%', backgroundColor: '#E9E9E9'}}>
      
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>Hello, {firstname} {lastname}!</Text>
        <Text style={styles.subheading}>Fill up the fields below to complete the creation of your account.</Text>

        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setContact} value={contact} placeholder="Contact Number"/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setBirthday} value={birthday} placeholder="Birthday"/>
        </View>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setGender} value={gender} placeholder="Gender"/>
        </View>

        <Text style={styles.govID}>Government ID</Text>
        { !image &&
        <TouchableWithoutFeedback onPress={() => pickImage()}>
          <View style={styles.uploader}>
            <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
            <Text style={styles.title}><Text style={{color:'#9C54D5', fontFamily:'quicksand-bold'}}>Click to Upload</Text> your Government ID.</Text>
            <Text style={styles.subtitle}>make sure it's clear and visible</Text>
          </View>
        </TouchableWithoutFeedback>
        }

        { image &&
        <View style={{marginHorizontal:24}}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableWithoutFeedback onPress={() => removeImage()}>
            <View style={styles.close}>
              <MaterialCommunityIcons name={'close-box'} size={20} color={'#323941'}/> 
            </View>
          </TouchableWithoutFeedback>
        </View>
        }
        
        <TouchableWithoutFeedback onPress= {() => { 
          navigation.navigate('Dashboard') 
        }}>
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.4 }} end={{ x:0, y:0 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.button}>
              <Text style={styles.register}>Submit Profile</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 40
  },

  govID:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10
  },
  uploader: {
    height: screenHeight/4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 15,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 12,
    marginTop: -2,
  },

  image: {
    height: 200, 
    borderRadius: 4, 
    marginBottom: 10,
  },
  close: {
    marginTop: -200, 
    marginLeft:'85%',
    marginBottom: 220-55, 
    backgroundColor: '#9C54D5'
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