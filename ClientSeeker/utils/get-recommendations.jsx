import { Alert } from 'react-native';

import ServiceTypeServices from '../services/service/service-type-services';
import ProviderServices from '../services/provider/provider-services';
import ServiceServices from '../services/service/service-services';
import AddressServices from '../services/address/address-services';

import { addressHandler } from '../utils/address-handler';
import { getImageURL } from '../utils/get-imageURL';
import { typeHandler } from './type-handler';

export const getRecommendations = async(lat, lon, page, size) => {
    try {
      let { body: recoms } = await ServiceServices.getServiceRecommendations(lat,lon,page,size);
      let { body: types } = await ServiceTypeServices.getServiceTypes();
      types = typeHandler(types);
      for (let i=0; i<recoms.length; i++) {
        let { body: provider } =  await ProviderServices.getProvider(recoms[i].providerID);
        let { body: address } = await AddressServices.getAllAddressOfUser(recoms[i].providerID);
        
        recoms[i]['name'] = provider.firstName+" "+provider.lastName;
        recoms[i]['location'] = addressHandler(address[0])
        recoms[i]['src'] = {uri : getImageURL(provider.providerDp)};

        for (let j=0; j<types.length; j++) {
            if (types[j].typeID == recoms[i].typeID)
                recoms[i]['icon'] = types[j]['icon'];
        }
         
      }
      return recoms;
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }