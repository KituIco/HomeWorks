import { useState } from 'react';

export default ( route ) => {
  const { service, icon } = route.params;
  
  const baseMethods = [
    { id: 0, type: 'Cash', toggled: true},
    // { id: 1, type: 'G-Cash', account: '+639** *** 6424', toggled: false},
    // { id: 2, type: 'G-Cash', account: '+639** *** 3492', toggled: false},
    // { id: 3, type: 'G-Cash', account: '+639** *** 7831', toggled: false},
    // { id: 4, type: 'PayMaya', account: '+639** *** 6333', toggled: false},
    // { id: 5, type: 'PayMaya', account: '+639** *** 8882', toggled: false},
    // { id: 6, type: 'PayMaya', account: '+639** *** 3241', toggled: false},
  ]

  for (let i=0; i<baseMethods.length; i++) {
    if(baseMethods[i].type == 'Cash') baseMethods[i]['src'] = require("../../../assets/cash.png");
    else if(baseMethods[i].type == 'G-Cash') baseMethods[i]['src'] = require("../../../assets/GCash.png");
    else if(baseMethods[i].type == 'PayMaya') baseMethods[i]['src'] = require("../../../assets/PayMaya.jpg");
  }

  const [methods, setMethods] = useState(baseMethods);

  const changeToggle = (id) => {
    let newMethods = [...methods];
    for (let i=0; i<newMethods.length; i++){
      newMethods[i].toggled = false;
    }
    newMethods[id].toggled = true;
    setMethods(newMethods);
  }

  return { 
    service, icon,
    methods, setMethods,
    changeToggle,
  }
}