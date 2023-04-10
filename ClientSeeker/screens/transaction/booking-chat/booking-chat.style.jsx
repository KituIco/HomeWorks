import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15,
    marginLeft: 10
  },
  names: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },

  footer: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    height: 50,
    width: '85%',
    // placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  }
});