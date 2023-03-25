import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';


import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import ProviderServices from '../../services/provider/provider-services';
import ServiceServices from '../../services/service/service-services';
import BookingServices from '../../services/booking/booking-services';

import { getImageURL } from '../../utils/getImageURL';
import Header from '../../components/transactheader';
import Loading from '../../hooks/loading';
import Back from '../../hooks/back';

export default function SettleSpecs({ route, navigation }) {
  const { typeName, icon, address, specsID } = route.params;
  const [bookingID, setBookingID] = useState();
  const [serviceID, setServiceID] = useState();
  const [providerID, setProviderID] = useState();
  const [addressID, setAddressID] = useState();

  const [loading,setLoading] = useState(true);
  const [value, onChangeText] = useState();

  const [providerName, setProviderName] = useState('');
  const [providerDP, setProviderDP] = useState(require("../../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
        let { body: booking } = await BookingServices.getBookingByID(specs.referencedID);
        let { body: service } = await ServiceServices.getService(booking.serviceID);
        let { body: user } = await ProviderServices.getProvider(service.providerID);
        
        setBookingID(specs.referencedID);
        setServiceID(booking.serviceID);
        setProviderID(service.providerID);
        setAddressID(specs.addressID)

        setProviderName(user.firstName + " " + user.lastName);
        if (user.providerDp)
          setProviderDP({uri : getImageURL(user.providerDp)});
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })(); 
  }, []);

  const onUpdate = async() => {
    navigation.navigate('FinalSpecs', { typeName, icon, specsID, bookingID, serviceID, providerID, addressID })
  }

  const onConfirm = async() => {
    try {
      await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:1, referencedID:address, specsTimeStamp:Date.now() });
      await BookingServices.patchBooking(bookingID, { bookingStatus:4 });
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const onDecline = async() => {
    Alert.alert('Decline the Provider', 'Are you sure you want to decline this service provider? If you declined, we will search another service provider for you.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'OK', 
        onPress: () => onConfirm(),
      }
    ]);
  }

  if (loading) return <View style={{flex:1}}><Loading/></View>
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Back navigation={navigation}/>
      <Header service={typeName} icon={icon} phase={2} compressed={true}/>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.profileIcon} source={providerDP} />
            <Text style={styles.names}>{providerName}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => onDecline()}>
            <MaterialCommunityIcons name={'close-box'} color={'#9C54D5'} size={24} style={{marginRight:8}}/>
          </TouchableWithoutFeedback>
        </View>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4}}/>
        <ScrollView style={{flex:1}}>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:'60%'}}>
            <TouchableWithoutFeedback onPress= {() => onUpdate()}>
              <Text style={{fontFamily: 'lexend', fontSize: 15, textTransform:'uppercase'}}>Chat!</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.footer}>
          <View style={styles.message}> 
            <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
              placeholder='Text Message'/>
            <MaterialCommunityIcons name={'send'} color={'#9C54D5'} size={24}/>
          </View>
        </View>
      </View> 
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15,
    marginLeft: 10
  },
  names: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },

  footer: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    height: 50,
    width: '85%',
    // placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  }
});