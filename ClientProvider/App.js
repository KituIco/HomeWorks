import React, {useState } from 'react';
import { StyleSheet, View } from 'react-native';

import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";

import Navigator from './routes/mainStack';

const getFonts = () => Font.loadAsync({
  'lexend': require('./assets/fonts/Lexend-Regular.ttf'),
  'lexend-light': require('./assets/fonts/Lexend-Light.ttf'),
  'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
  'quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
  'quicksand-light': require('./assets/fonts/Quicksand-Light.ttf'),
  'quicksand-semibold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
  'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
  'quicksand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
  'notosans': require('./assets/fonts/NotoSans-Regular.ttf'),
  'notosans-light': require('./assets/fonts/NotoSans-Light.ttf'),
  'notosans-medium': require('./assets/fonts/NotoSans-Medium.ttf'),
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <Navigator />
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)}
        onError={() => {}} 
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
