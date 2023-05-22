import { View, Text, ScrollView, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Header from '../../../components/transactheader';
import Next from '../../../components/transactnext';
import Loading from '../../../hooks/loading';

import styles from './request-form.style';
import hook from './request-form.hook';


export default function RequestForm({ route, navigation }) {
  const {
    typeName, icon, waiting, specsDesc, image1, image2, image3, image4, 
    onChangeText, pickImage, removeImage, onSubmit,
  } = hook( navigation, route );
  
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
      <Next title={'Submit Request Form'}/>
    </View>
  );
}