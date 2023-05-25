import { ScrollView, View } from 'react-native';

import Listing from '../../../components/serviceFlatlist';
import ListHeader from '../../../components/listheader';

import styles from './provider-featured.style';
import hook from './provider-featured.hook';

export default function ProviderFeatured({ navigation }) {
  const { lat, lon } = hook();

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF', flex:1}}>
      <ListHeader title={"Featured"}/>
        <View style={styles.container}>
          { lon &&
            <Listing latitude={lat} longitude={lon} navigation={navigation}/>
          }
          
        </View>
    </View>
  );
}