import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Profile from '../screens/profile'

const Stack = createStackNavigator();


export default function ProfileStack({ navigation }) {

  return (
      <Stack.Navigator initialRouteName='Profile' >

        <Stack.Screen 
          name='Profile' 
          component={Profile}
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