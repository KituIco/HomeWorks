import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import Dashboard from '../screens/dashboard/dashboard/dashboard.comp';
import RequestList from '../screens/dashboard/request-list/request-list.comp';
import RequestSpecs from '../screens/dashboard/request-specs/request-specs.comp';

import BookingChat from '../screens/booking/booking-chat/booking-chat.comp';
import BookingSpecs from '../screens/booking/booking-specs/booking-specs.comp';
import TransactingArrive from '../screens/booking/transacting-arrive/transacting-arrive.comp';
import TransactingServe from '../screens/booking/transacting-serve/transacting-serve.comp';
import TransactionDone from '../screens/booking/transaction-done/transaction-done.comp';

const Stack = createStackNavigator();

export default function DashStack({ navigation }) {

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

  const [initialRoute, setInitialRoute] = useState('Dashboard');

  const onChangeRoute = (route, params) => {
    if (route === 'Dashboard' && initialRoute !== 'Dashboard') {
      setInitialRoute('Dashboard',
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard', params: params }],
      }));
    }
    else if (route === 'RequestList' && initialRoute !== 'RequestList') {
      setInitialRoute('RequestList');
      navigation.reset({
        index: 0,
        routes: [{ name: 'RequestList', params: params }],
      });
    }
    else if (route === 'BookingChat' && initialRoute !== 'BookingChat') {
      setInitialRoute('BookingChat');
      navigation.reset({
        index: 0,
        routes: [{ name: 'BookingChat', params: params }],
      });
    }
    else if (route === 'TransactingArrive' && initialRoute !== 'TransactingArrive') {
      setInitialRoute('TransactingArrive');
      navigation.reset({
        index: 0,
        routes: [{ name: 'TransactingArrive', params: params }],
      });
    }
    else if (route === 'TransactingServe' && initialRoute !== 'TransactingServe') {
      setInitialRoute('TransactingServe');
      navigation.reset({
        index: 0,
        routes: [{ name: 'TransactingServe', params: params }],
      });
    }
    else if (route === 'TransactionDone' && initialRoute !== 'TransactionDone') {
      setInitialRoute('TransactionDone');
      navigation.reset({
        index: 0,
        routes: [{ name: 'TransactionDone', params: params }],
      });
    }
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} 
    screenListeners={{
      state: (e) => {
        let length = e.data.state.routes.length;
        onChangeRoute(e.data.state.routes[length-1].name, e.data.state.routes[length-1].params);
      },}}
      screenOptions={{ animationEnabled: false }}>

      <Stack.Screen 
        name='Dashboard' 
        component={Dashboard}
        options={{ headerShown: false }}
        initialParams ={{changed: true}}
        
      />

      <Stack.Screen 
        name='RequestList' 
        component={RequestList}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='RequestSpecs' 
        component={RequestSpecs}
        options={() => header}
      />

      <Stack.Screen 
        name='BookingChat' 
        component={BookingChat}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='BookingSpecs' 
        component={BookingSpecs}
        options={() => header}
      />

      <Stack.Screen 
        name='TransactingArrive' 
        component={TransactingArrive}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='TransactingServe' 
        component={TransactingServe}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='TransactionDone' 
        component={TransactionDone}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
