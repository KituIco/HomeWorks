import { useState, useEffect, useRef, useCallback } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import BookingServices from '../../../services/booking/booking-services';
import MessageServices from '../../../services/message/message-services';
import socketService from '../../../services/sockets/sockets-services';
import SeekerServices from '../../../services/seeker/seeker-services';
import ImageService from '../../../services/image/image-services';

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

  const [images, setImages] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewer, setViewer] = useState();
  
  const [counter, setCounter] = useState(0);
  const [seekerID, setSeekerID] = useState();
  const [seekerName, setSeekerName] = useState('');
  const [seekerDP, setSeekerDP] = useState(require("../../../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(data.specsID);
        let { body: user } = await SeekerServices.getSeeker(specs.seekerID);
        let { body: message } = await MessageServices.getBookingMessages(bookingID);

        setMessages(message);
        setCounter(counter+message.length);

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
        if(newMessage.message) {
          setMessages([...messages, newMessage]);
        }
        else if(newMessage.images && newMessage.userID != seekerID) {
          setMessages([...messages, newMessage]);
          socketService.sendMessage({ roomID: 'booking-' + bookingID + '-seeker', message: newMessage });
        } 
        else if(newMessage.images) {
          setMessages([...messages.filter((data) => data.messageID !== newMessage.messageID), newMessage]);
        }
        else {
          setMessages(messages.filter((data) => data.messageID !== newMessage.messageID));
        }
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
      await BookingServices.patchBooking(bookingID, { bookingStatus:4, description:`You accepted a service request from ${seekerName}. However, you cancelled the booking after matching.` });

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
    setMessages(message.body);
  }

  const pickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        selectionLimit:4,
        quality: 1,
      });
      let image = [];
      let uriImage = []
      for( let i=0; i<result.assets.length && i<4; i++) {
        image.push(result.assets[i].uri);
        uriImage.push({url: result.assets[i].uri})
      }
      setImages(image);
      setViewer(uriImage);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const removeImages = async () => {
    setImages();
    setViewer();
  }

  const viewImages = async () => {
    setOpen(true);
  }

  const sendImages = async () => {
    let loadingID;
    let newMessage = { bookingID, userID:seekerID, dateTimestamp:Date.now(), messageID:counter.toString() };
    try{
      let newMessages = [...messages, newMessage];
      let newCounter = counter + 1;

      setMessages(newMessages);
      setCounter(newCounter);
      setImages();
      setViewer();

      loadingID = newCounter - 1;
      let urls = await ImageService.uploadFiles(images);
      urls = JSON.stringify(urls);
      
      await MessageServices.createMessage({ bookingID, userID:seekerID, images:urls, dateTimestamp:Date.now()})
      newMessage = { bookingID, userID:seekerID, images:urls, dateTimestamp:Date.now(), messageID:loadingID.toString() };
      // newMessages = [...messages.filter((data) => data.messageID !== newCounter.toString()), newMessage];

      socketService.sendMessage({ roomID: 'booking-' + bookingID + '-seeker', message: newMessage });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      socketService.sendMessage({ roomID: 'booking-' + bookingID + '-seeker', message: newMessage });
    }
    
  }


  const onRefresh = useCallback (() => {
    if(bookingID)
    ( async() => {  
      setRefreshing(true);
      try {
        getMessages();
        scrollViewRef.current.scrollToEnd({ animated: true })
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, [bookingID, loading]);

  return {
    value, onChangeText,
    loading, setLoading,

    seekerName, setSeekerName,
    seekerDP, setSeekerDP,
    seekerID, setSeekerID,
    viewer, setViewer,
    open, setOpen,

    data, bookingID, scrollViewRef,
    refreshing, setRefreshing,
    messages, setMessages,
    images, setImages,
    
    onDecline,
    onSendMsg,
    onRefresh,

    pickImages,
    viewImages,
    removeImages,
    sendImages,
  }
}