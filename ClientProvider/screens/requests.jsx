import { StyleSheet, View, Text, Image, ScrollView, } from 'react-native';
import { LinearGradient, BackHandler, } from 'expo-linear-gradient';
import Back from '../hooks/back';

export default function Requests({navigation}) {

  return (
    <View style={styles.container}>
      <Back navigation={navigation}/>
      <Text style={styles.header}>Requests Page</Text>
      
      <View>

      </View>

      <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
        <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.logout}>
          <Text style={styles.content}>Stop Accepting Requests</Text>
        </LinearGradient>
      </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 100,
    paddingHorizontal: 40
  },
  header: {
    fontFamily: 'lexend',
    color: '#9C54D5',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: -0.7,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 34,
    marginBottom: 40,
    width:'100%',
  },
  logout: {
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
});