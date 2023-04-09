import { StyleSheet, Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },


  homeIcon: {
    width: 100,
    height: 100,
    marginTop: '35%'
  },
  title: {
    fontFamily: 'lexend',
    fontSize: 48,
    letterSpacing: -2,
    marginTop: 10,
    color: '#462964'
  },
  subtitle: {
    fontFamily: 'quicksand-light',
    fontSize: 15,
    letterSpacing: -0.6,
    marginTop: -6,
    color: '#1E1E1E'
  },

  bottom: {
    width: '100%',
    height: screenHeight/1.8,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botheader: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  content: {
    fontFamily: 'quicksand-light',
    fontSize: 15,
    color: '#E9E9E9',
    letterSpacing: -0.5,
    width: 270,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 48,
    width: 300,
    marginTop: 40,
    justifyContent:'center',
    
  },
  button: {
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    alignItems: 'center',
    width: 300,
  },
  register: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#1E1E1E',
    letterSpacing: -0.5
  },
  login: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    color: '#FFF'
  },

  textbox: {
    height: 52,
    width: 290,
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans-light',
    fontSize: 16,
  },
});