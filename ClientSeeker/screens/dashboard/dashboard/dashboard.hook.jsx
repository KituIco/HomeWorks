import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

import ServiceTypeServices from '../../../services/service/service-type-services';

import { getRecommendations } from '../../../utils/get-recommendations';
import { typeHandler } from '../../../utils/type-handler';

export default ( ) => {
  const [processing, setProcessing] = useState(true);
  const [services, setServices] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let { body: types } = await ServiceTypeServices.getServiceTypes();
        let patched = await typeHandler(types);
        setServices(patched);

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
        let { latitude, longitude } = coords;
        let recoms = await getRecommendations(latitude,longitude,0,3);
        setFeatured(recoms);
        setLatitude(latitude);
        setLongitude(longitude);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setProcessing(false);
    })();
  }, []);

  const explore = [
    {providerID: 'D', name: 'Edgardo Dela Cena', location: 'Bacoor City', serviceRatings: '4.8', typeName: 'Roof Cleaning', initialCost: '410', temp: true,  src: require("../../../assets/providers/provider-d.png")},
    {providerID: 'E', name: 'Ricardo Pollicar', location: 'Mandaluyong City', serviceRatings: '4.4', typeName: 'Meal Preparation', initialCost: '300', temp: true,  src: require("../../../assets/providers/provider-e.png")},
    {providerID: 'F', name: 'Ced Montenegro', location: 'Manila', serviceRatings: '4.6', typeName: 'Plumbing', initialCost: '350', temp: true,  src: require("../../../assets/providers/provider-f.png")},
  ]

  return {
    processing, setProcessing,
    services, setServices,
    latitude,setLatitude,
    longitude,setLongitude,

    featured,
    explore,
  }
}