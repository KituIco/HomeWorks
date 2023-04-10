import * as ImagePicker from 'expo-image-picker';
import { Alert, Keyboard } from 'react-native';
import { useState, useEffect } from 'react';

import CredentialsServices from '../../../services/user/credentials-services';
import SeekerServices from '../../../services/user/seeker-services';
import ImageService from '../../../services/image/image-services';

import { contactHandler } from '../../../utils/contact-handler';
import { getImageURL } from '../../../utils/get-imageURL';
import { getUserID } from '../../../utils/get-userID';



export default ( navigation ) => {
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [contact, setContact] = useState('');

  const [username, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');

  const [image, setImage] = useState(require("../../../assets/default.jpg"));
  const [processing, setProcessing] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [seekerID, setSeekerID] = useState('');
  const [open, setOpen] = useState(false);

  const [newImage, setNewImage] = useState(null);
  const [type, setType] = useState('');

  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let seeker = await SeekerServices.getSeeker(userID);
        let credentials = await CredentialsServices.getUserCredentials(userID);

        if(seeker.body.seekerDp)
          setImage({uri : getImageURL(seeker.body.seekerDp)})
        setFirstname(seeker.body.firstName);
        setLastname(seeker.body.lastName)
        setBirthdate(seeker.body.birthdate);

        setSeekerID(userID);
        setEmail(credentials.body.email);
        setUsername(credentials.body.username);
        setContact(contactHandler(credentials.body.phoneNumber));

      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setProcessing(false);    
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

  const onEdit = async() => {
    setOpen(true);
  }

  const onClose = async() => {
    setType();
    setOpen(false);
  }

  const onCredentials = async(type) => {
    setType(type);
    setOpen(true);
  }

  const fromChild = () => {
    setKeyboardVisible(!isKeyboardVisible);
  }

  const onLogout = async() => {
    setLoading(true);
    try {
      await CredentialsServices.logout()
      navigation.replace('AuthStack')
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setLoading(false)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1,
    });
    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setNewImage();
  };

  const onUpload = async () => {
    setLoading(true);
    try {
      let seekerDp = await ImageService.uploadFile(newImage);
      await SeekerServices.patchSeeker(seekerID, { seekerDp });
      navigation.replace('HomeStack');
      navigation.navigate('ProfileStack');
    } catch (err) {
      Alert.alert('Error', err, [ {text: 'OK'} ]);
      navigation.goBack()
    }
    setLoading(false);
  }

  return {
    email, setEmail,
    birthdate, setBirthdate,
    contact, setContact,

    username, setUsername,
    firstName, setFirstname,
    lastName, setLastname,

    image, setImage,
    processing, setProcessing,
    loading, setLoading,

    isKeyboardVisible, setKeyboardVisible,
    seekerID, setSeekerID,
    open, setOpen,

    type, setType,
    newImage, setNewImage,

    onEdit,
    onClose,
    onCredentials,
    onLogout,
    fromChild,
    pickImage,
    removeImage,
    onUpload,
  }
}