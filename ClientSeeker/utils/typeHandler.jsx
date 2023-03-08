export const typeHandler = (types) => {
  for (let i=0; i<types.length; i++) {
    if(types[i].typeName == 'Carpentry') types[i]['icon'] = 'hammer-screwdriver';
    else if (types[i].typeName == 'Car Mechanic') types[i]['icon'] = 'car-wrench';
    else if (types[i].typeName == 'Plumbing') types[i]['icon'] = 'water-pump';
    else if (types[i].typeName == 'House Cleaning') types[i]['icon'] = 'broom';
    else if (types[i].typeName == 'Baby Sitting') types[i]['icon'] = 'human-baby-changing-table';
    else if (types[i].typeName == 'Electrician') types[i]['icon'] = 'power-plug';
    else if (types[i].typeName == 'Laundry') types[i]['icon'] = 'tshirt-crew';
    else if (types[i].typeName == 'Appliance Repair') types[i]['icon'] = 'television';
    else if (types[i].typeName == 'Roof Cleaning') types[i]['icon'] = 'home-roof';
    else if (types[i].typeName == 'Carpet Cleaning') types[i]['icon'] = 'rug';
    else if (types[i].typeName == 'Meal Preparation') types[i]['icon'] = 'silverware-clean';
    else if (types[i].typeName == 'Manicurists') types[i]['icon'] = 'hand-clap';
    else if (types[i].typeName == 'Hair Dresser') types[i]['icon'] = 'face-woman-shimmer';
  }
  return types
}