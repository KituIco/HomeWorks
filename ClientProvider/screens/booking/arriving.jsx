import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, {Marker} from 'react-native-maps';
import { useEffect, useState } from 'react';

import TransactionReportServices from '../../services/transaction/transaction-reports-services';
import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import { addressHandler } from '../../utils/addressHandler';
import Loading from '../../hooks/loading';
import Back from '../../hooks/back';

export default function Arriving({ navigation, route }) {
  const { latitude, longitude, location, specsID } = route.params.data;
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [reportID, setReportID] = useState();
  let region = {
    latitude, latitudeDelta: 0.0080,
    longitude, longitudeDelta: 0.0120,
  };

  useEffect(() => {
    ( async()=> {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(specsID);
        setReportID(specs.referencedID);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  },[])

  const onArrive = async() => {
    setProcessing(true);
    try {
      await TransactionReportServices.patchTransactionReport(reportID, {transactionStat:2})
      navigation.navigate('Serving');
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setProcessing(false);
  }
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      { processing && <Loading/> }
      <Back navigation={navigation}/>   
      <View style={{width: '100%', marginTop:50}}>
        <Text style={styles.address}><Text style={{fontFamily:'quicksand-medium', color: '#9C54D5'}}>Destination: </Text>{addressHandler(location)}</Text>
      </View>

      <View style={{flex:1, width:'100%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:15, zIndex:5}}/>
          <MapView style={{flex:1, marginVertical:-14}} initialRegion={region}>
            <Marker coordinate={{latitude, longitude}}>
              <Image style={{height:44,width:32.3}} source={require("../../assets/pin.png")}/>
            </Marker>
          </MapView>
        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:15, zIndex:5}}/>
      </View>
     
      <View style={{alignItems:'center', width:'100%'}}>
        <View style={{width:'80%'}}>
        <TouchableWithoutFeedback onPress={() => onArrive()}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.next}>Press button if you have Arrived</Text>
              </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        </View>
      </View>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(233,233,233,1)' ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={{width:'100%', height:14, zIndex:5}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
    paddingVertical: 20,
  },

  shadow: {
    borderRadius: 10,
    height: 40,
    width:'100%',
    marginTop: 20,
    marginBottom: 4,
  },
  button: {
    height: 40,
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },

  image: {
    height: 700,
    width: '250%',
    alignSelf:'center',
    opacity: 0.8,
  },

  address: {
    fontFamily: 'quicksand',
    width: '75%',
    fontSize: 12,
    color: '#888486',
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

  waiting: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 54,
    textAlign: 'center',
    marginTop: 20,
  },
});