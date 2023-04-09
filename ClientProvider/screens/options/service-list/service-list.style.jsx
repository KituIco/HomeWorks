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

  add: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#9C54D5D0',
    zIndex: 10,
    alignItems:'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFFC0',
    zIndex: 8,
  },

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    height: '70%'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5,
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

});