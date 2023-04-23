import { useCallback, useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import ProviderServices from '../../../services/provider/provider-services';
import ServiceServices from '../../../services/service/service-services';
import BookingServices from '../../../services/booking/booking-services';
import MessageServices from '../../../services/message/message-services';
import socketService from '../../../services/sockets/sockets-services';
import ImageService from '../../../services/image/image-services';

import { getImageURL } from '../../../utils/get-imageURL';

export default ( navigation, route ) => {
  const { typeName, icon, address, specsID } = route.params;
  const [bookingID, setBookingID] = useState();
  const [serviceID, setServiceID] = useState();
  const [providerID, setProviderID] = useState();
  const [addressID, setAddressID] = useState();

  const [refreshing, setRefreshing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [images, setImages] = useState(null);
  const [viewer, setViewer] = useState();

  const [counter, setCounter] = useState(10000);
  const [loading, setLoading] = useState(true);
  const [value, onChangeText] = useState();
  const [open, setOpen] = useState(false);

  const [providerName, setProviderName] = useState('');
  const [providerDP, setProviderDP] = useState(require("../../../assets/default.jpg"));
  const scrollViewRef = useRef();

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
        let { body: booking } = await BookingServices.getBookingByID(specs.referencedID);
        let { body: service } = await ServiceServices.getService(booking.serviceID);
        let { body: user } = await ProviderServices.getProvider(service.providerID);
        
        setBookingID(specs.referencedID);
        setServiceID(booking.serviceID);
        setProviderID(service.providerID);
        setAddressID(specs.addressID);

        setProviderName(user.firstName + " " + user.lastName);
        if (user.providerDp)
          setProviderDP({uri : getImageURL(user.providerDp)});
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        navigation.goBack();
      }
      setLoading(false);
    })(); 
  }, []);

  useEffect(() => {
    if(!loading)
      socketService.joinRoom('booking-' + bookingID);
      socketService.joinRoom('booking-' + bookingID + '-seeker');
  },[loading]);

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          let newMessage = await socketService.receiveMessage();
          if(newMessage.message) {
            setMessages([...messages, newMessage]);
          }
          else if(newMessage.images && newMessage.userID != providerID) {
            setMessages([...messages, newMessage]);
            socketService.sendMessage({ roomID: 'booking-' + bookingID + '-provider', message: newMessage });
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
  )

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          await socketService.receiveRejectChat();
          onReject();
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [loading])
  )

  useFocusEffect(
    useCallback(() => {
      if(!loading)
      ( async() => {
        try {
          await socketService.receiveFinalizeServiceSpec();
          onUpdate();
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [loading])
  )
  

  const onUpdate = async() => {
    navigation.navigate('BookingSpecs', { typeName, icon, specsID, bookingID, serviceID, providerID, addressID })
  }

  const onConfirm = async() => {
    try {
      await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:1, referencedID:address, specsTimeStamp:Date.now() });
      await BookingServices.patchBooking(bookingID, { bookingStatus:4 });
      socketService.rejectChat('booking-' + bookingID);

      socketService.offChat();
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const onRejection = () => {
    socketService.offChat();
    navigation.goBack();
  }

  const onDecline = async() => {
    Alert.alert('Decline the Provider', 
      'Are you sure you want to decline this service provider? If you declined, we will search another service provider for you.', 
      [ { text: 'Cancel', }, { text: 'OK',  onPress: () => onConfirm(), } ]);
  }

  const onReject = async() => {
    Alert.alert('Provider Declined', 
      'We are sorry. The provider has declined your service request. We will search another service provider for you.', 
      [ { text: 'OK', onPress: () => onRejection(), } ]);
  }

  const onSendMsg = async() => {
    try {
      await MessageServices.createMessage({ bookingID, userID:providerID, message:value, dateTimestamp:Date.now()})
      let newMessage = { bookingID, userID:providerID, message:value, dateTimestamp:Date.now(), messageID:counter.toString() };
      let newMessages = [...messages, newMessage];
      let newCounter = counter + 1;

      socketService.sendMessage({ roomID: 'booking-' + bookingID + '-provider', message: newMessage });
      setMessages(newMessages);
      setCounter(newCounter);
      onChangeText('');
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
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
    let newMessage = { bookingID, userID:providerID, dateTimestamp:Date.now(), messageID:counter.toString() };
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
      
      await MessageServices.createMessage({ bookingID, userID:providerID, images:urls, dateTimestamp:Date.now()})
      newMessage = { bookingID, userID:providerID, images:urls, dateTimestamp:Date.now(), messageID:loadingID.toString() };
      // newMessages = [...messages.filter((data) => data.messageID !== newCounter.toString()), newMessage];

      socketService.sendMessage({ roomID: 'booking-' + bookingID + '-provider', message: newMessage });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      socketService.sendMessage({ roomID: 'booking-' + bookingID + '-provider', message: newMessage });
    }
    
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
    typeName, icon, address, specsID, scrollViewRef,
    bookingID, setBookingID,
    serviceID, setServiceID,
    providerID, setProviderID,
    addressID, setAddressID,
  
    loading, setLoading,
    value, onChangeText,
    viewer, setViewer,
    open, setOpen,
  
    providerName, setProviderName,
    providerDP, setProviderDP,
    refreshing, setRefreshing,
    messages, setMessages,
    images, setImages,

    onUpdate,
    onConfirm,
    onDecline,
    onSendMsg,
    onRefresh,

    pickImages,
    viewImages,
    removeImages,
    sendImages,
  }
}