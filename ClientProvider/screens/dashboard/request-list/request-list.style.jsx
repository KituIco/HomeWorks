import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 80,
    },
    header: {
      fontFamily: 'lexend',
      color: '#9C54D5',
      fontSize: 20,
      textTransform: 'uppercase',
      letterSpacing: -0.7,
      zIndex: 5,
      backgroundColor: '#FFFFFF',
      paddingVertical: 14,
    },
  
    shadow: {
      borderRadius: 10,
      height: 34,
      marginBottom: 40,
      marginTop: 10,
      width:'80%',
    },
    button: {
      height: 34,
      borderRadius: 10,
      justifyContent: 'center',
      marginBottom: 8,
      backgroundColor:'#FFF', 
      marginTop: -4,
      alignItems: 'center',
    },
  
    content: {
      textAlign: 'center',
      fontFamily: 'lexend-light',
      letterSpacing: -0.5,
      fontSize: 16,
      color: '#FFF'
    },
  
    subheader: {
      fontFamily: 'quicksand-medium',
      fontSize: 20,
      letterSpacing: -1,
    },
    subcontent: {
      fontFamily: 'quicksand-light',
      fontSize: 16,
      letterSpacing: -0.5,
      textAlign: 'center',
      marginTop: 20,
      marginHorizontal: 60
    },
  });