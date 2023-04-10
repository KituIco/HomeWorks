import { createStackNavigator } from '@react-navigation/stack';

import Profile from '../screens/options/profile/profile.comp'

const Stack = createStackNavigator();


export default function ProfileStack({ navigation }) {

  const header = ({
    headerTransparent: true,
    headerStyle: {
      height: 120,
    },
    headerTintColor: '#462964',
    headerTitleStyle: {
      display: "none"
    },
  })

  return (
      <Stack.Navigator initialRouteName='Profile' >

        <Stack.Screen 
          name='Profile' 
          component={Profile}
          options={() => header}
        />

      </Stack.Navigator>
  );
}
