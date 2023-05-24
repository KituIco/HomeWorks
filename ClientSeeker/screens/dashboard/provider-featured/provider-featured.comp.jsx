import { ScrollView, View } from 'react-native';

import Listing from '../../../components/serviceListing';
import ListHeader from '../../../components/listheader';

import styles from './provider-featured.style';
import hook from './provider-featured.hook';

export default function ProviderFeatured({ navigation }) {
  const { featured } = hook();

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF', flex:1}}>
      <ListHeader title={"Featured"}/>
      <ScrollView>
        <View style={styles.container}>
          <Listing listings={featured} navigation={navigation}/>
        </View>
      </ScrollView>
  </View>
  );
}