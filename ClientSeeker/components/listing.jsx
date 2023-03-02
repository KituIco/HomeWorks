import { StyleSheet, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function Listing( props ) {
  const providers = props.listings
  let listing = styles.lists
  let sectioning = styles.sections

  if (props.solo) {
    listing = styles.sololist
    sectioning = styles.solosection
  }

  const providersList = data => {
    return (
      <View style={listing} key={data.key}>
        <Image style={styles.image} source={data.src} />
        <View style={styles.details}>

          <View style={styles.detailstop}>
            <Text style={styles.names}>{data.key}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
              <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
              <Text style={styles.ratings}>{data.ratings}</Text>
            </View>
          </View>
          
          <Text style={styles.location}>{data.location}</Text>

          <View style={styles.detailsbot}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.tag}>
              <Text style={styles.serve}>{data.service}</Text>
            </LinearGradient>
            
            { !props.solo && <Text style={styles.price}>{data.price}</Text> }
            { props.solo && 
              <Text style={[styles.price,{textDecorationLine: 'underline'}]}>View Provider</Text> 
            }
          </View>
          
        </View>
      </View>
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
    padding: 6,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: "#323941",
    margin: 8
  },
  sololist: {
    flexDirection: 'row',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 10
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

  location: {
    fontFamily: 'quicksand',
    fontSize: 12,
    marginTop: -5,
    marginBottom: 16
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
    color: "#F9F9F9",
    fontFamily: 'lexend-light',
    fontSize: 12
  }
});