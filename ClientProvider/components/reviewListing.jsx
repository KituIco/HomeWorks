import { StyleSheet, View, Text, TouchableWithoutFeedback,Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import ServiceSpecsServices from '../services/service-specs/service-specs-services';
import AddressServices from '../services/address/address-services';

export default function Listing( props ) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    ( async() => {  
      try {
        setServices(props.listings)
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [props]);

  const navigateTo = async(data) => {
    try {
      props.fromChild();
      let { body: specs } = await ServiceSpecsServices.getSpecsByID(data.specsID);
      let { body: location } = await AddressServices.getAddressByID(specs.addressID);
      let { specsID, typeName, bookingID } = data;

      let latitude = location.latitude;
      let longitude = location.longitude;
      
      props.navigation.goBack();
      if(data.bookingStatus == 1 || data.bookingStatus == 2) {
        props.navigation.navigate('BookingChat', { specsID, bookingID, latitude, longitude, location, typeName });
      }

      if(data.bookingStatus == 3) {
        let reportID = data.reportID
        if(data.status == 'Arriving')
          props.navigation.navigate('TransactingArrive', { data: {specsID, bookingID, latitude, longitude, location, typeName} });
        if(data.status == 'Serving')
          props.navigation.navigate('TransactingServe', { reportID, specsID, location } );
        if(data.status == 'Complete')
          props.navigation.navigate('TransactionDone', { reportID } );
      }
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    props.fromChild();
  }
  
  const servicesList = data => {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)']} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={data.shadow} key={data.bookingID}>
        
        <View style={data.box}>

          <View style={styles.content}>
            <MaterialCommunityIcons name={data.icon} size={60}/>
            <View style={styles.texts}>
              <View style={styles.top}>
                <Text numberOfLines={1} style={styles.service}>{data.typeName}</Text>
                <View style={{marginTop: -6}}>
                  <Text style={styles.time}>{data.date}</Text>
                  <Text style={[styles.status,data.color]}>{data.status}</Text>
                </View>
                
              </View>
              <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'>{data.description}</Text>
            </View>
          </View>

          { !data.cancelled  &&
            <TouchableWithoutFeedback onPress={() => navigateTo(data)}>
              <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
                <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                  <Text style={styles.touchable}>{data.button}</Text>
                </LinearGradient>
              </LinearGradient> 
            </TouchableWithoutFeedback>
          }
          

        </View>

      </LinearGradient>
    );
  };

  return (
    <View style={{marginVertical:16}}>
    {/* {services.map((value, index) => {
      return servicesList(value);
    })} */}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  texts: {
    marginLeft: 10,
    flex: 1
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  service: {
    fontFamily: 'notosans',
    fontSize: 19,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  time: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 10,
    alignSelf:'flex-end'
  },
  address: {
    fontFamily: 'quicksand',
    fontSize: 10,
    color: '#323941',
    marginTop: 4,
    lineHeight: 12,
  },

  button: {
    height: 40,
    marginTop: 14,
    borderRadius: 10,
  },
  ledge: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  },
  status: {
    fontFamily: 'quicksand', 
    letterSpacing: -0.5, 
    alignSelf:'flex-end', 
    fontSize:13, 
    marginTop:-2
  },
});