import { ScrollView, View } from 'react-native';

import Listing from '../../../components/serviceListing';
import ListHeader from '../../../components/listheader';

import styles from './provider-explore.style';
import hook from './provider-explore.hook';

export default function ProviderExplore() {
  const { explore } = hook();

  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF'}}>
      <ListHeader title={"Explore"}/>
      <ScrollView>
        <View style={styles.container}>
          <Listing listings={explore}/>
        </View>
      </ScrollView>
    </View>
  );
}