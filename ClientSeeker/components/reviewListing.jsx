import { StyleSheet, View, Text, Animated, Easing, Alert, Image, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

import ReviewServices from '../services/review/review-services';
import { reviewHelper } from '../utils/review-helper';

export default function Listing( props ) {
  const { serviceID } = props;
  
  const [reviews, setReviews] = useState([])
  const [done, setDone] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    ( async() => {  
      try {
        fetchReviews()
      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
    })();
  }, [props]);

  const fetchReviews = async() => {
    if(!done){
      let { body: newReviews } = await ReviewServices.getServiceReviews(serviceID, page, 3);
      if (newReviews.length < 3) setDone(true);
      setPage(page+1);
      
      for (let i=0; i<newReviews.length; i++) {
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let date = new Date( newReviews[i].dateTimestamp);
        let today = new Date(), yesterday = new Date();
        yesterday.setDate( yesterday.getDate() - 1)

        if (date.toDateString() == today.toDateString()) newReviews[i]['date'] = "Today";
        else if (date.toDateString() == yesterday.toDateString()) newReviews[i]['date'] = "Yesterday";
        else newReviews[i]['date'] = months[date.getMonth()] + " " + date.getDate();
      }
      let updatedReviews = await reviewHelper(newReviews);
      setReviews([...reviews,...updatedReviews]);
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
      <View key={item.reviewId} style={{marginHorizontal:10}}>

        <View flexDirection='row' style={{width:'100%', alignItems:'center', marginBottom:15}}>
          <Image source={item.icon} style={{width:60, height:60, borderRadius:30}} />
          <View style={{marginLeft:10, flex:1}}>
            <Text style={{fontFamily:'notosans-medium', fontSize:16, letterSpacing:-0.5, fontVariant:['small-caps'], lineHeight:16}}>{item.name}</Text>
            <Text style={{fontFamily:'quicksand', fontSize:12, marginBottom:5, letterSpacing:-0.5, lineHeight:13 }}>{item.date}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 7}}>
            <MaterialCommunityIcons name={'star'} size={14} color="#9C54D5"/>
            <Text style={styles.ratings}>{parseFloat(item.rating).toFixed(1)}</Text> 
          </View>
        </View>

        <View style={{marginBottom:36, marginLeft:14, marginRight:20}}>
          <Text style={{fontFamily:'quicksand', fontSize:13, letterSpacing:-0.5, lineHeight:14.5 }}>{item.comment}</Text>
        </View>

      </View>
    );
  };

  return (
    <FlatList 
      data={reviews} 
      keyExtractor={review => review.reviewId}
      renderItem={renderList}
      style={{marginVertical:-15, paddingVertical:20, paddingHorizontal:20}}
      ListFooterComponent={ 
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom:30}}>
          { !done &&
          <Animated.View style={{transform:[{rotate:spin}]}}>
            <MaterialCommunityIcons name={'loading'} size={30} color={'#9C54D5'}/>
          </Animated.View>
          }
          { done &&
          <Text style={{fontFamily:'quicksand', fontSize:12, marginBottom:5, letterSpacing:-0.5, lineHeight:13, color:"#9D54C5"}}> end of reviews~ </Text>
          }
        </View>          
        }
      onEndReached={fetchReviews}
      onEndReachedThreshold={0.1}
      >
    </FlatList>
  )
}

const styles = StyleSheet.create({
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
    fontSize: 19,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  time: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 10,
    alignSelf:'flex-end'
  },
  address: {
    fontFamily: 'quicksand',
    fontSize: 10,
    color: '#323941',
    marginTop: 4,
    lineHeight: 12,
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
  touchable: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  },
  status: {
    fontFamily: 'quicksand', 
    letterSpacing: -0.5, 
    alignSelf:'flex-end', 
    fontSize:13, 
    marginTop:-2
  },
  ratings: {
    fontFamily: 'quicksand-medium',
    fontSize: 14,
    marginLeft: 2
  },
});