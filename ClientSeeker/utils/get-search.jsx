import { Alert } from 'react-native';

import ServiceTypeServices from '../services/service/service-type-services';
import ProviderServices from '../services/provider/provider-services';
import ServiceServices from '../services/service/service-services';
import AddressServices from '../services/address/address-services';

import { addressHandler } from './address-handler';
import { getImageURL } from './get-imageURL';
import { typeHandler } from './type-handler';

export const getSearch = async(value, page, size) => {
    try {
      let { body: services } = await ServiceServices.getServiceByKeyword(value, page, size);
      if(!services) services = [];
 
      let { body: types } = await ServiceTypeServices.getServiceTypes();
      types = typeHandler(types);
      for (let i=0; i<services.length; i++) {
        let { body: provider } =  await ProviderServices.getProvider(services[i].providerID);
        let { body: address } = await AddressServices.getAllAddressOfUser(services[i].providerID);
        
        services[i]['name'] = provider.firstName+" "+provider.lastName;
        services[i]['location'] = addressHandler(address[0])
        services[i]['src'] = {uri : getImageURL(provider.providerDp)};

        for (let j=0; j<types.length; j++) {
            if (types[j].typeID == services[i].typeID)
                services[i]['icon'] = types[j]['icon'];
        }
         
      }
      return services;
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }