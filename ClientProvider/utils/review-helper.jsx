import SeekerServices from '../services/seeker/seeker-services';

import { getImageURL } from '../utils/get-imageURL';

export const reviewHelper = async(reviews) => {
  for (let i=0; i<reviews.length; i++) {
    let { body: user } = await SeekerServices.getSeeker(reviews[i].seekerId);

    if(user.seekerDp) reviews[i]['icon'] = {uri : getImageURL(user.seekerDp)};
    else reviews[i]['icon'] = require("../assets/default.jpg")
    reviews[i]['name'] = user.firstName + " " + user.lastName;
  }
  return reviews;
}
