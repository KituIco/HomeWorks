import { View, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/serviceListing';
import Header from '../../../components/transactheader';
import Next from '../../../components/transactnext';
import Loading from '../../../hooks/loading';

import styles from './transacting-serve.style';
import hook from './transacting-serve.hook';

export default function TransactingServe({ route, navigation }) {
  const {
    typeName, icon, loading, address, cost, desc, 
    statusIcon, status, paid, list, reportID
  } = hook( navigation, route );
  
  if(loading) return <View style={{flex:1}}><Loading/></View>
  
  return (
    <View style={{flex:1}}>
      {/* remove touchables */}
      <Header service={typeName} icon={icon} phase={3}/>

      <ScrollView style={styles.container}>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.circle}>
          <MaterialCommunityIcons name={statusIcon} size={129} style={{color:'#9C54D5'}}/>
        </View>
        
        <Text style={styles.heading}>Your Service Provider</Text>
        <Listing listings={list} solo={true}/>

        <Text style={styles.heading}>Service Payment</Text>
        <View style={styles.subheading}>
          <Text style={[{width: '60%'},styles.texts]}>{typeName} Service</Text>
          <Text style={styles.texts}> Php <Text style={{fontFamily: 'quicksand-bold'}}>{cost}</Text></Text>
        </View>

        <Text style={styles.heading}>Service Description</Text>
        <Text style={[{marginHorizontal:24},styles.texts]}>{desc}</Text>
        <Text style={[styles.texts, {marginHorizontal:24, marginBottom:20, marginTop:6, color:'#9C54D5', fontFamily:'quicksand-bold'}]}>
          Service Location: <Text style={{color:'#000000', fontFamily:'quicksand-medium'}}>{address}</Text> </Text>


      </ScrollView>

      { !paid &&
      <Next icon={icon} service={typeName} reportID={reportID}
        navigation={navigation} title={'Settle Payment'} screen={'TransactingPayment'}/>
      }

      { paid &&
      <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
        <View style={styles.bottom}>
          <MaterialCommunityIcons name={'check-circle-outline'} size={26} style={{color:'#462964'}}/>
          <Text style={styles.bottext}>Payment has been Settled</Text>
        </View>
      </LinearGradient>
      }

    </View>

  );
}