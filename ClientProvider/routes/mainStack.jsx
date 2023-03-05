import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import HomeStack from './homeStack.jsx';
import AuthStack from './authStack..jsx';

const Stack = createStackNavigator();

export default function Navigator( props ) {
  const [initialRoute, setInitialRoute] = useState(props.route);

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

