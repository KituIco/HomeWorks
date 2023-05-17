import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/historyListing';

import styles from './transact-history.style';
import hook from './transact-history.hook';

export default function TransactHistory({ navigation }) {
  const {
    history, empty, refreshing, onRefresh,
  } = hook();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My History</Text>
      </View>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, width:'100%', zIndex:5}}/>
      <ScrollView style={{width: '100%', marginVertical:-10}} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{height:20}}/>
        <Listing listings={history} navigation={navigation} />
        { empty && 
        <View style={{marginTop:'64%', alignItems:'center'}}>
          <Text style={styles.content}>History Tab is Empty!</Text>
          <Text style={styles.subcontent}>Scroll down to refresh.</Text>
        </View> }
      </ScrollView>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:1 }} 
        end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      <View style={{height:40}}/>
    </View>
  );
}
