import { ScrollView, View } from 'react-native';

import ListHeader from '../../../components/listheader';
import Grid from '../../../components/grid';
import hook from './services-list.hook';

export default function ServiceList({ navigation, route }) {
  const { services } = hook( route );
  
  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF'}}>
      <ListHeader title={"Services"}/>
      <ScrollView>
        <View>
          <Grid listings = {services} navigation={navigation}/>
        </View>
      </ScrollView>
    </View>
  );
}