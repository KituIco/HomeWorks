
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import { historyHelper } from '../../../utils/historyHelper';
import { getUserID } from '../../../utils/getUserID';

export default ( ) => {
  const [waiting, setWaiting] = useState(true);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getHistory = async() => {
    let userID = await getUserID();
    let specs = await ServiceSpecsServices.getSortedSeekerSpecs(userID, 'desc');
    let history = await historyHelper(specs.body);
    setHistory(history);
  }

  useEffect(() => {
    ( async() => {  
      try {
        getHistory();
        setWaiting(false);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

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

    onRefresh,
  }
}