import { View, Text, Image, TouchableWithoutFeedback, TextInput, ScrollView, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { dateHandler } from '../../../utils/dateHandler';
import { contactHandler } from '../../../utils/contactHandler';
import DatePicker from 'react-native-modern-datepicker';

import Loading from '../../../hooks/loading';
import styles from './user-info.style';
import hook from './user-info.hook';

export default function UserInfo({ navigation, route }) {
  const {
    firstname, lastname, username, contact, birthday, usernameCHK, contactCHK, birthdayCHK, open, image, loading, 
    setUsername, setContact, setBirthday, pickImage, removeImage, onOpen, onRegister, onCheck,
  } = hook( navigation, route );

  return (
    <View style={{flex:1, backgroundColor: '#E9E9E9'}}>
    <View style={{width:'100%', height:40, backgroundColor: '#E9E9E9'}}/>
    { loading && <Loading/> }
    
    <ScrollView style={{width: '100%', backgroundColor: '#E9E9E9'}}>
      
      <View style={{alignItems: 'center'}}>
        <Text style={styles.heading}>Hello, {firstname} {lastname}!</Text>
        <Text style={styles.subheading}>Fill up the fields below to complete the creation of your account.</Text>

        <View style={[styles.textbox, usernameCHK]}>
          <TextInput style={styles.input} onChangeText={setUsername} value={username}
            placeholder="Username" onBlur={() => onCheck('username')}/>
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
