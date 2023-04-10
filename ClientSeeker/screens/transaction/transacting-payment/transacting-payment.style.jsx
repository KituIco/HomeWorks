import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    fontFamily: 'lexend',   
    fontSize: 15,
    textTransform:'uppercase'
  },
  header: {
    height: 110,
  },
  title: {
    marginTop: 55,
    marginLeft: 55,
    fontFamily: 'lexend',
    fontSize: 20,
    color: '#FFFFFF'
  },

  list: {
    flexDirection:'row', 
    justifyContent:'space-between',
    marginVertical: 2,
    marginHorizontal: 12,
  },

  options: {
    flexDirection: 'row',
    marginVertical: 14,
    alignItems: 'center',
  },
  image: {
    height: 36,
    width: 48,
  },
  label: {
    marginLeft: 10,
  },
  type: {
    fontFamily: 'notosans',
    fontSize: 18,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
    fontWeight: '400',
    lineHeight: 20,
  },
  account: {
    fontFamily: 'quicksand',
    fontSize: 12,
    color: '#171717',
    lineHeight: 12,
  },

  select: {
    borderRadius: 12,
    height: 24,
    width: 24,
    borderColor: '#171717',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderRadius: 9,
    height: 18,
    width: 18,
    backgroundColor: '#9C54D5',
    alignSelf: 'center',
  }
});