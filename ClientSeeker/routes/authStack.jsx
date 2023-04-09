import { createStackNavigator } from '@react-navigation/stack';

import Homepage from '../screens/authentication/homepage/homepage.comp';
import Login from '../screens/authentication/login/login.comp';
import Register from '../screens/authentication/register/register.comp';
import UserInfo from '../screens/authentication/user-info/user-info.comp';

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
      name='UserInfo' 
      component={UserInfo}
      options={() => header}
    />

    </Stack.Navigator>
  );
}
