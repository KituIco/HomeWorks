import { Alert } from 'react-native';
import { useState } from 'react';

import CredentialsServices from '../../../services/user/credentials-services';

export default ( navigation ) => {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const onLogin = async() => {
    if( mail && password) {
      setLoading(true);
      try {
        await CredentialsServices.login({ identifier: mail, password: password });
        navigation.replace('HomeStack');

      } catch (err) {
        Alert.alert('Login Warning', err+'. Make sure to input correct credentials.', 
          [ {text: 'OK'} ]);
      }
      setLoading(false);
    }
  }
  
  return {
    mail, setMail,
    password, setPassword,
    loading, setLoading,
    onLogin,
  }
}