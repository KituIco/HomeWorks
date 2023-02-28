import React from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

import Header from '../../components/transactheader';
import Next from '../../components/transactnext';


export default function Matching({ route, navigation }) {
  const { service, icon }= route.params;
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={service} icon={icon} phase={2}/>

      <View style={styles.container}>
        <ImageBackground source={require("../../assets/map.png")} imageStyle= {{opacity:0.3}} resizeMode="cover">
            <View style={styles.map}>
              <TouchableWithoutFeedback onPress= {() => {
                  navigation.dispatch(StackActions.popToTop()), navigation.dispatch(StackActions.popToTop()),
                  navigation.navigate('MatchStack', {service: service, icon: icon})
                } }>
                <MaterialCommunityIcons name={'account-search-outline'} size={140} color="#9C54D5" style={{marginTop:-60}}/>
              </TouchableWithoutFeedback>
                
              <Text style={styles.texts}>Reaching out to your service provider.</Text>
              <Text style={styles.texts}>This may take a while.</Text>
            </View>
        </ImageBackground>
      </View> 
        
      <Next icon={icon} service={service} navigation={navigation} price={"320"} title={'Cancel Request'} screen={'Dashboard'}/>
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
    }
});