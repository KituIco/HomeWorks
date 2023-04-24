import { View, Text, Image, ScrollView, TextInput, TouchableWithoutFeedback, RefreshControl, Modal } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/messageListing';
import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './booking-chat.style';
import hook from './booking-chat.hook';


export default function BookingChat({ navigation, route }) {
  const {
    value, loading, seekerName, seekerDP, seekerID, refreshing, messages, scrollViewRef, data, images, open, viewer,
    onChangeText, onDecline, onSendMsg, onRefresh, pickImages, sendImages, viewImages, removeImages, setOpen,
  } = hook( navigation, route );

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
        <TouchableWithoutFeedback onPress={() => navigation.navigate('BookingSpecs', {data})}>
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
        <ScrollView style={{flex:1, width: '100%'}} 
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <Listing listings={messages} userID={seekerID} data={data} navigation={navigation}/>
        </ScrollView>
        <LinearGradient colors={['rgba(0,0,0,0.1)','rgba(0,0,0,0)'  ]} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:4}}/>

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
