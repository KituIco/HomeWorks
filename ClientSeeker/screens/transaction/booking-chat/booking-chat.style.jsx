import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  profileIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 40/2,
    marginRight: 15,
    marginLeft: 10
  },
  names: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
  },

  footer: {
    height: 75,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  text: {
    height: 50,
    width: '85%',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  },

  close: {
    zIndex: 5,
    position: 'absolute',
    width: 30,
    height: 30, 
    borderRadius: 15,
    backgroundColor: '#9C54D5',
    right: 20,
    top: 20,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewImage: {
    height: 56,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderRadius: 6,
    width:'70%',
    borderWidth: 1,
    borderColor: '#9C54D5',
  },
  viewFont: {
    fontFamily:'quicksand-medium', 
    fontSize:16, 
    color:'#9C54D5', 
    marginTop:16
  },
  viewSubscript: {
    fontFamily:'quicksand-light', 
    fontSize:9, 
    color:'#9C54D5', 
    lineHeight: 36, 
    marginTop:16
  },

  sendImage: {
    height: 56,
    backgroundColor: '#9C54D5',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
    width:'15%'
  },
  removeImage: {
    height: 56,
    backgroundColor: '#FFD0DB',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 6,
    width:'12%'
  }
});