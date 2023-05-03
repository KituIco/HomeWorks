import { View, Text, ScrollView, TouchableWithoutFeedback, Alert, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient, } from 'expo-linear-gradient';

import Listing from '../../../components/requestListing';
import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './request-list.style';
import hook from './request-list.hook';

export default function RequestList({navigation}) {
  const {
    refreshing, waiting, services, loading,
    onRefresh,
  } = hook();

  if (loading)
    return <Loading/>

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>
      <Text style={styles.header}>Requests Page</Text>
      
      <View style={{width:'100%', flex:1 }}>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
        <ScrollView style={{marginVertical:-10}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
          {
            !waiting && <Listing listings={services} navigation={navigation}/>
          }
          { waiting &&
          <View style={{alignItems: 'center', marginTop:'30%'}}>
            <Text style={styles.subheader}>Standby for Requests.</Text>
            <MaterialCommunityIcons name="home-search" size={150} color='#9C54D5' style={{marginTop: 20}}/>
            <Text style={styles.subcontent}>Currently waiting Service Requests. Please watch out for App Notifications.</Text>
          </View>
          }
        </ScrollView>
        <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      </View>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Dashboard')}>
        <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
          <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
            <Text style={styles.content}>Stop Accepting Requests</Text>
          </LinearGradient>
        </LinearGradient>
      </TouchableWithoutFeedback>

    </View>
  );
}
