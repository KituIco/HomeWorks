import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export default () => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let { coords } = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = coords;
        setLat(latitude);
        setLon(longitude);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);
  return { 
    lat, setLat,
    lon, setLon
  }
}