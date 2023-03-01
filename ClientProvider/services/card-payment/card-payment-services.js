import { postAxios, patchAxios, deleteAxios, getAxios } from '../../lib/axios';

let url = '/card-payment';
let CardPaymentServices = {
    createCardPayment: async(data) => {
        try {
            let res = await postAxios(url, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    patchCardPayment: async(cardID, data) => {
        try {
            let queryUrl = `${url}/${cardID}`;
            let res = await patchAxios(queryUrl, data);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    deleteCardPayment: async(cardID) => {
        try {
            let queryUrl = `${url}/${cardID}`;
            let res = await deleteAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getAllCardPayments: async() => {
        try {
            let res = await getAxios(url);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getUserCardPayments: async(userID) => {
        try {
            let queryUrl = `${url}/user/${userID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    },

    getCardPaymentByID: async(cardID) => {
        try {
            let queryUrl = `${url}/${cardID}`;
            let res = await getAxios(queryUrl);
            return res;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CardPaymentServices;