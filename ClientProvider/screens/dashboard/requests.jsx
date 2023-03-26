import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, Alert, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState, useEffect, useCallback } from 'react';
import { LinearGradient, } from 'expo-linear-gradient';

import Back from '../../hooks/back';
import Loading from '../../hooks/loading';
import { getUserID } from '../../utils/getUserID';
import Listing from '../../components/requestListing';
import { requestHelper } from '../../utils/requestHelper';
import { processRequest } from '../../utils/processRequest';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import ServiceTypesServices from '../../services/service-types/service-types-services';
import ServiceServices from '../../services/service/service-services';
import socketService from '../../services/sockets/sockets-services';

export default function Requests({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [types, setTypes] = useState();
  const [serving, setServing] = useState();

  const getRequests = async() => {
    let userID = await getUserID();
    let allService = await ServiceSpecsServices.getAllServiceSpecs();
    let serviceTypes = await ServiceTypesServices.getServiceTypes()

    let myServices = await ServiceServices.getProviderServices(userID);
    let service = await requestHelper(allService.body, myServices.body, serviceTypes.body);

    setTypes(serviceTypes.body);
    setServing(myServices.body);
    if(service.length > 0) {
      setServices(service);
      setWaiting(false);
    } else {
      setWaiting(true);
      setServices([])
    }
  }

  useEffect(() => {
    ( async() => {  
      try {
        getRequests();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    socketService.joinRoom('providers');
  }, []);

  useEffect(() => {
    if(!loading)
    ( async() => {
      try {
        let request = await socketService.receiveNewServiceSpec();
        let newReq = await processRequest(JSON.parse(request), serving, types); 
        if (newReq) {
          let newReqs = [newReq, ...services];
          setServices(newReqs);
          setWaiting(false);
        }
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [services]);

  const onRefresh = useCallback (() => {
    ( async() => {  
      setRefreshing(true);
      try {
       getRequests();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, []);

  if (loading)
    return <Loading/>

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>
      <Text style={styles.header}>Requests Page</Text>
      
      <View style={{width:'100%', height:'75%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
        <ScrollView style={{marginVertical:-10}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
          {
            !waiting && <Listing listings={services} navigation={navigation}/>
          }
          { waiting &&
          <View style={{alignItems: 'center', marginTop:'30%'}}>
            <Text style={styles.subheader}>Standby for Requests.</Text>
            <MaterialCommunityIcons name="home-search" size={150} color='#9C54D5' style={{marginTop: 20}}/>
            <Text style={styles.subcontent}>Currently waiting Service Requests. Please watch out for App Notifications.</Text>
          </View>
          }
        </ScrollView>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      </View>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Dashboard')}>
        <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
            <Text style={styles.content}>Stop Accepting Requests</Text>
          </LinearGradient>
        </LinearGradient>
      </TouchableWithoutFeedback>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
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
    height: 34,
    marginBottom: 40,
    marginTop: 10,
    width:'80%',
  },
  button: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
  },

  content: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },

  subheader: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
  },
  subcontent: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 60
  },
});