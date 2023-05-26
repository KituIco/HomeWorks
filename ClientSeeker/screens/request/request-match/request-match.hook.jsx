import { useFocusEffect } from '@react-navigation/native';
import { Animated, Easing, Alert } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import AddressServices from '../../../services/address/address-services';
import socketService from '../../../services/sockets/sockets-services';
import { addressHandler } from '../../../utils/address-handler';

export default ( navigation, route ) => {
  const { referencedID, minServiceCost, specsID, typeName, icon } = route.params;
  const [location, setLocation] = useState();

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1, duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )
    ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  useFocusEffect(
    useCallback(() => {
      ( async() => {
        try {
          await socketService.receiveAcceptServiceSpec();
          onNext();
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [])
  )


  useEffect(() => {
    (async() => {
      let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
      let { body: address } = await AddressServices.getAddressByID(specs.addressID);
      setLocation(addressHandler(address));
      socketService.joinRoom('specs-' + specsID);
      setTimeout(() => onTimeout(), 60000)
    })();
  }, []);

  const onNext = () => {
    navigation.navigate('MatchStack', { typeName, icon, address: referencedID, specsID })
  }
  
  const onConfirm = async() => {
    await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:5 })
    socketService.serviceSpecUnavailable(specsID);
    socketService.offReceiveAcceptServiceSpec();
    navigation.navigate('HomeStack');
  }

  const onCancel = async() => {
    Alert.alert('Cancel Request', 
      'The request will be inactive and will not be seen by Service Providers. To resend this request, visit your History.', 
      [ { text: 'Cancel', }, {text: 'OK', onPress: () => onConfirm(),}
    ]);
  }

  const onTimeout = async() => {
    if(navigation.isFocused()){
      await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:5 })
      socketService.serviceSpecUnavailable(specsID);
      socketService.offReceiveAcceptServiceSpec();

      Alert.alert('Match taking too long.', 
        'Sorry, we cannot match with a provider. Would you like to cancel this request for now and try again later?', 
        [ { text: 'Wait', onPress: () => wait()}, {text: 'Cancel Now', onPress: () => navigation.navigate('HomeStack')}
      ]);
    }
  }

  const wait = async() => {
    let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
    await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:1, specsTimeStamp:Date.now() });
    socketService.createServiceSpec(JSON.stringify(specs));
    setTimeout(() => onTimeout(), 120000)
  }

  return {
    referencedID, minServiceCost, specsID, typeName, icon, spin, location, 
    onNext, onConfirm, onCancel, setLocation,
  }
}