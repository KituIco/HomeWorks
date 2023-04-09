import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Loading from '../../../hooks/loading';
import styles from './options.style';
import hook from './options.hook';

export default function Options({ navigation }) {
  const {
    name, loading, image, onLogout
  } = hook( navigation );

  if (loading)
    return <Loading/>
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Options</Text>
      </View>

      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:10, zIndex:5}}/>
      <ScrollView style={{marginVertical:-10}}>
        <View style={styles.holder}>
          <Image style={styles.icon} source={ image } />
        </View>
        <Text style={styles.name}>{name}</Text>
        
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
          <View style={styles.options}>
            <MaterialCommunityIcons name={'face-man-profile'} size={36}/>
            <Text style={styles.tabs}>Manage Profile</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('ServiceList')}>
          <View style={styles.options}>
            <MaterialCommunityIcons name={'account-hard-hat'} size={36}/>
            <Text style={styles.tabs}>View Services and Reviews </Text>
          </View>
        </TouchableWithoutFeedback>
        
        <View style={styles.options}>
          <MaterialCommunityIcons name={'book-clock'} size={36}/>
          <Text style={styles.tabs}>Visit Transaction History</Text>
        </View>
        
        <View style={styles.options}>
          <MaterialCommunityIcons name={'chat-question'} size={36}/>
          <Text style={styles.tabs}>Contact Admin</Text>
        </View>

        <TouchableWithoutFeedback>
            <View style={styles.changepw}>
              <Text style={[styles.content, {color: '#462964'}]}>Change Password</Text>
            </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress= {() => onLogout()}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.logout}>
              <Text style={[styles.content, {color: '#FFF'}]}>Log Out</Text>
            </LinearGradient>
          </LinearGradient>
        </TouchableWithoutFeedback>
         
      </ScrollView>
      <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:10, zIndex:5}}/>
      <View style={{height:20}}/>
    </View>
  );
}
