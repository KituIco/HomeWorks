import { StyleSheet, Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container:{
    marginBottom:-6, 
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 18,
    color: '#9C54D5',
    letterSpacing: -0.8,
    marginVertical: 8,
    paddingHorizontal: 20,
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
  },

  uploader: {
    height: screenHeight-540,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
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

  images: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20
  },
  miniuploader: {
    height: screenWidth/2-40,
    width: '49%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#888486',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: screenWidth/2-40, 
    borderRadius: 4, 
    marginBottom: 10,
  },
  close: {
    marginTop: -(screenWidth/2-35), 
    marginLeft:'85%',
     marginBottom: screenWidth/2-55, 
     backgroundColor: '#9C54D5'
  },

  overlay: {
    backgroundColor: '#E9E9E990',
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 10
  },
  holder: {
    position: 'absolute',
    bottom: 0, left: 0,
    width: '100%',
    height: 90,
    zIndex: 5,
    justifyContent: 'center',
  },
  ghost: {
    height: 50,
    zIndex: 5,
    marginHorizontal: 30,
    marginBottom: 8
  }
});