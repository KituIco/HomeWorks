import { StyleSheet, View, Text  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';



export default function Header ( props ) {
  let bar = '0%', color1='#323941', color2='#323941', color3='#323941';
  if(props.phase >= 1) { bar='25%'; color1='#9C54D5' } 
  if(props.phase >= 2) { bar='50%'; color2='#9C54D5' } 
  if(props.phase >= 3) { bar='75%'; color3='#9C54D5' } 
  if(props.phase >= 4) bar='100%';  

  return (
    <View style={{backgroundColor:'#F9F9F9'}}>
      <LinearGradient colors={['#462964', '#9C54D5' ]} start={{ x:0, y:1.4 }} end={{ x:0, y:0 }} style={styles.header}>
        <View style={styles.iconbg}>
          <MaterialCommunityIcons name={props.icon} color={'#462964'} size={100}/>
        </View>
        <Text style={styles.title}>{props.service}</Text>
      </LinearGradient> 

      <View style={styles.progress}>
        <View style={{backgroundColor:'#9C54D5', width: bar, height: '100%'}} />
      </View>

      <View style={styles.container}>
        <View style={[styles.circles, { backgroundColor: color1} ]}>
          <Text style={styles.numbers}>1</Text>
        </View>
        <View style={[styles.circles, { backgroundColor: color2} ]}>
          <Text style={styles.numbers}>2</Text>
        </View>
        <View style={[styles.circles, { backgroundColor: color3} ]}>
          <Text style={styles.numbers}>3</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.texts}>Request</Text>
        <Text style={styles.texts}>Match</Text>
        <Text style={styles.texts}>Serve</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    header:{
      height: 190,
      alignItems: 'center',
    },
    title: {
      fontFamily: 'lexend',   
      fontSize: 30,
      textTransform:'uppercase',
      color: "#D9D9D9",
      marginTop: -70,
      letterSpacing: -1
    },
    iconbg: {
      marginTop: 60
    },
  
  
    progress: {
      backgroundColor: '#323941',
      height: 8,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: -14,
      marginBottom: 10,
      marginHorizontal: '10%',
    },
    circles: {
      height: 20,
      width:20,
      borderRadius: 10,
      alignItems: 'center'
    },
    numbers: {
      color: '#FFFFFF',
      fontFamily: 'lexend',
      fontSize: 13
    },
    texts: {
      color: '#171717',
      fontFamily: 'notosans',
      fontSize: 11,
      width: 44,
      textAlign: 'center',
      paddingTop: 6,
    },
  
  });