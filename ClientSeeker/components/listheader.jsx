import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text } from 'react-native';

export default function ListHeader ( props ) {
  const title = props.title

  return (
    <View style={styles.container}>
    <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.header}>
     <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.09 }} style={styles.shadow}>
      <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </LinearGradient> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 112,
    backgroundColor: '#E4E4E4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  header: {
    height: 86,
    borderRadius: 10,
    marginHorizontal: 26,
    marginVertical: 6,
  },
  shadow: {
    height: 86,
    borderRadius: 10,
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'lexend',
    fontSize: 30,
    textTransform:'uppercase',
    color: "#D9D9D9",
    alignSelf: 'center'
  }
})