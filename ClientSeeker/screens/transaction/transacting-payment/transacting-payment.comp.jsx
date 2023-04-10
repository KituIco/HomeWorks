import { View, Text, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Next from '../../../components/transactnext';

import styles from './transacting-payment.style';
import hook from './transacting-payment.hook';

export default function TransactingPayment({route, navigation}) {
  const { 
    service, icon, methods, changeToggle,
  } = hook( route );

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
      
      <Next icon={icon} service={service} navigation={navigation} title={'Choose this Option'} screen={'TransactingServe'}/>
    </View>
  );
}
