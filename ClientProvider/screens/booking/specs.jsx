import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback,TextInput } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MapView, {Marker} from 'react-native-maps';
import { useState } from 'react';

import BookingServices from '../../services/booking/booking-services';
import { addressHandler } from '../../utils/addressHandler';
import Loading from '../../hooks/loading';

export default function Specs({navigation, route}) {
  const { latitude, longitude, typeName, location, bookingID } = route.params.data;
  const [loading, setLoading] = useState(false);
  let region = {
    latitude, latitudeDelta: 0.0070,
    longitude, longitudeDelta: 0.0080,
  };
  
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [lines, setLines] = useState(4);

  const onSubmit = () => {
    setLoading(true);
    BookingServices.patchBooking(bookingID, { 
      cost: parseFloat(cost).toFixed(2), description
    }).then(() => {
      navigation.navigate('Arriving', {typeName, cost, bookingID})
      setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      {loading && <Loading/> }
      <View style={{alignItems:'center'}}>
        <Text style={styles.header}>{typeName}</Text>
      </View>
      

      <View style={{width:'100%', height: '68%'}}>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5, marginTop:10}}/>
        <ScrollView style={{marginVertical:-4}}>
        
          <View style={{width:'100%', height: 270, }}>
            <MapView style={{flex:1}} initialRegion={region}>
              <Marker coordinate={{latitude, longitude}}>
                <Image style={{height:44,width:32.3}} source={require("../../assets/pin.png")}/>
              </Marker>
            </MapView>
          </View>
          <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5, marginTop:-4}}/>

          <Text style={styles.address}>{addressHandler(location)}</Text>
          

          <Text style={styles.heading}>Service Cost</Text>
          <TextInput onChangeText={text => setCost(text)} value={cost} style={[styles.text,{marginBottom:4, height:40}]}
            placeholder='Enter Service Cost (ie. 420.00)'/>

          <Text style={styles.heading}>Service Specs</Text>
          <TextInput multiline numberOfLines={lines} onChangeText={text => setDescription(text)} value={description} style={styles.text}
            onContentSizeChange={(e) => {if(e.nativeEvent.contentSize.height/18>lines) setLines(lines+1)}} placeholder='Enter Service Details'/>
          
        </ScrollView>
        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0.5)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>
      </View>
      
      <View style={{marginBottom:28, marginTop:16, width:'80%', alignItems:'center'}}>
        <TouchableWithoutFeedback onPress={() => onSubmit()}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.next}>Submit Service Cost and Specs</Text>
            </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: 'lexend',
    color: '#9C54D5',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
    marginTop: 70,
  },

  shadow: {
    borderRadius: 10,
    height: 34,
    width:'100%',
  },
  button: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
  },
  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },
  ledge: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  image: {
    height: 250,
    width: '250%',
    alignSelf:'center',
    marginTop: -4
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    fontFamily: 'quicksand',
    width: '75%',
    fontSize: 12,
    color: '#888486',
    marginVertical: 6,
    marginHorizontal: 20
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 6,
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 24,
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
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
    marginBottom: 16,
    fontSize: 14,
  },

});