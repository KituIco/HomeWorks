import { StyleSheet, View, Text, ScrollView, Image, TouchableWithoutFeedback, Alert, Keyboard, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';

import CredentialsServices from '../../services/user/credentials-services';
import ProviderServices from '../../services/user/provider-services';
import AddressServices from '../../services/address/address-services';
import ImageService from '../../services/image/image-services';
import EditCredentials from '../../components/editCredentials';
import EditProfile from '../../components/editProfile';

import { contactHandler } from '../../utils/contactHandler';
import { addressHandler } from '../../utils/addressHandler';
import { getUserID } from '../../utils/getUserID';
import { getImageURL } from '../../utils/getImageURL';
import Loading from '../../hooks/loading';

export default function Profile({ navigation }) {
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState();

  const [username, setUsername] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [agencyId, setAgencyId] = useState();

  const [image, setImage] = useState(require("../../assets/default.jpg"));
  const [processing, setProcessing] = useState(true);
  const [loading, setLoading] = useState(false);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [providerID, setProviderID] = useState('');
  const [open, setOpen] = useState(false);

  const [type, setType] = useState('');
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    ( async() => {
      try {
        let userID = await getUserID();
        let address = await AddressServices.getAllAddressOfUser(userID);
        if(address.body.length == 0){
          navigation.replace('HomeStack');
          navigation.navigate('HomeStack', { screen:'OptionsStack', 
            params: { screen: 'Address', initial:false} });
        }

        let provider = await ProviderServices.getProvider(userID);
        let credentials = await CredentialsServices.getUserCredentials(userID);

        if(provider.body.providerDp)
          setImage({uri : getImageURL(provider.body.providerDp)});
        if (provider.body.agencyId) 
          setAgencyId(provider.body.agencyId);
        
        setFirstname(provider.body.firstName);
        setLastname(provider.body.lastName)
        setBirthdate(provider.body.birthdate);
        setAddress(address.body[0])

        setProviderID(userID);
        setEmail(credentials.body.email);
        setUsername(credentials.body.username);
        setContact(credentials.body.phoneNumber);

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

  const onClose = async() => {
    setType();
    setOpen(false);
  }

  const onCredentials = async(type) => {
    setType(type);
    setOpen(true);
  }

  const fromChild = () => {
    setKeyboardVisible(!isKeyboardVisible);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1,
    });
    if (!result.canceled) {
      setNewImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setNewImage();
  };

  const onUpload = async () => {
    setLoading(true);
    try {
      let providerDp = await ImageService.uploadFile(newImage);
      await ProviderServices.patchProvider(providerID, { providerDp });
      navigation.replace('HomeStack');
      navigation.navigate('HomeStack', { screen:'OptionsStack', 
        params: { screen: 'Profile', initial:false} });
    } catch (err) {
      Alert.alert('Error', err, [ {text: 'OK'} ]);
      navigation.goBack()
    }
    setLoading(false);
  }

  if (processing) return <Loading/>

  if (newImage)

  return (
    <View style={styles.container}>
      { loading && <Loading/> }
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.heading}>{username}'s Profile!</Text>
      </View>
      <Text numberOfLines={1} style={styles.head}>Update Picture</Text>

      <View style={styles.newHolder}>
        <Image source={{ uri: newImage}} style={styles.newIcon}/>
        <TouchableWithoutFeedback onPress={() => pickImage()}>
          <View style={styles.newEdit}>
            <MaterialCommunityIcons name={'camera-flip'} size={26} style={{color:'#9C54D5'}}/>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={{marginTop:60, marginHorizontal:20}}>
      <TouchableWithoutFeedback onPress= {() => onUpload()}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={[styles.shadow, {marginBottom:0}]}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.logout}>
              <Text style={[styles.content, {color: '#FFF'}]}>Update Display Picture</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => removeImage()}>
          <View style={[styles.changepw, {marginTop:6}]}>
            <Text style={[styles.content, {color: '#462964'}]}>Cancel</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
        
    </View>

  )
   
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

            { !type &&
              <EditProfile firstName={firstName} lastName={lastName} birthdate={birthdate} providerID={providerID} navigation={navigation} fromChild={fromChild}/>
            }
            { type &&
              <EditCredentials type={type} email={email} contact={contact} providerID={providerID} navigation={navigation} fromChild={fromChild}/>
            }


            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => onClose()}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
      <ScrollView style={{marginVertical: -10}}>
        <View style={styles.holder}>
          <Image style={styles.icon} source={image} />
          <TouchableWithoutFeedback onPress={() => pickImage()}>
            <View style={styles.editicon}>
              <MaterialCommunityIcons name={'camera-flip'} size={26} style={{color:'#9C54D5'}}/>
            </View>
          </TouchableWithoutFeedback>
        </View>
        
        <Text style={styles.nameheader}>Name</Text>
        <View style={styles.nameholder}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <TouchableWithoutFeedback onPress={() => onEdit()}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{position:'absolute', right:0, bottom:0, color:'#9C54D5', marginTop:4}}/>
          </TouchableWithoutFeedback>
        </View>


        <Text style={styles.subheader}>E-mail Address</Text>
        <View style={styles.subholder}>
          <Text style={styles.subcontent}>{email}</Text>
          <TouchableWithoutFeedback onPress={() => onCredentials("Email")}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: -20}}/>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.subheader}>Contact Number</Text>
        <View style={styles.subholder}>
          <Text style={styles.subcontent}>{contactHandler(contact)}</Text>
          <TouchableWithoutFeedback onPress={() => onCredentials("Contact Number")}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: -20}}/>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.subheader}>Birthday</Text>
        <View style={styles.subholder}>
          <Text style={styles.subcontent}>{birthdate}</Text>
          <TouchableWithoutFeedback onPress={() => onEdit()}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: -20}}/>
          </TouchableWithoutFeedback>
        </View>

        <Text style={styles.subheader}>Address</Text>
        <View style={styles.subholder}>
          <Text numberOfLines={2} style={[styles.subcontent,{fontSize:15}]}>{addressHandler(address)}</Text>
          <TouchableWithoutFeedback onPress={() => navigation.navigate( 'Address', {addressID: address.addressID} )}>
            <MaterialCommunityIcons name={'pencil-outline'} size={26} style={{color:'#9C54D5', marginTop: -20}}/>
          </TouchableWithoutFeedback>
        </View>

        { agencyId && 
        <View>
          <Text style={styles.subheader}>Agency</Text>
          <Text style={styles.subcontent}>{agencyId}</Text>
        </View>
        }

        <TouchableWithoutFeedback onPress={() => onCredentials("Password")}>
            <View style={styles.changepw}>
              <Text style={[styles.content, {color: '#462964'}]}>Change Password</Text>
            </View>
        </TouchableWithoutFeedback>
         
      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5, marginBottom:42}}/>
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
    marginTop: 40,
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
    marginBottom: 10
  },
  name: {
    fontFamily: 'notosans',
    fontSize: 18,
    fontVariant: ['small-caps'],
  },

  subheader: {
    fontSize: 14,
    fontFamily: 'quicksand-medium',
    letterSpacing: -0.5,
    marginTop: 23,
    marginLeft: 30
  },
  subcontent: {
    fontSize: 17,
    fontFamily: 'notosans-light',
    letterSpacing: -0.5,
    marginLeft: 30,
    width: '75%'
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
    marginTop: 30,
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


  newHolder: {
    width: 200, 
    marginTop: 30,
    alignSelf: 'center',
  },
  newIcon: {
    width: 200, 
    height: 200, 
    borderRadius: 200/2,    
  },
  newEdit: {
    marginLeft: 150,
    marginTop: -60,
    borderRadius: 40/2,
    height: 40,
    width: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: {
    fontFamily: 'notosans',
    fontSize: 24,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    alignSelf: 'center',
    marginTop: '26%'
  },
});