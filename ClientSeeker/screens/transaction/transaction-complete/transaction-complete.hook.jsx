import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import TransactionReportServices from '../../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import ProviderServices from '../../../services/provider/provider-services';
import BookingServices from '../../../services/booking/booking-services';
import ServiceServices from '../../../services/service/service-services';
import AddressServices from '../../../services/address/address-services';
import ReviewServices from '../../../services/review/review-services';

import { addressHandler } from '../../../utils/address-handler';
import { getImageURL } from '../../../utils/get-imageURL';


export default ( navigation, route ) => {
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
          providerID: report.providerID, name: provider.firstName+" "+provider.lastName, location: addressHandler(address), serviceID: report.serviceID, seekerID: report.seekerID,
          serviceRatings: service.serviceRating, typeName: service.typeName, initialCost: service.initialCost, icon, src: {uri : getImageURL(provider.providerDp)}
        }];

        if(report.transactionStat == 4){
          let { body: review } = await ReviewServices.getReview(report.reviewID);
          setRates(review.rating);
          onChangeText(review.comment);
          setAnswered(true);
        }

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

  const changeStatus = async() => {
    try {
      let { body: review } = await ReviewServices.createReview({ 
        serviceID: list[0].serviceID, 
        seekerID: list[0].seekerID, 
        dateTimestamp: Date.now(), 
        rating: rates, comment: value
      });
      await TransactionReportServices.patchTransactionReport(reportID, { transactionStat:4, reviewID:review.reviewID });
      setAnswered(true);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    
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