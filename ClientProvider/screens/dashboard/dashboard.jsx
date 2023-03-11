import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import ProviderServices from '../../services/user/provider-services';
import AddressServices from '../../services/address/address-services';
import ServiceServices from '../../services/service/service-services';

import { getUserID } from '../../utils/getUserID';
import Loading from '../../hooks/loading';
import Back from '../../hooks/back';

export default function Dashboard({navigation}) {
  const [verified, setVerified] = useState(true);
  const [noAddress, setNoAddress] = useState(false);
  const [noService, setNoService] = useState(false);
  const [message1, setMessage1] = useState('To get requests, please add an address.')
  const [message2, setMessage2] = useState('To be verified, register your services.')

  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [init, setInit] = useState(0);

  useEffect(() => {
    getUserID().then( userID => {
      if(userID && loading) {
        ProviderServices.getProvider(userID).then( data => {
          let fullname = `${data.body.firstName} ${data.body.lastName}`;
          
          if(!data.body.verified) {
            Promise.all([
              AddressServices.getAllAddressOfUser(userID),
              ServiceServices.getProviderServices(userID),
            ]).then (data => {
              if(data[0].body.length == 0) setNoAddress(true);
              else setMessage1('The admins are verifying your profile.')
              if(data[1].body.length == 0) setNoService(true);
              else setMessage2('You may manage your profile via Options.')
              setVerified(false);
              setName(fullname);
              setLoading(false);
            })
          } 
        }).catch((err) => {
          console.log('test', err);
          navigation.navigate('AuthStack');
        })
      } 
      else if (!userID) {
        setInit(init+1);
      }
    })
  }, [init]);

  const changeRegister = () => {
    setVerified(!verified);
    setNoAddress(!noAddress)
    setNoService(!noService)
  };

  if (loading)
    return <Loading/>

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => changeRegister()}>
        <Text style={styles.heading}>Hello, {name}!</Text>
      </TouchableWithoutFeedback>
      <Back navigation={navigation}/>

      { verified &&
      <View>
        <Text style={styles.subheading}>Please click the Ready Button below if you want to receive Service Requests.</Text>
        <TouchableWithoutFeedback onPress= {() => navigation.navigate('Requests')}>          
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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Chat')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '20%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
  },

  shadow: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    marginTop: 50,
    justifyContent:'center',
    alignSelf: 'center',
  },
  border: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    justifyContent:'center',
    backgroundColor: '#E9E9E9',
    marginTop: -8,
    overflow: 'hidden'
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  ready: {
    fontFamily: 'lexend',
    color: '#F9F9F9',
    fontSize: 32,
    textTransform: 'uppercase',
    letterSpacing: -1
  },

  footer: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    letterSpacing: -0.5,
    marginHorizontal: 48,
    textAlign: 'center',
    marginTop: 20,
  },
  redirect: {
    fontFamily:'quicksand-bold', 
    textDecorationLine: 'underline',
  },
  icons: {
    marginTop: 6, 
    marginLeft: -8,
  },

  ledge: {
    borderRadius: 10,
    height: 34,
    marginTop: 10,
    marginHorizontal: 40
  },
  touchables: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
  },
  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },

});