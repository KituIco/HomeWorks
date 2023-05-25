import { View, Text, ImageBackground, TouchableWithoutFeedback, Animated } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Header from '../../../components/transactheader';
import Next from '../../../components/transactnext';
import Back from '../../../hooks/back';

import styles from './request-match.style';
import hook from './request-match.hook';

export default function RequestMatch({ route, navigation }) {
  const {
    referencedID, minServiceCost, typeName, icon, spin, location, onCancel,
  } = hook ( navigation, route );

  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={typeName} icon={icon} phase={2}/>
      <Back navigation={navigation}/>

      <View style={styles.container}>
        <ImageBackground source={require("../../../assets/map.png")} imageStyle= {{opacity:0.2}} resizeMode="cover">
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
      { location &&
        <Next navigation={navigation} price={minServiceCost} address={location} title={'Cancel Request'} screen={'Dashboard'}/>
      }     
    </View>
  );
}