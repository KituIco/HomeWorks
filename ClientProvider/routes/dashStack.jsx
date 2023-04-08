import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';

import Dashboard from '../screens/dashboard/dashboard/dashboard.comp';
import RequestList from '../screens/dashboard/request-list/request-list.comp';
import RequestSpecs from '../screens/dashboard/request-specs/request-specs.comp';

import Chat from '../screens/booking/chat';
import Specs from '../screens/booking/specs';
import Arriving from '../screens/booking/arriving';
import Serving from '../screens/booking/serving';
import Done from '../screens/booking/done';

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
    else if (route === 'Chat' && initialRoute !== 'Chat') {
      setInitialRoute('Chat');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Chat', params: params }],
      });
    }
    else if (route === 'Arriving' && initialRoute !== 'Arriving') {
      setInitialRoute('Arriving');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Arriving', params: params }],
      });
    }
    else if (route === 'Serving' && initialRoute !== 'Serving') {
      setInitialRoute('Serving');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Serving', params: params }],
      });
    }
    else if (route === 'Done' && initialRoute !== 'Done') {
      setInitialRoute('Done');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Done', params: params }],
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
        name='Chat' 
        component={Chat}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='Specs' 
        component={Specs}
        options={() => header}
      />

      <Stack.Screen 
        name='Arriving' 
        component={Arriving}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='Serving' 
        component={Serving}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='Done' 
        component={Done}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
