import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

import { getRecommendations } from '../../../utils/get-recommendations';

export default () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    ( async() => {
      try {
        let { coords } = await Location.getCurrentPositionAsync({});
        let { latitude, longitude } = coords;
        let recoms = await getRecommendations(latitude, longitude, 0,10);
        setFeatured(recoms)
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);
  return { featured }
}