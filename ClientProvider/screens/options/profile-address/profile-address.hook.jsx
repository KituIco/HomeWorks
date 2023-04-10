import {  Keyboard, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

import CredentialsServices from '../../../services/user/credentials-services';
import ProviderServices from '../../../services/user/provider-services';
import { addressHandler } from '../../../utils/address-handler';
import { getUserID } from '../../../utils/get-userID';

export default ( navigation, route ) => {
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

  return {
    addressID,
    processing, setProcessing,
    region, setRegion, 

    userID, setUserID,
    userFullName, setUserFullName,
    userNum, setUserNum,

    open, setOpen,
    isKeyboardVisible, setKeyboardVisible,

    fromChild,
    regionChange,
  }
}