import { createStackNavigator } from '@react-navigation/stack';

import Complete from '../screens/transaction/complete';

const Stack = createStackNavigator();

export default function HistoryStack({ route }) {
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
  }

  return (
      <Stack.Navigator initialRouteName='Complete' >

        <Stack.Screen 
          name='Complete' 
          component={Complete}
          initialParams={{ service: service, icon: icon}}
          options={() => header}
        />

      </Stack.Navigator>
  );
}
