import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Dashboard from '../screens/dashboard';
import Requests from '../screens/requests';

const Stack = createStackNavigator();

export default function DashStack({ navigation }) {

  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#000000",
    headerTitleStyle: {
      display: "none"
    },
  }

  return (
    <Stack.Navigator initialRouteName='Dashboard' >

      <Stack.Screen 
        name='Dashboard' 
        component={Dashboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='Requests' 
        component={Requests}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
