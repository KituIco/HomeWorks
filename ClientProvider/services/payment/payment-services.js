import { patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/payment';

let PaymentServices = {
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

    getProviderPaymentsByStatus: async(providerID, status) => {
        try {
            let queryURL = `${url}/provider/${providerID}?paymentStatus=${status}`;
            let res = await getAxios(queryURL);
            return res;
        } catch (error) {
            throw error;
        }
    },

    getProviderPayments: async(providerID) => {
        try {
            let queryURL = `${url}/provider/${providerID}`;
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