import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import CredentialsServices from '../../services/user/credential-services';
import ProviderServices from '../../services/user/provider-services';
import { getUserID } from '../../utils/getUserID';
import { getImageURL } from '../../utils/getImageURL';

export default function Options({ navigation }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(require("../../assets/default.jpg"));
  const [init, setInit] = useState(0);

  useEffect(() => {
    getUserID().then( userID => {
      if(userID) {
        ProviderServices.getProvider(userID).then( data => {
          setName(`${data.body.firstName} ${data.body.lastName}`)
          setImage({uri : getImageURL(data.body.providerDp)})
        })
      } else {
        setInit(init+1);
      }
    })
  }, [init]);

  const onLogout = () => {
    navigation.replace('HomeStack');
    navigation.navigate('AuthStack');
    let res = CredentialsServices.logout();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Options</Text>
      </View>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
      <ScrollView style={{marginVertical:-10}}>
        <View style={styles.holder}>
          <Image style={styles.icon} source={ image } />
          <View style={styles.editicon}>
            <MaterialCommunityIcons name={'camera-flip'} size={26} style={{color:'#9C54D5'}}/>
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        
        <View style={styles.options}>
          <MaterialCommunityIcons name={'face-man-profile'} size={36}/>
          <Text style={styles.tabs}>Manage Profile</Text>
        </View>

        <View style={styles.options}>
          <MaterialCommunityIcons name={'book-clock'} size={36}/>
          <Text style={styles.tabs}>View Services History</Text>
        </View>
        
        <View style={styles.options}>
          <MaterialCommunityIcons name={'message-draw'} size={36}/>
          <Text style={styles.tabs}>See Personal Reviews</Text>
        </View>
        
        <View style={styles.options}>
          <MaterialCommunityIcons name={'chat-question'} size={36}/>
          <Text style={styles.tabs}>Contact Admin</Text>
        </View>

        <TouchableWithoutFeedback>
            <View style={styles.changepw}>
              <Text style={[styles.content, {color: '#462964'}]}>Change Password</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => onLogout()}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.logout}>
              <Text style={[styles.content, {color: '#FFF'}]}>Log Out</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
         
      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
     },
  header: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    fontFamily: 'lexend',   
    fontSize: 20,
    textTransform:'uppercase',
    color: '#462964',
    marginBottom: 28,
    letterSpacing: -0.8
  },

  holder: {
    width: 160, 
    marginTop: 16,
    alignSelf: 'center',
  },
  icon: {
    width: 160, 
    height: 160, 
    borderRadius: 160/2,    
  },
  editicon: {
    marginLeft: 120,
    marginTop: -40,
    borderRadius: 36/2,
    height: 36,
    width: 36,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },

 
  name: {
    fontFamily: 'notosans',
    fontSize: 20,
    fontVariant: ['small-caps'],
    alignSelf:'center',
    marginTop: 10,
    marginBottom: 40
  },
  
  changepw: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    borderWidth:1, 
    borderColor: '#462964', 
    marginTop: 40,
    marginHorizontal: 30,
    marginBottom: 12
  },
  content: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 16
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 34,
    marginBottom: 40
  },
  logout: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    marginTop: -4,
  },

  options: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical:6,
    marginHorizontal: 30
  },
  tabs:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    marginLeft: 10,
    letterSpacing: -0.5,
  }
});