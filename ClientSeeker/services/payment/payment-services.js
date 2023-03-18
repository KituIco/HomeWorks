import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/payment';

let PaymentServices = {
    createPayment: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    patchPayment: async(paymentID, data) => {
        try {
            let queryURL = `${url}/${paymentID}`;
            let res = await patchAxios(queryURL, data);
            return res;
        } catch (error) {
            throw error;
        }
    },

    deletePayment: async(paymentID) => {
        try {
            let queryURL = `${url}/${paymentID}`;
            let res = await deleteAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllPayments: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getAllPaymentsByStatus: async(status) => {
        try {
            let queryURL = `${url}/status?paymentStatus=${status}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getSeekerPaymentsByStatus: async(seekerID, status) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}?paymentStatus=${status}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getSeekerPayments: async(seekerID) => {
        try {
            let queryURL = `${url}/seeker/${seekerID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getPaymentByMethod: async(method) => {
        try {
            let queryURL = `${url}/method?paymentMethod=${method}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getPaymentByID: async(paymentID) => {
        try {
            let queryURL = `${url}/${paymentID}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PaymentServices;