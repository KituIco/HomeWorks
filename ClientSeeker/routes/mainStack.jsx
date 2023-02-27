import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import HomeStack from './homeStack';
import ProfileStack from './profileStack';
import RequestStack from './requestStack';
import MatchStack from './matchStack';
import ServeStack from './serveStack';
import CompleteStack from './completeStack';
import LogoutStack from './logoutStack';

const Stack = createStackNavigator();


export default function Navigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeStack' >

        <Stack.Screen 
          name='HomeStack' 
          component={HomeStack}
          options={{ 
            headerShown: false, 
            headerStyle: { backgroundColor: '#F2F1F4'} 
          }}
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
          name='CompleteStack' 
          component={CompleteStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='LogoutStack' 
          component={LogoutStack}
          options={{  headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
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