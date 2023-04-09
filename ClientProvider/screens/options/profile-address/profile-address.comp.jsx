import { View, Text, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView from 'react-native-maps';

import AddAddress from '../../../components/addAddress';
import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './profile-address.style';
import hook from './profile-address.hook';

export default function Address({ navigation, route }) {
  const {
    addressID, processing, region,  userID, userFullName, userNum, open, isKeyboardVisible, 
    setOpen, fromChild, regionChange,
  } = hook( navigation, route );

  if (processing) return <Loading/>

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>   
      <View style={{width: '100%', paddingLeft: 30, marginBottom: 10}}>
        <Text numberOfLines={2} style={styles.address}><Text style={{fontFamily:'quicksand-medium', color: '#9C54D5'}}>Detected Address: </Text>{region.location}</Text>
      </View>

      <View style={{flex:1, width:'100%'}}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:15, zIndex:5}}/>
          <MapView style={{flex:1, marginVertical:-14}} initialRegion={region} onRegionChangeComplete={(data) => regionChange(data)}/>
            <View style={{top:'50%',left:'50%',position:'absolute',marginTop:-25,marginLeft:-18.5}}>
            <Image style={{height:50,width:37}} source={require("../../../assets/pin.png")} />
          </View>
        <LinearGradient colors={['rgba(255,255,255,0.9)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:15, zIndex:5}}/>
      </View>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <AddAddress raw={region.raw} userID={userID} userFullName={userFullName} userNum={userNum} fromChild={fromChild}
              latitude={region.latitude} longitude={region.longitude} navigation={navigation} addressID={addressID} />
            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>
      
      <View style={{alignItems:'center', width:'100%'}}>

        <View style={{width:'80%'}}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.next}>Update the Detected Address</Text>
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
