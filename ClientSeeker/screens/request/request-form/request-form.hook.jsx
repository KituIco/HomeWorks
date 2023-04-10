import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import ServiceSpecsServices from '../../../services/service-specs/service-specs-services';
import socketService from '../../../services/sockets/sockets-services';
import ImageService from '../../../services/image/image-services';
import { getUserID } from '../../../utils/getUserID';


export default ( navigation, route ) => {
  const { typeID, addressID, referencedID, typeName, icon, minServiceCost } = route.params;
  const [seekerID, setSeekerID] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [specsDesc, onChangeText] = useState('');

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  useEffect(() => {
    ( async() => {
      setSeekerID(await getUserID())
    })();
  }, []);

  const pickImage = async (number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!result.canceled) {
      if(number==1) setImage1(result.assets[0].uri);
      if(number==2) setImage2(result.assets[0].uri);
      if(number==3) setImage3(result.assets[0].uri);
      if(number==4) setImage4(result.assets[0].uri);
    }
  };

  const removeImage = (number) => {
    if(number<=1) setImage1(image2);
    if(number<=2) setImage2(image3);
    if(number<=3) setImage3(image4);
    if(number<=4) setImage4();
  };

  const onSubmit = async() => {
    setWaiting(true);
    try {
      let images = [];
      if(image1) images.push(await ImageService.uploadFile(image1));
      if(image2) images.push(await ImageService.uploadFile(image2));
      if(image3) images.push(await ImageService.uploadFile(image3));
      if(image4) images.push(await ImageService.uploadFile(image4));
      images = JSON.stringify(images);
      
      let specsStatus = 1;
      let specsTimeStamp = Date.now();

      let res = await ServiceSpecsServices.createServiceSpecs({
        seekerID, typeID, addressID, referencedID, specsDesc, images, specsStatus, specsTimeStamp, 
      })
      socketService.createServiceSpec(JSON.stringify(res.body));
      navigation.replace('RequestMatch', { specsID:res.body.specsID, icon, typeName, referencedID, minServiceCost});
    } catch (err) {
      Alert.alert('Error', err+'.', [ {text: 'OK'} ]);
    }
    
    setWaiting(false);
  }

  return {
    typeID, addressID, referencedID, typeName, icon, minServiceCost,
    seekerID, setSeekerID,
    waiting, setWaiting,
    specsDesc, onChangeText,

    image1, setImage1,
    image2, setImage2,
    image3, setImage3,
    image4, setImage4,

    pickImage,
    removeImage,
    onSubmit,
  }
}