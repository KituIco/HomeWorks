import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import Options from '../screens/options/options';
import Services from '../screens/options/services';
import Address from '../screens/options/address';

const Stack = createStackNavigator();

export default function OptionsStack({ navigation }) {

  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#9C54D5",
    headerTitleStyle: {
      display: "none"
    },
  }

  return (
    <Stack.Navigator initialRouteName='Options' 
      screenOptions={{ animationEnabled: false }}>
        
      <Stack.Screen 
        name='Options' 
        component={Options}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='Address' 
        component={Address}
        options={() => header}
      />

      <Stack.Screen 
        name='Services' 
        component={Services}
        options={() => header}
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