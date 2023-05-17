import { StyleSheet } from "react-native";

import ServiceServices from '../services/service/service-services';
import ServiceSpecsServices from '../services/service-specs/service-specs-services';
import TransactionReportServices from '../services/transaction/transaction-reports-services';

import { getUserID } from '../utils/get-userID';

export const historyHelper = async(bookings) => {
  let userID = await getUserID();
  let { body: services } = await ServiceServices.getProviderServices(userID);

  for (let i=0; i<bookings.length; i++) {

    if(bookings[i].bookingStatus == 4)
      bookings[i].bookingStatus = 0;

    for (let j=0; j<services.length; j++)
      if (bookings[i].serviceID == services[j].serviceID)
        bookings[i]['typeName'] = services[j].typeName;

    if(bookings[i].typeName == 'Carpentry') bookings[i]['icon'] = 'hammer-screwdriver';
    else if (bookings[i].typeName == 'Car Mechanic') bookings[i]['icon'] = 'car-wrench';
    else if (bookings[i].typeName == 'Plumbing') bookings[i]['icon'] = 'water-pump';
    else if (bookings[i].typeName == 'House Cleaning') bookings[i]['icon'] = 'broom';
    else if (bookings[i].typeName == 'Baby Sitting') bookings[i]['icon'] = 'human-baby-changing-table';
    else if (bookings[i].typeName == 'Electrician') bookings[i]['icon'] = 'power-plug';
    else if (bookings[i].typeName == 'Laundry') bookings[i]['icon'] = 'tshirt-crew';
    else if (bookings[i].typeName == 'Appliance Repair') bookings[i]['icon'] = 'television';
    else if (bookings[i].typeName == 'Roof Cleaning') bookings[i]['icon'] = 'home-roof';
    else if (bookings[i].typeName == 'Carpet Cleaning') bookings[i]['icon'] = 'rug';
    else if (bookings[i].typeName == 'Meal Preparation') bookings[i]['icon'] = 'silverware-clean';
    else if (bookings[i].typeName == 'Manicurists') bookings[i]['icon'] = 'hand-clap';
    else if (bookings[i].typeName == 'Hair Dresser') bookings[i]['icon'] = 'face-woman-shimmer';

    let status = ['Cancelled', 'Booking', 'Booking', 'Settled'];
    let colors = [styles.red, styles.orange, styles.orange, styles.blue ];
    let button = ['View Cancelled Booking', 'View Ongoing Booking', 'View Ongoing Booking', 'View Ongoing Service'];

    let shadow = [styles.shadowCancelled, styles.shadow, styles.shadow, styles.shadow];
    let box = [styles.boxCancelled, styles.box, styles.box, styles.box];
    let cancelled = [true, false, false, false];

    if(bookings[i].bookingStatus == 3){
      let { body: specs } = await ServiceSpecsServices.getSpecsByID(bookings[i].specsID);
      let { body: report } = await TransactionReportServices.getTransactionReportsByID(specs.referencedID);
      if(report.transactionStat == 1) status[3] = 'Arriving';
      else if(report.transactionStat == 2) status[3] = 'Serving';
      else if(report.transactionStat == 3) { 
        status[3] = 'Complete'; 
        button[3] = 'View Completed Service';
        colors[3] = styles.green;
      }
      bookings[i]['reportID'] = report.reportID;
    }

    bookings[i]['status'] = status[bookings[i].bookingStatus];
    bookings[i]['button'] = button[bookings[i].bookingStatus];
    bookings[i]['color'] = colors[bookings[i].bookingStatus];

    bookings[i]['cancelled'] = cancelled[bookings[i].bookingStatus];
    bookings[i]['shadow'] = shadow[bookings[i].bookingStatus];
    bookings[i]['box'] = box[bookings[i].bookingStatus];

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date( bookings[i].dateTimestamp);
    let today = new Date(), yesterday = new Date();
    yesterday.setDate( yesterday.getDate() - 1)

    if (date.toDateString() == today.toDateString()) bookings[i]['date'] = "Today";
    else if (date.toDateString() == yesterday.toDateString()) bookings[i]['date'] = "Yesterday";
    else bookings[i]['date'] = months[date.getMonth()] + " " + date.getDate();
  }
  return bookings;
}

const styles = StyleSheet.create ({
  blue: {
    color: 'blue'
  },
  orange: {
    color: 'orange'
  },
  green: {
    color: 'green'
  },
  red: {
    color: 'red'
  },
  brown: {
    color: 'brown'
  },

  box: {
    borderRadius: 10,
    height: 160,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  boxCancelled: {
    borderRadius: 10,
    height: 106,
    backgroundColor: '#E9E9E9',
    marginTop: -3,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  shadow: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 160,
    marginVertical: 10,
  },
  shadowCancelled: {
    marginHorizontal: 30,
    borderRadius: 10,
    height: 106,
    marginVertical: 10,
  },

});