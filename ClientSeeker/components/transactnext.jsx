import { StyleSheet, View, Text, TouchableWithoutFeedback  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert } from 'react-native';

import TransactionReportServices from '../services/transaction/transaction-reports-services';
import AdyenServices from '../services/adyen/adyen-services';

export default function Next ( props ) {
  const { service, icon, title, screen, price, address, reportID } = props;
  let container = styles.container;
  if (price) {
    container = styles.container2
  }

  const onPayment = async() => { 
    try {
      let { body: report } = await TransactionReportServices.getTransactionReportsByID(reportID);
      let providerID = report.providerID;
      let seekerID = report.seekerID;
      let paymentMethod = screen;

      let res = await AdyenServices.makePayment({paymentMethod, providerID, seekerID});
      console.log(res);
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    
  }

  const onPress = () => {
    if (screen == 'TransactingPayment') {
      props.navigation.navigate(screen, {service, icon, reportID});
    }
    else if(!screen.name) {
      props.navigation.navigate(screen, {service, icon});
    } 
    else {
      onPayment()
    }
  }

  return (
    <LinearGradient colors={['rgba(0,0,0,0.4)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.2 }} end={{ x:0, y:0 }}>
			<View style={container}>
        {price && 
        <View style={styles.subheading}>
          <Text numberOfLines={2} style={{width: '60%', fontFamily: 'quicksand', fontSize: 11, color: '#888486'}}>{address}</Text>
          <Text style={{fontFamily: 'quicksand', fontSize: 12}}> Starts at <Text style={{fontFamily: 'quicksand-bold'}}>Php {price}</Text></Text>
        </View>
        }

        <TouchableWithoutFeedback onPress= {() => onPress()}>
          <LinearGradient colors={['rgba(0,0,0,0.7)','rgba(0,0,0,0)'  ]} start={{ x:0, y:0.65 }} end={{ x:0, y:0.98 }} style={styles.shadow}>
            
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
    backgroundColor: '#EFEFEF',
    marginTop:6,
    justifyContent: 'center'
  },
  container2: {
    height: 120,
    backgroundColor: '#FFFFFF',
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
    backgroundColor:'#FFFFFF', 
    borderWidth:1, 
    borderColor: '#462964', 
  },


  content: {
    textAlign: 'center',
    fontFamily: 'lexend',
    color: '#EFEFEF',
    letterSpacing: -1,
    fontSize: 20
  },

  subheading: {
    flexDirection: 'row', 
    justifyContent:'space-between',
    margin: 12,
    marginTop: -4,
    alignItems: 'center',
  }
  
});