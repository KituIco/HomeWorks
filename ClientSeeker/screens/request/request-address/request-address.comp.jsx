import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView from 'react-native-maps';

import Listing from '../../../components/serviceListing';
import AddAddress from '../../../components/addAddress';
import Header from '../../../components/transactheader';
import Next from '../../../components/transactnext';
import Loading from '../../../hooks/loading';

import styles from './request-address.style';
import hook from './request-address.hook';

export default function RequestAddress({ route, navigation }) {
  const {
    typeName, icon, minServiceCost, processing, waiting, userFullName, userID, userNum, open, isKeyboardVisible, region, list,
    setOpen, regionChange, fromChild,
  } = hook( navigation, route );

  if (processing) return <Loading/>

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      {waiting && <Loading/>}
      <Header service={typeName} icon={icon} phase={1}/>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <AddAddress raw={region.raw} userID={userID} userFullName={userFullName} userNum={userNum} fromChild={fromChild}
              latitude={region.latitude} longitude={region.longitude} navigation={navigation} />
            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Detected Address</Text>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5}}/>
        <View style={{width:'100%', height: 260, marginVertical:-4}}>
          <MapView style={{flex:1}} initialRegion={region} onRegionChangeComplete={(data) => regionChange(data)}/>
          <View style={{top:'50%',left:'50%',position:'absolute',marginTop:-22,marginLeft:-16.15}}>
            <Image style={{height:44,width:32.3}} source={require("../../../assets/pin.png")} />
          </View>
        </View>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>

        <View style={styles.address}>
          <Text style={styles.location} numberOfLines={2}>{region.location}</Text>
          <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
            <MaterialCommunityIcons name={'pencil-outline'} size={30} color="#9C54D5"/>
          </TouchableWithoutFeedback>
        </View>


        <Text style={styles.heading}>Minimum Service Cost</Text>
        <View style={styles.details}>
          <Text style={styles.content}>{typeName} Service</Text>
          <Text style={styles.content}>Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {minServiceCost}</Text></Text>
        </View>
        <Text style={styles.subcontent}>
          Note: Price variation depends on the skill of service provider, the load of your request, the proximity from your location, etc. 
        </Text>

        <Text style={styles.heading}>Your Service Provider</Text>
        { !list &&
        <View style={[styles.details, {marginBottom:30}]}>
          <View style={{width: '80%',  marginTop: -2}}> 
            <Text style={styles.content}>We will grant you one of the best and the nearest service provider in your area!</Text>
            <View style={{flexDirection: 'row' }}>
              <Text  style={styles.content}>Want a specific service provider? </Text>
              <Text  style={[styles.content, {textDecorationLine: 'underline', fontFamily: 'quicksand-bold'}]}>Search</Text>
            </View>
          </View>
          <MaterialCommunityIcons name={'account-search-outline'} size={70} color="#9C54D5" style={{marginTop:-16}}/>
        </View>
        }
        { list &&
        <View style={{marginBottom:20}}>
          <Listing listings={list} solo={true} navigation={navigation}/>
        </View>
        }
        
      
      </ScrollView>

      <View style={styles.holder}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <View style={styles.ghost}/>
        </TouchableWithoutFeedback>
      </View>

      <Next title={'Request a Booking'}/>
    </View>
  );
}