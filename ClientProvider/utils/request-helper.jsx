import { StyleSheet } from 'react-native';

import AddressServices from '../services/address/address-services';
import { addressHandler } from './address-handler';
import { getUserID } from './get-userID';

export const requestHelper = async(requests, services, types) => {
  let time = Date.now();
  let userID = await getUserID();

  for (let i=0; i<requests.length; i++) {
    let passed = false;
    
    for (let j=0; j<services.length; j++){
      if(time - requests[i].specsTimestamp > 900000 || requests[i].specsStatus!=1) {
        break;
      }
      
      if(requests[i].typeID == services[j].typeID && services[j].serviceEnabled == 1){
        requests[i]['seconds'] = (time - requests[i].specsTimestamp)/1000;
        requests[i]['serviceID'] = services[j].serviceID;
        requests[i]['minServiceCost'] = services[j].initialCost;

        for(let k=0; k<types.length; k++)
          if(requests[i].typeID == types[k].typeID && !requests[i].referencedID)
            requests[i]['minServiceCost'] = types[k].minServiceCost

        passed = true; break;
      }
    }

    requests[i]['box'] = styles.normal;
    if(requests[i].referencedID) {
      if(requests[i].referencedID != userID) {
        passed = false;
      } 
      requests[i]['box'] = styles.special;
      requests[i]['specific'] = 'Only for You!';
    } 

    if (!passed) {
      delete requests.splice(i,1);
      i--; continue;
    }

  
    if(requests[i].typeID == '0') requests[i]['typeName'] = 'Carpentry'
    else if (requests[i].typeID == '1') requests[i]['typeName'] = 'Car Mechanic'
    else if (requests[i].typeID == '2') requests[i]['typeName'] = 'Plumbing'
    else if (requests[i].typeID == '3') requests[i]['typeName'] = 'House Cleaning'
    else if (requests[i].typeID == '4') requests[i]['typeName'] = 'Baby Sitting'
    else if (requests[i].typeID == '5') requests[i]['typeName'] = 'Electrician'
    else if (requests[i].typeID == '6') requests[i]['typeName'] = 'Laundry'
    else if (requests[i].typeID == '7') requests[i]['typeName'] = 'Appliance Repair'
    else if (requests[i].typeID == '8') requests[i]['typeName'] = 'Roof Cleaning'
    else if (requests[i].typeID == '9') requests[i]['typeName'] = 'Carpet Cleaning'
    else if (requests[i].typeID == 'A') requests[i]['typeName'] = 'Meal Preparation';
    else if (requests[i].typeID == 'B') requests[i]['typeName'] = 'Manicurists'
    else if (requests[i].typeID == 'C') requests[i]['typeName'] = 'Hair Dresser'

    if(requests[i].typeName == 'Carpentry') requests[i]['icon'] = 'hammer-screwdriver';
    else if (requests[i].typeName == 'Car Mechanic') requests[i]['icon'] = 'car-wrench';
    else if (requests[i].typeName == 'Plumbing') requests[i]['icon'] = 'water-pump';
    else if (requests[i].typeName == 'House Cleaning') requests[i]['icon'] = 'broom';
    else if (requests[i].typeName == 'Baby Sitting') requests[i]['icon'] = 'human-baby-changing-table';
    else if (requests[i].typeName == 'Electrician') requests[i]['icon'] = 'power-plug';
    else if (requests[i].typeName == 'Laundry') requests[i]['icon'] = 'tshirt-crew';
    else if (requests[i].typeName == 'Appliance Repair') requests[i]['icon'] = 'television';
    else if (requests[i].typeName == 'Roof Cleaning') requests[i]['icon'] = 'home-roof';
    else if (requests[i].typeName == 'Carpet Cleaning') requests[i]['icon'] = 'rug';
    else if (requests[i].typeName == 'Meal Preparation') requests[i]['icon'] = 'silverware-clean';
    else if (requests[i].typeName == 'Manicurists') requests[i]['icon'] = 'hand-clap';
    else if (requests[i].typeName == 'Hair Dresser') requests[i]['icon'] = 'face-woman-shimmer';

    let { body: address } = await AddressServices.getAddressByID(requests[i].addressID);
    requests[i]['referencedID'] = addressHandler(address);
  }
  return requests;
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