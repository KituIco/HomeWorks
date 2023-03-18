import { getAxios } from '../../lib/axios';

let url = '/booking';
let BookingServices = {
    createBooking: async (data = {}) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchBooking: async (bookingID, data = {}) => {
        try {
            let queryURL = `${url}/${bookingID}`
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllBookings: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getProviderBookings: async(providerID) => {
        try {
            let queryUrl = `${url}/provider/${providerID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getBookingByID: async(bookingID) => {
        try {
            let queryUrl = `${url}/${bookingID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BookingServices;