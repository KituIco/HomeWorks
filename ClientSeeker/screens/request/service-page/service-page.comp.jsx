import { View, Image, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import Listing from '../../../components/reviewListing';
import Loading from '../../../hooks/loading';

import styles from './service-page.style';
import hook from './service-page.hook';

export default function ServicePage({ navigation, route }) {
  const {
    loading, location, cover, name, type, star1, star2, star3, star4, star5, 
    count, average, enabled, cost, changeCost, changeEnabled,
  } = hook({ route });

  const p1 = Math.max(star1/count*90,6).toFixed(2)+"%";
  const p2 = Math.max(star2/count*90,6).toFixed(2)+"%";
  const p3 = Math.max(star3/count*90,6).toFixed(2)+"%";
  const p4 = Math.max(star4/count*90,6).toFixed(2)+"%";
  const p5 = Math.max(star5/count*90,6).toFixed(2)+"%";
  const props = { p1, p2, p3, p4, p5 };

  const styling = styles({ props });
  const { serviceID } = route.params;

  if (loading)
    return <Loading/>
  
  return (
    <View style={styling.container}>
      <View style={{width:'100%', height:260}}>
        <Image source={cover} style={styling.cover}/>
      </View>

      <View style={{marginHorizontal:20, marginTop:50}}>
        <View style={{flexDirection:'row'}}>
          <View style={{width:'60%', marginBottom:-6,}}>
            <Text style={styling.name} numberOfLines={1}>{name}</Text>
            <Text style={styling.location} numberOfLines={2}>{location}</Text>
          </View>

          <View style={{position:'absolute', right:0, alignSelf:'center'}}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styling.gradient}>
              <Text style={styling.type}>{type}</Text>
            </LinearGradient>
          </View>
        </View>

        { average &&
          <View style={{flexDirection:'row', marginTop:36, justifyContent:'space-between'}}>
            <View style={styling.leftRate}>
              <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name={'star'} size={40} color="#9C54D5"/>
                <Text style={styling.ratings}>{parseFloat(average).toFixed(1)}</Text>
              </View>
              <Text style={styling.review}>{count} reviews</Text>
            </View>

            <View style={styling.rightRate}>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>5</Text>
                <View style={styling.basebar}/>
                <View style={styling.bar5}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>4</Text>
                <View style={styling.basebar}/>
                <View style={styling.bar4}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>3</Text>
                <View style={styling.basebar}/>
                <View style={styling.bar3}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>2</Text>
                <View style={styling.basebar}/>
                <View style={styling.bar2}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>1</Text>
                <View style={styling.basebar}/>
                <View style={styling.bar1}/>
              </View>
            </View>
          </View>
        }

        { !average &&
          <View style={{flexDirection:'row', marginTop:36, justifyContent:'space-between'}}>
            <View style={styling.leftRate}>
              <View style={{flexDirection:'row', marginVertical:-6}}>
                <Text style={[styling.ratings,{color:"#9C54D5"}]}>New</Text>
              </View>
              <Text style={styling.review}>No reviews yet</Text>
            </View>

            <View style={styling.rightRate}>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>5</Text>
                <View style={styling.basebar}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>4</Text>
                <View style={styling.basebar}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>3</Text>
                <View style={styling.basebar}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>2</Text>
                <View style={styling.basebar}/>
              </View>
              <View style={{flexDirection:'row', width:'90%'}}>
                <Text style={styling.number}>1</Text>
                <View style={styling.basebar}/>
              </View>
            </View>
          </View>
        }
      </View>

      { average &&
        <View style={{marginTop:36, flex:1}}>
          <Text style={styling.subheader}>Reviews</Text>

          <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)'  ]} start={{ x:0, y:0 }} end={{ x:0, y:1 }} style={{height:16, zIndex:5, marginTop:6}}/>
          <Listing serviceID={serviceID}/>
          <LinearGradient colors={['rgba(255,255,255,1)','rgba(255,255,255,0)']} start={{ x:0, y:1 }} end={{ x:0, y:0 }} style={{height:16, zIndex:5, marginBottom:14}}/>
        </View>
      }

      { !average &&
        <View style={{marginHorizontal:20, marginTop:36, alignItems:'center', flex:1, justifyContent:'center', paddingBottom:90}}>
          <MaterialCommunityIcons name={'progress-wrench'} size={150} color="#9C54D5"/>
          <Text style={styling.title}>This Service has no Reviews yet.</Text>
          <Text style={styling.subtitle}>Reviews will be reflected as soon as they are submitted. </Text>
        </View>
      }
    </View>
  );
}
