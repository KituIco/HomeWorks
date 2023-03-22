import { StyleSheet, View, Text, TextInput, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { addressHandler } from '../utils/addressHandler';
import { LinearGradient, } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import AddressService from '../services/address/address-services';
import Loading from '../hooks/loading';


export default function AddAddress( props ) {
  const [city,setCity] = useState(props.raw.city);
  const [district,setDistrict] = useState(props.raw.district);
  const [isoCountryCode,setIsoCountryCode] = useState(props.raw.isoCountryCode);
  const [name,setName] = useState(props.raw.name);

  const [postalCode,setPostalCode] = useState(props.raw.postalCode);
  const [region,setRegion] = useState(props.raw.region);
  const [street,setStreet] = useState(props.raw.street);
  const [streetNumber,setStreetNumber] = useState(props.raw.streetNumber);

  const [address, setAddress] = useState(addressHandler(props.raw));
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const {userID, userFullName, userNum, latitude, longitude} = props;
  let isDefault = 1;
  let addressID = props.addressID;
  
  useEffect(() => {
    setAddress(addressHandler({
      city, district, postalCode, region,
      street, streetNumber, name, isoCountryCode
    }))
  }, []);

  useEffect(() => {
    if(done){
      setTimeout(() => {
        if(!addressID) props.navigation.replace('HomeStack');
        else {
          props.navigation.replace('HomeStack');
          props.navigation.navigate('HomeStack', { screen:'OptionsStack', 
            params: { screen: 'Profile', initial:false} });
        }
      }, 1000)
    }
  }, [done]);

  const onSet = (value,field) => {
    if(field == 'name') { 
      setName(value);
      setStreetNumber('');
    }
    if(field == 'num') { 
      setStreetNumber(value);
      setName('');
    }
  }

  const onAdd = async() => {
    setLoading(true);
    try {
      if (addressID){
        await AddressService.patchAddress(addressID, {
          userFullName, userNum, latitude, longitude, city, district,
          postalCode, region, street, streetNumber, name, isoCountryCode, isDefault
        });
      } else {
        await AddressService.createAddress({
          userID, userFullName, userNum, latitude, longitude, city, district,
          postalCode, region, street, streetNumber, name, isoCountryCode, isDefault
        });
      }
      props.fromChild();
      setDone(true);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    } 
    setLoading(false);
  }

  if(done) 
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text style={[styles.address, {fontSize:24, marginTop:-20}]}>Address Added</Text>
        <Text style={[styles.desc, {marginBottom:20, marginTop:-6}]}>This form will be closed.</Text>
        <MaterialCommunityIcons name={'progress-check'} size={160} color={'#9C54D5'}/>
      </View>
    )
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      <Text numberOfLines={2} style={styles.location}><Text style={{fontFamily:'quicksand-medium', color: '#9C54D5'}}>Address: </Text>{address}</Text>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:10}}/>        
      <ScrollView style={{marginVertical:-10, paddingHorizontal: 22}}>
        <Text style={styles.address}>Address</Text>
        <Text style={styles.desc}>The following address fields were obtained via geolocation services. 
          If there are incorrect address fields, please update them. Not applicable fields may be left blank.</Text>
          
        <Text style={styles.header}>Building Name</Text>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={text => onSet(text,'name')} value={name} placeholder="Building Name"/>
        </View>

        <Text style={styles.header}>Street Number</Text>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={text => onSet(text,'num')} value={streetNumber} placeholder="Street Number"/>
        </View>

        <Text style={styles.header}>Street</Text>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setStreet} value={street} placeholder="Street"/>
        </View>

        <Text style={styles.header}>District or Barangay</Text>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setDistrict} value={district} placeholder="District"/>
        </View>

        <Text style={styles.header}>City</Text>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setCity} value={city} placeholder="City"/>
        </View>

        <Text style={styles.header}>Postal Code</Text>
        <View style={styles.textbox}>
          <TextInput style={styles.input} onChangeText={setPostalCode} value={postalCode} placeholder="Postal Code"/>
        </View>

        <Text style={styles.header}>Region</Text>
        <View style={[styles.textbox, {marginBottom:10}]}>
          <TextInput style={styles.input} onChangeText={setRegion} value={region} placeholder="Region"/>
        </View>
        
        <TouchableWithoutFeedback onPress={() => onAdd()}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.details}>Add this Address</Text>
            </LinearGradient>
          </LinearGradient> 
        </TouchableWithoutFeedback>
      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:11, zIndex:5, marginBottom:10}}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    height: '90%',
  },
  address: {
    fontFamily: 'notosans',
    fontSize: 24,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  desc: {
    fontFamily: 'quicksand',
    fontSize: 13,
    letterSpacing: -0.5,
    color: '#323941',
    textAlign:'justify',
  },

  textbox: {
    height: 52,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    padding: 10,
    marginTop: -2,
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5,
    maxWidth: 280,
  },

  header: {
    fontFamily: 'notosans',
    fontSize: 14,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    marginTop: 10,
    color: '#303030'
  },
  location: {
    fontFamily: 'quicksand',
    width: '85%',
    fontSize: 12,
    color: '#888486',
    height: 34,
    marginTop: 20
  },

  button: {
    height: 40,
    marginVertical: 12,
    borderRadius: 8,
    justifyContent: 'center'
  },
  ledge: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 16,
  },
});