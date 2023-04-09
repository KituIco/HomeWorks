import { StyleSheet, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';

import Dashboard from '../screens/dashboard/dashboard/dashboard.comp';
import ServiceList from '../screens/dashboard/services-list/services-list.comp';
import ProviderFeatured from '../screens/dashboard/provider-featured/provider-featured.comp';
import ProviderExplore from '../screens/dashboard/provider-explore/provider-explore.comp';

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
      backgroundColor: '#EFEFEF',
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
          backgroundColor: '#EFEFEF',
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
      name='ServiceList' 
      component={ServiceList}
      options={() => header}
    />

    <Stack.Screen 
      name='ProviderExplore' 
      component={ProviderExplore}
      options={() => header}
    />

    <Stack.Screen 
      name='ProviderFeatured' 
      component={ProviderFeatured}
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