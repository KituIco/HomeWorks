import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView, Modal, Alert, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

import { dateHandler } from '../../utils/dateHandler';
import { contactHandler } from '../../utils/contactHandler';
import DatePicker from 'react-native-modern-datepicker';

import SeekerServices from '../../services/user/seeker-services';
import ImageService from '../../services/image/image-services';
import Loading from '../../hooks/loading';

const screenHeight = Dimensions.get('window').height;

async function onSubmit( props, data ) {
  try {
    let res = await ImageService.uploadFile(data.urlDp)
    data['seekerDp'] = res;
    delete data['urlDp'];
      
    await SeekerServices.createSeeker(data);
    props.navigation.dispatch(StackActions.popToTop());
    props.navigation.replace('HomeStack');

  } catch (err) {
    Alert.alert('Registration Warning', err, [ {text: 'OK'} ]);
    throw err;
  }
}

export default function Credentials( props ) {
  const firstname = props.route.params.firstname;
  const lastname = props.route.params.lastname;
  const mail = props.route.params.mail;
  const password = props.route.params.password;

  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameCHK, setUsernameCHK] = useState();
  const [contactCHK, setContactCHK] = useState();
  const [birthdayCHK, setBirthdayCHK] = useState();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImage();
  };
  
  const onOpen = () => {
    onCheck('birthday');
    setOpen(!open);
  }

  const onRegister = () => {
    if(new Set([usernameCHK, contactCHK, birthdayCHK]).has(styles.warning) || !usernameCHK || !contactCHK || !birthdayCHK ){
      Alert.alert('Check your Inputs', 
        'Valid inputs have input boxes with light green border.', [
        {text: 'OK'},
      ]);
    } 
    
    else {
      setLoading(true);
      onSubmit(props, {
        email: mail,
        password: password,
        firstName: firstname,
        lastName: lastname,
        username: username,
        phoneNumber: contact,
        birthdate: dateHandler(birthday),
        urlDp: image,
      }).catch(() => setLoading(false))
    }
  }

  const onCheck = (type) => {
    let numRegex = new RegExp(/^\+639[0-9]{9}/);
    let nameRegex = new RegExp(/^[a-zA-Z0-9_\-]{3,25}$/);
    if (type == 'username') setUsernameCHK( nameRegex.test(username) ? styles.accepted : styles.warning);
    else if (type == 'contact') setContactCHK( numRegex.test(contact) ? styles.accepted : styles.warning);
    else if (type == 'birthday') setBirthdayCHK( birthday ? styles.accepted : styles.warning);
  }

  return (
    <View style={{flex:1, backgroundColor: '#E9E9E9'}}>
    <View style={{width:'100%', height:40, backgroundColor: '#E9E9E9'}}/>
    { loading && <Loading/> }
    
    <ScrollView style={{width: '100%', backgroundColor: '#E9E9E9'}}>
      
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>Hello, {firstname} {lastname}!</Text>
        <Text style={styles.subheading}>Fill up the fields below to complete the creation of your account.</Text>

        <View style={[styles.textbox, usernameCHK]}>
          <TextInput style={styles.input} onChangeText={setUsername} value={username} placeholder="Username" onBlur={() => onCheck('username')}/>
        </View>
        <View style={[styles.textbox, contactCHK]}>
          <TextInput numberOfLines={1} style={styles.input} onChangeText={setContact} value={contactHandler(contact)} placeholder="Contact Number"
            onFocus={() => { if(!contact) setContact('+63') }} onBlur={() => { onCheck('contact'); if(contact == '+63' || contact == '+6') setContact('')} }/>
        </View>
        <TouchableWithoutFeedback onPress={() => onOpen()}>
          <View style={[styles.textbox, birthdayCHK]}>
            { !birthday && <Text style={[styles.input,{color:'#A0A0A0'}]}>Birthday</Text>}
            { birthday && <Text style={styles.input}>{dateHandler(birthday)}</Text>}
          </View>
        </TouchableWithoutFeedback>

        <Modal visible={open} transparent={true} animationType='slide'>
          <View style={styles.centered}>
            <View style={styles.modal}>
              <DatePicker mode='calendar' selected={birthday} onDateChange={setBirthday}/>
              <TouchableWithoutFeedback onPress= {() => onOpen()}>
                <Text style={styles.enter}>Enter Date</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Modal>

        <Text style={styles.govID}>Diplay Picture (Optional)</Text>
        { !image &&
        <TouchableWithoutFeedback onPress={() => pickImage()}>
          <View style={styles.uploader}>
            <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
            <Text style={styles.title}><Text style={{color:'#9C54D5', fontFamily:'quicksand-bold'}}>Click to Upload</Text> your Picture.</Text>
            <Text style={styles.subtitle}>this is an optional field</Text>
          </View>
        </TouchableWithoutFeedback>
        }

        { image &&
        <View style={styles.holder}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableWithoutFeedback onPress={() => removeImage()}>
            <View style={styles.close}>
              <MaterialCommunityIcons name={'close-box'} size={20} color={'#9C54D5'}/> 
            </View>
          </TouchableWithoutFeedback>
        </View>
        }
        
        <TouchableWithoutFeedback onPress= {() => onRegister() }>
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.4 }} end={{ x:0, y:0 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:0, y:0.8 }} style={styles.button}>
              <Text style={styles.register}>Submit Profile</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '15%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },

  govID:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 20
  },
  uploader: {
    height: screenHeight/4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 15,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 12,
    marginTop: -2,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 42,
    width: 320,
    marginTop: 40,
    justifyContent:'center',
    
  },
  button: {
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    alignItems: 'center',
    width: 320,
  },
  register: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  login: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    color: '#1E1E1E',
    marginBottom: 30
  },

  textbox: {
    height: 52,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5,
    maxWidth: 280,
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
    padding: 10
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    marginTop:-34, 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5
  },

  holder: {
    width: 200, 
    alignSelf: 'center',
    marginTop: 6,
  },
  image: {
    width: 200, 
    height: 200, 
    borderRadius: 200/2,    
  },
  close: {
    marginLeft: 160,
    marginTop: -40,
    borderRadius: 36/2,
    height: 36,
    width: 36,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center'
  },

  warning: {
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  accepted: {
    borderColor: '#00FF00',
    borderWidth: 1,
  },

  
});