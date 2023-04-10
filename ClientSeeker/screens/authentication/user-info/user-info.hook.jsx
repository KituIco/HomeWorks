import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { useState } from 'react';

import CredentialsServices from '../../../services/user/credentials-services';
import SeekerServices from '../../../services/user/seeker-services';
import ImageService from '../../../services/image/image-services';

import { dateHandler } from '../../../utils/date-handler';
import styles from './user-info.style';

async function onSubmit( navigation, data ) {
  try {
    await CredentialsServices.validateIdentifier({
      username: data.username,
      phoneNumber: data.phoneNumber, 
    });
    let res = await ImageService.uploadFile(data.urlDp);
    data['seekerDp'] = res;
    delete data['urlDp'];
      
    await SeekerServices.createSeeker(data);
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
  const [loading, setLoading] = useState(false);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage();
  };
  
  const onOpen = () => {
    onCheck('birthday');
    setOpen(!open);
  }

  const onRegister = () => {
    if(new Set([usernameCHK, contactCHK, birthdayCHK]).has(styles.warning) || !usernameCHK || !contactCHK || !birthdayCHK ){
      Alert.alert('Check your Inputs', 
        'Valid inputs have input boxes with light green border.', 
        [ {text: 'OK'}, ]);
    } 
    
    else {
      setLoading(true);
      onSubmit(navigation, {
        email: mail,
        password: password,
        firstName: firstname,
        lastName: lastname,
        username: username,
        phoneNumber: contact,
        birthdate: dateHandler(birthday),
        urlDp: image,
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
    loading, setLoading,

    pickImage,
    removeImage,
    onOpen,
    onRegister,
    onCheck,
  }
}