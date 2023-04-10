import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: -10
  },
  status: {
    fontFamily: 'lexend',   
    fontSize: 23,
    textTransform:'uppercase',
    alignSelf: 'center',
    color: "#9C54D5",
    letterSpacing: -1,
    marginTop: 24,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 140,
    backgroundColor: '#EFEFEF',
    alignSelf: 'center',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  details: {
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  content: {
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    marginBottom: 10,
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    marginHorizontal: 24,
    marginTop: -4,
    alignItems: 'center'
  },
  texts: {
    fontFamily: 'quicksand', 
    fontSize: 12
  },

  bottom: {
    height: 80,
    backgroundColor: '#EFEFEF',
    marginTop:6,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottext: {
    fontSize: 20,
    letterSpacing: -0.5,
    fontFamily: 'lexend',
    color: '#462964',
    paddingLeft: 6,
    paddingBottom: 2,
  }
});