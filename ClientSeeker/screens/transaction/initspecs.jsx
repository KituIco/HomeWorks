import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import ServiceSpecsServices from '../../services/service-specs/service-specs-services';
import ImageService from '../../services/image/image-services';
import { getUserID } from '../../utils/getUserID';

import Header from '../../components/transactheader';
import Next from '../../components/transactnext';
import Loading from '../../hooks/loading';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function InitSpecs({ route, navigation }) {
  const { typeID, addressID, typeName, icon, minServiceCost, location } = route.params;
  const [seekerID, setSeekerID] = useState('');
  const [waiting,setWaiting] = useState(false);
  const [specsDesc, onChangeText] = useState('');

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  useEffect(() => {
    ( async() => {
      setSeekerID(await getUserID())
    })();
  }, []);

  const pickImage = async (number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      if(number==1) setImage1(result.assets[0].uri);
      if(number==2) setImage2(result.assets[0].uri);
      if(number==3) setImage3(result.assets[0].uri);
      if(number==4) setImage4(result.assets[0].uri);
    }
  };

  const removeImage = (number) => {
    if(number<=1) setImage1(image2);
    if(number<=2) setImage2(image3);
    if(number<=3) setImage3(image4);
    if(number<=4) setImage4();
  };

  const onSubmit = async() => {
    setWaiting(true);
    try {
      let images = [];
      if(image1) images.push(await ImageService.uploadFile(image1));
      if(image2) images.push(await ImageService.uploadFile(image2));
      if(image3) images.push(await ImageService.uploadFile(image3));
      if(image4) images.push(await ImageService.uploadFile(image4));
      images = JSON.stringify(images);
      
      let specsStatus = 1;
      let specsTimeStamp = Date.now();

      let res = await ServiceSpecsServices.createServiceSpecs({
        seekerID, typeID, addressID, specsDesc, images, specsStatus, specsTimeStamp, 
      })
      navigation.navigate('Matching', { specsID:res.body.specsID, icon, typeName, addressID, minServiceCost, location});
    } catch (err) {
      console.log(err);
    }
    
    setWaiting(false);
    
  }
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={typeName} icon={icon} phase={1}/>

      {waiting && <Loading/>}

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Specifications (Required)</Text>
        <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={specsDesc} style={styles.text}
          placeholder='This field is required. Help our providers gauge your request by indicating your service specifications.'/>

        <Text style={styles.heading}>Images (Optional)</Text>


        {!image1 && 
        <TouchableWithoutFeedback onPress={() => pickImage(1)}>
          <View style={styles.uploader}>
            <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
            <Text style={styles.title}><Text style={{color:'#9C54D5', fontFamily:'quicksand-bold'}}>Click to Upload</Text> additional Images.</Text>
            <Text style={styles.subtitle}>maximum of 4 images only</Text>
          </View>
        </TouchableWithoutFeedback>
        }

        <View style={styles.images}>
          
          {image1 && 
          <View style={{width:'49%'}}>
            <Image source={{ uri: image1 }} style={styles.image} />
            <TouchableWithoutFeedback onPress={() => removeImage(1)}>
              <View style={styles.close}>
                <MaterialCommunityIcons name={'close-box'} size={20} color={'#323941'}/> 
              </View>
            </TouchableWithoutFeedback>
          </View>
          }

          {image1 && !image2 &&
          <TouchableWithoutFeedback onPress={() => pickImage(2)}>
            <View style={styles.miniuploader}>
              <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
              <Text style={styles.subtitle}>max of 4 images only</Text>
            </View>
          </TouchableWithoutFeedback>
          }

          {image2 && 
          <View style={{width:'49%'}}>
            <Image source={{ uri: image2 }} style={styles.image} />
            <TouchableWithoutFeedback onPress={() => removeImage(2)}>
              <View style={styles.close}>
                <MaterialCommunityIcons name={'close-box'} size={20} color={'#323941'}/> 
              </View>
            </TouchableWithoutFeedback>
          </View>
          }

          {image2 && !image3 &&
          <TouchableWithoutFeedback onPress={() => pickImage(3)}>
            <View style={styles.miniuploader}>
              <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
              <Text style={styles.subtitle}>max of 4 images only</Text>
            </View>
          </TouchableWithoutFeedback>
          }

          {image3 && 
          <View style={{width:'49%'}}>
            <Image source={{ uri: image3 }} style={styles.image} />
            <TouchableWithoutFeedback onPress={() => removeImage(3)}>
              <View style={styles.close}>
                <MaterialCommunityIcons name={'close-box'} size={20} color={'#323941'}/> 
              </View>
            </TouchableWithoutFeedback>
          </View>
          }

          {image3 && !image4 &&
          <TouchableWithoutFeedback onPress={() => pickImage(4)}>
            <View style={styles.miniuploader}>
              <MaterialCommunityIcons name={'cloud-upload'} size={40}/>
              <Text style={styles.subtitle}>max of 4 images only</Text>
            </View>
          </TouchableWithoutFeedback>
          }

          {image4 && 
          <View style={{width:'49%'}}>
            <Image source={{ uri: image4 }} style={styles.image} />
            <TouchableWithoutFeedback onPress={() => removeImage(4)}>
              <View style={styles.close}>
                <MaterialCommunityIcons name={'close-box'} size={20} color={'#323941'}/> 
              </View>
            </TouchableWithoutFeedback>
          </View>
          }

        </View>
      </ScrollView>

      <View style={styles.holder}>
        <TouchableWithoutFeedback onPress={() => onSubmit()}>
          <View style={styles.ghost}/>
        </TouchableWithoutFeedback>
      </View>

      { !specsDesc && <View style={styles.overlay}/> }
      <Next title={'Submit Initial Specs'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginBottom:-6, 
    backgroundColor: '#F9F9F9',
  },
  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginVertical: 8,
    paddingHorizontal: 20,
  },
  text: {
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    fontFamily: 'quicksand',
    textAlignVertical: 'top',
    letterSpacing: -0.5,
  },

  uploader: {
    height: screenHeight-540,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
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

  images: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  miniuploader: {
    height: screenWidth/2-40,
    width: '49%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: screenWidth/2-40, 
    borderRadius: 4, 
    marginBottom: 10,
  },
  close: {
    marginTop: -(screenWidth/2-35), 
    marginLeft:'85%',
     marginBottom: screenWidth/2-55, 
     backgroundColor: '#9C54D5'
  },

  overlay: {
    backgroundColor: '#E9E9E990',
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 10
  },
  holder: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 5,
    justifyContent: 'center',
  },
  ghost: {
    height: 50,
    zIndex: 5,
    marginHorizontal: 30,
    marginBottom: 8
  }
});