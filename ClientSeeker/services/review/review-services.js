import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/review';

let ReviewServices = {
    createReview: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchReview: async(reviewID, data) => {
        try {
            let queryURL = `${url}/${reviewID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteReview: async(reviewID) => {
        try {
            let queryURL = `${url}/${reviewID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

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