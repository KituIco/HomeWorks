import { View, Text, Image, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapView, {Marker} from 'react-native-maps';
import { Modal } from 'react-native';

import { addressHandler } from '../../../utils/addressHandler';
import Loading from '../../../hooks/loading';
import styles from './request-specs.style';
import hook from './request-specs.hook';


export default function RequestSpecs({route, navigation}) {
  const {
    minServiceCost, typeName, specsDesc, location, latitude, longitude, region, 
    open, loading, noImage, viewer, setOpen, onSettle,
  } = hook( route, navigation )

  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      {loading && <Loading/> }
      <View style={{alignItems:'center', marginTop:60, marginBottom:-16}}>
        <Text style={styles.header}>{typeName}</Text>
        <Text style={[styles.content,{marginBottom:0}]}>scroll down to see more info</Text>
      </View>
      

      <View style={{width:'100%', height: '70%'}}>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4, zIndex:5, marginTop:10}}/>
        <ScrollView style={{marginTop:-4, marginBottom:-4}}>
          
          <View style={{width:'100%', height: 350, }}>
            <MapView style={{flex:1}} initialRegion={region}>
              <Marker coordinate={{latitude, longitude}}>
                <Image style={{height:44,width:32.3}} source={require("../../../assets/pin.png")}/>
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

          { !noImage &&
          <View  style={{width:'90%', alignSelf:'center', marginTop: 30}}>
            <TouchableWithoutFeedback onPress={() => setOpen(true)}>
            <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
              <View style={[styles.button, {borderWidth:1, borderColor: '#9C54D5', height:34,}]}>
                <Text style={[styles.next, {color: '#606060', fontSize:14}]}>Click here to see Specs Images</Text>
              </View>
              </LinearGradient>
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

         
          <View style={{height:20, width:'100%'}}/>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4, zIndex:5}}/>
      </View>
      
      <View style={{marginBottom:16,  width:'80%', alignItems:'center', marginTop:0}}>
        <TouchableWithoutFeedback onPress={() => onSettle()}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={[styles.shadow, {height:46}]}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={[styles.button, {height:46}]}>
              <Text style={styles.next}>Settle Request via Chat</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

    </View>
  );
}