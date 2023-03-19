import { StyleSheet, View, Text, ScrollView, Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import ProviderServices from '../../services/user/provider-services';
import ServiceServices from '../../services/service/service-services';

import { getUserID } from '../../utils/getUserID';
import { typeHandler } from '../../utils/typeHandler';
import Listing from '../../components/serviceListing';
import AddService from '../../components/addService';
import Loading from '../../hooks/loading';

export default function Services({ navigation }) {
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [noService, setNoService] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let data = await ServiceServices.getProviderServices(userID);
        
        setServices(typeHandler(data.body));
        setUserID(userID);
        if(data.body.length == 0) setNoService(true);

      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow', () => { setKeyboardVisible(true); });
    const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide', () => { setKeyboardVisible(false); });
  return () => {
    keyboardDidHideListener.remove();
    keyboardDidShowListener.remove();
  };
  }, []);

  const onClose = () => {
    setOpen(!open);
    ProviderServices.getProvider(userID).then( data => {
      ServiceServices.getProviderServices(userID)
        .then((data) => {
          setServices(typeHandler(data.body));
          if(data.body.length == 0) setNoService(true);
          else setNoService(false)
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
          
            <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:20}}/>        
              <AddService listings={services} providerID={userID} navigation={navigation}/>
            <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:11, zIndex:5, marginBottom:20}}/>

            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => onClose()}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }
          </View>
        </View>
      </Modal>

      { noService && <Text style={styles.instructions}>You may add a Service by clicking the Add Button on the Lower Right of the Screen</Text> }

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
    height: '70%'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5,
  },

  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    backgroundColor: '#E9E9E9A0'
  },

  instructions: {
    position: 'absolute', 
    top: '50%', 
    fontSize:14,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'quicksand-medium',
    marginBottom: 10,
    letterSpacing: -0.5,
    marginHorizontal: 40,
    textAlign: 'center'
  },

});