import { StyleSheet, View, Text, Image, ScrollView, TouchableWithoutFeedback, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function Serving({navigation}) {
  const [paid, setPaid] = useState(false);
  const service = 'Carpentry'

  const changePaid = () => {
    setPaid(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Currently Serving!</Text>


      { !paid &&
      <View>
        <Text style={styles.subheading}>Please click the Paid Button below if the Customer gave Cash Payment to you.</Text>
        <TouchableWithoutFeedback onPress= {() => changePaid()}>          
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
            <View style={[styles.border,{backgroundColor:'#462964'}]}>
              <LinearGradient colors={['#F9F9F9', '#E9E9E9']} start={{ x:0.5, y:0 }} end={{ x:-0.3, y:0.8 }} style={styles.button}>
                <Text style={[styles.ready,{color:'#462964'}]}>Paid</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
      }

      { paid &&
      <View>
        <Text style={styles.subheading}>Please click the Done Button below if the Service has completely been Provided.</Text>
        <TouchableWithoutFeedback onPress= {() => navigation.navigate('Requests')}>          
          <LinearGradient colors={['rgba(10,10,10,0.2)','rgba(10,10,10,0.1)'  ]} start={{ x:0, y:0.5 }} end={{ x:0, y:1 }} style={styles.shadow}>
          <View style={styles.border}>
              <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.5, y:0 }} end={{ x:-0.3, y:0.8 }} style={styles.button}>
                <Text style={styles.ready}>Done</Text>
              </LinearGradient>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
      }

      <Text style={styles.footer}>Service Cost</Text>
      <View style={styles.details}>
        <Text style={styles.content}>{service} Service</Text>
        <Text style={[styles.content,{fontFamily:'quicksand-bold'}]}>Php 320.00</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontFamily: 'quicksand-medium',
    fontSize: 20,
    letterSpacing: -1,
    marginTop: '20%'
  },
  subheading: {
    fontFamily: 'quicksand-light',
    fontSize: 16,
    letterSpacing: -0.5,
    marginHorizontal: 52,
    textAlign: 'center',
    marginTop: 20,
  },

  shadow: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    marginTop: 50,
    justifyContent:'center',
    alignSelf: 'center',
  },
  border: {
    borderRadius: 174/2,
    height: 174,
    width: 174,
    justifyContent:'center',
    backgroundColor: '#E9E9E9',
    marginTop: -8,
    overflow: 'hidden'
  },
  button: {
    height: 150,
    width: 150,
    borderRadius: 150/2,
    justifyContent:'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  ready: {
    fontFamily: 'lexend',
    color: '#F9F9F9',
    fontSize: 38,
    textTransform: 'uppercase',
    letterSpacing: -1
  },


  redirect: {
    fontFamily:'quicksand-bold', 
    textDecorationLine: 'underline',
  },
  icons: {
    marginTop: 6, 
    marginLeft: -8,
  },

  footer: {
    fontFamily: 'notosans-medium',
    fontVariant: ['small-caps'],
    fontSize: 22,
    color: '#462964',
    letterSpacing: -0.8,
    marginTop: '25%',
    marginHorizontal: 20,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 30,
    fontFamily: 'quicksand',
    letterSpacing: -0.5,
    fontSize: 14,
    marginBottom: 10,
  },

});