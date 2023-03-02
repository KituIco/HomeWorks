import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Dashboard from '../screens/dashboard';
import Requests from '../screens/requests';
import Details from '../screens/details';
import { useState } from 'react';

const Stack = createStackNavigator();

export default function DashStack({ navigation }) {

  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#9C54D5",
    headerTitleStyle: {
      display: "none"
    },
  }

  const [initialRoute, setInitialRoute] = useState('Dashboard');

  const onChangeRoute = (route) => {
    if (route === 'Dashboard' && initialRoute !== 'Dashboard') {
      setInitialRoute('Dashboard',
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      }));
    }
    else if (route === 'Requests' && initialRoute !== 'Requests') {
      setInitialRoute('Requests');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Requests' }],
      });
    }
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} 
    screenListeners={{
      state: (e) => {
        let length = e.data.state.routes.length;
        onChangeRoute(e.data.state.routes[length-1].name);
      },}}
      screenOptions={{ animationEnabled: false }}>

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

      <Stack.Screen 
        name='Details' 
        component={Details}
        options={() => header}
      />

    </Stack.Navigator>
  );
}
