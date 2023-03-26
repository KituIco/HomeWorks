import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Modal, Keyboard, Alert } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import Back from '../../hooks/back';
import Loading from '../../hooks/loading';
import { getUserID } from '../../utils/getUserID';
import { addressHandler } from '../../utils/addressHandler';

import AddAddress from '../../components/addAddress';
import ProviderServices from '../../services/user/provider-services';
import CredentialsServices from '../../services/user/credentials-services';

export default function Address({ navigation, route }) {
  let addressID = route.params ? route.params.addressID : null;
  const [processing, setProcessing] = useState(true);
  const [region, setRegion] = useState({
    latitude: 14.6487, longitude: 121.0687,
    latitudeDelta: 0.0080, longitudeDelta: 0.0120,
    location: 'UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila',
    raw: ''
  })

  const [userID, setUserID] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userNum, setUserNum] = useState('')

  const [open, setOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    ( async() => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 
          'This application requires location permission for certain features. To allow this app, you may check app info.', [
          {text: 'OK'},
        ]);
        navigation.goBack();
        return;
      }
      
      let { coords } = await Location.getCurrentPositionAsync({});
      let { latitude, longitude } = coords
      let response = await Location.reverseGeocodeAsync({
       latitude, longitude
      });

      let currentID = await getUserID();
      let provider = await ProviderServices.getProvider(currentID);
      let credentials = await  CredentialsServices.getUserCredentials(currentID);
      
      setRegion({latitude, longitude, latitudeDelta: 0.0080, longitudeDelta: 0.0120, 
        location:addressHandler(response[0]), raw:response[0]});
      setProcessing(false);
      

      setUserFullName(`${provider.body.firstName} ${provider.body.lastName}`);
      setUserNum(credentials.body.phoneNumber);
      setUserID(currentID)
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

  const fromChild = () => {
    setKeyboardVisible(!isKeyboardVisible);
  }

  const regionChange = async(data) => {
    Location.reverseGeocodeAsync({
      latitude: data.latitude, longitude: data.longitude
     }).then((res) => {
      setRegion({latitude: data.latitude, longitude: data.longitude, 
        location:addressHandler(res[0]), raw:res[0]})
    });
  }

  if (processing) return <Loading/>

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>   
      <View style={{width: '100%', paddingLeft: 30, marginBottom: 10}}>
        <Text numberOfLines={2} style={styles.address}><Text style={{fontFamily:'quicksand-medium', color: '#9C54D5'}}>Detected Address: </Text>{region.location}</Text>
      </View>

      <View style={{flex:1, width:'100%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:15, zIndex:5}}/>
          <MapView style={{flex:1, marginVertical:-14}} initialRegion={region} onRegionChangeComplete={(data) => regionChange(data)}/>
            <View style={{top:'50%',left:'50%',position:'absolute',marginTop:-25,marginLeft:-18.5}}>
            <Image style={{height:50,width:37}} source={require("../../assets/pin.png")} />
          </View>
        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:15, zIndex:5}}/>
      </View>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <AddAddress raw={region.raw} userID={userID} userFullName={userFullName} userNum={userNum} fromChild={fromChild}
              latitude={region.latitude} longitude={region.longitude} navigation={navigation} addressID={addressID} />
            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>
      
      <View style={{alignItems:'center', width:'100%'}}>

        <View style={{width:'80%'}}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.next}>Update the Detected Address</Text>
              </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        </View>

      </View>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(233,233,233,1)' ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={{width:'100%', height:14, zIndex:5}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
  },
  address: {
    fontFamily: 'quicksand',
    width: '85%',
    fontSize: 12,
    color: '#888486',
    marginHorizontal: 20,
    height: 34
  },

  shadow: {
    borderRadius: 10,
    height: 40,
    width:'100%',
    marginTop: 20,
    marginBottom: 4,
  },
  button: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
  },
  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },
  ledge: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
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
    height: '75%'
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

});