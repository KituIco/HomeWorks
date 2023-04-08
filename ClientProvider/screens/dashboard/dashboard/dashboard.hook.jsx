import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import ProviderServices from '../../../services/user/provider-services';
import AddressServices from '../../../services/address/address-services';
import ServiceServices from '../../../services/service/service-services';
import { getUserID } from '../../../utils/getUserID';

export default ( navigation ) => {
  const [verified, setVerified] = useState(true);
  const [noAddress, setNoAddress] = useState(false);
  const [noService, setNoService] = useState(false);
  const [message1, setMessage1] = useState('To get requests, please add an address.')
  const [message2, setMessage2] = useState('To be verified, register your services.')

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let data = await ProviderServices.getProvider(userID);
        let fullname = `${data.body.firstName} ${data.body.lastName}`;

        if(!data.body.verified) {
          let address = await AddressServices.getAllAddressOfUser(userID);
          let service = await  ServiceServices.getProviderServices(userID);
          
          if(address.body.length == 0) setNoAddress(true);
          else setMessage1('The admins are verifying your profile.')
          if(service.body.length == 0) setNoService(true);
          else setMessage2('You may manage your profile in Options.')

          if(address.body.length == 0 || service.body.length == 0)
            setVerified(false);
        } 
        setName(fullname); 
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        navigation.navigate('AuthStack');
      }
      setLoading(false);
    })();
  }, []);

  const changeReg = () => {
    setVerified(!verified);
  };

  return {
    verified, setVerified,
    noAddress, setNoAddress,
    noService, setNoService,
    message1, setMessage1,
    message2, setMessage2,

    loading, setLoading,
    name, setName,
    changeReg,
  }
}