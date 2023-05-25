import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { EvilIcons  } from '@expo/vector-icons';

import Listing from '../../../components/serviceFlatlist';
import styles from './services-look.style';
import hook from './services-look.hook';

export default function ServicesLook({ navigation }) {
  const { search, value, setValue, setSearch } = hook();

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF', flex:1}}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <View style={{ left:12, width:30, height:30, borderRadius:30, zIndex:-10, alignItems:'center', justifyContent:'center'}}>
              <MaterialCommunityIcons name={'keyboard-backspace'} size={24} color={'#9C54D5'}/>
            </View>
          </TouchableWithoutFeedback>
          
          <View style={styles.message}> 
          <TextInput numberOfLines={1} onChangeText={text => setValue(text)} value={value} style={styles.text}
                placeholder='Search for Services'/>

            { value &&
            <View style={{marginLeft:-28}}>
              <TouchableWithoutFeedback onPress={() => setSearch(value)}>
                 <EvilIcons name='search' color='#9C54D5' size={28}/>
              </TouchableWithoutFeedback>
            </View>  
            }

          </View>
        </View>
        
        <View style={{flex:1}}>
          { search &&
            <Listing search={search} navigation={navigation}/>
          }
        </View>
    </View>
  );
}