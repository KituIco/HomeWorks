import { View, Text, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/serviceListing';
import AddService from '../../../components/addService';
import Loading from '../../../hooks/loading';

import styles from './service-list.style';
import hook from './service-list.hook';

export default function Services({ navigation }) {
  const {
    userID, loading, open,  services, noService, isKeyboardVisible, 
    setOpen, fromChild, onClose,
  } = hook();

  if (loading)
    return <Loading/>
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Services</Text>
      </View>

      <View style={styles.circle}/>
      <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
        <View style={styles.add}>
          <MaterialCommunityIcons name={'book-plus'} size={44} color="#FFF" style={{paddingRight:2}}/>
        </View>
      </TouchableWithoutFeedback>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>
          
            <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:0 }} 
              end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:20}}/>        
              <AddService listings={services} providerID={userID} navigation={navigation} fromChild={fromChild}/>
            <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:1 }} 
              end={{ x:0, y:0 }} style={{height:11, zIndex:5, marginBottom:20}}/>

            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => onClose()}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }
          </View>
        </View>
      </Modal>

      { noService && <Text style={styles.instructions}>You may add a Service by clicking the Add Button on the Lower Right of the Screen</Text> }

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:0 }} 
        end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
      <ScrollView style={{marginVertical:-10}}>
        
      <Listing listings={services} navigation={navigation}/>

      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:1 }} 
        end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      <View style={{height:40}}/>
    </View>
  );
}
