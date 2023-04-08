import { StyleSheet, Dimensions } from 'react-native';
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: -20,
    color: '#462964'
  },
  subtitle: {
    fontFamily: 'quicksand-light',
    fontSize: 15,
    letterSpacing: -0.6,
    marginTop: -6,
    color: '#1E1E1E',
    marginBottom: 30
  },

  bottom: {
    width: '100%',
    height: screenHeight/5,
    alignSelf: 'flex-end',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botheader: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    color: '#000',
    letterSpacing: -0.5,
    marginBottom: 30,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 44,
    width: 300,
    marginTop: 30,
    justifyContent:'center',
    marginBottom: 40
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
  login: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: -0.5
  },
  register: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    marginBottom: 20,
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
  }
});