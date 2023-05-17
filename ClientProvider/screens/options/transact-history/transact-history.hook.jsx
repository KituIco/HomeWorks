import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

import BookingServices from '../../../services/booking/booking-services';
import { historyHelper } from '../../../utils/history-helper';
import { getUserID } from '../../../utils/get-userID';


export default ( ) => {
  const [waiting, setWaiting] = useState(true);
  const [history, setHistory] = useState([]);
  const [empty, setEmpty] = useState(false);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getHistory = async() => {
    let userID = await getUserID();
    let bookings = await BookingServices.getProviderBookings(userID);
    let history = await historyHelper(bookings.body);

    if(history.length == 0) setEmpty(true);
    else setEmpty(false);
    setHistory(history);
  }

  useFocusEffect(
    useCallback(() => {
    ( async() => {  
      try {
        getHistory();
        setWaiting(false);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])
  )

  const onRefresh = useCallback (() => {
    ( async() => {  
      setRefreshing(true);
      try {
        getHistory();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, []);

  return {
    waiting, setWaiting,
    history, setHistory,
    loading, setLoading,
    refreshing, setRefreshing,
    empty, setEmpty,

    onRefresh,
  }
}