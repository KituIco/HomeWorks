import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import TransactionReportServices from '../../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import socketService from '../../../services/sockets/sockets-services';

export default ( navigation, route ) => {
  const { latitude, longitude, location, specsID } = route.params.data;
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [reportID, setReportID] = useState();
  let region = {
    latitude, latitudeDelta: 0.0080,
    longitude, longitudeDelta: 0.0120,
  };

  useEffect(() => {
    ( async()=> {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
        setReportID(specs.referencedID);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const onArrive = async() => {
    setProcessing(true);
    try {
      await TransactionReportServices.patchTransactionReport(reportID, {transactionStat:2});
      socketService.providerServing("report-" + reportID);
      navigation.navigate('TransactingServe', { reportID, specsID, location });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setProcessing(false);
  }

  return {
    latitude, longitude, location, specsID, 

    processing, setProcessing, 
    loading, setLoading, 
    reportID, setReportID,

    region, 
    onArrive,
  }
}