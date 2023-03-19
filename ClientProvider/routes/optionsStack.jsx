import { createStackNavigator } from '@react-navigation/stack';

import Options from '../screens/options/options';
import Services from '../screens/options/services';
import Address from '../screens/options/address';

const Stack = createStackNavigator();

export default function OptionsStack() {

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