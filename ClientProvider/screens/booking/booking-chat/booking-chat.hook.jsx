import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import BookingServices from '../../../services/booking/booking-services';
import socketService from '../../../services/sockets/sockets-services';
import SeekerServices from '../../../services/seeker/seeker-services';

import { addressHandler } from '../../../utils/address-handler';
import { getImageURL } from '../../../utils/get-imageURL';

export default ( navigation, route ) => {
  const [value, onChangeText] = useState();
  const [loading, setLoading] = useState(true);
  let data = route.params;
  let bookingID = data.bookingID;

  const [seekerName, setSeekerName] = useState('');
  const [seekerDP, setSeekerDP] = useState(require("../../../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(data.specsID);
        let { body: user } = await SeekerServices.getSeeker(specs.seekerID);

        setSeekerName(user.firstName + " " + user.lastName)
        if (user.seekerDp)
          setSeekerDP({uri : getImageURL(user.seekerDp)});
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })(); 
  }, [])

  useEffect(() => {
    if(!loading)
      socketService.joinRoom('booking-' + bookingID);
  },[loading]);

  useEffect(() => {
    if(!loading)
    ( async() => {
      try {
        await socketService.receiveRejectChat();
        onReject();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [loading]);
  
  const onConfirm = async() => {
    try {
      await ServiceSpecsServices.patchServiceSpecs(data.specsID, 
        { specsStatus:1, referencedID:addressHandler(data.location), specsTimeStamp:Date.now() }
      );
      await BookingServices.patchBooking(bookingID, { bookingStatus:4 });

      socketService.rejectChat('booking-' + bookingID)
      navigation.navigate('RequestList');
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const onRejection = () => {
    socketService.offChat();
    socketService.offDecision();
    navigation.navigate('RequestList');
  }

  const onDecline = async() => {
    Alert.alert('Decline the Request', 'Are you sure you want to decline this request?', [
      { text: 'Cancel', },
      { text: 'OK',  onPress: () => onConfirm(), }
    ]);
  }

  const onReject = async() => {
    Alert.alert('Seeker Declined', 'We are sorry. The seeker has declined your service.', [
      {text: 'OK', onPress: () => onRejection(), }
    ]);
  }

  return {
    value, onChangeText,
    loading, setLoading,

    seekerName, setSeekerName,
    seekerDP, setSeekerDP,

    data, bookingID,
    onDecline,
  }
}