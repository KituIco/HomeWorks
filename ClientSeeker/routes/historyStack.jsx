import { createStackNavigator } from '@react-navigation/stack';

import Complete from '../screens/transaction/complete';

const Stack = createStackNavigator();

export default function HistoryStack({ route }) {
  const { reportID, icon, typeName } = route.params;

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
          initialParams={{ reportID, icon, typeName }}
          options={() => header}
        />

      </Stack.Navigator>
  );
}
