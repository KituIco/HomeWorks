import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { useState } from 'react';
import { dateHandler } from '../../../utils/dateHandler';

import CredentialsServices from '../../../services/user/credentials-services';
import ProviderServices from '../../../services/user/provider-services';
import ImageService from '../../../services/image/image-services';
import styles from './user-info.style';

async function onSubmit( navigation, data ) {
  try {
    await CredentialsServices.validateIdentifier({
      username: data.username,
      phoneNumber: data.phoneNumber, 
    });

    let DP = await ImageService.uploadFile(data.urlDp)
    data['providerDp'] = DP;
    delete data['urlDp'];
    
    let ID = await ImageService.uploadFile(data.urlID)
    data['validID'] = ID;
    delete data['urlID'];

    data['verified'] = 0;

    await ProviderServices.createProvider(data)
    navigation.replace('HomeStack');

  } catch (err) {
    Alert.alert('Registration Warning', err, [ {text: 'OK'} ]);
    throw err;
  }
}

export default ( navigation, route ) => {
  const firstname = route.params.firstname;
  const lastname = route.params.lastname;
  const mail = route.params.mail;
  const password = route.params.password;

  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameCHK, setUsernameCHK] = useState();
  const [contactCHK, setContactCHK] = useState();
  const [birthdayCHK, setBirthdayCHK] = useState();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const pickImage = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1,
    });
    if (!result.canceled) {
      if(type == 'icon') setImage(result.assets[0].uri);
      else if(type == 'id') setId(result.assets[0].uri);
    }
  };

  const removeImage = (type) => {
    if(type == 'icon') setImage();
    else if(type == 'id') setId();
  };
  
  const onOpen = () => {
    onCheck('birthday');
    setOpen(!open);
  }

  const onRegister = () => {
    if(new Set([usernameCHK, contactCHK, birthdayCHK]).has(styles.warning) || !usernameCHK || !contactCHK || !birthdayCHK || !id){
      Alert.alert('Check your Inputs', 
        'Valid inputs have input boxes with light green border.', [
        {text: 'OK'},
      ]);
    } 
    
    else {
      setLoading(true);
      onSubmit( navigation, {
        email: mail,
        password: password,
        firstName: firstname,
        lastName: lastname,
        username: username,
        phoneNumber: contact,
        birthdate: dateHandler(birthday),
        urlDp: image,
        urlID: id,
      }).catch(() => setLoading(false))
    }
  }

  const onCheck = (type) => {
    let numRegex = new RegExp(/^\+639[0-9]{9}/);
    let nameRegex = new RegExp(/^[a-zA-Z0-9_\-]{3,25}$/);
    if (type == 'username') setUsernameCHK( nameRegex.test(username) ? styles.accepted : styles.warning);
    else if (type == 'contact') setContactCHK( numRegex.test(contact) ? styles.accepted : styles.warning);
    else if (type == 'birthday') setBirthdayCHK( birthday ? styles.accepted : styles.warning);
  }

  return {
    firstname, lastname, mail, password,
    username, setUsername,
    contact, setContact,
    birthday, setBirthday,

    usernameCHK, setUsernameCHK,
    contactCHK, setContactCHK,
    birthdayCHK, setBirthdayCHK,

    open, setOpen,
    image, setImage,
    id, setId,
    loading, setLoading,

    pickImage,
    removeImage,
    onOpen,
    onRegister,
    onCheck,
  }
}