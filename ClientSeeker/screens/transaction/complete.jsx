import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import Header from '../../components/transactheader';
import Listing from '../../components/serviceListing';

import TransactionReportServices from '../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import ProviderServices from '../../services/provider/provider-services';
import BookingServices from '../../services/booking/booking-services';
import ServiceServices from '../../services/service/service-services';
import AddressServices from '../../services/address/address-services';

import { addressHandler } from '../../utils/addressHandler';
import { getImageURL } from '../..//utils/getImageURL';
import Loading from '../../hooks/loading';

export default function Complete({route, navigation}) {
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

  var ratings = [];
  for (let i=0; i<5; i++){
    ratings.push(
      <TouchableWithoutFeedback onPress={() => changeRating(i)} key={i}>
        <MaterialCommunityIcons name={stars[i]} size={16} style={{color:'#9C54D5', marginHorizontal:3}}/>
      </TouchableWithoutFeedback>
    )
  }

  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={{flex:1}}>
      <Header service={typeName} icon={icon} phase={4}/>

      <ScrollView style={styles.container}>
        <Text style={styles.status}>Complete</Text>
          <View style={styles.circle}>
            <MaterialCommunityIcons name={'star-check'} size={129} style={{color:'#9C54D5'}}/>
          </View>
        
        <Text style={styles.heading}>Your Service Provider</Text>
        <Listing listings={list} solo={true}/>

        <Text style={styles.heading}>Service Payment</Text>
        <View style={styles.subheading}>
          <Text style={[{width: '60%'},styles.texts]}>{typeName} Service</Text>
          <TouchableWithoutFeedback onPress={() => changePaid()}>
            <Text style={[styles.texts, {fontFamily:'quicksand-bold'}]}>Php {cost}</Text>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.heading}>Service Description</Text>
        <Text style={[{marginHorizontal:24},styles.texts]}>{desc}</Text>
        <Text style={[styles.texts, {marginHorizontal:24, marginBottom:20, marginTop:6, color:'#9C54D5', fontFamily:'quicksand-bold'}]}>
          Service Location: <Text style={{color:'#000000', fontFamily:'quicksand-medium'}}>{address}</Text> </Text>

        { answered &&
        <View style={{marginTop:-24, marginBottom: 40}}>
          <Text style={styles.heading}>My Feedback</Text>
          <View style={styles.subheading}>
            <Text style={[{width: '85%', paddingBottom:4},styles.texts]}>{value} </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
              <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
              <Text style={styles.ratings}> {rates}</Text>
            </View>
          </View>
        </View>
        }

      </ScrollView>

      <LinearGradient colors={['rgba(0,0,0,0.9)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
        { !answered &&
        <View style={styles.bottom}>

          { rates === 0 || value === '' ? (
            <Text style={styles.instructions}>Toggle Star Ratings and Add a Review to Submit Feedback</Text>
          ): (null)
          }
          

          <View style={styles.stars}>
            { ratings }
          </View>
          <TextInput multiline numberOfLines={3} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
            placeholder='We would greatly appreciate your review for our service.'/>

          { rates !== 0 && value !== '' ? (
            <TouchableWithoutFeedback onPress= {() => changeStatus()}>
              <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)']} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
                <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.accept}>
                  <Text style={styles.prompt}>Submit Ratings and Review</Text>
                </LinearGradient>         
              </LinearGradient>
            </TouchableWithoutFeedback>
          ): (null)
          }
          
        </View>
        }

      </LinearGradient>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: -10,
  },
  status: {
    fontFamily: 'lexend',   
    fontSize: 23,
    textTransform:'uppercase',
    alignSelf: 'center',
    color: "#9C54D5",
    letterSpacing: -1,
    marginTop: 24,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 140,
    backgroundColor: '#EFEFEF',
    alignSelf: 'center',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    marginHorizontal: 24,
    marginTop: -4,
    alignItems: 'center',
  },
  texts: {
    fontFamily: 'quicksand', 
    fontSize: 12,
  },

  bottom: {
    height: 170,
    backgroundColor: '#F9F9F9',
    marginTop:6,
    alignItems: 'center',
    padding: 12,
  },
  text: {
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    // placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    textAlignVertical: 'top',
    letterSpacing: -0.5,
    fontSize: 12,
    width: '100%',
    marginTop: 6,
  },

  accept: {
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
  },
  shadow: {
    marginHorizontal: 30,
    borderRadius: 6,
    width: '100%',
    marginTop: 10,
  },
  prompt: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 14,
  },
  stars: {
    flexDirection:'row',
    width: '100%', 
    marginTop:6, 
    alignItems:'center',
    justifyContent: 'flex-end',
  },

  instructions: {
    textAlign: 'center',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    color:'#484446',
    marginVertical: 10,
  },
  ratings: {
    fontFamily: 'quicksand-medium',
    fontSize: 14
  },
});