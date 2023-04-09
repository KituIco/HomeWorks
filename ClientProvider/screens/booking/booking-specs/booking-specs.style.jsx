import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: 'lexend',
    color: '#9C54D5',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
    marginTop: 70,
    marginBottom: 10
  },

  shadow: {
    borderRadius: 10,
    height: 34,
    width:'100%',
  },
  button: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor:'#FFF', 
    marginTop: -4,
    alignItems: 'center',
    width:'100%',
  },
  next: {
    textAlign: 'center',
    fontFamily: 'lexend-light',
    letterSpacing: -0.5,
    fontSize: 16,
    color: '#FFF'
  },
  ledge: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },

  image: {
    height: 250,
    width: '250%',
    alignSelf:'center',
    marginTop: -4
  },
  pin: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    marginTop: -140,
    marginBottom: 100
  },

  address: {
    fontFamily: 'quicksand',
    width: '75%',
    fontSize: 12,
    color: '#888486',
    marginVertical: 6,
    marginHorizontal: 20
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 6,
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 24,
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
  },

  text: {
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    fontFamily: 'quicksand',
    textAlignVertical: 'top',
    letterSpacing: -0.5,
    marginBottom: 16,
    fontSize: 14,
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
    height: '40%',
    justifyContent: 'flex-end'
  },
  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    backgroundColor: '#E9E9E9A0'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5,
  },

  waiting: {
    position: 'absolute', 
    top: -20, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 14,
    letterSpacing: -0.5,
    marginHorizontal: 34,
    textAlign: 'center',
    marginTop: 20,
  },
});