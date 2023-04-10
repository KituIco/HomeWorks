import { View, Text, ScrollView, Image, TouchableWithoutFeedback, Alert, Keyboard, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { contactHandler } from '../../../utils/contact-handler';
import { addressHandler } from '../../../utils/address-handler';

import EditCredentials from '../../../components/editCredentials';
import EditProfile from '../../../components/editProfile';
import Loading from '../../../hooks/loading';

import styles from './profile.style';
import hook from './profile.hook';

export default function Profile({ navigation }) {
  const {
    email, birthdate, contact, address, username, firstName, lastName, agencyId, 
    image, processing, loading,isKeyboardVisible, providerID, open, type, newImage,
    onEdit, onClose, onCredentials, fromChild, pickImage, removeImage, onUpload,
  } = hook( navigation );

  if (processing) return <Loading/>

  if (newImage)
  return (
    <View style={styles.container}>
      { loading && <Loading/> }
      <View style={styles.header}>
        <Text numberOfLines={1} style={styles.heading}>Welcome, {username}!</Text>
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
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)']} start={{ x:0, y:0.65 }} 
            end={{ x:0, y:0.98 }} style={[styles.shadow, {marginBottom:0}]}>
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
        <Text numberOfLines={1} style={styles.heading}>Welcome, {username}!</Text>
      </View>
      
      { open && <View style={styles.overlay}/> }
      <Modal visible={open} transparent={true} animationType='slide'>
        <View style={styles.centered}>
          <View style={styles.modal}>

            { !type &&
              <EditProfile firstName={firstName} lastName={lastName} birthdate={birthdate} 
                providerID={providerID} navigation={navigation} fromChild={fromChild}/>
            }
            { type &&
              <EditCredentials type={type} email={email} contact={contact} 
                providerID={providerID} navigation={navigation} fromChild={fromChild}/>
            }


            { !isKeyboardVisible &&
            <TouchableWithoutFeedback onPress= {() => onClose()}>
              <Text style={styles.enter}>CLOSE</Text>
            </TouchableWithoutFeedback>
            }

          </View>
        </View>
      </Modal>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} 
        end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
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
            <MaterialCommunityIcons name={'pencil-outline'} size={26} 
              style={{position:'absolute', right:0, bottom:0, color:'#9C54D5', marginTop:4}}/>
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
          <TouchableWithoutFeedback onPress={() => navigation.navigate( 'ProfileAddress', {addressID: address.addressID} )}>
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
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:1 }} 
        end={{ x:0, y:0 }} style={{height:10, zIndex:5, marginBottom:42}}/>
    </View>
  );
}
