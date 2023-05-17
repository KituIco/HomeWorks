import { createStackNavigator } from '@react-navigation/stack';

import Options from '../screens/options/options/options.comp';
import Profile from '../screens/options/profile/profile.comp'
import ProfileAddress from '../screens/options/profile-address/profile-address.comp';
import ServiceList from '../screens/options/service-list/service-list.comp';
import TransactHistory from '../screens/options/transact-history/transact-history.comp';


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
        name='Profile' 
        component={Profile}
        options={() => header}
      />

      <Stack.Screen 
        name='ProfileAddress' 
        component={ProfileAddress}
        options={() => header}
      />

      <Stack.Screen 
        name='ServiceList' 
        component={ServiceList}
        options={() => header}
      />

      <Stack.Screen 
        name='TransactHistory' 
        component={TransactHistory}
        options={() => header}
      />

      
    </Stack.Navigator>
  );
}