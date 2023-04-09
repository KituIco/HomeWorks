import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  search: {
    height: 40,
    width: "100%",
    backgroundColor: "#EFEFEF",
    alignItems: 'center',
  },
  searchbar:{
    height: 50,
    width: "75%",
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 50,
    flexDirection: 'row',
    paddingVertical: 12.5,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 4,
  },
  searchtext:{
    fontFamily: 'montserrat',   
    fontSize: 16,
    marginTop: 2.5,
    marginLeft: 4,
    color: '#616161',
  },

  sections:{
    marginTop: -10,
    marginHorizontal: 8,
    services: {
      paddingTop: 38,
      marginVertical: 20,
    }
  },

});