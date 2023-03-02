import { StyleSheet, View, ScrollView, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

export default function Listing( props ) {
  const services = props.listings;

  const servicesList = data => {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)'  ]} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={data.id}>
        <View style={styles.box}>

          <View style={styles.content}>
            <MaterialCommunityIcons name={data.icon} size={60}/>
            <View style={styles.texts}>
              <View style={styles.top}>
                <Text style={styles.service}>{data.service}</Text>
                <Text style={styles.time}>{data.time}</Text>
              </View>
              <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'>{data.address}</Text>
            </View>
          </View>

          <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Details')}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.details}>View Service Details</Text>
              </LinearGradient>
            </LinearGradient> 
          </TouchableWithoutFeedback>

        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={{marginVertical:16}}>
    {services.map((value, index) => {
      return servicesList(value);
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 160,
    marginVertical: 10,
  },
  box: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  texts: {
    marginLeft: 10,
    flex: 1
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  service: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  time: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 13,
  },
  address: {
    fontFamily: 'quicksand',
    fontSize: 12,
    color: '#323941',
    marginTop: 4
  },

  button: {
    height: 40,
    marginTop: 14,
    borderRadius: 10,
  },
  ledge: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  }
});