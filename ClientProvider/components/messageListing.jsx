import { StyleSheet, View, Text, Animated, Easing, TouchableWithoutFeedback, Modal, Alert  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ImageViewer from 'react-native-image-zoom-viewer';
import { getImageURL } from '../utils/get-imageURL';
import { useState } from 'react';

export default function Listing( props ) {
  const messages = props.listings;
  const userID = props.userID;
  
  const navigation = props.navigation;
  const data = props.data;
  
  const [urls, setUrls] = useState();
  const [open, setOpen] = useState(false);
  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue, {
        toValue: 1, duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '360deg']
  })

  const viewImage = async(images) => {
    let links = [];
    for(let i=0; i<images.length; i++) {
      links.push({url : getImageURL(images[i])})
    }

    setUrls(links);
    setOpen(true);
  }

  const closeImage = async() => {
    setUrls();
    setOpen(false);
  }

  const sendAsSpecs = async(message) => {
    Alert.alert('Send as Service Details', 'Do you want to finalize cost and details using this message as service details?', [
      { text: 'Cancel', },
      { text: 'OK',  onPress: () => navigation.navigate('BookingSpecs', {data, message})}
    ]);
  }

  const messagesList = data => {
    if (data.userID == userID) {
      if(!data.message && !data.images)
      return (
        <View key={data.messageID} style={styles.containerSelf}>
          <View style={[styles.backgroundSelf, {padding:10}]}>
            <Animated.View style={{transform:[{rotate:spin}]}}>
              <MaterialCommunityIcons name={'loading'} size={30} color={'#FFFFFF'}/>
            </Animated.View>
          </View>
        </View>
      );

      else if (data.message)
      return (
        
        <View key={data.messageID} style={styles.containerSelf}>
          <TouchableWithoutFeedback onLongPress={() => sendAsSpecs(data.message)}>
            <View style={styles.backgroundSelf}>
              <Text style={styles.textSelf}>{data.message}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
      
      else if (data.images)
      return (
        <View key={data.messageID} style={styles.containerSelf}>
          <TouchableWithoutFeedback onPress={() => viewImage(JSON.parse(data.images))}>
            <View style={styles.mediaBgSelf}>
            <MaterialCommunityIcons name={'folder-multiple-image'} size={26} color={'#FFFFFF'}/>
              <Text style={styles.mediaSelf}>Image Files were Sent.{"\n"}Click here to View.</Text>    
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    

    else {
      if (data.message)
      return (
        <View key={data.messageID} style={styles.containerOther}>
          <TouchableWithoutFeedback onLongPress={() => sendAsSpecs(data.message)}>
            <View style={styles.backgroundOther}>
              <Text style={styles.textOther}>{data.message}</Text>    
            </View>
          </TouchableWithoutFeedback>
        </View>
      );

      else if (data.images)
      return(
        <View key={data.messageID} style={styles.containerOther}>
          <TouchableWithoutFeedback onPress={() => viewImage(JSON.parse(data.images))}>
            <View style={styles.mediaBgOther}>
            <MaterialCommunityIcons name={'folder-multiple-image'} size={26} color={'#000000'}/>
              <Text style={styles.mediaOther}>Image Files were Sent.{"\n"}Click here to View.</Text>    
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    
  };

  return (
    <View style={{marginVertical:16}}>
    {messages.map((value, index) => {
      return messagesList(value);
    })}

      <Modal visible={open} transparent={true}>
        <TouchableWithoutFeedback onPress={() => closeImage()}>
          <View style={styles.close}>
            <MaterialCommunityIcons name={'close-box'} size={24} color={'#000000'}/>
          </View>
        </TouchableWithoutFeedback>
        <ImageViewer imageUrls={urls}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  containerSelf: {
    maxWidth:'70%', 
    alignItems:'flex-start', 
    alignSelf:'flex-end'
  },
  containerOther: {
    maxWidth:'70%', 
    alignItems:'flex-start', 
    alignSelf:'flex-start'
  },

  backgroundSelf: {
    backgroundColor:'#9C54D5', 
    marginBottom:10, 
    padding: 16,
    paddingTop:10,
    borderRadius: 20, 
    marginHorizontal:10 
  },
  backgroundOther: {
    backgroundColor:'#EFEFEF', 
    marginBottom:10, 
    padding: 16,
    paddingTop:10,
    borderRadius: 20, 
    marginHorizontal:10,
  },

  textSelf: {
    color:'#F9F9F9',
    fontFamily:'quicksand',
    fontSize: 16,
    textAlign:'right'
  },
  textOther: {
    color:'#000000',
    fontFamily:'quicksand',
    fontSize: 16,
    textAlign:'left'
  },

  mediaSelf: {
    color:'#F9F9F9',
    fontFamily:'quicksand-light',
    fontSize: 11,
    marginTop: 8,
    letterSpacing: -0.3,
    textAlign: 'center',
  },
  mediaOther: {
    color:'#000000',
    fontFamily:'quicksand-light',
    fontSize: 11,
    marginTop: 8,
    letterSpacing: -0.3,
    textAlign: 'center',
  },

  mediaBgSelf: {
    backgroundColor:'#9C54D5', 
    marginBottom:10, 
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 30,
    borderRadius: 20, 
    marginHorizontal:10,
    justifyContent: 'center',
    alignItems:'center'
  },
  mediaBgOther: {
    backgroundColor:'#EFEFEF', 
    marginBottom:10, 
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 30,
    borderRadius: 20, 
    marginHorizontal:10,
    justifyContent: 'center',
    alignItems:'center'
  },

  close: {
    zIndex: 5,
    position: 'absolute',
    width: 30,
    height: 30, 
    borderRadius: 15,
    backgroundColor: '#9C54D5',
    right: 20,
    top: 20,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});