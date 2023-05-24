import { createStackNavigator } from '@react-navigation/stack';

import RequestAddress from '../screens/request/request-address/request-address.comp';
import RequestForm from '../screens/request/request-form/request-form.comp';
import RequestMatch from '../screens/request/request-match/request-match.comp';

const Stack = createStackNavigator();


export default function RequestStack({ route }) {
  const { data } = route.params;

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
  }


  return (
      <Stack.Navigator initialRouteName='RequestAddress' >

        <Stack.Screen
          name="RequestAddress"
          component={RequestAddress}
          initialParams={{ data }}
          options={() => header}
        />

        <Stack.Screen
          name="RequestForm"
          component={RequestForm}
          options={() => header}
        />

        <Stack.Screen
          name="RequestMatch"
          component={RequestMatch}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
  );
}