import { Keyboard, Alert } from 'react-native';
import { useState, useEffect } from 'react';

import ProviderServices from '../../../services/user/provider-services';
import ServiceServices from '../../../services/service/service-services';

import { typeHandler } from '../../../utils/type-handler';
import { getUserID } from '../../../utils/get-userID';


export default ( ) => {
  const [userID, setUserID] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [noService, setNoService] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let data = await ServiceServices.getProviderServices(userID);
        
        setServices(typeHandler(data.body));
        setUserID(userID);
        if(data.body.length == 0) setNoService(true);

      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow', () => { setKeyboardVisible(true); });
    const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide', () => { setKeyboardVisible(false); });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const fromChild = () => {
    setKeyboardVisible(!isKeyboardVisible);
  }

  const onClose = () => {
    setOpen(!open);
    ProviderServices.getProvider(userID).then( data => {
      ServiceServices.getProviderServices(userID)
        .then((data) => {
          setServices(typeHandler(data.body));
          if(data.body.length == 0) setNoService(true);
          else setNoService(false)
        })
    })
  }

  return {
    userID, setUserID,
    loading, setLoading,
    open, setOpen,

    services, setServices,
    noService, setNoService,
    isKeyboardVisible, setKeyboardVisible,

    fromChild,
    onClose,
  }
}