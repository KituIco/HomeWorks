import { StackActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import TransactionReportServices from '../../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import ProviderServices from '../../../services/provider/provider-services';
import BookingServices from '../../../services/booking/booking-services';
import ServiceServices from '../../../services/service/service-services';
import AddressServices from '../../../services/address/address-services';
import socketService from '../../../services/sockets/sockets-services';

import { addressHandler } from '../../../utils/address-handler';
import { getImageURL } from '../../../utils/get-imageURL';

export default ( navigation, route ) => {
  const { typeName, icon, reportID } = route.params;
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [cost, setCost] = useState();
  const [desc, setDesc] = useState();
  
  const [statusIcon, setStatusIcon] = useState('train-car');
  const [status, setStatus] = useState('Arriving');
  const [paid, setPaid] = useState(false);
  const [list, setList] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let { body: report } = await TransactionReportServices.getTransactionReportsByID(reportID);
        let { body: booking } = await BookingServices.getBookingByID(report.bookingID);
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(report.specsID);

        let { body: provider } = await ProviderServices.getProvider(report.providerID);
        let { body: address } = await AddressServices.getAddressByID(specs.addressID);
        let { body: service } = await ServiceServices.getService(report.serviceID)
        
        let providerInfo = [{
          providerID: report.providerID, name: provider.firstName+" "+provider.lastName, location: addressHandler(address),
          serviceRatings: service.serviceRating, typeName: service.typeName, initialCost: service.initialCost, icon, src: {uri : getImageURL(provider.providerDp)}
        }];

        setAddress(addressHandler(address))
        setDesc(booking.description);
        setCost(booking.cost);
        setList(providerInfo);
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  useEffect(() => {
    socketService.joinRoom('report-' + reportID);
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        await socketService.receiveProviderServing();
        changeStatus();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        await socketService.receivePaymentReceived();
        changePaid();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        await socketService.receiveProviderDone();
        onComplete();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);

  const changeStatus = () => {
    setStatus('Serving');
    setStatusIcon('progress-star');
  };

  const changePaid = () => {
    setPaid(!paid)
  }

  const onComplete = () => {
    navigation.dispatch(StackActions.popToTop()),
    navigation.navigate('ProviderStack', { typeName, icon, reportID })
  }

  return {
    typeName, icon, reportID,
    loading, setLoading,
    address, setAddress,
    cost, setCost,
    desc, setDesc,
    
    statusIcon, setStatusIcon,
    status, setStatus,
    paid, setPaid,
    list, setList,

    changeStatus,
    changePaid,
    onComplete,
  }
}