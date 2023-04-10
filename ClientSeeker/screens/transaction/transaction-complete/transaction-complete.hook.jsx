import { useState, useEffect } from 'react';

import TransactionReportServices from '../../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import ProviderServices from '../../../services/provider/provider-services';
import BookingServices from '../../../services/booking/booking-services';
import ServiceServices from '../../../services/service/service-services';
import AddressServices from '../../../services/address/address-services';

import { addressHandler } from '../../../utils/address-handler';
import { getImageURL } from '../../../utils/get-imageURL';


export default ( route ) => {
  const { typeName, icon, reportID } = route.params;
  const [value, onChangeText] = useState('');
  const [rates, setRates] = useState(0);
  const [answered, setAnswered] = useState(false);

  const starList = ['star-outline','star-outline','star-outline','star-outline','star-outline']
  const [stars, setStars] = useState(starList);

  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [cost, setCost] = useState();
  const [desc, setDesc] = useState();
  const [list, setList] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let { body: report } = await TransactionReportServices.getTransactionReportsByID(reportID);
        let { body: booking } = await BookingServices.getBookingByID(report.bookingID);
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(report.specsID);

        let { body: provider } = await ProviderServices.getProvider(report.providerID);
        let { body: address } = await AddressServices.getAddressByID(specs.addressID);
        let { body: service } = await ServiceServices.getService(report.serviceID)
        
        let providerInfo = [{
          providerID: report.providerID, name: provider.firstName+" "+provider.lastName, location: addressHandler(address),
          serviceRatings: service.serviceRating, typeName: service.typeName, initialCost: service.initialCost, icon, src: {uri : getImageURL(provider.providerDp)}
        }];

        setAddress(addressHandler(address))
        setDesc(booking.description);
        setCost(booking.cost);
        setList(providerInfo);
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const changeRating = (rate) => {
    let newList = ['star-outline','star-outline','star-outline','star-outline','star-outline'];
    for (let i=0; i<=rate; i++){
      newList[i] = 'star'
    }
    setStars(newList);
    setRates(rate+1);
  }

  const changeStatus = () => {
    setAnswered(true);
  }

  return {
    typeName, icon, reportID, 
    value, onChangeText,
    rates, setRates,
    answered, setAnswered,

    starList, 
    stars, setStars,

    loading, setLoading,
    address, setAddress,
    cost, setCost,
    desc, setDesc,
    list, setList,

    changeRating,
    changeStatus,
  }
}