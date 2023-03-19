import { createStackNavigator } from '@react-navigation/stack';

import SettleSpecs from '../screens/transaction/settlespecs';
import FinalSpecs from '../screens/transaction/finalspecs';

const Stack = createStackNavigator();


export default function MatchStack({ route }) {
  const { service, icon } = route.params;

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
          initialParams={{ service: service, icon: icon}}
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