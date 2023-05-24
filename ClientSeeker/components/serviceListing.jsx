import { StyleSheet, View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function Listing( props ) {
  const providers = props.listings;
  let listing = styles.lists;
  let shadow = styles.shadow;
  let sectioning = styles.sections;
  let color = ['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)'];
  
  let navigateTo = async(data) => {
    data['minServiceCost'] = data.initialCost;
    props.navigation.navigate('RequestStack', { data });
  } 

  if (props.solo) {
    listing = styles.sololist;
    sectioning = styles.solosection;
    shadow = styles.hide;
    color = ['rgba(0,0,0,0)','rgba(0,0,0,0)'];

    navigateTo = async(data) => {
      props.navigation.navigate('ProviderStack', { screen:'ServicePage', 
            params: { serviceID:data.serviceID } });
    }   
  }

  const providersList = data => {
    return (
      <LinearGradient colors={color} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={shadow} key={data.serviceID}>
      <TouchableWithoutFeedback onPress={() => navigateTo(data)}>
      <View style={listing}>
        { data.src.uri && <Image style={styles.image} source={data.src} />}
        { data.src.uri && <View style={styles.minicon}><MaterialCommunityIcons name={data.icon} size={20} color={'#000000'}/></View>}
        { !data.src.uri && <MaterialCommunityIcons name={data.icon} size={90} color={'#000000'}/>}
        <View style={styles.details}>

          <View style={styles.detailstop}>
            <Text style={styles.names}>{data.name}</Text>
            { data.serviceRating &&
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
              <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
              <Text style={styles.ratings}>{parseFloat(data.serviceRating).toFixed(1)}</Text> 
            </View>
            }
            { !data.serviceRating && <Text style={styles.unrated}>New</Text> }
          </View>
          
          <Text numberOfLines={1} style={styles.location}>{data.location}</Text>

          <View style={styles.detailsbot}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.tag}>
              <Text style={styles.serve}>{data.typeName}</Text>
            </LinearGradient>
            
            { !props.solo && <Text style={styles.price}>min Php <Text style={{fontFamily: 'quicksand-medium',}}>{parseFloat(data.initialCost).toFixed(2)}</Text></Text> }
            { props.solo && 
              <Text style={[styles.price,{textDecorationLine: 'underline'}]}>View Provider</Text> 
            }
          </View>
          
        </View>
      </View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    );
  };

  return (
    <View style={sectioning}>
      <View paddingBottom={10}>
        {providers.map((value, index) => {
          return providersList(value);
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  sections:{
    paddingVertical: 30,
  },
  solosection:{
    paddingTop: 4,
    marginHorizontal: 22,
  },
  lists: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    height: 110,
  },
  shadow: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    marginHorizontal: 8,
    marginVertical: 5,
    height: 112,
    justifyContent: 'center'
  },
  sololist: {
    flexDirection: 'row',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 4
  },
  details: {
    width: screenWidth - 150,
    marginLeft: 10,
    marginRight: 4
  },

  detailstop: {
    marginTop: -2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  detailsbot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  names: {
    fontFamily: 'notosans',
    fontSize: 20,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },
  ratings: {
    fontFamily: 'quicksand-medium',
    fontSize: 14
  },
  unrated: {
    fontFamily: 'quicksand-medium',
    fontSize: 14,
    color: "#9C54D5", 
    alignSelf:'flex-end', 
    paddingBottom:7, 
    letterSpacing:-0.2
  },

  location: {
    fontFamily: 'quicksand',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 16,
    marginRight: 20,
  },
  price: {
    fontFamily: 'quicksand',
    fontSize: 12,
    alignSelf: 'flex-end',
    paddingBottom: 2
  },

  tag: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  serve: {
    color: "#FFFFFF",
    fontFamily: 'lexend-light',
    fontSize: 12
  },
  minicon: {
    marginLeft:-34,
    backgroundColor:'#FFFFFFD0',
    width:30,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:24,
    marginRight: 4,
    marginTop: 56,
    borderWidth: 1
  },
  hide:{}
});