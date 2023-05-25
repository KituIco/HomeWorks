import { Alert, Keyboard } from 'react-native';
import { useState, useEffect }  from 'react';
import * as Location from 'expo-location';

import CredentialsServices from '../../../services/user/credentials-services';
import SeekerServices from '../../../services/user/seeker-services';

import { addressHandler } from '../../../utils/address-handler';
import { getUserID } from '../../../utils/get-userID';


export default ( navigation, route ) => {
  const { typeName, icon, minServiceCost, serviceID, providerID } = route.params.data;
  const [processing, setProcessing] = useState(true);
  const [waiting, setWaiting] = useState(false);

  const [userFullName, setUserFullName] = useState('');
  const [userID, setUserID] = useState('');
  const [userNum, setUserNum] = useState('');

  const [open, setOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [list, setList] = useState();

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

      if(serviceID) setList([route.params.data])

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

    let referencedID = providerID;
    if(!providerID) referencedID = "none";
    let addressID = res.body.addressID;
    let { icon, minServiceCost, typeID, typeName } = route.params.data;

    navigation.navigate('RequestForm', { addressID, referencedID, icon, minServiceCost, typeID, typeName })
  }

  return {
    typeName, icon, minServiceCost, 
    
    processing, setProcessing, 
    waiting, setWaiting, 
    userFullName, setUserFullName, 
    
    userID, setUserID, 
    userNum, setUserNum,
    open, setOpen,
    
    isKeyboardVisible, setKeyboardVisible,
    region, setRegion,
    list, setList,

    regionChange,
    fromChild,
  }
}