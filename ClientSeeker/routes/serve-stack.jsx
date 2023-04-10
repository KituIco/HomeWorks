import { createStackNavigator } from '@react-navigation/stack';

import TransactingServe from '../screens/transaction/transacting-serve/transacting-serve.comp';
import TransactingPayment from '../screens/transaction/transacting-payment/transacting-payment.comp';

const Stack = createStackNavigator();


export default function ServeStack({ route }) {
  const { typeName, icon, reportID } = route.params;

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
      <Stack.Navigator initialRouteName='TransactingServe' >

        <Stack.Screen 
          name='TransactingServe' 
          component={TransactingServe}
          initialParams={{ typeName, icon, reportID }}
          options={() => header}
        />

        <Stack.Screen 
          name='TransactingPayment' 
          component={TransactingPayment}
          options={() => header}
        />

      </Stack.Navigator>
  );
}