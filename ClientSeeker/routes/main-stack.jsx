import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './home-stack';
import ProfileStack from './profile-stack';
import RequestStack from './request-stack';
import MatchStack from './match-stack';
import ServeStack from './serve-stack';
import ProviderStack from './provider-stack';
import AuthStack from './auth-stack';

const Stack = createStackNavigator();

export default function Navigator( props ) {
  let initialRoute = props.route;
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>

        <Stack.Screen 
          name='HomeStack' 
          component={HomeStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='ProfileStack' 
          component={ProfileStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='RequestStack' 
          component={RequestStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='MatchStack' 
          component={MatchStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='ServeStack' 
          component={ServeStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='ProviderStack' 
          component={ProviderStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='AuthStack' 
          component={AuthStack}
          options={{  headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}