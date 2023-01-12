import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Request from '../screens/request';
import InitSpecs from '../screens/initspecs';
import Matching from '../screens/matching';
import SettleSpecs from '../screens/settlespecs';

const Stack = createStackNavigator();


export default function TransactStack({ route }) {
  const { service } = route.params;

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

  const header2 = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      display: "none"
    },
    headerLeft: null
  }

  return (
      <Stack.Navigator initialRouteName='Request' >

        <Stack.Screen
          name="Request"
          component={Request}
          initialParams={{ service: service }}
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

        <Stack.Screen
          name="SettleSpecs"
          component={SettleSpecs}
          options={() => header2}
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