import { View, Text, Image, ScrollView, TouchableWithoutFeedback, TextInput, Modal, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import MapView, {Marker} from 'react-native-maps';

import { addressHandler } from '../../../utils/addressHandler';
import Loading from '../../../hooks/loading';

import styles from './booking-specs.style';
import hook from './booking-specs.hook';

export default function Specs({navigation, route}) {
  const {
    latitude, longitude, typeName, location, loading, open, description, lines, cost, region, spin, 
    setDescription, setLines, setCost, onSubmit,
  } = hook ( navigation, route );

  return (
    <View style={styles.container}>
      { loading && <Loading/> }
      <View style={{alignItems:'center'}}>
        <Text style={styles.header}>{typeName}</Text>
      </View>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <View style={styles.waiting}>
              <Animated.View style={{transform:[{rotate:spin}]}}>
                <MaterialCommunityIcons name={'loading'} size={60} color={'#9C54D5'}/>
              </Animated.View>
              <Text style={styles.subheading}>Waiting for the Customer to Agree with the Service Cost and Details submitted.</Text>
            </View>

            {/* <TouchableWithoutFeedback onPress={() => onCancel()}>
              <Text style={styles.enter}>CANCEL</Text>
            </TouchableWithoutFeedback> */}

          </View>
        </View>
      </Modal>
      

      <View style={{width:'100%', height: '75%'}}>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5, marginTop:10}}/>
        <ScrollView style={{marginVertical:-4}}>
        
          <View style={{width:'100%', height: 270, }}>
            <MapView style={{flex:1}} initialRegion={region}>
              <Marker coordinate={{latitude, longitude}}>
                <Image style={{height:44,width:32.3}} source={require("../../../assets/pin.png")}/>
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