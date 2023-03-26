import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback, Animated, Easing, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import socketService from '../../services/sockets/sockets-services';

import Header from '../../components/transactheader';
import Next from '../../components/transactnext';
import Back from '../../hooks/back';

export default function Matching({ route, navigation }) {
  const { referencedID, minServiceCost, specsID, typeName, icon } = route.params;

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

  useFocusEffect(
    useCallback(() => {
      ( async() => {
        try {
          await socketService.receiveAcceptServiceSpec();
          onNext();
        } catch(err) {
          Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        }
      })();
    }, [])
  )

  useEffect(() => {
    socketService.joinRoom('specs-' + specsID);
  }, []);

  const onNext = () => {
    navigation.navigate('MatchStack', { typeName, icon, address: referencedID, specsID })
  }
  
  const onConfirm = async() => {
    await ServiceSpecsServices.patchServiceSpecs(specsID, { specsStatus:4 })
    socketService.serviceSpecUnavailable(specsID);
    socketService.offReceiveAcceptServiceSpec();
    navigation.navigate('HomeStack')
  }

  const onCancel = async() => {
    Alert.alert('Cancel Request', 'The request will be inactive and will not be seen by Service Providers. To resend this request, visit your History.', [
      {
        text: 'Cancel',
      },
      {text: 'OK', 
        onPress: () => onConfirm(),
      }
    ]);
  }

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={typeName} icon={icon} phase={2}/>
      <Back navigation={navigation}/>

      <View style={styles.container}>
        <ImageBackground source={require("../../assets/map.png")} imageStyle= {{opacity:0.2}} resizeMode="cover">
            <View style={styles.map}>
              
              <View>
                <MaterialCommunityIcons name={'account-search-outline'} size={140} color="#9C54D5" style={{marginTop:-60}}/>
                <View style={styles.waiting}>
                <Animated.View style={{transform:[{rotate:spin}]}}>
                  <MaterialCommunityIcons name={'loading'} size={54} color={'#FFFFFF'}/>
                </Animated.View>
                </View>
              </View>
                
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
        
      <Next navigation={navigation} price={minServiceCost} address={referencedID} title={'Cancel Request'} screen={'Dashboard'}/>
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