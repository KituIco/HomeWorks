import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Header from '../../components/transactheader';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettleSpecs({ route, navigation }) {
  const { service, icon } = route.params;

  const [value, onChangeText] = React.useState();
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={service} icon={icon} phase={2} compressed={true}/>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.profileIcon} source={require("../../assets/providers/provider-f.png")} />
            <Text style={styles.names}>Cedric Protacio</Text>
          </View>
          <MaterialCommunityIcons name={'dots-vertical'} color={'#575757'} size={24}/>
        </View>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4}}/>
        <ScrollView style={{flex:1}}>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:'60%'}}>
            <TouchableWithoutFeedback onPress= {() => { navigation.navigate('FinalSpecs', {service: service, icon: icon})
                }}>
              <Text style={{fontFamily: 'lexend', fontSize: 15, textTransform:'uppercase'}}>Chat!</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.footer}>
          <View style={styles.message}> 
            <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
              placeholder='Text Message'/>
            <MaterialCommunityIcons name={'send'} color={'#9C54D5'} size={24}/>
          </View>
        </View>
      </View> 
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15,
    marginLeft: 10
  },
  names: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },

  footer: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    height: 50,
    width: '85%',
    placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  }
});