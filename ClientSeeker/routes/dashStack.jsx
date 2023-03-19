import { StyleSheet, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

import Dashboard from '../screens/dashboard/dashboard';
import Services from '../screens/dashboard/services';
import Featured from '../screens/dashboard/featured';
import Explore from '../screens/dashboard/explore';

import SeekerServices from '../services/user/seeker-services';
import { getImageURL } from '../utils/getImageURL';
import { getUserID } from '../utils/getUserID';

const Stack = createStackNavigator();

export default function DashStack({ navigation }) {
  const [image, setImage] = useState(require("../assets/default.jpg"));

  useEffect(() => {
    ( async() => {
      try{
        let userID = await getUserID();
        let data = await SeekerServices.getSeeker(userID);
        if(data.body.seekerDp)
          setImage({uri : getImageURL(data.body.seekerDp)});

      } catch (err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
        navigation.navigate('AuthStack')
      }
    })();
  }, []);

  const header = ({
    headerRight: () => (
      <View style={{flexDirection:'row'}} >
        <TouchableWithoutFeedback onPress= {() => navigation.navigate('ProfileStack')}>
          <Image style={styles.profileIcon} source={image} />
        </TouchableWithoutFeedback>
      </View>
    ),

    headerStyle: {
      height: 110,
      backgroundColor: '#E4E4E4',
    },
    headerTintColor: '#9C54D5',
    headerTitleStyle: {
      display: "none"
    },
  })

  return (
    <Stack.Navigator initialRouteName='Dashboard' >

    <Stack.Screen 
      name='Dashboard' 
      component={Dashboard}
      options={() => ({
        headerLeft: () => (
          <View style={{flexDirection:'row'}} >
            <Image style={styles.dashboardIcon} source={require('../assets/HomeWorks-Icon.png')} />
          </View>
          ),

        headerRight: () => (
          <View style={{flexDirection:'row'}} >
            <TouchableWithoutFeedback onPress= {() => navigation.navigate('ProfileStack')}>
              <Image style={styles.profileIcon} source={image} />
            </TouchableWithoutFeedback>
          </View>
        ),

        headerStyle: {
          backgroundColor: '#E4E4E4',
          height: 110,
        },
        headerTintColor: '#fff',

        headerTitleStyle: {
          fontFamily: 'lexend',
          textTransform:'uppercase',
          fontSize: 24,
          color: '#9C54D5',
          letterSpacing: -1.5
        },
      })}
    />

    <Stack.Screen 
      name='Services' 
      component={Services}
      options={() => header}
    />

    <Stack.Screen 
      name='Explore' 
      component={Explore}
      options={() => header}
    />

    <Stack.Screen 
      name='Featured' 
      component={Featured}
      options={() => header}
    />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  dashboardIcon: {
    width: 30, 
    height: 30, 
    marginLeft:15, 
    marginRight:-5 
  },
  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15
  }
});