import { StyleSheet, View, Alert, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { getUserID } from '../../utils/getUserID';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import { historyHelper } from '../../utils/historyHelper';
import Listing from '../../components/historyListing';


export default function History({navigation}) {
  const [waiting, setWaiting] = useState(true);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getHistory = async() => {
    let userID = await getUserID();
    let specs = await ServiceSpecsServices.getSortedSeekerSpecs(userID, 'desc');
    let history = await historyHelper(specs.body);
    setHistory(history);
  }

  useEffect(() => {
    ( async() => {  
      try {
        getHistory();
        setWaiting(false);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, []);

  const onRefresh = useCallback (() => {
    ( async() => {  
      setRefreshing(true);
      try {
        getHistory();
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, width:'100%', zIndex:5}}/>
      <ScrollView style={{width: '100%', marginTop:-10}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{height:20}}/>
        <Listing listings={history} navigation={navigation} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  }
});