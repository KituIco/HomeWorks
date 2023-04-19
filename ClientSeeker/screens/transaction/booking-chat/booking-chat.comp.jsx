import { View, Text, Image, ScrollView, TextInput, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/messageListing';
import Header from '../../../components/transactheader';
import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './booking-chat.style';
import hook from './booking-chat.hook';

export default function BookingChat({ route, navigation }) {
  const {
    typeName, icon, loading, value, providerName, providerDP, providerID, refreshing, messages, scrollViewRef,
    onChangeText, onSendMsg, onDecline, onRefresh, 
  } = hook( navigation, route );

  if (loading) return <View style={{flex:1}}><Loading/></View>
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Back navigation={navigation}/>
      <Header service={typeName} icon={icon} phase={2} compressed={true}/>

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={styles.profileIcon} source={providerDP} />
            <Text style={styles.names}>{providerName}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => onDecline()}>
            <MaterialCommunityIcons name={'close-box'} color={'#9C54D5'} size={24} style={{marginRight:8}}/>
          </TouchableWithoutFeedback>
        </View>

        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:4}}/>
        <ScrollView style={{flex:1, width: '100%'}} 
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <Listing listings={messages} userID={providerID} />
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.footer}>
          <View style={styles.message}> 
            <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
              placeholder='Text Message'/>
            
            { value &&
              <TouchableWithoutFeedback onPress={() => onSendMsg()}>
                 <MaterialCommunityIcons name={'send'} color={'#9C54D5'} size={24}/>
              </TouchableWithoutFeedback>
            }
            
          </View>
        </View>
      </View> 
        
    </View>
  );
}
