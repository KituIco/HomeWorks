import { useFocusEffect } from '@react-navigation/native';
import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

import { getUserID } from '../../../utils/getUserID';
import { requestHelper } from '../../../utils/requestHelper';
import { removeRequest } from '../../../utils/removeRequest';
import { processRequest } from '../../../utils/processRequest';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import ServiceTypesServices from '../../../services/service-types/service-types-services';
import ServiceServices from '../../../services/service/service-services';
import socketService from '../../../services/sockets/sockets-services';

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [types, setTypes] = useState();
  const [serving, setServing] = useState();

  const getRequests = async() => {
    let userID = await getUserID();
    let allService = await ServiceSpecsServices.getAllServiceSpecs();
    let serviceTypes = await ServiceTypesServices.getServiceTypes()

    let myServices = await ServiceServices.getProviderServices(userID);
    let service = await requestHelper(allService.body, myServices.body, serviceTypes.body);

    setTypes(serviceTypes.body);
    setServing(myServices.body);
    if(service.length > 0) {
      setServices(service);
      setWaiting(false);
    } else {
      setWaiting(true);
      setServices([])
    }
  }

  useEffect(() => {
    ( async() => {  
      try {
        getRequests();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    socketService.joinRoom('providers');
  }, []);

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          let request = await socketService.receiveNewServiceSpec();
          let newReq = await processRequest(JSON.parse(request), serving, types); 
          if (newReq) {
            let newReqs = [newReq, ...services];
            setServices(newReqs);
            setWaiting(false);
          }
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [services])
  )

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          let specID = await socketService.receiveServiceSpecUnavailable();
          let newReqs = await removeRequest(specID, services); 
          if (newReqs) {
            setServices(newReqs);
            if (newReqs.length == 0)
              setWaiting(true);
          }
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [services])
  )

  const onRefresh = useCallback (() => {
    ( async() => {  
      setRefreshing(true);
      try {
       getRequests();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, []);

  return {
    refreshing, setRefreshing,
    waiting, setWaiting,
    services, setServices,
    loading, setLoading,

    types, setTypes,
    serving, setServing,
    onRefresh,
  }
}