import { StyleSheet, View, ScrollView, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import ServiceTypesServices from '../services/service-types/service-types-services';
import ServiceServices from '../services/service/service-services';

import Loading from '../hooks/loading';
import { removeExisting } from '../utils/removeExisitng';
import { typeHandler } from '../utils/typeHandler';

export default function AddService( props ) {
  const existing = props.listings;
  const providerID = props.providerID;
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);

  const [details, setDetails] = useState(false);
  const [typeName, setTypeName] = useState('');
  const [typeID, setTypeID] = useState('');
  const [typeDesc, setTypeDesc] = useState('')

  const [initCost, setInitialCost] = useState('');
  const [costCHK, setCostCHK] = useState();
  const [done, setDone] = useState(false)
  let regex = /^-?\d+(?:[.,]\d*?)?$/;

  useEffect(() =>{
    if(loading){
      ServiceTypesServices.getServiceTypes()
        .then((data) => {
          let list = removeExisting(data.body,existing);
          setServices(typeHandler(list));
          setLoading(false)
        })
    }
  })

  useEffect(() => {
    if(done){
      props.navigation.replace('HomeStack');
      props.navigation.navigate('HomeStack', { screen:'OptionsStack', 
        params: { screen: 'Services', initial:false} })
    }
  }, [done]);

  const onAdd = (ID, name, desc) => {
    setTypeID(ID);
    setTypeName(name);
    setDetails(true);
    setTypeDesc(desc)
  }

  const onFinalAdd = (ID, name, desc) => {
    if(regex.test(initCost)) {
      setLoading(true);
      let initialCost = parseFloat(initCost).toFixed(2);
      ServiceServices.createService({providerID,typeID,typeName,initialCost})
        .then(() => {
          setDone(true);
          setLoading(false);
        })
        .catch((err) => console.log(err))
    }
  }

  const onCheck = () => {
    setCostCHK( regex.test(initCost) ? styles.accepted : styles.warning );
  }
  
  if(loading) return <View style={{flex:1}}><Loading/></View>

  if(done) 
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center' }}>
        <Text style={[styles.service, {fontSize:24, marginTop:-20}]}>Service Added</Text>
        <Text style={[styles.desc, {marginBottom:20, marginTop:-6}]}>Close this Form to See your Services.</Text>
        <MaterialCommunityIcons name={'book-check'} size={160} color={'#9C54D5'}/>
      </View>
    )

  if(details) 
    return (
      <ScrollView style={{marginVertical:-10}}>
        <View style={{marginHorizontal:20}}>
          <Text style={[styles.service, {fontSize:24}]}>{typeName}</Text>
          <Text style={[styles.desc, {textAlign:'justify', fontSize:11}]}>{typeDesc}</Text>
          <Text style={styles.cost}>Initial Cost of your {typeName} Service</Text>

          <View style={[styles.textbox, costCHK]}>
            <TextInput style={styles.input} onChangeText={setInitialCost} value={initCost} placeholder="Cost (ie. 320.00)" onBlur={() => onCheck()}/>
          </View>

          <TouchableWithoutFeedback onPress={() => onFinalAdd()}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.details}>Add this Service</Text>
              </LinearGradient>
            </LinearGradient> 
          </TouchableWithoutFeedback>
          
        </View>
      </ScrollView>
    )

  const servicesList = data => { 
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)'  ]} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={data.typeID}>
        <View style={styles.box}>

          <View style={styles.content}>
            <MaterialCommunityIcons name={data.icon} size={60}/>
            <View style={styles.texts}>
              <Text style={styles.service}>{data.typeName}</Text>
              <Text numberOfLines={2} style={styles.desc}>{data.typeDesc}</Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => onAdd(data.typeID,data.typeName,data.typeDesc)}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.details}>Add Service</Text>
              </LinearGradient>
            </LinearGradient> 
          </TouchableWithoutFeedback>

        </View>
      </LinearGradient>
    );
  };

  return (
    <ScrollView style={{marginVertical:-10}}>
    <View style={{marginVertical:16}}>
    {services.map((value, index) => {
      return servicesList(value);
    })}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 10,
    borderRadius: 10,
    height: 160,
    marginVertical: 10,
  },
  box: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  texts: {
    marginLeft: 10,
    flex: 1
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  service: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  rating: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 13,
  },
  desc: {
    fontFamily: 'quicksand',
    fontSize: 12,
    letterSpacing: -0.5,
    color: '#323941',
  },

  button: {
    height: 40,
    marginVertical: 10,
    borderRadius: 4,
    justifyContent: 'center'
  },
  ledge: {
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  },
  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    color: '#606060',
    fontSize:12,
  },

  cost: {
    fontFamily: 'notosans-medium',
    fontSize: 14,
    letterSpacing: -0.7,
    marginTop: 20,
  },

  textbox: {
    height: 52,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5,
    maxWidth: 280,
  },

  warning: {
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  accepted: {
    borderColor: '#00FF00',
    borderWidth: 1,
  },
});