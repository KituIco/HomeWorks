import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, Alert, Keyboard, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';

import CredentialsServices from '../../services/user/credentials-services';
import SeekerServices from '../../services/user/seeker-services';
import EditProfile from '../../components/editProfile';

import { getUserID } from '../../utils/getUserID';
import { contactHandler } from '../../utils/contactHandler';
import { getImageURL } from '../../utils/getImageURL';
import Loading from '../../hooks/loading';

export default function Profile({ navigation }) {
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [contact, setContact] = useState('');

  const [username, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');

  const [image, setImage] = useState(require("../../assets/default.jpg"));
  const [processing, setProcessing] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let seeker = await SeekerServices.getSeeker(userID);
        let credentials = await CredentialsServices.getUserCredentials(userID);

        if(seeker.body.seekerDp)
          setImage({uri : getImageURL(seeker.body.seekerDp)})
        setFirstname(seeker.body.firstName);
        setLastname(seeker.body.lastName)
        setBirthdate(seeker.body.birthdate);

        setEmail(credentials.body.email);
        setUsername(credentials.body.username);
        setContact(contactHandler(credentials.body.phoneNumber));

      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setProcessing(false);    
    })();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow', () => { setKeyboardVisible(true); });
    const keyboardDidHideListener = Keyboard.addListener(
    'keyboardDidHide', () => { setKeyboardVisible(false); });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onEdit = async() => {
    setOpen(true);
  }

  const onLogout = async() => {
    setLoading(true);
    try {
      await CredentialsServices.logout()
      navigation.replace('AuthStack')
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    setLoading(false)
  }

  if (processing) return <Loading/>
   
  return (
    <View style={styles.container}>
      { loading && <Loading/> }
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.heading}>{username}'s Profile!</Text>
      </View>
      
      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            <EditProfile firstName={firstName} lastName={lastName} birthdate={birthdate}/>
            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => setOpen(!open)}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>

      <ScrollView style={styles.info}>
        <View style={styles.holder}>
          <Image style={styles.icon} source={image} />
          <View style={styles.editicon}>
            <MaterialCommunityIcons name={'camera-flip'} size={26} style={{color:'#9C54D5'}}/>
          </View>
        </View>
        
        <Text style={styles.nameheader}>Name</Text>
        <View style={styles.nameholder}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <TouchableWithoutFeedback onPress={() => onEdit()}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{position:'absolute', right:0, bottom:0, color:'#9C54D5', marginTop: 4}}/>
          </TouchableWithoutFeedback>
        </View>


        <Text style={styles.subheader}>E-mail</Text>
        <Text style={styles.subcontent}>{email}</Text>

        <Text style={styles.subheader}>Contact Number</Text>
        <Text style={styles.subcontent}>{contact}</Text>

        <Text style={styles.subheader}>Birthday</Text>
        <View style={styles.subholder}>
          <Text style={styles.subcontent}>{birthdate}</Text>
          <TouchableWithoutFeedback onPress={() => onEdit()}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: 4}}/>
          </TouchableWithoutFeedback>
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
    fontSize: 18,
    textTransform:'uppercase',
    color: '#462964',
    marginBottom: 30,
    letterSpacing: -0.8,
    marginHorizontal: 50
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
    justifyContent: 'center',
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

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    height: 475
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5,
  },

  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    backgroundColor: '#E9E9E9A0'
  },
});