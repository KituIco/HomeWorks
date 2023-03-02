import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/booking';
let BookingServices = {
    createBooking: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchBooking: async(bookingID, data) => {
        try {
            let queryUrl = `${url}/${bookingID}`;
            let res = await patchAxios(queryUrl, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteBooking: async(bookingID) => {
        try {
            let queryUrl = `${url}/${bookingID}`;
            let res = await deleteAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllBookings: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getSeekerBookings: async(seekerID) => {
        try {
            let queryUrl = `${url}/seeker/${seekerID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getBookingByID: async(bookingID) => {
        try {
            let queryUrl = `${url}/${bookingID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = BookingServices;