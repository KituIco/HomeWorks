import { StyleSheet, View, Text, TouchableWithoutFeedback  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import Waiting from '../hooks/waiting';

// import CredentialsServices from '../services/user/credentials-services';
// import SeekerServices from '../services/user/seeker-services';
// import { contactHandler } from '../utils/contactHandler';
// import { getUserID } from '../utils/getUserID';

export default function Next ( props ) {
  const { service, icon, title, screen } = props
  const { typeID, price } = props 
  const address = 'UP AECH, P. Velasquez Street, Diliman, Quezon City, 1800 Metro Manila';

  let container = styles.container;
  if (price) {
    container = styles.container2
  }

  const [waiting, setWaiting] = useState(false);
  // const [processing, setProcessing] = useState(true);
  // const [name, setName] = useState('');
  // const [contact, setContact] = useState('');

  // useEffect(() => {
  //   if(processing) {
  //     setProcessing(false);
  //     getUserID().then( userID => {
  //       Promise.all([SeekerServices.getSeeker(userID), CredentialsServices.getUserCredentials(userID)])
  //         .then(data => {
  //           setName(`${data[0].body.firstName} ${data[0].body.lastName}`);
  //           setContact(contactHandler(data[1].body.phoneNumber));
  //         })
  //     })
  //   }
  // });

  const onPress = () => {
    if(screen == 'InitSpecs') {
      let addressID = "[" + props.latitude.toFixed(6).toString() + ", " + props.longitude.toFixed(6).toString() + "]";
      props.navigation.navigate(screen, {service, icon, addressID, typeID});
    } else {
      props.navigation.navigate(screen, {service, icon});
    }
  }

  return (
    <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
			<View style={container}>
        { waiting && <Waiting/> }
        {price && 
        <View style={styles.subheading}>
          <Text style={{width: '70%', fontFamily: 'quicksand', fontSize: 11, color: '#888486'}}>{address}</Text>
          <Text style={{fontFamily: 'quicksand', fontSize: 12}}> Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {price}</Text></Text>
        </View>
        }

        <TouchableWithoutFeedback onPress= {() => onPress()}>
          <LinearGradient colors={['rgba(10,10,10,0.7)','rgba(10,10,10,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            
            {!price &&
            <LinearGradient colors={['#9C54D5', '#462964']} start={{ x:0.4, y:1 }} end={{ x:0, y:1 }} style={styles.button}>
              <Text style={styles.content}>{title}</Text>
            </LinearGradient>
            }

            {price &&
            <View style={styles.button2}>
              <Text style={[styles.content, {color: '#462964', fontSize: 18}]}>{title}</Text>
            </View>
            }
           
          </LinearGradient>
        </TouchableWithoutFeedback>
			</View>
		</LinearGradient>
  )
}

const styles = StyleSheet.create({
	container: {
    height: 90,
    backgroundColor: '#E9E9E9',
    marginTop:6,
    justifyContent: 'center'
  },
  container2: {
    height: 120,
    backgroundColor: '#E9E9E9',
    marginTop:6,
    justifyContent: 'center'
  },
  shadow: {
    marginHorizontal: 30,
    borderRadius: 6
  },
  button: {
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8
  },
  button2: {
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    marginBottom: 8,
    backgroundColor:'#E9E9E9', 
    borderWidth:1, 
    borderColor: '#462964', 
  },


  content: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#E9E9E9',
    letterSpacing: -1,
    fontSize: 20
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    margin: 12,
    marginTop: -4,
    alignItems: 'center'
  }
  
});