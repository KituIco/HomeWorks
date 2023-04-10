import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, {Marker} from 'react-native-maps';

import Header from '../../../components/transactheader';
import Loading from '../../../hooks/loading';

import styles from './booking-specs.style';
import hook from './booking-specs.hook';

export default function BookingSpecs({ route, navigation }) {
  const {
    typeName, icon, description, cost, loading, processing, location, longitude, latitude, region, 
    onDecline, onAccept,
  } = hook( navigation, route );
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      { processing && <Loading/> }
      <Header service={typeName} icon={icon} phase={2}/>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Cost and Address</Text>
        <View style={styles.details}>
          <Text style={styles.content}>{typeName} Service</Text>
          <Text style={[styles.content,{fontFamily: 'quicksand-bold', fontSize: 16}]}>{cost}</Text>
        </View>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5}}/>
        <View style={{width:'100%', height: 220, marginVertical:-4}}>
          <MapView style={{flex:1}} initialRegion={region}>
            <Marker coordinate={{ latitude, longitude}}>
              <Image style={{height:38.2,width:28}} source={require("../../../assets/pin.png")}/>
            </Marker>
          </MapView>
        </View>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>

        <View style={styles.address}>
          <Text style={styles.location}>{location}</Text>
        </View>
        
        <Text style={styles.heading}>Service Description</Text>
        <View style={[styles.details, {marginBottom:30}]}>
          <Text style={styles.content}>{description}</Text>
        </View>
      
      </ScrollView>


      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)']} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
			<View style={styles.footer}>

        <TouchableWithoutFeedback onPress= {() => onAccept()}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)']} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.accept}>
              <Text style={styles.prompt}>Accept Service Specs</Text>
            </LinearGradient>      
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => onDecline()}>
          <LinearGradient colors={['rgba(10,10,10,0.4)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <View style={styles.decline}>
              <Text style={[styles.prompt, {color:'#462964', fontSize: 14}]}>Decline and Chat Again</Text>
            </View>         
          </LinearGradient>
        </TouchableWithoutFeedback>
			</View>
		</LinearGradient>

    </View>
  );
}
