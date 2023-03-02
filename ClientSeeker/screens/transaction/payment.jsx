import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Next from '../../components/transactnext';

export default function Payment({route, navigation}) {
  const { service, icon } = route.params;
  
  const baseMethods = [
    { id: 0, type: 'Cash', toggled: true},
    { id: 1, type: 'G-Cash', account: '+639** *** 6424', toggled: false},
    { id: 2, type: 'G-Cash', account: '+639** *** 3492', toggled: false},
    { id: 3, type: 'G-Cash', account: '+639** *** 7831', toggled: false},
    { id: 4, type: 'PayMaya', account: '+639** *** 6333', toggled: false},
    { id: 5, type: 'PayMaya', account: '+639** *** 8882', toggled: false},
    { id: 6, type: 'PayMaya', account: '+639** *** 3241', toggled: false},
  ]

  for (let i=0; i<baseMethods.length; i++) {
    if(baseMethods[i].type == 'Cash') baseMethods[i]['src'] = require("../../assets/cash.png");
    else if(baseMethods[i].type == 'G-Cash') baseMethods[i]['src'] = require("../../assets/GCash.png");
    else if(baseMethods[i].type == 'PayMaya') baseMethods[i]['src'] = require("../../assets/PayMaya.jpg");
  }

  const [methods, setMethods] = useState(baseMethods);

  const changeToggle = (id) => {
    let newMethods = [...methods];
    for (let i=0; i<newMethods.length; i++){
      newMethods[i].toggled = false;
    }
    newMethods[id].toggled = true;
    setMethods(newMethods);
  }


  const methodsList = data => {
    return (
      <View style={styles.list} key={data.id}> 
        <View style={styles.options}>
          <Image style={styles.image} source={data.src} />
          <View style={styles.label}>
            <Text style={styles.type}>{data.type}</Text>
            { data.account && <Text style={styles.account}>{data.account}</Text>}
          </View>
         
        </View>
        <TouchableWithoutFeedback onPress={() => changeToggle(data.id)}>
          <View style={styles.select}>
            { data.toggled && <View style={styles.selected}/>}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
       <LinearGradient colors={['#462964', '#9C54D5' ]} start={{ x:0, y:1.8 }} end={{ x:0, y:0 }} style={styles.header}>
        <Text style={styles.title}>Payment Options</Text>
      </LinearGradient>

      <ScrollView style={styles.container}>
        <View style={{padding:20}}>
          {methods.map((value, index) => {
            return methodsList(value);
          })}
        </View>
      </ScrollView>
      
      <Next icon={icon} service={service} navigation={navigation} title={'Choose this Option'} screen={'Serving'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  },
  header: {
    height: 110,
  },
  title: {
    marginTop: 55,
    marginLeft: 55,
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#F9F9F9'
  },

  list: {
    flexDirection:'row', 
    justifyContent:'space-between',
    marginVertical: 2,
    marginHorizontal: 12,
  },

  options: {
    flexDirection: 'row',
    marginVertical: 14,
    alignItems: 'center',
  },
  image: {
    height: 36,
    width: 48,
  },
  label: {
    marginLeft: 10,
  },
  type: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
    lineHeight: 20,
  },
  account: {
    fontFamily: 'quicksand',
    fontSize: 12,
    color: '#171717',
    lineHeight: 12,
  },

  select: {
    borderRadius: 12,
    height: 24,
    width: 24,
    borderColor: '#171717',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderRadius: 9,
    height: 18,
    width: 18,
    backgroundColor: '#9C54D5',
    alignSelf: 'center',
  }
});