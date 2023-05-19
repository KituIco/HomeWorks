import { Alert, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';

import CredentialsServices from '../../../services/user/credentials-services';
import AddressServices from '../../../services/address/address-services';
import ProviderServices from '../../../services/user/provider-services';
import ImageService from '../../../services/image/image-services';

import { getUserID } from '../../../utils/get-userID';
import { getImageURL } from '../../../utils/get-imageURL';


export default ( navigation ) => {
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState();

  const [username, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [agencyId, setAgencyId] = useState();

  const [image, setImage] = useState(require("../../../assets/default.jpg"));
  const [processing, setProcessing] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [providerID, setProviderID] = useState('');
  const [open, setOpen] = useState(false);

  const [type, setType] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let address = await AddressServices.getAllAddressOfUser(userID);
        if(address.body.length == 0){
          navigation.replace('HomeStack');
          navigation.navigate('HomeStack', { screen:'OptionsStack', 
            params: { screen: 'ProfileAddress', initial:false } });
        }

        let provider = await ProviderServices.getProvider(userID);
        let credentials = await CredentialsServices.getUserCredentials(userID);

        if(provider.body.providerDp)
          setImage({uri : getImageURL(provider.body.providerDp)});
        if (provider.body.agencyId) 
          setAgencyId(provider.body.agencyId);
        
        setFirstname(provider.body.firstName);
        setLastname(provider.body.lastName)
        setBirthdate(provider.body.birthdate);
        setAddress(address.body[0])

        setProviderID(userID);
        setEmail(credentials.body.email);
        setUsername(credentials.body.username);
        setContact(credentials.body.phoneNumber);

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
      let providerDp = await ImageService.uploadFile(newImage);
      await ProviderServices.patchProvider(providerID, { providerDp });
      navigation.replace('HomeStack');
      navigation.navigate('HomeStack', { screen:'OptionsStack', 
        params: { screen: 'Profile', initial:false } });
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
    address, setAddress,

    username, setUsername,
    firstName, setFirstname,
    lastName, setLastname,
    agencyId, setAgencyId,

    image, setImage,
    processing, setProcessing,
    loading, setLoading,

    isKeyboardVisible, setKeyboardVisible,
    providerID, setProviderID,
    open, setOpen,

    type, setType,
    newImage, setNewImage,

    onEdit,
    onClose,
    onCredentials,
    fromChild,
    pickImage,
    removeImage,
    onUpload,
  }
}