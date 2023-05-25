import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { View, Text,  ScrollView, Touchable, TouchableWithoutFeedback } from 'react-native';
import { EvilIcons  } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import Listing from '../../../components/serviceListing';
import Header from '../../../components/dashheader';
import Grid  from '../../../components/grid';

import Loading from '../../../hooks/loading';
import Back from '../../../hooks/back';

import styles from './dashboard.style';
import hook from './dashboard.hook';

export default function Dashboard({ navigation }) {
  const {
    processing, services, featured, explore,
  } = hook();

  if (processing) return <Loading/>

  return (
    <ScrollView style={styles.container}>
      <Back navigation={navigation}/>
      <View style={styles.search}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ServicesLook')}>
        <View style={styles.searchbar}>
          <EvilIcons name='search' color='#616161' size={32}/>
          <Text style={styles.searchtext}>Search for services</Text>
        </View>
        </TouchableWithoutFeedback>
      </View>
      

      <View style={styles.sections.services}>
        <Header title={'Service'} screen={'ServiceList'} listings={services} navigation={navigation}/>
        <Grid listings={services.slice(0,6)} navigation={navigation}/>
      </View>
      
      <Header title={'Featured'} screen={'ProviderFeatured'} navigation={navigation}/>
      { featured.length > 0 &&
      <View style={styles.sections}>
        <Listing listings={featured} navigation={navigation}/>
      </View>
      }
      
      { featured.length == 0 &&
      <View style={{alignItems:'center', marginTop:10,}}>
        <MaterialCommunityIcons name={'vector-polyline-remove'} size={80} color={'#9C54D5'}/>
        <Text style={{fontFamily:'lexend', textAlign:'center', lineHeight:14, fontSize:14, marginTop:18,}}>No Featured Providers at the Moment</Text>
        <Text style={{fontFamily:'quicksand', textAlign:'center', lineHeight:11, fontSize:11, marginTop:4,}}>Make sure to Allow Location Permission for HomeWorks</Text>
      </View>
      }
      

      {/* <Header title={'Explore'} screen={'ProviderExplore'} navigation={navigation}/>
      <View style={styles.sections}>
        <Listing listings={explore}/>
      </View> */}
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}