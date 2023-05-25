import { ScrollView, View } from 'react-native';

import Listing from '../../../components/serviceFlatlist';
import ListHeader from '../../../components/listheader';

import styles from './provider-featured.style';
import hook from './provider-featured.hook';

export default function ProviderFeatured({ navigation, route }) {
  const { latitude, longitude } = hook({ route });

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF', flex:1}}>
      <ListHeader title={"Featured"}/>
        <View style={styles.container}>
          { longitude &&
            <Listing latitude={latitude} longitude={longitude} navigation={navigation}/>
          }
          
        </View>
    </View>
  );
}