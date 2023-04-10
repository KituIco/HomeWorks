import { createStackNavigator } from '@react-navigation/stack';

import SettleSpecs from '../screens/transaction/booking-chat/booking-chat.comp';
import FinalSpecs from '../screens/transaction/booking-specs/booking-specs.comp';

const Stack = createStackNavigator();


export default function MatchStack({ route }) {
  const { typeName, icon, address, specsID } = route.params;

  const header = {
    headerTransparent: true,
    headerStyle: {
      height: 100,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: {
      display: "none"
    },
    headerLeft: null
  }

  return (
      <Stack.Navigator initialRouteName='SettleSpecs' >

        <Stack.Screen 
          name='SettleSpecs' 
          component={SettleSpecs}
          initialParams={{ typeName, icon, address, specsID }}
          options={() => header}
        />

        <Stack.Screen 
          name='FinalSpecs' 
          component={FinalSpecs}
          options={() => header}
        />

      </Stack.Navigator>
  );
}