import { ScrollView, View } from 'react-native';
import Grid from '../../components/grid';
import ListHeader from '../../components/listheader';

export default function Services( props ) {
  const services = props.route.params.service;
  
  return (
    <View style={{justifyContent: 'flex-end', backgroundColor: '#FFFFFF'}}>
      <ListHeader title={"Services"}/>
      <ScrollView>
        <View>
          <Grid listings = {services} navigation={props.navigation}/>
        </View>
      </ScrollView>
    </View>
  );
}