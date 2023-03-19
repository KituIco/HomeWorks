import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Notifications from '../screens/notifications';
import History from '../screens/history';
import Options from '../screens/options';
import DashStack from './dashStack';

const Stack = createBottomTabNavigator();


export default function HomeStack() {
  return (
      <Stack.Navigator initialRouteName='DashStack' 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            
            if (route.name === 'DashStack') {
              iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'book-clock' : 'book-clock-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'bell' : 'bell-outline';
            } else if (route.name === 'Options') {
              iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
            }

            return <MaterialCommunityIcons name={iconName} color={color} size={30}/>;
          },
          tabBarActiveTintColor: '#9C54D5',
          tabBarInactiveTintColor: '#2F2D2E',

          tabBarStyle: { height: 70, backgroundColor: '#E4E4E4' },
          tabBarLabelStyle: { display: "none" },
        })}
      >

        <Stack.Screen 
          name='DashStack' 
          component={DashStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='History' 
          component={History}
        />

        <Stack.Screen 
          name='Notifications' 
          component={Notifications}
        />

        <Stack.Screen 
          name='Options' 
          component={Options}
        />
        
      </Stack.Navigator>
  );
}