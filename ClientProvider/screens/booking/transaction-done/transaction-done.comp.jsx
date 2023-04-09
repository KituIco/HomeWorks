import { View, Text, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './transaction.done.style';
import hook from './transaction-done.hook';


export default function Done({ navigation, route }) {
  const {
    open, loading, address, type, cost, desc,
    setOpen, onDone,
  } = hook( navigation, route );

  if(loading) return <View style={{flex:1}}><Loading/></View>

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>  
      <Text style={styles.heading}>Well Done, Provider!</Text>

      
      <View>
        <Text style={styles.subheading}>You successfully completed this service. You may go back to requests page.</Text>
        <TouchableWithoutFeedback onPress= {() => onDone()}>          
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
          <View style={styles.border}>
              <LinearGradient colors={['#338B93', '#247E44']} start={{ x:0.5, y:0 }} end={{ x:-0.3, y:0.8 }} style={styles.button}>
                <Text style={styles.ready}>Return</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

      <Text style={styles.footer}>Service Cost</Text>
      <View style={styles.details}>
        <Text style={styles.content}>{type} Service</Text>
        <Text style={[styles.content,{fontFamily:'quicksand-bold'}]}>Php {cost}</Text>
      </View>

      <View  style={{width:'90%', alignSelf:'center', marginTop: 30}}>
        <TouchableWithoutFeedback onPress={() => setOpen(true)}>
        <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow2}>
          <View style={styles.button2}>
            <Text style={[styles.next2, {color: '#606060', fontSize:14}]}>Click here to see Service Details</Text>
          </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>

      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <View style={styles.description}>
              <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:11, zIndex:5, marginTop:10}}/>
                <ScrollView style={{marginVertical:-10, paddingHorizontal: 22}}>

                  <Text style={styles.head}>Service Details</Text>
                  <Text style={styles.desc}>Shown below are the service cost, the service description, and the location.</Text>

                  <Text style={styles.subhead}>Service Cost</Text>
                  <View style={styles.details}>
                    <Text style={styles.desc}>{type} Service</Text>
                    <Text style={[styles.desc,{fontFamily:'quicksand-bold'}]}>Php {cost}</Text>
                  </View>

                  <Text style={styles.subhead}>Service Description</Text>
                  <Text style={styles.desc}>{desc}</Text>

                  <Text style={styles.subhead}>Service Location</Text>
                  <Text style={[styles.desc, {marginBottom: 20}]}>{address}</Text>


                </ScrollView> 
              <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:11, zIndex:5, marginBottom:10}}/>
            </View>
            
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>

          </View>
        </View>
      </Modal>

    </View>
  );
}