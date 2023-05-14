import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import AdyenServices from '../../../services/adyen/adyen-services';

export default ( route ) => {
  const { service, icon, reportID } = route.params;
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState('TransactingServe')

  const addIcons = (methods) => {
    for (let i=0; i<methods.length; i++) {
      methods[i]['screen'] = JSON.stringify(methods[i]);
      methods[i]['id'] = i;

      if(!methods[i]['toggled']) methods[i]['toggled'] = false;
      if(methods[i].name == 'Cash') methods[i]['screen'] = 'TransactingServe';
      if(methods[i].name == 'Cash') methods[i]['src'] = require("../../../assets/cash.png");

      else if(methods[i].name == 'GCash') methods[i]['src'] = require("../../../assets/GCash.png");
      else if(methods[i].name == 'Maya Wallet') methods[i]['src'] = require("../../../assets/Maya.png");
      else if(methods[i].name == 'Google Pay') methods[i]['src'] = require("../../../assets/GPay.png");
      else if(methods[i].name == 'Credit Card') methods[i]['src'] = require("../../../assets/CreditCard.png");
    }
    return methods;
  }

  let baseMethods = addIcons([
    { name: 'Cash', toggled: true},
    // { name: 'G-Cash', account: '+639** *** 6424', toggled: false},
    // { name: 'G-Cash', account: '+639** *** 3492', toggled: false},
    // { name: 'G-Cash', account: '+639** *** 7831', toggled: false},
    // { name: 'PayMaya', account: '+639** *** 6333', toggled: false},
    // { name: 'PayMaya', account: '+639** *** 8882', toggled: false},
    // { name: 'PayMaya', account: '+639** *** 3241', toggled: false},
  ])

  const [methods, setMethods] = useState(baseMethods);
  
  useEffect(() => {
    ( async() => {
      try {
        let { body: methods } = await AdyenServices.getPaymentMethods();
        let newMethods = [{ name: 'Cash', toggled: true},].concat(methods.paymentMethods)
        setMethods(addIcons(newMethods))
      } catch(err) {
        Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
      }
      setLoading(false);
    })();
  }, [])

  const changeToggle = (id) => {
    let newMethods = [...methods];
    for (let i=0; i<newMethods.length; i++){
      newMethods[i].toggled = false;
    }
    newMethods[id].toggled = true;
    setScreen(JSON.parse(newMethods[id].screen));
    setMethods(newMethods);
  }

  return { 
    service, icon,
    methods, setMethods,
    loading, setLoading,
    screen, setScreen,

    reportID,
    changeToggle,
  }
}