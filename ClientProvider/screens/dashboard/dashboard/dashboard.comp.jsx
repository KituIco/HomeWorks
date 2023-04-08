import { View, Text, TouchableWithoutFeedback, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';
import styles from './dashboard.style';
import hook from './dashboard.hook';

export default function Dashboard({navigation}) {
  const {
    verified, noAddress, noService, message1, message2, 
    loading, name, changeReg,
  } = hook( navigation );

  if (loading)
    return <Loading/>

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => changeReg()}>
        <Text style={styles.heading}>Hello, {name}!</Text>
      </TouchableWithoutFeedback>
      <Back navigation={navigation}/>

      { verified &&
      <View>
        <Text style={styles.subheading}>Please click the Ready Button below if you want to receive Service Requests.</Text>
        <TouchableWithoutFeedback onPress= {() => navigation.navigate('RequestList')}>          
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
            <View style={styles.border}>
              <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:-0.3, y:0.8 }} style={styles.button}>
                <Text style={styles.ready}>Ready</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
      }

      { !verified &&
      <View>
        <Text style={styles.subheading}>{message1} {message2}</Text>
        <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
          <View style={styles.border}>
            <MaterialCommunityIcons name="account-hard-hat" size={190} color='#9C54D5' style={styles.icons}/>
          </View>
        </LinearGradient>
      </View>
      }

      <View style={{marginTop:'25%', width:'100%'}}>
        { noAddress &&
        <TouchableWithoutFeedback onPress={() => navigation.navigate('OptionsStack', { screen:'Address', initial:false })}>
          <View style={[styles.touchables, {borderWidth:1, borderColor: '#9C54D5', marginHorizontal:40}]}>
              <Text style={[styles.next, {color:'#9C54D5'}]}>Add an Address</Text>
          </View>
        </TouchableWithoutFeedback>
        }
        { !noAddress && <View style={{height: 43}}/>}

        { noService &&
        <TouchableWithoutFeedback onPress={() => navigation.navigate('OptionsStack', { screen:'Services', initial:false })}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={[styles.ledge, {marginBottom:17}]}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.touchables}>
              <Text style={styles.next}>Register a Service</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        }

        { !noService &&
        <Text style={styles.footer}>For questions and concerns, you may contact the admin via chat in the <Text style={styles.redirect}>Options</Text> tab.</Text>
        }
      </View>

    </View>
  );
}