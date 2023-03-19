import { createStackNavigator } from '@react-navigation/stack';

import Homepage from '../screens/authentication/homepage';
import Login from '../screens/authentication/login';
import Register from '../screens/authentication/register';
import Credentials from '../screens/authentication/credentials';

const Stack = createStackNavigator();

export default function AuthStack() {
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

    <Stack.Screen 
      name='Credentials' 
      component={Credentials}
      options={() => header}
    />

    </Stack.Navigator>
  );
}
