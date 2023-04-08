import { Alert } from 'react-native';
import { useState } from 'react';

import CredentialsServices from '../../../services/user/credentials-services';
import styles from './register.style';

export default ( navigation ) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [confirm, setConfirm] = useState('');

  const [mailCHK, setMailCHK] = useState();
  const [passwordCHK, setPasswordCHK] = useState();
  const [firstnameCHK, setFirstnameCHK] = useState();
  const [confirmCHK, setConfirmCHK] = useState();
  const [lastnameCHK, setLastnameCHK] = useState();

  const [loading, setLoading] = useState(false);

  const onRegister = async() => {
    if(new Set([firstnameCHK, lastnameCHK, mailCHK, passwordCHK, confirmCHK]).has(styles.warning) 
      || !firstnameCHK || !mailCHK || !passwordCHK || !confirmCHK){
      Alert.alert('Check your Inputs', 
        'Valid inputs have input boxes with light green border surrounding the field.', 
        [ {text: 'OK'} ]
      );
    } 
    
    else {
      setLoading(true);
      try {
        await CredentialsServices.validateIdentifier({ email:mail });
        navigation.navigate('UserInfo', {
          firstname, lastname, mail, password,
        });

      } catch (err) {
        Alert.alert('Registration Warning', 
          err + ' Please provide a new Email. You may also choose to login instead.', 
          [ {text: 'OK'} ]
        );
      } 
      setLoading(false);
    }
  }

  const onCheck = (type) => {
    let mailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let passRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
    if (type == 'pw'|| type == 'confirm') setConfirmCHK( (password == confirm) ? styles.accepted : styles.warning);
    else if (type == 'first') setFirstnameCHK( firstname ? styles.accepted : styles.warning);
    else if (type == 'last') setLastnameCHK( lastname ? styles.accepted : styles.warning);
    else if (type == 'mail') setMailCHK( mailRegex.test(mail) ? styles.accepted : styles.warning);
    if (type == 'pw' ) setPasswordCHK( passRegex.test(password) ? styles.accepted : styles.warning); 
  }

  return {
    mail, setMail,
    password, setPassword,
    firstname, setFirstname,
    lastname, setLastname,
    confirm, setConfirm,

    mailCHK, setMailCHK,
    passwordCHK, setPasswordCHK,
    firstnameCHK, setFirstnameCHK,
    confirmCHK, setConfirmCHK,
    lastnameCHK, setLastnameCHK,

    loading, setLoading,

    onRegister,
    onCheck,
  }
}