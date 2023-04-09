import { StyleSheet, Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '15%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 40
  },

  govID:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 20
  },
  uploader: {
    height: screenHeight/4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 15,
    marginTop: 8,
  },
  subtitle: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 12,
    marginTop: -2,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 30,
    height: 42,
    width: 320,
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
    width: 320,
  },
  register: {
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFF',
    letterSpacing: -0.5,
  },
  login: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    marginTop: 12,
    color: '#1E1E1E',
    marginBottom: 30
  },

  textbox: {
    height: 52,
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 3,
    padding: 10,
    marginTop: 10,
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'notosans',
    fontSize: 16,
    letterSpacing: -0.5,
    maxWidth: 280,
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
    padding: 10
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    marginTop:-34, 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5
  },

  holder: {
    width: 200, 
    alignSelf: 'center',
    marginTop: 6,
  },
  image: {
    width: 200, 
    height: 200, 
    borderRadius: 200/2,    
  },
  close: {
    marginLeft: 160,
    marginTop: -40,
    borderRadius: 36/2,
    height: 36,
    width: 36,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center'
  },

  warning: {
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  accepted: {
    borderColor: '#00FF00',
    borderWidth: 1,
  },

  
});