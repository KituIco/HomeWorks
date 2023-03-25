import { StyleSheet, View, Text, Alert, ScrollView, } from 'react-native';
import { EvilIcons  } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import Grid  from '../../components/grid';
import Header from '../../components/dashheader';
import Listing from '../../components/serviceListing';

import ServiceTypeServices from '../../services/service/service-type-services';
import { typeHandler } from '../../utils/typeHandler';
import Loading from '../../hooks/loading';
import Back from '../../hooks/back';


export default function Dashboard({navigation}) {
  const [processing, setProcessing] = useState(true);
  const [services, setServices] = useState([]);

  useEffect(() => {
    ( async() => {service:
      try {
        let data = await ServiceTypeServices.getServiceTypes()
        let patched = await typeHandler(data.body);
        setServices(patched);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setProcessing(false);
    })();
  }, []);

  const featured = [
    {providerID: 'A', name: 'Alex Guerrero', location: 'Taguig City', serviceRatings: '4.3', typeName: 'Car Mechanic', initialCost: '420', src: require("../../assets/providers/provider-a.png")},
    {providerID: 'B', name: 'Precious Trinidad', location: 'Los Baños', serviceRatings: '4.6', typeName: 'House Cleaning', initialCost: '360', src: require("../../assets/providers/provider-b.png")},
    {providerID: 'C', name: 'Fe Mercado', location: 'Antipolo', serviceRatings: '4.2', typeName: 'Laundry', initialCost: '330', src: require("../../assets/providers/provider-c.png")},
  ]

  const explore = [
    {providerID: 'D', name: 'Edgardo Dela Cena', location: 'Bacoor City', serviceRatings: '4.8', typeName: 'Roof Cleaning', initialCost: '410', src: require("../../assets/providers/provider-d.png")},
    {providerID: 'E', name: 'Ricardo Pollicar', location: 'Mandaluyong City', serviceRatings: '4.4', typeName: 'Meal Preparation', initialCost: '300', src: require("../../assets/providers/provider-e.png")},
    {providerID: 'F', name: 'Ced Montenegro', location: 'Manila', serviceRatings: '4.6', typeName: 'Plumbing', initialCost: '350', src: require("../../assets/providers/provider-f.png")},
  ]

  if (processing) return <Loading/>


  return (
    <ScrollView style={styles.container}>
      <Back navigation={navigation}/>
      <View style={styles.search}>
        <View style={styles.searchbar}>
          <EvilIcons name='search' color='#616161' size={32}/>
          <Text style={styles.searchtext}>Search for services</Text>
        </View>
      </View>
      

      <View style={styles.sections.services}>
        <Header title={'Services'} listings={services} navigation={navigation}/>
        <Grid listings={services.slice(0,6)} navigation={navigation}/>
      </View>

      <Header title={'Featured'} navigation={navigation}/>
      <View style={styles.sections}>
        <Listing listings={featured}/>
      </View>

      <Header title={'Explore'} navigation={navigation}/>
      <View style={styles.sections}>
        <Listing listings={explore}/>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    height: 40,
    width: "100%",
    backgroundColor: "#EFEFEF",
    alignItems: 'center',
  },
  searchbar:{
    height: 50,
    width: "75%",
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 50,
    flexDirection: 'row',
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 4,
  },
  searchtext:{
    fontFamily: 'montserrat',   
    fontSize: 16,
    marginTop: 2.5,
    marginLeft: 4,
    color: '#616161',
  },

  sections:{
    marginTop: -10,
    marginHorizontal: 8,
    services: {
      paddingTop: 38,
      marginVertical: 20,
    }
  },

});