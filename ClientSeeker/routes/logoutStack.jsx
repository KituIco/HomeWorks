import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native';

import Homepage from '../screens/homepage';
import Login from '../screens/login';
import Register from '../screens/register';

const Stack = createStackNavigator();

export default function LogoutStack({ navigation }) {
  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTitleStyle: {
      display: "none"
    },
  }

  return (
    <Stack.Navigator initialRouteName='Homepage' >

    <Stack.Screen 
      name='Homepage' 
      component={Homepage}
      options={{ headerShown: false }}
    />

    <Stack.Screen 
      name='Login' 
      component={Login}
      options={() => header}
    />

    <Stack.Screen 
      name='Register' 
      component={Register}
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