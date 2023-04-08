import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';

import HomeStack from './homeStack';
import ProfileStack from './profileStack';
import RequestStack from './requestStack';
import MatchStack from './matchStack';
import ServeStack from './serveStack';
import HistoryStack from './historyStack';
import AuthStack from './authStack';

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
          name='HistoryStack' 
          component={HistoryStack}
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