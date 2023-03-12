import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, Animated, Easing, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import Header from '../../components/transactheader';
import Next from '../../components/transactnext';

import Loading from '../../hooks/loading';
import Back from '../../hooks/back';



export default function Matching({ route, navigation }) {
  const { addressID, location, minServiceCost, specsID, typeName, icon } = route.params;
  const [waiting,setWaiting] = useState(false)

  const spinValue = new Animated.Value(0);
  Animated.loop(
    Animated.timing(
      spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    )
    ).start();
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })
  
  const onConfirm = async() => {
    await ServiceSpecsServices.patchServiceSpecs(specsID, {specsStatus: 0 })
    navigation.navigate('Dashboard')
  }
  const onCancel = async() => {
    Alert.alert('Cancel Request', 'The request will be inactive and will not be seen by Service Providers. To resend this request, visit your History.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {text: 'OK', 
        onPress: () => onConfirm(),
      }
    ]);
   
  }


  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={typeName} icon={icon} phase={2}/>
      { waiting && <Loading/>}
      <Back navigation={navigation}/>

      <View style={styles.container}>
        <ImageBackground source={require("../../assets/map.png")} imageStyle= {{opacity:0.3}} resizeMode="cover">
            <View style={styles.map}>
              <TouchableWithoutFeedback onPress= {() => {
                  navigation.dispatch(StackActions.popToTop()), navigation.dispatch(StackActions.popToTop()),
                  navigation.navigate('MatchStack', {service: typeName, icon: icon})
                } }>
                <View>
                  <MaterialCommunityIcons name={'account-search-outline'} size={140} color="#9C54D5" style={{marginTop:-60}}/>
                  <View style={styles.waiting}>
                  <Animated.View style={{transform:[{rotate:spin}]}}>
                    <MaterialCommunityIcons name={'loading'} size={54} color={'#FFFFFF'}/>
                  </Animated.View>
                  </View>
                </View>
                
              </TouchableWithoutFeedback>
                
              <Text style={styles.texts}>Reaching out to your service provider.</Text>
              <Text style={styles.texts}>This may take a while.</Text>
            </View>
        </ImageBackground>
      </View> 

      <View style={styles.holder}>
        <TouchableWithoutFeedback onPress={() => onCancel()}>
          <View style={styles.ghost}/>
        </TouchableWithoutFeedback>
      </View>
        
      <Next navigation={navigation} price={minServiceCost} address={location} title={'Cancel Request'} screen={'Dashboard'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:-10
  },
  map: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  texts: {
    fontFamily: 'lexend-light',
    fontSize: 16,
    letterSpacing: -0.8
  },
  waiting: {
    position: 'absolute', 
    top: 0, left: 42, right: 0, bottom: 6, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 5,
  },

  holder: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 5,
    justifyContent: 'center',
  },
  ghost: {
    height: 50,
    zIndex: 5,
    marginHorizontal: 30,
  }
});