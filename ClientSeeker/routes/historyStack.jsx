import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Complete from '../screens/transaction/complete';

const Stack = createStackNavigator();


export default function HistoryStack({ route }) {
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
      <Stack.Navigator initialRouteName='Complete' >

        <Stack.Screen 
          name='Complete' 
          component={Complete}
          initialParams={{ service: service, icon: icon}}
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