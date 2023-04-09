import { ScrollView, View } from 'react-native';

import Listing from '../../../components/serviceListing';
import ListHeader from '../../../components/listheader';

import styles from './provider-featured.style';
import hook from './provider-featured.hook';

export default function ProviderFeatured() {
  const { featured } = hook();

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF',}}>
      <ListHeader title={"Featured"}/>
      <ScrollView>
        <View style={styles.container}>
          <Listing listings={featured}/>
        </View>
      </ScrollView>
  </View>
  );
}