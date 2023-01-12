import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import HomeStack from './homeStack';
import ProfileStack from './profileStack';
import TransactStack from './transactStack';

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
          name='TransactStack' 
          component={TransactStack}
          options={{ headerShown: false }}
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