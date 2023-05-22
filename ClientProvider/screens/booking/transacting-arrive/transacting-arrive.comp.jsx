import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, {Marker} from 'react-native-maps';

import { addressHandler } from '../../../utils/address-handler';
import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './transacting-arrive.style';
import hook from './transacting-arrive.hook';

export default function TransactingArrive({ navigation, route }) {
  const {
    latitude, longitude, location, region,
    processing, loading, onArrive,
  } = hook( navigation, route );
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      { processing && <Loading/> }
      <Back navigation={navigation}/>
      
      <View style={{width: '100%', marginTop:50}}>
        <Text style={styles.address}>
          <Text style={{fontFamily:'quicksand-medium', color: '#9C54D5'}}>Destination: </Text>
          {addressHandler(location)}
        </Text>
      </View>

      <View style={{flex:1, width:'100%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:0 }} 
          end={{ x:0, y:1 }} style={{height:15, zIndex:5}}/>

          <MapView style={{flex:1, marginVertical:-14}} initialRegion={region}>
            <Marker coordinate={{latitude, longitude}}>
              <Image style={{height:44,width:32.3}} source={require("../../../assets/pin.png")}/>
            </Marker>
          </MapView>

        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0)']} start={{ x:0, y:1 }} 
          end={{ x:0, y:0 }} style={{height:15, zIndex:5}}/>
      </View>
     
      <View style={{alignItems:'center', width:'100%'}}>
        <View style={{width:'80%'}}>

        <TouchableWithoutFeedback onPress={() => onArrive()}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} 
            end={{ x:0, y:0.98 }} style={styles.shadow}>

            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} 
              end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} 
                end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.next}>Press this Button if you Arrived</Text>
              </LinearGradient>
            </LinearGradient>

          </LinearGradient>
        </TouchableWithoutFeedback>

        </View>
      </View>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(233,233,233,1)' ]} start={{ x:0, y:0.5 }} 
        end={{ x:0, y:1 }} style={{width:'100%', height:14, zIndex:5}}/>
    </View>
  );
}
