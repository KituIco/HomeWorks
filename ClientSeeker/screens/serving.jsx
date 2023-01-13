import React from 'react';
import { StyleSheet, View, Text, } from 'react-native';

import Header from '../components/transactheader';

export default function Serving({route}) {
  const { service, icon } = route.params;

  return (
    <View style={{flex:1}}>
      <Header service={service} icon={icon} phase={3}/>
      <View style={styles.container}>
        <Text style={styles.content}>Serving!</Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  }
});