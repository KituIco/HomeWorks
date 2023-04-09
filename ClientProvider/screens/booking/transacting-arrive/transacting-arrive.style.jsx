import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
    paddingVertical: 20,
  },

  shadow: {
    borderRadius: 10,
    height: 40,
    width:'100%',
    marginTop: 20,
    marginBottom: 4,
  },
  button: {
    height: 40,
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
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 40,
  },

  image: {
    height: 700,
    width: '250%',
    alignSelf:'center',
    opacity: 0.8,
  },

  address: {
    fontFamily: 'quicksand',
    width: '75%',
    fontSize: 12,
    color: '#888486',
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

  waiting: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 54,
    textAlign: 'center',
    marginTop: 20,
  },
});