import {  Animated, Easing, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import BookingServices from '../../../services/booking/booking-services';
import socketService from '../../../services/sockets/sockets-services';

export default ( navigation, route ) => {
  const { latitude, longitude, typeName, location, bookingID } = route.params.data;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [decs, setDecs] = useState(0);

  let region = {
    latitude, latitudeDelta: 0.0070,
    longitude, longitudeDelta: 0.0060,
  };
  
  let initialDescription = '';
  if (route.params.message) {
    initialDescription = route.params.message;
  }
  
  const [description, setDescription] = useState(initialDescription);
  const [lines, setLines] = useState(4);
  const [cost, setCost] = useState('');
  
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue, {
       toValue: 1, duration: 1200,
       easing: Easing.linear,
       useNativeDriver: true
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useEffect(() => {
    socketService.joinRoom('booking-' + bookingID);
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        let decision = await socketService.receiveDecisionFinalizeServiceSpec();
        setDecs( decs+1 );

        if (decision) onAccept();
        else onDecline();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [decs]);

  const onAccept = async() => {
    setOpen(false);
    socketService.offChat();
    navigation.navigate('TransactingArrive', {data: route.params.data});
  }

  const onDecline = async() => {
    setOpen(false);
    Alert.alert('Declined','Customer has declined the Service Details. Please go back to chat and discuss again with our customer.', [ {text: 'OK'} ]);
  }

  // const onCancel = async() => {
  //   setOpen(false);
  //   try {
  //     let bookingStatus = 1;
  //     await BookingServices.patchBooking(bookingID, { bookingStatus });
  //   } catch (err) {
  //     Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
  //   }
  // }

  const onSubmit = async() => {
    setLoading(true);
    try {
      let bookingStatus = 2;
      await BookingServices.patchBooking(bookingID, {
        cost: parseFloat(cost).toFixed(2), description, bookingStatus
      });
      socketService.finalizeServiceSpec("booking-" + bookingID);
      setOpen(true);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setLoading(false);
  }

  return {
    latitude, longitude, typeName, location, bookingID,
    loading, setLoading,
    open, setOpen,
    decs, setDecs,
  
    description, setDescription,
    lines, setLines,
    cost, setCost,

    region, spinValue, spin, 
    onSubmit,
  }
}