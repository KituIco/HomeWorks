import { View, Text, Image, ScrollView, TextInput, TouchableWithoutFeedback, RefreshControl, Modal } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/messageListing';
import Header from '../../../components/transactheader';
import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './booking-chat.style';
import hook from './booking-chat.hook';

export default function BookingChat({ route, navigation }) {
  const {
    typeName, icon, loading, value, providerName, providerDP, providerID, refreshing, messages, images, scrollViewRef, open, viewer,
    onChangeText, onSendMsg, onDecline, onRefresh, pickImages, sendImages, viewImages, removeImages, setOpen,
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <Listing listings={messages} userID={providerID} />
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

        <View style={styles.footer}>
          { !images &&
          <View style={styles.message}> 
            <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
              placeholder='Text Message'/>
            
            { value &&
              <TouchableWithoutFeedback onPress={() => onSendMsg()}>
                 <MaterialCommunityIcons name={'send'} color={'#9C54D5'} size={24}/>
              </TouchableWithoutFeedback>
            }

            { !value &&
              <TouchableWithoutFeedback onPress={() => pickImages()}>
                 <MaterialCommunityIcons name={'camera-image'} color={'#9C54D5'} size={24} style={{marginRight:4}}/>
              </TouchableWithoutFeedback>
            }
            
          </View>
          }
          

          { images &&
          <View style={{flexDirection:'row', justifyContent: 'space-between',}}>
            <TouchableWithoutFeedback onPress={() => viewImages()}>
              <View style={styles.viewImage}> 
                <Text style={styles.viewFont}>View Selected Images</Text>
                <Text style={styles.viewSubscript}> Max 4</Text>
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => sendImages()}>
              <View style={styles.sendImage}> 

                <MaterialCommunityIcons name={'send'} color={'#FFFFFF'} size={24}/>
               
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => removeImages()}>
              <View style={styles.removeImage}> 

                <MaterialCommunityIcons name={'cancel'} color={'red'} size={24}/>
               
              </View>
            </TouchableWithoutFeedback>

            <Modal visible={open} transparent={true}>
              <TouchableWithoutFeedback onPress={() => setOpen(false)}>
                <View style={styles.close}>
                  <MaterialCommunityIcons name={'close-box'} size={24} color={'#000'}/>
                </View>
              </TouchableWithoutFeedback>
              <ImageViewer imageUrls={viewer}/>
            </Modal>

          </View>
          }
        </View>
      </View> 
        
    </View>
  );
}
