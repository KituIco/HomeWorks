import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';

export default function Back ( props ) {
  const [count, setCount] = useState(0);

  const backAction = () => {
    if (!props.navigation.isFocused()) {
      return false;
    }
    setTimeout(() => {
      setCount(0);
    }, 2000); 

    if (count === 0) {
      setCount(count + 1);
    } else if (count === 1) {
      BackHandler.exitApp();
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [count]);

  return;
};



