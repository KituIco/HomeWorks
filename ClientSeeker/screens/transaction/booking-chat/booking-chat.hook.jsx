import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import ProviderServices from '../../../services/provider/provider-services';
import ServiceServices from '../../../services/service/service-services';
import BookingServices from '../../../services/booking/booking-services';
import socketService from '../../../services/sockets/sockets-services';

import { getImageURL } from '../../../utils/get-imageURL';

export default ( navigation, route ) => {
  const { typeName, icon, address, specsID } = route.params;
  const [bookingID, setBookingID] = useState();
  const [serviceID, setServiceID] = useState();
  const [providerID, setProviderID] = useState();
  const [addressID, setAddressID] = useState();

  const [loading, setLoading] = useState(true);
  const [value, onChangeText] = useState();

  const [providerName, setProviderName] = useState('');
  const [providerDP, setProviderDP] = useState(require("../../../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
        let { body: booking } = await BookingServices.getBookingByID(specs.referencedID);
        let { body: service } = await ServiceServices.getService(booking.serviceID);
        let { body: user } = await ProviderServices.getProvider(service.providerID);
        
        setBookingID(specs.referencedID);
        setServiceID(booking.serviceID);
        setProviderID(service.providerID);
        setAddressID(specs.addressID);

        setProviderName(user.firstName + " " + user.lastName);
        if (user.providerDp)
          setProviderDP({uri : getImageURL(user.providerDp)});
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        navigation.goBack();
      }
      setLoading(false);
    })(); 
  }, []);

  useEffect(() => {
    if(!loading)
      socketService.joinRoom('booking-' + bookingID);
  },[loading]);

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          await socketService.receiveRejectChat();
          onReject();
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [loading])
  )

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          await socketService.receiveFinalizeServiceSpec();
          onUpdate();
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [loading])
  )
  

  const onUpdate = async() => {
    navigation.navigate('BookingSpecs', { typeName, icon, specsID, bookingID, serviceID, providerID, addressID })
  }

  const onConfirm = async() => {
    try {
      await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:1, referencedID:address, specsTimeStamp:Date.now() });
      await BookingServices.patchBooking(bookingID, { bookingStatus:4 });
      socketService.rejectChat('booking-' + bookingID);

      socketService.offChat();
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const onRejection = () => {
    socketService.offChat();
    navigation.goBack();
  }

  const onDecline = async() => {
    Alert.alert('Decline the Provider', 
      'Are you sure you want to decline this service provider? If you declined, we will search another service provider for you.', 
      [ { text: 'Cancel', }, { text: 'OK',  onPress: () => onConfirm(), } ]);
  }

  const onReject = async() => {
    Alert.alert('Provider Declined', 
      'We are sorry. The provider has declined your service request. We will search another service provider for you.', 
      [ { text: 'OK', onPress: () => onRejection(), } ]);
  }


  return {
    typeName, icon, address, specsID, 
    bookingID, setBookingID,
    serviceID, setServiceID,
    providerID, setProviderID,
    addressID, setAddressID,
  
    loading, setLoading,
    value, onChangeText,
  
    providerName, setProviderName,
    providerDP, setProviderDP,

    onUpdate,
    onConfirm,
  }
}