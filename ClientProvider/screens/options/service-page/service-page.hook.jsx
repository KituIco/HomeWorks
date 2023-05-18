import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import CredentialsServices from '../../../services/user/credentials-services';
import ServiceServices from '../../../services/service/service-services';
import ProviderServices from '../../../services/user/provider-services';

import { getUserID } from '../../../utils/get-userID';


export default ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [cover, setCover] = useState();

  const { serviceID } = route.params;
  
  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let { body: provider } = await ProviderServices.getProvider(userID);
        let { body: service } = await ServiceServices.getService(serviceID)
        let { body: credentials } = await CredentialsServices.getUserCredentials(userID);

        console.log(service)
        //dp, name, location, service type, reviewsCount, serviceRating, all stars, initial cost, serviceEnabled 

      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  
  return {
    loading, setLoading,
    
  }
}