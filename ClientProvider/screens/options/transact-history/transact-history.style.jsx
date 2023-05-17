import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    fontFamily: 'lexend',   
    fontSize: 20,
    textTransform:'uppercase',
    color: '#462964',
    marginBottom: 10,
    letterSpacing: -0.8
  },

  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    backgroundColor: '#E9E9E9A0'
  },

  instructions: {
    position: 'absolute', 
    top: '50%', 
    fontSize:14,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'quicksand-medium',
    marginBottom: 10,
    letterSpacing: -0.5,
    marginHorizontal: 40,
    textAlign: 'center'
  },

  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  },
  subcontent: {
    fontFamily: 'notosans-light',   
    fontSize: 12,
  }
});