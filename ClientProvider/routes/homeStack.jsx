import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text,View } from 'react-native';
import { useState } from 'react';

import DashStack from './dashStack';
import OptionsStack from './optionsStack';

const Stack = createBottomTabNavigator();


export default function HomeStack({ navigation }) {
  const [tracker, setTracker] = useState(styles.outsideOptions);
  try {
    if (navigation.getState().routes[0].state.routes[1].state.index > 0 && tracker !== styles.insideOptions) {
      setTracker(styles.insideOptions);
    } else if (navigation.getState().routes[0].state.routes[1].state.index == 0 && tracker !== styles.outsideOptions) {
      setTracker(styles.outsideOptions);
    }
  } catch (err) {}

  return (
      <Stack.Navigator initialRouteName='DashStack' 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let tabsStyle = focused ? styles.active : styles.tabs;
            
            if (route.name === 'DashStack') {
              return (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', width:'100%'}}>
                  <View style={{width: 1, height: 60}}/>
                  <Text style={tabsStyle}>Homepage</Text>
                  <View style={{width: 1, height: 50, backgroundColor: '#5E5E5E'}}/>
                </View>
              );
            } 
            else if (route.name === 'OptionsStack') {
              return <Text style={tabsStyle}>Options</Text>;
            }

          },
          tabBarActiveTintColor: '#9C54D5',
          tabBarInactiveTintColor: '#2F2D2E',
          tabBarActiveBackgroundColor: '#EFEFEF',
          animationEnabled: false,

          tabBarStyle: [{ height: 70, backgroundColor: '#EFEFEF' }, tracker],
          tabBarLabelStyle: { display: "none" },
        })}
        
      >

        <Stack.Screen 
          name='DashStack' 
          component={DashStack}
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name='OptionsStack' 
          component={OptionsStack}
          options={{ headerShown: false }}
        />

               
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabs: {
    fontFamily: 'lexend',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  active: {
    fontFamily: 'lexend',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#9C54D5',
  },
  outsideOptions: {
    height: 70
  },
  insideOptions: {
    display: 'none'
  }
  
});