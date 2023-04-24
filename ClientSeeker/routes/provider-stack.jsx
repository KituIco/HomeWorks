import { createStackNavigator } from '@react-navigation/stack';

import TransactionComplete from '../screens/transaction/transaction-complete/transaction-complete.comp';

const Stack = createStackNavigator();

export default function ProviderStack({ route }) {
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
      <Stack.Navigator initialRouteName='TransactionComplete' >

        <Stack.Screen 
          name='TransactionComplete' 
          component={TransactionComplete}
          initialParams={{ reportID, icon, typeName }}
          options={() => header}
        />

      </Stack.Navigator>
  );
}
