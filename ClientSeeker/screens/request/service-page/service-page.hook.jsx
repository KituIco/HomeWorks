import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import ServiceServices from '../../../services/service/service-services';
import AddressServices from '../../../services/address/address-services';
import ProviderServices from '../../../services/provider/provider-services';

import { getUserID } from '../../../utils/get-userID';
import { getImageURL } from '../../../utils/get-imageURL';
import { addressHandler } from '../../../utils/address-handler';


export default ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState();

  const [cover, setCover] = useState();
  const [name, setName] = useState();
  const [type, setType] = useState();

  const [star1, setStar1] = useState(0);
  const [star2, setStar2] = useState(0);
  const [star3, setStar3] = useState(0);
  const [star4, setStar4] = useState(0);
  const [star5, setStar5] = useState(0);

  const [count, setCount] = useState(0);
  const [average, setAverage] = useState();

  const [enabled, setEnabled] = useState();
  const [cost, setCost] = useState();

  const { serviceID } = route.params;
  
  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let { body: service } = await ServiceServices.getService(serviceID);
        let { body: provider } = await ProviderServices.getProvider(service.providerID);
        let { body: address } = await AddressServices.getAllAddressOfUser(service.providerID);
        

        setLocation(addressHandler(address[0]));
        if (provider.providerDp) setCover({uri : getImageURL(provider.providerDp)});
        else setCover(require("../../../assets/cover.png"))

        setName(`${provider.firstName} ${provider.lastName}`);
        setType(service.typeName);

        setStar1(service.oneStar);
        setStar2(service.twoStar);
        setStar3(service.threeStar);
        setStar4(service.fourStar);
        setStar5(service.fiveStar);

        setCount(service.reviewsCount);
        setAverage(service.serviceRating);

        setEnabled(service.serviceEnabled);
        setCost(service.initialCost);

      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  const changeCost = async() => {

  }

  const changeEnabled = async() => {

  }

  
  return {
    loading, setLoading,
    location, setLocation,
    
    cover, setCover,
    name, setName,
    type, setType,

    star1, setStar1,
    star2, setStar2,
    star3, setStar3,
    star4, setStar4,
    star5, setStar5,

    count, setCount,
    average, setAverage,

    enabled, setEnabled,
    cost, setCost,

    changeCost,
    changeEnabled,
  }
}