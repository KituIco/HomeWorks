import { StyleSheet, View, Text, Animated, Easing, Alert, Image, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { getRecommendations } from '../utils/get-recommendations';

const screenWidth = Dimensions.get('window').width;

export default function Listing( props ) {
  const { latitude, longitude, search } = props;

  const [services, setServices] = useState([])
  const [done, setDone] = useState(false);
  const [page, setPage] = useState(0);

  let color = ['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)'];
  let navigateTo = async(data) => {
    data['minServiceCost'] = data.initialCost;
    props.navigation.navigate('RequestStack', { data });
  } 

  useEffect(() => {
    setDone(false)
    setServices([])
  }, [search]);

  const fetchServices = async() => {
    if(!done){
      if(longitude) {
        let newServices = await getRecommendations(latitude, longitude, page, 5);
        if (newServices.length < 5) setDone(true);
        setPage(page+1);
        setServices([...services,...newServices]);
      }
      if(search) {
        setDone(true);
      }
    }
  }

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(
      spinValue, {
        toValue: 1, duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
    })
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1], 
    outputRange: ['0deg', '360deg']
  })


  const renderList = ({ item }) => {
    return (
      <LinearGradient colors={color} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={item.serviceID}>
      <TouchableWithoutFeedback onPress={() => navigateTo(item)}>
      <View style={styles.lists}>
        { item.src.uri && <Image style={styles.image} source={item.src} />}
        { item.src.uri && <View style={styles.minicon}><MaterialCommunityIcons name={item.icon} size={20} color={'#000000'}/></View>}
        { !item.src.uri && <MaterialCommunityIcons name={item.icon} size={90} color={'#000000'}/>}
        <View style={styles.details}>

          <View style={styles.detailstop}>
            <Text style={styles.names}>{item.name}</Text>
            { item.serviceRating &&
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
              <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
              <Text style={styles.ratings}>{parseFloat(item.serviceRating).toFixed(1)}</Text> 
            </View>
            }
            { !item.serviceRating && <Text style={styles.unrated}>New</Text> }
          </View>
          
          <Text numberOfLines={1} style={styles.location}>{item.location}</Text>

          <View style={styles.detailsbot}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.tag}>
              <Text style={styles.serve}>{item.typeName}</Text>
            </LinearGradient>

            <Text style={styles.price}>min Php <Text style={{fontFamily: 'quicksand-medium',}}>{parseFloat(item.initialCost).toFixed(2)}</Text></Text>
          </View>
          
        </View>
      </View>
      </TouchableWithoutFeedback>
      </LinearGradient>
    );
  };

  return (
    <FlatList 
      data={services} 
      keyExtractor={service => service.servicesID}
      renderItem={renderList}
      style={{marginVertical:1, paddingVertical:20, paddingHorizontal:8}}
      ListFooterComponent={ 
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom:30, marginTop:12,}}>
          { !done &&
          <Animated.View style={{transform:[{rotate:spin}]}}>
            <MaterialCommunityIcons name={'loading'} size={30} color={'#9C54D5'}/>
          </Animated.View>
          }
          { done &&
          <Text style={{fontFamily:'quicksand', fontSize:12, marginTop:6, marginBottom:10, letterSpacing:-0.5, lineHeight:13, color:"#9D54C5"}}> end of list~ </Text>
          }
        </View>          
        }
      onEndReached={fetchServices}
      onEndReachedThreshold={0.1}
      >
    </FlatList>
  )
}

const styles = StyleSheet.create({
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
});