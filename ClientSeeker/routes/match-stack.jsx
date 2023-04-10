import { createStackNavigator } from '@react-navigation/stack';

import BookingChat from '../screens/transaction/booking-chat/booking-chat.comp';
import BookingSpecs from '../screens/transaction/booking-specs/booking-specs.comp';

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
      <Stack.Navigator initialRouteName='BookingChat' >

        <Stack.Screen 
          name='BookingChat' 
          component={BookingChat}
          initialParams={{ typeName, icon, address, specsID }}
          options={() => header}
        />

        <Stack.Screen 
          name='BookingSpecs' 
          component={BookingSpecs}
          options={() => header}
        />

      </Stack.Navigator>
  );
}