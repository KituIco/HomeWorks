import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";

import Navigator from './routes/mainStack';

const getFonts = () => Font.loadAsync({
  'lexend': require('./assets/fonts/Lexend-Regular.ttf'),
  'lexend-light': require('./assets/fonts/Lexend-Light.ttf'),
  'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
  'quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
  'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
  'quicksand-medium': require('./assets/fonts/Quicksand-Medium.ttf'),
  'notosans': require('./assets/fonts/NotoSans-Regular.ttf'),
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

  // return (
  //   // <Navigator onLayout={onLayoutRootView} />
  //   <View style={styles.container}>
  //     <Text style={styles.content}> Open up App.js to start working!</Text>
  //   </View>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  }
});
