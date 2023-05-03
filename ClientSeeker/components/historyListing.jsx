import { StyleSheet, View, ScrollView, Image, Text, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import ImageViewer from 'react-native-image-zoom-viewer';
import MapView, {Marker} from 'react-native-maps';

import ServiceTypesServices from '../services/service-types/service-types-services';
import ServiceSpecsServices from '../services/service-specs/service-specs-services';
import AddressServices from '../services/address/address-services';

import { addressHandler } from '../utils/address-handler';
import { removeRequest } from '../utils/remove-request';
export default function Listing( props ) {
  // let services = props.listings;
  const [services, setServices] = useState([]);
  const [openSpecs, setOpenSpecs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState()

  const [region, setRegion] = useState();
  const [location, setLocation] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

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
    if(data.specsStatus == 4 || data.specsStatus == 1) {
      setOpenSpecs(true);
      let { body } = await AddressServices.getAddressByID(data.addressID);
      let serviceTypes = await ServiceTypesServices.getServiceTypes();

      for (let i=0; i<serviceTypes.body.length; i++) {
        if (serviceTypes.body[i].typeName == data.typeName) {
          setPrice(serviceTypes.body[i].minServiceCost);
        }
      }

      setLatitude(body.latitude);
      setLongitude(body.longitude);

      setLocation(addressHandler(body));
      setRegion({
        latitude: body.latitude, latitudeDelta: 0.0060,
        longitude: body.longitude, longitudeDelta: 0.0040,
      });
      setLoading(false);
    }
  }

  const closeSpecs = async() => {
    setOpenSpecs(false);
    setLoading(true);
  }

  const confirmDelete = async(specsID) => {
    try {
      await ServiceSpecsServices.deleteServiceSpecs(specsID);
      let newServices = await removeRequest(specsID, services);

      setServices(newServices);
      setOpenSpecs(false);
      setLoading(true);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }
  
  const deleteSpecs = async(data) => {
    try {
      Alert.alert('Delete this Request', 'Are you sure you want to this request? Upon deletion of the request, this request will no longer appear in you history.', [
        { text: 'Cancel', },
        { text: 'OK',  onPress: () => confirmDelete(data.specsID)}
      ]);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    } 
  }

  const servicesList = data => {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)']} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={data.specsID}>
        { openSpecs && <View style={styles.overlay}/> }
        <Modal visible={openSpecs} transparent={true}>
          <View style={styles.centered}>
            <View style={styles.modal}>

              <TouchableWithoutFeedback onPress = {() => deleteSpecs(data)}>
                <View style={{width:40, height: 40, borderRadius:40, backgroundColor:'#9C54D5', position:'absolute', zIndex:20, right:10, top:10, alignItems:'center', justifyContent:'center'}}>
                  <MaterialCommunityIcons name={'trash-can'} size={24} color={'#F4F4F4'}/>
                </View>
              </TouchableWithoutFeedback>
              

              <View style={{height:'90%'}}>
                { !loading &&
                <ScrollView style={{margin:-9}}>
                  <View style={{width:'100%', height: 200}}>
                    <MapView style={{flex:1}} initialRegion={region}>
                      <Marker coordinate={{latitude, longitude}}>
                        <Image style={{height:44,width:32.3}} source={require("../assets/pin.png")}/>
                      </Marker>
                    </MapView>
                  </View>

                  <View style={{height:130, width:130, backgroundColor:'#F4F4F4', borderRadius:120, marginTop:-60, alignItems:'center', justifyContent:'center', zIndex:15}}>
                    <MaterialCommunityIcons name={data.icon} size={90} color={'#9C54D5'}/>
                  </View>
                  <View style={{height:60, width:'95%', marginTop:-50, marginRight:20, alignItems:'flex-end'}}>
                    <Text style={styles.time}>{data.date}</Text>
                    <Text style={[styles.status,data.color]}>{data.status}</Text>
                  </View>
                  
                  <View style={{marginHorizontal:20, marginTop:-20, zIndex:15}}>
                    
                    <Text style={styles.head}>{data.typeName}</Text>
                    <Text style={styles.desc}>Shown below are the service description, the location, and the minimum service cost of your request. </Text>
                    <Text style={styles.desc}>To resend this request, please scroll down and click the resend button below</Text>

                    <Text style={styles.subhead}>Service Description</Text>
                    <Text style={styles.desc}>{data.specsDesc}</Text>

                    <Text style={styles.subhead}>Service Location</Text>
                    <Text style={[styles.desc]}>{location}</Text>

                    <Text style={styles.subhead}>Minimum Service Cost</Text>
                    <View style={styles.details}>
                      <Text style={styles.desc}>{data.typeName} Service</Text>
                      <Text style={[styles.desc,{fontFamily:'quicksand-bold'}]}>Php {price}</Text>
                    </View>

                  </View>
                  
                </ScrollView>
                }

              </View>

              <TouchableWithoutFeedback onPress= {() => closeSpecs()}>
                <Text style={styles.enter}>CLOSE</Text>
              </TouchableWithoutFeedback>

            </View>
          </View>
        </Modal>

        <View style={styles.box}>

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
              <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'>{data.specsDesc}</Text>
            </View>
          </View>


          <TouchableWithoutFeedback onPress={() => navigateTo(data)}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.touchable}>{data.button}</Text>
              </LinearGradient>
            </LinearGradient> 
          </TouchableWithoutFeedback>

        </View>

      </LinearGradient>
    );
  };

  return (
    <View style={{marginVertical:16}}>
    {services.map((value, index) => {
      return servicesList(value);
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 160,
    marginVertical: 10,
  },
  box: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

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

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
    width: '90%',
    padding: 10,
    height: '75%'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginTop: 30,
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

  typename: {
    fontFamily: 'notosans-light',
    fontSize: 30,
    letterSpacing: -1,
    fontVariant: ['small-caps'],
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
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});