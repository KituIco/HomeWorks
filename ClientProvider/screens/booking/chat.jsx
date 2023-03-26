import { StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import BookingServices from '../../services/booking/booking-services';
import socketService from '../../services/sockets/sockets-services';
import SeekerServices from '../../services/seeker/seeker-services';

import { addressHandler } from '../../utils/addressHandler';
import { getImageURL } from '../../utils/getImageURL';
import Loading from '../../hooks/loading';
import Back from '../../hooks/back';


export default function Chat({ navigation, route }) {
  const [value, onChangeText] = useState();
  const [loading, setLoading] = useState(true);
  let data = route.params;
  let bookingID = data.bookingID;

  const [seekerName, setSeekerName] = useState('');
  const [seekerDP, setSeekerDP] = useState(require("../../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try {
        let { body: specs } = await ServiceSpecsServices.getSpecsByID(data.specsID);
        let { body: user } = await SeekerServices.getSeeker(specs.seekerID);

        setSeekerName(user.firstName + " " + user.lastName)
        if (user.seekerDp)
          setSeekerDP({uri : getImageURL(user.seekerDp)});
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })(); 
  }, [])

  useEffect(() => {
    if(!loading)
      socketService.joinRoom('booking-' + bookingID);
  },[loading]);

  useEffect(() => {
    if(!loading)
    ( async() => {
      try {
        await socketService.receiveRejectChat();
        onReject();
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [loading]);
  
  const onConfirm = async() => {
    try {
      await ServiceSpecsServices.patchServiceSpecs(data.specsID, { specsStatus:1, referencedID:addressHandler(data.location), specsTimeStamp:Date.now() });
      await BookingServices.patchBooking(bookingID, { bookingStatus:4 });

      socketService.rejectChat('booking-' + bookingID)
      navigation.navigate('Requests');
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
  }

  const onRejection = () => {
    socketService.offChat();
    socketService.offDecision();
    navigation.navigate('Requests');
  }

  const onDecline = async() => {
    Alert.alert('Decline the Request', 'Are you sure you want to decline this request?', [
      {
        text: 'Cancel',
      },
      {text: 'OK', 
        onPress: () => onConfirm(),
      }
    ]);
  }

  const onReject = async() => {
    Alert.alert('Seeker Declined', 'We are sorry. The seeker has declined your service.', [
      {text: 'OK', 
        onPress: () => onRejection(),
      }
    ]);
  }

  if (loading) return <View style={{flex:1}}><Loading/></View>
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Back navigation={navigation}/>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.profileIcon} source={seekerDP} />
            <Text style={styles.names}>{seekerName}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => onDecline()}>
            <View style={styles.decline}>
                <Text style={styles.content}>Decline</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        
        <View style={{backgroundColor:'#E9E9E9'}}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Specs', {data})}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
              <Text style={styles.next}>Finalize Cost and Details</Text>
              </LinearGradient>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
        </View>
        

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4}}/>
        <ScrollView style={{flex:1}}>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:'60%'}}>
              <Text style={{fontFamily: 'lexend', fontSize: 15, textTransform:'uppercase'}}>Chat!</Text>
          </View>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.footer}>
          <View style={styles.message}> 
            <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
              placeholder='Text Message'/>
            <MaterialCommunityIcons name={'send'} color={'#9C54D5'} size={24}/>
          </View>
        </View>
      </View> 
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 115,
    backgroundColor: '#E9E9E9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
  },

  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15,
    marginLeft: 10
  },
  names: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },

  footer: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    height: 50,
    width: '85%',
    // placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  },

  decline: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 2,
    marginRight: 8,
    borderColor:'#9C54D5'
  },
  content: {
    fontFamily: 'notosans',
    letterSpacing: -0.3,
    color: '#9C54D5',
    textTransform: 'uppercase',
    fontSize: 11
  },

  shadow: {
    borderRadius: 10,
    height: 44,
    marginBottom: 16,
    marginTop: 20,
    width:'80%',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
  },
  next: {
    textAlign: 'center',
    fontFamily: 'quicksand-medium',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },
  ledge: {
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
});