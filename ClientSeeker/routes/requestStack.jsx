import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Request from '../screens/transaction/request';
import InitSpecs from '../screens/transaction/initspecs';
import Matching from '../screens/transaction/matching';

const Stack = createStackNavigator();


export default function RequesttStack({ route }) {
  const { data } = route.params;

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
      <Stack.Navigator initialRouteName='Request' >

        <Stack.Screen
          name="Request"
          component={Request}
          initialParams={{ data }}
          options={() => header}
        />

        <Stack.Screen
          name="InitSpecs"
          component={InitSpecs}
          options={() => header}
        />

        <Stack.Screen
          name="Matching"
          component={Matching}
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