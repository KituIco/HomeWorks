import { StackActions } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { addressHandler } from '../../../utils/address-handler';
import { getUserID } from '../../../utils/get-userID';

import TransactionReportServices from '../../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import BookingServices from '../../../services/booking/booking-services';
import AddressServices from '../../../services/address/address-services';
import PaymentServices from '../../../services/payment/payment-services';
import socketService from '../../../services/sockets/sockets-services';

export default ( navigation, route ) => {
  const { typeName, icon, bookingID, addressID, providerID, specsID, serviceID } = route.params;
  const [description, setDescription] = useState('');
  const [seekerID, setSeekerID] = useState('');
  const [cost, setCost] = useState();

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [location, setLocation] = useState('');
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [region, setRegion] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let { body: address } = await AddressServices.getAddressByID(addressID);
        let { body: booking } = await BookingServices.getBookingByID(bookingID);
        setDescription(booking.description);
        setCost(booking.cost);
        setSeekerID(userID);
        
        setLocation(addressHandler(address));
        setLongitude(address.longitude);
        setLatitude(address.latitude);
        setRegion({
          latitude: address.latitude,
          longitude: address.longitude,
          latitudeDelta: 0.0060,
          longitudeDelta: 0.0050,
        })
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const onDecline = async() => {
    try {
      let bookingStatus = 1;
      await BookingServices.patchBooking(bookingID, { bookingStatus });
      socketService.decisionFinalizeServiceSpec( { roomID: "booking-" + bookingID, decision: false } );
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    navigation.goBack();
  }

  const onAccept = async() => {
    setProcessing(true);
    try {
      let paymentMethod = 1;
      let paymentStatus = 1;
      let payment = await PaymentServices.createPayment({ 
        seekerID, providerID, serviceID, paymentMethod, paymentStatus, amount: parseFloat(cost)
      });
      
      let transactionStat = 1;
      let paymentID = payment.body.paymentID;
      let transaction = await TransactionReportServices.createTransactionReport({
        bookingID, paymentID, specsID, seekerID, providerID, serviceID, transactionStat
      });

      let specsStatus = 3;
      let bookingStatus = 3;
      let referencedID = transaction.body.reportID;
      await BookingServices.patchBooking( bookingID, { bookingStatus });
      await ServiceSpecsServices.patchServiceSpecs( specsID, { referencedID , specsStatus });
      socketService.decisionFinalizeServiceSpec( { roomID: "booking-" + bookingID, decision: true } );
      socketService.offChat();

      let reportID = transaction.body.reportID;
      navigation.dispatch(StackActions.popToTop());
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('ServeStack', { typeName, icon, reportID });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setProcessing(false);
  }

  return {
    typeName, icon, bookingID, addressID, providerID, specsID, serviceID,
    description, setDescription,
    seekerID, setSeekerID,
    cost, setCost,

    loading, setLoading,
    processing, setProcessing,

    location, setLocation,
    longitude, setLongitude,
    latitude, setLatitude,
    region, setRegion,

    onDecline,
    onAccept,
  }
}