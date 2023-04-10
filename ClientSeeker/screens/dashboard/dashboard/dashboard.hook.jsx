import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import ServiceTypeServices from '../../../services/service/service-type-services';
import { typeHandler } from '../../../utils/type-handler';

export default ( ) => {
  const [processing, setProcessing] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    ( async() => {
      try {
        let data = await ServiceTypeServices.getServiceTypes()
        let patched = await typeHandler(data.body);
        setServices(patched);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setProcessing(false);
    })();
  }, []);

  const featured = [
    {providerID: 'A', name: 'Alex Guerrero', location: 'Taguig City', serviceRatings: '4.3', typeName: 'Car Mechanic', initialCost: '420', src: require("../../../assets/providers/provider-a.png")},
    {providerID: 'B', name: 'Precious Trinidad', location: 'Los Baños', serviceRatings: '4.6', typeName: 'House Cleaning', initialCost: '360', src: require("../../../assets/providers/provider-b.png")},
    {providerID: 'C', name: 'Fe Mercado', location: 'Antipolo', serviceRatings: '4.2', typeName: 'Laundry', initialCost: '330', src: require("../../../assets/providers/provider-c.png")},
  ]

  const explore = [
    {providerID: 'D', name: 'Edgardo Dela Cena', location: 'Bacoor City', serviceRatings: '4.8', typeName: 'Roof Cleaning', initialCost: '410', src: require("../../../assets/providers/provider-d.png")},
    {providerID: 'E', name: 'Ricardo Pollicar', location: 'Mandaluyong City', serviceRatings: '4.4', typeName: 'Meal Preparation', initialCost: '300', src: require("../../../assets/providers/provider-e.png")},
    {providerID: 'F', name: 'Ced Montenegro', location: 'Manila', serviceRatings: '4.6', typeName: 'Plumbing', initialCost: '350', src: require("../../../assets/providers/provider-f.png")},
  ]

  return {
    processing, setProcessing,
    services, setServices,
    featured,
    explore,
  }
}