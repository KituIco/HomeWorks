import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Header from '../components/transactheader';
import Next from '../components/transactnext';

export default function SettleSpecs({ route, navigation }) {
  const { service, icon }= route.params;
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={service} icon={icon} phase={2}/>

      <View style={styles.container}>

      </View> 
        
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