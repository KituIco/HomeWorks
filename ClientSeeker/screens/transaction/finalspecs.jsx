import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { StackActions } from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';

import { addressHandler } from '../../utils/addressHandler';
import Header from '../../components/transactheader';
import { getUserID } from '../../utils/getUserID';
import Loading from '../../hooks/loading';

import TransactionReportServices from '../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import BookingServices from '../../services/booking/booking-services';
import AddressServices from '../../services/address/address-services';
import PaymentServices from '../../services/payment/payment-services';
import socketService from '../../services/sockets/sockets-services';


export default function FinalSpecs({ route, navigation }) {
  const { typeName, icon, bookingID, addressID, providerID, specsID, serviceID } = route.params;
  const [description, setDescription] = useState('');
  const [seekerID, setSeekerID] = useState('');
  const [cost, setCost] = useState();

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const [location, setLocation] = useState('');
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [region, setRegion] = useState();

  useEffect(() => {
    ( async() => {
      try {
        console.log(route.params)
        let userID = await getUserID();
        let { body: address } = await AddressServices.getAddressByID(addressID);
        let { body: booking } = await BookingServices.getBookingByID(bookingID);
        setDescription(booking.description);
        setCost(booking.cost);
        setSeekerID(userID);
        
        setLocation(addressHandler(address));
        setLongitude(address.longitude);
        setLatitude(address.latitude);
        setRegion({
          latitude: address.latitude,
          longitude: address.longitude,
          latitudeDelta: 0.0060,
          longitudeDelta: 0.0050,
        })
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const onDecline = async() => {
    try {
      let bookingStatus = 1;
      await BookingServices.patchBooking(bookingID, { bookingStatus });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    navigation.goBack();
  }

  const onAccept = async() => {
    setProcessing(true);
    try {
      let paymentMethod = 1;
      let paymentStatus = 1;
      let payment = await PaymentServices.createPayment({ 
        seekerID, providerID, serviceID, paymentMethod, paymentStatus, amount: parseFloat(cost)
      });
      
      let transactionStat = 2;
      let paymentID = payment.body.paymentID;
      let transaction = await TransactionReportServices.createTransactionReport({
        bookingID, paymentID, specsID, seekerID, providerID, serviceID, transactionStat
      });

      let specsStatus = 3;
      let bookingStatus = 3;
      let referencedID = transaction.body.reportID;
      await BookingServices.patchBooking( bookingID, { bookingStatus });
      await ServiceSpecsServices.patchServiceSpecs( specsID, { referencedID , specsStatus });
      socketService.acceptFinalizeServiceSpec("booking-" + bookingID);

      let reportID = transaction.body.reportID;
      navigation.dispatch(StackActions.popToTop());
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('ServeStack', {typeName, icon, reportID });
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setProcessing(false);
  }

  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      { processing && <Loading/> }
      <Header service={typeName} icon={icon} phase={2}/>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Cost and Address</Text>
        <View style={styles.details}>
          <Text style={styles.content}>{typeName} Service</Text>
          <Text style={[styles.content,{fontFamily: 'quicksand-bold', fontSize: 16}]}>{cost}</Text>
        </View>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5}}/>
        <View style={{width:'100%', height: 220, marginVertical:-4}}>
          <MapView style={{flex:1}} initialRegion={region}>
            <Marker coordinate={{ latitude, longitude}}>
              <Image style={{height:38.2,width:28}} source={require("../../assets/pin.png")}/>
            </Marker>
          </MapView>
        </View>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>

        <View style={styles.address}>
          <Text style={styles.location}>{location}</Text>
        </View>
        
        <Text style={styles.heading}>Service Description</Text>
        <View style={[styles.details, {marginBottom:30}]}>
          <Text style={styles.content}>{description}</Text>
        </View>
      
      </ScrollView>


      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)']} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
			<View style={styles.footer}>

        <TouchableWithoutFeedback onPress= {() => onAccept()}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)']} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.accept}>
              <Text style={styles.prompt}>Accept Service Specs</Text>
            </LinearGradient>      
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => onDecline()}>
          <LinearGradient colors={['rgba(10,10,10,0.4)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <View style={styles.decline}>
              <Text style={[styles.prompt, {color:'#462964', fontSize: 14}]}>Decline and Chat Again</Text>
            </View>         
          </LinearGradient>
        </TouchableWithoutFeedback>
			</View>
		</LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom:-6, 
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginVertical: 8,
    paddingHorizontal: 20,
  },

  image: {
    height: 200,
    width: '250%',
    alignSelf:'center',
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    marginHorizontal: 24,
    marginVertical: 10,
    
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  location: {
    fontFamily: 'quicksand',
    width: '90%',
    fontSize: 12,
    color: '#888486',
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
    marginBottom: 6,
  },
  subcontent: {
    fontFamily: 'quicksand',
    fontSize: 11,
    marginBottom: 20,
    marginTop: -6,
    marginHorizontal: 24,
    color: '#888486'
  },

  footer: {
    height: 120,
    backgroundColor: '#F9F9F9',
    marginTop:6,
    justifyContent: 'center'
  },
  shadow: {
    marginHorizontal: 30,
    borderRadius: 6
  },
  accept: {
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8
  },
  decline: {
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#F9F9F9', 
    borderWidth: 0.6, 
    borderColor: '#462964', 
  },


  prompt: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 16
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    margin: 12,
    marginTop: -4,
    alignItems: 'center'
  }
});