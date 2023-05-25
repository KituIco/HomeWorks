import { StyleSheet } from 'react-native';

import AddressServices from '../services/address/address-services';
import { addressHandler } from './address-handler';
import { getUserID } from './get-userID';

export const processRequest = async(request, services, types) => {
  let passed = false;
  let userID = await getUserID();

  request['seconds'] = 0;
  for (let j=0; j<services.length; j++){
    if(request.typeID == services[j].typeID && services[j].serviceEnabled == 1){
      request['serviceID'] = services[j].serviceID;
      request['minServiceCost'] = services[j].initialCost;

      for(let k=0; k<types.length; k++)
        if(request.typeID == types[k].typeID && !request.referencedID)
          request['minServiceCost'] = types[k].minServiceCost

      passed = true; break;
    }
  }

  request['box'] = styles.normal;
  if(request.referencedID) {
    if(request.referencedID != userID) {
      passed = false;
    } 
    request['box'] = styles.special;
    request['specific'] = 'Only for You!';
  } 


  if (!passed) {
   return null;
  }

  
  if(request.typeID == '0') request['typeName'] = 'Carpentry'
  else if (request.typeID == '1') request['typeName'] = 'Car Mechanic'
  else if (request.typeID == '2') request['typeName'] = 'Plumbing'
  else if (request.typeID == '3') request['typeName'] = 'House Cleaning'
  else if (request.typeID == '4') request['typeName'] = 'Baby Sitting'
  else if (request.typeID == '5') request['typeName'] = 'Electrician'
  else if (request.typeID == '6') request['typeName'] = 'Laundry'
  else if (request.typeID == '7') request['typeName'] = 'Appliance Repair'
  else if (request.typeID == '8') request['typeName'] = 'Roof Cleaning'
  else if (request.typeID == '9') request['typeName'] = 'Carpet Cleaning'
  else if (request.typeID == 'A') request['typeName'] = 'Meal Preparation';
  else if (request.typeID == 'B') request['typeName'] = 'Manicurists'
  else if (request.typeID == 'C') request['typeName'] = 'Hair Dresser'

  if(request.typeName == 'Carpentry') request['icon'] = 'hammer-screwdriver';
  else if (request.typeName == 'Car Mechanic') request['icon'] = 'car-wrench';
  else if (request.typeName == 'Plumbing') request['icon'] = 'water-pump';
  else if (request.typeName == 'House Cleaning') request['icon'] = 'broom';
  else if (request.typeName == 'Baby Sitting') request['icon'] = 'human-baby-changing-table';
  else if (request.typeName == 'Electrician') request['icon'] = 'power-plug';
  else if (request.typeName == 'Laundry') request['icon'] = 'tshirt-crew';
  else if (request.typeName == 'Appliance Repair') request['icon'] = 'television';
  else if (request.typeName == 'Roof Cleaning') request['icon'] = 'home-roof';
  else if (request.typeName == 'Carpet Cleaning') request['icon'] = 'rug';
  else if (request.typeName == 'Meal Preparation') request['icon'] = 'silverware-clean';
  else if (request.typeName == 'Manicurists') request['icon'] = 'hand-clap';
  else if (request.typeName == 'Hair Dresser') request['icon'] = 'face-woman-shimmer';

  let { body: address } = await AddressServices.getAddressByID(request.addressID);
  request['referencedID'] = addressHandler(address);

  return request;
}


const styles = StyleSheet.create({
  normal: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  special: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#F6CEFC',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderWidth: 1.2,
    borderColor: '#9D54C5'
  },
})