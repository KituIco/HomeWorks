import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { EvilIcons, MaterialCommunityIcons  } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import Grid  from '../components/grid';

const screenWidth = Dimensions.get('window').width;

export default function Dashboard({navigation}) {
  const services = [
    {key: 'Carpentry', icon: 'hammer-screwdriver'},
    {key: 'Car Mechanic', icon: 'car-wrench'},
    {key: 'Plumbing', icon: 'water-pump'},
    {key: 'House Cleaning', icon: 'broom'},
    {key: 'Baby Sitting', icon: 'human-baby-changing-table'},
    {key: 'Electrician', icon: 'power-plug'},
  ]

  const featured = [
    {key: 'Alex Guerrero', location: 'Taguig City', ratings: '4.3', service: 'Car Mechanic', price: 'min Php 420', src: require("../assets/providers/provider-a.png")},
    {key: 'Precious Trinidad', location: 'Los Baños', ratings: '4.6', service: 'House Cleaning', price: 'min Php 360', src: require("../assets/providers/provider-b.png")},
    {key: 'Fe Mercado', location: 'Antipolo', ratings: '4.2', service: 'Laundry', price: 'min Php 330', src: require("../assets/providers/provider-c.png")},
  ]

  const explore = [
    {key: 'Edgardo Dela Cena', location: 'Bacoor City', ratings: '4.8', service: 'Roof Cleaning', price: 'min Php 410', src: require("../assets/providers/provider-d.png")},
    {key: 'Ricardo Pollicar', location: 'Mandaluyong City', ratings: '4.4', service: 'Meal Prep Service', price: 'min Php 300', src: require("../assets/providers/provider-e.png")},
    {key: 'Ced Montenegro', location: 'Manila', ratings: '4.6', service: 'Plumbing', price: 'min Php 350', src: require("../assets/providers/provider-f.png")},
  ]



  const providersList = data => {
    return (
      <View style={styles.lists}>
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
            <Text style={styles.price}>{data.price}</Text>  
          </View>
        </View>

      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.search}>
        <View style={styles.searchbar}>
          <EvilIcons name='search' color='#616161' size={32}/>
          <Text style={styles.searchtext}>Search for services</Text>
        </View>
      </View>
      

      <View style={styles.sections.services}>
        <View style={styles.contentheader}>
          <Text style={styles.contentname} >Services</Text>
          <TouchableWithoutFeedback style={{alignSelf:'flex-end'}} onPress= {() => navigation.navigate('Services')}>
            <Text style={styles.viewall}>View all</Text>
          </TouchableWithoutFeedback>
        </View>

        <Grid listings = {services}/>
      </View>

      <View style={styles.sections}>
        <View style={styles.contentheader}>
          <Text style={styles.contentname}>Featured</Text>
          <TouchableWithoutFeedback style={{alignSelf:'flex-end'}} onPress= {() => navigation.navigate('Featured')}>
            <Text style={styles.viewall}>View all</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.grid}>
          {featured.map((value, index) => {
            return providersList(value);
          })}
        </View>
      </View>

      <View style={styles.sections}>
        <View style={styles.contentheader}>
          <Text style={styles.contentname}>Explore</Text>
          <TouchableWithoutFeedback style={{alignSelf:'flex-end'}} onPress= {() => navigation.navigate('Explore')}>
            <Text style={styles.viewall}>View all</Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.grid} paddingBottom={20}>
          {explore.map((value, index) => {
            return providersList(value);
          })}
        </View>
      </View>
      
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },

  search: {
    height: 40,
    width: "100%",
    backgroundColor: "#E4E4E4",
    alignItems: 'center',
  },
  searchbar:{
    height: 50,
    width: "75%",
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 50,

    flexDirection: 'row',
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 4,
  },
  searchtext:{
    fontFamily: 'montserrat',   
    fontSize: 16,
    marginTop: 2.5,
    marginLeft: 4,
    color: '#616161',
  },


  contentheader: {
    minWidth: "60%",
    flexDirection: 'row',
    justifyContent: "space-between",
    marginHorizontal: 20
  },
  contentname: {
    fontFamily:'quicksand-bold', 
    fontSize: 18, 
    color:"#9C54D5", 
    letterSpacing: -0.5
  },
  viewall: { 
    fontFamily:'quicksand', 
    fontSize: 14, 
    alignSelf:'flex-end', 
    letterSpacing: -0.5 
  },
  
  
  sections:{
    marginVertical: 10,
    paddingBottom: 20,
    services: {
      paddingTop: 38,
      marginVertical: 20,
    }
  },
  contenttext: {
    marginTop: 20,
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  },

  lists: {
    flexDirection: 'row',
    padding: 6,
    borderRadius: 10,
    borderWidth: 0.6,
    borderColor: "#323941",
    margin: 8
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