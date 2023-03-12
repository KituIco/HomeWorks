import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { LinearGradient, } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import MapView, {Marker} from 'react-native-maps';
import ImageViewer from 'react-native-image-zoom-viewer';
import { Modal } from 'react-native';


import BookingServices from '../../services/booking/booking-services';
import { addressHandler } from '../../utils/addressHandler';
import { getImageURL } from '../../utils/getImageURL';
import Loading from '../../hooks/loading';
import { useState } from 'react';

export default function Details({route, navigation}) {
  const { seekerID, serviceID, specsID, minServiceCost} = route.params.data;
  const { typeName, location, specsDesc, images, latitude, longitude} = route.params.data;
  let bookingStatus = 0, dateTimestamp = Date.now();

  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false)
  let urls = JSON.parse(images); 
  

  let viewer = [];
  if(urls[0]) viewer.push({url : getImageURL(urls[0])});
  if(urls[1]) viewer.push({url : getImageURL(urls[1])});
  if(urls[2]) viewer.push({url : getImageURL(urls[2])});
  if(urls[3]) viewer.push({url : getImageURL(urls[3])});

  let region = {
    latitude, latitudeDelta: 0.0090,
    longitude, longitudeDelta: 0.0080,
  };

  const onSettle = () => {
    setLoading(true);
    BookingServices.createBooking({
      seekerID, serviceID, specsID, bookingStatus, dateTimestamp
    }).then((res) => {
      let {bookingID} = res.body;
      navigation.navigate('Chat', {bookingID, latitude, longitude, location, typeName})
      setLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      {loading && <Loading/> }
      <View style={{alignItems:'center', marginTop:60, marginBottom:10}}>
        <Text style={styles.header}>{typeName}</Text>
        <Text style={[styles.content,{marginBottom:0}]}>scroll down to see more info</Text>
      </View>
      

      <View style={{width:'100%', height: '68%'}}>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5, marginTop:10}}/>
        <ScrollView style={{marginTop:-4, marginBottom:-4}}>
          
          <View style={{width:'100%', height: 350, }}>
            <MapView style={{flex:1}} initialRegion={region}>
              <Marker coordinate={{latitude, longitude}}>
                <Image style={{height:44,width:32.3}} source={require("../../assets/pin.png")}/>
              </Marker>
            </MapView>
          </View>
          

          <Text style={styles.address}>{addressHandler(location)}</Text>

          <Text style={styles.heading}>Minimum Service Cost</Text>
          <View style={styles.details}>
            <Text style={styles.content}>{typeName} Service</Text>
            <Text style={styles.content}>Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {minServiceCost}</Text></Text>
          </View>

          <Text style={styles.heading}>Service Specs</Text>
          <Text style={styles.content}>{specsDesc}</Text>

          { viewer &&
          <View  style={{width:'90%', alignSelf:'center', marginTop: 30}}>
            <TouchableWithoutFeedback onPress={() => setOpen(true)}>
              <View style={[styles.button, {borderWidth:1, borderColor: '#606060', height:32,}]}>
                <Text style={[styles.next, {color: '#606060', fontSize:14}]}>Click here to see Specs Images</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          }

          <Modal visible={open} transparent={true}>
            <TouchableWithoutFeedback onPress={() => setOpen(false)}>
              <View style={styles.close}>
                <MaterialCommunityIcons name={'close-box'} size={24} color={'#000'}/>
              </View>
            </TouchableWithoutFeedback>
            <ImageViewer imageUrls={viewer}/>
          </Modal>

         
          <View style={{height:30, width:'100%'}}/>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>
      </View>
      
      <View style={{marginBottom:20,  width:'80%', alignItems:'center', marginTop:20}}>
        <TouchableWithoutFeedback onPress={() => onSettle()}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <Text style={styles.next}>Settle Request via Chat</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={[styles.button, {borderWidth:1, borderColor: '#606060', height:32}]}>
            <Text style={[styles.next, {color: '#606060', fontSize:14}]}>Go Back to Requests Page</Text>
          </View>
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
  },

  shadow: {
    borderRadius: 10,
    height: 32,
    width:'100%',
    marginBottom: 10,
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

  image: {
    borderRadius: 4, 
    marginBottom: 10,
    aspectRatio: 1,
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
    color: '#000',
    letterSpacing: -0.8,
    marginTop: 12,
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
  },

 
  close: {
    zIndex: 5,
    position: 'absolute',
    width: 30,
    height: 30, 
    borderRadius: 15,
    backgroundColor: '#9C54D5',
    right: 20,
    top: 20,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }

});