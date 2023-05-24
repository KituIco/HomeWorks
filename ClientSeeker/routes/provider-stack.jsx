import { createStackNavigator } from '@react-navigation/stack';
import { TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons  } from '@expo/vector-icons';


import TransactionComplete from '../screens/transaction/transaction-complete/transaction-complete.comp';
import ServicePage from '../screens/request/service-page/service-page.comp';

const Stack = createStackNavigator();

export default function ProviderStack({ route, navigation }) {
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
      <Stack.Navigator initialRouteName='TransactionComplete' >

        <Stack.Screen 
          name='TransactionComplete' 
          component={TransactionComplete}
          initialParams={{ reportID, icon, typeName }}
          options={() => header}
        />

        
        <Stack.Screen
          name="ServicePage"
          component={ServicePage}
          options={() => headerService}
        />

      </Stack.Navigator>
  );
}
