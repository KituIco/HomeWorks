import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StackActions } from '@react-navigation/native';

import CredentialsServices from '../../services/user/credentials-services';
import SeekerServices from '../../services/user/seeker-services';

import { getUserID } from '../../utils/getUserID';
import { contactHandler } from '../../utils/contactHandler';
import { getImageURL } from '../../utils/getImageURL';
import Loading from '../../hooks/loading';

export default function Profile({ navigation }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [contact, setContact] = useState('');

  const [image, setImage] = useState(require("../../assets/default.jpg"));
  const [init, setInit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    getUserID().then( userID => {
      if(userID) {
        Promise.all([SeekerServices.getSeeker(userID), CredentialsServices.getUserCredentials(userID)])
          .then(data => {
            if(data[0].body.seekerDp)
              setImage({uri : getImageURL(data[0].body.seekerDp)})
            setName(`${data[0].body.firstName} ${data[0].body.lastName}`);
            setBirthday(data[0].body.birthdate);
            setMail(data[1].body.email);
            setContact(contactHandler(data[1].body.phoneNumber));
            setProcessing(false);
          })
      } else {
        setInit(init+1);
      }
    })
  }, [init]);

  const onLogout = () => {
    setLoading(true);
    CredentialsServices.logout()
    .then(() => {
      navigation.dispatch(StackActions.popToTop()),
      navigation.navigate('AuthStack')
    })
    .catch(() => setLoading(false))
  }

  if (processing) return <Loading/>
   
  return (
    <View style={styles.container}>
      { loading && <Loading/> }
      <View style={styles.header}>
        <Text style={styles.heading}>My Profile</Text>
      </View>
      

      <ScrollView style={styles.info}>
        <View style={styles.holder}>
          <Image style={styles.icon} source={image} />
          <View style={styles.editicon}>
            <MaterialCommunityIcons name={'camera-flip'} size={26} style={{color:'#9C54D5'}}/>
          </View>
        </View>
        
        <Text style={styles.nameheader}>Name</Text>
        <View style={styles.nameholder}>
          <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#FFF', marginTop: 4}}/>
          <Text style={styles.name}>{name}</Text>
          <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: 4}}/>
        </View>


        <Text style={styles.subheader}>E-mail</Text>
        <Text style={styles.subcontent}>{mail}</Text>

        <Text style={styles.subheader}>Birthday</Text>
        <View style={styles.subholder}>
          <Text style={styles.subcontent}>{birthday}</Text>
          <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: 4}}/>
        </View>

        <Text style={styles.subheader}>Contact Number</Text>
        <View style={styles.subholder}>
          <Text style={styles.subcontent}>{contact}</Text>
          <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: 4}}/>
        </View>

        <TouchableWithoutFeedback>
            <View style={styles.changepw}>
              <Text style={[styles.content, {color: '#462964'}]}>Change Password</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => { onLogout() }}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.logout}>
              <Text style={[styles.content, {color: '#FFF'}]}>Log Out</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
         
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
     },

  header: {
    height: 120,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    fontFamily: 'lexend',   
    fontSize: 20,
    textTransform:'uppercase',
    color: '#462964',
    marginBottom: 28,
    letterSpacing: -0.8
  },

  holder: {
    width: 160, 
    marginTop: 56,
    alignSelf: 'center',
  },
  icon: {
    width: 160, 
    height: 160, 
    borderRadius: 160/2,    
  },
  editicon: {
    marginLeft: 120,
    marginTop: -40,
    borderRadius: 36/2,
    height: 36,
    width: 36,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },

  nameheader: {
    fontFamily: 'quicksand',
    fontSize: 16,
    letterSpacing: -0.5,
    alignSelf: 'center',
    marginTop: 30,
  },
  nameholder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    justifyContent: 'space-between',
    marginTop: -4,
  },
  name: {
    fontFamily: 'notosans',
    fontSize: 18,
    fontVariant: ['small-caps'],
  },

  subheader: {
    fontSize: 16,
    fontFamily: 'quicksand-medium',
    letterSpacing: -0.5,
    marginTop: 30,
    marginLeft: 30
  },
  subcontent: {
    fontSize: 18,
    fontFamily: 'notosans-light',
    letterSpacing: -0.5,
    marginLeft: 30
  },
  subholder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    justifyContent: 'space-between',
  },
  
  changepw: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    borderWidth:1, 
    borderColor: '#462964', 
    marginTop: 40,
    marginHorizontal: 30,
    marginBottom: 12
  },
  content: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 16
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 34,
    marginBottom: 40
  },
  logout: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    marginTop: -4,
  },
});