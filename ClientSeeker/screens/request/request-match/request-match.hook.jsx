import { useFocusEffect } from '@react-navigation/native';
import { Animated, Easing, Alert } from 'react-native';
import { useCallback, useEffect } from 'react';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import socketService from '../../../services/sockets/sockets-services';

export default ( navigation, route ) => {
  const { referencedID, minServiceCost, specsID, typeName, icon } = route.params;

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
    socketService.joinRoom('specs-' + specsID);
  }, []);

  const onNext = () => {
    navigation.navigate('MatchStack', { typeName, icon, address: referencedID, specsID })
  }
  
  const onConfirm = async() => {
    await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:5 })
    socketService.serviceSpecUnavailable(specsID);
    socketService.offReceiveAcceptServiceSpec();
    navigation.navigate('HomeStack')
  }

  const onCancel = async() => {
    Alert.alert('Cancel Request', 
      'The request will be inactive and will not be seen by Service Providers. To resend this request, visit your History.', 
      [ { text: 'Cancel', }, {text: 'OK', onPress: () => onConfirm(),}
    ]);
  }

  return {
    referencedID, minServiceCost, specsID, typeName, icon, spin,
    onNext, onConfirm, onCancel,
  }
}