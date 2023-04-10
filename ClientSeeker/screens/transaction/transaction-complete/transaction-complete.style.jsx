import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: -10,
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

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    marginHorizontal: 24,
    marginTop: -4,
    alignItems: 'center',
  },
  texts: {
    fontFamily: 'quicksand', 
    fontSize: 12,
  },

  bottom: {
    height: 170,
    backgroundColor: '#F9F9F9',
    marginTop:6,
    alignItems: 'center',
    padding: 12,
  },
  text: {
    marginHorizontal: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    // placeholderTextColor: '#888486',
    fontFamily: 'quicksand',
    textAlignVertical: 'top',
    letterSpacing: -0.5,
    fontSize: 12,
    width: '100%',
    marginTop: 6,
  },

  accept: {
    height: 30,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
  },
  shadow: {
    marginHorizontal: 30,
    borderRadius: 6,
    width: '100%',
    marginTop: 10,
  },
  prompt: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 14,
  },
  stars: {
    flexDirection:'row',
    width: '100%', 
    marginTop:6, 
    alignItems:'center',
    justifyContent: 'flex-end',
  },

  instructions: {
    textAlign: 'center',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 13,
    color:'#484446',
    marginVertical: 10,
  },
  ratings: {
    fontFamily: 'quicksand-medium',
    fontSize: 14
  },
});