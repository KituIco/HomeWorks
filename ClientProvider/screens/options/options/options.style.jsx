import { StyleSheet } from 'react-native';

export default  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
      },
  header: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  heading: {
    fontFamily: 'lexend',   
    fontSize: 20,
    textTransform:'uppercase',
    color: '#462964',
    marginBottom: 28,
    letterSpacing: -0.8
  },

  holder: {
    width: 160, 
    marginTop: 16,
    alignSelf: 'center',
  },
  icon: {
    width: 160, 
    height: 160, 
    borderRadius: 160/2,    
  },

  name: {
    fontFamily: 'notosans',
    fontSize: 20,
    fontVariant: ['small-caps'],
    alignSelf:'center',
    marginTop: 10,
    marginBottom: 40
  },
  
  changepw: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    borderWidth:1, 
    borderColor: '#462964', 
    marginTop: 40,
    marginHorizontal: 30,
    marginBottom: 12
  },
  content: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 16
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 34,
    marginBottom: 22,
  },
  logout: {
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#FFF', 
    marginTop: -4,
  },

  options: {
    flexDirection:'row',
    alignItems:'center',
    marginVertical:6,
    marginHorizontal: 30
  },
  tabs:{
    fontFamily: 'quicksand-medium',
    fontSize: 18,
    marginLeft: 10,
    letterSpacing: -0.5,
  }
});