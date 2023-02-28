import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Serving from '../screens/transaction/serving';
import Payment from '../screens/transaction/payment';

const Stack = createStackNavigator();


export default function ServeStack({ route }) {
  const { service, icon } = route.params;

  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      display: "none"
    },
  }

  return (
      <Stack.Navigator initialRouteName='Serving' >

        <Stack.Screen 
          name='Serving' 
          component={Serving}
          initialParams={{ service: service, icon: icon}}
          options={() => header}
        />

        <Stack.Screen 
          name='Payment' 
          component={Payment}
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