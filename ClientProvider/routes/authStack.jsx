import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/authentication/login';
import Register from '../screens/authentication/register';
import BasicInfo from '../screens/authentication/basicinfo';

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
    <Stack.Navigator initialRouteName='Login' >

    <Stack.Screen 
      name='Login' 
      component={Login}
      options={{ headerShown: false }}
    />

    <Stack.Screen 
      name='Register' 
      component={Register}
      options={() => header}
    />

    <Stack.Screen 
      name='BasicInfo' 
      component={BasicInfo}
      options={() => header}
    />
    </Stack.Navigator>
  );
}
