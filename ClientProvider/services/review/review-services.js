import { getAxios } from '../../lib/axios';

let url = '/review';

let ReviewServices = {
    getAllReviews: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getServiceReviews: async(serviceID) => {
        try {
            let queryURL = `${url}/service/${serviceID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getReview: async(reviewID) => {
        try {
            let queryURL = `${url}/${reviewID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ReviewServices;