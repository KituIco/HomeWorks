import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';

import Options from '../screens/dashboard/options/options.comp';
import Profile from '../screens/options/profile/profile.comp'
import ProfileAddress from '../screens/options/profile-address/profile-address.comp';
import ServiceList from '../screens/options/service-list/service-list.comp';
import ServicePage from '../screens/options/service-page/service-page.comp';
import TransactHistory from '../screens/options/transact-history/transact-history.comp';


const Stack = createStackNavigator();

export default function OptionsStack({ navigation }) {

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

  const headerService = {
    headerLeft: () => (
      <TouchableWithoutFeedback onPress={() => navigation.pop()}>
        <View style={{backgroundColor:'#FFFFFF', left:12, width:30, height:30, borderRadius:30, zIndex:-10, alignItems:'center', justifyContent:'center'}}>
          <MaterialCommunityIcons name={'keyboard-backspace'} size={24} color={'#9C54D5'}/>
        </View>
      </TouchableWithoutFeedback>
    ),

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

  return (
    <Stack.Navigator initialRouteName='Options' 
      screenOptions={{ animationEnabled: false }}>
        
      <Stack.Screen 
        name='Options' 
        component={Options}
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name='Profile' 
        component={Profile}
        options={() => header}
      />

      <Stack.Screen 
        name='ProfileAddress' 
        component={ProfileAddress}
        options={() => header}
      />

      <Stack.Screen 
        name='ServiceList' 
        component={ServiceList}
        options={() => header}
      />

      <Stack.Screen 
        name='ServicePage' 
        component={ServicePage}
        options={() => headerService}
      />

      <Stack.Screen 
        name='TransactHistory' 
        component={TransactHistory}
        options={() => header}
      />

      
    </Stack.Navigator>
  );
}