import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';
import { useEffect, useState } from 'react';

import Dashboard from '../screens/dashboard/dashboard';
import Services from '../screens/dashboard/services';
import Featured from '../screens/dashboard/featured';
import Explore from '../screens/dashboard/explore';

import SeekerServices from '../services/user/seeker-services';
import { getUserID } from '../utils/getUserID';
import { getImageURL } from '../utils/getImageURL';

const Stack = createStackNavigator();

export default function DashStack({ navigation }) {
  const [image, setImage] = useState(require("../assets/default.jpg"));
  const [init, setInit] = useState(0);

  useEffect(() => {
    getUserID().then( userID => {
      if(userID) {
        SeekerServices.getSeeker(userID).then( data => {
          if(data.body.seekerDp)
            setImage({uri : getImageURL(data.body.seekerDp)})
        }).catch(() => navigation.navigate('AuthStack'))
      } else {
        setInit(init+1);
      }
    })
  }, [init]);

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