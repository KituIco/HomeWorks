import { useFocusEffect } from '@react-navigation/native';
import {  useCallback, useState } from 'react';
import { Alert } from 'react-native';


export default ( navigation ) => {
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
    ( async() => {  
      try {
        navigation.goBack();
        navigation.navigate('ProfileStack');
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(!loading);
    })();
  }, [loading])
  )

  return {}
}