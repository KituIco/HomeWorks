import React, {useState,} from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import Header from '../../components/transactheader';
import Next from '../../components/transactnext';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function InitSpecs({ route, navigation }) {
  const { service, icon }= route.params;
  const [value, onChangeText] = React.useState('');

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

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
  
  return (
    <View style={{justifyContent: 'flex-end', flex:1}}>
      <Header service={service} icon={icon} phase={1}/>

      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Initial Service Specs</Text>
        <TextInput multiline numberOfLines={5} onChangeText={text => onChangeText(text)} value={value} style={styles.text}
          placeholder='Help our providers gauge your request by indicating certain specifications of the service you need.'/>

        <Text style={styles.heading}>Supporting Images</Text>


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

      <Next icon={icon} service={service} navigation={navigation} title={'Submit Initial Specs'} screen={'Matching'}/>
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
    // placeholderTextColor: '#888486',
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
  }
});