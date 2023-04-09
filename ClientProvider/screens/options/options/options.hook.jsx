import { getImageURL } from '../../../utils/getImageURL';
import { getUserID } from '../../../utils/getUserID';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import CredentialsServices from '../../../services/user/credentials-services';
import ProviderServices from '../../../services/user/provider-services';

export default ( navigation ) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(require("../../../assets/default.jpg"));
  
  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let data = await ProviderServices.getProvider(userID)
        setName(`${data.body.firstName} ${data.body.lastName}`);
        if (data.body.providerDp)
          setImage({uri : getImageURL(data.body.providerDp)});

      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  const onLogout = () => {
    setLoading(true);
    CredentialsServices.logout()
    .then(() => {
      navigation.replace('AuthStack');
    })
    .catch(() => setLoading(false))
  }

  return {
    name, setName,
    loading, setLoading,
    image, setImage,
    onLogout
  }
}