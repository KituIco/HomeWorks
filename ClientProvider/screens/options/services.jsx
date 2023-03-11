import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import ProviderServices from '../../services/user/provider-services';
import ServiceServices from '../../services/service/service-services';

import { getUserID } from '../../utils/getUserID';
import { typeHandler } from '../../utils/typeHandler';
import Listing from '../../components/service-listing';
import AddService from '../../components/add-service';
import Loading from '../../hooks/loading';

export default function Services({ navigation }) {
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    if(loading) 
      getUserID().then( userID => {
        ProviderServices.getProvider(userID).then( data => {
          ServiceServices.getProviderServices(userID)
            .then((data) => {
              setServices(typeHandler(data.body));
              setLoading(false);
              setUserID(userID);
            })
        })
      })
  });

  const baseServices = [
    { typeID:'1', typeName: 'Car Mechanic', initialCost: 320.00, serviceRating: 4.8},
    { typeID:'5', typeName: 'Electrician', initialCost: 320.00, serviceRating: 4.2},
    { typeID:'6', typeName: 'Laundry', initialCost: 320.00, serviceRating: 4.4},
  ]

  const onClose = () => {;
    ProviderServices.getProvider(userID).then( data => {
      ServiceServices.getProviderServices(userID)
        .then((data) => {
          setServices(typeHandler(data.body));
          setOpen(!open);
        })
    })
  }

  if (loading)
    return <Loading/>
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Services</Text>
      </View>

      <View style={styles.circle}/>
      <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
        <View style={styles.add}>
          <MaterialCommunityIcons name={'book-plus'} size={44} color="#FFF" style={{paddingRight:2}}/>
        </View>
      </TouchableWithoutFeedback>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
          <View style={styles.centered}>
            <View style={styles.modal}>
            
              <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5, marginTop:20}}/>        
                <AddService listings={services} providerID={userID}/>
              <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5, marginBottom:20}}/>

              <TouchableWithoutFeedback onPress= {() => onClose()}>
                <Text style={styles.enter}>CLOSE</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
      <ScrollView style={{marginVertical:-10}}>
        
      <Listing listings={services} navigation={navigation}/>

      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      <View style={{height:40}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
     },
  header: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    fontFamily: 'lexend',   
    fontSize: 20,
    textTransform:'uppercase',
    color: '#462964',
    marginBottom: 10,
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
    marginBottom: 22,
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
  },

  add: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#9C54D5D0',
    zIndex: 10,
    alignItems:'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFFC0',
    zIndex: 8,
  },

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    height: '60%'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5
  },

  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    height: '100%',
    width: '100%',
    backgroundColor: '#E9E9E9A0'
  },
});