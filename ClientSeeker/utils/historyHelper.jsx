import { StyleSheet } from "react-native";

export const historyHelper = async(specs) => {
  for (let i=0; i<specs.length; i++) {
    if(specs[i].typeID == '0') specs[i]['typeName'] = 'Carpentry'
    else if (specs[i].typeID == '1') specs[i]['typeName'] = 'Car Mechanic'
    else if (specs[i].typeID == '2') specs[i]['typeName'] = 'Plumbing'
    else if (specs[i].typeID == '3') specs[i]['typeName'] = 'House Cleaning'
    else if (specs[i].typeID == '4') specs[i]['typeName'] = 'Baby Sitting'
    else if (specs[i].typeID == '5') specs[i]['typeName'] = 'Electrician'
    else if (specs[i].typeID == '6') specs[i]['typeName'] = 'Laundry'
    else if (specs[i].typeID == '7') specs[i]['typeName'] = 'Appliance Repair'
    else if (specs[i].typeID == '8') specs[i]['typeName'] = 'Roof Cleaning'
    else if (specs[i].typeID == '9') specs[i]['typeName'] = 'Carpet Cleaning'
    else if (specs[i].typeID == 'A') specs[i]['typeName'] = 'Meal Preparation';
    else if (specs[i].typeID == 'B') specs[i]['typeName'] = 'Manicurists'
    else if (specs[i].typeID == 'C') specs[i]['typeName'] = 'Hair Dresser'

    if(specs[i].typeName == 'Carpentry') specs[i]['icon'] = 'hammer-screwdriver';
    else if (specs[i].typeName == 'Car Mechanic') specs[i]['icon'] = 'car-wrench';
    else if (specs[i].typeName == 'Plumbing') specs[i]['icon'] = 'water-pump';
    else if (specs[i].typeName == 'House Cleaning') specs[i]['icon'] = 'broom';
    else if (specs[i].typeName == 'Baby Sitting') specs[i]['icon'] = 'human-baby-changing-table';
    else if (specs[i].typeName == 'Electrician') specs[i]['icon'] = 'power-plug';
    else if (specs[i].typeName == 'Laundry') specs[i]['icon'] = 'tshirt-crew';
    else if (specs[i].typeName == 'Appliance Repair') specs[i]['icon'] = 'television';
    else if (specs[i].typeName == 'Roof Cleaning') specs[i]['icon'] = 'home-roof';
    else if (specs[i].typeName == 'Carpet Cleaning') specs[i]['icon'] = 'rug';
    else if (specs[i].typeName == 'Meal Preparation') specs[i]['icon'] = 'silverware-clean';
    else if (specs[i].typeName == 'Manicurists') specs[i]['icon'] = 'hand-clap';
    else if (specs[i].typeName == 'Hair Dresser') specs[i]['icon'] = 'face-woman-shimmer';

    let status = ['', 'Active', 'Matching', 'Settled', 'Cancelled'];
    let colors = ['', styles.blue, styles.brown, styles.green, styles.red]
    let button = ['', 'View Specs Form', 'View Booking Details', 'View Transaction', 'View Specs Form'];
    specs[i]['status'] = status[specs[i].specsStatus];
    specs[i]['button'] = button[specs[i].specsStatus];
    specs[i]['color'] = colors[specs[i].specsStatus];

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date( specs[i].specsTimestamp);
    let today = new Date(), yesterday = new Date();
    yesterday.setDate( yesterday.getDate() - 1)

    if (date.toDateString() == today.toDateString()) specs[i]['date'] = "Today";
    else if (date.toDateString() == yesterday.toDateString()) specs[i]['date'] = "Yesterday";
    else specs[i]['date'] = months[date.getMonth()] + " " + date.getDate();
  }
  return specs;
}

const styles = StyleSheet.create ({
  blue: {
    color: 'blue'
  },
  brown: {
    color: 'brown'
  },
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  }

});