import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginVertical:-10
  },
  map: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  texts: {
    fontFamily: 'lexend-light',
    fontSize: 16,
    letterSpacing: -0.8
  },
  waiting: {
    position: 'absolute', 
    top: 0, left: 42, right: 0, bottom: 6, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 5,
  },

  holder: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 5,
    justifyContent: 'center',
  },
  ghost: {
    height: 50,
    zIndex: 5,
    marginHorizontal: 30,
  }
});