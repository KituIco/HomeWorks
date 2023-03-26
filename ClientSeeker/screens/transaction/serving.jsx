import { StyleSheet, View, Text, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import Listing from '../../components/serviceListing';
import Header from '../../components/transactheader';
import Next from '../../components/transactnext';

import TransactionReportServices from '../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import ProviderServices from '../../services/provider/provider-services';
import BookingServices from '../../services/booking/booking-services';
import ServiceServices from '../../services/service/service-services';
import AddressServices from '../../services/address/address-services';
import socketService from '../../services/sockets/sockets-services';

import { addressHandler } from '../../utils/addressHandler';
import { getImageURL } from '../..//utils/getImageURL';
import Loading from '../../hooks/loading';


export default function Serving({route, navigation}) {
  const { typeName, icon, reportID } = route.params;
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [cost, setCost] = useState();
  const [desc, setDesc] = useState();
  
  const [statusIcon, setStatusIcon] = useState('train-car');
  const [status, setStatus] = useState('Arriving');
  const [paid, setPaid] = useState(false);
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

  useEffect(() => {
    socketService.joinRoom('report-' + reportID);
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        await socketService.receiveProviderServing();
        changeStatus();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        await socketService.receivePaymentReceived();
        changePaid();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);

  useEffect(() => {
    ( async() => {
      try {
        await socketService.receiveProviderDone();
        onComplete();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, []);

  const changeStatus = () => {
    setStatus('Serving');
    setStatusIcon('progress-star');
  };

  const changePaid = () => {
    setPaid(!paid)
  }

  const onComplete = () => {
    navigation.dispatch(StackActions.popToTop()),
    navigation.navigate('HistoryStack', { typeName, icon, reportID })
  }
  
  if(loading) return <View style={{flex:1}}><Loading/></View>
  
  return (
    <View style={{flex:1}}>
      {/* remove touchables */}
      <Header service={typeName} icon={icon} phase={3}/>

      <ScrollView style={styles.container}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.circle}>
          <MaterialCommunityIcons name={statusIcon} size={129} style={{color:'#9C54D5'}}/>
        </View>
        
        <Text style={styles.heading}>Your Service Provider</Text>
        <Listing listings={list} solo={true}/>

        <Text style={styles.heading}>Service Payment</Text>
        <View style={styles.subheading}>
          <Text style={[{width: '60%'},styles.texts]}>{typeName} Service</Text>
          <Text style={styles.texts}> Php <Text style={{fontFamily: 'quicksand-bold'}}>{cost}</Text></Text>
        </View>

        <Text style={styles.heading}>Service Description</Text>
        <Text style={[{marginHorizontal:24},styles.texts]}>{desc}</Text>
        <Text style={[styles.texts, {marginHorizontal:24, marginBottom:20, marginTop:6, color:'#9C54D5', fontFamily:'quicksand-bold'}]}>
          Service Location: <Text style={{color:'#000000', fontFamily:'quicksand-medium'}}>{address}</Text> </Text>


      </ScrollView>

      { !paid &&
      <Next icon={icon} service={typeName} navigation={navigation} title={'Settle Payment'} screen={'Payment'}/>
      }

      { paid &&
      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
        <TouchableWithoutFeedback onPress= {() => onComplete()}>
        <View style={styles.bottom}>
          <MaterialCommunityIcons name={'check-circle-outline'} size={26} style={{color:'#462964'}}/>
          <Text style={styles.bottext}>Payment has been Settled</Text>
        </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
      }

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: -10
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
  details: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  content: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    marginHorizontal: 24,
    marginTop: -4,
    alignItems: 'center'
  },
  texts: {
    fontFamily: 'quicksand', 
    fontSize: 12
  },

  bottom: {
    height: 80,
    backgroundColor: '#EFEFEF',
    marginTop:6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottext: {
    fontSize: 20,
    letterSpacing: -0.5,
    fontFamily: 'lexend',
    color: '#462964',
    paddingLeft: 6,
    paddingBottom: 2,
  }
});