import { StyleSheet, View, Text, ScrollView, Image, Alert, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect }  from 'react';

import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import AddAddress from '../../components/addAddress';
import Header from '../../components/transactheader';
import Next from '../../components/transactnext';
import Loading from '../../hooks/loading';

import CredentialsServices from '../../services/user/credentials-services';
import AddressServices from '../../services/address/address-services';
import SeekerServices from '../../services/user/seeker-services';
import { addressHandler } from '../../utils/addressHandler';
import { getUserID } from '../../utils/getUserID';

export default function Request({ route, navigation }) {
  const { typeName, icon, minServiceCost } = route.params.data;
  const [processing, setProcessing] = useState(true);
  const [waiting,setWaiting] = useState(false);

  const [userFullName, setUserFullName] = useState('');
  const [userID, setUserID] = useState('');
  const [userNum, setUserNum] = useState('');

  const [open, setOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [region, setRegion] = useState({
    latitude: 14.6487, longitude: 121.0687,
    latitudeDelta: 0.0080, longitudeDelta: 0.0060,
    location: 'UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila',
    raw: ''
  })

  useEffect(() => {
    (async () => {
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
      let provider = await SeekerServices.getSeeker(currentID);
      let credentials = await  CredentialsServices.getUserCredentials(currentID);

      setUserFullName(`${provider.body.firstName} ${provider.body.lastName}`);
      setUserNum(credentials.body.phoneNumber);
      setUserID(currentID)
      
      setRegion({latitude, longitude, latitudeDelta: 0.0080, longitudeDelta: 0.0060, 
        location:addressHandler(response[0]), raw:response[0]});
      setProcessing(false);
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

  const regionChange = async(data) => {
    Location.reverseGeocodeAsync({
      latitude: data.latitude, longitude: data.longitude
     }).then((res) => {
      setRegion({latitude: data.latitude, longitude: data.longitude, 
        location:addressHandler(res[0]), raw:res[0]})
    });
  }

  const fromChild = async(address, res) => {
    setKeyboardVisible(false);
    setOpen(!open);
    
    let referencedID = address;
    let addressID = res.body.addressID;
    let { icon, minServiceCost, typeID, typeName } = route.params.data;

    navigation.navigate('InitSpecs', { addressID, referencedID, icon, minServiceCost, typeID, typeName })
  }

  const onRequest = async() => {
    setWaiting(true);
    try {
      let isDefault = 1;
      let res = await AddressServices.createAddress({
        ...region.raw, userID, userFullName, userNum, latitude:region.latitude, longitude:region.longitude, isDefault
      }) 
      let addressID = res.body.addressID;
      let { icon, minServiceCost, typeID, typeName } = route.params.data;
      let { location } = region

      navigation.navigate('InitSpecs', { addressID, icon, minServiceCost, typeID, typeName, location });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    } 
    setWaiting(false);
  }

  if (processing) return <Loading/>

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      {waiting && <Loading/>}
      <Header service={typeName} icon={icon} phase={1}/>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <AddAddress raw={region.raw} userID={userID} userFullName={userFullName} userNum={userNum} fromChild={fromChild}
              latitude={region.latitude} longitude={region.longitude} navigation={navigation} />
            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Detected Address</Text>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5}}/>
        <View style={{width:'100%', height: 260, marginVertical:-4}}>
          <MapView style={{flex:1}} initialRegion={region} onRegionChangeComplete={(data) => regionChange(data)}/>
          <View style={{top:'50%',left:'50%',position:'absolute',marginTop:-22,marginLeft:-16.15}}>
            <Image style={{height:44,width:32.3}} source={require("../../assets/pin.png")} />
          </View>
        </View>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>

        <View style={styles.address}>
          <Text style={styles.location} numberOfLines={2}>{region.location}</Text>
          <MaterialCommunityIcons name={'pencil-outline'} size={30} color="#9C54D5"/>
        </View>


        <Text style={styles.heading}>Minimum Service Cost</Text>
        <View style={styles.details}>
          <Text style={styles.content}>{typeName} Service</Text>
          <Text style={styles.content}>Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {minServiceCost}</Text></Text>
        </View>
        <Text style={styles.subcontent}>Note: Price variation depends on the skill of service provider, the load of your request, the proximity from your location, etc. </Text>

        <Text style={styles.heading}>Your Service Provider</Text>
        <View style={[styles.details, {marginBottom:30}]}>
          <View style={{width: '80%',  marginTop: -2}}> 
            <Text style={styles.content}>We will grant you one of the best and the nearest service provider in your area!</Text>
            <View style={{flexDirection: 'row' }}>
              <Text  style={styles.content}>Want a specific service provider? </Text>
              <Text  style={[styles.content, {textDecorationLine: 'underline', fontFamily: 'quicksand-bold'}]}>Search</Text>
            </View>
          </View>
          <MaterialCommunityIcons name={'account-search-outline'} size={70} color="#9C54D5" style={{marginTop:-16}}/>
        </View>
      
      </ScrollView>

      <View style={styles.holder}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <View style={styles.ghost}/>
        </TouchableWithoutFeedback>
      </View>

      <Next title={'Request a Booking'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom:-6, 
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginVertical: 8,
    paddingHorizontal: 20,
  },

  image: {
    height: 250,
    width: '250%',
    alignSelf:'center',
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    marginHorizontal: 24,
    marginVertical: 10,
    paddingBottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  location: {
    fontFamily: 'quicksand',
    width: '80%',
    fontSize: 12,
    color: '#888486',
  },


  details: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  content: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
  },
  subcontent: {
    fontFamily: 'quicksand',
    fontSize: 11,
    marginBottom: 20,
    marginTop: -6,
    marginHorizontal: 24,
    color: '#888486'
  },

  holder: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 5,
    justifyContent: 'center',
  },
  ghost: {
    height: 50,
    zIndex: 5,
    marginHorizontal: 30,
    marginBottom: 8
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