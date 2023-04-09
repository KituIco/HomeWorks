import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '20%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
  },

  shadow: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    marginTop: 50,
    justifyContent:'center',
    alignSelf: 'center',
  },
  border: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    justifyContent:'center',
    backgroundColor: '#E9E9E9',
    marginTop: -8,
    overflow: 'hidden'
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  ready: {
    fontFamily: 'lexend',
    color: '#F9F9F9',
    fontSize: 38,
    textTransform: 'uppercase',
    letterSpacing: -1
  },


  redirect: {
    fontFamily:'quicksand-bold', 
    textDecorationLine: 'underline',
  },
  icons: {
    marginTop: 6, 
    marginLeft: -8,
  },

  footer: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 22,
    color: '#462964',
    letterSpacing: -0.8,
    marginTop: '25%',
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 30,
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 14,
    marginBottom: 10,
  },

  shadow2: {
    borderRadius: 10,
    height: 32,
    width:'90%',
    marginBottom: 10,
    alignSelf: 'center'
  },
  button2: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
    borderWidth:1, 
    borderColor: '#000000'
  },
  next2: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 17,
    color: '#FFF'
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
    height: '50%'
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

  description: {
    flex:1,
    marginTop: 10,
  },
  head: {
    fontFamily: 'notosans',
    fontSize: 24,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  desc: {
    fontFamily: 'quicksand',
    fontSize: 13,
    letterSpacing: -0.2,
    color: '#323941',
  },

  subhead: {
    fontFamily: 'notosans-medium',
    fontSize: 16,
    letterSpacing: -0.5,
    marginTop: 16,
  },
});