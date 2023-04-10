import { StyleSheet, View, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

import Notifications from '../screens/options/notifs/notifs.comp';
import History from '../screens/options/history/history.comp';
import Options from '../screens/options/options/options.comp';
import DashStack from './dash-stack';

import SeekerServices from '../services/user/seeker-services';
import { getImageURL } from '../utils/getImageURL';
import { getUserID } from '../utils/getUserID';

const Stack = createBottomTabNavigator();


export default function HomeStack({ navigation }) {
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
      backgroundColor: '#F9F9F9',
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
  })


  return (
      <Stack.Navigator initialRouteName='DashStack' 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'DashStack') {
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'book-clock' : 'book-clock-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell-outline';
            } else if (route.name === 'Options') {
              iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={30}/>;
          },
          tabBarActiveTintColor: '#9C54D5',
          tabBarInactiveTintColor: '#2F2D2E',

          tabBarStyle: { height: 70, backgroundColor: '#FFFFFF' },
          tabBarLabelStyle: { display: "none" },
        })}
      >

        <Stack.Screen 
          name='DashStack' 
          component={DashStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='History' 
          component={History}
          options={() =>  header }
        />

        <Stack.Screen 
          name='Notifications' 
          component={Notifications}
          options={() =>  header }
        />

        <Stack.Screen 
          name='Options' 
          component={Options}
          options={() =>  header }
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