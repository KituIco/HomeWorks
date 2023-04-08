import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import TransactionReportServices from '../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import BookingServices from '../../services/booking/booking-services';
import AddressServices from '../../services/address/address-services';
import ServiceServices from '../../services/service/service-services';

import { addressHandler } from '../../utils/addressHandler';
import Loading from '../../hooks/loading';
import Back from '../../hooks/back';

export default function Done({ navigation, route }) {
  const { reportID } = route.params;
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState();
  const [type, setType] = useState();
  const [cost, setCost] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    ( async() => {
      try {
        let { body: report } = await TransactionReportServices.getTransactionReportsByID(reportID);
        let { body: booking } = await BookingServices.getBookingByID(report.bookingID);

        let { body: specs } = await ServiceSpecsServices.getSpecsByID(report.specsID);
        let { body: address } = await AddressServices.getAddressByID(specs.addressID);
        let { body: service } = await ServiceServices.getService(report.serviceID)

        setAddress(addressHandler(address));
        setType(service.typeName);
        setDesc(booking.description);
        setCost(booking.cost);
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const onDone = () => {
    navigation.navigate('RequestList');
  }

  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>  
      <Text style={styles.heading}>Well Done, Provider!</Text>

      
      <View>
        <Text style={styles.subheading}>You successfully completed this service. You may go back to requests page.</Text>
        <TouchableWithoutFeedback onPress= {() => onDone()}>          
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
          <View style={styles.border}>
              <LinearGradient colors={['#338B93', '#247E44']} start={{ x:0.5, y:0 }} end={{ x:-0.3, y:0.8 }} style={styles.button}>
                <Text style={styles.ready}>Return</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

      <Text style={styles.footer}>Service Cost</Text>
      <View style={styles.details}>
        <Text style={styles.content}>{type} Service</Text>
        <Text style={[styles.content,{fontFamily:'quicksand-bold'}]}>Php {cost}</Text>
      </View>

      <View  style={{width:'90%', alignSelf:'center', marginTop: 30}}>
        <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow2}>
          <View style={styles.button2}>
            <Text style={[styles.next2, {color: '#606060', fontSize:14}]}>Click here to see Service Details</Text>
          </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <View style={styles.description}>
              <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:10}}/>
                <ScrollView style={{marginVertical:-10, paddingHorizontal: 22}}>

                  <Text style={styles.head}>Service Details</Text>
                  <Text style={styles.desc}>Shown below are the service cost, the service description, and the location.</Text>

                  <Text style={styles.subhead}>Service Cost</Text>
                  <View style={styles.details}>
                    <Text style={styles.desc}>{type} Service</Text>
                    <Text style={[styles.desc,{fontFamily:'quicksand-bold'}]}>Php {cost}</Text>
                  </View>

                  <Text style={styles.subhead}>Service Description</Text>
                  <Text style={styles.desc}>{desc}</Text>

                  <Text style={styles.subhead}>Service Location</Text>
                  <Text style={[styles.desc, {marginBottom: 20}]}>{address}</Text>


                </ScrollView> 
              <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:11, zIndex:5, marginBottom:10}}/>
            </View>
            
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '20%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
  },

  shadow: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    marginTop: 50,
    justifyContent:'center',
    alignSelf: 'center',
  },
  border: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    justifyContent:'center',
    backgroundColor: '#E9E9E9',
    marginTop: -8,
    overflow: 'hidden'
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  ready: {
    fontFamily: 'lexend',
    color: '#F9F9F9',
    fontSize: 32,
    textTransform: 'uppercase',
    letterSpacing: -1
  },


  redirect: {
    fontFamily:'quicksand-bold', 
    textDecorationLine: 'underline',
  },
  icons: {
    marginTop: 6, 
    marginLeft: -8,
  },

  footer: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 22,
    color: '#462964',
    letterSpacing: -0.8,
    marginTop: '25%',
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 30,
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 14,
    marginBottom: 10,
  },

  shadow2: {
    borderRadius: 10,
    height: 32,
    width:'90%',
    marginBottom: 10,
    alignSelf: 'center'
  },
  button2: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
    borderWidth:1, 
    borderColor: '#000000'
  },
  next2: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 17,
    color: '#FFF'
  },

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    height: '50%'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5,
  },

  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    backgroundColor: '#E9E9E9A0'
  },

  description: {
    flex:1,
    marginTop: 10,
  },
  head: {
    fontFamily: 'notosans',
    fontSize: 24,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  desc: {
    fontFamily: 'quicksand',
    fontSize: 13,
    letterSpacing: -0.2,
    color: '#323941',
  },

  subhead: {
    fontFamily: 'notosans-medium',
    fontSize: 16,
    letterSpacing: -0.5,
    marginTop: 16,
  },
});