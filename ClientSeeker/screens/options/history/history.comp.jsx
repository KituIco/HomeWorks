import { View, ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/historyListing';
import styles from './history.style';
import hook from './history.hook';

export default function History({navigation}) {
  const {
    history, refreshing, onRefresh,
  } = hook();

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
