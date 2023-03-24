import AddressService from '../services/address/address-services';

export const requestHelper = async(requests, services, types) => {
  let time = Date.now();
  for (let i=0; i<requests.length; i++) {
    let passed = false;
    for (let j=0; j<services.length; j++){
      if(requests[i].typeID == services[j].typeID && time - requests[i].specsTimestamp < 900000){
        requests[i]['seconds'] = (time - requests[i].specsTimestamp)/1000;
        requests[i]['serviceID'] = services[j].serviceID;

        for(let k=0; k<types.length; k++)
          if(requests[i].typeID == types[k].typeID)
            requests[i]['minServiceCost'] = types[k].minServiceCost

        passed = true; break;
      }
    }

    if (!passed) {
      delete requests.splice(i,1);
      i--; continue;
    }
    // let data = await AddressService.getAddressByID(requests[i]['addressID']);
    // requests[i]['location'] = data.body;
    // requests[i]['latitude'] = data.body.latitude;
    // requests[i]['longitude'] = data.body.longitude;

  
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
  }
  return requests
}