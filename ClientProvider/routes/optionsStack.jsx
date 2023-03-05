import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Options from '../screens/options/options';

const Stack = createStackNavigator();

export default function OptionsStack({ navigation }) {

  return (
    <Stack.Navigator initialRouteName='Dashboard' >
      <Stack.Screen 
        name='Options' 
        component={Options}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
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