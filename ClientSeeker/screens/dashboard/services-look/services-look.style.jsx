import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    height: 120,
    backgroundColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
    paddingTop: 60,
    flexDirection:'row',
    alignItems:'center'
  },
  message: {
    height: 46,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderRadius: 6,
    marginLeft: 16,
    marginRight: -10,
  },
  text: {
    height: 50,
    width: '85%',
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 16
  },
});