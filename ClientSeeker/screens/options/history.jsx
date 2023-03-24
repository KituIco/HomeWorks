import { StyleSheet, View, Text, Alert, ScrollView, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { getUserID } from '../../utils/getUserID';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import Listing from '../../components/historyListing';
import { historyHelper } from '../../utils/historyHelper';

export default function History() {
  const [waiting, setWaiting] = useState(true);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    ( async() => {  
      try {
        let userID = await getUserID();
        let specs = await ServiceSpecsServices.getSortedSeekerSpecs(userID, 'desc');
        let history = await historyHelper(specs.body);
        setHistory(history);
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
        let userID = await getUserID();
        let specs = await ServiceSpecsServices.getSortedSeekerSpecs(userID, 'desc');
        let history = await historyHelper(specs.body);

        
        setHistory(history);
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setRefreshing(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{width: '100%'}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Listing listings={history} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  }
});