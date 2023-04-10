import { getImageURL } from '../../../utils/get-imageURL';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import BookingServices from '../../../services/booking/booking-services';
import AddressServices from '../../../services/address/address-services';
import socketService from '../../../services/sockets/sockets-services';

export default ( route, navigation ) => {
  const { seekerID, serviceID, specsID, minServiceCost} = route.params.data;
  const { typeName, specsDesc, images, addressID } = route.params.data;
  let bookingStatus = 1, dateTimestamp = Date.now();

  const [location, setLocation] = useState();
  const [latitude,setLatitude] = useState();
  const [longitude,setLongitude] = useState();
  const [region, setRegion] = useState();

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(true);
  const [noImage, setNoImage] = useState(true);
  let urls = JSON.parse(images); 
  
  let viewer = [];
  if(urls.length && noImage) setNoImage(false);
  if(urls[0]) viewer.push({url : getImageURL(urls[0])});
  if(urls[1]) viewer.push({url : getImageURL(urls[1])});
  if(urls[2]) viewer.push({url : getImageURL(urls[2])});
  if(urls[3]) viewer.push({url : getImageURL(urls[3])});

  const checkAvailability = async() => {
    let specs = await ServiceSpecsServices.getSpecsByID(specsID);
    if (specs.body.specsStatus != 1) {
      Alert.alert('Request Unavailable', 
        'This request is now unavailable.', [
        {text: 'OK'},
      ]);
      navigation.replace('RequestList');
      return;
    }
  }

  useEffect(() =>{
    (async() => {
      try {
        checkAvailability();
        let data = await AddressServices.getAddressByID(addressID);
        setLocation(data.body);
        setLatitude(data.body.latitude);
        setLongitude(data.body.longitude);
        setRegion({
          latitude: data.body.latitude, latitudeDelta: 0.0090,
          longitude: data.body.longitude, longitudeDelta: 0.0080,
        });
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const onSettle = async() => {
    setLoading(true);
    try {
      let res = await BookingServices.createBooking({
        seekerID, serviceID, specsID, bookingStatus, dateTimestamp
      });
      let { bookingID } = res.body;
      checkAvailability();

      await ServiceSpecsServices.patchServiceSpecs(specsID, {referencedID: bookingID, specsStatus: 2});
      socketService.acceptServiceSpec( specsID );
      
      navigation.navigate('BookingChat', { specsID, bookingID, latitude, longitude, location, typeName });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setLoading(false);
  }

  return {
    seekerID, serviceID, specsID, minServiceCost, typeName, specsDesc, images, addressID, 
  
    location, setLocation,
    latitude,setLatitude,
    longitude,setLongitude,
    region, setRegion,
  
    open,setOpen,
    loading,setLoading,
    noImage, setNoImage,
    viewer, onSettle,
  }
}