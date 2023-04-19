import { useState, useEffect, useRef, useCallback } from 'react';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import BookingServices from '../../../services/booking/booking-services';
import MessageServices from '../../../services/message/message-services';
import socketService from '../../../services/sockets/sockets-services';
import SeekerServices from '../../../services/seeker/seeker-services';

import { addressHandler } from '../../../utils/address-handler';
import { getImageURL } from '../../../utils/get-imageURL';

export default ( navigation, route ) => {
  const [value, onChangeText] = useState();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  let data = route.params;
  let bookingID = data.bookingID;
  const scrollViewRef = useRef();
  
  const [counter, setCounter] = useState(0);
  const [seekerID, setSeekerID] = useState();
  const [seekerName, setSeekerName] = useState('');
  const [seekerDP, setSeekerDP] = useState(require("../../../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(data.specsID);
        let { body: user } = await SeekerServices.getSeeker(specs.seekerID);

        setSeekerName(user.firstName + " " + user.lastName);
        setSeekerID(specs.seekerID);
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
      socketService.joinRoom('booking-' + bookingID + '-provider');
  },[loading]);

  useEffect(() => {
    if(!loading)
    ( async() => {
      try {
        let newMessage = await socketService.receiveMessage();
        let newMessages = [...messages, newMessage];
        setMessages(newMessages);
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [loading, messages])


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

  const onSendMsg = async() => {
    await MessageServices.createMessage({ bookingID, userID:seekerID, message:value, dateTimestamp:Date.now()})
    let newMessage = { bookingID, userID:seekerID, message:value, dateTimestamp:Date.now(), messageID:counter.toString() };
    let newMessages = [...messages, newMessage];
    let newCounter = counter + 1;

    socketService.sendMessage({ roomID: 'booking-' + bookingID + '-seeker', message: newMessage });
    setMessages(newMessages);
    setCounter(newCounter);
    onChangeText('');
  }

  const getMessages = async() => {
    let message = await MessageServices.getBookingMessages(bookingID);
    // let message = await historyHelper(specs.body);
    setMessages(message.body);
  }

  const onRefresh = useCallback (() => {
    if(bookingID)
    ( async() => {  
      setRefreshing(true);
      try {
        getMessages();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, [bookingID]);

  return {
    value, onChangeText,
    loading, setLoading,

    seekerName, setSeekerName,
    seekerDP, setSeekerDP,
    seekerID, setSeekerID,

    data, bookingID, scrollViewRef,
    refreshing, setRefreshing,
    messages, setMessages,
    
    onDecline,
    onSendMsg,
    onRefresh,
  }
}