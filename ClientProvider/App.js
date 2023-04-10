import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import * as SecureStore from 'expo-secure-store';

import Navigator from './routes/main-stack';

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

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState('AuthStack')
  getValueFor('access_token')
    .then(result => {
      if(result) {
        setInitialRoute('HomeStack')
      }
    })

  if (fontsLoaded) {
    return (
      <Navigator route={initialRoute}/>
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
