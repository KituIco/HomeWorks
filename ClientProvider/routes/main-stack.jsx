import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './home-stack';
import AuthStack from './auth-stack';

const Stack = createStackNavigator();

export default function Navigator( props ) {
  let initialRoute = props.route;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} >

        <Stack.Screen 
          name='HomeStack' 
          component={HomeStack}
          options={{ 
            headerShown: false, 
            headerStyle: { backgroundColor: '#FFFFFF'} 
          }}
        />

        <Stack.Screen 
          name='AuthStack' 
          component={AuthStack}
          options={{ 
            headerShown: false, 
            headerStyle: { backgroundColor: '#F9F9F9'} 
          }}
        />

      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

