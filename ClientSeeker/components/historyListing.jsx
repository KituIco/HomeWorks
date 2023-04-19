import { StyleSheet, View, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function Listing( props ) {
  const services = props.listings;
  const [openSpecs, setOpenSpecs] = useState(false);

  const navigateTo = (data) => {
    if(data.specsStatus == 4 || data.specsStatus == 1) {
      setOpenSpecs(true);
    }
  }
  
  const servicesList = data => {
    return (
      <LinearGradient colors={['rgba(0,0,0,0.3)','rgba(0,0,0,0.12)']} start={{ x:0, y:0.95 }} end={{ x:0, y:0.98 }} style={styles.shadow} key={data.specsID}>
        { openSpecs && <View style={styles.overlay}/> }
        <Modal visible={openSpecs} transparent={true} animationType='slide'>
          <View style={styles.centered}>
            <View style={styles.modal}>

              
              <TouchableWithoutFeedback onPress= {() => setOpenSpecs(false)}>
                <Text style={styles.enter}>CLOSE</Text>
              </TouchableWithoutFeedback>

            </View>
          </View>
        </Modal>

        <View style={styles.box}>

          <View style={styles.content}>
            <MaterialCommunityIcons name={data.icon} size={60}/>
            <View style={styles.texts}>
              <View style={styles.top}>
                <Text numberOfLines={1} style={styles.service}>{data.typeName}</Text>
                <View style={{marginTop: -6}}>
                  <Text style={styles.time}>{data.date}</Text>
                  <Text style={[styles.status,data.color]}>{data.status}</Text>
                </View>
                
              </View>
              <Text style={styles.address} numberOfLines={2} ellipsizeMode='tail'>{data.specsDesc}</Text>
            </View>
          </View>


          <TouchableWithoutFeedback onPress={() => navigateTo(data)}>
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.6, y:-1 }} end={{ x:0.1, y:1 }} style={styles.button}>
              <LinearGradient colors={['rgba(0, 0, 0, 0.4)','rgba(0, 0, 0, 0)']} start={{ x: 0.5, y: 0.01 }} end={{ x: 0.5, y: 0.15 }} style={styles.ledge}>
                <Text style={styles.details}>{data.button}</Text>
              </LinearGradient>
            </LinearGradient> 
          </TouchableWithoutFeedback>

        </View>

      </LinearGradient>
    );
  };

  return (
    <View style={{marginVertical:16}}>
    {services.map((value, index) => {
      return servicesList(value);
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 160,
    marginVertical: 10,
  },
  box: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  content: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  texts: {
    marginLeft: 10,
    flex: 1
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  service: {
    fontFamily: 'notosans',
    fontSize: 19,
    letterSpacing: -0.5,
    fontVariant: ['small-caps'],
  },
  time: {
    fontFamily: 'quicksand',
    color: '#9C54D5',
    fontSize: 10,
    alignSelf:'flex-end'
  },
  address: {
    fontFamily: 'quicksand',
    fontSize: 10,
    color: '#323941',
    marginTop: 4,
    lineHeight: 12,
  },

  button: {
    height: 40,
    marginTop: 14,
    borderRadius: 10,
  },
  ledge: {
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    fontFamily: 'quicksand-semibold',
    color: '#E9E9E9',
    letterSpacing: -0.5,
    fontSize: 14,
  },
  status: {
    fontFamily: 'quicksand', 
    letterSpacing: -0.5, 
    alignSelf:'flex-end', 
    fontSize:13, 
    marginTop:-2
  },

  centered: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    height: '75%'
  },
  enter: {
    fontSize:16,
    color:'#000', 
    alignSelf:'center', 
    fontFamily: 'lexend',
    marginBottom: 10,
    letterSpacing: -0.5,
  },

  overlay: {
    position: 'absolute', 
    top: 0, left: 0, right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 15,
    backgroundColor: '#E9E9E9A0'
  },
});